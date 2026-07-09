"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Spring config: light and responsive
  const x = useSpring(rawX, { stiffness: 400, damping: 35, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 400, damping: 35, mass: 0.5 });

  useEffect(() => {
    // Only show on pointer devices (not touch)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [rawX, rawY, visible]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.2 } }}
    >
      {/* Outer diffuse glow */}
      <motion.div
        className="absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x,
          y,
          background:
            "radial-gradient(circle, hsl(170 100% 50% / 0.07) 0%, transparent 70%)",
        }}
      />
      {/* Inner focused glow */}
      <motion.div
        className="absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x,
          y,
          background:
            "radial-gradient(circle, hsl(170 100% 50% / 0.12) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
