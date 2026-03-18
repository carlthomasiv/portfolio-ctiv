"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { allProjects } from "@/data/work-projects";
import type { Project } from "@/data/work-projects";

const HOMEPAGE_COUNT = 5;
const featuredProjects = allProjects.slice(0, HOMEPAGE_COUNT);

function CompanyTag({ company }: { company: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "inline-flex", alignItems: "center", color: "var(--text-muted)", position: "relative" }}
    >
      <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {company}
      </span>
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
        {/* Timeline column */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="h-4 md:h-[34px]" style={{ flexShrink: 0 }} />
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
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          {!isLast && (
            <div className="[margin-bottom:-16px] md:[margin-bottom:-34px]" style={{ flex: 1, width: "1px", backgroundColor: "var(--border)", position: "relative", zIndex: 0 }} />
          )}
          {isLast && <div style={{ height: "24px", flexShrink: 0 }} />}
        </div>

        {/* Thumbnail + content */}
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
                border: project.thumbnailImage ? "1px solid var(--border)" : "none",
                transition: "opacity 0.2s ease",
                opacity: hovered ? 0.85 : 1,
              }}
            >
              {project.thumbnailImage && (
                <img
                  src={project.thumbnailImage}
                  alt={project.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              )}
            </div>
          </div>

          {/* Main content */}
          <div
            className="pt-3 pb-4 md:pt-6 md:pb-6"
            style={{ display: "flex", flexDirection: "column", gap: "6px" }}
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
        </div>

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

function OnaComingSoonRow({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      <div className="group grid grid-cols-[40px_1fr] md:grid-cols-[40px_200px_1fr_auto] gap-4 md:gap-6">
        {/* Timeline column */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="h-4 md:h-[34px]" style={{ flexShrink: 0 }} />
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
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "var(--text-muted)", opacity: 0.4 }} />
          </div>
          <div
            className="[margin-bottom:-16px] md:[margin-bottom:-34px]"
            style={{ flex: 1, width: "1px", background: "repeating-linear-gradient(to bottom, var(--border) 0px, var(--border) 4px, transparent 4px, transparent 8px)", position: "relative", zIndex: 0 }}
          />
        </div>

        {/* Content */}
        <div className="md:contents">
          <div className="pt-4 md:pt-6 md:pb-6">
            <div
              style={{
                width: "100%",
                aspectRatio: "3/2",
                borderRadius: "6px",
                background: "linear-gradient(140deg, #e8e6e1 0%, #d4d0c8 100%)",
                opacity: 0.5,
              }}
            />
          </div>

          <div className="pt-3 pb-4 md:pt-6 md:pb-6" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", opacity: 0.5 }}>
                Ona
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
                opacity: 0.35,
              }}
            >
              Case studies in progress
            </h3>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "14px",
                lineHeight: 1.5,
                color: "var(--text-muted)",
                margin: 0,
                opacity: 0.6,
              }}
            >
              Automations, Rethinking Conversations, Voice &amp; Tone
            </p>
          </div>
        </div>

        <div className="hidden md:flex" />
      </div>
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
          <OnaComingSoonRow index={0} />
          {featuredProjects.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={i}
              isLast={i === featuredProjects.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
