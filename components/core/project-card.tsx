"use client";

import { motion } from "framer-motion";
import { ProjectSchema } from "@/config/site-content";
import { ExternalLink, Github } from "lucide-react";
import { z } from "zod";

type Project = z.infer<typeof ProjectSchema>;

interface ProjectCardProps {
  project: Project;
  index: number;
  highlight?: boolean;
}

export function ProjectCard({ project, index, highlight }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ y: -6, rotate: highlight ? -1 : 1 }}
      className="relative flex h-full flex-col gap-5 border-4 border-ink bg-paper p-6 text-ink"
    >
      <div
        className="h-20 w-full border-4 border-ink"
        style={{ backgroundColor: project.accentColor }}
      />
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-display">{project.title}</h3>
        <p className="text-base leading-relaxed">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="border-2 border-ink bg-white px-2 py-1 text-xs font-semibold uppercase tracking-wide"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="inline-flex items-center gap-2 border-2 border-ink bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-wide text-paper transition-transform hover:-translate-y-1"
          >
            <Github className="h-4 w-4" />
            View Source Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="inline-flex items-center gap-2 border-2 border-ink bg-hot px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition-transform hover:-translate-y-1"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        )}
      </div>
    </motion.article>
  );
}
