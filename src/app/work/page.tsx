import type { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import LogoMarquee from "@/components/sections/LogoMarquee";
import IntroStrip from "@/components/sections/IntroStrip";
import ProjectList from "@/components/sections/ProjectList";
import ClientLogos from "@/components/sections/ClientLogos";
import PortfolioMasonry from "@/components/sections/PortfolioMasonry";
import WorkIntroScrollOut from "@/components/ui/WorkIntroScrollOut";

// Force SSR on every request so the gallery shuffles on each load
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Selected Work – Ferg Flannery",
  description: "Selected design and digital work by Ferg Flannery – Creative Consultant, Art Director, Visual Designer.",
};

export default function WorkPage() {
  return (
    <SiteLayout>
      <LogoMarquee />
      <WorkIntroScrollOut />
      <IntroStrip
        text="CREATIVE CONSULTANT. ART DIRECTOR. VISUAL DESIGNER. Photographer."
        modelSrc="/models/logo-green.glb"
        align="right"
        arrowHref="#selected-work"
        split={false}
        scrollOut
      />
      <ProjectList />
      <ClientLogos />
      <PortfolioMasonry />
    </SiteLayout>
  );
}
