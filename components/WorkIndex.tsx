"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Project {
  category: string;
  title: string;
  description: string;
  slug: string;
  thumbnail: string;
  thumbnailImage?: string;
  year: string;
}

interface CompanyGroup {
  company: string;
  context: string;
  projects: Project[];
}

const groups: CompanyGroup[] = [
  {
    company: "Ona",
    context: "AI-native developer environments",
    projects: [
      {
        category: "AI Workflows",
        title: "Automations",
        description: "Designing the infrastructure for AI-powered workflow automation at scale.",
        slug: "automations",
        thumbnail: "linear-gradient(140deg, #e2ede2 0%, #b4cfb4 100%)",
        year: "2025",
      },
      {
        category: "Conversation Design",
        title: "Rethinking Conversations",
        description: "Reimagining how teams collaborate through structured conversation patterns.",
        slug: "rethinking-conversations",
        thumbnail: "linear-gradient(140deg, #ece6dd 0%, #cec0ac 100%)",
        year: "2025",
      },
      {
        category: "Design Systems",
        title: "Voice & Tone",
        description: "Building a cohesive language system that scales across a complex product.",
        slug: "voice-and-tone",
        thumbnail: "linear-gradient(140deg, #e6ece0 0%, #bccfb0 100%)",
        year: "2025",
      },
    ],
  },
  {
    company: "Neon",
    context: "Serverless Postgres",
    projects: [
      {
        category: "Developer Tools",
        title: "Instant Postgres Playground",
        description: "Zero-config database environments that spin up in milliseconds. No signup required.",
        slug: "instant-postgres-playground",
        thumbnail: "linear-gradient(140deg, #daeaf4 0%, #a4c8e4 100%)",
        thumbnailImage: "/images/thumbnails/instant-postgres-playground.png",
        year: "2024",
      },
      {
        category: "Infrastructure UX",
        title: "Console Navigation",
        description: "Restructuring the mental model for a multi-tenant cloud console.",
        slug: "console-navigation",
        thumbnail: "linear-gradient(140deg, #dce2f2 0%, #a8b8e4 100%)",
        thumbnailImage: "/images/thumbnails/console-navigation.png",
        year: "2024",
      },
      {
        category: "Growth",
        title: "Upgrade Flow Redesign",
        description: "Reducing friction in the path from free to paid without the hard sell.",
        slug: "upgrade-flow-redesign",
        thumbnail: "linear-gradient(140deg, #e2e0f4 0%, #b4b0e0 100%)",
        thumbnailImage: "/images/thumbnails/upgrade-flow-redesign.png",
        year: "2024",
      },
    ],
  },
  {
    company: "Kong",
    context: "API management and gateway infrastructure",
    projects: [
      {
        category: "Infrastructure UX",
        title: "Serverless Gateways",
        description: "Turning complex infrastructure setup into a zero-to-one experience developers could complete in minutes.",
        slug: "serverless-gateways",
        thumbnail: "linear-gradient(140deg, #f0e8df 0%, #d4c0aa 100%)",
        thumbnailImage: "/images/thumbnails/serverless-gateways.png",
        year: "2024",
      },
      {
        category: "Developer Education",
        title: "Learning Hub",
        description: "A developer-first education portal built to reduce time-to-value across the Konnect platform.",
        slug: "learning-hub",
        thumbnail: "linear-gradient(140deg, #ede4da 0%, #ccb89e 100%)",
        thumbnailImage: "/images/thumbnails/learning-hub.png",
        year: "2024",
      },
      {
        category: "Growth",
        title: "Konnect Plus Trial",
        description: "Self-serve trial flows that converted enterprise prospects without high-touch sales.",
        slug: "konnect-plus-trial",
        thumbnail: "linear-gradient(140deg, #eae0d4 0%, #c8b09a 100%)",
        thumbnailImage: "/images/thumbnails/konnect-plus-trial.png",
        year: "2024",
      },
    ],
  },
  {
    company: "Postman",
    context: "API development platform",
    projects: [
      {
        category: "Growth",
        title: "Notification Center 2.0",
        description: "Redesigning how 25M+ users stay informed across a complex collaborative platform.",
        slug: "notification-center",
        thumbnail: "linear-gradient(140deg, #f4e8da 0%, #e0c8a4 100%)",
        thumbnailImage: "/images/thumbnails/notification-center.png",
        year: "2023",
      },
      {
        category: "Collaboration",
        title: "Domain Visibility",
        description: "Making team boundaries legible inside invite flows to reduce workspace confusion.",
        slug: "domain-visibility",
        thumbnail: "linear-gradient(140deg, #f0e4d4 0%, #d8c098 100%)",
        thumbnailImage: "/images/thumbnails/domain-visibility.png",
        year: "2022",
      },
    ],
  },
  {
    company: "Google",
    context: "Android developer tooling",
    projects: [
      {
        category: "Developer Tools",
        title: "Layout Inspector 2.0",
        description: "Giving Android developers a live, hierarchical view of their UI at runtime.",
        slug: "layout-inspector",
        thumbnail: "linear-gradient(140deg, #ddf0ec 0%, #a8d4cc 100%)",
        thumbnailImage: "/images/thumbnails/layout-inspector.png",
        year: "2020",
      },
      {
        category: "Developer Tools",
        title: "Resource Management",
        description: "0-to-1 asset management for Android Studio, serving a community of 2.5M+ developers.",
        slug: "resource-management",
        thumbnail: "linear-gradient(140deg, #d8eee8 0%, #a0ccbf 100%)",
        thumbnailImage: "/images/thumbnails/resource-management.png",
        year: "2019",
      },
    ],
  },
  {
    company: "Microsoft",
    context: "Azure cloud database infrastructure",
    projects: [
      {
        category: "Cloud Infrastructure",
        title: "Azure SQL Overview",
        description: "Redesigning the entry point for enterprise cloud database management at global scale.",
        slug: "azure-sql-overview",
        thumbnail: "linear-gradient(140deg, #dde4f0 0%, #a8b8d8 100%)",
        thumbnailImage: "/images/thumbnails/azure-sql-overview.png",
        year: "2017",
      },
      {
        category: "Cloud Infrastructure",
        title: "Azure SQL Resources & Pricing",
        description: "Making complex pricing tiers and resource configuration legible for enterprise buyers.",
        slug: "azure-sql-resources",
        thumbnail: "linear-gradient(140deg, #d8dff0 0%, #a0aed4 100%)",
        thumbnailImage: "/images/thumbnails/azure-sql-resources.png",
        year: "2016",
      },
    ],
  },
];

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
          style={{
            width: "100%",
            aspectRatio: "3/2",
            borderRadius: "6px",
            overflow: "hidden",
            marginBottom: "16px",
            transition: "opacity 0.2s ease",
            opacity: hovered ? 0.85 : 1,
            background: project.thumbnail,
            border: project.thumbnailImage ? "1px solid var(--border)" : "none",
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
