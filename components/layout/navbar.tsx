"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, Terminal } from "lucide-react";
import { siteConfig } from "@/config/site-content";
import { cn } from "@/lib/utils";
import { scrollToTarget, STAGES, useStage } from "@/components/experience/store";
import { ThemeToggle } from "./theme-toggle";

const DOCK_ITEMS = [
  { code: "01", label: "About", id: "about", stageIndex: 1 },
  { code: "02", label: "Projects", id: "projects", stageIndex: 2 },
  { code: "03", label: "Stack", id: "stack", stageIndex: 3 },
  { code: "04", label: "Lab", id: "lab", stageIndex: 4 },
  { code: "05", label: "Writing", id: "writing", stageIndex: 5 },
  { code: "06", label: "Contact", id: "contact", stageIndex: 6 },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const activeStage = useStage();
  const isHome = pathname === "/";
  const stageMeta = STAGES[activeStage] ?? STAGES[0];

  const handleNavigate = (id: string) => {
    if (isHome) {
      scrollToTarget(`#${id}`);
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <>
      {/* Top Floating Telemetry Bar */}
      <header className="print:hidden pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          {/* Identity & System Status Pill */}
          <Link
            href="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                scrollToTarget(0);
              }
            }}
            className="pointer-events-auto group inline-flex h-11 items-center gap-3 border border-border/80 bg-background/80 px-3.5 font-mono text-xs tracking-wider text-foreground backdrop-blur-md transition-colors hover:border-primary/70"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-bold tracking-[0.18em] text-primary">
              {siteConfig.handle}
            </span>
            <span className="hidden text-border sm:inline">/</span>
            <span className="hidden text-muted-foreground group-hover:text-foreground sm:inline">
              {siteConfig.name}
            </span>
            {isHome && (
              <span className="hidden border-l border-border/80 pl-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground lg:inline">
                [{stageMeta.state}]
              </span>
            )}
          </Link>

          {/* Right Quick Actions */}
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleNavigate("lab")}
              className="hidden h-11 items-center gap-2 border border-border/80 bg-background/80 px-3 font-mono text-xs text-muted-foreground backdrop-blur-md transition-colors hover:border-primary/60 hover:text-primary sm:inline-flex"
              title="Jump to Interactive Terminal & Sandbox"
            >
              <Terminal className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>playground.sh</span>
            </button>

            <Link
              href="/resume"
              className={cn(
                "inline-flex h-11 items-center gap-2 border border-border/80 bg-background/80 px-3 font-mono text-xs backdrop-blur-md transition-colors hover:border-primary/60 hover:text-primary",
                pathname === "/resume"
                  ? "border-primary text-primary"
                  : "text-muted-foreground",
              )}
            >
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Resume</span>
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Experimental Floating Control Dock */}
      <nav
        aria-label="Section control dock"
        className="print:hidden pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 md:bottom-6"
      >
        <div className="pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto border border-border/90 bg-background/85 p-1.5 shadow-glow backdrop-blur-xl">
          {DOCK_ITEMS.map((item) => {
            const active = isHome && activeStage === item.stageIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={cn(
                  "group relative flex min-h-9 shrink-0 items-center gap-1.5 px-2.5 py-1.5 font-mono text-xs transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:px-3.5",
                  active
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "hidden text-[10px] tracking-widest sm:inline",
                    active
                      ? "text-primary-foreground/80"
                      : "text-primary/70 group-hover:text-primary",
                  )}
                >
                  {item.code}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
