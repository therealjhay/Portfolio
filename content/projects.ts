import { siteContent } from "@/config/site-content";

export const projectCategories = ["All", "Smart Contracts", "Full-Stack"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  name: string;
  description: string;
  tags: string[];
  category: Exclude<ProjectCategory, "All">;
  githubUrl: string;
  liveUrl?: string;
};

export const projects: Project[] = siteContent.projects.map((project) => ({
  name: project.title,
  description: project.description,
  tags: project.techStack,
  category: project.category === "web3" ? "Smart Contracts" : "Full-Stack",
  githubUrl: project.githubUrl ?? "#",
  liveUrl: project.liveUrl,
}));
