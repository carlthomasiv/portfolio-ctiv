"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const experience = [
  {
    role: "Product Designer",
    company: "Ona",
    period: "Aug 2025 – Present",
    location: "Remote",
    bullets: [
      "Designing the interface layer between developers and their AI agents. Multi-agent workflows that are navigable, environments that are instantly ready.",
      "Working out what developer control looks like when the loop includes an AI. How to keep humans in command without slowing them down.",
    ],
  },
  {
    role: "Head of Design",
    company: "Neon",
    period: "Jul 2024 – May 2025",
    location: "Remote",
    bullets: [
      "Built the design org from zero. Hired, structured, and set the culture for a team tasked with turning serverless Postgres into a product developers actually wanted to use.",
      "Contributed to 200%+ ARR growth by owning the design strategy for activation and onboarding: cleaner mental models, faster time-to-value, less friction between signup and first query.",
      "Cut the concept-to-prototype cycle by 40% by integrating AI tools (Devin, v0) into the team workflow. Gave designers code-level autonomy and more time on product thinking.",
    ],
  },
  {
    role: "Senior Staff Product Designer",
    company: "Kong",
    period: "Feb 2024 – Jul 2024",
    location: "Remote",
    bullets: [
      "Defined the PLG motion for Kong Konnect: self-serve trial flows that converted enterprise prospects without high-touch sales. 17% lift in trial-to-paid conversion, 40% drop in support tickets.",
      "Led end-to-end UX for Kong Serverless Gateways. Turned complex infrastructure management into a zero-to-one deployment experience developers could complete in minutes.",
      "Designed the Kong Learning Hub, a developer-first education portal built to reduce time-to-value and drive organic adoption across Konnect.",
    ],
  },
  {
    role: "Design Manager, Growth",
    company: "Postman",
    period: "Jan 2022 – Jan 2024",
    location: "Remote",
    bullets: [
      "Built the first Growth Design function at Postman. Hired the team, established the practice, and created the experimentation framework that ran across onboarding and collaboration.",
      "Shipped the PLG work that contributed to Postman crossing $100M ARR: activation improvements, collaboration nudges, and the onboarding flows that turned signups into engaged teams.",
      "Partnered with Engineering to standardize in-app telemetry, creating the first unified quantitative baseline for PLG decisions across the platform.",
    ],
  },
  {
    role: "Senior Product Designer",
    company: "Meta",
    period: "Apr 2020 – Jan 2022",
    location: "Austin, TX",
    bullets: [
      "20%+ engagement lift running experiments across buyer and seller flows in Facebook Commerce. Surfaces where small design decisions produced measurable outcomes at scale.",
      "Designed and governed scalable UI frameworks for Meta's internal enterprise suite, reducing technical debt across complex, data-heavy workflows.",
      "Used high-fidelity prototypes to simulate product logic and state changes. Secured executive buy-in on high-risk features by showing the vision rather than describing it.",
    ],
  },
  {
    role: "Interaction Designer II",
    company: "Google",
    period: "Jun 2018 – Apr 2020",
    location: "Kirkland, WA",
    bullets: [
      "0-to-1 design for Resource Manager in Android Studio, standardizing the asset workflow for a community of 2.5M+ developers. Cut upload time by 50%.",
      "Shipped GPU debugging and profiling tools including Android GPU Inspector and GAPID. Translated dense GPU telemetry into readable visuals that helped developers cut app launch times by 15%.",
      "Built the first shared design system across Android Studio and represented the developer tooling vision at Google I/O and GDC.",
    ],
  },
  {
    role: "Designer II",
    company: "Microsoft",
    period: "Jul 2014 – Jun 2018",
    location: "Redmond, WA",
    bullets: [
      "0-to-1 UX for Azure SQL Data Warehouse and Elastic Database Pools. Brought two flagship Azure data products from concept to general availability.",
      "Founded the cross-team design system that became the documentation and pattern standard across Azure, improving design-to-dev efficiency by 40%.",
      "Started as a contractor. Converted to full-time on the strength of the work.",
    ],
  },
];

