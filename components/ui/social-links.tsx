import { Github, Twitter, Linkedin, Globe } from "lucide-react";
import { siteConfig } from "@/config/site-content";

const iconMap = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  etherscan: Globe,
};

export function SocialLinks() {
  return (
    <div className="flex items-center gap-5">
      {siteConfig.socialLinks.map((link) => {
        const Icon = iconMap[link.icon as keyof typeof iconMap] || Globe;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            title={link.name}
            aria-label={link.name}
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
