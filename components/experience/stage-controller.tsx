"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import {
  STAGE_ORDER,
  setActiveStage,
  setScrollProgress,
} from "@/components/experience/store";

export function StageController() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let rafId = 0;

    if (!reduced) {
      lenis = new Lenis({
        duration: 1.0,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.15,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };
      rafId = window.requestAnimationFrame(raf);
    }

    const handleScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      setScrollProgress(progress);

      const viewportCenter = window.innerHeight * 0.42;
      let bestStage = STAGE_ORDER[0];
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const stageId of STAGE_ORDER) {
        const el = document.getElementById(stageId);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          bestStage = stageId;
          bestDistance = 0;
        } else {
          const dist = Math.min(
            Math.abs(rect.top - viewportCenter),
            Math.abs(rect.bottom - viewportCenter),
          );
          if (dist < bestDistance) {
            bestDistance = dist;
            bestStage = stageId;
          }
        }
      }

      setActiveStage(bestStage);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
}
