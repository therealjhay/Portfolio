"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = ["experience", "education", "skills", "certifications"] as const;

export function ResumeRail() {
  const [active, setActive] = useState<(typeof sections)[number]>("experience");

  useEffect(() => {
    const observers = sections.map((id) => {
      const node = document.getElementById(id);
      if (!node) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-35% 0px -55% 0px" },
      );
      observer.observe(node);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return (
    <aside className="resume-rail print:hidden sticky top-24 hidden h-fit md:block">
      <nav className="group opacity-10 transition-opacity duration-150 hover:opacity-100">
        <ul className="space-y-3">
          {sections.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "block border-l pl-3 text-[11px] uppercase tracking-[0.15em] text-[#7a7a7a] transition-colors",
                  active === id ? "border-[#0b6e4f] text-[#0b6e4f]" : "border-transparent hover:border-[#9c9c9c]",
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
