"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteContent } from "@/config/site-content";

const groups = [
  { label: "Web3 & Smart Contracts", items: siteContent.skills.web3 },
  { label: "Frontend", items: siteContent.skills.frontend },
  { label: "Backend & Infrastructure", items: siteContent.skills.backend },
] as const;

export function StackList() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.label} className="space-y-2.5">
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {group.label}
          </h2>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {group.items.map((item, i) => (
              <motion.li
                key={item}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.2, delay: i * 0.03, ease: "easeOut" }}
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                className="group border border-border bg-card px-3 py-2 text-sm transition-colors duration-150 hover:border-primary/50 hover:shadow-glow"
              >
                <span className="transition-colors duration-150 group-hover:text-primary">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
