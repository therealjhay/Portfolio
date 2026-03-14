"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { siteContent } from "@/config/site-content";
import { ProjectCard } from "@/components/core/project-card";

const filters = [
  { label: "All", value: "all" },
  { label: "Web3 / Smart Contracts", value: "web3" },
  { label: "Fullstack", value: "fullstack" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

export function ProjectsSection() {
  const { projects } = siteContent;
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <section
      id="projects"
      className="w-full border-b-4 border-ink bg-paper text-ink"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex border-4 border-ink bg-acid px-4 py-2 text-sm font-semibold uppercase tracking-wide">
                Projects
              </span>
              <h2 className="mt-6 text-3xl font-display md:text-5xl">
                A snapshot of on-chain and fullstack builds.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => {
                const isActive = activeFilter === filter.value;
                return (
                  <button
                    key={filter.value}
                    type="button"
                    data-cursor="hover"
                    aria-pressed={isActive}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`border-4 border-ink px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-transform hover:-translate-y-1 ${
                      isActive ? "bg-ink text-paper" : "bg-paper text-ink"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredProjects.map((project, index) => {
            const isWide = index % 3 === 0;
            return (
              <div key={project.id} className={isWide ? "md:col-span-2" : ""}>
                <ProjectCard project={project} index={index} highlight={isWide} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
