import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex border border-border px-2 py-0.5 text-xs text-foreground/90", className)}>{children}</span>;
}
