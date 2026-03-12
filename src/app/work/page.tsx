import type { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import LogoMarquee from "@/components/sections/LogoMarquee";
import ProjectList from "@/components/sections/ProjectList";
import Testimonials from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Selected Work – Ferg Flannery",
  description: "Selected design and digital work by Ferg Flannery – Creative Consultant, Art Director, Visual Designer.",
};

export default function WorkPage() {
  return (
    <SiteLayout>
      <LogoMarquee />
      <ProjectList />
      <Testimonials />
    </SiteLayout>
  );
}
