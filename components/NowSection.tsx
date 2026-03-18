"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function NowSection() {
  return (
    <section className="w-full px-6 md:px-12 pb-24">
      <div className="max-w-5xl mx-auto" style={{ borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "12px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: "16px",
          }}
        >
          Now
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: EASE }}
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "15px",
            lineHeight: 1.7,
            color: "var(--text-muted)",
            margin: "0 0 20px",
            maxWidth: "540px",
          }}
        >
          Right now I&apos;m thinking about trust: specifically, how much of it
          AI tools have actually earned versus assumed. Watching how background
          agents and parallel workflows are reshaping what engineering work even
          needs to be real-time anymore.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.4 }}
        >
          <Link
            href="/thinking"
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "12px",
              letterSpacing: "0.06em",
              color: "var(--text-muted)",
              textDecoration: "none",
              borderBottom: "1px solid var(--border)",
              paddingBottom: "1px",
              lineHeight: 1,
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            More on this
            <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
