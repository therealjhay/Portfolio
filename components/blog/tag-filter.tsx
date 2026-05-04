"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/blog/post-card";
import type { BlogPostMeta } from "@/lib/mdx";
import { cn } from "@/lib/utils";

export function TagFilter({ posts, tags }: { posts: BlogPostMeta[]; tags: string[] }) {
  const [activeTag, setActiveTag] = useState("all");

  const filteredPosts = useMemo(() => {
    if (activeTag === "all") return posts;
    return posts.filter((post) => post.tags.includes(activeTag));
  }, [activeTag, posts]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={cn(
            "min-h-11 border px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            activeTag === "all" ? "border-primary text-primary" : "border-border text-muted-foreground",
          )}
          onClick={() => setActiveTag("all")}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={cn(
              "min-h-11 border px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              activeTag === tag ? "border-primary text-primary" : "border-border text-muted-foreground",
            )}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="border border-border bg-card p-6 text-sm text-muted-foreground">
          No posts in this tag yet. Pick another tag or publish a new article in <code>/content/blog</code>.
        </div>
      )}
    </div>
  );
}
