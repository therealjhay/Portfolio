"use client";

import { Play, ShieldAlert, ShieldCheck, Terminal as TerminalIcon, Zap } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { siteConfig, siteContent } from "@/config/site-content";
import { openProject, pulseScene, scrollToTarget } from "@/components/experience/store";
import { cn } from "@/lib/utils";

type HistoryEntry = {
  id: number;
  command: string;
  output: React.ReactNode;
};

type SimulationScenario = {
  id: string;
  label: string;
  contract: string;
  selector: string;
  calldata: string;
  gasEstimate: string;
  riskScore: number;
  verdict: "SAFE" | "CAUTION" | "CRITICAL";
  stateDiff: string[];
  explanation: string;
};

const SCENARIOS: SimulationScenario[] = [
  {
    id: "ares-queue",
    label: "AresTimelock.queueProposal()",
    contract: "0xAres…7120 (Ares Treasury Vault)",
    selector: "0x3a66f901",
    calldata:
      "0x3a66f901000000000000000000000000611885e1907e469ccb2e3aa154c2076a1458a33b0000000000000000000000000000000000000000000000001bc16d674ec80000",
    gasEstimate: "94,210 gas",
    riskScore: 12,
    verdict: "SAFE",
    stateDiff: [
      "proposals[opId].state: None → Queued",
      "epochOutflow: +2.0 ETH (within 5% 7-day cap)",
      "nonce[proposer]: 14 → 15 (EIP-712 verified)",
    ],
    explanation:
      "EIP-712 signature valid. Outflow respects the rolling 7-day 5% epoch limit and enters the mandatory timelock queue.",
  },
  {
    id: "verivault-zk",
    label: "VeriVault.verifyDisclosure()",
    contract: "CDLZ…VVAULT (Soroban Protocol 25)",
    selector: "fn verify_disclosure(proof, root, nullifier)",
    calldata:
      "bn254_g1_add + bn254_multi_pairing_check(vk_alpha, proof_a, proof_b, poseidon2_root)",
    gasEstimate: "1,420,000 CPU insns",
    riskScore: 8,
    verdict: "SAFE",
    stateDiff: [
      "merkle_root (depth 20): verified against state",
      "nullifiers[0x9f2a…]: false → true",
      "compliance_attestation: KYC_TIER_1 proven (zero identity leaked)",
    ],
    explanation:
      "Groth16 Noir proof verified via Stellar Protocol 25 BN254 pairing host functions. Nullifier recorded; no PII exposed.",
  },
  {
    id: "unlimited-approval",
    label: "ERC20.approve(MAX_UINT256)",
    contract: "0xUnverified…889a (Unverified Router)",
    selector: "0x095ea7b3",
    calldata:
      "0x095ea7b3000000000000000000000000unverified00889affffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    gasEstimate: "46,104 gas",
    riskScore: 94,
    verdict: "CRITICAL",
    stateDiff: [
      "allowance[user][0xUnverified…889a]: 0 → 2^256 - 1 (UNBOUNDED)",
      "PreflightRegistry flag: UNVERIFIED_SPENDER_CONTRACT",
    ],
    explanation:
      "PreFlight Alert: Transaction grants unlimited token allowance to an unverified contract deployed < 24h ago. Signing blocked recommended.",
  },
];

const QUICK_COMMANDS = [
  "help",
  "about",
  "projects",
  "stack",
  "contact",
  "github",
  "clear",
] as const;

