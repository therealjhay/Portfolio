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
      "Ethereum",
      "Foundry",
      "Hardhat",
      "Ethers.js",
      "Viem",
    ],
    frontend: ["React", "TypeScript", "JavaScript", "Tailwind CSS"],
    backend: ["Django", "Python", "PostgreSQL", "Node.js"],
  },
  projects: [
    {
      id: "betta-pay",
      title: "BettaPay",
      description:
        "A non-custodial merchant payment and settlement platform built on Stellar and Soroban, specifically optimized for African enterprises.",
      category: "web3",
      githubUrl: "https://github.com/betta-pay/",
      liveUrl: "https://betta-pay-frontend.vercel.app/",
      techStack: ["Rust (Soroban + WASM)", " Stellar RPC", "PostgreSQL", "Node.js", "Typescript"],
      accentColor: "#B7FF00",
    },
    {
      id: "starsight",
      title: "StarSight",
      description:
        "A Decision support platform for tokenized real-world assets (RWAs) built on Stellar.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/starsight",
      liveUrl: "",
      techStack: ["Rust (Soroban + WASM)", "TypeScript", "Shell", "Docker"],
      accentColor: "#F59E0B",
    },
    {
      id: "soul-srpg",
      title: "SOUL",
      description:
        "Soul is a devnet-ready reputation protocol that turns identity registrations, soulbound credentials, and attestations emitted by the RGP Solana program ino an indexed reputation passport.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/soul",
      liveUrl: "https://soul-srgp.vercel.app/",
      techStack: [
        "Rust (Anchor)",
        "TypeScript",
        "PostgreSQL",
        "NestJS",
        "web3.js",
      ],
      accentColor: "#F59E0B",
    },
    {
      id: "aegis-ai",
      title: "Aegis AI",
      description:
        "AegisAI is a defensive, event-driven geospatial AI powered platform for NGO disaster triage.",
      category: "fullstack",
      githubUrl: "https://github.com/therealjhay/AegisAi",
      liveUrl: "",
      techStack: ["Python", "Typescript", "CSS", "Javascript"],
      accentColor: "#F59E0B",
    },
    {
      id: "erc20-faucet",
      title: "Invincible Token Faucet",
      description:
        "A decentralized faucet app for distributing ERC20 testnet tokens. Built with Foundry for smart contracts and React/TypeScript for the frontend.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/erc20-faucet",
      liveUrl: "https://invincible-flax.vercel.app/",
      techStack: ["Solidity", "Foundry", "React", "TypeScript", "Viem"],
      accentColor: "#10B981",
    },
    {
      id: "blue-scribe",
      title: "Blue Scribe",
      description:
        "AI-powered audio-to-text transcription service with file upload and browser recording. Supports MP3, WAV, M4A, AAC, OGG up to 50MB with real-time processing.",
      category: "fullstack",
      githubUrl: "https://github.com/therealjhay/blue-scribe",
      liveUrl: "https://blue-scribe.vercel.app",
      techStack: ["Next.js", "React", "Gemini AI", "Vercel"],
      accentColor: "#3B82F6",
    },
    {
      id: "ARES",
      title: "Ares Protocol",
      description:
        "ARES is a modular treasury management protocol designed to manage high-value assets for autonomous organizations.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/ARES-TREASURY",
      liveUrl:
        "https://substack.com/@therealjhay/note/p-190595895?r=6p9kb&utm_source=notes-share-action&utm_medium=web",
      techStack: ["Solidity", "Foundry", "Merkle Trees", "OpenZeppelin"],
      accentColor: "#00E5FF",
    },
    {
      id: "trust-work",
      title: "Trust Work Protocol",
      description:
        "A decentralized escrow platform where clients lock stablecoin payments into smart contracts, milestones are defined upfront, funds release automatically on approval, and disputes are resolved via DAO arbitration.",
      category: "web3",
      githubUrl: "https://github.com/trustwork-org",
      liveUrl: "https://trust-work2323.vercel.app/",
      techStack: ["Solidity", "Hardhat", "Viem", "React"],
      accentColor: "#FF3B7C",
    },
    {
      id: "cheer-brightness",
      title: "Cheer Brightness",
      description:
        "A digital wellness micro-site for mood elevation. Features interactive sun slider, secret garden with petal effects, and gentle affirmations in a distraction-free space.",
      category: "fullstack",
      githubUrl: "https://github.com/therealjhay/cheer-brightness",
      liveUrl: "https://cheer-brightness.vercel.app/",
      techStack: ["React", "JavaScript", "Vercel", "CSS"],
      accentColor: "#F59E0B",
    },
  ],
  articles: [
    {
      id: "substack-note-190595895",
      title: "Substack Note #190595895",
      description: "Technical note published on Substack.",
      url: "https://substack.com/@therealjhay/note/p-190595895?r=6p9kb&utm_source=notes-share-action&utm_medium=web",
      platform: "Substack",
      tags: ["Substack Note"],
      accentColor: "#00E5FF",
    },
    {
      id: "substack-note-187978176",
      title: "Substack Note #187978176",
      description: "Technical note published on Substack.",
      url: "https://substack.com/@therealjhay/note/p-187978176?r=6p9kb&utm_source=notes-share-action&utm_medium=web",
      platform: "Substack",
      tags: ["Substack Note"],
      accentColor: "#FF8F1F",
    },
    {
      id: "substack-note-187071784",
      title: "Substack Note #187071784",
      description: "Technical note published on Substack.",
      url: "https://substack.com/@therealjhay/note/p-187071784?r=6p9kb&utm_source=notes-share-action&utm_medium=web",
      platform: "Substack",
      tags: ["Substack Note"],
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
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
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
