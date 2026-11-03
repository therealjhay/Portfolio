"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Code2,
  Globe,
  Search,
} from "lucide-react";
import {
  type ProjectItem,
  type RoleLens,
  siteContent,
} from "@/config/site-content";

type FilterTab = "all" | "live" | RoleLens;

const LENS_LABELS: Record<RoleLens, string> = {
  product: "Product",
  engineering: "AI & Web",
  business: "Commercial",
};

function LiveProductCard({ project }: { project: ProjectItem }) {
  const [openCaseStudy, setOpenCaseStudy] = useState(false);
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const iframeSrc = project.frameUrl ?? project.liveUrl;
  const isLoaded = loadedUrl === iframeSrc;

  return (
    <article className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/50">
      <div>
        {/* Browser Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
            <span className="ml-2 truncate font-mono text-[11px] text-muted-foreground">
              {project.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </span>
          </div>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-primary hover:underline"
            >
              <span>Open</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          ) : null}
        </div>

        {/* Live App Viewport */}
        {iframeSrc ? (
          <div className="relative h-64 w-full overflow-hidden border-b border-border bg-muted/20 sm:h-72">
            {!isLoaded ? (
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted-foreground">
                Loading preview...
              </div>
            ) : null}
            <iframe
              src={iframeSrc}
              title={`${project.title} live preview`}
              loading="lazy"
              onLoad={() => setLoadedUrl(iframeSrc)}
              className="h-full w-full border-0 bg-white"
            />
          </div>
        ) : null}

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.lenses.map((lens) => (
              <span
                key={lens}
                className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-medium text-primary"
              >
                {LENS_LABELS[lens]}
              </span>
            ))}
          </div>

          <h3 className="mt-3 font-display text-2xl font-bold text-foreground">
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-foreground/85">
            {project.tagline}
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {openCaseStudy ? (
            <div className="mt-5 space-y-3 rounded-xl border border-border bg-background p-4 text-xs leading-relaxed">
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                  Opportunity
                </span>
                <p className="mt-1 text-muted-foreground">
                  {project.productImpact.opportunity}
                </p>
              </div>
              <div className="border-t border-border pt-2.5">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                  Execution
                </span>
                <p className="mt-1 text-muted-foreground">
                  {project.productImpact.execution}
                </p>
              </div>
              <div className="border-t border-border pt-2.5">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                  Impact
                </span>
                <p className="mt-1 text-muted-foreground">
                  {project.productImpact.businessValue}
                </p>
              </div>
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-background px-2.5 py-0.5 font-mono text-[11px] text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-6 py-4">
        <div className="flex items-center gap-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Live App</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : null}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary"
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpenCaseStudy((v) => !v)}
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <span>{openCaseStudy ? "Hide breakdown" : "Case study"}</span>
          {openCaseStudy ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </article>
  );
}

function SystemArchiveCard({ project }: { project: ProjectItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/50">
      <div>
        <div className="flex flex-wrap items-center gap-1.5">
          {project.lenses.map((lens) => (
            <span
              key={lens}
              className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-medium text-primary"
            >
              {LENS_LABELS[lens]}
            </span>
          ))}
        </div>

        <h3 className="mt-3 font-display text-xl font-bold text-foreground">
          {project.title}
        </h3>
        <p className="mt-0.5 text-xs font-medium text-foreground/80">
          {project.tagline}
        </p>

        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {expanded ? (
          <div className="mt-4 space-y-2.5 rounded-xl border border-border bg-background p-3.5 text-xs leading-relaxed">
            <div>
              <strong className="font-mono text-[10px] uppercase text-primary">
                Opportunity:{" "}
              </strong>
              <span className="text-muted-foreground">
                {project.productImpact.opportunity}
              </span>
            </div>
            <div>
              <strong className="font-mono text-[10px] uppercase text-primary">
                Execution:{" "}
              </strong>
              <span className="text-muted-foreground">
                {project.productImpact.execution}
              </span>
            </div>
            <div>
              <strong className="font-mono text-[10px] uppercase text-primary">
                Impact:{" "}
              </strong>
              <span className="text-muted-foreground">
                {project.productImpact.businessValue}
              </span>
            </div>
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary"
        >
          <Code2 className="h-3.5 w-3.5" />
          <span>GitHub</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <span>{expanded ? "Less" : "Case study"}</span>
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </article>
  );
}

export function ProjectGrid() {
  const [filter, setFilter] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");

  const liveProducts = useMemo(
    () => siteContent.projects.filter((p) => Boolean(p.liveUrl)),
    [],
  );
  const additionalSystems = useMemo(
    () => siteContent.projects.filter((p) => !p.liveUrl),
    [],
  );

  const matchesFilterAndSearch = (p: ProjectItem) => {
    if (filter === "live" && !p.liveUrl) return false;
    if (
      (filter === "product" ||
        filter === "engineering" ||
        filter === "business") &&
      !p.lenses.includes(filter)
    ) {
      return false;
    }

    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.techStack.some((t) => t.toLowerCase().includes(q))
    );
  };

  const visibleLive = liveProducts.filter(matchesFilterAndSearch);
  const visibleAdditional = additionalSystems.filter(matchesFilterAndSearch);

  return (
    <section
      id="projects"
      className="relative border-b border-border py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              Selected Work
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Products &amp; Systems
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                aria-label="Search projects"
                className="w-44 rounded-xl border border-border bg-card py-1.5 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none sm:w-52"
              />
            </div>

            <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-card p-1">
              {(
                [
                  ["all", "All"],
                  ["live", "Live Apps (6)"],
                  ["product", "Product"],
                  ["engineering", "AI & Web"],
                  ["business", "Commercial"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
                    filter === key
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 1. Live Deployed Products */}
        {visibleLive.length > 0 ? (
          <div className="mt-10">
            <h3 className="mb-5 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Live Applications ({visibleLive.length})
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              {visibleLive.map((project) => (
                <LiveProductCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ) : null}

        {/* 2. Additional Product, AI & Protocol Systems */}
        {visibleAdditional.length > 0 ? (
          <div className="mt-14">
            <h3 className="mb-5 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Additional Systems &amp; Protocols ({visibleAdditional.length})
            </h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleAdditional.map((project) => (
                <SystemArchiveCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
