"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerScroller, setStage, STAGES } from "./store";

export function StageController() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let rafId = 0;

    if (!reduced) {
      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.2,
      });

      registerScroller({
        scrollTo: (target, options) => {
          lenis?.scrollTo(target, { offset: options?.offset ?? 0 });
        },
        stop: () => lenis?.stop(),
        start: () => lenis?.start(),
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };
      rafId = window.requestAnimationFrame(raf);
    }

    const updateActiveStage = () => {
      const viewportCenter = window.innerHeight * 0.42;
      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      STAGES.forEach((stage, index) => {
        const el = document.getElementById(stage.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          bestIndex = index;
          bestDistance = 0;
        } else {
          const dist = Math.min(
            Math.abs(rect.top - viewportCenter),
            Math.abs(rect.bottom - viewportCenter),
          );
          if (dist < bestDistance) {
            bestDistance = dist;
            bestIndex = index;
          }
        }
      });

      setStage(bestIndex);
    };

    updateActiveStage();
    window.addEventListener("scroll", updateActiveStage, { passive: true });
    window.addEventListener("resize", updateActiveStage, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveStage);
      window.removeEventListener("resize", updateActiveStage);
      if (rafId) window.cancelAnimationFrame(rafId);
      registerScroller(null);
      lenis?.destroy();
    };
  }, []);

  return null;
}
