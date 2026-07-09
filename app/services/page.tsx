import { Code2, DatabaseZap, Link2, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site-content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `Services · ${siteConfig.name}`,
  description: "Smart contract, dApp, backend, and Web3 integration services.",
  path: "/services",
});

const services = [
  {
    icon: ShieldCheck,
    title: "Smart Contracts & Auditing",
    description:
      "Architecture, implementation, and review of Solidity contracts with deterministic test harnesses. Built for secure deployment and maintainability.",
    price: "Get a quote",
  },
  {
    icon: Code2,
    title: "Full-Stack dApps",
    description:
      "Production-ready frontends and backend APIs wired directly into on-chain logic. Delivered with deployment pipelines and observability.",
    price: "From $2,500",
  },
  {
    icon: DatabaseZap,
    title: "API & Backend Systems",
    description:
      "FastAPI and Django services for indexing, analytics, and automation workflows. Optimized for reliability and clear operating models.",
    price: "From $1,800",
  },
  {
    icon: Link2,
    title: "Web3 Integration",
    description:
      "Integrate wallet, transaction, and on-chain features into existing products without rebuilding your stack from scratch.",
    price: "Get a quote",
  },
];

export default function ServicesPage() {
  return (
    <main className="py-16 md:py-20">
      <section className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Services</p>
        <h1 className="mt-2 text-4xl md:text-5xl">What I build</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title} className="space-y-4 p-6">
              <service.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-xl">{service.title}</h2>
              <p className="text-sm text-muted-foreground">{service.description}</p>
              <p className="text-sm text-foreground">{service.price}</p>
              <ButtonLink href="/contact" variant="secondary">
                Start a project →
              </ButtonLink>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
