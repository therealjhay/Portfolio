import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex border border-border px-2 py-1 text-xs font-medium text-muted-foreground", className)}>
      {children}
    </span>
  );
}
