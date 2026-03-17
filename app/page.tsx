import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WorkList } from "@/components/WorkList";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      <Nav />
      <main style={{ flex: 1 }}>
        <Hero />
        <WorkList />
      </main>
      <Footer />
    </div>
  );
}
