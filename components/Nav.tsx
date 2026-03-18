"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { NavMark } from "./NavMark";

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <circle cx="7.5" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M2.93 2.93l1.06 1.06M11.01 11.01l1.06 1.06M2.93 12.07l1.06-1.06M11.01 3.99l1.06-1.06"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path
        d="M7.5 1.5A6 6 0 1 0 13.5 7.5 4.5 4.5 0 0 1 7.5 1.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const navLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Work", href: "/work" },
  { label: "Thinking", href: "/thinking" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const signatureFilter = theme === "dark"
    ? "invert(1) drop-shadow(0 0 0.4px rgba(255,255,255,0.6)) drop-shadow(0 0 0.4px rgba(255,255,255,0.6))"
    : "drop-shadow(0 0 0.4px rgba(0,0,0,0.5)) drop-shadow(0 0 0.4px rgba(0,0,0,0.5))";

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled ? "var(--bg-glass)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "background 0.25s ease, backdrop-filter 0.25s ease",
        }}
        className="w-full px-6 md:px-12 py-5"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="no-underline"
            style={{ lineHeight: 0 }}
          >
            <NavMark />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ label, href, external }) => {
              const isActive = !external && (href === "/" ? pathname === "/" : pathname.startsWith(href));
              return external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="[color:var(--text-muted)] hover:[color:var(--text)] transition-[color] duration-150"
                  style={{
                    fontFamily: "var(--font-dm-mono)",
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase" as const,
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className={`hover:[color:var(--text)] transition-[color] duration-150 ${isActive ? "[color:var(--text)]" : "[color:var(--text-muted)]"}`}
                  style={{
                    fontFamily: "var(--font-dm-mono)",
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase" as const,
                    textDecoration: "none",
                    position: "relative" as const,
                    paddingBottom: "3px",
                  }}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "1.5px",
                        backgroundColor: "var(--text)",
                        borderRadius: "1px",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="w-7 h-7 flex items-center justify-center [color:var(--text-muted)] hover:[color:var(--text)] transition-[color] duration-150 cursor-pointer bg-transparent border-0 p-0"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="w-7 h-7 flex items-center justify-center [color:var(--text-muted)] hover:[color:var(--text)] transition-[color] duration-150 cursor-pointer bg-transparent border-0 p-0"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="w-7 h-7 flex flex-col items-center justify-center gap-1.5 [color:var(--text-muted)] hover:[color:var(--text)] transition-[color] duration-150 cursor-pointer bg-transparent border-0 p-0"
            >
              <span style={{ display: "block", width: "18px", height: "1.2px", backgroundColor: "currentColor" }} />
              <span style={{ display: "block", width: "18px", height: "1.2px", backgroundColor: "currentColor" }} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Frosted overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 40,
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                backgroundColor: theme === "dark" ? "rgba(0,0,0,0.4)" : "rgba(250,250,250,0.5)",
              }}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "80%",
                zIndex: 50,
                background: "var(--bg)",
                borderLeft: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                padding: "20px 28px 32px",
              }}
            >
              {/* Drawer header — just close button */}
              <div className="flex items-center justify-end" style={{ marginBottom: "24px" }}>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  style={{ color: "var(--text-muted)" }}
                  className="w-7 h-7 flex items-center justify-center cursor-pointer bg-transparent border-0 p-0"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                    <path d="M2 2l11 11M13 2L2 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-col gap-2" style={{ flex: 1 }}>
                {navLinks.map(({ label, href, external }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.25, ease: "easeOut" }}
                  >
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setDrawerOpen(false)}
                        style={{
                          fontFamily: "var(--font-dm-serif-display)",
                          fontSize: "28px",
                          fontWeight: 400,
                          color: "var(--text)",
                          textDecoration: "none",
                          display: "block",
                          padding: "8px 0",
                        }}
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        onClick={() => setDrawerOpen(false)}
                        style={{
                          fontFamily: "var(--font-dm-serif-display)",
                          fontSize: "28px",
                          fontWeight: 400,
                          color: "var(--text)",
                          textDecoration: "none",
                          display: "block",
                          padding: "8px 0",
                        }}
                      >
                        {label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer — availability + socials */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                style={{ borderTop: "1px solid var(--border)", paddingTop: "24px", display: "flex", flexDirection: "column", gap: "16px" }}
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: "#22c55e" }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "#22c55e" }} />
                  </span>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                    Currently designing at Ona
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {[
                    { label: "LinkedIn", href: "https://linkedin.com/in/carlthomas" },
                    { label: "Bluesky", href: "https://bsky.app/profile/carlthomas.bsky.social" },
                    { label: "Email", href: "mailto:carl@carlthomas.design" },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.06em", color: "var(--text-muted)", textDecoration: "none" }}
                      className="hover:opacity-100 transition-opacity duration-200"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
