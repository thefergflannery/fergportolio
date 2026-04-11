import type { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import Hero from "@/components/sections/Hero";
import DesignIntent from "@/components/sections/DesignIntent";
import ProjectList from "@/components/sections/ProjectList";
import ClientLogos from "@/components/sections/ClientLogos";
import Testimonials from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Ferg Flannery – Creative Consultant",
  description:
    "Creative Consultant, Art Director, Visual Designer. 25+ years across the creative landscape from concept to creation.",
};

export default function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <DesignIntent />
      <ProjectList />
      <ClientLogos />
      <Testimonials />
    </SiteLayout>
  );
}
