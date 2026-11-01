"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Box,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Github,
  Globe,
  Layers,
  Shield,
  Terminal,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  projectCategories,
  type ProjectCategory,
  type ProjectItem,
  siteContent,
} from "@/config/site-content";
import {
  lockScroll,
  openProject,
  pulseScene,
  useOpenProject,
} from "@/components/experience/store";
import { cn } from "@/lib/utils";

const categoryLabel = (
  category: "web3" | "fullstack",
): Exclude<ProjectCategory, "All"> =>
  category === "web3" ? "Smart Contracts" : "Full-Stack";

export function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const openProjectId = useOpenProject();
  const shouldReduceMotion = useReducedMotion();

  const allProjects = siteContent.projects;
  const featuredProjects = useMemo(
    () => allProjects.filter((p) => p.featured),
    [allProjects],
  );

  const counts = useMemo(() => {
    const all = allProjects.length;
    const web3 = allProjects.filter((p) => p.category === "web3").length;
    return {
      All: all,
      "Smart Contracts": web3,
      "Full-Stack": all - web3,
    };
  }, [allProjects]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return allProjects;
    return allProjects.filter(
      (project) => categoryLabel(project.category) === activeCategory,
    );
  }, [activeCategory, allProjects]);

  const selectedProject = useMemo(
    () => allProjects.find((p) => p.id === openProjectId) ?? null,
    [allProjects, openProjectId],
  );

  useEffect(() => {
    lockScroll(Boolean(selectedProject));
    const onKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === "Escape") openProject(null);
      if (e.key === "ArrowRight") {
        const idx = allProjects.findIndex((p) => p.id === selectedProject.id);
        const next = allProjects[(idx + 1) % allProjects.length];
        openProject(next.id);
      }
      if (e.key === "ArrowLeft") {
        const idx = allProjects.findIndex((p) => p.id === selectedProject.id);
        const prev =
          allProjects[(idx - 1 + allProjects.length) % allProjects.length];
        openProject(prev.id);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject, allProjects]);

  const handleSelectProject = (id: string) => {
    pulseScene(1.25);
    openProject(id);
  };

  return (
    <section
      id="projects"
      className="relative z-10 border-b border-border/50 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 border border-border/80 bg-background/70 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
              <Box className="h-3.5 w-3.5" aria-hidden="true" />
              <span>02 // Interactive Project Universe</span>
            </div>
            <h2 className="mt-4 font-mono text-3xl font-bold tracking-tight sm:text-5xl">
              Systems shipped with{" "}
              <span className="text-primary">real architecture.</span>
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs leading-relaxed text-muted-foreground">
            Live deployed UIs are rendered directly in-viewport alongside
            on-chain architecture telemetry. Click any module to open its full
            system dossier.
          </p>
        </div>

        {/* 3 Featured Flagship Spatial Modules */}
        <div className="mt-12">
          <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span>Featured Flagship Systems // 01 — 03</span>
            <span className="hidden sm:inline">
              Tilt-reactive 3D modules · Click to inspect
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {featuredProjects.map((project, idx) => (
              <FeaturedModuleCard
                key={project.id}
                project={project}
                rank={idx}
                reduced={Boolean(shouldReduceMotion)}
                onOpen={() => handleSelectProject(project.id)}
              />
            ))}
          </div>
        </div>

        {/* Complete 14-Project Universe Matrix */}
        <div className="mt-20">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-border/70 pb-5 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                Complete System Index // 01 — {allProjects.length}
              </p>
              <h3 className="mt-1 font-mono text-2xl font-bold">
                All Engineered Protocols &amp; Applications
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {projectCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={activeCategory === category}
                  onClick={() => {
                    setActiveCategory(category);
                    pulseScene(0.7);
                  }}
                  className={cn(
                    "min-h-10 border px-3.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    activeCategory === category
                      ? "border-primary bg-primary text-primary-foreground font-bold"
                      : "border-border/80 bg-card/75 text-muted-foreground hover:border-primary/50 hover:text-foreground",
                  )}
                >
                  {category}{" "}
                  <span className="ml-1 opacity-75">({counts[category]})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectMatrixNode
                key={project.id}
                project={project}
                reduced={Boolean(shouldReduceMotion)}
                onOpen={() => handleSelectProject(project.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Project Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            allProjects={allProjects}
            onClose={() => openProject(null)}
            onSelect={(id) => openProject(id)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/**
 * Displays the live deployed UI directly in a scaled viewport when `project.liveUrl`
 * is present, or a live protocol/architecture blueprint terminal for on-chain/CLI repos.
 */
function ProjectDisplayViewport({
  project,
  interactive = false,
}: {
  project: ProjectItem;
  interactive?: boolean;
}) {
  const repoSlug = project.githubUrl.replace(/^https?:\/\/github\.com\//, "");
  const cleanHost = project.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  if (project.liveUrl) {
    return (
      <div className="relative flex aspect-[16/10] w-full flex-col overflow-hidden bg-background">
        {/* Browser Chrome Header */}
        <div className="flex h-7 shrink-0 items-center justify-between border-b border-border/80 bg-card px-3 font-mono text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="uppercase tracking-wider text-primary font-bold">
              LIVE UI
            </span>
          </div>
          <span className="truncate px-2 text-muted-foreground">
            {cleanHost}
          </span>
          <Globe className="h-3 w-3 shrink-0 text-primary" aria-hidden="true" />
        </div>

        {/* Scaled Live Deployed UI Iframe */}
        <div className="relative flex-1 w-full overflow-hidden bg-background">
          <iframe
            src={project.frameUrl ?? project.liveUrl}
            title={`${project.title} live deployed UI`}
            loading="lazy"
            className={cn(
              "h-[250%] w-[250%] origin-top-left scale-[0.4] border-0 bg-background",
              !interactive && "pointer-events-none select-none",
            )}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden bg-background/95 p-4 font-mono text-xs">
      <div className="playground-grid pointer-events-none absolute inset-0 opacity-35" />

      {/* Top Protocol Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-border/70 pb-2 text-[10px]">
        <span className="inline-flex items-center gap-1.5 text-primary font-bold">
          <Terminal className="h-3 w-3" aria-hidden="true" />
          <span>PROTOCOL ARCHITECTURE // {project.index}</span>
        </span>
        <span className="truncate text-muted-foreground">{repoSlug}</span>
      </div>

      {/* Real Architecture Modules */}
      <div className="relative z-10 my-auto space-y-1.5 py-2">
        {project.caseStudy.contribution.slice(0, 3).map((line, i) => (
          <div
            key={line}
            className="flex items-start gap-2 border border-border/60 bg-card/85 px-2.5 py-1.5 text-[11px] leading-snug text-foreground/90"
          >
            <span
              className="shrink-0 font-bold"
              style={{ color: project.accentColor }}
            >
              0{i + 1}
            </span>
            <span className="line-clamp-1">{line}</span>
          </div>
        ))}
      </div>

      {/* Bottom Stack Telemetry */}
      <div className="relative z-10 flex items-center justify-between border-t border-border/70 pt-2 text-[10px] text-muted-foreground">
        <span className="truncate">
          {project.techStack.slice(0, 4).join(" · ")}
        </span>
        <span style={{ color: project.accentColor }}>ON-CHAIN / SOURCE</span>
      </div>
    </div>
  );
}

function FeaturedModuleCard({
  project,
  rank,
  reduced,
  onOpen,
}: {
  project: ProjectItem;
  rank: number;
  reduced: boolean;
  onOpen: () => void;
}) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -ny * 9, ry: nx * 11 });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const icons = [Shield, Cpu, Layers];
  const Icon = icons[rank % icons.length];

  return (
    <motion.article
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        reduced
          ? undefined
          : {
              transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: "transform 140ms ease-out",
            }
      }
      className="group relative flex flex-col justify-between overflow-hidden border border-border/90 bg-card/85 backdrop-blur-md transition-colors hover:border-primary/80 hover:shadow-glow"
    >
      {/* Top Accent Signal Bar */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: project.accentColor }}
      />

      {/* Header Telemetry */}
      <div className="flex items-center justify-between border-b border-border/70 px-5 py-3 font-mono text-xs">
        <span className="flex items-center gap-2 font-bold text-primary">
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          <span>FLAGSHIP // {project.index}</span>
        </span>
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {categoryLabel(project.category)}
        </span>
      </div>

      {/* Live Deployed UI / Architecture Display */}
      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full border-b border-border/70 text-left focus-visible:outline-none"
      >
        <ProjectDisplayViewport project={project} />
        <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 border border-border bg-background/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground backdrop-blur-md transition-colors group-hover:border-primary group-hover:text-primary">
          <span>{project.liveUrl ? "Inspect Live UI" : "Inspect System"}</span>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </div>
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <button
            type="button"
            onClick={onOpen}
            className="text-left focus-visible:outline-none"
          >
            <h3 className="font-mono text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
              {project.title}
            </h3>
            <p className="mt-1 font-mono text-xs text-primary/90">
              {project.tagline}
            </p>
          </button>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="tag">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center gap-2 border-t border-border/70 pt-4">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 bg-primary px-3 font-mono text-xs font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <span>Open Case Study</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center justify-center border border-border bg-background/70 px-3 font-mono text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
            title={`${project.title} GitHub Repository`}
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center justify-center border border-border bg-background/70 px-3 font-mono text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
              title={`${project.title} Live Demo`}
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectMatrixNode({
  project,
  reduced,
  onOpen,
}: {
  project: ProjectItem;
  reduced: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.article
      initial={reduced ? undefined : { opacity: 0, y: 14 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="group flex flex-col justify-between border border-border/85 bg-card/80 backdrop-blur-md transition-all duration-150 hover:-translate-y-1 hover:border-primary/70 hover:shadow-glow"
      style={{ borderTopWidth: "2px", borderTopColor: project.accentColor }}
    >
      <div>
        <button
          type="button"
          onClick={onOpen}
          className="relative block w-full border-b border-border/70 text-left focus-visible:outline-none"
        >
          <ProjectDisplayViewport project={project} />
        </button>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <button
              type="button"
              onClick={onOpen}
              className="text-left focus-visible:outline-none"
            >
              <h4 className="font-mono text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                {project.title}
              </h4>
            </button>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {categoryLabel(project.category)}
            </span>
          </div>

          <p className="mt-1 font-mono text-xs text-primary/85">
            {project.tagline}
          </p>
          <p className="mt-2.5 line-clamp-3 text-sm text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tag) => (
              <Badge key={tag} variant="tag">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-border/60 px-5 py-3.5">
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex min-h-9 flex-1 items-center justify-between border border-border bg-background/70 px-3 font-mono text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <span>{project.liveUrl ? "Inspect Live UI" : "Inspect System"}</span>
          <span>→</span>
        </button>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background/70 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          title="GitHub Repository"
          aria-label={`${project.title} GitHub`}
        >
          <Github className="h-4 w-4" aria-hidden="true" />
        </a>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background/70 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            title="Live Deployment"
            aria-label={`${project.title} Live Demo`}
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

function ProjectDetailModal({
  project,
  allProjects,
  onClose,
  onSelect,
}: {
  project: ProjectItem;
  allProjects: ProjectItem[];
  onClose: () => void;
  onSelect: (id: string) => void;
}) {
  const currentIdx = allProjects.findIndex((p) => p.id === project.id);
  const prevProject =
    allProjects[(currentIdx - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIdx + 1) % allProjects.length];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-3 backdrop-blur-xl sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden border border-border bg-card shadow-glow"
        style={{ borderTopWidth: "3px", borderTopColor: project.accentColor }}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold">
              SYSTEM DOSSIER // {project.index}
            </span>
            <span className="text-border">|</span>
            <span className="uppercase text-muted-foreground">
              {categoryLabel(project.category)}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Close project dossier"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          <div className="grid gap-6 md:grid-cols-[1.05fr_1.15fr] md:items-center">
            <div className="space-y-3">
              <h2
                id="project-modal-title"
                className="font-mono text-3xl font-bold text-foreground sm:text-4xl"
              >
                {project.title}
              </h2>
              <p className="font-mono text-sm text-primary">
                {project.tagline}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 bg-primary px-4 py-2 font-mono text-xs font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>View Source on GitHub</span>
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-10 items-center gap-2 border border-border bg-background px-4 py-2 font-mono text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    <span>Launch Deployed UI</span>
                  </a>
                )}
              </div>
            </div>

            <div className="overflow-hidden border border-border">
              <ProjectDisplayViewport project={project} interactive />
            </div>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border border-border/80 bg-background/60 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                01 // Problem Statement
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                {project.caseStudy.problem}
              </p>
            </div>

            <div className="border border-border/80 bg-background/60 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                02 // Architectural Solution
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                {project.caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Engineering Contribution */}
          <div className="border border-border/80 bg-background/60 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
              03 // My Contribution &amp; System Components
            </p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-1">
              {project.caseStudy.contribution.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-foreground/90"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Stack */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              04 // Technology Used
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="tag"
                  className="border-primary/30 px-2.5 py-1 font-mono text-xs"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Switcher */}
        <div className="flex items-center justify-between border-t border-border bg-background/80 px-5 py-3 font-mono text-xs">
          <button
            type="button"
            onClick={() => onSelect(prevProject.id)}
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Prev: {prevProject.title}</span>
          </button>

          <span className="hidden text-muted-foreground sm:inline">
            ESC to close · ←/→ to switch
          </span>

          <button
            type="button"
            onClick={() => onSelect(nextProject.id)}
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <span>Next: {nextProject.title}</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
