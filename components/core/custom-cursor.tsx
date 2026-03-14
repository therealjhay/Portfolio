"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setIsVisible(true);
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, input, textarea, select, [data-cursor='hover']"
      );
      setIsHovering(Boolean(interactive));
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
      <motion.div
        className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink"
        style={{
          left: cursorX,
          top: cursorY,
          backgroundColor: isHovering ? "var(--color-hot)" : "transparent",
        }}
        animate={{ scale: isHovering ? 1.4 : 1, opacity: isVisible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      <motion.div
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
        style={{ left: cursorX, top: cursorY }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
