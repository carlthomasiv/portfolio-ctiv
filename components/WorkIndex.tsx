"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { groups } from "@/data/work-projects";
import type { Project } from "@/data/work-projects";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ProjectCard({ project, company, index, groupIndex }: { project: Project; company: string; index: number; groupIndex: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + groupIndex * 0.05 + index * 0.06, duration: 0.5, ease: EASE }}
    >
      <Link
        href={`/work/${project.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ textDecoration: "none", display: "block" }}
      >
        {/* Thumbnail */}
        <div
          className="theme-border"
          style={{
            width: "100%",
            aspectRatio: "3/2",
            borderRadius: "6px",
            overflow: "hidden",
            marginBottom: "16px",
            transition: "opacity 0.2s ease",
            opacity: hovered ? 0.85 : 1,
            background: project.thumbnail,
            boxShadow: project.thumbnailImage ? "inset 0 0 0 1px var(--border)" : "none",
            transition: "opacity 0.2s ease, box-shadow 0.2s ease",
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

        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            {project.category}
          </span>
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.04em", color: "var(--text-muted)", opacity: 0.6 }}>
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-dm-serif-display)",
            fontSize: "22px",
            fontWeight: 400,
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            color: "var(--text)",
            margin: "0 0 8px",
            transition: "opacity 0.15s ease",
            opacity: hovered ? 1 : 0.85,
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", lineHeight: 1.6, color: "var(--text-muted)", margin: 0 }}>
          {project.description}
        </p>
      </Link>
    </motion.div>
  );
}

export function WorkIndex() {
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
            Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
            style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--text)", margin: "0 0 16px" }}
          >
            Selected case studies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", lineHeight: 1.65, color: "var(--text-muted)", maxWidth: "480px", margin: 0 }}
          >
            Developer infrastructure, AI platforms, and growth. Work spanning IC contribution, team leadership, and 0-to-1 product design.
          </motion.p>
        </section>

        {/* Company groups */}
        <div style={{ display: "flex", flexDirection: "column", gap: "72px", paddingBottom: "96px" }}>

{groups.map((group, gi) => (
            <motion.section
              key={group.company}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + gi * 0.05, duration: 0.4 }}
            >
              {/* Company header */}
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "12px", marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text)" }}>
                    {group.company}
                  </span>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.04em", color: "var(--text-muted)" }}>
                    {group.context}
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.04em", color: "var(--text-muted)" }}>
                  {group.projects.length} {group.projects.length === 1 ? "project" : "projects"}
                </span>
              </div>

              {/* Project grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {group.projects.map((project, pi) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    company={group.company}
                    index={pi}
                    groupIndex={gi}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>

      </div>
    </div>
  );
}
