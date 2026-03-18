"use client";

import { motion } from "framer-motion";
import { ArticleSchema } from "@/config/site-content";
import { ExternalLink } from "lucide-react";
import { z } from "zod";

type Article = z.infer<typeof ArticleSchema>;

interface ArticleCardProps {
  article: Article;
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ y: -6, rotate: index % 2 === 0 ? -1 : 1 }}
      className="relative flex h-full flex-col gap-5 border-4 border-paper bg-paper p-6 text-ink"
    >
      <div
        className="h-16 w-full border-4 border-ink"
        style={{ backgroundColor: article.accentColor }}
      />

      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide">
        <span className="border-2 border-ink bg-white px-2 py-1">{article.platform}</span>
        <span className="border-2 border-ink bg-ink px-2 py-1 text-paper">
          Technical Article
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-display">{article.title}</h3>
        <p className="text-base leading-relaxed">{article.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="border-2 border-ink bg-white px-2 py-1 text-xs font-semibold uppercase tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-3">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="inline-flex items-center gap-2 border-2 border-ink bg-hot px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition-transform hover:-translate-y-1"
        >
          <ExternalLink className="h-4 w-4" />
          Read Article
        </a>
      </div>
    </motion.article>
  );
}
