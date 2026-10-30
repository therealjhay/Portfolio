"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  "summary",
  "experience",
  "projects",
  "skills",
  "education",
  "certifications",
] as const;

export function ResumeRail() {
  const [active, setActive] = useState<(typeof sections)[number]>("summary");

  useEffect(() => {
    const observers = sections.map((id) => {
      const node = document.getElementById(id);
      if (!node) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-25% 0px -60% 0px" },
      );
      observer.observe(node);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return (
    <aside className="resume-rail sticky top-24 hidden h-fit md:block print:hidden">
      <nav aria-label="Resume sections" className="opacity-75 transition-opacity duration-150 hover:opacity-100 focus-within:opacity-100">
        <ul className="space-y-3">
          {sections.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "block border-l pl-3 text-[0.6875rem] uppercase tracking-[0.15em] no-underline transition-colors",
                  active === id
                    ? "border-[color:var(--resume-rail-active)] font-semibold text-[color:var(--resume-rail-active)]"
                    : "border-transparent text-[color:var(--resume-rail-inactive)] hover:border-[color:var(--resume-rail-hover)]",
                )}
              >
                {id}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
