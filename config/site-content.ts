export type SocialLink = {
  name: string;
  url: string;
  icon: "github" | "twitter" | "linkedin" | "etherscan";
  handle: string;
};

export type RoleLens = "product" | "engineering" | "business";

export type PillarItem = {
  id: RoleLens;
  number: string;
  title: string;
  headline: string;
  summary: string;
  deliverables: string[];
  featuredProjectIds: string[];
};

export type ProjectItem = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  category: "ai-web" | "fintech-web3" | "commerce";
  lenses: RoleLens[];
  featured?: boolean;
  githubUrl: string;
  liveUrl?: string;
  frameUrl?: string;
  techStack: string[];
  productImpact: {
    opportunity: string;
    execution: string;
    businessValue: string;
    highlights: string[];
  };
};

export type ArticleItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  platform: string;
  tags: string[];
};

export type CapabilityGroup = {
  id: RoleLens;
  title: string;
  subtitle: string;
  skills: Array<{
    name: string;
    detail: string;
  }>;
};

export const siteContent = {
  personalInfo: {
    name: "Johnson Oyemade",
    handle: "JHAY",
    role: "Builder || AI Native Blockchain Engineer || Project Manager",
    headline:
      "I design, build, and ship products that solve real problems.",
    supportingText:
      "From shaping product direction and user workflows to engineering AI-powered web applications and on-chain settlement systems—I take ideas from zero to live production.",
    bio: "Builder, AI-native blockchain engineer, and project manager creating intelligent web applications, decentralized infrastructure, and scalable digital products.",
    location: "Lagos, Nigeria",
    email: "johnsonoca@gmail.com",
    githubUrl: "https://github.com/therealjhay",
    linkedinUrl: "https://linkedin.com/in/oyemade-johnson",
    about: [
      "I care as much about why a product exists and how people adopt it as I do about how the code is architected. A technically sound system only succeeds when the user experience is effortless and the business model makes sense.",
      "I work end-to-end across product discovery, full-stack & AI engineering, and go-to-market execution—turning complex problems in fintech, AI, and commerce into simple, reliable software.",
    ],
  },

  pillars: [
    {
      id: "product",
      number: "01",
      title: "Product & UX Strategy",
      headline: "Clarity from zero to one.",
      summary:
        "Translating market problems into clear product specs, intuitive user flows, and focused roadmaps so complex systems feel simple to use.",
      deliverables: [
        "Product discovery & scope definition",
        "UX architecture & conversion-focused flows",
        "Rapid MVP shipping & iteration",
        "End-to-end product ownership",
      ],
      featuredProjectIds: ["betta-pay", "capstone", "blue-scribe", "jdc-watches"],
    },
    {
      id: "engineering",
      number: "02",
      title: "AI & Full-Stack Engineering",
      headline: "Fast, production-grade software.",
      summary:
        "Shipping modern web platforms, AI workflows, and smart contracts using Next.js, TypeScript, Python, Gemini AI, Rust, Clarity, and Solidity.",
      deliverables: [
        "AI web apps & multi-agent workflows",
        "Next.js, TypeScript, Python & PostgreSQL",
        "Bitcoin L2 & payment settlement contracts",
        "Clean, responsive client interfaces",
      ],
      featuredProjectIds: ["capstone", "aegis-ai", "blue-scribe", "soul-srpg"],
    },
    {
      id: "business",
      number: "03",
      title: "Commercial & Growth Execution",
      headline: "Built for adoption and revenue.",
      summary:
        "Structuring merchant onboarding, B2B payment rails, conversational checkout channels, and developer tools that drive real traction.",
      deliverables: [
        "B2B & merchant payment workflows",
        "Checkout conversion & concierge sales",
        "Partner & ecosystem integration",
        "Clear product positioning & demos",
      ],
      featuredProjectIds: ["betta-pay", "capstone", "jdc-watches", "relaypay-stellar"],
    },
  ] satisfies PillarItem[],

  capabilityGroups: [
    {
      id: "product",
      title: "Product Management",
      subtitle: "Strategy, UX & Execution",
      skills: [
        {
          name: "Product Strategy & Roadmapping",
          detail: "Defining clear MVPs, user stories, and measurable milestones that align engineering with business goals.",
        },
        {
          name: "User Experience & Workflow Design",
          detail: "Simplifying complex AI, payment, and crypto interactions into intuitive consumer and B2B experiences.",
        },
        {
          name: "AI Product Design",
          detail: "Designing human-in-the-loop AI workflows, transcription studios, and multi-agent decision dashboards.",
        },
        {
          name: "Technical Product Specs",
          detail: "Writing actionable PRDs, API contracts, and system architectures that eliminate guesswork.",
        },
      ],
    },
    {
      id: "engineering",
      title: "AI-Native & Web Engineering",
      subtitle: "Full-Stack, AI & Smart Contracts",
      skills: [
        {
          name: "Next.js, React & TypeScript",
          detail: "Building fast, accessible, SEO-ready web applications and interactive client dashboards.",
        },
        {
          name: "AI & LLM Integration",
          detail: "Shipping applications powered by Google Gemini, multi-agent triage pipelines, and verifiable AI memory.",
        },
        {
          name: "Python, FastAPI, Django & PostgreSQL",
          detail: "Engineering reliable REST APIs, spatial databases (PostGIS), event indexers, and commerce backends.",
        },
        {
          name: "Smart Contracts (Clarity, Rust/Soroban & Solidity)",
          detail: "Developing Bitcoin L2 launchpads, non-custodial payment settlement, treasury vaults, and zero-knowledge verification systems.",
        },
      ],
    },
    {
      id: "business",
      title: "Business Development & Growth",
      subtitle: "Distribution, Partnerships & Revenue",
      skills: [
        {
          name: "Merchant & B2B Solutions",
          detail: "Structuring cross-border payment rails, programmable fee splits, and enterprise settlement workflows.",
        },
        {
          name: "Go-To-Market & Product Storytelling",
          detail: "Crafting clear positioning, technical breakdowns, and live product demonstrations that convert stakeholders.",
        },
        {
          name: "Conversion & Concierge Commerce",
          detail: "Designing high-touch WhatsApp concierge checkouts and drop-in payment widgets that reduce drop-off.",
        },
        {
          name: "Ecosystem & Partner Relations",
          detail: "Collaborating across developer ecosystems, payment anchors, and startup teams to expand product reach.",
        },
      ],
    },
  ] satisfies CapabilityGroup[],

  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/therealjhay",
      icon: "github",
      handle: "@therealjhay",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/oyemade-johnson",
      icon: "linkedin",
      handle: "oyemade-johnson",
    },
    {
      name: "X / Twitter",
      url: "https://x.com/0xjhay",
      icon: "twitter",
      handle: "@0xjhay",
    },
    {
      name: "Etherscan",
      url: "https://etherscan.io/address/0x611885e1907E469cCb2E3AA154c2076A1458a33B",
      icon: "etherscan",
      handle: "0x6118…a33B",
    },
  ] satisfies SocialLink[],

  skills: {
    web3: [
      "Clarity (Stacks / Bitcoin)",
      "Solidity & Foundry",
      "Stellar / Soroban",
      "SIP-009 & ERC Standards",
      "Product Strategy & Roadmapping",
      "Zero-Knowledge (Noir, Circom)",
    ],
    frontend: [
      "Next.js",
      "React",
      "TypeScript",
      "AI / Gemini Integration",
      "Tailwind CSS",
    ],
    backend: [
      "Python",
      "FastAPI",
      "Django REST",
      "Node.js",
      "PostgreSQL / PostGIS",
      "Docker",
    ],
  },

  projects: [
    // --- 7 LIVE DEPLOYED PRODUCTS ---
    {
      id: "betta-pay",
      index: "01",
      title: "BettaPay",
      tagline: "Cross-border merchant payment & settlement platform",
      description:
        "Enterprise payment infrastructure built on Stellar to help African merchants accept payments and automate multi-party revenue splits without custodial lock-in.",
      category: "fintech-web3",
      lenses: ["product", "engineering", "business"],
      featured: true,
      githubUrl: "https://github.com/Betta-Pay/BettaPay-Contract",
      liveUrl: "https://bettapay-tech.vercel.app/",
      frameUrl: "/api/preview?url=https://bettapay-tech.vercel.app/",
      techStack: ["Product Strategy", "Rust", "Stellar / Soroban", "TypeScript", "B2B Payments"],
      productImpact: {
        opportunity:
          "Merchants and payment aggregators across Africa face high cross-border settlement fees, slow payouts, and rigid revenue-split rules.",
        execution:
          "Designed and built a non-custodial settlement system with automated fee splitting, payment reference tracking, and a 4-tier fallback rule engine.",
        businessValue:
          "Enables instant, transparent B2B merchant settlement with configurable platform fees and anchor interoperability.",
        highlights: [
          "Merchant registration and automated basis-point fee splitting",
          "4-tier settlement rule resolution for custom merchant and asset tiers",
          "Timelocked governance registry for safe partner and fee updates",
        ],
      },
    },
    {
      id: "capstone",
      index: "02",
      title: "Capstone",
      tagline: "NFT launchpad & creator studio anchored to Bitcoin via Stacks",
      description:
        "A launchpad and studio for non-fungible tokens on Stacks. Features 1-transaction drops, direct creator treasury settlement, post-condition spend guarantees, and algorithmic vector artwork.",
      category: "fintech-web3",
      lenses: ["product", "engineering", "business"],
      featured: true,
      githubUrl: "https://github.com/therealjhay/Capstone",
      liveUrl: "https://capstone-stx.vercel.app/",
      techStack: ["Clarity 6", "Stacks / Bitcoin", "SIP-009", "Next.js", "TypeScript", "Tailwind CSS"],
      productImpact: {
        opportunity:
          "Traditional NFT launchpads lock creators into custodial intermediaries, complex multi-step deployments, and opaque spending mechanisms.",
        execution:
          "Architected a Clarity smart contract (capstone-launchpad-v2) for 1-call drop configuration and zero-custody minting directly into the creator's vault with Stacks post-condition spend enforcement. Built an archival editorial frontend with live procedural token previews and real-time treasury telemetry.",
        businessValue:
          "Eliminates platform custody risks and deployment friction, allowing creators to launch drops in one transaction with guaranteed Bitcoin settlement and zero intermediary fees.",
        highlights: [
          "1-transaction drop configuration and direct creator treasury settlement",
          "Stacks post-condition spend guarantees asserting exact micro-STX transfers",
          "Algorithmic geometric vector art preview engine keyed to token IDs",
          "SIP-009 compliant Clarity contract deployed to Stacks Testnet",
          "Dual-state creator studio with live sales telemetry and one-click withdrawals",
        ],
      },
    },
    {
      id: "aegis-ai",
      index: "03",
      title: "Aegis AI",
      tagline: "AI-powered geospatial disaster triage & relief coordination",
      description:
        "A real-time operations platform that helps humanitarian NGOs verify field reports using a 4-agent AI quorum and coordinate faster emergency relief.",
      category: "ai-web",
      lenses: ["product", "engineering"],
      featured: true,
      githubUrl: "https://github.com/therealjhay/AegisAI",
      liveUrl: "https://aegiswarm.vercel.app",
      techStack: ["AI Agents", "Next.js", "Python / FastAPI", "Mapbox GL", "PostGIS"],
      productImpact: {
        opportunity:
          "During disasters, NGOs are overwhelmed by duplicate or unverified field reports, slowing down life-saving relief funding.",
        execution:
          "Built a geospatial command dashboard pairing PostGIS clustering with a 4-agent AI verification pipeline (Triangulator, Fact-Checker, Triage Evaluator, Risk Governor).",
        businessValue:
          "Cuts signal-to-noise time for response teams and creates an auditable trail for relief fund disbursement.",
        highlights: [
          "Spatiotemporal clustering of incoming emergency reports in PostGIS",
          "Multi-agent AI verification quorum scoring urgency and credibility",
          "Interactive Mapbox GL operations dashboard with signed audit trails",
        ],
      },
    },
    {
      id: "blue-scribe",
      index: "04",
      title: "Scribe",
      tagline: "AI audio transcription studio powered by Gemini 2.5 Flash",
      description:
        "A clean, fast web application that turns multi-speaker meetings and interviews into structured, searchable transcripts with speaker detection.",
      category: "ai-web",
      lenses: ["product", "engineering"],
      featured: true,
      githubUrl: "https://github.com/therealjhay/Scribe",
      liveUrl: "https://blue-scribe.vercel.app",
      techStack: ["Gemini 2.5 AI", "Next.js", "TypeScript", "Product UX", "Tailwind CSS"],
      productImpact: {
        opportunity:
          "Teams waste hours reviewing raw audio recordings from customer discovery calls, interviews, and meetings.",
        execution:
          "Created a zero-friction transcription studio using Google Gemini 2.5 Flash with automatic speaker diarization, multi-format upload, and instant search.",
        businessValue:
          "Turns unstructured voice conversations into actionable product notes and shareable documentation in seconds.",
        highlights: [
          "Multi-format audio ingestion pipeline in Next.js and TypeScript",
          "Gemini 2.5 Flash integration for speaker detection and timestamps",
          "Clean reader interface with keyword search and transcript export",
        ],
      },
    },
    {
      id: "jdc-watches",
      index: "05",
      title: "JDC Luxury Watches",
      tagline: "High-touch luxury e-commerce with WhatsApp concierge checkout",
      description:
        "A full-stack luxury retail platform designed around how high-ticket buyers actually shop—combining fast catalog discovery with personalized WhatsApp closing.",
      category: "commerce",
      lenses: ["product", "engineering", "business"],
      featured: true,
      githubUrl: "https://github.com/therealjhay/JDC",
      liveUrl: "https://jdcwatches.vercel.app",
      techStack: ["Next.js", "Django REST", "PostgreSQL", "Conversion UX", "WhatsApp Commerce"],
      productImpact: {
        opportunity:
          "High-value watch buyers rarely complete cold cart checkouts without speaking to a trusted advisor first.",
        execution:
          "Built a Next.js storefront and Django REST inventory backend that routes selected watch variants directly into pre-filled WhatsApp concierge threads.",
        businessValue:
          "Bridges self-serve browsing with high-conversion conversational sales and streamlined inventory management.",
        highlights: [
          "Fast catalog filtering, variant selection, and automated WhatsApp order builder",
          "Django REST Framework and PostgreSQL backend for product & order tracking",
          "Admin operations dashboard with multi-image Cloudinary uploads",
        ],
      },
    },
    {
      id: "soul-srpg",
      index: "06",
      title: "SOUL Protocol",
      tagline: "Portable digital identity & reputation passport",
      description:
        "A full-stack reputation platform that aggregates user credentials and attestations into a verifiable digital passport.",
      category: "fintech-web3",
      lenses: ["product", "engineering"],
      featured: true,
      githubUrl: "https://github.com/therealjhay/Soul",
      liveUrl: "https://soul-srgp.vercel.app",
      techStack: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Rust", "Zero-Knowledge"],
      productImpact: {
        opportunity:
          "Digital communities and platforms struggle to verify user credibility without forcing invasive identity checks.",
        execution:
          "Combined on-chain credential anchors, a NestJS/PostgreSQL indexer, and zero-knowledge threshold proofs behind a clean web portal.",
        businessValue:
          "Gives platforms sybil-resistant user verification while preserving user privacy.",
        highlights: [
          "End-to-end web portal for viewing credentials and reputation scores",
          "TypeScript event indexer syncing activity into PostgreSQL",
          "Zero-knowledge threshold proofs for privacy-preserving verification",
        ],
      },
    },
    {
      id: "invincible-token",
      index: "07",
      title: "Invincible Token & Faucet",
      tagline: "Self-serve token distribution portal & testnet faucet",
      description:
        "An interactive web portal and rate-limited distribution system that lets developers and testers claim tokens seamlessly.",
      category: "fintech-web3",
      lenses: ["engineering", "product"],
      featured: true,
      githubUrl: "https://github.com/therealjhay/INVINCIBLE",
      liveUrl: "https://invincible-flax.vercel.app",
      techStack: ["React", "TypeScript", "Solidity", "OpenZeppelin"],
      productImpact: {
        opportunity:
          "Developer ecosystems need frictionless, abuse-resistant onboarding faucets so builders can test applications immediately.",
        execution:
          "Shipped a capped ERC-20 token with an automated 24-hour cooldown faucet and a clean React claiming dashboard.",
        businessValue:
          "Improves developer onboarding speed while preventing automated faucet draining.",
        highlights: [
          "10M capped token supply with 24-hour per-user cooldown enforcement",
          "Clean React interface for one-click wallet connection and claiming",
          "Automated test suite covering rate limits and supply rules",
        ],
      },
    },

    // --- 8 ADDITIONAL PRODUCT, AI & PROTOCOL SYSTEMS ---
    {
      id: "preflight",
      index: "08",
      title: "PreFlight",
      tagline: "Human-readable transaction safety & risk intelligence",
      description:
        "Simulates blockchain transactions before signing and translates complex hex payloads into plain-English risk warnings.",
      category: "fintech-web3",
      lenses: ["product", "engineering"],
      githubUrl: "https://github.com/therealjhay/PreFlight",
      techStack: ["Product UX", "TypeScript", "React", "Fastify", "Solidity"],
      productImpact: {
        opportunity:
          "Everyday users lose funds because wallets show unreadable hexadecimal data instead of clear transaction outcomes.",
        execution:
          "Built a pre-signing simulation API, browser extension, and SDK that scores transaction risk and explains balance changes in plain language.",
        businessValue:
          "Increases user trust and prevents costly signing mistakes across consumer Web3 apps.",
        highlights: [
          "Plain-English transaction outcome explanations and 0–100 risk scoring",
          "Chrome Manifest V3 extension and developer SDK (@preflight/sdk)",
          "On-chain address reputation registry",
        ],
      },
    },
    {
      id: "relaypay-stellar",
      index: "09",
      title: "RelayPay",
      tagline: "Drop-in checkout widget & payment-intent API",
      description:
        "A plug-and-play React checkout button and Express API that lets businesses accept Stellar payments in minutes.",
      category: "fintech-web3",
      lenses: ["product", "engineering", "business"],
      githubUrl: "https://github.com/therealjhay/RelayPay-Stellar",
      techStack: ["React SDK", "TypeScript", "Express", "Stellar", "Developer Experience"],
      productImpact: {
        opportunity:
          "Businesses want to accept digital currency payments without spending weeks building custom wallet and settlement flows.",
        execution:
          "Packaged wallet connection, payment intent tracking, and settlement confirmation into a single reusable `<RelayPayButton />` component.",
        businessValue:
          "Drastically reduces merchant integration time and improves checkout conversion.",
        highlights: [
          "Drop-in React checkout component with built-in status feedback",
          "REST API for creating and verifying payment intents",
          "Automated on-chain settlement verification",
        ],
      },
    },
    {
      id: "starsight",
      index: "10",
      title: "StarSight",
      tagline: "AI risk analytics & decision support for tokenized assets",
      description:
        "Combines Google Gemini AI with on-chain market signals to evaluate risk and performance across tokenized real-world assets (RWAs).",
      category: "ai-web",
      lenses: ["product", "engineering", "business"],
      githubUrl: "https://github.com/therealjhay/StarSight",
      techStack: ["Gemini AI", "Next.js", "Rust", "PostgreSQL", "RWA Analytics"],
      productImpact: {
        opportunity:
          "Investors and asset managers lack clear decision-support tools when evaluating tokenized real-world assets.",
        execution:
          "Paired four smart contracts with a Rust event indexer and a Gemini AI evaluation service streaming insights via REST and WebSockets.",
        businessValue:
          "Bridges institutional risk analysis with live on-chain asset data.",
        highlights: [
          "AI evaluation daemon powered by Google Gemini",
          "Real-time event indexer backed by PostgreSQL",
          "Modular asset registry and prediction market contracts",
        ],
      },
    },
    {
      id: "anima",
      index: "11",
      title: "ANIMA",
      tagline: "AI companion with user-owned persistent memory",
      description:
        "An AI companion application where long-term conversational memory is owned and controlled by the user rather than locked in a central server.",
      category: "ai-web",
      lenses: ["product", "engineering"],
      githubUrl: "https://github.com/therealjhay/ANIMA",
      techStack: ["AI Memory", "React", "TypeScript", "0G Network", "Solidity"],
      productImpact: {
        opportunity:
          "Users build deep context with AI assistants but have zero ownership or portability over their long-term memory.",
        execution:
          "Designed a wallet-authenticated AI companion interface backed by decentralized storage and compute.",
        businessValue:
          "Pioneers portable, user-owned context for next-generation AI consumer products.",
        highlights: [
          "User-owned persistent memory architecture on 0G Storage & Compute",
          "Clean React & TypeScript conversational interface",
          "Cryptographic session and memory ownership controls",
        ],
      },
    },
    {
      id: "verivault",
      index: "12",
      title: "VeriVault",
      tagline: "Compliant financial privacy & selective disclosure",
      description:
        "Allows businesses and users to keep transaction amounts private while selectively proving regulatory compliance to auditors.",
      category: "fintech-web3",
      lenses: ["engineering", "business"],
      githubUrl: "https://github.com/therealjhay/VeriVault",
      techStack: ["Rust", "Soroban", "Noir ZK", "Compliance Tech"],
      productImpact: {
        opportunity:
          "Enterprises cannot put payroll or treasury flows on public rails if competitors can see every transaction, yet regulators require auditability.",
        execution:
          "Built a zero-knowledge privacy vault using Noir circuits and Stellar Protocol 25 with scoped compliance viewing policies.",
        businessValue:
          "Unlocks institutional adoption by combining confidentiality with regulatory compliance.",
        highlights: [
          "Selective regulatory disclosure via zero-knowledge proofs",
          "Incremental Merkle commitment storage in Rust",
          "Time-locked guardian account recovery for enterprise safety",
        ],
      },
    },
    {
      id: "ARES",
      index: "13",
      title: "Ares Protocol",
      tagline: "Institutional-grade treasury management & spending controls",
      description:
        "A treasury vault system with multi-stage approval workflows, timelocks, and rolling 7-day spending limits.",
      category: "fintech-web3",
      lenses: ["engineering", "business"],
      githubUrl: "https://github.com/therealjhay/ARES-TREASURY",
      techStack: ["Solidity", "Foundry", "EIP-712", "Treasury Ops"],
      productImpact: {
        opportunity:
          "Organizations managing shared capital need strict spending limits and approval queues to prevent unauthorized outflows.",
        execution:
          "Engineered a 4-stage treasury execution vault with off-chain typed signatures, timelocks, and automated weekly rate caps.",
        businessValue:
          "Protects organizational funds with clear governance and operational guardrails.",
        highlights: [
          "4-stage proposal lifecycle (Created → Queued → Executable → Executed)",
          "Rolling 7-day outflow rate limits",
          "EIP-712 replay-protected signature verification",
        ],
      },
    },
    {
      id: "foundry-diamonds",
      index: "14",
      title: "Foundry Diamonds",
      tagline: "Developer framework for modular, upgradeable smart contracts",
      description:
        "An open-source developer toolkit that automates function routing and upgrades for modular EIP-2535 Diamond smart contracts.",
      category: "fintech-web3",
      lenses: ["engineering"],
      githubUrl: "https://github.com/therealjhay/Foundry-Diamonds",
      techStack: ["Solidity", "Foundry", "EIP-2535", "Developer Tooling"],
      productImpact: {
        opportunity:
          "Engineering teams waste time manually maintaining selector arrays when upgrading large modular smart contract systems.",
        execution:
          "Created a Foundry library that automatically extracts selectors and builds safe upgrade scripts.",
        businessValue:
          "Speeds up engineering release cycles and reduces human error during protocol upgrades.",
        highlights: [
          "Automated facet selector generation via Foundry FFI",
          "One-command Add, Replace, and Remove upgrade helpers",
          "Comprehensive Loupe & upgrade verification test suite",
        ],
      },
    },
    {
      id: "monadrpg",
      index: "15",
      title: "MonadRPG",
      tagline: "Verifiable user progression & privacy-preserving credentials",
      description:
        "A progression and achievement system that lets users prove milestones without exposing underlying private state.",
      category: "fintech-web3",
      lenses: ["engineering", "product"],
      githubUrl: "https://github.com/therealjhay/MonadRPG",
      techStack: ["TypeScript", "Solidity", "Circom ZK", "Rust", "Monad"],
      productImpact: {
        opportunity:
          "Interactive platforms and games need verifiable user achievements without exposing raw user activity to competitors or bots.",
        execution:
          "Built zero-knowledge progression circuits paired with high-throughput state verification on Monad.",
        businessValue:
          "Enables fair, bot-resistant loyalty and progression mechanics.",
        highlights: [
          "Zero-knowledge milestone verification circuits",
          "TypeScript & Rust client tooling for proof generation",
          "High-speed state commitment contracts on Monad",
        ],
      },
    },
  ] satisfies ProjectItem[],

  articles: [
    {
      id: "ares-protocol-breakdown",
      title: "A Technical Breakdown of ARES Protocol",
      description:
        "How modular treasury vaults and spending guardrails solve organizational capital risk.",
      url: "https://substack.com/@therealjhay/note/p-190595895?r=6p9kb&utm_source=notes-share-action&utm_medium=web",
      platform: "Substack",
      tags: ["Product Architecture", "Treasury", "Smart Contracts"],
    },
    {
      id: "eip-6963-wallet-war",
      title: "The End of the “Wallet War”: A Deep Dive into EIP-6963",
      description:
        "How multi-provider discovery fixes one of the biggest onboarding drop-offs in Web3 UX.",
      url: "https://substack.com/@therealjhay/note/p-187071784?r=6p9kb&utm_source=notes-share-action&utm_medium=web",
      platform: "Substack",
      tags: ["Product UX", "Onboarding", "Web3"],
    },
    {
      id: "solidity-inheritance",
      title: "Understanding Solidity Inheritance",
      description:
        "Practical patterns for structuring clean, maintainable, and upgrade-safe contract systems.",
      url: "https://substack.com/@therealjhay/note/p-187978176?r=6p9kb&utm_source=notes-share-action&utm_medium=web",
      platform: "Substack",
      tags: ["Engineering", "Architecture"],
    },
    {
      id: "react-hooks-practical-guide",
      title: "React Hooks: A Practical Guide to useState, useEffect, and Beyond",
      description:
        "A clear, practical walkthrough of state management and side effects in modern React applications.",
      url: "https://0xjhay.hashnode.dev/react-hooks-a-practical-guide-to-usestate-useeffect-and-beyond",
      platform: "Hashnode",
      tags: ["Frontend", "React", "Web Development"],
    },
  ] satisfies ArticleItem[],
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
  latestPinnedProject: "BettaPay",
  socialLinks: siteContent.socialLinks,
  nav: [
    { label: "Work", href: "/#projects", stageId: "projects" },
    { label: "How I Work", href: "/#about", stageId: "about" },
    { label: "Capabilities", href: "/#stack", stageId: "stack" },
    { label: "Writing", href: "/#writing", stageId: "writing" },
    { label: "Contact", href: "/#contact", stageId: "contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
