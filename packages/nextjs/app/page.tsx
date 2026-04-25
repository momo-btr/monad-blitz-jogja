import Hero from "./components/Hero";
import HowItWorks from "./components/HowItsWork";
import Stats from "./components/Stats";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Stats />
      <HowItWorks />
    </main>
  );
}
