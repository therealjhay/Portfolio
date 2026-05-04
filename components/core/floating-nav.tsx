"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, ScanLine, Twitter, X } from "lucide-react";
import Link from "next/link";
import { siteContent } from "@/config/site-content";

const iconMap: Record<string, ReactNode> = {
  github: <Github className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  etherscan: <ScanLine className="h-4 w-4" />,
};

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
];

export function FloatingNav() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0.01 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observerRef.current?.observe(section));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-2 md:px-4 md:pt-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="section-shell"
      >
        <div
          className="surface relative flex min-h-14 items-center justify-between px-4 py-2"
          style={{
            boxShadow: scrolled ? "0 10px 40px color-mix(in oklab, var(--color-text) 12%, transparent)" : "none",
          }}
        >
          <a href="#home" className="font-display text-sm tracking-tight md:text-base">
            0xJhay<span style={{ color: "var(--color-accent)" }}>/portfolio</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.1em]"
                  style={{
                    color: isActive ? "var(--color-text)" : "var(--color-muted)",
                    background: isActive ? "var(--color-accent-soft)" : "transparent",
                  }}
                >
                  {link.label}
                </a>
              );
            })}
            <Link href="/blog" className="rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--color-muted)" }}>
              Blog
            </Link>
          </nav>

          <div className="hidden items-center gap-1 md:flex">
            {siteContent.socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                title={link.name}
                className="btn-secondary !min-h-11 !w-11 !px-0"
              >
                {iconMap[link.icon.toLowerCase()] ?? link.name[0]}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="btn-secondary md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <AnimatePresence>
            {mobileOpen ? (
              <motion.div
                id="mobile-nav"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="surface absolute inset-x-2 top-[calc(100%+8px)] p-3 md:hidden"
              >
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-3 text-xs font-semibold uppercase tracking-[0.1em]"
                      style={{ color: "var(--color-text)" }}
                    >
                      {link.label}
                    </a>
                  ))}
                  <Link
                    href="/blog"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-3 text-xs font-semibold uppercase tracking-[0.1em]"
                    style={{ color: "var(--color-text)" }}
                  >
                    Blog
                  </Link>
                </nav>
                <div className="mt-2 flex flex-wrap gap-2">
                  {siteContent.socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      title={link.name}
                      className="btn-secondary !min-h-11 !w-11 !px-0"
                    >
                      {iconMap[link.icon.toLowerCase()] ?? link.name[0]}
                    </a>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  );
}
