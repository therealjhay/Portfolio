import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { BlogPostMeta } from "@/lib/mdx";

export function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Card className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-GB", { dateStyle: "medium" })}</time>
        <span>{post.readTime}</span>
      </div>
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="text-sm text-muted-foreground">{post.excerpt}</p>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-auto inline-flex min-h-11 items-center text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Read post
      </Link>
    </Card>
  );
}
