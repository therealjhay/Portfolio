"use client";

import { ArrowUpRight } from "lucide-react";
import { siteContent } from "@/config/site-content";

export function ArticleGrid() {
  const { articles } = siteContent;

  return (
    <section
      id="writing"
      className="relative border-b border-border py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            Writing
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Articles &amp; Notes
          </h2>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/60"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-mono text-primary">
                    {article.platform}
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>

                <h3 className="mt-3 font-display text-xl font-bold leading-snug text-foreground">
                  {article.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {article.description}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
