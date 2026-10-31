import { StageCanvas } from "@/components/experience/scene/stage-canvas";
import { AboutSection } from "@/components/sections/about-section";
import { StackList } from "@/components/sections/stack-list";
import { siteConfig } from "@/config/site-content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `About · ${siteConfig.name}`,
  description: "Background, engineering pillars, and capability clusters.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main-content" className="relative min-h-screen pt-12">
      <StageCanvas />
      <div className="relative z-10">
        <AboutSection />
        <StackList />
      </div>
    </main>
  );
}
