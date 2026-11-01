export type SocialLink = {
  name: string;
  url: string;
  icon: "github" | "twitter" | "linkedin" | "etherscan";
  handle: string;
};

export type ProjectCaseStudy = {
  problem: string;
  solution: string;
  contribution: string[];
};

export type ProjectItem = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  category: "web3" | "fullstack";
  featured?: boolean;
  githubUrl: string;
  liveUrl?: string;
  frameUrl?: string;
  techStack: string[];
  accentColor: string;
  caseStudy: ProjectCaseStudy;
};

export type ArticleItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  platform: string;
  tags: string[];
  accentColor: string;
};

export type SkillCluster = {
  id: string;
  code: string;
  title: string;
  summary: string;
  accentColor: string;
  skills: string[];
};

export type StoryPillar = {
  code: string;
  title: string;
  body: string;
  signal: string;
};

export type SiteContent = {
  personalInfo: {
    name: string;
    handle: string;
    role: string;
    headline: string;
    supportingText: string;
    bio: string;
    location: string;
    email: string;
    githubUrl: string;
    linkedinUrl: string;
    about: string[];
    pillars: StoryPillar[];
  };
  socialLinks: SocialLink[];
  skillClusters: SkillCluster[];
  skills: {
    web3: string[];
    frontend: string[];
    backend: string[];
  };
  projects: ProjectItem[];
  articles: ArticleItem[];
};

