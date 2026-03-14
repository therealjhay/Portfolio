import { z } from "zod";

// Easily edit everything below without touching the component code.
export const siteContent: SiteContent = {
  personalInfo: {
    name: "Jhay A.",
    role: "Web3 + Fullstack Developer",
    headline:
      "Hi, I build decentralized protocols and scalable fullstack applications.",
    bio: "Hybrid Web3 and fullstack engineer bridging Django/React systems with Ethereum smart contracts.",
    about:
      "I translate product ideas into secure smart contracts and production-grade web apps. My sweet spot is designing Web2 architectures that plug cleanly into Web3 infrastructure without compromising UX or security.",
    email: "hello@yourdomain.com",
    githubUrl: "https://github.com/therealjhay",
  },
  socialLinks: [
    { name: "GitHub", url: "https://github.com/therealjhay", icon: "github" },
    { name: "Twitter/X", url: "https://x.com/0xjhay", icon: "twitter" },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/oyemade-johnson",
      icon: "linkedin",
    },
    {
      name: "Etherscan",
      url: "https://etherscan.io/address/0x0000000000000000000000000000000000000000",
      icon: "etherscan",
    },
  ],
  skills: {
    web3: ["Solidity", "Ethereum", "Foundry", "Hardhat", "Ethers.js", "Viem"],
    frontend: ["React", "TypeScript", "JavaScript", "Tailwind CSS"],
    backend: ["Django", "Python", "PostgreSQL", "Node.js"],
  },
  projects: [
    {
      id: "ARES",
      title: "Ares Protocol",
      description:
        "An over-collateralized lending protocol with modular vaults and safety rails. Built audit-first with a developer SDK that makes integration painless.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/ARES-TREASURY",
      liveUrl:
        "https://substack.com/@therealjhay/note/p-190595895?r=6p9kb&utm_source=notes-share-action&utm_medium=web",
      techStack: ["Solidity", "Foundry", "Ethers.js", "Next.js"],
      accentColor: "#00E5FF",
    },
    {
      id: "gasless-mint",
      title: "Gasless Mint Studio",
      description:
        "A relayer-backed NFT minting workflow designed for zero-friction onboarding. Includes claim windows, allowlists, and real-time drop analytics.",
      category: "web3",
      githubUrl: "https://github.com/yourhandle/gasless-mint",
      liveUrl: "https://example.com/gasless-mint",
      techStack: ["Solidity", "Hardhat", "Viem", "React"],
      accentColor: "#FF3B7C",
    },
    {
      id: "stackforge",
      title: "StackForge Ops",
      description:
        "A fullstack ops dashboard for multi-tenant teams to manage workflows and deployments. Ships with role-based access, audit logs, and automated reporting.",
      category: "fullstack",
      githubUrl: "https://github.com/yourhandle/stackforge",
      liveUrl: "https://example.com/stackforge",
      techStack: ["Django", "PostgreSQL", "React", "TypeScript"],
      accentColor: "#B7FF00",
    },
    {
      id: "ledgerlight",
      title: "Ledgerlight CRM",
      description:
        "A sales intelligence CRM that syncs product usage events into customer timelines. Built to scale with async pipelines and a fast, tactile UI.",
      category: "fullstack",
      githubUrl: "https://github.com/yourhandle/ledgerlight",
      liveUrl: "https://example.com/ledgerlight",
      techStack: ["Node.js", "Django", "React", "Tailwind CSS"],
      accentColor: "#FF8F1F",
    },
  ],
};

export const SocialLinkSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  icon: z.string(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(["web3", "fullstack"]),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  techStack: z.array(z.string()),
  accentColor: z.string(),
});

export const SkillGroupsSchema = z.object({
  web3: z.array(z.string()),
  frontend: z.array(z.string()),
  backend: z.array(z.string()),
});

export const SiteContentSchema = z.object({
  personalInfo: z.object({
    name: z.string(),
    role: z.string(),
    headline: z.string(),
    bio: z.string(),
    about: z.string(),
    email: z.string().email(),
    githubUrl: z.string().url(),
  }),
  socialLinks: z.array(SocialLinkSchema),
  skills: SkillGroupsSchema,
  projects: z.array(ProjectSchema),
});

export type SiteContent = z.infer<typeof SiteContentSchema>;
