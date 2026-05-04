"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { z } from "zod";
import { ProjectSchema } from "@/config/site-content";

type Project = z.infer<typeof ProjectSchema>;

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="surface flex h-full flex-col gap-5 p-5 md:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="chip">
          {project.category === "web3" ? "Web3 / Smart Contracts" : "Fullstack"}
        </span>
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.08em]"
          style={{ color: "var(--color-muted)" }}
        >
          {project.techStack.length} technologies
        </span>
      </div>

      <div>
        <h3 className="text-xl font-bold leading-tight md:text-2xl">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        {project.githubUrl ? (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Github className="h-4 w-4" />
            Source
          </a>
        ) : null}

        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <ExternalLink className="h-4 w-4" />
            Live
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}
