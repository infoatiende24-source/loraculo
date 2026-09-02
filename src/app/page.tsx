"use client";

import Navbar from "@/components/libertad/Navbar";
import HeroSection from "@/components/libertad/HeroSection";
import OracleSection from "@/components/libertad/OracleSection";
import ServicesSection from "@/components/libertad/ServicesSection";
import AboutSection from "@/components/libertad/AboutSection";
import TestimonialsSection from "@/components/libertad/TestimonialsSection";
import CTAFinalSection from "@/components/libertad/CTAFinalSection";
import Footer from "@/components/libertad/Footer";
import WhatsAppChat from "@/components/libertad/WhatsAppChat";
import CinematicIntro from "@/components/libertad/CinematicIntro";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <CinematicIntro />
      <Navbar />
      <HeroSection />
      <OracleSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <CTAFinalSection />
      <Footer />
      <WhatsAppChat />
    </main>
  );
}
