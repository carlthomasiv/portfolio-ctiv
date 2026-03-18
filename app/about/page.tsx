import { Footer } from "@/components/Footer";
import { AboutContent } from "@/components/AboutContent";

export const metadata = {
  title: "About — Carl Thomas",
  description: "Design leader with 13 years at the infrastructure layer: developer tools, AI platforms, and the complex systems engineers trust to work.",
};

export default function AboutPage() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <AboutContent />
      <Footer />
    </main>
  );
}
