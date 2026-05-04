"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { z } from "zod";
import { ArticleSchema } from "@/config/site-content";

type Article = z.infer<typeof ArticleSchema>;

interface ArticleCardProps {
  article: Article;
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="surface flex h-full flex-col gap-5 p-5 md:p-6"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="chip">{article.platform}</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--color-muted)" }}>
          Article
        </span>
      </div>

      <div>
        <h3 className="text-xl font-bold leading-tight">{article.title}</h3>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
          {article.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span key={tag} className="chip">
            {tag}
          </span>
        ))}
      </div>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary mt-auto w-fit"
      >
        <ExternalLink className="h-4 w-4" />
        Read Article
      </a>
    </motion.article>
  );
}
