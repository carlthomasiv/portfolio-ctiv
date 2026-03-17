"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import type { CaseStudy, Block, InlineBlock, Section } from "@/data/case-studies";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Wraps numbers and percentage/unit patterns in medium-weight spans
function renderWithNumbers(text: string) {
  const pattern = /([<>~+]?\d[\d,]*\.?\d*\s*(?:%|\+|s\b|x\b|ms\b|min\b|k\b|M\b)?)/g;
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    if (/^[<>~+]?\d[\d,]*\.?\d*\s*(?:%|\+|s|x|ms|min|k|M)?$/.test(part.trim()) && part.trim() !== "") {
      return <span key={i} style={{ fontWeight: 500, color: "var(--text)" }}>{part}</span>;
    }
    return part;
  });
}

function InlineBlockRenderer({ block }: { block: InlineBlock }) {
  switch (block.type) {
    case "text":
      return (
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "15px",
            lineHeight: 1.75,
            color: "var(--text-muted)",
            marginBottom: "16px",
          }}
        >
          {block.content}
        </p>
      );
    case "heading":
      return (
        <h3
          style={{
            fontFamily: "var(--font-dm-serif-display)",
            fontSize: "22px",
            fontWeight: 400,
            color: "var(--text)",
            marginBottom: "10px",
            marginTop: "24px",
          }}
        >
          {block.content}
        </h3>
      );
    case "list":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
          {block.items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "10px" }}>
              <span
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "14px",
                  color: "var(--text-muted)",
                  flexShrink: 0,
                  lineHeight: 1.65,
                }}
              >
                &bull;
              </span>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "15px",
                  lineHeight: 1.65,
                  color: "var(--text-muted)",
                }}
              >
                {renderWithNumbers(item)}
              </span>
            </div>
          ))}
        </div>
      );
    case "quote":
      return (
        <div
          style={{
            borderLeft: "2px solid var(--border)",
            paddingLeft: "16px",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-serif-display)",
              fontStyle: "italic",
              fontSize: "17px",
              lineHeight: 1.55,
              color: "var(--text)",
              margin: 0,
            }}
          >
            {block.content}
          </p>
          {block.attribution && (
            <p
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "11px",
                letterSpacing: "0.04em",
                color: "var(--text-muted)",
                margin: "6px 0 0",
              }}
            >
              {block.attribution}
            </p>
          )}
        </div>
      );
    case "image":
      return (
        <div style={{ marginBottom: "16px" }}>
          <img
            src={block.src}
            alt={block.alt}
            style={{ width: "100%", borderRadius: "4px", display: "block", border: "1px solid var(--border)" }}
          />
          {block.caption && (
            <p
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "12px",
                color: "var(--text-muted)",
                marginTop: "8px",
                marginBottom: 0,
              }}
            >
              {block.caption}
            </p>
          )}
        </div>
      );
    default:
      return null;
  }
}

function ImageGridBlock({ images, columns }: { images: { src: string; alt: string }[]; columns: number }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() => setActiveIndex(i => i !== null ? (i - 1 + images.length) % images.length : null), [images.length]);
  const next = useCallback(() => setActiveIndex(i => i !== null ? (i + 1) % images.length : null), [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, prev, next]);

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "12px",
          width: "100%",
          marginBottom: "32px",
        }}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              display: "block",
              padding: 0,
              background: "none",
              border: "none",
              cursor: "zoom-in",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                transition: "opacity 0.15s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(20px) saturate(0.8)",
            WebkitBackdropFilter: "blur(20px) saturate(0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            cursor: "zoom-out",
          }}
        >
          {/* Image */}
          <img
            src={active.src}
            alt={active.alt}
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              borderRadius: "8px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
              display: "block",
            }}
            onClick={e => e.stopPropagation()}
          />

          {/* Footer: prev / label / next */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              marginTop: "20px",
            }}
          >
            <button
              onClick={prev}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "6px",
                color: "rgba(255,255,255,0.8)",
                fontFamily: "var(--font-dm-mono)",
                fontSize: "13px",
                padding: "6px 14px",
                cursor: "pointer",
                letterSpacing: "0.04em",
              }}
            >
              ←
            </button>
            <span
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "12px",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.6)",
                textAlign: "center",
                maxWidth: "320px",
              }}
            >
              {active.alt}
              <span style={{ opacity: 0.4, marginLeft: "12px" }}>
                {(activeIndex ?? 0) + 1} / {images.length}
              </span>
            </span>
            <button
              onClick={next}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "6px",
                color: "rgba(255,255,255,0.8)",
                fontFamily: "var(--font-dm-mono)",
                fontSize: "13px",
                padding: "6px 14px",
                cursor: "pointer",
                letterSpacing: "0.04em",
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function LightboxImage({ src, alt, caption, style }: { src: string; alt: string; caption?: string; style?: React.CSSProperties }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div style={{ cursor: "zoom-in" }} onClick={() => setOpen(true)}>
        <img
          src={src}
          alt={alt}
          style={{
            ...style,
            transition: "opacity 0.15s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        />
        {caption && (
          <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.04em", color: "var(--text-muted)", margin: "8px 0 0" }}>
            {caption}
          </p>
        )}
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(20px) saturate(0.8)",
            WebkitBackdropFilter: "blur(20px) saturate(0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            cursor: "zoom-out",
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{ maxWidth: "100%", maxHeight: "85vh", borderRadius: "8px", boxShadow: "0 24px 80px rgba(0,0,0,0.4)", display: "block" }}
            onClick={e => e.stopPropagation()}
          />
          {alt && (
            <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.06em", color: "rgba(255,255,255,0.5)", marginTop: "16px" }}>
              {alt}
            </p>
          )}
        </div>
      )}
    </>
  );
}

