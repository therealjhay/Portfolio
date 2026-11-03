"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { siteContent } from "@/config/site-content";

export function AboutSection() {
  const { personalInfo, pillars } = siteContent;

  return (
    <section
      id="about"
      className="relative border-b border-border py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              Approach
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Product clarity. Engineering speed. Commercial focus.
            </h2>

            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
              {personalInfo.about.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary"
              >
                <FileText className="h-4 w-4 text-primary" />
                <span>Read Full Resume</span>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 lg:col-span-7">
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <span className="font-mono text-xs font-semibold text-primary">
                  {pillar.number} · {pillar.title}
                </span>
                <h3 className="mt-1.5 font-display text-xl font-bold text-foreground sm:text-2xl">
                  {pillar.headline}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                  {pillar.deliverables.map((d) => (
                    <span
                      key={d}
                      className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-foreground"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
