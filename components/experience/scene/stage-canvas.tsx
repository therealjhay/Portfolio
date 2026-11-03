"use client";

import { Suspense, useEffect, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useTheme } from "next-themes";
import { EngineeringStructure } from "@/components/experience/scene/structure";
import { sceneState } from "@/components/experience/store";

const emptySubscribe = () => () => {};

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia(query);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false),
    () => false,
  );
}

export function WorkstationCanvas({ className = "" }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const webglAvailable = useSyncExternalStore(
    emptySubscribe,
    () => checkWebGLSupport(),
    () => true,
  );
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      const ny = -((e.clientY / Math.max(window.innerHeight, 1)) * 2 - 1);
      sceneState.pointerX = nx;
      sceneState.pointerY = ny;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  if (!mounted || !webglAvailable) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div
      className={`relative h-full w-full cursor-grab select-none active:cursor-grabbing ${className}`}
    >
      <Canvas
        shadows={!isMobile}
        dpr={isMobile ? [1, 1.35] : [1, 2]}
        camera={{ position: [0, 0.3, 4.6], fov: 40, near: 0.1, far: 30 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={isDark ? 0.8 : 1.1} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={isDark ? 1.5 : 1.8}
          color="#FFFDF9"
        />
        <directionalLight position={[-4, -2, -3]} intensity={0.4} />

        <Suspense fallback={null}>
          <EngineeringStructure isMobile={isMobile} isDark={isDark} />
          {!isMobile ? (
            <ContactShadows
              position={[0, -2.05, 0]}
              opacity={isDark ? 0.45 : 0.2}
              scale={7}
              blur={2.4}
              far={3.5}
            />
          ) : null}
        </Suspense>
      </Canvas>
    </div>
  );
}

export function StageCanvas() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      <div className="subtle-grid absolute inset-0" />
    </div>
  );
}
