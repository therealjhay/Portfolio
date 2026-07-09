"use client";

import { motion, useReducedMotion } from "framer-motion";

const stack = [
  "Solidity",
  "Python",
  "Next.js",
  "Django",
  "TypeScript",
  "PostgreSQL",
  "Web3.py",
  "ethers.js",
  "Docker",
];

export function StackList() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {stack.map((item, i) => (
        <motion.li
          key={item}
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.2, delay: i * 0.05, ease: "easeOut" }}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
          className="group border border-border bg-card px-3 py-2 text-sm transition-colors duration-150 hover:border-primary/50 hover:shadow-glow"
        >
          <span className="transition-colors duration-150 group-hover:text-primary">
            {item}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
