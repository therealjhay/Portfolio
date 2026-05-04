import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  html: string;
}

interface FrontmatterData {
  title?: string;
  date?: string;
  summary?: string;
  tags?: string[];
}

function normalizeFrontmatter(slug: string, frontmatter: FrontmatterData): BlogPostMeta {
  return {
    slug,
    title: frontmatter.title?.trim() || slug,
    date: frontmatter.date?.trim() || new Date().toISOString().slice(0, 10),
    summary: frontmatter.summary?.trim() || "No summary provided.",
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
  };
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  const files = await fs.readdir(BLOG_DIR);
  const markdownFiles = files.filter((file) => file.endsWith(".md"));

  const posts = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const filePath = path.join(BLOG_DIR, fileName);
      const source = await fs.readFile(filePath, "utf8");
      const { data } = matter(source);
      const slug = fileName.replace(/\.md$/, "");
      return normalizeFrontmatter(slug, data as FrontmatterData);
    })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  try {
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(source);
    const meta = normalizeFrontmatter(slug, data as FrontmatterData);
    const html = await marked.parse(content);

    return { ...meta, html };
  } catch {
    return null;
  }
}
