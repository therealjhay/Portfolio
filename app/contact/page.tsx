import { ArrowUpRight, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { siteConfig } from "@/config/site-content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `Contact · ${siteConfig.name}`,
  description: "Start a project, request consulting, or discuss collaboration.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main-content" className="py-16 md:py-24">
      <section className="mx-auto w-full max-w-5xl px-4 md:px-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
              Contact
            </p>
            <Badge
              className={
                siteConfig.availabilityOpen
                  ? "border-primary/40 text-primary"
                  : "text-muted-foreground"
              }
            >
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
              {siteConfig.availabilityOpen
                ? "Open to contracts & collaborations"
                : "Currently unavailable"}
            </Badge>
          </div>

          <h1 className="font-mono text-4xl md:text-5xl">
            Let&apos;s build your next system
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Reach out directly via email or connect on any of the channels below.
            Share your objective, timeline, and where you are in the build cycle —
            I typically respond within 24 hours.
          </p>
        </div>

        <Card className="mt-8 flex flex-col justify-between gap-6 border-border p-6 sm:flex-row sm:items-center md:p-8">
          <div className="space-y-1">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Direct Email
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-mono text-xl text-foreground underline-offset-4 hover:text-primary hover:underline md:text-2xl"
            >
              {siteConfig.email}
            </a>
            <p className="text-sm text-muted-foreground">
              Best for contract inquiries, protocol engineering, and full-stack builds.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${siteConfig.email}`}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              Send an email
            </ButtonLink>
            <CopyEmailButton email={siteConfig.email} />
          </div>
        </Card>

        <div className="mt-10">
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Social &amp; On-Chain Profiles
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {siteConfig.socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="group block focus-visible:outline-none"
              >
                <Card className="flex items-center justify-between p-5 transition-transform duration-100 ease-out group-hover:-translate-y-0.5 group-hover:border-primary/65 group-hover:shadow-glow group-focus-visible:border-primary group-focus-visible:ring-2 group-focus-visible:ring-primary">
                  <div>
                    <p className="font-mono text-base text-foreground group-hover:text-primary">
                      {social.name}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                      {social.handle}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="h-5 w-5 text-muted-foreground transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
