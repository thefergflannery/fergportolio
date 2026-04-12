import type { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import LogoMarquee from "@/components/sections/LogoMarquee";
import IntroStrip from "@/components/sections/IntroStrip";
import ProjectList from "@/components/sections/ProjectList";
import ClientLogos from "@/components/sections/ClientLogos";
import PortfolioMasonry from "@/components/sections/PortfolioMasonry";

export const metadata: Metadata = {
  title: "Selected Work – Ferg Flannery",
  description: "Selected design and digital work by Ferg Flannery – Creative Consultant, Art Director, Visual Designer.",
};

export default function WorkPage() {
  return (
    <SiteLayout>
      <LogoMarquee />
      <IntroStrip
        text="CREATIVE CONSULTANT. ART DIRECTOR. VISUAL DESIGNER. Photographer."
        modelSrc="/models/logo-green.glb"
        align="right"
        arrowHref="#selected-work"
        split={false}
      />
      <ProjectList />
      <PortfolioMasonry />
      <ClientLogos />
    </SiteLayout>
  );
}
