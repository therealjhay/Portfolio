import { StageCanvas } from "@/components/experience/scene/stage-canvas";
import { ContactSection } from "@/components/sections/contact-section";
import { siteConfig } from "@/config/site-content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `Contact · ${siteConfig.name}`,
  description: "Start a project, request consulting, or discuss collaboration.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main-content" className="relative min-h-screen pt-12">
      <StageCanvas />
      <div className="relative z-10">
        <ContactSection />
      </div>
    </main>
  );
}
