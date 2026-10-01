import { z } from "zod";

// Easily edit everything below without touching the component code.
export const siteContent: SiteContent = {
  personalInfo: {
    name: "Johnson Oyemade",
    role: "Web3 + Fullstack Developer",
    headline:
      "Hi I'm 0xJhay, I build decentralized protocols and scalable fullstack applications.",
    bio: "Hybrid Web3 and fullstack engineer bridging Django/React systems with Ethereum smart contracts.",
    about:
      "I translate product ideas into secure smart contracts and production-grade web apps. My sweet spot is designing Web2 architectures that plug cleanly into Web3 infrastructure without compromising UX or security.",
    email: "johnsonoca@gmail.com",
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
      url: "https://etherscan.io/address/0x611885e1907E469cCb2E3AA154c2076A1458a33B",
      icon: "etherscan",
    },
  ],
  skills: {
    web3: [
      "Solidity",
      "Rust",
      "Soroban",
      "Foundry",
      "Ethereum",
      "Ethers.js",
      "Viem",
      "Circom",
      "Noir",
    ],
    frontend: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"],
    backend: ["Python", "FastAPI", "Django", "PostgreSQL", "Node.js", "Docker"],
  },
  projects: [
    {
      id: "preflight",
      title: "PreFlight",
      description:
        "Transaction intelligence and safety layer for Web3. Analyzes blockchain transactions before signing, explaining outcomes in human-readable terms to prevent irreversible on-chain mistakes.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/PreFlight",
      liveUrl: "",
      techStack: ["Solidity", "Python", "TypeScript", "Ethers.js"],
      accentColor: "#00FFA6",
    },
    {
      id: "betta-pay",
      title: "BettaPay",
      description:
        "A non-custodial merchant payment and settlement protocol built on Stellar and Soroban, optimized for high-throughput enterprise settlement across Africa.",
      category: "web3",
      githubUrl: "https://github.com/Betta-Pay/BettaPay-Contract",
      liveUrl: "https://betta-pay-frontend.vercel.app/",
      techStack: ["Rust", "Soroban", "Stellar RPC", "TypeScript", "Node.js"],
      accentColor: "#B7FF00",
    },
    {
      id: "verivault",
      title: "VeriVault",
      description:
        "A Rust-native, Soroban-based protocol enabling private transactions with selective regulatory disclosure, powered by Protocol 25 BN254 and Poseidon ZK primitives.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/VeriVault",
      liveUrl: "",
      techStack: ["Rust", "Soroban", "Noir ZK", "Protocol 25", "TypeScript"],
      accentColor: "#10B981",
    },
    {
      id: "anima",
      title: "ANIMA",
      description:
        "Decentralized AI companion with cryptographic, user-owned memory built on 0G Storage, Compute, and Chain — ensuring persistent, tamper-proof agent memory.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/ANIMA",
      liveUrl: "",
      techStack: ["0G Network", "Solidity", "TypeScript", "AI Agents", "React"],
      accentColor: "#8B5CF6",
    },
    {
      id: "starsight",
      title: "StarSight",
      description:
        "Decision support and risk analytics platform for tokenized real-world assets (RWAs) built on Stellar.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/StarSight",
      liveUrl: "",
      techStack: ["Rust (Soroban + WASM)", "TypeScript", "Shell", "Docker"],
      accentColor: "#F59E0B",
    },
    {
      id: "soul-srpg",
      title: "SOUL Protocol",
      description:
        "Devnet-ready reputation and identity protocol turning credentials, identity registrations, and attestations into an indexed, portable on-chain passport.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/Soul",
      liveUrl: "https://soul-protocol-self.vercel.app",
      techStack: ["Rust (Anchor)", "Circom", "TypeScript", "Next.js", "Docker"],
      accentColor: "#6366F1",
    },
    {
      id: "ARES",
      title: "Ares Protocol",
      description:
        "Modular treasury management protocol designed to manage high-value vault assets and yield allocation strategies for autonomous organizations.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/ARES-TREASURY",
      liveUrl:
        "https://substack.com/@therealjhay/note/p-190595895?r=6p9kb&utm_source=notes-share-action&utm_medium=web",
      techStack: ["Solidity", "Foundry", "Merkle Trees", "OpenZeppelin"],
      accentColor: "#00E5FF",
    },
    {
      id: "relaypay-stellar",
      title: "RelayPay",
      description:
        "A full-stack Stellar checkout starter and reusable React payment component with built-in wallet connection, transaction handling, and auto-settlement.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/RelayPay-Stellar",
      liveUrl: "",
      techStack: ["React", "TypeScript", "Stellar SDK", "Soroban", "Tailwind CSS"],
      accentColor: "#06B6D4",
    },
    {
      id: "aegis-ai",
      title: "Aegis AI",
      description:
        "A real-time, event-driven geospatial AI platform for NGO disaster triage, damage assessment, and emergency humanitarian response.",
      category: "fullstack",
      githubUrl: "https://github.com/therealjhay/AegisAI",
      liveUrl: "https://aegis-ai-gamma.vercel.app",
      techStack: ["Python", "FastAPI", "TypeScript", "Next.js", "Geospatial AI"],
      accentColor: "#EF4444",
    },
    {
      id: "blue-scribe",
      title: "Scribe",
      description:
        "AI-powered audio transcription platform powered by Google Gemini 2.5 Flash, featuring automatic speaker detection, multi-format audio support, and real-time transcripts.",
      category: "fullstack",
      githubUrl: "https://github.com/therealjhay/Scribe",
      liveUrl: "https://blue-scribe.vercel.app",
      techStack: ["Next.js", "TypeScript", "Gemini AI", "Tailwind CSS"],
      accentColor: "#3B82F6",
    },
    {
      id: "invincible-token",
      title: "Invincible Token & Faucet",
      description:
        "Full-stack ERC-20 token ecosystem with automated 24-hour rate-limited testnet faucet, owner minting controls, and interactive Web3 claiming interface.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/INVINCIBLE",
      liveUrl: "https://invincible-flax.vercel.app",
      techStack: ["Solidity", "Foundry", "TypeScript", "React", "Viem"],
      accentColor: "#10B981",
    },
    {
      id: "foundry-diamonds",
      title: "Foundry Diamonds",
      description:
        "Production-ready EIP-2535 Diamonds framework for Foundry, featuring on-the-fly dynamic facet selector generation and Diamond Loupe test suites.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/Foundry-Diamonds",
      liveUrl: "",
      techStack: ["Solidity", "Foundry", "EIP-2535", "Solidity FFI"],
      accentColor: "#EC4899",
    },
    {
      id: "monadrpg",
      title: "MonadRPG",
      description:
        "Production-grade, privacy-preserving reputation and identity system built on Monad with zero-knowledge proofs (Circom) and on-chain state.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/MonadRPG",
      liveUrl: "",
      techStack: ["Solidity", "Circom ZK", "TypeScript", "Rust", "Monad"],
      accentColor: "#8B5CF6",
    },
    {
      id: "jdc-watches",
      title: "JDC Luxury Watches",
      description:
        "E-commerce platform for curated luxury timepieces featuring WhatsApp concierge ordering, catalog filtering, and high-performance product browsing.",
      category: "fullstack",
      githubUrl: "https://github.com/therealjhay/JDC",
      liveUrl: "https://jdcwatches.vercel.app",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "React Query", "Python"],
      accentColor: "#D97706",
    },
  ],
  articles: [
    {
      id: "ares-protocol-breakdown",
      title: "A Technical Breakdown of ARES PROTOCOL",
      description:
        "Redesigning the Vault system: How ARES Protocol is Solving DeFi’s Problem.",
      url: "https://substack.com/@therealjhay/note/p-190595895?r=6p9kb&utm_source=notes-share-action&utm_medium=web",
      platform: "Substack",
      tags: ["DeFi", "Smart Contracts", "Vaults"],
      accentColor: "#00E5FF",
    },
    {
      id: "solidity-inheritance",
      title: "Understanding Solidity Inheritance",
      description: "Building Modular and Secure Smart Contracts.",
      url: "https://substack.com/@therealjhay/note/p-187978176?r=6p9kb&utm_source=notes-share-action&utm_medium=web",
      platform: "Substack",
      tags: ["Solidity", "Security", "Architecture"],
      accentColor: "#FF8F1F",
    },
    {
      id: "eip-6963-wallet-war",
      title: "The End of the “Wallet War”: A Deep Dive into EIP-6963",
      description:
        "How Multi Injected Provider Discovery is finally solving the race condition that has plagued Ethereum UX for nearly a decade.",
      url: "https://substack.com/@therealjhay/note/p-187071784?r=6p9kb&utm_source=notes-share-action&utm_medium=web",
      platform: "Substack",
      tags: ["Ethereum", "EIP-6963", "Web3 UX"],
      accentColor: "#B7FF00",
    },
    {
      id: "react-hooks-practical-guide",
      title:
        "React Hooks: A Practical Guide to useState, useEffect, and Beyond",
      description:
        "A hands-on walkthrough of React hook fundamentals, patterns, and real-world usage.",
      url: "https://0xjhay.hashnode.dev/react-hooks-a-practical-guide-to-usestate-useeffect-and-beyond",
      platform: "Hashnode",
      tags: ["React", "Hooks", "Frontend"],
      accentColor: "#FF3B7C",
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
  githubUrl: z.union([z.string().url(), z.literal("")]).optional(),
  liveUrl: z.union([z.string().url(), z.literal("")]).optional(),
  techStack: z.array(z.string()),
  accentColor: z.string(),
});

export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  platform: z.string(),
  tags: z.array(z.string()),
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
  articles: z.array(ArticleSchema),
});

export type SiteContent = z.infer<typeof SiteContentSchema>;

// --- Consolidated Configuration & Mappings ---

const byName = (name: string) =>
  siteContent.socialLinks.find((link) =>
    link.name.toLowerCase().includes(name.toLowerCase()),
  )?.url;

export const siteConfig = {
  name: siteContent.personalInfo.name,
  role: siteContent.personalInfo.role,
  tagline: siteContent.personalInfo.bio,
  siteUrl: "https://therealjhay.tech",
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
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Resume", href: "/resume" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  rotatingTitles: [
    siteContent.personalInfo.role,
    "Blockchain Developer",
    "Full-Stack Engineer",
  ],
} as const;

export type SiteConfig = typeof siteConfig;

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
