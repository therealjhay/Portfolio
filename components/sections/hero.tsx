"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  FileText,
} from "lucide-react";
import { type RoleLens, siteContent } from "@/config/site-content";

export function HeroSection() {
  const { personalInfo, pillars, projects } = siteContent;
  const [activeLens, setActiveLens] = useState<RoleLens>("product");
  const [copied, setCopied] = useState(false);

  const currentPillar =
    pillars.find((p) => p.id === activeLens) ?? pillars[0];

  const proofProjects = projects.filter((p) =>
    currentPillar.featuredProjectIds.includes(p.id),
  );

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <section
      id="hero"
      className="relative border-b border-border py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          {/* Left Column: Clean, Direct Product & Engineering Intro */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span>Available for new projects &amp; roles</span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {personalInfo.headline}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Hi, I’m{" "}
              <strong className="font-semibold text-foreground">
                {personalInfo.name}
              </strong>
              . {personalInfo.supportingText}
            </p>

            {/* Primary Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
              >
                <span>Explore Selected Work</span>
                <ArrowDown className="h-4 w-4" />
              </a>

              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary"
              >
                <FileText className="h-4 w-4 text-primary" />
                <span>Resume</span>
              </Link>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-foreground">Copied email</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>{personalInfo.email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-border pt-6 text-sm">
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary"
              >
                <span>GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://x.com/0xjhay"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary"
              >
                <span>X / Twitter</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive How I Work Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
              <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-muted p-1">
                {pillars.map((pillar) => {
                  const active = pillar.id === activeLens;
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => setActiveLens(pillar.id)}
                      className={`rounded-lg px-3 py-2 text-left text-xs font-semibold transition-all ${
                        active
                          ? "bg-card text-primary shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {pillar.id === "product"
                        ? "Product"
                        : pillar.id === "engineering"
                          ? "Engineering"
                          : "Growth"}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6">
                <p className="font-mono text-xs font-medium text-primary">
                  {currentPillar.title}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-foreground">
                  {currentPillar.headline}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {currentPillar.summary}
                </p>

                <ul className="mt-5 space-y-2 border-t border-border pt-4">
                  {currentPillar.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground sm:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 border-t border-border pt-4">
                  <p className="font-mono text-[11px] text-muted-foreground">
                    Featured builds:
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {proofProjects.map((proj) => (
                      <a
                        key={proj.id}
                        href={proj.liveUrl ?? proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        <span>{proj.title}</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
