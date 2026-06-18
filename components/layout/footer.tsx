import Link from "next/link";
import { siteConfig } from "@/config/site-content";

export function Footer() {
  return (
    <footer className="no-print border-t border-border py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-3 px-4 text-sm text-muted-foreground md:grid-cols-3 md:px-6">
        <p>
          {siteConfig.name} · {siteConfig.role} · {new Date().getFullYear()}
        </p>
        <div className="flex flex-wrap gap-4 md:justify-center">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <p className="text-xs md:text-right">Built with Next.js</p>
      </div>
    </footer>
  );
}
