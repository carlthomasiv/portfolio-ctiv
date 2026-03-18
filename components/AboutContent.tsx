"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const experience = [
  {
    company: "Ona",
    role: "Product Designer",
    period: "Aug 2025 – Present",
    note: "Designing mission control for developers and their AI agents: agent-native experiences that make multi-agent workflows intuitive and environments instantly ready.",
  },
  {
    company: "Neon",
    role: "Head of Design",
    period: "Jul 2024 – May 2025",
    note: "Built the design org from zero. Defined the vision for serverless Postgres as a design-led product and cut the concept-to-prototype cycle by 40% by bringing AI tools into the team workflow.",
  },
  {
    company: "Kong",
    role: "Senior Staff Product Designer",
    period: "Feb 2024 – Jul 2024",
    note: "Architected the PLG motion for Kong Konnect: self-serve onboarding, serverless gateway UX, and developer education that reduced time-to-value.",
  },
  {
    company: "Postman",
    role: "Design Manager, Growth",
    period: "Jan 2022 – Jan 2024",
    note: "Built the first Growth Design org. High-velocity experimentation framework that directly supported the path to $100M ARR.",
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

const convictions = [
  {
    label: "Systems over Simplicity",
    body: "The goal isn't to \"simplify\", it's to make dense systems legible to the experts who depend on them. Engineers don't want their tools dumbed down; they want an interface that respects their mental model. I focus on building the navigational infrastructure that turns cognitive load into creative momentum.",
  },
  {
    label: "Design is a leadership problem",
    body: "High-leverage design isn't just about the artifact; it's about the infrastructure of the org. I build the decision frameworks, feedback loops, and research cultures that allow teams to ship with predictable quality. When the system is healthy, the craft scales naturally.",
  },
  {
    label: "Ship fast, learn fast",
    body: "In complex infrastructure, speed without direction is just technical debt. I prioritize signal quality over raw velocity. A fast experiment that validates a core architectural assumption is worth more than a dozen polished features that don't move the needle.",
  },
];

export function AboutContent() {
  return (
    <div className="w-full px-6 md:px-12">
      <div className="max-w-5xl mx-auto">

        {/* Opening */}
        <section style={{ paddingTop: "80px", paddingBottom: "32px" }}>
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 md:gap-12 items-stretch">
            {/* Photo — above on mobile (natural DOM order), left on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
              className="rounded-lg overflow-hidden relative [aspect-ratio:3/2] md:[aspect-ratio:auto] md:min-h-[320px]"
            >
              <Image
                src="/images/headshot.jpg"
                alt="Carl Thomas"
                fill
                style={{ objectFit: "cover", objectPosition: "center 8%" }}
                quality={95}
                priority
              />
            </motion.div>

            {/* Text — below on mobile, right on desktop */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "20px",
                }}
              >
                About
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
                style={{
                  fontFamily: "var(--font-dm-serif-display)",
                  fontSize: "clamp(26px, 3vw, 40px)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  color: "var(--text)",
                  margin: "0 0 24px",
                  letterSpacing: "-0.01em",
                }}
              >
                The most interesting design problems live at the infrastructure layer.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "15px",
                  lineHeight: 1.75,
                  color: "var(--text-muted)",
                  margin: "0 0 20px",
                }}
              >
                When the user is an expert and the systems are genuinely complex, clarity isn't just good design. It's the product. Thirteen years at that seam: developer tools, AI platforms, cloud infrastructure, and the interfaces engineers trust to work.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "15px",
                  lineHeight: 1.75,
                  color: "var(--text-muted)",
                  margin: "0 0 28px",
                }}
              >
                When I'm not at the keyboard, I'm building furniture or cooking something that takes longer than it should. Both teach the same lesson: knowing when something is done.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.06em",
                  color: "var(--text-muted)",
                }}
              >
                Ona · Neon · Kong · Postman · Meta · Google · Microsoft
              </motion.p>
            </div>
          </div>
        </section>


        {/* Experience */}
        <section style={{ paddingTop: "40px", paddingBottom: "32px" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "24px",
            }}
          >
            Experience
          </motion.p>

          <div>
            {experience.map((item, i) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.07, duration: 0.5, ease: EASE }}
                style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: "16px" }}
              >
                {/* Spine */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ height: "18px", flexShrink: 0 }} />
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--bg)",
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                  {i < experience.length - 1 && (
                    <div
                      style={{
                        flex: 1,
                        width: "1px",
                        backgroundColor: "var(--border)",
                        marginBottom: "-18px",
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingTop: "18px", paddingBottom: "36px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "10px",
                      flexWrap: "wrap",
                      marginBottom: "4px",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", fontWeight: 500, color: "var(--text)" }}>
                      {item.company}
                    </span>
                    <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.05em", color: "var(--text-muted)" }}>
                      {item.role}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.04em", color: "var(--text-muted)", margin: "0 0 10px" }}>
                    {item.period}
                  </p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", lineHeight: 1.65, color: "var(--text-muted)", margin: 0 }}>
                    {item.note}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Previously */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.4 }}
              style={{ paddingLeft: "44px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}
            >
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.05em", color: "var(--text-muted)" }}>
                Previously: Meta · Google · Microsoft
              </span>
              <Link
                href="/resume"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.05em",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "1px",
                  lineHeight: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Full history
                <ArrowRight size={12} strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>
        </section>


        {/* Convictions + Writing */}
        <section style={{ paddingTop: "40px", paddingBottom: "56px" }}>
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-16 items-start">

            {/* Convictions */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "24px",
                }}
              >
                Convictions
              </motion.p>

              <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
                {convictions.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease: EASE }}
                  >
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", fontWeight: 500, color: "var(--text)", margin: "0 0 8px" }}>
                      {c.label}
                    </p>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", lineHeight: 1.7, color: "var(--text-muted)", margin: 0 }}>
                      {c.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Writing */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "24px",
                }}
              >
                Writing
              </motion.p>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {publications.map((pub, i) => (
                  <motion.div
                    key={pub.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease: EASE }}
                  >
                    <a
                      href={pub.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <p style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: 1.45,
                        color: "var(--text)",
                        margin: "0 0 5px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "5px",
                      }}>
                        <span>{pub.title}</span>
                        <ExternalLink size={12} strokeWidth={1.5} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "3px" }} />
                      </p>
                      <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.05em", color: "var(--text-muted)", margin: 0 }}>
                        {pub.role} · {pub.publisher}
                      </p>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
