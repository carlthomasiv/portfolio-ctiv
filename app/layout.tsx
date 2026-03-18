import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, DM_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PageTransition } from "@/components/PageTransition";

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "600"],
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carl Thomas — Design Leader",
  description:
    "Design leader with a decade of experience at the infrastructure layer: developer tools, AI platforms, and complex systems engineers live inside every day.",
  openGraph: {
    title: "Carl Thomas — Design Leader",
    description:
      "Design leader specializing in developer tools, AI platforms, and infrastructure UX.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSerifDisplay.variable} ${dmSans.variable} ${dmMono.variable} ${caveat.variable}`}
      >
        <ThemeProvider>
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
