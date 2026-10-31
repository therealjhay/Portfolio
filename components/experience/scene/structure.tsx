"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { decayDragVelocity, sceneState } from "../store";
import { buildEdges, buildFormations, STAGE_PRESET } from "./layouts";

const blockVertex = /* glsl */ `
  attribute float aGlow;
  varying vec2 vUv;
  varying float vGlow;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vUv = uv;
    vGlow = aGlow;
    vec4 mv = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    vNormal = normalize(normalMatrix * mat3(instanceMatrix) * normal);
    gl_Position = projectionMatrix * mv;
  }
`;

const blockFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  uniform float uOpacity;
  varying vec2 vUv;
  varying float vGlow;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    float e = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
    float w = fwidth(e) * 1.4;
    float line = 1.0 - smoothstep(0.0, w + 0.014, e);
    float inner = 1.0 - smoothstep(0.0, 0.16, e);
    float fres = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.2);
    vec3 col = mix(uColor, uAccent, vGlow);
    float a = (line * 0.95 + inner * 0.06 + fres * 0.22 + 0.035) * uOpacity * (0.6 + vGlow * 0.9);
    gl_FragColor = vec4(col, a);
  }
`;

const pointVertex = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vTwinkle;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vTwinkle = 0.55 + 0.45 * sin(uTime * 1.3 + aSeed * 40.0);
    gl_PointSize = aSize * uPixelRatio * (12.0 / -mv.z);
  }
`;

const pointFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vTwinkle;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, a * a * uOpacity * vTwinkle);
  }
