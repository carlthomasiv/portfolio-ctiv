import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, DM_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PageTransition } from "@/components/PageTransition";
import { Nav } from "@/components/Nav";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  title: "Carl Thomas — Systems Architect & Principal Product Designer",
  description:
    "Architecting the infrastructure of design. Specializing in AI-native workflows, developer experience (DX), and agentic systems.",
  metadataBase: new URL("https://www.carlthomasiv.com"),
  openGraph: {
    title: "Carl Thomas — Systems Architect",
    description: "Building mission control for developers and their AI agents.",
    url: "https://www.carlthomasiv.com",
    siteName: "Carl Thomas",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Carl Thomas — Systems Architect & Principal Product Designer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carl Thomas — Systems Architect",
    description: "Building mission control for developers and their AI agents.",
    images: ["/og-image.png"],
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
          <Nav />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
