"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Layers, Sparkles } from "lucide-react";
import { siteContent } from "@/config/site-content";
import { pulseScene } from "@/components/experience/store";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();
  const { about, pillars } = siteContent.personalInfo;
  const [activePillar, setActivePillar] = useState(0);

  const handleSelectPillar = (index: number) => {
    setActivePillar(index);
    pulseScene(0.9);
  };

  return (
    <section
      id="about"
      className="relative z-10 border-b border-border/50 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        {/* Editorial Narrative Header */}
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 border border-border/80 bg-background/70 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              <span>01 // The Engineer Behind the Systems</span>
            </div>

            <motion.h2
              className="font-mono text-3xl font-bold leading-tight tracking-tight sm:text-5xl"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              Understanding complex systems — and turning ideas into{" "}
              <span className="text-primary">working products.</span>
            </motion.h2>

            <div className="space-y-4 border-l-2 border-primary/50 pl-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              {about.map((paragraph, idx) => (
                <motion.p
                  key={paragraph}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Interactive System Layer Inspector */}
          <div className="flex flex-col justify-between border border-border/90 bg-card/85 p-6 backdrop-blur-md md:p-8">
            <div>
              <div className="flex items-center justify-between border-b border-border/80 pb-4 font-mono text-xs text-muted-foreground">
                <span>ACTIVE BLUEPRINT LAYER</span>
                <span className="text-primary">{pillars[activePillar].code}</span>
              </div>

              <div className="mt-6 space-y-3">
                <span className="inline-flex items-center gap-1.5 border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-primary">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  {pillars[activePillar].signal}
                </span>
                <h3 className="font-mono text-2xl font-bold text-foreground">
                  {pillars[activePillar].title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {pillars[activePillar].body}
                </p>
              </div>
            </div>

            {/* Visual Stack Bar Indicator */}
            <div className="mt-8 border-t border-border/70 pt-4">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <span>Architecture Stack Depth</span>
                <span>
                  Layer 0{activePillar + 1} / 0{pillars.length}
                </span>
              </div>
              <div className="mt-2 grid grid-cols-6 gap-1.5">
                {pillars.map((pillar, i) => (
                  <button
                    key={pillar.code}
                    type="button"
                    aria-label={`Select ${pillar.title}`}
                    onClick={() => handleSelectPillar(i)}
                    className={cn(
                      "h-2 transition-all",
                      i === activePillar
                        ? "bg-primary"
                        : "bg-border hover:bg-primary/40",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 6 Interactive Engineering Pillars */}
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, idx) => {
            const isSelected = activePillar === idx;
            return (
              <motion.button
                key={pillar.code}
                type="button"
                onClick={() => handleSelectPillar(idx)}
                onMouseEnter={() => setActivePillar(idx)}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.25, delay: idx * 0.04, ease: "easeOut" }}
                className={cn(
                  "group flex flex-col justify-between border p-5 text-left backdrop-blur-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isSelected
                    ? "border-primary bg-card/95 shadow-glow -translate-y-0.5"
                    : "border-border/80 bg-card/70 hover:border-primary/50 hover:bg-card/90",
                )}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span
                      className={cn(
                        "tracking-[0.16em]",
                        isSelected ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {pillar.code}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {pillar.signal}
                    </span>
                  </div>
                  <h3 className="mt-3 font-mono text-lg font-bold text-foreground group-hover:text-primary">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pillar.body}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <span>Inspect node</span>
                  <span
                    className={cn(
                      "transition-transform group-hover:translate-x-1",
                      isSelected && "text-primary",
                    )}
                  >
                    →
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
