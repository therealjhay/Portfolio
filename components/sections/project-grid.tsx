"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  projectCategories,
  type ProjectCategory,
  siteContent,
} from "@/config/site-content";
import { cn } from "@/lib/utils";

const categoryLabel = (category: "web3" | "fullstack"): Exclude<ProjectCategory, "All"> =>
  category === "web3" ? "Smart Contracts" : "Full-Stack";

export function ProjectGrid() {
  const [active, setActive] = useState<ProjectCategory>("All");
  const shouldReduceMotion = useReducedMotion();

  const counts = useMemo(() => {
    const all = siteContent.projects.length;
    const web3 = siteContent.projects.filter((p) => p.category === "web3").length;
    const fullstack = all - web3;
    return {
      All: all,
      "Smart Contracts": web3,
      "Full-Stack": fullstack,
    };
  }, []);

  const filtered = useMemo(() => {
    if (active === "All") return siteContent.projects;
    return siteContent.projects.filter(
      (project) => categoryLabel(project.category) === active,
    );
  }, [active]);

  return (
    <section id="projects" className="border-b border-border py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mb-7">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Projects</p>
          <h1 className="mt-2 font-mono text-3xl md:text-4xl">
            Systems shipped with real users in mind
          </h1>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={active === category}
              className={cn(
                "min-h-11 border px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                active === category
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
              onClick={() => setActive(category)}
            >
              {category}{" "}
              <span className="ml-1 font-mono text-xs opacity-75">
                ({counts[category]})
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {filtered.map((project) => (
            <motion.article
              key={project.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <Card
                className="group flex h-full flex-col overflow-hidden border-border border-t-2 transition-transform duration-100 ease-out hover:-translate-y-1 hover:border-primary/65 hover:shadow-glow"
                style={{ borderTopColor: project.accentColor }}
              >
                {project.image ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/70 bg-muted/40">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-mono text-xl">{project.title}</h2>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {categoryLabel(project.category)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tag) => (
                      <Badge key={tag} variant="tag">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-auto flex gap-2 pt-2">
                    {project.githubUrl ? (
                      <ButtonLink
                        href={project.githubUrl}
                        variant="secondary"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full"
                      >
                        GitHub
                      </ButtonLink>
                    ) : null}
                    {project.liveUrl ? (
                      <ButtonLink
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full"
                      >
                        Live
                      </ButtonLink>
                    ) : null}
                  </div>
                </div>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
