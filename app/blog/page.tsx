import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | 0xJhay",
  description: "Articles, notes, and technical write-ups by 0xJhay.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="min-h-screen py-10 md:py-14">
      <div className="section-shell">
        <header className="mb-10 flex flex-col gap-4">
          <Link href="/" className="btn-secondary w-fit">
            ← Back Home
          </Link>
          <span className="eyebrow">Blog</span>
          <h1 className="display-title max-w-[16ch] text-[clamp(1.9rem,4.8vw,4rem)]">
            Personal articles and field notes.
          </h1>
          <p className="lede">
            Add new posts by creating Markdown files in <code>content/blog</code>. They appear here
            automatically.
          </p>
        </header>

        <section className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          {posts.map((post) => (
            <article key={post.slug} className="surface flex h-full flex-col gap-4 p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs" style={{ color: "var(--color-muted)" }}>
                <span>{new Date(post.date).toLocaleDateString()}</span>
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-bold leading-tight">{post.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {post.summary}
              </p>
              <Link href={`/blog/${post.slug}`} className="btn-primary mt-auto w-fit">
                Read article
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
