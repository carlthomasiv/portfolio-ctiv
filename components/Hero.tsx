"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: EASE },
  }),
};

export function Hero() {
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
            Currently designing at{" "}
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
