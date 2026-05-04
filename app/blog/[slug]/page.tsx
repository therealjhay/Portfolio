import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/content/config";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/mdx";
import { createMetadata } from "@/lib/metadata";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug).catch(() => null);

  if (!post) {
    return createMetadata({
      title: `Post not found · ${siteConfig.name}`,
      description: "This post does not exist.",
      path: "/blog",
    });
  }

  const { frontmatter } = post;
  return createMetadata({
    title: `${frontmatter.title} · ${siteConfig.name}`,
    description: frontmatter.excerpt,
    path: `/blog/${params.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug).catch(() => null);

  if (!post) {
    notFound();
  }

  return (
    <main className="py-16 md:py-20">
      <article className="mx-auto w-full max-w-3xl px-4 md:px-6">
        <Link
          href="/blog"
          className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          ← Back to blog
        </Link>
        <header className="mt-6 space-y-4 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={post.frontmatter.date}>
              {new Date(post.frontmatter.date).toLocaleDateString("en-GB", { dateStyle: "medium" })}
            </time>
            <span>·</span>
            <span>{post.frontmatter.readTime}</span>
            {post.frontmatter.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl">{post.frontmatter.title}</h1>
          <p className="max-w-2xl text-muted-foreground">{post.frontmatter.excerpt}</p>
        </header>
        <section className="blog-content mt-8 max-w-none">{post.content}</section>
      </article>
    </main>
  );
}
