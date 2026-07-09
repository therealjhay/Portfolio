"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site-content";
import { getAboutContent } from "@/lib/mdx";

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

export async function AboutSection() {
  const content = await getAboutContent();

  return (
    <section id="about" className="border-b border-border py-16 md:py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-6">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
            About
          </p>
          <div className="mdx-content space-y-4 text-muted-foreground">
            {content}
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <Badge>Currently building: {siteConfig.latestPinnedProject}</Badge>
            <Badge
              className={
                siteConfig.availabilityOpen
                  ? "text-primary"
                  : "text-muted-foreground"
              }
            >
              {siteConfig.availabilityOpen
                ? "Open to contracts"
                : "Unavailable"}
            </Badge>
          </div>
          <StackList />
        </div>
      </div>
    </section>
  );
}

function StackList() {
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

