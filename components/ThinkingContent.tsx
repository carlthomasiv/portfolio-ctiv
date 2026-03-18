"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const publications = [
  {
    title: "Designing Automations: a new operating model for engineering at scale",
    description: "How agent-native workflows change the interface contract between humans and the systems they build — and what that means for the designers shaping those environments.",
    role: "Author",
    publisher: "Ona",
    year: "2025",
    href: "https://ona.com/stories/designing-automations",
  },
  {
    title: "Designers Who Code: Can AI End Your Papercut Backlog?",
    description: "An honest look at what happens when designers get code-level autonomy through AI tools — what it unlocks, what it doesn't, and what it changes about the role.",
    role: "Co-Author",
    publisher: "Neon.tech",
    year: "2024",
    href: "https://neon.com/blog/designers-who-code",
  },
  {
    title: "Understanding Growth Design",
    description: "Growth design isn't a set of tactics — it's a discipline with its own mental model. A framework for how designers should think about activation, retention, and the moments that matter.",
    role: "Author",
    publisher: "Medium",
    year: "2023",
    href: "https://medium.com/@carlthomasiv/understanding-growth-design-5663b93a596c",
  },
];

function PublicationRow({ pub, index }: { pub: typeof publications[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 + index * 0.08, duration: 0.5, ease: EASE }}
    >
      <a
        href={pub.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="link-hover"
        style={{ textDecoration: "none", display: "block", cursor: "pointer" }}
      >
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "28px",
            paddingBottom: "28px",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "24px" }}>
            <div style={{ flex: 1 }}>
              {/* Meta */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}>
                  {pub.publisher}
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: "12px", opacity: 0.5 }}>·</span>
                <span style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.04em",
                  color: "var(--text-muted)",
                  opacity: 0.6,
                }}>
                  {pub.year}
                </span>
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: "var(--font-dm-serif-display)",
                fontSize: "clamp(20px, 2.5vw, 26px)",
                fontWeight: 400,
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
                color: "var(--text)",
                margin: "0 0 12px",
                opacity: hovered ? 1 : 0.9,
                transition: "opacity 0.15s ease",
              }}>
                {pub.title}
              </h2>

              {/* Description */}
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "14px",
                lineHeight: 1.65,
                color: "var(--text-muted)",
                margin: 0,
                maxWidth: "560px",
              }}>
                {pub.description}
              </p>
            </div>

            {/* Arrow */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="hidden md:flex"
              style={{ color: "var(--text-muted)", paddingTop: "38px", flexShrink: 0 }}
            >
              <ExternalLink size={16} strokeWidth={1.5} />
            </motion.div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export function ThinkingContent() {
  return (
    <div className="w-full px-6 md:px-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <section style={{ paddingTop: "80px", paddingBottom: "64px" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
            style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}
          >
            Thinking
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
            style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--text)", margin: "0 0 16px" }}
          >
            On design, infrastructure, and how AI changes both.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", lineHeight: 1.65, color: "var(--text-muted)", maxWidth: "480px", margin: 0 }}
          >
            Essays and posts on the problems worth thinking about — developer experience, AI-native workflows, and what it means to design for experts.
          </motion.p>
        </section>

        {/* Publications */}
        <section style={{ paddingBottom: "96px" }}>
          {publications.map((pub, i) => (
            <PublicationRow key={pub.title} pub={pub} index={i} />
          ))}

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            style={{
              borderTop: "1px solid var(--border)",
              paddingTop: "24px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--text-muted)", opacity: 0.3, flexShrink: 0 }} />
            <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.05em", color: "var(--text-muted)", margin: 0, opacity: 0.6 }}>
              More writing in progress
            </p>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
