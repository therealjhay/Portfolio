import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex min-h-11 items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-transform duration-100 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants = {
  primary: "bg-primary text-primary-foreground hover:-translate-y-0.5",
  secondary: "border border-border bg-card text-card-foreground hover:-translate-y-0.5",
  ghost: "text-foreground underline-offset-4 hover:underline",
} as const;

type Variant = keyof typeof variants;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  children: ReactNode;
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return <button className={cn(baseStyles, variants[variant], className)} {...props} />;
}

export function ButtonLink({ variant = "primary", className, href, children, ...props }: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}
