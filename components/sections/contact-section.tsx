"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Mail,
} from "lucide-react";
import { siteContent } from "@/config/site-content";

export function ContactSection() {
  const { personalInfo, socialLinks } = siteContent;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            Contact
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Let’s build something together.
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            Reach out directly for product &amp; engineering roles, full-stack
            builds, or collaboration.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              <span>{personalInfo.email}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-primary" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary"
            >
              <FileText className="h-4 w-4 text-primary" />
              <span>Resume</span>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-border pt-6 text-sm">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
