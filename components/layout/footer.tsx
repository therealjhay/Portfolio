import Link from "next/link";
import { siteConfig } from "@/config/site-content";

export function Footer() {
  return (
    <footer className="no-print relative z-10 border-t border-border/70 bg-background/80 pb-24 pt-10 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 px-4 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center md:px-6">
        <p>
          <span className="font-bold text-primary">{siteConfig.handle}</span> ·{" "}
          {siteConfig.name} · {siteConfig.role} · {new Date().getFullYear()}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {siteConfig.socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-primary"
            >
              {social.name}
            </a>
          ))}
          <Link href="/resume" className="transition-colors hover:text-primary">
            Resume
          </Link>
        </div>
      </div>
    </footer>
  );
}
