"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { allProjects } from "@/data/work-projects";
import type { Project } from "@/data/work-projects";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FILTERS = [
  "All",
  "Infrastructure",
  "DX",
  "Growth",
  "AI & Agents",
] as const;
type Filter = (typeof FILTERS)[number];

function DisciplineTag({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-dm-mono)",
        fontSize: "10px",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        border: "1px solid var(--border)",
        borderRadius: "4px",
        padding: "2px 7px",
        lineHeight: 1.6,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      {/* Thumbnail — lifts subtly on hover */}
      <div
        style={{
          width: "100%",
          aspectRatio: "3/2",
          borderRadius: "8px",
          background: project.thumbnail,
          overflow: "hidden",
          position: "relative",
          transform: hovered ? "translateY(-2px)" : "translateY(0px)",
          boxShadow: hovered
            ? "0 6px 16px rgba(0, 0, 0, 0.08)"
            : "0 0px 0px rgba(0, 0, 0, 0)",
          transition: "transform 0.22s ease, box-shadow 0.22s ease",
        }}
      >
        {project.thumbnailImage && (
          <img
            src={project.thumbnailImage}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "8px",
            border: "1px solid var(--border-strong)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Meta */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {/* Company · Year */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "11px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            {project.company}
          </span>
          <span style={{ color: "var(--text-muted)", fontSize: "11px", opacity: 0.5 }}>·</span>
          <span
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "11px",
              letterSpacing: "0.04em",
              color: "var(--text-muted)",
              opacity: 0.7,
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-dm-serif-display)",
            fontSize: "22px",
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "var(--text)",
            margin: 0,
            opacity: hovered ? 1 : 0.88,
            transition: "opacity 0.15s ease",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "14px",
            lineHeight: 1.6,
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          {project.description}
        </p>

        {/* Discipline tags */}
        {project.disciplines.length > 0 && (
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", paddingTop: "2px" }}>
            {project.disciplines.map((d) => (
              <DisciplineTag key={d} label={d} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export function WorkIndex() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  // Only surface filters that have at least one matching project —
  // AI & Agents stays hidden until that work is added to the data.
  const availableFilters = FILTERS.filter(
    (f) => f === "All" || allProjects.some((p) => p.disciplines.includes(f))
  );

  const filtered =
    activeFilter === "All"
      ? allProjects
      : allProjects.filter((p) => p.disciplines.includes(activeFilter));

  return (
    <div className="w-full px-6 md:px-12">
      <div className="max-w-5xl mx-auto">

        {/* Page header — no entrance animation, just present */}
        <section style={{ paddingTop: "clamp(40px, 6vw, 80px)", paddingBottom: "40px" }}>
          <p
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "16px",
            }}
          >
            Work
          </p>
          <h1
            className="max-w-2xl"
            style={{
              fontFamily: "var(--font-dm-serif-display)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "var(--text)",
              margin: "0 0 16px",
            }}
          >
            Curated case studies
          </h1>
          <p
            className="max-w-2xl"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "15px",
              lineHeight: 1.65,
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            Developer infrastructure, AI platforms, and growth. Work spanning IC contribution, team leadership, and 0-to-1 product design.
          </p>
        </section>

        {/* Filter pills — no entrance animation */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", paddingBottom: "40px" }}>
          {availableFilters.map((f) => {
            const active = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: active ? "var(--text)" : "var(--text-muted)",
                  border: `1px solid ${active ? "var(--border-strong)" : "var(--border)"}`,
                  borderRadius: "4px",
                  padding: "4px 10px",
                  background: "transparent",
                  cursor: "pointer",
                  lineHeight: 1.4,
                  transition: "color 0.15s ease, border-color 0.15s ease",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Project grid — slow crossfade on filter change.
            Exit fades out in 0.2s, enter fades in over 0.4s.
            Asymmetric timing: exit is quick, entrance is unhurried. */}
        <div style={{ paddingBottom: "96px" }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeFilter}
              variants={{
                hidden: { opacity: 0, transition: { duration: 0.18, ease: "easeIn" } },
                visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14"
            >
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
