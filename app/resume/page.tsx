import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ResumeContent } from "@/components/ResumeContent";

export const metadata = {
  title: "Resume — Carl Thomas",
  description: "Principal Product Designer with 13 years at the infrastructure layer: developer tools, AI platforms, and the complex systems engineers trust to work.",
};

export default function ResumePage() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <ResumeContent />
      <Footer />
    </main>
  );
}
