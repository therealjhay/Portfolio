"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { projectCategories, projects } from "@/content/projects";
import { cn } from "@/lib/utils";

export function ProjectGrid() {
  const [active, setActive] = useState<(typeof projectCategories)[number]>("All");
  const shouldReduceMotion = useReducedMotion();
  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((project) => project.category === active);
  }, [active]);

  return (
    <section id="projects" className="border-b border-border py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mb-7">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Projects</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Systems shipped with real users in mind</h2>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={cn(
                "min-h-11 border px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                active === category ? "border-primary text-primary" : "border-border text-muted-foreground",
              )}
              onClick={() => setActive(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {filtered.map((project) => (
            <motion.article
              key={project.name}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <Card className="flex h-full flex-col gap-4 border-border p-5 transition-transform duration-100 ease-out hover:-translate-y-1 hover:border-primary/65 hover:shadow-glow">
                <h3 className="font-mono text-xl">{project.name}</h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <div className="mt-auto flex gap-2">
                  <ButtonLink href={project.githubUrl} variant="secondary" target="_blank" rel="noreferrer" className="w-full">
                    GitHub
                  </ButtonLink>
                  {project.liveUrl ? (
                    <ButtonLink href={project.liveUrl} target="_blank" rel="noreferrer" className="w-full">
                      Live
                    </ButtonLink>
                  ) : null}
                </div>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
