"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/config/site-content";
import { ArticleCard } from "@/components/core/article-card";

export function ArticlesSection() {
  const { articles } = siteContent;

  return (
    <section
      id="articles"
      className="w-full border-b-4 border-ink bg-ink text-paper"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col gap-4"
        >
          <span className="inline-flex border-4 border-paper bg-cyan px-4 py-2 text-sm font-semibold uppercase tracking-wide text-ink">
            Technical Articles
          </span>
          <h2 className="text-3xl font-display md:text-5xl">
            Practical writing on React, Web3, and fullstack delivery.
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-paper/90">
            Quick notes, deeper dives, and pragmatic breakdowns from ongoing builds.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