const publications = [
  {
    title: "Designing Automations: a new operating model for engineering at scale",
    role: "Author",
    publisher: "Ona",
    href: "https://ona.com/stories/designing-automations",
  },
  {
    title: "Designers Who Code: Can AI End Your Papercut Backlog?",
    role: "Co-Author",
    publisher: "Neon.tech",
    href: "https://neon.com/blog/designers-who-code",
  },
  {
    title: "Understanding Growth Design",
    role: "Author",
    publisher: "Medium",
    href: "https://medium.com/@carlthomasiv/understanding-growth-design-5663b93a596c",
  },
];

const skills = [
  "Generative AI Product Strategy",
  "Human-AI Interaction Design",
  "Design Leadership & Org Scaling",
  "Product Strategy & Vision",
  "Growth & Monetization (PLG)",
  "Data-Driven Experimentation",
  "Design Operations",
  "Design Systems at Scale",
  "Developer Tooling",
  "Infrastructure UX",
  "B2B / SaaS",
  "Enterprise Platform Design",
];

export function ResumeContent() {
  return (
    <div className="w-full px-6 md:px-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <section style={{ paddingTop: "80px", paddingBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            >
              <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>
                Resume
              </p>
              <h1 style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, color: "var(--text)", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
                Carl Thomas
              </h1>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", color: "var(--text-muted)", margin: "0 0 16px" }}>
                Product Design Leader
              </p>
              <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.04em", color: "var(--text-muted)" }}>
                carlthomasiv@gmail.com · Austin, TX
              </p>
            </motion.div>

            <motion.a
              href="/images/CarlThomasResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="hover:[border-color:var(--border-strong)]"
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "12px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--text)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "10px 20px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "border-color 0.15s ease",
                alignSelf: "flex-start",
                marginTop: "40px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Download size={14} strokeWidth={1.5} />
              Download PDF
            </motion.a>
          </div>
        </section>

        {/* Experience */}
        <section style={{ paddingBottom: "56px" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "32px" }}
          >
            Experience
          </motion.p>

          <div>
            {experience.map((item, i) => (
              <motion.div
                key={`${item.company}-${item.role}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease: EASE }}
                style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: "16px" }}
              >
                {/* Spine */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ height: "18px", flexShrink: 0 }} />
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: "1px solid var(--border)", backgroundColor: "var(--bg)", flexShrink: 0, position: "relative", zIndex: 1 }} />
                  {i < experience.length - 1 && (
                    <div style={{ flex: 1, width: "1px", backgroundColor: "var(--border)", marginBottom: "-18px" }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingTop: "18px", paddingBottom: "32px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap", marginBottom: "2px" }}>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", fontWeight: 500, color: "var(--text)" }}>
                      {item.company}
                    </span>
                    <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.04em", color: "var(--text-muted)" }}>
                      {item.role}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.04em", color: "var(--text-muted)", margin: "0 0 14px" }}>
                    {item.period} · {item.location}
                  </p>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {item.bullets.map((bullet, bi) => (
                      <li key={bi} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <span style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "4px", fontSize: "14px", lineHeight: 1 }}>•</span>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", lineHeight: 1.65, color: "var(--text-muted)" }}>
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section style={{ paddingBottom: "56px" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "28px" }}
          >
            Publications
          </motion.p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {publications.map((pub, i) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.07, duration: 0.5, ease: EASE }}
              >
                <a
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  style={{ textDecoration: "none" }}
                >
                  <p className="opacity-90 group-hover:opacity-100 transition-opacity duration-150" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", fontWeight: 500, color: "var(--text)", margin: "0 0 4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    {pub.title}
                    <ExternalLink size={15} strokeWidth={1.5} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                  </p>
                  <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.04em", color: "var(--text-muted)", margin: 0 }}>
                    {pub.role} · {pub.publisher}
                  </p>
                </a>
              </motion.div>
            ))}
          </div>
        </section>

{/* Skills */}
        <section style={{ paddingBottom: "96px" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "28px" }}
          >
            Skills
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
          >
            {skills.map((skill) => (
              <span
                key={skill}
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.04em",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  padding: "5px 10px",
                }}
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </section>

      </div>
    </div>
  );
}
