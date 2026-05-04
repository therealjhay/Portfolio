import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post not found | 0xJhay" };
  }

  return {
    title: `${post.title} | 0xJhay`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-10 md:py-14">
      <article className="section-shell">
        <header className="mb-8 flex flex-col gap-4">
          <Link href="/blog" className="btn-secondary w-fit">
            ← Back to blog
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-sm" style={{ color: "var(--color-muted)" }}>
            <span>{new Date(post.date).toLocaleDateString()}</span>
            {post.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="display-title max-w-[18ch] text-[clamp(1.9rem,4.8vw,4rem)]">{post.title}</h1>
          <p className="lede">{post.summary}</p>
        </header>

        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </main>
  );
}
