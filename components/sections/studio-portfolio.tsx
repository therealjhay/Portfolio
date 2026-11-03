"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Command,
  Copy,
  FileText,
  Globe,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { type ProjectItem, siteContent } from "@/config/site-content";

const emptySubscribe = () => () => {};

type ViewPerspective = "product" | "engineering";

export function StudioPortfolio() {
  const { personalInfo, capabilityGroups, projects, articles, socialLinks } =
    siteContent;
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";

  const liveProducts = useMemo(
    () => projects.filter((p) => Boolean(p.liveUrl)),
    [projects],
  );

  const [perspective, setPerspective] = useState<ViewPerspective>("product");
  const [activeAppId, setActiveAppId] = useState<string>(
    liveProducts[0]?.id ?? "betta-pay",
  );
  const [loadedIframeUrl, setLoadedIframeUrl] = useState<string | null>(null);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Command Palette (Cmd + K)
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      } else if (e.key === "Escape") {
        setCmdOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const activeLiveApp =
    liveProducts.find((p) => p.id === activeAppId) ?? liveProducts[0];
  const iframeSrc = activeLiveApp.frameUrl ?? activeLiveApp.liveUrl;
  const isIframeLoaded = loadedIframeUrl === iframeSrc;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Ignore
    }
  };

  const filteredCmdProjects = useMemo(() => {
    if (!cmdQuery.trim()) return projects;
    const q = cmdQuery.toLowerCase();
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q)),
    );
  }, [projects, cmdQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* ================================================================= */}
      {/* CENTERED DESIGN-ENGINEER COLUMN (rauno.me / emilkowal.ski style)  */}
      {/* ================================================================= */}
      <div className="mx-auto max-w-[780px] px-5 py-12 sm:px-8 sm:py-20">
        {/* 1. Minimal Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[15px] font-semibold tracking-tight text-foreground"
            >
              {personalInfo.name}
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-0.5 text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Available</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/resume"
              className="rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Resume
            </Link>

            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              aria-label="Open command menu"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[11px] text-muted-foreground shadow-sm transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <Command className="h-3 w-3" />
              <span>K</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label="Toggle theme"
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              {isDark ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </header>

        {/* 2. Restrained Editorial Intro */}
        <section className="mt-14 sm:mt-16">
          <h1 className="text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-[28px]">
            I design, build, and ship{" "}
            <span className="font-serif italic font-normal">
              software products
            </span>{" "}
            that solve real market problems.
          </h1>

          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              I work across the full product lifecycle—shaping product direction
              and user flows, building AI-native web applications and smart
              contracts, and structuring the commercial mechanics that help
              products grow.
            </p>
            <p>
              Previously and currently shipping across{" "}
              <span className="text-foreground">Next.js</span>,{" "}
              <span className="text-foreground">TypeScript</span>,{" "}
              <span className="text-foreground">Python</span>,{" "}
              <span className="text-foreground">Gemini AI</span>,{" "}
              <span className="text-foreground">Rust (Soroban)</span>, and{" "}
              <span className="text-foreground">Solidity</span>.
            </p>
          </div>

          {/* Subtle Inline Links */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Copied {personalInfo.email}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{personalInfo.email}</span>
                </>
              )}
            </button>

            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-0.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}

            <Link
              href="/resume"
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <FileText className="h-3 w-3" />
              <span>Resume PDF</span>
            </Link>
          </div>
        </section>

        {/* 3. Perspective Switcher (Product & Business vs Engineering & AI) */}
        <section className="mt-16 border-t border-border pt-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-sm font-medium text-foreground">
                Live Products
              </h2>
              <p className="mt-0.5 text-[13px] text-muted-foreground">
                Interact with deployed applications below or toggle the reading
                lens.
              </p>
            </div>

            {/* Spring-animated segmented control */}
            <div className="inline-flex self-start rounded-lg border border-border bg-muted/60 p-0.5">
              {(
                [
                  ["product", "Product & Business"],
                  ["engineering", "Engineering & Stack"],
                ] as const
              ).map(([key, label]) => {
                const active = perspective === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPerspective(key)}
                    className={`relative rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {active ? (
                      <motion.span
                        layoutId="perspective-pill"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                        className="absolute inset-0 rounded-md bg-card shadow-sm"
                      />
                    ) : null}
                    <span className="relative z-10">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6 Live App Switcher Pills */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {liveProducts.map((proj) => {
              const active = proj.id === activeLiveApp.id;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => setActiveAppId(proj.id)}
                  className={`relative rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {proj.title}
                </button>
              );
            })}
          </div>

          {/* Minimalist Interactive Browser Window */}
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            {/* Window Top Bar */}
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3.5 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                  {activeLiveApp.liveUrl
                    ?.replace(/^https?:\/\//, "")
                    .replace(/\/$/, "")}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                {activeLiveApp.liveUrl ? (
                  <a
                    href={activeLiveApp.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-foreground hover:underline"
                  >
                    <Globe className="h-3 w-3" />
                    <span>Open</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                ) : null}
                <a
                  href={activeLiveApp.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  <span>Code</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Live Iframe */}
            {iframeSrc ? (
              <div className="relative h-[360px] w-full overflow-hidden border-b border-border bg-muted/20 sm:h-[420px]">
                {!isIframeLoaded ? (
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted-foreground">
                    Loading {activeLiveApp.title}...
                  </div>
                ) : null}
                <iframe
                  key={iframeSrc}
                  src={iframeSrc}
                  title={`${activeLiveApp.title} live preview`}
                  loading="lazy"
                  onLoad={() => setLoadedIframeUrl(iframeSrc)}
                  className="h-full w-full border-0 bg-white"
                />
              </div>
            ) : null}

            {/* Perspective-Aware Caption */}
            <div className="p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-foreground">
                  {activeLiveApp.title}
                </h3>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {activeLiveApp.techStack.join(" · ")}
                </span>
              </div>

              {perspective === "product" ? (
                <div className="mt-2.5 grid gap-3 text-[13px] leading-relaxed text-muted-foreground sm:grid-cols-2">
                  <p>
                    <strong className="font-medium text-foreground">
                      Opportunity:{" "}
                    </strong>
                    {activeLiveApp.productImpact.opportunity}
                  </p>
                  <p>
                    <strong className="font-medium text-foreground">
                      Outcome:{" "}
                    </strong>
                    {activeLiveApp.productImpact.businessValue}
                  </p>
                </div>
              ) : (
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
                  <strong className="font-medium text-foreground">
                    Architecture &amp; Build:{" "}
                  </strong>
                  {activeLiveApp.productImpact.execution}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 4. Hover-Dimming Complete Project Index (paco.me / rauno.me style) */}
        <section id="projects" className="mt-16 border-t border-border pt-12">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-medium text-foreground">
              Selected Work
            </h2>
            <span className="font-mono text-xs text-muted-foreground">
              {projects.length} projects
            </span>
          </div>

          <div className="group/list mt-4 divide-y divide-border/70">
            {projects.map((project: ProjectItem) => {
              const isExpanded = expandedProjectId === project.id;
              return (
                <div
                  key={project.id}
                  className="transition-opacity duration-150 group-hover/list:opacity-45 hover:!opacity-100"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedProjectId(isExpanded ? null : project.id)
                    }
                    className="flex w-full items-baseline justify-between gap-4 py-3.5 text-left"
                  >
                    <div className="flex min-w-0 items-baseline gap-3">
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {project.index}
                      </span>
                      <span className="truncate text-[15px] font-medium text-foreground">
                        {project.title}
                      </span>
                      <span className="hidden truncate text-[13px] text-muted-foreground sm:inline">
                        {project.tagline}
                      </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-2.5 font-mono text-[11px] text-muted-foreground">
                      {project.liveUrl ? (
                        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-foreground">
                          Live
                        </span>
                      ) : null}
                      <span>{project.techStack[0]}</span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mb-4 rounded-xl border border-border bg-card p-4 text-[13px] leading-relaxed text-muted-foreground">
                          <p className="text-foreground">{project.description}</p>

                          <div className="mt-3 grid gap-3 border-t border-border pt-3 sm:grid-cols-2">
                            <div>
                              <span className="font-medium text-foreground">
                                Opportunity:{" "}
                              </span>
                              {project.productImpact.opportunity}
                            </div>
                            <div>
                              <span className="font-medium text-foreground">
                                Execution:{" "}
                              </span>
                              {project.productImpact.execution}
                            </div>
                          </div>

                          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                            <span className="font-mono text-[11px] text-muted-foreground">
                              {project.techStack.join(" · ")}
                            </span>

                            <div className="flex items-center gap-3 text-xs font-medium">
                              {project.liveUrl ? (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-foreground hover:underline"
                                >
                                  <span>Live App</span>
                                  <ArrowUpRight className="h-3 w-3" />
                                </a>
                              ) : null}
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-foreground hover:underline"
                              >
                                <span>GitHub</span>
                                <ArrowUpRight className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Capabilities (3 Clean Columns) */}
        <section id="stack" className="mt-16 border-t border-border pt-12">
          <h2 className="text-sm font-medium text-foreground">Capabilities</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {capabilityGroups.map((group) => (
              <div key={group.id}>
                <h3 className="text-[13px] font-medium text-foreground">
                  {group.title}
                </h3>
                <ul className="mt-3 space-y-2.5 text-[13px] leading-relaxed text-muted-foreground">
                  {group.skills.map((skill) => (
                    <li key={skill.name}>{skill.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Writing (Hover-Dimming Editorial List) */}
        <section id="writing" className="mt-16 border-t border-border pt-12">
          <h2 className="text-sm font-medium text-foreground">Writing</h2>
          <div className="group/writing mt-4 divide-y divide-border/70">
            {articles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-baseline justify-between gap-4 py-3.5 transition-opacity duration-150 group-hover/writing:opacity-45 hover:!opacity-100"
              >
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-medium text-foreground">
                    {article.title}
                  </p>
                  <p className="mt-0.5 truncate text-[13px] text-muted-foreground">
                    {article.description}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                  {article.platform} ↗
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* 7. Minimal Footer */}
        <footer
          id="contact"
          className="mt-20 flex flex-col justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center"
        >
          <p>
            {personalInfo.name} ·{" "}
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              {personalInfo.email}
            </a>
          </p>
          <p className="font-mono text-[11px]">
            Press <kbd className="rounded border border-border px-1">⌘K</kbd> to
            navigate
          </p>
        </footer>
      </div>

      {/* ================================================================= */}
      {/* COMMAND PALETTE MODAL (⌘K)                                        */}
      {/* ================================================================= */}
      <AnimatePresence>
        {cmdOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCmdOpen(false)}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-24 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.14 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            >
              <div className="flex items-center border-b border-border px-3.5 py-2.5">
                <Search className="mr-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  autoFocus
                  value={cmdQuery}
                  onChange={(e) => setCmdQuery(e.target.value)}
                  placeholder="Jump to a project, copy email, or switch theme..."
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setCmdOpen(false)}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-2 text-xs">
                <p className="px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Quick Actions
                </p>
                <button
                  type="button"
                  onClick={() => {
                    handleCopyEmail();
                    setCmdOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-foreground hover:bg-muted"
                >
                  <span>Copy Email ({personalInfo.email})</span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    Action
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTheme(isDark ? "light" : "dark");
                    setCmdOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-foreground hover:bg-muted"
                >
                  <span>
                    Switch to {isDark ? "Light" : "Dark"} Theme
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    Theme
                  </span>
                </button>

                <p className="mt-2 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Projects ({filteredCmdProjects.length})
                </p>
                {filteredCmdProjects.map((proj) => (
                  <a
                    key={proj.id}
                    href={proj.liveUrl ?? proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setCmdOpen(false)}
                    className="flex items-center justify-between rounded-lg px-2.5 py-2 text-foreground hover:bg-muted"
                  >
                    <div>
                      <span className="font-medium">{proj.title}</span>
                      <span className="ml-2 text-muted-foreground">
                        — {proj.tagline}
                      </span>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
