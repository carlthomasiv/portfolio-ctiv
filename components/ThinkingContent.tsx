"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { posts } from "@/data/posts";
import type { Post } from "@/data/posts";

// Static dot-grid thumbnail — frozen radial ripple from center, same visual language as PostHero
const THUMB_CELL       = 12;   // denser grid so wave pattern has enough points to read
const THUMB_FREQ       = 0.10; // slightly tighter frequency for legibility at small size
const THUMB_PHASE      = 26;   // frozen distance offset → ripple caught mid-expansion
const THUMB_FALLOFF    = 0.014; // softer falloff so ring stays visible toward edges
const THUMB_SIZE_BASE  = 5.5;  // larger resting size
const THUMB_SIZE_DELTA = 4.0;  // wider gap between crest and trough — wave reads clearly
const THUMB_OP_MIN     = 0.06;
const THUMB_OP_MAX     = 0.55; // brighter peak so the ring pops

function PostThumbnailCanvas() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w   = container.offsetWidth;
    const h   = container.offsetHeight;

    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width  = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--text").trim() || "#111318";

    ctx.textAlign    = "center";
    ctx.textBaseline = "middle";

    const cx   = w / 2;
    const cy   = h / 2;
    const cols = Math.ceil(w / THUMB_CELL) + 1;
    const rows = Math.ceil(h / THUMB_CELL) + 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x    = col * THUMB_CELL + THUMB_CELL / 2;
        const y    = row * THUMB_CELL + THUMB_CELL / 2;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);

        // Frozen ripple: cosine wave of radial distance with edge falloff
        const wave    = Math.cos((dist - THUMB_PHASE) * THUMB_FREQ) * Math.exp(-dist * THUMB_FALLOFF);
        const t01     = (wave + 1) / 2;
        const size    = THUMB_SIZE_BASE + t01 * THUMB_SIZE_DELTA;
        const opacity = THUMB_OP_MIN + t01 * (THUMB_OP_MAX - THUMB_OP_MIN);

        ctx.font        = `400 ${size.toFixed(1)}px "DM Mono", monospace`;
        ctx.globalAlpha = opacity;
        ctx.fillStyle   = color;
        ctx.fillText("·", x, y);
      }
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative", background: "var(--bg)" }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const publications = [
  {
    title: "Designing for Collaboration: How we rethought Ona conversations",
    description: "How we stripped away the noise so you and the agent can focus on the same goal.",
    role: "Author",
    publisher: "Ona",
    year: "2025",
    href: "https://ona.com/stories/redesigning-ona-conversations",
  },
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


function PostRow({ post, index }: { post: Post; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 + index * 0.07, duration: 0.5, ease: EASE }}
    >
      <Link
        href={`/thinking/${post.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ textDecoration: "none", display: "block" }}
      >
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "28px", paddingBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "stretch", gap: "24px" }}>

            {/* Thumbnail — fills full row height */}
            <div
              className="hidden sm:flex"
              style={{ flexShrink: 0, width: "88px" }}
            >
              <div
                style={{
                  flex: 1,
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  transition: "opacity 0.2s ease",
                  opacity: hovered ? 0.85 : 1,
                }}
              >
                {post.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.thumbnail}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <PostThumbnailCanvas />
                )}
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                  {post.date}
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: "12px", opacity: 0.5 }}>·</span>
                <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.04em", color: "var(--text-muted)", opacity: 0.6 }}>
                  {post.readTime} min read
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
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
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 400, lineHeight: 1.25, letterSpacing: "-0.01em", color: "var(--text)", margin: "0 0 10px", opacity: hovered ? 1 : 0.9, transition: "opacity 0.15s ease" }}>
                {post.title}
              </h2>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", lineHeight: 1.65, color: "var(--text-muted)", margin: 0, maxWidth: "560px" }}>
                {post.excerpt}
              </p>
            </div>

            {/* Arrow */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="hidden md:flex"
              style={{ color: "var(--text-muted)", paddingTop: "14px", flexShrink: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ThinkingContent() {
  return (
    <div className="w-full px-6 md:px-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <section style={{ paddingTop: "clamp(40px, 6vw, 80px)", paddingBottom: "64px" }}>
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
            className="max-w-2xl"
            style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--text)", margin: "0 0 16px" }}
          >
            On design, infrastructure, and how AI changes both.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-2xl"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", lineHeight: 1.65, color: "var(--text-muted)", margin: 0 }}
          >
            Essays and posts on the problems worth thinking about — developer experience, AI-native workflows, and what it means to design for experts.
          </motion.p>
        </section>

        {/* Internal posts */}
        {posts.length > 0 && (
          <section style={{ paddingBottom: "64px" }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.22, duration: 0.4 }}
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "4px",
                opacity: 0.6,
              }}
            >
              Notes
            </motion.p>
            {posts.map((post, i) => (
              <PostRow key={post.slug} post={post} index={i} />
            ))}
          </section>
        )}

        {/* External publications */}
        <section style={{ paddingBottom: "96px" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "4px",
              opacity: 0.6,
            }}
          >
            Published elsewhere
          </motion.p>
          {publications.map((pub, i) => (
            <PublicationRow key={pub.title} pub={pub} index={i} />
          ))}
        </section>

      </div>
    </div>
  );
}
