import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  a: (props) => <Link {...props} href={props.href ?? "#"} className="text-primary underline underline-offset-2" />,
  img: (props) => (
    <Image
      src={props.src ?? ""}
      alt={props.alt ?? ""}
      width={1200}
      height={700}
      className="w-full border border-border"
      sizes="(max-width: 768px) 100vw, 768px"
    />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="my-6 border-l-2 border-primary/80 bg-muted/20 py-3 pl-4 text-sm text-muted-foreground"
    />
  ),
  pre: (props) => <pre {...props} className="overflow-x-auto border border-border bg-card p-4 text-sm" />,
};
