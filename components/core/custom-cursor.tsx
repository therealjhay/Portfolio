"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useSpring(cursorX, { stiffness: 150, damping: 22 });
  const trailY = useSpring(cursorY, { stiffness: 150, damping: 22 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      setIsHovering(
        Boolean(
          target.closest("a, button, input, textarea, select, [data-cursor='hover']")
        )
      );
    };
    const handleLeave = () => {
      setIsHovering(false);
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[999] hidden md:block">
      {/* Outer ring */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: trailX,
          top: trailY,
          width: isHovering ? 44 : 32,
          height: isHovering ? 44 : 32,
          border: `1.5px solid ${isHovering ? "rgba(0,229,255,0.8)" : "rgba(255,255,255,0.4)"}`,
          boxShadow: isHovering ? "0 0 16px rgba(0,229,255,0.4)" : "none",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
      {/* Inner dot */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: cursorX,
          top: cursorY,
          width: 5,
          height: 5,
          backgroundColor: isHovering ? "var(--color-cyan)" : "rgba(255,255,255,0.9)",
          boxShadow: isHovering ? "0 0 8px var(--color-cyan)" : "none",
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}
