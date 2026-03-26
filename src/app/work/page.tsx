import type { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import LogoMarquee from "@/components/sections/LogoMarquee";
import IntroStrip from "@/components/sections/IntroStrip";
import ProjectList from "@/components/sections/ProjectList";
import ClientLogos from "@/components/sections/ClientLogos";

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
        ornamentSrc="/images/ring.png"
        ornamentWidth={281}
        ornamentHeight={281}
        ornamentAos="fade"
        ornamentAosDuration="950"
        align="right"
        arrowHref="#selected-work"
        split={false}
      />
      <ProjectList />
      <ClientLogos />
    </SiteLayout>
  );
}
