import Link from "next/link";
import { siteConfig } from "@/config/site-content";

export function Footer() {
  return (
    <footer className="no-print relative z-10 border-t border-border/80 bg-background py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6">
        <p>
          <span className="font-semibold text-foreground">{siteConfig.name}</span>{" "}
          · {siteConfig.role} · {new Date().getFullYear()}
        </p>

        <div className="flex flex-wrap items-center gap-5">
          {siteConfig.socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {social.name}
            </a>
          ))}
          <Link href="/resume" className="transition-colors hover:text-foreground">
            Resume
          </Link>
        </div>
      </div>
    </footer>
  );
}
