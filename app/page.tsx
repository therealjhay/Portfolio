import { siteContent } from "@/config/site-content";
import { Hero } from "@/components/core/hero";
import { FloatingNav } from "@/components/core/floating-nav";
import { AboutSkills } from "@/components/core/about-skills";
import { ProjectsSection } from "@/components/core/projects-section";
import { ArticlesSection } from "@/components/core/articles-section";
import { Contact } from "@/components/core/contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <FloatingNav />
      <Hero />
      <AboutSkills />
      <ProjectsSection />
      <ArticlesSection />
      <Contact />

      <footer className="mt-6 border-t px-4 py-8 md:mt-8 md:px-6 md:py-10" style={{ borderColor: "var(--color-border)" }}>
        <div className="section-shell flex flex-col gap-3 text-left md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-muted)" }}>
          © {new Date().getFullYear()}{" "}
            <span style={{ color: "var(--color-accent)" }}>{siteContent.personalInfo.name}</span>.
          All rights reserved.
          </p>
          <p className="text-[11px] uppercase tracking-widest" style={{ color: "var(--color-muted)" }}>
            Built with Next.js · Framer Motion · Tailwind CSS
          </p>
        </div>
      </footer>
    </main>
  );
}
