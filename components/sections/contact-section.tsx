"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, Mail, Orbit } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { siteConfig } from "@/config/site-content";
import { pulseScene } from "@/components/experience/store";

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();

  const triggerCoreConvergence = () => {
    pulseScene(2.1);
  };

  return (
    <section
      id="contact"
      className="relative z-10 py-28 md:py-36"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="border border-border/90 bg-card/80 p-6 shadow-glow backdrop-blur-xl sm:p-10 md:p-14">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-6 font-mono text-xs">
            <span className="inline-flex items-center gap-2 text-primary uppercase tracking-[0.18em]">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              06 // Core Convergence · Exit the Experience
            </span>

            <button
              type="button"
              onClick={triggerCoreConvergence}
              className="inline-flex items-center gap-1.5 border border-border bg-background/80 px-3 py-1 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Orbit className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>Pulse Connected Core</span>
            </button>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-end">
            <div>
              <motion.h2
                className="font-mono text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-6xl"
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                Have something{" "}
                <span className="text-primary">worth building?</span>
              </motion.h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Whether you need smart contract architecture, zero-knowledge
                circuit engineering, or an end-to-end full-stack product taken
                from concept to mainnet — let&apos;s talk.
              </p>

              {/* Primary Direct Email & Resume CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink href={`mailto:${siteConfig.email}`}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>{siteConfig.email}</span>
                </ButtonLink>

                <CopyEmailButton email={siteConfig.email} />

                <ButtonLink href="/resume.pdf" variant="secondary" download>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Download Resume</span>
                </ButtonLink>
              </div>
            </div>

            {/* Direct Channel Matrix */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border border-border/80 bg-background/75 p-4 font-mono transition-all hover:-translate-y-0.5 hover:border-primary"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Github className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>GitHub</span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-foreground group-hover:text-primary">
                    @therealjhay
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </a>

              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border border-border/80 bg-background/75 p-4 font-mono transition-all hover:-translate-y-0.5 hover:border-primary"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Linkedin className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-foreground group-hover:text-primary">
                    oyemade-johnson
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </a>

              {siteConfig.socialLinks
                .filter((s) => s.icon === "twitter" || s.icon === "etherscan")
                .map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between border border-border/80 bg-background/75 p-4 font-mono transition-all hover:-translate-y-0.5 hover:border-primary"
                  >
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {social.name}
                      </p>
                      <p className="mt-1 text-sm font-bold text-foreground group-hover:text-primary">
                        {social.handle}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