function SlideshowBlock({ images }: { images: { src: string; alt: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    isDragging.current = true;
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
    ref.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    ref.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (ref.current) ref.current.style.cursor = "grab";
  };

  return (
    <div
      ref={ref}
      className="no-scrollbar"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{
        overflowX: "auto",
        display: "flex",
        gap: "12px",
        scrollSnapType: "x mandatory",
        paddingBottom: "16px",
        marginBottom: "24px",
        cursor: "grab",
        userSelect: "none",
      }}
    >
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            flexShrink: 0,
            width: "82%",
            scrollSnapAlign: "start",
          }}
        >
          <img
            src={img.src}
            alt={img.alt}
            draggable={false}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              display: "block",
            }}
          />
        </div>
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return (
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "15px",
            lineHeight: 1.75,
            color: "var(--text-muted)",
            marginBottom: "20px",
          }}
        >
          {renderWithNumbers(block.content)}
        </p>
      );

    case "heading":
      return (
        <h3
          style={{
            fontFamily: "var(--font-dm-serif-display)",
            fontSize: "26px",
            fontWeight: 400,
            color: "var(--text)",
            marginBottom: "12px",
            marginTop: "32px",
          }}
        >
          {block.content}
        </h3>
      );

    case "image":
      return (
        <div style={{ marginBottom: "32px" }}>
          <img
            src={block.src}
            alt={block.alt}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              display: "block",
              marginBottom: block.caption ? "8px" : "0",
            }}
          />
          {block.caption && (
            <p
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "11px",
                letterSpacing: "0.04em",
                color: "var(--text-muted)",
                margin: 0,
              }}
            >
              {block.caption}
            </p>
          )}
        </div>
      );

    case "video":
      return (
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              borderRadius: "8px",
              border: "1px solid var(--border)",
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${block.youtubeId}`}
              title="Embedded video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
          {block.caption && (
            <p
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "11px",
                letterSpacing: "0.04em",
                color: "var(--text-muted)",
                margin: "8px 0 0",
              }}
            >
              {block.caption}
            </p>
          )}
        </div>
      );

    case "slideshow":
      return <SlideshowBlock images={block.images} />;

    case "image-aside": {
      return (
        <div
          style={{
            display: "grid",
            gap: "40px",
            alignItems: "start",
            marginBottom: "40px",
          }}
          className="grid-cols-1 md:[grid-template-columns:3fr_2fr]"
        >
          <div>
            {block.children.map((child, i) => (
              <InlineBlockRenderer key={i} block={child} />
            ))}
          </div>
          <div>
            <LightboxImage
              src={block.image.src}
              alt={block.image.alt}
              caption={block.image.caption}
              style={{ width: "100%", height: "auto", borderRadius: "8px", border: "1px solid var(--border)", display: "block" }}
            />
          </div>
        </div>
      );
    }

    case "video-aside": {
      return (
        <div
          style={{
            display: "grid",
            gap: "40px",
            alignItems: "start",
            marginBottom: "40px",
          }}
          className="grid-cols-1 md:[grid-template-columns:2fr_3fr]"
        >
          <div>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: "8px",
                border: "1px solid var(--border)",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${block.youtubeId}`}
                title="Embedded video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>
          </div>
          <div>
            {block.children.map((child, i) => (
              <InlineBlockRenderer key={i} block={child} />
            ))}
          </div>
        </div>
      );
    }

    case "image-aside-stack": {
      return (
        <div
          style={{
            display: "grid",
            gap: "40px",
            alignItems: "start",
            marginBottom: "40px",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          <div>
            {block.children.map((child, i) => (
              <InlineBlockRenderer key={i} block={child} />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {block.images.map((img, i) => (
              <LightboxImage
                key={i}
                src={img.src}
                alt={img.alt}
                caption={img.caption}
                style={{ width: "100%", height: "auto", borderRadius: "8px", border: "1px solid var(--border)", display: "block" }}
              />
            ))}
          </div>
        </div>
      );
    }

    case "image-grid":
      return <ImageGridBlock images={block.images} columns={block.columns ?? 2} />;

    case "comparison": {
      const colStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      };
      const stepStyle: React.CSSProperties = {
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
      };
      const numStyle: React.CSSProperties = {
        fontFamily: "var(--font-dm-mono)",
        fontSize: "11px",
        letterSpacing: "0.04em",
        color: "var(--text-muted)",
        flexShrink: 0,
        paddingTop: "2px",
        minWidth: "18px",
      };
      const stepTextStyle: React.CSSProperties = {
        fontFamily: "var(--font-dm-sans)",
        fontSize: "15px",
        lineHeight: 1.6,
        color: "var(--text-muted)",
      };
      const noteStyle: React.CSSProperties = {
        fontFamily: "var(--font-dm-mono)",
        fontSize: "12px",
        letterSpacing: "0.03em",
        color: "var(--text-muted)",
        marginTop: "16px",
        paddingTop: "16px",
        borderTop: "1px solid var(--border)",
      };
      return (
        <div
          style={{ display: "grid", gap: "32px", marginBottom: "40px" }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Before */}
          <div style={{ padding: "24px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px" }}>
            <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 20px" }}>
              {block.before.label}
            </p>
            <div style={colStyle}>
              {block.before.steps.map((step, i) => (
                <div key={i} style={stepStyle}>
                  <span style={numStyle}>{i + 1}.</span>
                  <span style={stepTextStyle}>
                    {step.text}{step.warning && <span style={{ marginLeft: "6px" }}>⚠️</span>}
                  </span>
                </div>
              ))}
            </div>
            <p style={noteStyle}>{block.before.note}</p>
          </div>
          {/* After */}
          <div style={{ padding: "24px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px" }}>
            <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 20px" }}>
              {block.after.label}
            </p>
            <div style={colStyle}>
              {block.after.steps.map((step, i) => (
                <div key={i} style={stepStyle}>
                  <span style={numStyle}>{i + 1}.</span>
                  <span style={stepTextStyle}>{step.text}</span>
                </div>
              ))}
            </div>
            <p style={noteStyle}>{block.after.note}</p>
          </div>
        </div>
      );
    }

    case "ia-comparison": {
      const depthPad = [0, 12, 24, 36];
      const IACard = ({ side }: { side: typeof block.before }) => (
        <div style={{ padding: "24px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", display: "flex", flexDirection: "column" }}>
          <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 20px" }}>
            {side.label}
          </p>
          {/* IA tree */}
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "20px", flexGrow: 1 }}>
            {side.items.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", paddingLeft: `${depthPad[item.depth] ?? 0}px` }}>
                {item.depth > 0 && (
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "var(--text-muted)", opacity: 0.4, flexShrink: 0 }}>—</span>
                )}
                <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", color: item.depth === 0 ? "var(--text)" : "var(--text-muted)", letterSpacing: "0.02em" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
          {/* Separator */}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {side.notes.map((note, i) => (
              <div key={i} style={{ display: "flex", gap: "10px" }}>
                <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", color: "var(--text-muted)", flexShrink: 0 }}>&bull;</span>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", lineHeight: 1.6, color: "var(--text-muted)" }}>{note}</span>
              </div>
            ))}
          </div>
        </div>
      );
      return (
        <div style={{ display: "grid", gap: "16px", marginBottom: "40px" }} className="grid-cols-1 md:grid-cols-2">
          <IACard side={block.before} />
          <IACard side={block.after} />
        </div>
      );
    }

    case "metrics": {
      const parseValue = (val: string) => {
        const match = val.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
        if (!match) return { prefix: "", number: val, suffix: "" };
        return { prefix: match[1], number: match[2], suffix: match[3] };
      };
      return (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: "32px",
            paddingTop: "32px",
            paddingBottom: "32px",
            marginBottom: "20px",
          }}
        >
          {block.items.map((item) => {
            const { prefix, number, suffix } = parseValue(item.value);
            return (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "baseline", lineHeight: 1 }}>
                  {prefix && (
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "20px", fontWeight: 700, color: "var(--text)", marginRight: "2px" }}>
                      {prefix}
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: "var(--font-dm-serif-display)",
                      fontSize: "52px",
                      fontWeight: 400,
                      color: "var(--text)",
                      lineHeight: 1,
                    }}
                  >
                    {number}
                  </span>
                  {suffix && (
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "20px", fontWeight: 700, color: "var(--text)", marginLeft: "3px" }}>
                      {suffix}
                    </span>
                  )}
                </div>
                {item.trend === "up" && (
                  <TrendingUp size={18} strokeWidth={1.5} style={{ color: "var(--green-tag-text)", flexShrink: 0, marginBottom: "4px" }} />
                )}
                {item.trend === "down" && (
                  <TrendingDown size={18} strokeWidth={1.5} style={{ color: "var(--green-tag-text)", flexShrink: 0, marginBottom: "4px" }} />
                )}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--text-muted)",
                }}
              >
                {item.label}
              </span>
            </div>
            );
          })}
        </div>
      );
    }

    case "two-col":
      return (
        <div
          style={{ display: "grid", gap: "40px", marginBottom: "32px" }}
          className="grid-cols-1 md:grid-cols-2"
        >
          <div>{block.left.map((child, i) => <InlineBlockRenderer key={i} block={child} />)}</div>
          <div>{block.right.map((child, i) => <InlineBlockRenderer key={i} block={child} />)}</div>
        </div>
      );

    case "quote-list":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          {block.items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "var(--font-dm-serif-display)", fontSize: "24px", lineHeight: 1, color: "var(--border)", flexShrink: 0, marginTop: "2px" }}>&ldquo;</span>
              <div>
                <p style={{ fontFamily: "var(--font-dm-serif-display)", fontStyle: "italic", fontSize: "17px", lineHeight: 1.55, color: "var(--text)", margin: 0 }}>
                  {item.text}
                </p>
                {item.attribution && (
                  <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "0.04em", color: "var(--text-muted)", margin: "4px 0 0" }}>
                    {item.attribution}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      );

    case "quote":
      return (
        <div
          style={{
            borderLeft: "2px solid var(--border)",
            paddingLeft: "20px",
            marginTop: "32px",
            marginBottom: "32px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-serif-display)",
              fontStyle: "italic",
              fontSize: "20px",
              lineHeight: 1.5,
              color: "var(--text)",
              margin: 0,
            }}
          >
            {block.content}
          </p>
          {block.attribution && (
            <p
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "12px",
                letterSpacing: "0.04em",
                color: "var(--text-muted)",
                margin: "8px 0 0",
              }}
            >
              {block.attribution}
            </p>
          )}
        </div>
      );

    case "list":
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          {block.items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "10px" }}>
              <span
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "14px",
                  color: "var(--text-muted)",
                  flexShrink: 0,
                  lineHeight: 1.65,
                }}
              >
                &bull;
              </span>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "15px",
                  lineHeight: 1.65,
                  color: "var(--text-muted)",
                }}
              >
                {renderWithNumbers(item)}
              </span>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

