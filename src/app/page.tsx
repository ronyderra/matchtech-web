import { Header } from "@/components/homepage/Header/Header";
import { HeroSection } from "@/components/homepage/HeroSection/HeroSection";
import { HowItWorks } from "@/components/homepage/HowItWorks/HowItWorks";
import { OurMission } from "@/components/homepage/OurMission/OurMission";
import { Footer } from "@/components/homepage/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <HowItWorks />
      <OurMission />
      <Footer />
    </>
  );
}
