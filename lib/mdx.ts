import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import type { ReactElement } from "react";
import { mdxComponents } from "@/components/blog/mdx-content";

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readTime: string;
};

type BlogFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readTime?: string;
};

const contentDir = path.join(process.cwd(), "content");
const blogDir = path.join(contentDir, "blog");
const aboutPath = path.join(contentDir, "about.mdx");

const prettyCodeOptions = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
};

export async function getAboutContent(): Promise<ReactElement> {
  const source = await fs.readFile(aboutPath, "utf8");
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      },
    },
    components: mdxComponents,
  });

  return content;
}

export async function getBlogPosts(): Promise<BlogPostMeta[]> {
  const files = await fs.readdir(blogDir);
  const slugs = files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const source = await fs.readFile(path.join(blogDir, `${slug}.mdx`), "utf8");
      const { data } = matter(source);
      const frontmatter = data as BlogFrontmatter;

      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        excerpt: frontmatter.excerpt,
        tags: frontmatter.tags ?? [],
        readTime: frontmatter.readTime ?? "5 min read",
      };
    }),
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPostBySlug(slug: string) {
  const filePath = path.join(blogDir, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");

  const { content, frontmatter } = await compileMDX<BlogFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      },
    },
    components: mdxComponents,
  });

  return {
    slug,
    content,
    frontmatter: {
      ...frontmatter,
      readTime: frontmatter.readTime ?? "5 min read",
      tags: frontmatter.tags ?? [],
    },
  };
}

export async function getAllBlogTags(): Promise<string[]> {
  const posts = await getBlogPosts();
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort((a, b) => a.localeCompare(b));
}
