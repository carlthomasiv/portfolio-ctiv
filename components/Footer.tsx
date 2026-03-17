"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <rect x="1" y="1" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M4 6v5M4 4v.5M7 11V8.5c0-1.38.896-2.5 2-2.5s2 1.12 2 2.5V11M7 6v5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BlueSkyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path
        d="M7.5 5.5C6.5 3.5 3 1.5 1.5 3c-1.5 1.5.5 4 2 5l4 3 4-3c1.5-1 3.5-3.5 2-5-1.5-1.5-5 .5-6 2.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <rect x="1" y="3" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 3.5l6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/carlthomas",
    icon: <LinkedInIcon />,
  },
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/carlthomas.bsky.social",
    icon: <BlueSkyIcon />,
  },
  {
    label: "Email",
    href: "mailto:carl@carlthomas.design",
    icon: <EmailIcon />,
  },
];

export function Footer() {
  const { theme } = useTheme();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      style={{ borderTop: "1px solid var(--border)" }}
      className="w-full px-6 md:px-12 py-8"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 400, color: "var(--text-muted)", lineHeight: 1 }}>
        Carl Thomas
      </span>

      {/* Social links */}
      <div className="flex items-center gap-5">
        {socialLinks.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            aria-label={label}
            style={{ color: "var(--text-muted)" }}
            className="flex items-center gap-1.5 no-underline hover:opacity-100 transition-opacity duration-200"
          >
            {icon}
            <span
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "12px",
                letterSpacing: "0.06em",
              }}
            >
              {label}
            </span>
          </a>
        ))}
      </div>
      </div>
    </motion.footer>
  );
}
