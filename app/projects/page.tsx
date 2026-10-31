import { StageCanvas } from "@/components/experience/scene/stage-canvas";
import { ProjectGrid } from "@/components/sections/project-grid";
import { siteConfig } from "@/config/site-content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `Projects · ${siteConfig.name}`,
  description: "Smart contract systems, DeFi tooling, and full-stack product builds.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <main id="main-content" className="relative min-h-screen pt-12">
      <StageCanvas />
      <div className="relative z-10">
        <ProjectGrid />
      </div>
    </main>
  );
}
