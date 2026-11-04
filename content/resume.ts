import { siteContent } from "@/config/site-content";

export type ResumeData = {
  header: {
    fullName: string;
    title: string;
    location: string;
    email: string;
    phone?: string;
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
    web3: string[];
    frontend: string[];
    backend: string[];
    management: string[];
  };
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    year?: string;
  }>;
};

export const resumeData: ResumeData = {
  header: {
    fullName: siteContent.personalInfo.name,
    title: siteContent.personalInfo.role,
    location: siteContent.personalInfo.location,
    email: siteContent.personalInfo.email,
    phone: "+234 901 394 1005",
    github: siteContent.personalInfo.githubUrl.replace(/^https?:\/\//, ""),
    linkedin:
      siteContent.socialLinks
        .find((link) => link.icon === "linkedin")
        ?.url.replace(/^https?:\/\//, "") ?? "linkedin.com/in/oyemade-johnson",
  },
  summary:
    "Builder, AI-native blockchain engineer, and project manager with proven execution across decentralized protocol engineering, AI application development, and cross-functional team leadership. Track record ranging from founding commercial ventures and managing Agile product lifecycles to shipping smart contracts and open-source blockchain infrastructure.",
  experience: [
    {
      company: "Drips",
      role: "Open Source Developer (Blockchain)",
      location: "Remote",
      dateRange: "Feb 2026 – Present",
      bullets: [
        "Contributing to open-source decentralized dependency streaming protocols and smart contract infrastructure.",
        "Collaborating with the developer community on protocol optimizations, security standards, and developer tooling.",
      ],
    },
    {
      company: "Game Bazar",
      role: "Co-Founder & Project Manager",
      location: "Lagos, Nigeria",
      dateRange: "Jun 2022 – Present",
      bullets: [
        "Defined and executed product vision, roadmap, and milestone priorities, aligning game features with user feedback and market opportunities.",
        "Led cross-functional teams of developers, designers, and artists through the entire product development lifecycle from concept to launch.",
        "Implemented Agile methodologies (Scrum/Kanban) to ensure sprint velocity, risk mitigation, and on-time milestone delivery.",
        "Established and monitored product KPIs, analyzing player retention, gameplay telemetry, and beta testing feedback to iterate on core UX.",
        "Acted as the primary bridge between technical teams and external stakeholders, providing clear milestone reporting and strategic alignment.",
      ],
    },
    {
      company: "JDC Stores",
      role: "Founder & Operations Lead",
      location: "Lagos, Nigeria",
      dateRange: "Jul 2019 – Present",
      bullets: [
        "Formulated overall commercial strategy, competitive analysis, and financial management, handling budgeting, accounting, and cash flow.",
        "Architected and maintained the e-commerce web platform (JDC Luxury Watches), optimizing catalog discovery, conversion funnels, and checkout UX.",
        "Managed end-to-end supply chain operations, inventory forecasting, shipping logistics, and customer retention.",
        "Planned and executed data-driven marketing campaigns, driving consistent customer acquisition and multi-year brand loyalty.",
      ],
    },
    {
      company: "Web3Bridge",
      role: "Blockchain Developer",
      location: "Remote",
      dateRange: "Jan 2026 – Jun 2026",
      bullets: [
        "Architected and deployed client-facing smart contract systems with upgrade-safe patterns and deterministic test coverage.",
        "Introduced Foundry-based simulation suites and pre-deployment gas regression checks to minimize protocol vulnerability.",
        "Integrated web applications with on-chain event pipelines to enable real-time protocol observability.",
      ],
    },
    {
      company: "Trueminds Innovations Ltd",
      role: "Frontend Developer",
      location: "Hybrid",
      dateRange: "Feb 2026 – May 2026",
      bullets: [
        "Developed responsive, high-performance web applications using modern React, Next.js, and TypeScript.",
        "Collaborated closely with UX/UI design teams to implement accessible component architectures and fluid state management.",
      ],
    },
    {
      company: "DexPay",
      role: "Community Manager",
      location: "Remote",
      dateRange: "Jan 2025 – Feb 2026",
      bullets: [
        "Managed community engagement and moderated discussions across Web3 channels to foster an active, supportive ecosystem.",
        "Authored technical announcements, release notes, and educational content in coordination with product and marketing teams.",
      ],
    },
  ],
  projects: siteContent.projects
    .filter((p) =>
      ["betta-pay", "preflight", "ARES", "blue-scribe"].includes(p.id),
    )
    .map((p) => ({
      name: p.title,
      description: p.description,
      tech: p.techStack,
      github: p.githubUrl.replace(/^https?:\/\//, ""),
      live:
        p.liveUrl && p.liveUrl.length > 0
          ? p.liveUrl.replace(/^https?:\/\//, "")
          : undefined,
    })),
  skills: {
    web3: [
      "Solidity",
      "Smart Contract Security",
      "Foundry",
      "Rust (Soroban)",
      "Zero-Knowledge (Circom, Noir)",
      "Viem",
      "Ethers.js",
    ],
    frontend: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Gemini AI Integration",
      "UI/UX Architecture",
    ],
    backend: [
      "Python",
      "FastAPI",
      "Django REST",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Git & CI/CD",
    ],
    management: [
      "Agile (Scrum / Kanban)",
      "Product Strategy & Roadmaps",
      "Sprint Planning",
      "Cross-Functional Team Leadership",
      "KPI & Product Analytics",
      "Stakeholder Communication",
    ],
  },
  languages: [
    { language: "English", proficiency: "Full Professional" },
    { language: "German", proficiency: "Elementary" },
  ],
  education: [
    {
      institution: "National Open University of Nigeria",
      degree: "B.Sc. Computer Science",
      year: "2024",
    },
    {
      institution: "ALX Africa",
      degree: "Backend Web Development Programme",
      year: "Jan 2025 – Feb 2026",
    },
  ],
  certifications: [
    {
      name: "ALX Software Engineering Programme - Pro Dev Back-End",
      issuer: "ALX Africa",
    },
    {
      name: "ALX Software Engineering Programme in Back-End Web Development",
      issuer: "ALX Africa",
    },
    {
      name: "ALX Professional Foundations",
      issuer: "ALX Africa",
    },
    {
      name: "MTA: Introduction to Programming Using JavaScript",
      issuer: "Microsoft",
    },
    {
      name: "The Fundamentals of Digital Marketing",
      issuer: "Google",
    },
    {
      name: "Solidity Developer Bootcamp",
      issuer: "Web3bridge Africa",
    },
  ],
};
