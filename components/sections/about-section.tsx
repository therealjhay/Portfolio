import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site-content";
import { getAboutContent } from "@/lib/mdx";
import { StackList } from "@/components/sections/stack-list";

export async function AboutSection() {
  const content = await getAboutContent();

  return (
    <section id="about" className="border-b border-border py-16 md:py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-6">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
            About
          </p>
          <div className="mdx-content space-y-4 text-muted-foreground">
            {content}
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <Badge>Currently building: {siteConfig.latestPinnedProject}</Badge>
            <Badge
              className={
                siteConfig.availabilityOpen
                  ? "text-primary"
                  : "text-muted-foreground"
              }
            >
              {siteConfig.availabilityOpen
                ? "Open to contracts"
                : "Unavailable"}
            </Badge>
          </div>
          <StackList />
        </div>
      </div>
    </section>
  );
}
