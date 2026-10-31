"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Download, Github, Linkedin, Orbit } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site-content";
import { pulseScene, scrollToTarget } from "@/components/experience/store";

const stagger = [0, 0.08, 0.16, 0.24, 0.32];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const handlePulseScene = () => {
    pulseScene(1.65);
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center border-b border-border/50 pt-24 pb-24 md:pt-28 md:pb-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="max-w-3xl">
          {/* Availability & Environment Telemetry Row */}
          <motion.div
            className="mb-6 flex flex-wrap items-center gap-3"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: stagger[0], ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 border border-primary/50 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] text-primary backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              {siteConfig.availabilityOpen
                ? "Available for select engineering roles & contracts"
                : "Unavailable"}
            </span>

            <button
              type="button"
              onClick={handlePulseScene}
              className="inline-flex items-center gap-1.5 border border-border/80 bg-background/70 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/60 hover:text-primary"
              title="Send an angular impulse to the 3D lattice"
            >
              <Orbit className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>Pulse 3D Lattice</span>
            </button>
          </motion.div>

          {/* Identity Kicker */}
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground md:text-sm"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: stagger[1], ease: "easeOut" }}
          >
            [JHAY // THE ENGINEERING PLAYGROUND · 0x6118…a33B]
          </motion.p>

          {/* Main Oversized Editorial Headline */}
          <motion.h1
            className="mt-4 font-mono text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: stagger[2], ease: "easeOut" }}
          >
            I build the systems behind{" "}
            <span className="text-primary">ambitious products.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: stagger[3], ease: "easeOut" }}
          >
            {siteConfig.supportingText}
          </motion.p>

          {/* Primary Actions & Direct Profiles */}
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: stagger[4], ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={() => scrollToTarget("#projects")}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 py-2.5 font-mono text-sm font-bold text-primary-foreground transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>Explore my work</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <ButtonLink
              href="/resume.pdf"
              variant="secondary"
              download
              className="backdrop-blur-md"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Download resume</span>
            </ButtonLink>

            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 border border-border bg-card/80 px-4 py-2 font-mono text-xs text-foreground backdrop-blur-md transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              <span>GitHub</span>
            </a>

            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 border border-border bg-card/80 px-4 py-2 font-mono text-xs text-foreground backdrop-blur-md transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
          </motion.div>

          {/* Interactive Environment Prompt */}
          <motion.div
            className="mt-12 flex flex-wrap items-center gap-4 border-t border-border/60 pt-5 font-mono text-xs text-muted-foreground"
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.42 }}
          >
            <button
              type="button"
              onClick={() => scrollToTarget("#about")}
              className="group inline-flex items-center gap-2 uppercase tracking-[0.18em] text-primary transition-colors hover:text-foreground"
            >
              <span>Scroll to enter</span>
              <span className="inline-block transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
            <span className="text-border">·</span>
            <span className="uppercase tracking-[0.15em]">
              Explore the environment: move cursor or drag to rotate nodes
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
