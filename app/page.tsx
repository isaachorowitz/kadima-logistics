import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import CredibilityBar from "@/components/sections/CredibilityBar";
import ProblemSection from "@/components/sections/ProblemSection";
import HowItWorks from "@/components/sections/HowItWorks";
import ServicesGrid from "@/components/sections/ServicesGrid";
import DHLSpotlight from "@/components/sections/DHLSpotlight";
import StatsBar from "@/components/sections/StatsBar";
import WhyKadima from "@/components/sections/WhyKadima";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import ShippingCalculator from "@/components/sections/ShippingCalculator";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CredibilityBar />
        <ProblemSection />
        <HowItWorks />
        <ShippingCalculator />
        <ServicesGrid />
        <DHLSpotlight />
        <StatsBar />
        <WhyKadima />
        <Testimonials />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