function SectionRenderer({ section, index }: { section: Section; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.08, duration: 0.6, ease: EASE }}
      style={{ marginBottom: "56px" }}
    >
      {section.label && (
        <p
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            borderBottom: "1px solid var(--border)",
            paddingBottom: "12px",
            marginBottom: "32px",
            margin: "0 0 0",
          }}
        >
          {section.label}
        </p>
      )}
      {section.label && (
        <div style={{ marginBottom: "32px" }} />
      )}
      <div>
        {section.blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>
    </motion.div>
  );
}

export function CaseStudyContent({ study }: { study: CaseStudy }) {
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
              transition: "opacity 0.15s ease",
            }}
            className="hover:opacity-100"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Work
          </Link>
        </motion.div>

        {/* Header */}
        <header style={{ paddingTop: "40px", paddingBottom: "48px" }}>
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
              margin: "0 0 16px",
            }}
          >
            {study.company} &middot; {study.category}
          </motion.p>

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
            {study.title}
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
            {study.description}
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
            {study.role} &middot; {study.period}
          </motion.p>
        </header>

        {/* Hero image */}
        {study.heroImage && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7, ease: EASE }}
            style={{ marginBottom: "64px" }}
          >
            <img
              src={study.heroImage}
              alt={study.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                display: "block",
              }}
            />
          </motion.div>
        )}

        {/* Sections */}
        {study.sections.length > 0 ? (
          <div>
            {study.sections.map((section, i) => (
              <SectionRenderer key={i} section={section} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            style={{
              paddingTop: "48px",
              paddingBottom: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                margin: 0,
              }}
            >
              Case study in progress
            </p>
          </motion.div>
        )}

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
              transition: "opacity 0.15s ease",
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
