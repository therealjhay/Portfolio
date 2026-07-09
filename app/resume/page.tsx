import { ResumeRail } from "@/components/sections/resume-rail";
import { siteConfig } from "@/config/site-content";
import { resumeData } from "@/content/resume";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `Resume · ${siteConfig.name}`,
  description: "Blockchain and full-stack engineering resume.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <main id="main-content" className="resume-area min-h-screen py-8 md:py-12 print:py-0 print:min-h-0">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-[120px_1fr] md:px-6 print:block print:px-0">
        <ResumeRail />
        <article className="resume-area mx-auto w-full max-w-3xl px-0 text-sm leading-relaxed print:max-w-none">
          <header className="border-b border-[color:var(--resume-border)] pb-4">
            <h1 className="text-[1.375rem] leading-none md:text-[1.75rem]">{resumeData.header.fullName}</h1>
            <p className="mt-2 text-[0.9375rem] font-medium">{resumeData.header.title}</p>
            <p className="mt-2 text-sm text-[color:var(--resume-meta)]">
              {resumeData.header.location} · {resumeData.header.email}
            </p>
            <p className="text-sm text-[color:var(--resume-meta)]">
              <a href={`https://${resumeData.header.github}`}>{resumeData.header.github}</a> ·{" "}
              <a href={`https://${resumeData.header.linkedin}`}>{resumeData.header.linkedin}</a>
            </p>
          </header>

          <section className="resume-section">
            <h2 className="resume-label">Summary</h2>
            <p className="mt-3 text-[color:var(--resume-body)]">{resumeData.summary}</p>
          </section>

          <section id="experience" className="resume-section">
            <h2 className="resume-label">Experience</h2>
            <div className="mt-3 space-y-6">
              {resumeData.experience.map((item) => (
                <div key={`${item.company}-${item.role}`} className="resume-entry space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-[0.9375rem] font-medium">
                      {item.role}, {item.company}
                    </h3>
                    <span className="shrink-0 text-xs text-[color:var(--resume-date)]">{item.dateRange}</span>
                  </div>
                  <p className="text-xs text-[color:var(--resume-date)]">{item.location}</p>
                  <ul className="space-y-1 pl-5">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="list-disc">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <h2 className="resume-label">Projects</h2>
            <div className="mt-3 space-y-4">
              {resumeData.projects.map((project) => (
                <p key={project.name}>
                  <span className="font-medium">{project.name}</span>: {project.description} ({project.tech.join(", ")}) ·{" "}
                  <a href={`https://${project.github}`}>{project.github}</a>
                  {project.live ? (
                    <>
                      {" "}
                      · <a href={`https://${project.live}`}>{project.live}</a>
                    </>
                  ) : null}
                </p>
              ))}
            </div>
          </section>

          <section id="skills" className="resume-section">
            <h2 className="resume-label">Skills</h2>
            <div className="mt-3 space-y-1">
              <p>Languages: {resumeData.skills.languages.join(", ")}</p>
              <p>Frameworks: {resumeData.skills.frameworks.join(", ")}</p>
              <p>Blockchain: {resumeData.skills.blockchain.join(", ")}</p>
              <p>Tools: {resumeData.skills.tools.join(", ")}</p>
            </div>
          </section>

          <section id="education" className="resume-section">
            <h2 className="resume-label">Education</h2>
            <div className="mt-3 space-y-3">
              {resumeData.education.map((education) => (
                <div key={education.institution} className="flex items-baseline justify-between gap-2">
                  <p>
                    <span className="font-medium">{education.institution}</span>, {education.degree}
                  </p>
                  <span className="shrink-0 text-xs text-[color:var(--resume-date)]">{education.year}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="certifications" className="resume-section pb-6">
            <h2 className="resume-label">Certifications</h2>
            <div className="mt-3 space-y-3">
              {resumeData.certifications.map((certification) => (
                <div key={certification.name} className="flex items-baseline justify-between gap-2">
                  <p>
                    <span className="font-medium">{certification.name}</span>, {certification.issuer}
                  </p>
                  <span className="shrink-0 text-xs text-[color:var(--resume-date)]">{certification.year}</span>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
