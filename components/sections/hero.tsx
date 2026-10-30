"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";
import { siteConfig } from "@/config/site-content";

const stagger = [0, 0.08, 0.16, 0.24, 0.32];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const titles = useMemo(() => siteConfig.rotatingTitles, []);
  const [titleIndex, setTitleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background drifts up at 40% of scroll speed — subtle depth effect
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  useEffect(() => {
    const id = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2200);
    return () => clearInterval(id);
  }, [titles]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-b border-border py-20 md:py-28">
      <motion.div
        className="noise-bg code-rain absolute inset-0 opacity-70"
        aria-hidden="true"
        style={shouldReduceMotion ? undefined : { y: bgY }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-6">
        <motion.div
          className="mb-5 flex flex-wrap items-center gap-2"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: stagger[0], ease: "easeOut" }}
        >
          <Badge className={siteConfig.availabilityOpen ? "border-primary/40 text-primary" : "text-muted-foreground"}>
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
            {siteConfig.availabilityOpen ? "Open to contracts" : "Unavailable"}
          </Badge>
          <Badge>Currently building: {siteConfig.latestPinnedProject}</Badge>
        </motion.div>

        <motion.p
          className="scanline font-mono text-base text-primary"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: stagger[1], ease: "easeOut" }}
        >
          &gt; Hello, I&apos;m {siteConfig.name} ({siteConfig.handle})
          <span className="ml-1 inline-block animate-pulse">_</span>
        </motion.p>

        <motion.h1
          className="mt-4 max-w-4xl font-mono text-4xl leading-tight md:text-6xl"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: stagger[2], ease: "easeOut" }}
        >
          {siteConfig.headline}
        </motion.h1>

        <motion.div
          className="mt-5 max-w-2xl space-y-2"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: stagger[3], ease: "easeOut" }}
        >
          <p className="min-h-7 font-mono text-sm uppercase tracking-[0.14em] text-primary">
            {titles[titleIndex]}
          </p>
          <p className="text-base text-muted-foreground md:text-lg">
            {siteConfig.tagline}
          </p>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: stagger[4], ease: "easeOut" }}
        >
          <ButtonLink href="/projects">See My Work</ButtonLink>
          <ButtonLink href="/resume.pdf" variant="secondary" download>
            Download Resume
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Get in Touch →
          </ButtonLink>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: stagger[4] + 0.08, ease: "easeOut" }}
        >
          <SocialLinks />
        </motion.div>
      </div>
    </section>
  );
}
