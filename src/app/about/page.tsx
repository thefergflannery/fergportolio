import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/layout/SiteLayout";
import LogoMarquee from "@/components/sections/LogoMarquee";
import IntroStrip from "@/components/sections/IntroStrip";
import AnimatedText from "@/components/ui/AnimatedText";

export const metadata: Metadata = {
  title: "About Me – Ferg Flannery",
  description: "Ferg Flannery – Creative Consultant, Art Director and Visual Designer with 25+ years experience.",
};

export default function AboutPage() {
  return (
    <SiteLayout>
      {/* Parallax hero — background-attachment: fixed pins the image while the page scrolls */}
      <div
        className="cursor-hello-zone"
        style={{
          position: "relative",
          minHeight: "517px",
          overflow: "hidden",
        }}
      >
        {/* Fixed-position background layer — creates the parallax effect */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/images/about-header.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <LogoMarquee />

      {/* Design intent strip — zoom-in AOS, right-aligned, full width */}
      <IntroStrip
        text="Creative direction and accessibility expertise, delivered at national scale"
        modelSrc="/models/logo-green.glb"
        align="right"
        arrowHref="#ferg"
        split={true}
        contentWidth="50%"
      />

      {/* #ferg: photo + bio text */}
      <div
        id="ferg"
        style={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "stretch",
          borderBottom: "1px solid #111111",
        }}
      >
        {/* Left: photo — stretches to fill section height */}
        <div style={{ flexBasis: "40%", flexShrink: 0, overflow: "hidden" }}>
          <Image
            src="/images/ferg2.jpg"
            alt="Ferg Flannery"
            width={1024}
            height={904}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Right: bio text — vertically centred */}
        <div
          style={{
            flexBasis: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingRight: "var(--wp--preset--spacing--80)",
            paddingLeft: "var(--wp--preset--spacing--40)",
            paddingTop: "var(--wp--preset--spacing--50)",
            paddingBottom: "var(--wp--preset--spacing--50)",
            fontSize: "var(--wp--preset--font-size--small)",
            lineHeight: 1.7,
          }}
        >
          <p style={{ margin: "0 0 var(--wp--preset--spacing--30)" }}>
            Ferg Flannery is a creative consultant, art director and visual designer. Most
            recently he was one of two lead consultants on Fáilte Ireland&apos;s Digital That
            Delivers programme, working as Lead Creative Consultant and Lead Web Accessibility
            Expert, which supported 600 Irish tourism businesses, and part of the
            core team that built the Web Accessibility Grant Scheme, bringing 100+ tourism
            websites to{" "}
            <a
              href="https://www.w3.org/TR/WCAG22/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit" }}
            >
              WCAG 2.2 AA
            </a>
            .
          </p>
          <p style={{ margin: "0 0 var(--wp--preset--spacing--30)" }}>
            He sits between businesses, agencies and developers: auditing what exists, writing
            briefs agencies can build from, holding delivery to an agreed standard and signing
            off work that meets it. Programme sites have gone on to win national digital awards.
          </p>
          <p style={{ margin: "0 0 var(--wp--preset--spacing--30)" }}>
            Before that he was Head of Product Design at Tweak, owning the design system and
            product vision, and Senior Art Director at Web.com in New York, leading a creative
            team through two rebrands and a company-wide design system.
          </p>
          <p style={{ margin: 0 }}>
            He is available now for freelance and contract work: accessibility audits and QA for
            agencies, EAA readiness for in-scope businesses, and interim creative or delivery
            leadership.{" "}
            <Link href="/#contact" style={{ color: "inherit" }}>
              Get in touch
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Award Winning Photographer section */}
      <div
        style={{
          paddingLeft: "var(--wp--preset--spacing--50)",
          paddingRight: "var(--wp--preset--spacing--50)",
        }}
      >
        <div
          className="photographer-row"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "flex-start",
            gap: "var(--wp--preset--spacing--50)",
            paddingTop: "var(--wp--preset--spacing--60)",
            paddingBottom: "var(--wp--preset--spacing--40)",
          }}
        >
          {/* Left: heading */}
          <div className="photographer-heading" style={{ flexBasis: "50%", flexShrink: 0 }}>
            <AnimatedText
              as="h2"
              id="photography"
              style={{ margin: 0 }}
            >
              Outside the Studio
            </AnimatedText>
          </div>

          {/* Right: text + CTA */}
          <div className="photographer-text" style={{ flexBasis: "40%" }}>
            <p
              style={{
                fontSize: "var(--wp--preset--font-size--small)",
                margin: "0 0 var(--wp--preset--spacing--40)",
                lineHeight: 1.7,
              }}
            >
              Alongside his digital work, Ferg is an active fine art photographer based in
              Ireland. His photography focuses on atmospheric landscapes and abstract
              compositions that explore light, mood and space. Self-taught, his photographic
              practice emphasises cinematic stillness and natural presence, qualities that
              subtly influence his design eye and visual decision-making across projects.
            </p>
            <a
              href="https://www.fergflanneryphoto.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                width: "100%",
                padding: "12px 24px",
                border: "1px solid #111111",
                borderRadius: "999px",
                textAlign: "center",
                textDecoration: "none",
                color: "#111111",
                fontSize: "var(--wp--preset--font-size--small)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                boxSizing: "border-box",
              }}
            >
              VIEW WORK
            </a>
          </div>
        </div>
      </div>

      {/* Large landscape photography image — full bleed, no side padding */}
      <figure
        style={{ margin: 0 }}
        data-aos="slide-up"
        data-aos-duration="1350"
      >
        <Image
          src="/images/Screenshot-2026-02-13-at-09.32.11.png"
          alt="Ferg Flannery photography"
          width={1360}
          height={674}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            aspectRatio: "16/9",
            objectFit: "cover",
          }}
        />
      </figure>

      {/* "What people are saying" testimonial */}
      <div
        style={{
          backgroundColor: "var(--wp--preset--color--base)",
          borderTop: "1px solid #111111",
          borderBottom: "1px solid #111111",
        }}
      >
        <div
          className="about-testimonial-row"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "stretch",
          }}
        >
          {/* Left: full-bleed image */}
          <div
            className="about-testimonial-image"
            style={{
              flexBasis: "50%",
              flexShrink: 0,
              overflow: "hidden",
              minHeight: "380px",
            }}
            data-aos="fade"
            data-aos-duration="1300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ferg.jpg"
              alt="Portrait of Ferg Flannery"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </div>

          {/* Right: blockquote */}
          <div
            className="about-testimonial-quote"
            style={{
              flexBasis: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
              padding: "var(--wp--preset--spacing--60) var(--wp--preset--spacing--50)",
              minHeight: "380px",
            }}
          >
            <p
              style={{
                fontSize: "var(--wp--preset--font-size--small)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                margin: "0 0 var(--wp--preset--spacing--30)",
                textAlign: "right",
              }}
            >
              What people are saying
            </p>
            <blockquote style={{ margin: 0, padding: 0, border: "none", textAlign: "right" }}>
              <AnimatedText
                as="p"
                style={{
                  fontSize: "var(--wp--preset--font-size--large)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 1.4,
                  margin: "0 0 var(--wp--preset--spacing--30)",
                  textAlign: "right",
                }}
              >
                &ldquo;Ferg is not only a great creative but a tremendous leader. He advocates
                for design and is innovative within it.&rdquo;
              </AnimatedText>
              <cite style={{ fontStyle: "normal", display: "block", fontWeight: 1000, textAlign: "right" }}>
                Dr. Marc O Riain
                <br />
                <span style={{ fontWeight: 300, fontSize: "var(--wp--preset--font-size--small)", textTransform: "uppercase" }}>
                  Director RUA Architects / Former President IDI
                </span>
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
