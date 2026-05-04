"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/core/project-card";
import { siteContent } from "@/config/site-content";

const filters = [
  { label: "All", value: "all" },
  { label: "Web3 / Smart Contracts", value: "web3" },
  { label: "Fullstack", value: "fullstack" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const { projects } = siteContent;

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <section id="projects" className="py-14 md:py-20 lg:py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <span className="eyebrow">Projects</span>
            <h2 className="display-title mt-6 text-[clamp(1.8rem,4.4vw,3.8rem)] max-w-[18ch]">
              Selected work with production constraints.
            </h2>
          </div>

          <div className="surface flex flex-wrap gap-2 p-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter.value)}
                  className="rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em]"
                  style={{
                    background: isActive ? "var(--color-accent-soft)" : "transparent",
                    color: isActive ? "var(--color-text)" : "var(--color-muted)",
                  }}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-10 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.24 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
