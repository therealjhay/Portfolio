import { siteConfig } from "@/content/config";
import { getBlogPosts } from "@/lib/mdx";

export async function GET() {
  const posts = await getBlogPosts();

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.name} Blog</title>
    <description>${siteConfig.tagline}</description>
    <link>${siteConfig.siteUrl}/blog</link>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${siteConfig.siteUrl}/blog/${post.slug}</link>
      <guid>${siteConfig.siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
