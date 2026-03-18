"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Linkedin, Mail } from "lucide-react";

function BlueskyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.077 1.514.9 3.738.816 4.908.709 7.575 1.032 9.656c.496 3.084 2.21 4.96 4.654 5.5-2.444.54-4.158 2.416-4.654 5.5-.323 2.081-.216 4.748-.132 5.918.177 2.224 1.666 2.794 4.302.933 2.752-1.942 5.711-5.881 6.798-7.995zm0 0c1.087-2.114 4.046-6.053 6.798-7.995 2.636-1.861 4.125-1.291 4.302.933.084 1.17.191 3.837-.132 5.918-.496 3.084-2.21 4.96-4.654 5.5 2.444.54 4.158 2.416 4.654 5.5.323 2.081.216 4.748.132 5.918-.177 2.224-1.666 2.794-4.302.933-2.752-1.942-5.711-5.881-6.798-7.995z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/cthomasiv/",
    icon: <Linkedin size={15} strokeWidth={1.5} />,
  },
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/ctiv.bsky.social",
    icon: <BlueskyIcon />,
  },
  {
    label: "Email",
    href: "mailto:carlthomasiv@gmail.com",
    icon: <Mail size={15} strokeWidth={1.5} />,
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
