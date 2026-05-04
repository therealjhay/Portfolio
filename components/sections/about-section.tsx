import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/content/config";
import { getAboutContent } from "@/lib/mdx";

const stack = [
  "Solidity",
  "Foundry",
  "Python",
  "FastAPI",
  "Next.js",
  "Django",
  "TypeScript",
  "PostgreSQL",
  "Redis",
  "IPFS",
  "Web3.py",
  "ethers.js",
  "Docker",
];

export async function AboutSection() {
  const content = await getAboutContent();

  return (
    <section id="about" className="border-b border-border py-16 md:py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-6">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">About</p>
          <div className="blog-content space-y-4 text-muted-foreground">{content}</div>
        </div>

        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <Badge>Currently building: {siteConfig.latestPinnedProject}</Badge>
            <Badge className={siteConfig.availabilityOpen ? "text-primary" : "text-muted-foreground"}>
              {siteConfig.availabilityOpen ? "Open to contracts" : "Unavailable"}
            </Badge>
          </div>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {stack.map((item) => (
              <li key={item} className="border border-border bg-card px-3 py-2 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
