"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/config/site-content";

const workSignals = [
  "Protocol architecture",
  "Audit-conscious solidity",
  "Product-grade frontends",
  "Backend systems design",
];

export function Hero() {
  const { personalInfo } = siteContent;

  return (
    <section id="home" className="pt-6 md:pt-10">
      <div className="section-shell grid gap-8 py-10 md:py-14 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-8"
        >
          <span className="eyebrow">{personalInfo.role}</span>
          <h1 className="display-title mt-6">
            Founder-minded engineering for teams shipping{" "}
            <span style={{ color: "var(--color-accent)" }}>on-chain products</span>.
          </h1>
          <p className="lede mt-6 text-base md:text-lg">{personalInfo.bio}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              Explore Projects
            </a>
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              GitHub Profile
            </a>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-4"
        >
          <div className="surface p-6">
            <p
              className="text-xs font-semibold uppercase tracking-[0.1em]"
              style={{ color: "var(--color-muted)" }}
            >
              Operating profile
            </p>
            <ul className="mt-4 grid gap-2">
              {workSignals.map((signal) => (
                <li key={signal} className="chip !justify-start !rounded-lg !px-3 !py-2">
                  {signal}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              I work across product definition, protocol constraints, and implementation quality so
              teams can move fast without shipping fragile systems.
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
