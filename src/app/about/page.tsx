import type { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import LogoMarquee from "@/components/sections/LogoMarquee";
import Testimonials from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "About Me – Ferg Flannery",
  description: "Ferg Flannery – Creative Consultant, Art Director and Visual Designer with 25+ years experience.",
};

export default function AboutPage() {
  return (
    <SiteLayout>
      {/* GIF parallax hero */}
      <div className="cursor-hello-zone">
        <div
          className="js-cursor-target-container"
          style={{
            position: "relative",
            minHeight: "517px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Background GIF */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/images/gooseberry.gif)",
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
            }}
          />
          {/* Overlay */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#18242f",
              opacity: 0.5,
            }}
          />
        </div>
      </div>

      <LogoMarquee />

      {/* About content */}
      <div
        style={{
          maxWidth: "var(--wp--style--global--wide-size)",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "var(--wp--preset--spacing--50)",
          paddingRight: "var(--wp--preset--spacing--50)",
          paddingTop: "var(--wp--preset--spacing--70)",
          paddingBottom: "var(--wp--preset--spacing--70)",
        }}
      >
        <p
          style={{
            fontSize: "var(--wp--preset--font-size--x-large)",
            fontWeight: 300,
            lineHeight: 1.4,
            maxWidth: "720px",
          }}
        >
          Creative Consultant, Art Director and Visual Designer based in Cork,
          Ireland. With over 25 years of experience across the creative landscape,
          I work from concept to creation — delivering thoughtful, impactful design
          for brands and digital products.
        </p>
      </div>

      <Testimonials />
    </SiteLayout>
  );
}
