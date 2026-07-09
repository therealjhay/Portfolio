import { AboutSection } from "@/components/sections/about-section";
import { siteConfig } from "@/config/site-content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `About · ${siteConfig.name}`,
  description: "Background, stack, and current build focus.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main-content">
      <AboutSection />
    </main>
  );
}
