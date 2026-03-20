import { Hero } from "@/components/home/Hero";
import { StepGuide } from "@/components/home/StepGuide";
import { RaffleSection } from "@/components/raffle/RaffleSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />
      <StepGuide />
      <RaffleSection />
      <Footer />
    </main>
  );
}
