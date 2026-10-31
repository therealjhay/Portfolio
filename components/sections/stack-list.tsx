"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Network } from "lucide-react";
import { useMemo, useState } from "react";
import { siteContent } from "@/config/site-content";
import { openProject, pulseScene } from "@/components/experience/store";
import { cn } from "@/lib/utils";

export function StackList() {
  const shouldReduceMotion = useReducedMotion();
  const clusters = siteContent.skillClusters;
  const [activeClusterIndex, setActiveClusterIndex] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const activeCluster = clusters[activeClusterIndex] ?? clusters[0];

  // Match projects that use either the selected skill or any skill in the active cluster
  const relatedProjects = useMemo(() => {
    const query = (selectedSkill ?? "").toLowerCase();
    return siteContent.projects.filter((project) => {
      if (query) {
        return project.techStack.some(
          (t) =>
            t.toLowerCase().includes(query) || query.includes(t.toLowerCase()),
        );
      }
      return project.techStack.some((t) =>
        activeCluster.skills.some(
          (s) =>
            t.toLowerCase().includes(s.toLowerCase()) ||
            s.toLowerCase().includes(t.toLowerCase()),
        ),
      );
    });
  }, [activeCluster, selectedSkill]);

  const handleSelectCluster = (idx: number) => {
    setActiveClusterIndex(idx);
    setSelectedSkill(null);
    pulseScene(0.85);
  };

  return (
    <section
      id="stack"
      className="relative z-10 border-b border-border/50 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 border border-border/80 bg-background/70 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
              <Network className="h-3.5 w-3.5" aria-hidden="true" />
              <span>03 // Interconnected Capability Clusters</span>
            </div>
            <h2 className="mt-4 font-mono text-3xl font-bold tracking-tight sm:text-5xl">
              The Technical <span className="text-primary">Architecture.</span>
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs leading-relaxed text-muted-foreground">
            Select any capability cluster or individual technology node to trace
            how it connects across my deployed protocols and full-stack systems.
          </p>
        </div>

        {/* Interactive Cluster Graph & Inspector */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: 5 Capability Cluster Selectors */}
          <div className="space-y-3">
            {clusters.map((cluster, idx) => {
              const isActive = idx === activeClusterIndex;
              return (
                <button
                  key={cluster.id}
                  type="button"
                  onClick={() => handleSelectCluster(idx)}
                  className={cn(
                    "group flex w-full flex-col border p-5 text-left backdrop-blur-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive
                      ? "border-primary bg-card/95 shadow-glow translate-x-1"
                      : "border-border/80 bg-card/70 hover:border-primary/50 hover:bg-card/85",
                  )}
                  style={{
                    borderLeftWidth: "3px",
                    borderLeftColor: isActive ? cluster.accentColor : undefined,
                  }}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span
                      style={{
                        color: isActive ? cluster.accentColor : undefined,
                      }}
                      className={cn(!isActive && "text-muted-foreground")}
                    >
                      {cluster.code}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {cluster.skills.length} nodes
                    </span>
                  </div>
                  <h3 className="mt-1.5 font-mono text-lg font-bold text-foreground group-hover:text-primary">
                    {cluster.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cluster.skills.map((skill) => (
                      <span
                        key={skill}
                        className={cn(
                          "border px-2 py-0.5 font-mono text-[11px]",
                          isActive
                            ? "border-border bg-background/80 text-foreground"
                            : "border-border/60 text-muted-foreground",
                        )}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Interactive Node Matrix & Connected Systems */}
          <motion.div
            key={activeCluster.id}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col justify-between border border-border/90 bg-card/85 p-6 backdrop-blur-md md:p-8"
          >
            <div>
              <div className="flex items-center justify-between border-b border-border/70 pb-4 font-mono text-xs">
                <span
                  className="font-bold uppercase tracking-wider"
                  style={{ color: activeCluster.accentColor }}
                >
                  {`${activeCluster.code} // ACTIVE TOPOLOGY`}
                </span>
                {selectedSkill && (
                  <button
                    type="button"
                    onClick={() => setSelectedSkill(null)}
                    className="text-muted-foreground underline hover:text-primary"
                  >
                    Clear filter [{selectedSkill}]
                  </button>
                )}
              </div>

              <h3 className="mt-5 font-mono text-2xl font-bold text-foreground sm:text-3xl">
                {activeCluster.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                {activeCluster.summary}
              </p>

              {/* Interactive Skill Nodes */}
              <div className="mt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Click a node to filter connected systems:
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {activeCluster.skills.map((skill) => {
                    const isPicked = selectedSkill === skill;
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => {
                          setSelectedSkill(isPicked ? null : skill);
                          pulseScene(0.6);
                        }}
                        className={cn(
                          "flex items-center justify-between border px-3.5 py-3 font-mono text-xs transition-all",
                          isPicked
                            ? "border-primary bg-primary text-primary-foreground font-bold"
                            : "border-border bg-background/75 text-foreground hover:border-primary/60 hover:text-primary",
                        )}
                      >
                        <span>{skill}</span>
                        <Cpu className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Connected Production Systems */}
            <div className="mt-8 border-t border-border/70 pt-6">
              <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span>
                  SYSTEMS BUILT WITH{" "}
                  <strong className="text-primary">
                    {(selectedSkill ?? activeCluster.title).toUpperCase()}
                  </strong>
                </span>
                <span>{relatedProjects.length} matched</span>
              </div>

              {relatedProjects.length > 0 ? (
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {relatedProjects.slice(0, 6).map((proj) => (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => openProject(proj.id)}
                      className="group flex items-center justify-between border border-border/80 bg-background/70 px-3.5 py-2.5 text-left font-mono text-xs transition-colors hover:border-primary hover:text-primary"
                    >
                      <div>
                        <span className="text-[10px] text-muted-foreground mr-2">
                          {proj.index}
                        </span>
                        <span className="font-bold text-foreground group-hover:text-primary">
                          {proj.title}
                        </span>
                      </div>
                      <span className="text-muted-foreground group-hover:text-primary">
                        Inspect →
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-3 font-mono text-xs text-muted-foreground">
                  Core engineering capability applied across smart contract testing,
                  audits, and protocol architecture.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
