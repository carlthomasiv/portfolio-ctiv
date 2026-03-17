"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";

interface Project {
  index: string;
  company: "Ona" | "Neon";
  category: string;
  title: string;
  description: string;
  slug: string;
  thumbnail: string;
}


const projects: Project[] = [
  {
    index: "01",
    company: "Ona",
    category: "AI Workflows",
    title: "Automations",
    description: "Designing the infrastructure for AI-powered workflow automation at scale.",
    slug: "automations",
    thumbnail: "linear-gradient(140deg, #e2ede2 0%, #b4cfb4 100%)",
  },
  {
    index: "02",
    company: "Ona",
    category: "Conversation Design",
    title: "Rethinking Conversations",
    description: "Reimagining how teams collaborate through structured conversation patterns.",
    slug: "rethinking-conversations",
    thumbnail: "linear-gradient(140deg, #ece6dd 0%, #cec0ac 100%)",
  },
  {
    index: "03",
    company: "Ona",
    category: "Design Systems",
    title: "Voice & Tone",
    description: "Building a cohesive language system that scales across a complex product.",
    slug: "voice-and-tone",
    thumbnail: "linear-gradient(140deg, #e6ece0 0%, #bccfb0 100%)",
  },
  {
    index: "04",
    company: "Neon",
    category: "Developer Tools",
    title: "Instant Postgres Playground",
    description: "Zero-config database environments that spin up in milliseconds.",
    slug: "instant-postgres-playground",
    thumbnail: "linear-gradient(140deg, #daeaf4 0%, #a4c8e4 100%)",
  },
  {
    index: "05",
    company: "Neon",
    category: "Infrastructure UX",
    title: "Console Navigation",
    description: "Restructuring the mental model for a multi-tenant cloud console.",
    slug: "console-navigation",
    thumbnail: "linear-gradient(140deg, #dce2f2 0%, #a8b8e4 100%)",
  },
  {
    index: "06",
    company: "Neon",
    category: "Growth",
    title: "Upgrade Flow Redesign",
    description: "Reducing friction in the path from free tier to paid without the hard sell.",
    slug: "upgrade-flow-redesign",
    thumbnail: "linear-gradient(140deg, #e2e0f4 0%, #b4b0e0 100%)",
  },
];

function NeonMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 27.542 28" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M27.542.008V28l-10.747-9.508v9.323H0V0zM3.376 24.439H13.42V11.084l10.747 9.508V3.382l-20.79-.005z"
      />
    </svg>
  );
}

function OnaMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 30 31" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M18.849.293c.9 0 1.756.391 2.356 1.043L28.958 9.2c.6.608.985 1.434.985 2.39v7.865c0 .956-.385 1.781-.985 2.39l-7.753 7.865c-.6.652-1.457 1-2.356 1h-7.754a3.274 3.274 0 0 1-2.399-1L.942 21.846c-.6-.609-.942-1.434-.942-2.39v-7.865c0-.956.343-1.782.942-2.434l7.754-7.865C9.34.684 10.153.293 11.095.293h7.754Zm-8.406 7.204c-1.884 0-3.383 1.564-3.383 3.433v9.187a3.38 3.38 0 0 0 3.383 3.39H19.5c1.842 0 3.342-1.521 3.342-3.39V10.93c0-1.869-1.5-3.433-3.342-3.433h-9.057Z"
      />
    </svg>
  );
}

function CompanyTag({ company }: { company: "Ona" | "Neon" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "inline-flex", alignItems: "center", color: "var(--text-muted)", position: "relative" }}
    >
      {company === "Neon" ? <NeonMark /> : <OnaMark />}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 6px)",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "var(--font-dm-mono)",
              fontSize: "12px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--text)",
              backgroundColor: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              padding: "3px 7px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            {company}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectRow({ project, index, isLast }: { project: Project; index: number; isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      <Link
        href={`/work/${project.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ textDecoration: "none", color: "var(--text)" }}
        className="group grid grid-cols-[40px_1fr] md:grid-cols-[40px_200px_1fr_auto] gap-4 md:gap-6"
      >
        {/* Timeline column: circle + connector */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Spacer: smaller on mobile, larger on desktop to align with tags/title gap */}
          <div className="h-4 md:h-[34px]" style={{ flexShrink: 0 }} />
          {/* Circle */}
          <div
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              position: "relative",
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "12px",
                color: "var(--text-muted)",
                letterSpacing: "0.04em",
              }}
            >
              {project.index}
            </span>
          </div>
          {/* Connector line to next row */}
          {!isLast && (
            <div className="[margin-bottom:-16px] md:[margin-bottom:-34px]" style={{ flex: 1, width: "1px", backgroundColor: "var(--border)", position: "relative", zIndex: 0 }} />
          )}
          {/* Bottom spacer on last item */}
          {isLast && <div style={{ height: "24px", flexShrink: 0 }} />}
        </div>

        {/* On mobile: thumbnail + content stack in one column. On desktop: they become separate grid columns via md:contents */}
        <div className="md:contents">
          {/* Thumbnail */}
          <div className="pt-4 md:pt-6 md:pb-6">
            <div
              style={{
                width: "100%",
                aspectRatio: "3/2",
                borderRadius: "6px",
                background: project.thumbnail,
                overflow: "hidden",
              }}
            />
          </div>

          {/* Main content */}
          <div
            className="pt-3 pb-4 md:pt-6 md:pb-6"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
            <CompanyTag company={project.company} />
            <span style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: 1 }}>·</span>
            <span
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "12px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              {project.category}
            </span>
          </div>

          <h3
            style={{
              fontFamily: "var(--font-dm-serif-display)",
              fontSize: "26px",
              fontWeight: 400,
              lineHeight: 1.2,
              color: "var(--text)",
              margin: 0,
              letterSpacing: "-0.01em",
              opacity: hovered ? 1 : 0.9,
              transition: "opacity 0.15s ease",
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "14px",
              lineHeight: 1.5,
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            {project.description}
          </p>
        </div>
        </div>{/* end md:contents wrapper */}

        {/* Arrow — desktop only */}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="hidden md:flex items-center"
          style={{ color: "var(--text-muted)", paddingTop: "24px" }}
        >
          <ArrowIcon />
        </motion.span>
      </Link>
    </motion.div>
  );
}

export function WorkList() {
  return (
    <section className="w-full px-6 md:px-12 pb-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "12px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            paddingBottom: "20px",
          }}
        >
          Case Studies
        </motion.div>

        <div>
          {projects.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={i}
              isLast={i === projects.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
