import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero";
import { ProjectGrid } from "@/components/sections/project-grid";
import { siteConfig } from "@/content/config";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `${siteConfig.name} · ${siteConfig.role}`,
  description: siteConfig.tagline,
  path: "/",
});

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectGrid />
    </main>
  );
}
