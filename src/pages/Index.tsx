import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import InfraAnimation from "@/components/InfraAnimation";
import ServicesSection from "@/components/ServicesSection";
import DevOpsMaturity from "@/components/DevOpsMaturity";
import ProcessSection from "@/components/ProcessSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import ClientsSection from "@/components/ClientsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CalendlyCTA from "@/components/CalendlyCTA";
import Footer from "@/components/Footer";
import FloatingContactButton from "@/components/FloatingContactButton";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      <FloatingContactButton />
      <main>
        <HeroSection />
        <AboutSection />
        <InfraAnimation />
        <ServicesSection />
        <DevOpsMaturity />
        <ProcessSection />
        <CaseStudiesSection />
        <ClientsSection />
        <TestimonialsSection />
        <FAQSection />
        <CalendlyCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