export const siteContent: SiteContent = {
  personalInfo: {
    name: "Johnson Oyemade",
    handle: "JHAY",
    role: "Web3 & Full-Stack Developer",
    headline: "I build the systems behind ambitious products.",
    supportingText:
      "I'm Johnson Oyemade — a Web3 and Full-Stack Developer building smart contracts, blockchain infrastructure and production-ready applications.",
    bio: "Hybrid Web3 and full-stack engineer bridging scalable backend and React systems with production smart contracts.",
    location: "Remote",
    email: "johnsonoca@gmail.com",
    githubUrl: "https://github.com/therealjhay",
    linkedinUrl: "https://linkedin.com/in/oyemade-johnson",
    about: [
      "I’m an engineer drawn to how complex systems hold together under pressure — from deterministic state machines on-chain to the backend pipelines and interfaces that make them usable in the real world.",
      "Rather than treating smart contracts and web applications as separate worlds, I architect them as one continuous execution pipeline: protocol primitives, indexing and API services, and responsive client interfaces.",
      "Whether designing zero-knowledge circuits, modular treasury vaults, or high-throughput settlement engines, my focus stays the same: turn ambitious technical ideas into reliable, working products.",
    ],
    pillars: [
      {
        code: "SYS // 01",
        title: "Building From the Ground Up",
        body: "Taking systems from blank-slate architecture to deployed contracts, backend services, and live user interfaces with end-to-end technical ownership.",
        signal: "Zero-to-one execution",
      },
      {
        code: "SYS // 02",
        title: "Protocol Engineering",
        body: "Designing settlement engines, modular diamond proxies, and zero-knowledge circuits across EVM (Solidity/Foundry) and Stellar (Rust/Soroban).",
        signal: "EVM · Soroban · ZK",
      },
      {
        code: "SYS // 03",
        title: "Smart Contract Development",
        body: "Writing upgrade-safe, deterministic contracts backed by invariant testing, simulation harnesses, and strict access and rate-limit boundaries.",
        signal: "Foundry · OpenZeppelin · EIP-2535",
      },
      {
        code: "SYS // 04",
        title: "Backend Architecture",
        body: "Engineering event indexers, transaction simulation pipelines, and multi-tenant APIs in Python (FastAPI, Django), Rust, and TypeScript.",
        signal: "FastAPI · Django · PostgreSQL",
      },
      {
        code: "SYS // 05",
        title: "Product Thinking",
        body: "Abstracting cryptographic and on-chain complexity behind clear human-readable workflows so real users can operate protocols safely.",
        signal: "UX-first Web3",
      },
      {
        code: "SYS // 06",
        title: "Continuous Experimentation",
        body: "Prototyping at the frontier of transaction intelligence, verifiable AI memory, and privacy-preserving compliance primitives.",
        signal: "R&D → Production",
      },
    ],
  },
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/therealjhay",
      icon: "github",
      handle: "@therealjhay",
    },
    {
      name: "Twitter / X",
      url: "https://x.com/0xjhay",
      icon: "twitter",
      handle: "@0xjhay",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/oyemade-johnson",
      icon: "linkedin",
      handle: "oyemade-johnson",
    },
    {
      name: "Etherscan",
      url: "https://etherscan.io/address/0x611885e1907E469cCb2E3AA154c2076A1458a33B",
      icon: "etherscan",
      handle: "0x6118…a33B",
    },
  ],
  skillClusters: [
    {
      id: "protocol",
      code: "CLUSTER // 01",
      title: "Blockchain & Protocol Engineering",
      summary:
        "Core languages, virtual machines, and toolchains for designing and deploying decentralized protocols across EVM and WASM chains.",
      accentColor: "#c8ff2e",
      skills: ["Solidity", "Rust", "Soroban", "Ethereum", "Stellar", "Foundry"],
    },
    {
      id: "contracts",
      code: "CLUSTER // 02",
      title: "Smart Contract Engineering",
      summary:
        "Modular contract standards, diamond upgradeability, deterministic test harnesses, and defense-in-depth vault architectures.",
      accentColor: "#00FFA6",
      skills: [
        "OpenZeppelin",
        "ERC Standards",
        "EIP-2535 Diamonds",
        "EIP-712",
        "Foundry Testing",
        "Protocol Architecture",
      ],
    },
    {
      id: "zk",
      code: "CLUSTER // 03",
      title: "Zero-Knowledge",
      summary:
        "Arithmetic circuits, pairing-friendly curves, and ZK hash primitives for privacy-preserving state and selective disclosure.",
      accentColor: "#7dd3fc",
      skills: ["Circom", "Noir", "BN254", "Poseidon"],
    },
    {
      id: "backend",
      code: "CLUSTER // 04",
      title: "Backend & Infrastructure",
      summary:
        "High-reliability API services, on-chain event indexers, geospatial/relational data stores, and containerized deployments.",
      accentColor: "#F59E0B",
      skills: ["Python", "FastAPI", "Django", "Node.js", "PostgreSQL", "Docker"],
    },
    {
      id: "frontend",
      code: "CLUSTER // 05",
      title: "Frontend",
      summary:
        "Type-safe web applications, interactive 3D/WebGL interfaces, and wallet-connected dApp experiences.",
      accentColor: "#A78BFA",
      skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
    },
  ],
  skills: {
    web3: [
      "Solidity",
      "Rust",
      "Soroban",
      "Foundry",
      "Ethereum",
      "Stellar",
      "Ethers.js",
      "Viem",
      "Circom",
      "Noir",
    ],
    frontend: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"],
    backend: ["Python", "FastAPI", "Django", "PostgreSQL", "Node.js", "Docker"],
  },
  projects: [
    // --- 01 to 06: Projects with Live Deployed UIs ---
    {
      id: "betta-pay",
      index: "01",
      title: "BettaPay",
      tagline: "Stellar/Soroban merchant payments and settlement.",
      description:
        "A non-custodial merchant payment and settlement protocol built on Stellar and Soroban, optimized for high-throughput enterprise settlement across Africa.",
      category: "web3",
      featured: true,
      githubUrl: "https://github.com/Betta-Pay/BettaPay-Contract",
      liveUrl: "https://bettapay-tech.vercel.app/",
      frameUrl: "/api/preview?url=https://bettapay-tech.vercel.app/",
      techStack: ["Rust", "Soroban", "Stellar", "WebAssembly", "TypeScript", "Node.js"],
      accentColor: "#c8ff2e",
      caseStudy: {
        problem:
          "Cross-border and enterprise merchant settlement across Africa requires programmable fee splits, transparent payment references, and non-custodial on-chain guarantees.",
        solution:
          "Soroban smart contract infrastructure on Stellar combining a merchant settlement contract with a timelocked governance and configuration registry.",
        contribution: [
          "Settlement contract handling merchant registration, fee splits, and payment references",
          "Governance contract managing fee configs, anchor registry, and system parameters",
          "Timelocked scheduled operations and 4-tier settlement rule fallback resolution",
        ],
      },
    },
    {
      id: "soul-srpg",
      index: "02",
      title: "SOUL Protocol",
      tagline: "On-chain identity and reputation.",
      description:
        "Devnet-ready reputation and identity protocol turning credentials, identity registrations, and attestations into an indexed, portable on-chain passport.",
      category: "web3",
      featured: true,
      githubUrl: "https://github.com/therealjhay/Soul",
      liveUrl: "https://soul-srgp.vercel.app",
      techStack: ["Rust", "Solana", "Circom", "TypeScript", "NestJS", "PostgreSQL", "Next.js"],
      accentColor: "#6366F1",
      caseStudy: {
        problem:
          "On-chain activity, credentials, and attestations are fragmented across addresses, making portable reputation and sybil-resistant verification difficult.",
        solution:
          "An identity and reputation protocol combining on-chain soulbound credentials with a graph scoring engine and Circom zero-knowledge threshold proofs.",
        contribution: [
          "Rust on-chain program for identity registration, soulbound credentials, and attestations",
          "TypeScript log indexer writing on-chain events into PostgreSQL",
          "Rust graph engine for reputation scoring plus Circom circuits for threshold proofs",
        ],
      },
    },
    {
      id: "aegis-ai",
      index: "03",
      title: "Aegis AI",
      tagline: "Geospatial AI for disaster response.",
      description:
        "A real-time, event-driven geospatial AI platform for NGO disaster triage, damage assessment, and emergency humanitarian response.",
      category: "fullstack",
      featured: true,
      githubUrl: "https://github.com/therealjhay/AegisAI",
      liveUrl: "https://aegiswarm.vercel.app",
      techStack: ["Python", "FastAPI", "TypeScript", "Next.js", "Mapbox GL", "PostGIS"],
      accentColor: "#EF4444",
      caseStudy: {
        problem:
          "Emergency disaster response suffers from slow funding coordination, noisy or duplicate field reports, and opaque disbursement trails.",
        solution:
          "A geospatial triage platform that clusters incoming reports in PostGIS, runs a multi-agent verification quorum, and logs signed disbursement decisions.",
        contribution: [
          "Spatiotemporal clustering of emergency reports using PostgreSQL and PostGIS",
          "4-agent verification pipeline: Triangulator, Fact-Checker, Triage Evaluator, Risk Governor",
          "Parametric disbursement vault with HMAC-signed audit trails and Next.js/Mapbox command UI",
        ],
      },
    },
    {
      id: "blue-scribe",
      index: "04",
      title: "Scribe",
      tagline: "AI-powered transcription.",
      description:
        "AI-powered audio transcription platform powered by Google Gemini 2.5 Flash, featuring automatic speaker detection, multi-format audio support, and real-time transcripts.",
      category: "fullstack",
      githubUrl: "https://github.com/therealjhay/Scribe",
      liveUrl: "https://blue-scribe.vercel.app",
      techStack: ["Next.js", "TypeScript", "Gemini AI", "Tailwind CSS"],
      accentColor: "#3B82F6",
      caseStudy: {
        problem:
          "Turning multi-speaker recordings across diverse audio formats into structured, searchable transcripts requires fast inference and clean editing workflows.",
        solution:
          "A web transcription studio powered by Google Gemini 2.5 Flash with speaker diarization, multi-format upload, and interactive transcript playback.",
        contribution: [
          "Next.js and TypeScript audio ingestion pipeline supporting multiple recording formats",
          "Gemini 2.5 Flash integration for speaker detection and timestamped transcription",
          "Clean editorial transcript viewer with export and search controls",
        ],
      },
    },
    {
      id: "invincible-token",
      index: "05",
      title: "Invincible Token & Faucet",
      tagline: "ERC-20 token ecosystem.",
      description:
        "Full-stack ERC-20 token ecosystem with automated 24-hour rate-limited testnet faucet, owner minting controls, and interactive Web3 claiming interface.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/INVINCIBLE",
      liveUrl: "https://invincible-flax.vercel.app",
      techStack: ["Solidity", "OpenZeppelin", "Hardhat", "React", "TypeScript", "Lisk Sepolia"],
      accentColor: "#10B981",
      caseStudy: {
        problem:
          "Testnet ecosystems need an ERC-20 token with realistic supply caps and rate-limited distribution that developers and testers can claim through a clean UI.",
        solution:
          "A capped ERC-20 token (Viltrum / VIL) deployed on Lisk Sepolia with an on-chain 24-hour cooldown faucet and a React wallet interface.",
        contribution: [
          "ERC-20 contract with 10,000,000 VIL cap, owner minting, and 24-hour faucet cooldown",
          "React frontend for wallet connection, faucet claiming, transfers, and live token stats",
          "Automated test suite covering faucet rate limits, cooldowns, and supply invariants",
        ],
      },
    },
    {
      id: "jdc-watches",
      index: "06",
      title: "JDC Luxury Watches",
      tagline: "E-commerce platform.",
      description:
        "E-commerce platform for curated luxury timepieces featuring WhatsApp concierge ordering, catalog filtering, and high-performance product browsing.",
      category: "fullstack",
      githubUrl: "https://github.com/therealjhay/JDC",
      liveUrl: "https://jdcwatches.vercel.app",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Django REST", "PostgreSQL", "Cloudinary"],
      accentColor: "#D97706",
      caseStudy: {
        problem:
          "High-touch retail catalogs require fast browsing and variant management while routing checkout directly into personalized WhatsApp concierge threads.",
        solution:
          "A full-stack luxury watch storefront built with Next.js and Django REST Framework featuring multi-variant catalog management and pre-filled WhatsApp checkout.",
        contribution: [
          "Next.js storefront with brand/category filtering, variant selection, and WhatsApp order builder",
          "Django REST Framework and PostgreSQL backend powering products, variants, and order tracking",
          "Admin operations dashboard with Cloudinary multi-image upload",
        ],
      },
    },

    // --- 07 to 14: Smart Contract & Protocol Architecture Repositories ---
    {
      id: "preflight",
      index: "07",
      title: "PreFlight",
      tagline: "Web3 transaction intelligence and safety.",
      description:
        "Transaction intelligence and safety layer for Web3. Analyzes blockchain transactions before signing, explaining outcomes in human-readable terms to prevent irreversible on-chain mistakes.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/PreFlight",
      techStack: ["Solidity", "Foundry", "TypeScript", "React", "Fastify", "Ethers.js", "Monad"],
      accentColor: "#00FFA6",
      caseStudy: {
        problem:
          "Users sign opaque hexadecimal blockchain transactions without visibility into state changes or counterparty risk, leading to irreversible on-chain mistakes.",
        solution:
          "A pre-signing transaction safety layer that decodes calldata, simulates execution outcomes, checks contract reputation against an on-chain registry, and explains risk scores in plain language.",
        contribution: [
          "Backend analysis engine for decoding, simulation, reputation lookup, and risk scoring",
          "PreflightRegistry smart contract on Monad testnet for flagging risky addresses",
          "Chrome Manifest V3 browser extension, developer SDK (@preflight/sdk), and web dashboard",
        ],
      },
    },
    {
      id: "verivault",
      index: "08",
      title: "VeriVault",
      tagline: "Privacy-preserving transactions and selective disclosure.",
      description:
        "A Rust-native, Soroban-based protocol enabling private transactions with selective regulatory disclosure, powered by Protocol 25 BN254 and Poseidon ZK primitives.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/VeriVault",
      techStack: ["Rust", "Soroban", "Stellar", "Noir", "BN254", "Poseidon2", "WASM"],
      accentColor: "#10B981",
      caseStudy: {
        problem:
          "Users and institutions need private on-chain transactions on Stellar while still provably satisfying compliance policies without exposing underlying identity data.",
        solution:
          "A Soroban privacy protocol using Noir zero-knowledge circuits, Poseidon2 commitments, and on-chain BN254 pairing verification to prove compliance attributes privately.",
        contribution: [
          "Poseidon2 commitment storage in an incremental Merkle tree (depth 20) on Soroban",
          "Groth16 proof verification on-chain using Stellar Protocol 25 BN254 host functions",
          "On-chain compliance policy registry and time-locked guardian recovery modules",
        ],
      },
    },
    {
      id: "anima",
      index: "09",
      title: "ANIMA",
      tagline: "Decentralized AI companion and user-owned memory.",
      description:
        "Decentralized AI companion with cryptographic, user-owned memory built on 0G Storage, Compute, and Chain — ensuring persistent, tamper-proof agent memory.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/ANIMA",
      techStack: ["0G Storage", "0G Compute", "0G Chain", "Solidity", "TypeScript", "React"],
      accentColor: "#8B5CF6",
      caseStudy: {
        problem:
          "Conventional AI companions store user conversations and long-term memory in centralized silos that users neither own nor cryptographically verify.",
        solution:
          "An AI companion architecture anchored on 0G Storage, Compute, and Chain so agent memories remain cryptographically owned by the user's wallet.",
        contribution: [
          "Application scaffold and wallet-authenticated session architecture on 0G Network",
          "Decentralized storage and compute integration design for persistent agent memory",
          "React and TypeScript client interface with on-chain ownership primitives",
        ],
      },
    },
    {
      id: "starsight",
      index: "10",
      title: "StarSight",
      tagline: "RWA decision support and risk analytics.",
      description:
        "Decision support and risk analytics platform for tokenized real-world assets (RWAs) built on Stellar.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/StarSight",
      techStack: ["Rust", "Soroban", "Stellar", "Next.js", "PostgreSQL", "Gemini", "Docker"],
      accentColor: "#F59E0B",
      caseStudy: {
        problem:
          "Evaluating performance and risk across tokenized real-world assets (RWAs) on Stellar requires combining on-chain market signals with automated analytical models.",
        solution:
          "A Stellar/Soroban RWA prediction and analytics platform pairing four Soroban contracts with a Rust event indexer and AI assessment daemon.",
        contribution: [
          "Four Soroban contracts: asset-registry, prediction-market, reputation, and rewards",
          "Rust AI agent daemon integrating Google Gemini to evaluate RWA market predictions",
          "Rust backend service providing an on-chain event indexer plus REST and WebSocket APIs",
        ],
      },
    },
    {
      id: "ARES",
      index: "11",
      title: "Ares Protocol",
      tagline: "Modular treasury management.",
      description:
        "Modular treasury management protocol designed to manage high-value vault assets and yield allocation strategies for autonomous organizations.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/ARES-TREASURY",
      techStack: ["Solidity", "Foundry", "OpenZeppelin", "EIP-712", "Merkle Trees"],
      accentColor: "#00E5FF",
      caseStudy: {
        problem:
          "Decentralized governance treasuries face systemic risks from monolithic execution paths, replay attacks, and unbounded capital outflows.",
        solution:
          "A modular execution vault enforcing strict lifecycle transitions (Created → Queued → Executable → Executed), cryptographic isolation, and epoch rate limits.",
        contribution: [
          "EIP-712 signed proposal validation with nonce tracking against signature replay",
          "AresTimelock queue deleting operation IDs prior to external calls to prevent reentrancy",
          "Rolling 7-day epoch outflow rate limit and proposal bond slash/refund mechanics",
        ],
      },
    },
    {
      id: "relaypay-stellar",
      index: "12",
      title: "RelayPay",
      tagline: "Stellar checkout infrastructure.",
      description:
        "A full-stack Stellar checkout starter and reusable React payment component with built-in wallet connection, transaction handling, and auto-settlement.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/RelayPay-Stellar",
      techStack: ["React", "TypeScript", "Express", "Stellar Horizon", "Soroban", "Rust"],
      accentColor: "#06B6D4",
      caseStudy: {
        problem:
          "Integrating Stellar wallet connections, payment intents, and on-chain confirmation into web checkouts requires repetitive boilerplate across frontend and backend.",
        solution:
          "A drop-in React checkout component (`RelayPayButton`) paired with an Express payment-intent API and a Soroban intent-tracking contract.",
        contribution: [
          "Reusable RelayPayButton React component with Stellar wallet connection and signing",
          "Payment intent REST API for creating, fetching, and confirming Stellar transactions",
          "Soroban contract scaffold implementing create_intent, mark_paid, and get_intent",
        ],
      },
    },
    {
      id: "foundry-diamonds",
      index: "13",
      title: "Foundry Diamonds",
      tagline: "EIP-2535 Diamonds framework.",
      description:
        "Production-ready EIP-2535 Diamonds framework for Foundry, featuring on-the-fly dynamic facet selector generation and Diamond Loupe test suites.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/Foundry-Diamonds",
      techStack: ["Solidity", "Foundry", "Hardhat", "EIP-2535", "Solidity FFI"],
      accentColor: "#EC4899",
      caseStudy: {
        problem:
          "Testing and scripting EIP-2535 Diamond upgrades typically requires manually maintaining brittle function-selector arrays across facets.",
        solution:
          "A Foundry-first EIP-2535 Diamonds framework that dynamically generates facet function selectors via `forge inspect` and FFI during tests and upgrades.",
        contribution: [
          "DiamondUtils library generating facet selectors dynamically via Foundry FFI",
          "DiamondUpgradeHelper constructing Add, Replace, and Remove facet cuts automatically",
          "Environment-driven DiamondUpgrade.s.sol deployment script and custom-error LibDiamond",
        ],
      },
    },
    {
      id: "monadrpg",
      index: "14",
      title: "MonadRPG",
      tagline: "Privacy-preserving reputation and identity.",
      description:
        "Production-grade, privacy-preserving reputation and identity system built on Monad with zero-knowledge proofs (Circom) and on-chain state.",
      category: "web3",
      githubUrl: "https://github.com/therealjhay/MonadRPG",
      techStack: ["Solidity", "Circom ZK", "TypeScript", "Rust", "Monad"],
      accentColor: "#8B5CF6",
      caseStudy: {
        problem:
          "On-chain games and reputation systems expose player progression and identity state publicly, enabling targeted front-running and sybil gaming.",
        solution:
          "A privacy-preserving reputation and progression protocol on Monad combining Circom zero-knowledge proofs with verifiable on-chain state commitments.",
        contribution: [
          "Solidity verifier and state commitment contracts deployed for the Monad execution environment",
          "Circom zero-knowledge circuits proving reputation thresholds without leaking raw attributes",
          "TypeScript and Rust client tooling for proof generation and on-chain submission",
        ],
      },
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

export const siteConfig = {
  name: siteContent.personalInfo.name,
  handle: siteContent.personalInfo.handle,
  role: siteContent.personalInfo.role,
  headline: siteContent.personalInfo.headline,
  supportingText: siteContent.personalInfo.supportingText,
  tagline: siteContent.personalInfo.bio,
  email: siteContent.personalInfo.email,
  githubUrl: siteContent.personalInfo.githubUrl,
  linkedinUrl: siteContent.personalInfo.linkedinUrl,
  location: siteContent.personalInfo.location,
  siteUrl: "https://therealjhay.tech",
  availabilityOpen: true,
  latestPinnedProject: siteContent.projects[0]?.title ?? "BettaPay",
  socialLinks: siteContent.socialLinks,
  nav: [
    { label: "About", href: "/#about", stageId: "about" },
    { label: "Projects", href: "/#projects", stageId: "projects" },
    { label: "Stack", href: "/#stack", stageId: "stack" },
    { label: "Writing", href: "/#writing", stageId: "writing" },
    { label: "Contact", href: "/#contact", stageId: "contact" },
  ],
  rotatingTitles: [
    siteContent.personalInfo.role,
    "Smart Contract Engineer",
    "Protocol & Full-Stack Builder",
  ],
} as const;

export type SiteConfig = typeof siteConfig;

export const projectCategories = ["All", "Smart Contracts", "Full-Stack"] as const;
export type ProjectCategory = (typeof projectCategories)[number];
