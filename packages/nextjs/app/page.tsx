import Hero from "./components/Hero";
import HowItWorks from "./components/HowItsWork";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
    </main>
  );
}
