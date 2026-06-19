"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteContent } from "@/config/site-content";
import { ExternalLink } from "lucide-react";

export function ArticleGrid() {
  const shouldReduceMotion = useReducedMotion();
  const articles = siteContent.articles;

  if (!articles || articles.length === 0) return null;

  return (
    <section id="articles" className="border-b border-border py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mb-7">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Writing</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Technical notes and articles</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {articles.map((article) => (
            <motion.a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="group block h-full focus-visible:outline-none"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <Card className="flex h-full flex-col gap-4 border-border p-5 transition-transform duration-100 ease-out group-hover:-translate-y-1 group-hover:border-primary/65 group-hover:shadow-glow group-focus-visible:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:border-primary">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-mono text-xl">{article.title}</h3>
                  <ExternalLink className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">{article.description}</p>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                  <Badge variant="tag" className="border-primary/30 text-primary">{article.platform}</Badge>
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="tag">{tag}</Badge>
                  ))}
                </div>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
