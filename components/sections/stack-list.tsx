"use client";

import { siteContent } from "@/config/site-content";

export function StackList() {
  const { capabilityGroups } = siteContent;

  return (
    <section
      id="stack"
      className="relative border-b border-border py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            Capabilities
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What I Bring to a Team
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {capabilityGroups.map((group, idx) => (
            <div
              key={group.id}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7"
            >
              <div>
                <div className="border-b border-border pb-4">
                  <p className="font-mono text-xs font-medium text-primary">
                    0{idx + 1} · {group.subtitle}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-foreground">
                    {group.title}
                  </h3>
                </div>

                <div className="mt-5 space-y-5">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <h4 className="text-sm font-semibold text-foreground">
                        {skill.name}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {skill.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
