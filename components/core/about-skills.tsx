"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/config/site-content";

export function AboutSkills() {
  const { personalInfo, skills } = siteContent;

  return (
    <section
      id="about"
      className="w-full border-b-4 border-paper bg-ink text-paper"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <span className="inline-flex border-4 border-paper bg-hot px-4 py-2 text-sm font-semibold uppercase tracking-wide text-ink">
              About + Skills
            </span>
            <h2 className="mt-6 text-3xl font-display md:text-5xl">
              Bridging Web2 architecture with Web3 infrastructure.
            </h2>
            <p className="mt-6 text-lg leading-relaxed">{personalInfo.about}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="border-2 border-paper bg-cyan px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
                Django + React
              </span>
              <span className="border-2 border-paper bg-acid px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
                Smart Contracts
              </span>
              <span className="border-2 border-paper bg-orange px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
                Systems Design
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-5 lg:translate-y-8"
          >
            <div className="border-4 border-paper bg-paper p-6 text-ink">
              <h3 className="text-xl font-display">Focus Areas</h3>
              <p className="mt-4 text-base leading-relaxed">
                Protocol design, audit-ready Solidity, and product-grade dashboards. I build
                the glue that makes on-chain logic feel fast, friendly, and reliable.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
                <span className="border-2 border-ink bg-hot px-2 py-1">Protocol UX</span>
                <span className="border-2 border-ink bg-cyan px-2 py-1">Indexing</span>
                <span className="border-2 border-ink bg-acid px-2 py-1">Automation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <SkillsMarquee label="Web3" items={skills.web3} tone="paper" />
      <SkillsMarquee label="Frontend" items={skills.frontend} tone="cyan" reverse />
      <SkillsMarquee label="Backend" items={skills.backend} tone="acid" />
    </section>
  );
}

function SkillsMarquee({
  label,
  items,
  tone,
  reverse,
}: {
  label: string;
  items: string[];
  tone: "paper" | "cyan" | "acid";
  reverse?: boolean;
}) {
  const list = [...items, ...items];
  const background =
    tone === "paper"
      ? "bg-paper text-ink"
      : tone === "cyan"
      ? "bg-cyan text-ink"
      : "bg-acid text-ink";

  return (
    <div className={`border-t-4 border-ink ${background} overflow-hidden`}>
      <div
        className={`flex w-max items-center gap-4 px-6 py-6 text-sm font-semibold uppercase tracking-wide ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        <span className="border-2 border-ink px-3 py-1">{label}</span>
        {list.map((item, index) => (
          <span key={`${label}-${item}-${index}`} className="border-2 border-ink px-3 py-1">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
