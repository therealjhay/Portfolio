"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteContent } from "@/config/site-content";
import { ArticleCard } from "@/components/core/article-card";

export function ArticlesSection() {
  const { articles } = siteContent;

  return (
    <section id="articles" className="py-14 md:py-20 lg:py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">Technical writing</span>
          <h2 className="display-title mt-6 text-[clamp(1.8rem,4.4vw,3.8rem)] max-w-[18ch]">
            Notes from real builds and deployment tradeoffs.
          </h2>
          <p className="lede mt-5">
            Practical articles for engineers and technical stakeholders who want implementation
            detail, not generic theory.
          </p>
          <div className="mt-6">
            <Link href="/blog" className="btn-secondary">
              Open Full Blog
            </Link>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