export function TerminalPlayground() {
  const [input, setInput] = useState("");
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>(
    SCENARIOS[0],
  );
  const [simulating, setSimulating] = useState(false);
  const [simCount, setSimCount] = useState(1);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: 1,
      command: "init --session jhay-playground",
      output: (
        <div className="space-y-1 text-muted-foreground">
          <p className="text-primary">
            JHAY Engineering Shell v2.4 · Connected to Interactive Node Lattice
          </p>
          <p>
            Type <span className="text-foreground">help</span> or click any
            command chip below to inspect systems, stack, or contact channels.
          </p>
        </div>
      ),
    },
  ]);

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    const cmd = trimmed.toLowerCase();
    pulseScene(0.9);

    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    let output: React.ReactNode;

    if (cmd === "help") {
      output = (
        <div className="grid gap-1 text-xs">
          <p className="text-primary font-bold">Available commands:</p>
          <p>
            <span className="text-foreground">about</span> — Engineer bio &amp;
            architectural philosophy
          </p>
          <p>
            <span className="text-foreground">projects</span> — List deployed
            systems (click any to open 3D dossier)
          </p>
          <p>
            <span className="text-foreground">stack</span> — Display
            engineering capability clusters
          </p>
          <p>
            <span className="text-foreground">contact</span> — Direct email
            &amp; verified social links
          </p>
          <p>
            <span className="text-foreground">github</span> — Open GitHub
            profile (@therealjhay)
          </p>
          <p>
            <span className="text-foreground">clear</span> — Reset terminal
            buffer
          </p>
        </div>
      );
    } else if (cmd === "about") {
      output = (
        <div className="space-y-1.5 text-xs">
          <p className="text-primary font-bold">
            {siteConfig.name} ({siteConfig.handle}) — {siteConfig.role}
          </p>
          {siteContent.personalInfo.about.map((p) => (
            <p key={p} className="text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      );
    } else if (cmd === "projects") {
      output = (
        <div className="space-y-2 text-xs">
          <p className="text-primary font-bold">
            Indexed Systems ({siteContent.projects.length}) — click to open case
            study:
          </p>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {siteContent.projects.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => openProject(p.id)}
                className="flex items-center justify-between border border-border/60 bg-background/60 px-2.5 py-1.5 text-left transition-colors hover:border-primary hover:text-primary"
              >
                <span>
                  <span className="text-muted-foreground mr-1.5">
                    [{p.index}]
                  </span>
                  <span className="font-bold text-foreground">{p.title}</span>
                </span>
                <span className="text-[10px] text-primary">open →</span>
              </button>
            ))}
          </div>
        </div>
      );
    } else if (cmd === "stack") {
      output = (
        <div className="space-y-1.5 text-xs">
          {siteContent.skillClusters.map((c) => (
            <p key={c.id}>
              <span className="text-primary font-bold">{c.title}:</span>{" "}
              <span className="text-muted-foreground">
                {c.skills.join(" · ")}
              </span>
            </p>
          ))}
        </div>
      );
    } else if (cmd === "contact") {
      output = (
        <div className="space-y-1 text-xs">
          <p>
            Email:{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-primary underline"
            >
              {siteConfig.email}
            </a>
          </p>
          <p>
            GitHub:{" "}
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              {siteConfig.githubUrl}
            </a>
          </p>
          <p>
            LinkedIn:{" "}
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              {siteConfig.linkedinUrl}
            </a>
          </p>
        </div>
      );
    } else if (cmd === "github") {
      window.open(siteConfig.githubUrl, "_blank", "noopener,noreferrer");
      output = (
        <p className="text-xs text-primary">
          ↗ Opening {siteConfig.githubUrl} in a new tab...
        </p>
      );
    } else {
      output = (
        <p className="text-xs text-muted-foreground">
          Unknown command: <span className="text-foreground">{trimmed}</span>.
          Type <span className="text-primary">help</span> for available
          commands.
        </p>
      );
    }

    setHistory((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), command: trimmed, output },
    ]);

    setTimeout(() => {
      const el = logContainerRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, 30);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    runCommand(input);
    setInput("");
  };

  const handleRunSimulation = (scenario: SimulationScenario) => {
    setSelectedScenario(scenario);
    setSimulating(true);
    pulseScene(1.85);
    setTimeout(() => {
      setSimulating(false);
      setSimCount((c) => c + 1);
    }, 280);
  };

  return (
    <section
      id="lab"
      className="relative z-10 border-b border-border/50 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 border border-border/80 bg-background/70 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
              <TerminalIcon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>04 // Interactive Terminal &amp; Protocol Sandbox</span>
            </div>
            <h2 className="mt-4 font-mono text-3xl font-bold tracking-tight sm:text-5xl">
              Query the Shell.{" "}
              <span className="text-primary">Simulate Calldata.</span>
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs leading-relaxed text-muted-foreground">
            Run commands in the JHAY shell or test pre-signing transaction
            simulation inspired by PreFlight and Ares Protocol.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Left Panel: Interactive Terminal */}
          <div className="flex flex-col border border-border/90 bg-card/90 backdrop-blur-md">
            {/* Window Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="font-bold text-foreground">
                  jhay@playground: ~/systems
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground">
                zsh · interactive
              </span>
            </div>

            {/* Quick Command Bar */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-border/70 bg-background/60 px-4 py-2.5">
              <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Exec:
              </span>
              {QUICK_COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => runCommand(cmd)}
                  className="border border-border bg-card px-2.5 py-1 font-mono text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Log Output */}
            <div
              ref={logContainerRef}
              className="h-80 space-y-4 overflow-y-auto p-4 font-mono text-xs"
            >
              {history.map((item) => (
                <div key={item.id} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-primary">
                    <span>❯</span>
                    <span className="font-bold text-foreground">
                      {item.command}
                    </span>
                  </div>
                  <div className="pl-4">{item.output}</div>
                </div>
              ))}
            </div>

            {/* Command Input Form */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center border-t border-border bg-background/90 px-4 py-2.5 font-mono text-xs"
            >
              <span className="mr-2 text-primary font-bold">
                jhay@playground:~$
              </span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a command (help, about, projects, stack, contact, github)..."
                aria-label="Terminal command input"
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="ml-2 border border-primary/50 bg-primary/10 px-3 py-1 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Run
              </button>
            </form>
          </div>

          {/* Right Panel: Interactive Transaction Intelligence Sandbox */}
          <div className="flex flex-col justify-between border border-border/90 bg-card/90 p-5 backdrop-blur-md sm:p-6">
            <div>
              <div className="flex items-center justify-between border-b border-border/80 pb-3.5 font-mono text-xs">
                <span className="flex items-center gap-2 font-bold text-primary">
                  <Zap className="h-4 w-4" aria-hidden="true" />
                  <span>PREFLIGHT // CALLDATA SANDBOX</span>
                </span>
                <span className="text-muted-foreground">
                  SIM #{simCount.toString().padStart(3, "0")}
                </span>
              </div>

              <p className="mt-3 font-mono text-xs text-muted-foreground">
                Select an on-chain transaction payload to decode calldata,
                evaluate vault invariants, and compute pre-sign risk:
              </p>

              {/* Payload Selector Tabs */}
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {SCENARIOS.map((scenario) => {
                  const active = selectedScenario.id === scenario.id;
                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      onClick={() => handleRunSimulation(scenario)}
                      className={cn(
                        "flex items-center justify-between border px-3 py-2 text-left font-mono text-xs transition-all",
                        active
                          ? "border-primary bg-primary/15 text-primary font-bold"
                          : "border-border bg-background/70 text-muted-foreground hover:border-primary/50 hover:text-foreground",
                      )}
                    >
                      <span className="truncate">{scenario.label}</span>
                      <Play className="ml-1 h-3 w-3 shrink-0" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>

              {/* Raw Calldata & Target Box */}
              <div className="mt-4 space-y-2 border border-border/80 bg-background/75 p-3.5 font-mono text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
                  <span>TARGET: {selectedScenario.contract}</span>
                  <span>EST: {selectedScenario.gasEstimate}</span>
                </div>
                <p className="break-all text-[11px] leading-relaxed text-foreground/85">
                  {selectedScenario.calldata}
                </p>
              </div>

              {/* Simulation Verdict & State Diff */}
              <div
                className={cn(
                  "mt-4 border p-4 font-mono text-xs transition-opacity duration-200",
                  simulating ? "opacity-50" : "opacity-100",
                  selectedScenario.verdict === "CRITICAL"
                    ? "border-destructive/70 bg-destructive/10"
                    : "border-primary/50 bg-primary/5",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-bold">
                    {selectedScenario.verdict === "CRITICAL" ? (
                      <ShieldAlert className="h-4 w-4 text-destructive" />
                    ) : (
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    )}
                    <span
                      className={
                        selectedScenario.verdict === "CRITICAL"
                          ? "text-destructive"
                          : "text-primary"
                      }
                    >
                      VERDICT: {selectedScenario.verdict} (RISK SCORE:{" "}
                      {selectedScenario.riskScore}/100)
                    </span>
                  </span>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-foreground/90">
                  {selectedScenario.explanation}
                </p>

                <div className="mt-3 space-y-1 border-t border-border/60 pt-2.5 text-[11px] text-muted-foreground">
                  <p className="uppercase tracking-wider text-foreground">
                    Simulated State Changes:
                  </p>
                  {selectedScenario.stateDiff.map((diff) => (
                    <p key={diff}>• {diff}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3 font-mono text-[11px] text-muted-foreground">
              <span>Powered by PreFlight &amp; Ares Vault rules</span>
              <button
                type="button"
                onClick={() => {
                  scrollToTarget("#projects");
                  openProject("preflight");
                }}
                className="text-primary underline hover:text-foreground"
              >
                Inspect PreFlight Architecture →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
