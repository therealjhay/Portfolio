import { ProjectGrid } from "@/components/sections/project-grid";
import { siteConfig } from "@/content/config";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `Projects · ${siteConfig.name}`,
  description: "Smart contract systems, DeFi tooling, and full-stack product builds.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <main>
      <ProjectGrid />
    </main>
  );
}
