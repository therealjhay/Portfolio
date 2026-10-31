import { StageCanvas } from "@/components/experience/scene/stage-canvas";
import { StageController } from "@/components/experience/stage-controller";
import { AboutSection } from "@/components/sections/about-section";
import { ArticleGrid } from "@/components/sections/article-grid";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero";
import { ProjectGrid } from "@/components/sections/project-grid";
import { StackList } from "@/components/sections/stack-list";
import { TerminalPlayground } from "@/components/sections/terminal-playground";
import { siteConfig } from "@/config/site-content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `${siteConfig.name} (${siteConfig.handle}) · ${siteConfig.role}`,
  description: siteConfig.supportingText,
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main-content" className="relative min-h-screen">
      <StageCanvas />
      <StageController />
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectGrid />
        <StackList />
        <TerminalPlayground />
        <ArticleGrid />
        <ContactSection />
      </div>
    </main>
  );
}
