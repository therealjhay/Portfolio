import { siteContent } from "@/config/site-content";

export type ResumeData = {
  header: {
    fullName: string;
    title: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    role: string;
    location: string;
    dateRange: string;
    bullets: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    tech: string[];
    github: string;
    live?: string;
  }>;
  skills: {
    languages: string[];
    frameworks: string[];
    blockchain: string[];
    tools: string[];
  };
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
};

export const resumeData: ResumeData = {
  header: {
    fullName: siteContent.personalInfo.name,
    title: siteContent.personalInfo.role,
    location: "Remote",
    email: siteContent.personalInfo.email,
    github: siteContent.personalInfo.githubUrl.replace(/^https?:\/\//, ""),
    linkedin:
      siteContent.socialLinks
        .find((link) => link.name.toLowerCase().includes("linkedin"))
        ?.url.replace(/^https?:\/\//, "") ?? "",
  },
  summary:
    "Blockchain and full-stack engineer with a builder-first mindset, focused on shipping production systems end-to-end. I architect smart contract stacks, data pipelines, and operational tooling that survive real traffic and real users. I move projects from concept to deployment with clear technical ownership across product, backend, and on-chain infrastructure.",
  experience: [
    {
      company: "Web3bridge Africa",
      role: "Blockchain & Full-Stack Developer",
      location: "Remote",
      dateRange: "Jan 2026 – Present",
      bullets: [
        "Architected and deployed client-facing smart contract systems with upgrade-safe patterns and deterministic test coverage.",
        "Reduced release risk by introducing Foundry-based simulation suites and pre-deployment gas regression checks.",
        "Integrated web dashboards with on-chain event pipelines to provide near real-time protocol observability.",
        "Delivered full product stacks from technical discovery through deployment, handoff, and post-launch support.",
      ],
    },
    {
      company: "Freelance",
      role: "Full-Stack Engineer",
      location: "Hybrid",
      dateRange: "Jun 2024 – Present",
      bullets: [
        "Built multi-tenant backend services for analytics-heavy products using Django, PostgreSQL, and Redis.",
        "Deployed containerized workloads and CI pipelines that shortened iteration cycles for cross-functional teams.",
        "Integrated authentication, billing, and operational telemetry for production SaaS delivery.",
      ],
    },
  ],
  projects: siteContent.projects
    .filter((p) => ["ARES", "soul-srpg", "blue-scribe"].includes(p.id))
    .map((p) => ({
      name: p.title,
      description: p.description,
      tech: p.techStack,
      github: p.githubUrl?.replace(/^https?:\/\//, "") ?? "",
      live: p.liveUrl?.replace(/^https?:\/\//, "") ?? undefined,
    })),
  skills: {
    languages: ["TypeScript", "Python", "Solidity", "Rust"],
    frameworks: ["Next.js", "FastAPI", "Django"],
    blockchain: ["Foundry", "ethers.js", "Viem"],
    tools: ["PostgreSQL", "Redis", "Docker", "GitHub Actions"],
  },
  education: [
    {
      institution: "National Open University",
      degree: "B.Sc. Computer Science",
      year: "Present",
    },
  ],
  certifications: [
    {
      name: "Solidity Developer Bootcamp",
      issuer: "Web3bridge Africa",
      year: "2026",
    },
  ],
};
