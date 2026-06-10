import { siteContent } from "@/config/site-content";

const byName = (name: string) =>
  siteContent.socialLinks.find((link) => link.name.toLowerCase().includes(name.toLowerCase()))?.url;

export const siteConfig = {
  name: siteContent.personalInfo.name,
  role: siteContent.personalInfo.role,
  tagline: siteContent.personalInfo.bio,
  siteUrl: "https://jhay.dev",
  availabilityOpen: true,
  latestPinnedProject: siteContent.projects[0]?.title ?? "Featured Project",
  social: {
    github: siteContent.personalInfo.githubUrl,
    linkedin: byName("linkedin") ?? "",
    twitter: byName("twitter") ?? "",
    etherscan: byName("etherscan") ?? "",
    calendly: "",
    email: siteContent.personalInfo.email,
    location: "Remote",
  },
  socialLinks: siteContent.socialLinks,
  nav: [
    { label: "Work", href: "/projects" },
    { label: "Resume", href: "/resume" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  rotatingTitles: [siteContent.personalInfo.role, "Blockchain Developer", "Full-Stack Engineer"],
} as const;

export type SiteConfig = typeof siteConfig;
