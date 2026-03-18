import { Header } from "@/components/homepage/Header/Header";
import { HeroSection } from "@/components/homepage/HeroSection/HeroSection";
import { HowItWorks } from "@/components/homepage/HowItWorks/HowItWorks";
import { Footer } from "@/components/homepage/Footer/Footer";
import { MatchTechStructuredData } from "@/components/seo/MatchTechStructuredData";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { HOMEPAGE_DESCRIPTION, HOMEPAGE_TITLE, HOMEPAGE_OG_IMAGE_SLUG } from "@/lib/seo/site";

export const metadata: Metadata = createPageMetadata({
  pathname: "/",
  title: HOMEPAGE_TITLE,
  description: HOMEPAGE_DESCRIPTION,
  ogImageSlug: HOMEPAGE_OG_IMAGE_SLUG,
});

export default function Home() {
  return (
    <div className="home-bg">
      <MatchTechStructuredData
        page="home"
        path="/"
        title={HOMEPAGE_TITLE}
        description={HOMEPAGE_DESCRIPTION}
      />
      <div className="home-bg-spacer" aria-hidden="true" />
      <Header />
      <HeroSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}
