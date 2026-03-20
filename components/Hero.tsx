"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SESSION_KEY = "hero-verb-played";
// Sequence ends on "designing" — the true role — so the line settles factually correct
const SEQUENCE = ["building", "coding", "creating", "designing"];
const WORD_DURATION = 2600; // ms per word

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: EASE },
  }),
};

export function Hero() {
  const [word, setWord] = useState("designing");
  const [cycling, setCycling] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, "1");

    // Batch: jump to first word and mark as cycling — no entry animation on "building"
    setWord(SEQUENCE[0]);
    setCycling(true);

    // Schedule remaining words
    SEQUENCE.slice(1).forEach((w, i) => {
      setTimeout(() => setWord(w), (i + 1) * WORD_DURATION);
    });
  }, []);

  return (
    <section className="w-full px-6 md:px-12 pt-20 pb-24">
      <div className="max-w-5xl mx-auto">
      <div className="max-w-2xl flex flex-col gap-6">

        {/* Availability */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center gap-2.5"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{ backgroundColor: "#22c55e" }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: "#22c55e" }}
            />
          </span>
          <span
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "12px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Currently{" "}
            {/* Ghost "designing" holds max-width so the line never shifts */}
            <span style={{ display: "inline-grid", position: "relative" }}>
              <span style={{ visibility: "hidden", pointerEvents: "none", gridArea: "1/1" }}>
                designing
              </span>
              <span style={{ gridArea: "1/1", display: "flex", alignItems: "center" }}>
                {cycling ? (
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={word}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      style={{ display: "block" }}
                    >
                      {word}
                    </motion.span>
                  </AnimatePresence>
                ) : (
                  <span>{word}</span>
                )}
              </span>
            </span>
            {" "}at{" "}
          <a
            href="https://ona.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover"
            style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            Ona
          </a>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-dm-serif-display)",
            fontSize: "clamp(28px, 4vw, 42px)",
            lineHeight: 1.2,
            fontWeight: 400,
            color: "var(--text)",
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          Most AI products are designed for the moment of wonder. I&apos;m more
          interested in what happens after.
        </motion.h1>

        {/* Intro */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "16px",
            lineHeight: 1.7,
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          I&apos;m Carl Thomas, a design leader with a decade at the
          infrastructure layer. Currently at Ona, building the interface between
          developers and their AI agents. Before that: Neon, Kong, Postman,
          Google, Microsoft.
        </motion.p>

      </div>
      </div>
    </section>
  );
}
