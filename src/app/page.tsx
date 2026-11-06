import type { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import Hero from "@/components/sections/Hero";
import DesignIntent from "@/components/sections/DesignIntent";
import ProjectList from "@/components/sections/ProjectList";
import ClientLogos from "@/components/sections/ClientLogos";
import Testimonials from "@/components/sections/Testimonials";
import PortfolioMasonry from "@/components/sections/PortfolioMasonry";
import ContactSection from "@/components/sections/ContactSection";

// Force SSR so the gallery shuffles on each load
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ferg Flannery – Lead Creative Consultant & Web Accessibility Expert",
  description:
    "Ferg Flannery, Lead Creative Consultant and Lead Web Accessibility Expert. Digital delivery, creative direction and WCAG 2.2 AA accessibility for national programmes, agencies and brands. Based in Cork, available for freelance and contract work.",
};

export default function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <DesignIntent />
      <ProjectList />
      <ClientLogos />
      <Testimonials />
      <PortfolioMasonry />
      <ContactSection />
    </SiteLayout>
  );
}
