"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { CaseStudyFrontmatter } from "@/lib/mdx-case-study";
import { allProjects } from "@/data/work-projects";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function MdxCaseStudyContent({
  frontmatter,
  slug,
  children,
}: {
  frontmatter: CaseStudyFrontmatter;
  slug: string;
  children: React.ReactNode;
}) {
  const disciplines = allProjects.find((p) => p.slug === slug)?.disciplines ?? [];

  return (
    <div className="w-full px-6 md:px-12" style={{ paddingBottom: "96px" }}>
      <div className="max-w-5xl mx-auto">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4, ease: EASE }}
          style={{ paddingTop: "32px", marginBottom: "8px" }}
        >
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-dm-mono)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
            className="hover:opacity-100"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Work
          </Link>
        </motion.div>

        {/* Header */}
        <header style={{ paddingTop: "40px", paddingBottom: "48px" }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
            style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", margin: "0 0 16px" }}
          >
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              {frontmatter.company}
            </span>
            {disciplines.length > 0 && (
              <>
                <span style={{ color: "var(--text-muted)", opacity: 0.4, fontSize: "12px" }}>·</span>
                {disciplines.map((d) => (
                  <span
                    key={d}
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
                    {d}
                  </span>
                ))}
              </>
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
            style={{
              fontFamily: "var(--font-dm-serif-display)",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "var(--text)",
              margin: "0 0 20px",
            }}
          >
            {frontmatter.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "16px",
              lineHeight: 1.6,
              color: "var(--text-muted)",
              margin: "0 0 24px",
            }}
          >
            {frontmatter.description}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: EASE }}
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "12px",
              letterSpacing: "0.06em",
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            {frontmatter.role} &middot; {frontmatter.period}
          </motion.p>
        </header>

        {/* Hero image */}
        {frontmatter.heroImage && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7, ease: EASE }}
            style={{ marginBottom: "64px" }}
          >
            <img
              src={frontmatter.heroImage}
              alt={frontmatter.title}
              style={{ width: "100%", height: "auto", borderRadius: "8px", border: "1px solid var(--border)", display: "block" }}
            />
          </motion.div>
        )}

        {/* MDX body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32, duration: 0.5 }}
        >
          {children}
        </motion.div>

        {/* Bottom nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{ paddingTop: "56px" }}
        >
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-dm-mono)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
            className="hover:opacity-100"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back to work
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
