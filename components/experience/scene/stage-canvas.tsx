"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useSyncExternalStore } from "react";
import { pulseScene, setPointer, STAGES, useStage } from "../store";
import { Dust, Structure } from "./structure";

const emptySubscribe = () => () => {};

function checkWebGL(): boolean {
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

export function StageCanvas() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const webglOk = useSyncExternalStore(
    emptySubscribe,
    () => checkWebGL(),
    () => true,
  );
  const compact = useMediaQuery("(max-width: 768px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  const stageIndex = useStage();
  const currentStage = STAGES[stageIndex] ?? STAGES[0];

  useEffect(() => {
    let dragging = false;
    let lastX = 0;

    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      const ny = -((e.clientY / Math.max(window.innerHeight, 1)) * 2 - 1);
      setPointer(nx, ny);
      if (dragging) {
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        pulseScene(dx * 0.03);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
    };

    const onPointerUp = () => {
      dragging = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Atmospheric radial depth & engineering grid */}
      <div className="playground-grid absolute inset-0 opacity-45" />
      <div className="playground-vignette absolute inset-0" />

      {mounted && webglOk ? (
        <Canvas
          dpr={compact ? [1, 1.4] : [1, 2]}
          camera={{
            position: [0, 0, compact ? 8.2 : 7.1],
            fov: 42,
            near: 0.1,
            far: 60,
          }}
          gl={{
            antialias: !compact,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            <Structure
              count={compact ? 42 : 72}
              compact={compact}
              reduced={reduced}
            />
            <Dust count={compact ? 55 : 120} reduced={reduced} />
          </Suspense>
        </Canvas>
      ) : (
        <WebGLFallback stateLabel={currentStage.state} />
      )}

      {/* Subtle corner HUD telemetry */}
      <div className="fixed bottom-6 left-6 z-20 hidden items-center gap-3 border border-border/60 bg-background/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-md lg:flex">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        <span>
          {"FORMATION // "}
          {currentStage.state}
        </span>
        <span className="text-border">|</span>
        <span>
          STAGE 0{stageIndex + 1} / 0{STAGES.length}
        </span>
      </div>
    </div>
  );
}

function WebGLFallback({ stateLabel }: { stateLabel: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-end pr-12 opacity-40">
      <div className="relative h-96 w-96 rounded-full border border-primary/30 p-8">
        <div className="h-full w-full rotate-45 border border-foreground/20 p-8">
          <div className="flex h-full w-full items-center justify-center border border-primary/40 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {stateLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
