"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  pulseScene,
  rotateWorkstationBy,
  sceneState,
} from "@/components/experience/store";

export function EngineeringStructure({
  isDark,
}: {
  isMobile: boolean;
  isDark: boolean;
}) {
  const outerGroupRef = useRef<THREE.Group>(null);
  const ringOneRef = useRef<THREE.Mesh>(null);
  const ringTwoRef = useRef<THREE.Mesh>(null);
  const ringThreeRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const satelliteGroupRef = useRef<THREE.Group>(null);

  const draggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    sceneState.dragVelocity = THREE.MathUtils.lerp(
      sceneState.dragVelocity,
      0,
      dt * 4,
    );

    if (outerGroupRef.current) {
      const targetY =
        sceneState.workstationRotationY +
        t * 0.18 +
        sceneState.pointerX * 0.35;
      const targetX =
        sceneState.workstationRotationX + sceneState.pointerY * 0.25;

      outerGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        outerGroupRef.current.rotation.y,
        targetY,
        dt * 5,
      );
      outerGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        outerGroupRef.current.rotation.x,
        targetX,
        dt * 5,
      );
    }

    if (ringOneRef.current) {
      ringOneRef.current.rotation.x = t * 0.45 + sceneState.dragVelocity;
      ringOneRef.current.rotation.y = t * 0.2;
    }

    if (ringTwoRef.current) {
      ringTwoRef.current.rotation.y = -t * 0.55 - sceneState.dragVelocity;
      ringTwoRef.current.rotation.z = t * 0.3;
    }

    if (ringThreeRef.current) {
      ringThreeRef.current.rotation.x = Math.PI / 3 + t * 0.35;
      ringThreeRef.current.rotation.z = -t * 0.4;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.6;
      coreRef.current.rotation.x = t * 0.4;
      const scale = 1 + Math.sin(t * 2.2) * 0.04;
      coreRef.current.scale.setScalar(scale);
    }

    if (satelliteGroupRef.current) {
      satelliteGroupRef.current.rotation.y = t * 0.35;
      satelliteGroupRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    }
  });

  const primaryMetal = isDark ? "#EAE8E1" : "#1E1E1C";
  const secondaryMetal = isDark ? "#787670" : "#8C8A82";
  const accentColor = "#D95D39";

  return (
    <group
      ref={outerGroupRef}
      onPointerDown={(e) => {
        e.stopPropagation();
        draggingRef.current = true;
        lastPointerRef.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerMove={(e) => {
        if (!draggingRef.current) return;
        e.stopPropagation();
        const dx = e.clientX - lastPointerRef.current.x;
        const dy = e.clientY - lastPointerRef.current.y;
        lastPointerRef.current = { x: e.clientX, y: e.clientY };
        rotateWorkstationBy(dx * 0.01, dy * 0.008);
      }}
      onPointerUp={() => {
        draggingRef.current = false;
      }}
      onClick={(e) => {
        e.stopPropagation();
        pulseScene(0.8);
      }}
    >
      {/* Outer Precision Gimbal Ring */}
      <mesh ref={ringOneRef} castShadow>
        <torusGeometry args={[1.65, 0.032, 24, 96]} />
        <meshStandardMaterial
          color={primaryMetal}
          metalness={0.65}
          roughness={0.28}
        />
      </mesh>

      {/* Middle Gimbal Ring */}
      <mesh ref={ringTwoRef} castShadow>
        <torusGeometry args={[1.28, 0.028, 24, 96]} />
        <meshStandardMaterial
          color={secondaryMetal}
          metalness={0.55}
          roughness={0.35}
        />
      </mesh>

      {/* Inner Warm Accent Ring */}
      <mesh ref={ringThreeRef} castShadow>
        <torusGeometry args={[0.92, 0.024, 20, 80]} />
        <meshStandardMaterial
          color={accentColor}
          metalness={0.35}
          roughness={0.4}
        />
      </mesh>

      {/* Faceted Architectural Core */}
      <mesh ref={coreRef} castShadow receiveShadow>
        <icosahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial
          color={primaryMetal}
          metalness={0.7}
          roughness={0.22}
        />
      </mesh>

      {/* Orbiting Nodes */}
      <group ref={satelliteGroupRef}>
        {[
          [1.65, 0, 0],
          [-1.65, 0, 0],
          [0, 1.28, 0],
          [0, -1.28, 0],
        ].map((pos, i) => (
          <mesh
            key={i}
            position={pos as [number, number, number]}
            castShadow
          >
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? accentColor : primaryMetal}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