`;

type Props = {
  count: number;
  compact: boolean;
  reduced: boolean;
};

const BONE = new THREE.Color("#e8e3d6");
const SIGNAL = new THREE.Color("#c8ff2e");
const ICE = new THREE.Color("#7dd3fc");
const PACKETS = 26;

export function Structure({ count, compact, reduced }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const packetsRef = useRef<THREE.Points>(null);
  const { camera, size } = useThree();

  const formations = useMemo(() => buildFormations(count, compact), [count, compact]);
  const edges = useMemo(() => buildEdges(formations[0], count), [formations, count]);

  const simRef = useRef<{
    current: Float32Array;
    speed: Float32Array;
    seed: Float32Array;
    scale: Float32Array;
    packetEdge: Uint16Array;
    packetT: Float32Array;
    packetV: Float32Array;
    matrix: THREE.Matrix4;
    quat: THREE.Quaternion;
    euler: THREE.Euler;
    pos: THREE.Vector3;
    scl: THREE.Vector3;
    world: THREE.Vector3;
    preset: { x: number; y: number; scale: number; opacity: number; chaos: number; edge: number };
    spin: number;
    tiltX: number;
    tiltY: number;
  } | null>(null);

  useEffect(() => {
    const current = new Float32Array(formations[0]);
    const speed = new Float32Array(count);
    const seed = new Float32Array(count);
    const scale = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      speed[i] = 0.55 + ((i * 37) % 17) / 17;
      seed[i] = ((i * 73) % 101) / 101;
      scale[i] = 0.32 + (((i * 29) % 11) / 11) * 0.2;
    }
    const packetEdge = new Uint16Array(PACKETS);
    const packetT = new Float32Array(PACKETS);
    const packetV = new Float32Array(PACKETS);
    for (let i = 0; i < PACKETS; i++) {
      packetEdge[i] = (i * 7) % edges.length;
      packetT[i] = (i * 0.137) % 1;
      packetV[i] = 0.25 + ((i * 13) % 7) / 10;
    }
    simRef.current = {
      current,
      speed,
      seed,
      scale,
      packetEdge,
      packetT,
      packetV,
      matrix: new THREE.Matrix4(),
      quat: new THREE.Quaternion(),
      euler: new THREE.Euler(),
      pos: new THREE.Vector3(),
      scl: new THREE.Vector3(),
      world: new THREE.Vector3(),
      preset: { x: 0, y: 0, scale: 1, opacity: 1, chaos: 1, edge: 0.4 },
      spin: 0,
      tiltX: 0,
      tiltY: 0,
    };
  }, [formations, edges, count]);

  const boxGeometry = useMemo(() => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    geometry.setAttribute("aGlow", new THREE.InstancedBufferAttribute(new Float32Array(count), 1));
    return geometry;
  }, [count]);

  const blockMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: blockVertex,
        fragmentShader: blockFragment,
        uniforms: {
          uColor: { value: BONE.clone() },
          uAccent: { value: SIGNAL.clone() },
          uOpacity: { value: 1 },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const edgeGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(edges.length * 6), 3));
    return geometry;
  }, [edges]);

  const edgeMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: BONE,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const packetGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(PACKETS * 3), 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(new Float32Array(PACKETS).fill(compact ? 7 : 9), 1));
    geometry.setAttribute(
      "aSeed",
      new THREE.BufferAttribute(Float32Array.from({ length: PACKETS }, (_, i) => i / PACKETS), 1),
    );
    return geometry;
  }, [compact]);

  const packetMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: pointVertex,
        fragmentShader: pointFragment,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2) },
          uColor: { value: ICE.clone() },
          uOpacity: { value: 1 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useFrame((state, rawDelta) => {
    const sim = simRef.current;
    const g = groupRef.current;
    const m = meshRef.current;
    const lines = linesRef.current;
    const pts = packetsRef.current;
    if (!sim || !g || !m || !lines || !pts) return;

    const delta = Math.min(rawDelta, 0.05);
    const time = state.clock.elapsedTime;
    const stage = sceneState.stage;
    const target = formations[stage];
    const goal = STAGE_PRESET[stage];
    const preset = sim.preset;
    const k = reduced ? 1 : 1 - Math.exp(-delta * 2.2);

    const offsetX = compact ? 0 : goal.x;
    const offsetY = compact && (stage === 0 || stage === 1 || stage === 6) ? 1.7 : goal.y;
    preset.x += (offsetX - preset.x) * k;
    preset.y += (offsetY - preset.y) * k;
    preset.scale += (goal.scale - preset.scale) * k;
    preset.opacity += (goal.opacity * (compact ? 0.8 : 1) - preset.opacity) * k;
    preset.chaos += (goal.chaos - preset.chaos) * k;
    preset.edge += (goal.edge - preset.edge) * k;

    if (!reduced) {
      sim.spin += delta * (0.09 + sceneState.dragVelocity);
      decayDragVelocity(Math.exp(-delta * 2.5));
      sim.tiltX += (sceneState.pointerY * 0.22 - sim.tiltX) * (1 - Math.exp(-delta * 3));
      sim.tiltY += (sceneState.pointerX * 0.35 - sim.tiltY) * (1 - Math.exp(-delta * 3));
    }
    const spinDamp = stage === 3 || stage === 5 ? 0.15 : 1;
    g.rotation.set(sim.tiltX, sim.spin * spinDamp + sim.tiltY, 0);
    g.position.set(preset.x, preset.y, 0);
    g.scale.setScalar(preset.scale);

    const mMat = m.material as THREE.ShaderMaterial;
    mMat.uniforms.uOpacity.value = preset.opacity;

    const lMat = lines.material as THREE.LineBasicMaterial;
    lMat.opacity = preset.edge * preset.opacity;

    const pMat = pts.material as THREE.ShaderMaterial;
    pMat.uniforms.uTime.value = time;
    pMat.uniforms.uOpacity.value = Math.min(1, preset.opacity * 1.2);

    g.updateMatrixWorld();

    const glowAttr = m.geometry.getAttribute("aGlow") as THREE.InstancedBufferAttribute;
    const glowArray = glowAttr.array as Float32Array;
    const aspect = size.width / Math.max(size.height, 1);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const blend = reduced ? 1 : 1 - Math.exp(-delta * 2 * sim.speed[i]);
      const s = sim.seed[i];
      const float = reduced ? 0 : preset.chaos * 0.12;
      const tx = target[i3] + Math.sin(time * 0.6 + s * 12) * float;
      const ty = target[i3 + 1] + Math.cos(time * 0.5 + s * 9) * float;
      const tz = target[i3 + 2] + Math.sin(time * 0.4 + s * 7) * float;
      sim.current[i3] += (tx - sim.current[i3]) * blend;
      sim.current[i3 + 1] += (ty - sim.current[i3 + 1]) * blend;
      sim.current[i3 + 2] += (tz - sim.current[i3 + 2]) * blend;

      sim.world
        .set(sim.current[i3], sim.current[i3 + 1], sim.current[i3 + 2])
        .applyMatrix4(g.matrixWorld)
        .project(camera);
      const dx = (sim.world.x - sceneState.pointerX) * aspect;
      const dy = sim.world.y - sceneState.pointerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = reduced ? 0 : Math.max(0, 1 - dist / 0.32);
      const prev = glowArray[i];
      const nextGlow = prev + (influence - prev) * (1 - Math.exp(-delta * 8));
      glowArray[i] = nextGlow;

      const push = 1 + nextGlow * 0.28;
      sim.pos.set(sim.current[i3] * push, sim.current[i3 + 1] * push, sim.current[i3 + 2] * push);
      sim.euler.set(time * 0.15 * (reduced ? 0 : 1) + s * 6, time * 0.1 * (reduced ? 0 : 1) + s * 4, 0);
      sim.quat.setFromEuler(sim.euler);
      const sc = sim.scale[i] * (1 + nextGlow * 0.35);
      sim.scl.set(sc, sc, sc);
      sim.matrix.compose(sim.pos, sim.quat, sim.scl);
      m.setMatrixAt(i, sim.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
    glowAttr.needsUpdate = true;

    const edgeAttr = lines.geometry.getAttribute("position") as THREE.BufferAttribute;
    const edgePos = edgeAttr.array as Float32Array;
    for (let e = 0; e < edges.length; e++) {
      const [a, b] = edges[e];
      edgePos.set(
        [
          sim.current[a * 3],
          sim.current[a * 3 + 1],
          sim.current[a * 3 + 2],
          sim.current[b * 3],
          sim.current[b * 3 + 1],
          sim.current[b * 3 + 2],
        ],
        e * 6,
      );
    }
    edgeAttr.needsUpdate = true;

    const pAttr = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
    const pPos = pAttr.array as Float32Array;
    for (let p = 0; p < PACKETS; p++) {
      if (!reduced) sim.packetT[p] += delta * sim.packetV[p];
      if (sim.packetT[p] > 1) {
        sim.packetT[p] = 0;
        sim.packetEdge[p] = (sim.packetEdge[p] * 31 + 17) % edges.length;
      }
      const [a, b] = edges[sim.packetEdge[p]];
      const t = sim.packetT[p];
      pPos[p * 3] = sim.current[a * 3] + (sim.current[b * 3] - sim.current[a * 3]) * t;
      pPos[p * 3 + 1] = sim.current[a * 3 + 1] + (sim.current[b * 3 + 1] - sim.current[a * 3 + 1]) * t;
      pPos[p * 3 + 2] = sim.current[a * 3 + 2] + (sim.current[b * 3 + 2] - sim.current[a * 3 + 2]) * t;
    }
    pAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[boxGeometry, blockMaterial, count]} frustumCulled={false} />
      <lineSegments ref={linesRef} geometry={edgeGeometry} material={edgeMaterial} frustumCulled={false} />
      <points ref={packetsRef} geometry={packetGeometry} material={packetMaterial} frustumCulled={false} />
      <Core reduced={reduced} />
    </group>
  );
}

const coreVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mv;
  }
`;

const coreFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPower;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float fres = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.6);
    gl_FragColor = vec4(uColor, fres * uPower);
  }
`;

function Core({ reduced }: { reduced: boolean }) {
  const shell = useRef<THREE.LineSegments>(null);
  const orb = useRef<THREE.Mesh>(null);

  const shellGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.62, 1)), []);
  const orbMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: coreVertex,
        fragmentShader: coreFragment,
        uniforms: { uColor: { value: SIGNAL.clone() }, uPower: { value: 1 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useFrame((state, delta) => {
    const stage = sceneState.stage;
    const goal = STAGE_PRESET[stage].core;
    const t = state.clock.elapsedTime;
    const pulse = reduced ? 1 : 1 + Math.sin(t * 1.6) * 0.06;
    if (shell.current) {
      if (!reduced) {
        shell.current.rotation.x += delta * 0.18;
        shell.current.rotation.y -= delta * 0.12;
      }
      const s =
        shell.current.scale.x +
        (goal * pulse - shell.current.scale.x) * (reduced ? 1 : 1 - Math.exp(-delta * 2));
      shell.current.scale.setScalar(s);
    }
    if (orb.current) {
      orb.current.scale.setScalar((shell.current?.scale.x ?? 1) * 0.72);
      const mat = orb.current.material as THREE.ShaderMaterial;
      mat.uniforms.uPower.value = 0.7 + goal * 0.5;
    }
  });

  return (
    <group>
      <lineSegments ref={shell} geometry={shellGeometry}>
        <lineBasicMaterial
          color={SIGNAL}
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <mesh ref={orb} material={orbMaterial}>
        <sphereGeometry args={[0.62, 32, 32]} />
      </mesh>
    </group>
  );
}

export function Dust({ count, reduced }: { count: number; reduced: boolean }) {
  const points = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);
    let s = 1234;
    const rand = () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 30;
      positions[i * 3 + 1] = (rand() - 0.5) * 18;
      positions[i * 3 + 2] = (rand() - 0.5) * 20 - 4;
      sizes[i] = 1.2 + rand() * 2.6;
      seeds[i] = rand();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return g;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: pointVertex,
        fragmentShader: pointFragment,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2) },
          uColor: { value: BONE.clone() },
          uOpacity: { value: 0.55 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useFrame((state, delta) => {
    if (points.current) {
      const mat = points.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      if (!reduced) {
        points.current.rotation.y += delta * 0.008;
        points.current.position.y = sceneState.stage * 0.35;
      }
    }
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}
