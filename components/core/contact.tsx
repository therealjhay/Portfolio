"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent, type ReactNode } from "react";
import { Github, Linkedin, Mail, ScanLine, Twitter } from "lucide-react";
import { siteContent } from "@/config/site-content";

const iconMap: Record<string, ReactNode> = {
  github: <Github className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  etherscan: <ScanLine className="h-4 w-4" />,
};

export function Contact() {
  const { email } = siteContent.personalInfo;
  const [formStatus, setFormStatus] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const senderEmail = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !senderEmail || !message) {
      setFormStatus("Please complete all fields before sending your message.");
      return;
    }

    const body = `Name: ${name}\nEmail: ${senderEmail}\n\nProject details:\n${message}`;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      `Project inquiry from ${name}`
    )}&body=${encodeURIComponent(body)}`;

    try {
      await navigator.clipboard.writeText(body);
    } catch {
      // Clipboard can be unavailable in some browser contexts.
    }

    window.location.href = mailtoUrl;
    setFormStatus("Email draft opened. Your message was also copied to clipboard.");
  };

  return (
    <section id="contact" className="py-14 md:py-20 lg:py-24">
      <div className="section-shell grid gap-8 lg:grid-cols-12 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <span className="eyebrow">Contact</span>
          <h2 className="display-title mt-6 text-[clamp(1.8rem,4.4vw,3.8rem)] max-w-[16ch]">
            Let&apos;s ship something durable and ambitious.
          </h2>
          <p className="lede mt-5">
            Send context, timeline, and constraints. I prioritize projects where product quality and
            execution discipline both matter.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <a href={`mailto:${email}`} className="btn-primary">
              <Mail className="h-4 w-4" />
              Email Me
            </a>
            <span className="chip !rounded-lg">{email}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {siteContent.socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                title={link.name}
                className="btn-secondary"
              >
                {iconMap[link.icon.toLowerCase()] ?? link.name[0]}
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <form onSubmit={handleSubmit} className="surface p-5 md:p-6">
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Fill this out and I&apos;ll open a prefilled email draft with your details.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field
                label="Name"
                name="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="mt-4">
              <Field
                label="Project details"
                name="message"
                type="textarea"
                placeholder="What are you building, and what do you need from me?"
              />
            </div>

            <button type="submit" className="btn-primary mt-5">
              Send message
              <Mail className="h-4 w-4" />
            </button>

            {formStatus ? (
              <p className="mt-3 text-sm" style={{ color: "var(--color-muted)" }}>
                {formStatus}
              </p>
            ) : null}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
  autoComplete?: string;
}) {
  const baseClassName =
    "w-full rounded-lg border px-3 py-2.5 text-sm leading-relaxed";

  const style = {
    borderColor: "var(--color-border)",
    background: "color-mix(in oklab, var(--color-surface) 75%, transparent)",
    color: "var(--color-text)",
  } as const;

  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--color-muted)" }}>
        {label}
      </span>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={6}
          required
          aria-required="true"
          placeholder={placeholder}
          className={baseClassName}
          style={style}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required
          aria-required="true"
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={baseClassName}
          style={style}
        />
      )}
    </label>
  );
}
