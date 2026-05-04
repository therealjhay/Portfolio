"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/config/site-content";

export function AboutSkills() {
  const { personalInfo, skills } = siteContent;
  const skillColumns = [
    { title: "Web3", items: skills.web3 },
    { title: "Frontend", items: skills.frontend },
    { title: "Backend", items: skills.backend },
  ];

  return (
    <section id="about" className="py-14 md:py-20 lg:py-24">
      <div className="section-shell grid gap-8 lg:grid-cols-12 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <span className="eyebrow">About</span>
          <h2 className="display-title mt-6 max-w-[18ch] text-[clamp(1.8rem,4.4vw,3.8rem)]">
            Engineering depth with product instincts.
          </h2>
          <p className="lede mt-6">{personalInfo.about}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="chip">Secure contracts</span>
            <span className="chip">Reliable integrations</span>
            <span className="chip">Clear execution</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <div className="surface p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--color-muted)" }}>
              Core stack
            </p>
            <div className="mt-5 grid gap-5">
              {skillColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-bold uppercase tracking-[0.08em]">{column.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {column.items.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
