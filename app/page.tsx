import { StudioPortfolio } from "@/components/sections/studio-portfolio";
import { siteConfig } from "@/config/site-content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `${siteConfig.name} — Product & Software Engineer`,
  description: siteConfig.supportingText,
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main-content" className="relative min-h-screen">
      <StudioPortfolio />
    </main>
  );
}
