"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent } from "react";
import { siteContent } from "@/config/site-content";

const dotColors = ["bg-hot", "bg-cyan", "bg-acid", "bg-orange"] as const;
const dots = Array.from({ length: 96 }, (_, index) => index);

export function Hero() {
  const { personalInfo } = siteContent;
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, { stiffness: 120, damping: 20 });
  const springY = useSpring(offsetY, { stiffness: 120, damping: 20 });

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const percentX = (event.clientX - rect.left) / rect.width - 0.5;
    const percentY = (event.clientY - rect.top) / rect.height - 0.5;
    offsetX.set(percentX * 24);
    offsetY.set(percentY * 24);
  };

  const handleLeave = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative min-h-screen w-full overflow-hidden bg-paper text-ink border-b-4 border-ink"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ x: springX, y: springY }}
      >
        <div className="grid h-full w-full grid-cols-12 gap-6 px-8 py-10 opacity-35">
          {dots.map((dot) => (
            <div
              key={dot}
              className={`h-2 w-2 rounded-full ${dotColors[dot % dotColors.length]}`}
            />
          ))}
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em]">
            {personalInfo.role}
          </p>
          <h1 className="mt-6 text-4xl font-display leading-tight md:text-6xl">
            {personalInfo.headline}
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-xl">{personalInfo.bio}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              data-cursor="hover"
              className="inline-flex items-center justify-center border-4 border-ink bg-hot px-6 py-3 text-base font-semibold uppercase tracking-wide transition-transform hover:-translate-y-1"
            >
              View Projects
            </a>
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex items-center justify-center border-4 border-ink bg-cyan px-6 py-3 text-base font-semibold uppercase tracking-wide transition-transform hover:-translate-y-1"
            >
              GitHub
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="lg:col-span-5"
        >
          <div className="border-4 border-ink bg-ink text-paper p-6 font-mono">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em]">
              <span className="h-3 w-3 rounded-full bg-hot" />
              <span className="h-3 w-3 rounded-full bg-cyan" />
              <span className="h-3 w-3 rounded-full bg-acid" />
              <span className="ml-auto">terminal</span>
            </div>
            <div className="mt-6 space-y-3 text-sm">
              <TypingLine delay="0s" text="$ forge build --watch" />
              <TypingLine delay="1.6s" text="> compiled 14 contracts" />
              <TypingLine delay="3.2s" text="> gas snapshot: 43,120" />
              <TypingLine delay="4.8s" text="$ pnpm dev" />
              <TypingLine delay="6.4s" text="> listening on localhost:3000" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TypingLine({ text, delay }: { text: string; delay: string }) {
  return (
    <span
      className="inline-block whitespace-nowrap overflow-hidden border-r-2 border-paper pr-2"
      style={{
        animation: `typing 1.2s steps(30, end) ${delay} both, blink 0.8s step-end infinite` as string,
      }}
    >
      {text}
    </span>
  );
}
