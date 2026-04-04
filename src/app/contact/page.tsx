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
          aria-hidden="true"
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

      {/* Contact details — right-aligned */}
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
          textAlign: "right",
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
            marginTop: "var(--wp--preset--spacing--20)",
            fontSize: "var(--wp--preset--font-size--medium)",
            color: "var(--wp--preset--color--accent-4)",
            marginBottom: "var(--wp--preset--spacing--50)",
          }}
        >
          Cork. IE
        </p>

        {/* Social links */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "var(--wp--preset--spacing--30)",
          }}
        >
          <a
            href="https://www.instagram.com/thefergflannery/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#111111",
              textDecoration: "none",
              fontSize: "var(--wp--preset--font-size--small)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              border: "1.5px solid #111111",
              borderRadius: "999px",
              padding: "10px 20px",
            }}
          >
            {/* Instagram icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
            Instagram
          </a>

          <a
            href="https://www.linkedin.com/in/ferg-flannery/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#111111",
              textDecoration: "none",
              fontSize: "var(--wp--preset--font-size--small)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              border: "1.5px solid #111111",
              borderRadius: "999px",
              padding: "10px 20px",
            }}
          >
            {/* LinkedIn icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M11 17v-4c0-1.5 1-2 2-2s2 .5 2 2v4M11 10v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </SiteLayout>
  );
}