import { ContactStatus } from "@/components/sections/contact-status";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site-content";
import { createMetadata } from "@/lib/metadata";
import { submitContactForm } from "./actions";

export const metadata = createMetadata({
  title: `Contact · ${siteConfig.name}`,
  description: "Start a project, request consulting, or discuss collaboration.",
  path: "/contact",
});

export default function ContactPage({
  searchParams,
}: {
  searchParams: {
    status?: string;
  };
}) {
  return (
    <main className="py-16 md:py-20">
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:grid-cols-[2fr_1fr] md:px-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Contact</p>
          <h1 className="mt-2 text-4xl md:text-5xl">Let&apos;s build your next system</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Share your objective, timeline, and where you are in the build cycle. I&apos;ll respond with a concrete execution path.
          </p>

          <div className="mt-8">
            <ContactStatus status={searchParams.status} />
            {searchParams.status === "error" ? (
              <p className="mb-4 border border-[#b42318]/30 bg-[#b42318]/10 p-3 text-sm text-[#d92d20]">
                Couldn&apos;t send your message. Check your details and try again.
              </p>
            ) : null}
            <form action={submitContactForm} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="h-11 w-full border border-border bg-card px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  spellCheck={false}
                  className="h-11 w-full border border-border bg-card px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="projectType" className="text-sm">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  className="h-11 w-full border border-border bg-card px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <option value="Smart Contract">Smart Contract</option>
                  <option value="Full-Stack">Full-Stack</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label htmlFor="message" className="text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={7}
                  className="w-full border border-border bg-card px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
              </div>
              <Button type="submit">Send message</Button>
            </form>
          </div>
        </div>

        <aside className="space-y-3 border border-border bg-card p-5 text-sm text-muted-foreground">
          <h2 className="text-base text-foreground">Direct links</h2>
          {siteConfig.socialLinks.map((social) => (
            <a key={social.name} href={social.url} className="block underline-offset-4 hover:underline">
              {social.name}
            </a>
          ))}
          {siteConfig.social.calendly ? (
            <a href={siteConfig.social.calendly} className="block underline-offset-4 hover:underline">
              Book a call on Calendly
            </a>
          ) : null}
        </aside>
      </section>
    </main>
  );
}
