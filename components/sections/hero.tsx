"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";
import { siteConfig } from "@/config/site-content";

const stagger = [0, 0.08, 0.16, 0.24];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const titles = useMemo(() => siteConfig.rotatingTitles, []);
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2200);
    return () => clearInterval(id);
  }, [titles]);

  return (
    <section className="relative overflow-hidden border-b border-border py-20 md:py-28">
      <div className="noise-bg code-rain absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-6">
        <motion.p
          className="scanline font-mono text-base text-primary"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: stagger[0], ease: "easeOut" }}
        >
          &gt; Hello, I&apos;m {siteConfig.name}
          <span className="ml-1 inline-block animate-pulse">_</span>
        </motion.p>

        <motion.h1
          className="mt-4 max-w-4xl font-mono text-4xl leading-tight md:text-6xl"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: stagger[1], ease: "easeOut" }}
        >
          I design and ship <span className="whitespace-nowrap">on-chain</span> + full-stack products that go live.
        </motion.h1>

        <motion.p
          className="mt-5 min-h-8 text-lg text-muted-foreground"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: stagger[2], ease: "easeOut" }}
        >
          {titles[titleIndex]}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: stagger[3], ease: "easeOut" }}
        >
          <ButtonLink href="/#projects">See My Work</ButtonLink>
          <ButtonLink href="/resume.pdf" variant="secondary" download>
            Download Resume
          </ButtonLink>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: stagger[3] + 0.08, ease: "easeOut" }}
        >
          <SocialLinks />
        </motion.div>
      </div>
    </section>
  );
}
