import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "tag";
};

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex border border-border px-2 text-xs",
        variant === "default" && "py-1 font-medium text-muted-foreground",
        variant === "tag" && "py-0.5 text-foreground/90",
        className
      )}
    >
      {children}
    </span>
  );
}
