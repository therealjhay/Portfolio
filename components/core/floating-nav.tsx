"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { siteContent } from "@/config/site-content";
import { Github, Linkedin, ScanLine, Twitter } from "lucide-react";

const iconMap: Record<string, ReactNode> = {
  github: <Github className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  etherscan: <ScanLine className="h-4 w-4" />,
};

export function FloatingNav() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed right-6 top-6 z-50 hidden md:block"
    >
      <div className="flex flex-col gap-3 border-4 border-ink bg-paper p-4 text-ink">
        <a
          href="#home"
          data-cursor="hover"
          className="text-xs font-semibold uppercase tracking-wide"
        >
          {siteContent.personalInfo.name}
        </a>
        <div className="h-[2px] w-full bg-ink" />
        <div className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide">
          <a href="#about" data-cursor="hover" className="hover:translate-x-1 transition-transform">
            About
          </a>
          <a href="#projects" data-cursor="hover" className="hover:translate-x-1 transition-transform">
            Projects
          </a>
          <a href="#contact" data-cursor="hover" className="hover:translate-x-1 transition-transform">
            Contact
          </a>
        </div>
        <div className="h-[2px] w-full bg-ink" />
        <div className="flex flex-wrap gap-2">
          {siteContent.socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-2 border-2 border-ink bg-ink px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-paper transition-transform hover:-translate-y-0.5"
            >
              {iconMap[link.icon.toLowerCase()] ?? link.name}
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
