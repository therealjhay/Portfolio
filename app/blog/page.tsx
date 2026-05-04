import { TagFilter } from "@/components/blog/tag-filter";
import { siteConfig } from "@/content/config";
import { getAllBlogTags, getBlogPosts } from "@/lib/mdx";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `Blog · ${siteConfig.name}`,
  description: "Practical notes on on-chain architecture, backend systems, and delivery patterns.",
  path: "/blog",
});

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getBlogPosts(), getAllBlogTags()]);

  return (
    <main className="py-16 md:py-20">
      <section className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Blog</p>
        <h1 className="mt-2 text-4xl md:text-5xl">Field notes from real builds</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Write new posts by creating <code>.mdx</code> files in <code>/content/blog</code>.
        </p>
        <div className="mt-8">
          <TagFilter posts={posts} tags={tags} />
        </div>
      </section>
    </main>
  );
}
