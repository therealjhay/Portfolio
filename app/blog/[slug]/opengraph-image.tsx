import { ImageResponse } from "@vercel/og";
import { siteConfig } from "@/content/config";
import { getBlogPostBySlug } from "@/lib/mdx";

export const runtime = "nodejs";
export const alt = "Blog post image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OgImage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug).catch(() => null);
  const title = post?.frontmatter.title ?? `${siteConfig.name} Blog`;
  const excerpt = post?.frontmatter.excerpt ?? "Blockchain + full-stack engineering notes.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          color: "#F2F0EB",
          padding: "56px",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ color: "#00FF85", fontSize: 24, fontFamily: "monospace" }}>{`> ${params.slug}`}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 56, lineHeight: 1.08 }}>{title}</div>
          <div style={{ fontSize: 28, color: "rgba(242,240,235,0.75)" }}>{excerpt}</div>
        </div>
        <div style={{ fontSize: 22 }}>{siteConfig.siteUrl.replace("https://", "")}/blog</div>
      </div>
    ),
    { ...size },
  );
}
