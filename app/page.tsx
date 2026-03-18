import { siteContent } from "@/config/site-content";
import { Hero } from "@/components/core/hero";
import { FloatingNav } from "@/components/core/floating-nav";
import { AboutSkills } from "@/components/core/about-skills";
import { ProjectsSection } from "@/components/core/projects-section";
import { ArticlesSection } from "@/components/core/articles-section";
import { Contact } from "@/components/core/contact";
import { CustomCursor } from "@/components/core/custom-cursor";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <CustomCursor />
      <FloatingNav />
      <Hero />
      <AboutSkills />
      <ProjectsSection />
      <ArticlesSection />
      <Contact />

      <footer className="w-full border-t-4 border-ink bg-paper px-6 py-8 text-center text-xs font-semibold uppercase tracking-wide text-ink">
        <p>© {new Date().getFullYear()} {siteContent.personalInfo.name}. All rights reserved.</p>
        <p className="mt-2">Built with Next.js, Framer Motion, and Tailwind CSS.</p>
      </footer>
    </main>
  );
}
