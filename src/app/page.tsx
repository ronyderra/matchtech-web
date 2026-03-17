import { Header } from "@/components/homepage/Header/Header";
import { HeroSection } from "@/components/homepage/HeroSection/HeroSection";
import { HowItWorks } from "@/components/homepage/HowItWorks/HowItWorks";
import { Footer } from "@/components/homepage/Footer/Footer";

export default function Home() {
  return (
    <div className="home-bg">
      <div className="home-bg-spacer" aria-hidden="true" />
      <Header />
      <HeroSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}
