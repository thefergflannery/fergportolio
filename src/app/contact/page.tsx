import type { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import LogoMarquee from "@/components/sections/LogoMarquee";
import IntroStrip from "@/components/sections/IntroStrip";

export const metadata: Metadata = {
  title: "Contact – Ferg Flannery",
  description: "Get in touch with Ferg Flannery – Creative Consultant, Art Director, Visual Designer. Based in Cork, Ireland.",
};

export default function ContactPage() {
  return (
    <SiteLayout>
      {/* Video cover header */}
      <div
        style={{
          position: "relative",
          minHeight: "166px",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/videos/intothedep-1.mp4" type="video/mp4" />
        </video>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#FFF",
            opacity: 0,
          }}
        />
      </div>

      <LogoMarquee />

      {/* CTA intro strip */}
      <IntroStrip
        text="Got a Project in mind? Let's Chat"
        align="right"
        arrowHref="#contact-details"
        split={false}
      />

      {/* Contact details */}
      <div
        id="contact-details"
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
        <p style={{ marginBottom: "var(--wp--preset--spacing--30)" }}>
          <a
            href="mailto:hello@fergflannery.com"
            style={{
              color: "#111111",
              textDecoration: "none",
              fontSize: "var(--wp--preset--font-size--x-large)",
              fontWeight: 300,
            }}
          >
            hello@fergflannery.com
          </a>
        </p>

        <p style={{ margin: 0 }}>
          <a
            href="tel:+353830216104"
            style={{
              color: "#111111",
              textDecoration: "none",
              fontSize: "var(--wp--preset--font-size--large)",
              fontWeight: 300,
            }}
          >
            +353 83 021 6104
          </a>
        </p>

        <p
          style={{
            marginTop: "var(--wp--preset--spacing--40)",
            fontSize: "var(--wp--preset--font-size--medium)",
            color: "var(--wp--preset--color--accent-4)",
          }}
        >
          Cork. IE
        </p>
      </div>
    </SiteLayout>
  );
}
