import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero";
import { ProjectGrid } from "@/components/sections/project-grid";
import { ArticleGrid } from "@/components/sections/article-grid";
import { siteConfig } from "@/config/site-content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `${siteConfig.name} · ${siteConfig.role}`,
  description: siteConfig.tagline,
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <ProjectGrid />
      <ArticleGrid />
    </main>
  );
}
