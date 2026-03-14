"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { siteContent } from "@/config/site-content";
import { Github, Linkedin, Mail, ScanLine, Twitter } from "lucide-react";

const iconMap: Record<string, ReactNode> = {
  github: <Github className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
  etherscan: <ScanLine className="h-5 w-5" />,
};

export function Contact() {
  const { email } = siteContent.personalInfo;

  return (
    <section
      id="contact"
      className="w-full border-b-4 border-ink bg-orange text-ink"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-1 gap-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-5">
            <span className="inline-flex border-4 border-ink bg-paper px-4 py-2 text-sm font-semibold uppercase tracking-wide">
              Contact / Connect
            </span>
            <h2 className="mt-6 text-3xl font-display md:text-5xl">
              Let’s build something loud and reliable.
            </h2>
            <p className="mt-6 text-lg leading-relaxed">
              Drop a note about your product, protocol, or team. I respond fastest to
              clear scopes and bold timelines.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${email}`}
                data-cursor="hover"
                className="inline-flex items-center gap-2 border-4 border-ink bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-wide text-paper transition-transform hover:-translate-y-1"
              >
                <Mail className="h-4 w-4" />
                Email Me
              </a>
              <span className="border-2 border-ink bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-wide">
                {email}
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {siteContent.socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 border-2 border-ink bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition-transform hover:-translate-y-1"
                >
                  {iconMap[link.icon.toLowerCase()] ?? <Mail className="h-4 w-4" />}
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              className="border-4 border-ink bg-paper p-6 text-ink"
              action={`mailto:${email}`}
              method="post"
              encType="text/plain"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide">
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="border-2 border-ink bg-white px-3 py-2 text-sm"
                  />
                </label>
                <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="border-2 border-ink bg-white px-3 py-2 text-sm"
                  />
                </label>
              </div>
              <label className="mt-4 flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide">
                Project Details
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell me about your build, timeline, and stack."
                  className="border-2 border-ink bg-white px-3 py-2 text-sm"
                />
              </label>
              <button
                type="submit"
                data-cursor="hover"
                className="mt-6 inline-flex items-center gap-2 border-4 border-ink bg-cyan px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-transform hover:-translate-y-1"
              >
                Send Mailto Form
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
