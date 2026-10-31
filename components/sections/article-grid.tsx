"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { siteContent } from "@/config/site-content";

export function ArticleGrid() {
  const shouldReduceMotion = useReducedMotion();
  const articles = siteContent.articles;

  if (!articles || articles.length === 0) return null;

  return (
    <section
      id="writing"
      className="relative z-10 border-b border-border/50 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        {/* Editorial Masthead */}
        <div className="flex flex-col justify-between gap-6 border-b border-border/80 pb-8 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 border border-border/80 bg-background/70 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span>05 // Editorial Dispatch &amp; Research Notes</span>
            </div>
            <h2 className="mt-4 font-mono text-3xl font-bold tracking-tight sm:text-5xl">
              Technical Writing &amp;{" "}
              <span className="text-primary">Protocol Breakdowns.</span>
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs leading-relaxed text-muted-foreground">
            Long-form notes on smart contract architecture, vault security,
            Ethereum provider standards, and frontend engineering.
          </p>
        </div>

        {/* Broadsheet Ledger Rows (visually distinct from Project Universe) */}
        <div className="divide-y divide-border/80 border-b border-border/80">
          {articles.map((article, index) => (
            <motion.a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.25, delay: index * 0.05, ease: "easeOut" }}
              className="group relative grid grid-cols-1 gap-4 bg-background/40 py-8 px-3 backdrop-blur-sm transition-colors hover:bg-card/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:grid-cols-[130px_1.5fr_1fr_60px] md:items-center md:px-6"
            >
              {/* Left Accent Bar on Hover */}
              <span
                className="pointer-events-none absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 transition-transform duration-200 group-hover:scale-y-100"
                style={{ backgroundColor: article.accentColor }}
              />

              {/* Issue Number & Platform */}
              <div className="flex items-center gap-3 font-mono text-xs md:flex-col md:items-start md:gap-1">
                <span className="font-bold tracking-[0.18em] text-primary">
                  ISSUE // 0{index + 1}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {article.platform}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="font-mono text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                  {article.title}
                </h3>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="tag">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {article.description}
              </p>

              {/* Action Icon */}
              <div className="flex items-center justify-end">
                <span className="inline-flex h-11 w-11 items-center justify-center border border-border bg-background/80 text-muted-foreground transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-primary group-hover:text-primary">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
