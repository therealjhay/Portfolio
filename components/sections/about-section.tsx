import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig, siteContent } from "@/config/site-content";
import { StackList } from "@/components/sections/stack-list";

export function AboutSection() {
  return (
    <section id="about" className="border-b border-border py-16 md:py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 md:grid-cols-[1fr_1.15fr] md:px-6">
        <div className="space-y-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
              About
            </p>
            <h1 className="mt-2 font-mono text-3xl md:text-4xl">
              Engineering across protocols &amp; product stacks
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge>Currently building: {siteConfig.latestPinnedProject}</Badge>
            <Badge
              className={
                siteConfig.availabilityOpen
                  ? "border-primary/40 text-primary"
                  : "text-muted-foreground"
              }
            >
              {siteConfig.availabilityOpen
                ? "Open to contracts"
                : "Unavailable"}
            </Badge>
          </div>

          <div className="space-y-4 leading-relaxed text-muted-foreground">
            {siteContent.personalInfo.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href="/projects">Explore Projects</ButtonLink>
            <ButtonLink href="/resume" variant="secondary">
              View Resume
            </ButtonLink>
          </div>
        </div>

        <div>
          <StackList />
        </div>
      </div>
    </section>
  );
}
