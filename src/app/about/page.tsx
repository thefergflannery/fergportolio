import type { Metadata } from "next";
import Image from "next/image";
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/images/gooseberry.gif)",
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
            }}
          />
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

      {/* Design intent strip — zoom-in AOS, right-aligned, full width */}
      <IntroStrip
        text="Over 25 years experience across design from concept to creation"
        ornamentSrc="/images/Ornament-17.png"
        ornamentWidth={222}
        ornamentHeight={145}
        ornamentAos="zoom-in"
        ornamentAosDuration="1350"
        align="right"
        arrowHref="#ferg"
        split={false}
      />

      {/* #ferg: photo + bio text */}
      <div
        id="ferg"
        style={{
          display: "flex",
          flexWrap: "nowrap",
          borderBottom: "1px solid #111111",
          paddingTop: "var(--wp--preset--spacing--30)",
          paddingBottom: "var(--wp--preset--spacing--50)",
        }}
      >
        {/* Left: photo */}
        <div style={{ flexBasis: "40%", flexShrink: 0 }}>
          <Image
            src="/images/ferg2.jpg"
            alt="Ferg Flannery"
            width={1024}
            height={904}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Right: bio text */}
        <div
          style={{
            flexBasis: "60%",
            paddingRight: "var(--wp--preset--spacing--80)",
            paddingLeft: "var(--wp--preset--spacing--40)",
            paddingTop: "var(--wp--preset--spacing--30)",
            fontSize: "var(--wp--preset--font-size--small)",
            lineHeight: 1.7,
          }}
        >
          <p style={{ margin: "0 0 var(--wp--preset--spacing--30)" }}>
            Ferg Flannery is a multidisciplinary designer and developer with over 25 years of
            experience delivering digital projects from concept through to completion. He
            specialises in designing and building modern, accessible websites that combine
            strong visual direction with technical precision.
          </p>
          <p style={{ margin: "0 0 var(--wp--preset--spacing--30)" }}>
            Working across WordPress and custom builds, Ferg integrates UX strategy, scalable
            architecture, performance optimisation, SEO foundations, and{" "}
            <a
              href="https://www.w3.org/TR/WCAG22/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit" }}
            >
              WCAG
            </a>{" "}
            accessibility standards to create purposeful, high-performing digital experiences.
          </p>
          <p style={{ margin: "0 0 var(--wp--preset--spacing--30)" }}>
            In recent years, his focus has expanded into creative project management —
            collaborating with agencies, stakeholders, and development teams to shape
            briefs, guide execution, and ensure complex digital initiatives are delivered
            with clarity and measurable impact. He operates at the intersection of creative
            thinking and technical delivery, offering consultation that turns ideas into
            structured, effective digital solutions.
          </p>
          <p style={{ margin: 0 }}>
            With a foundation in visual design and art direction, his work balances aesthetics
            with usability, always grounded in collaboration and real-world outcomes.
          </p>
        </div>
      </div>

      {/* Award Winning Photographer section */}
      <div
        style={{
          maxWidth: "var(--wp--style--global--wide-size)",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "var(--wp--preset--spacing--50)",
          paddingRight: "var(--wp--preset--spacing--50)",
          marginTop: 0,
          marginBottom: 0,
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
              id="award-winning-photographer"
              style={{ margin: 0 }}
            >
              Award Winning Photographer
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
              practice emphasises cinematic stillness and natural presence — qualities that
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

        {/* Large landscape photography image */}
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
      </div>

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
          {/* Left: blockquote */}
          <div
            className="about-testimonial-quote"
            style={{
              flexBasis: "50%",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
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
              }}
            >
              What people are saying
            </p>
            <blockquote style={{ margin: 0, padding: 0, border: "none" }}>
              <AnimatedText
                as="p"
                style={{
                  fontSize: "var(--wp--preset--font-size--large)",
                  fontWeight: 400,
                  fontStyle: "normal",
                  lineHeight: 1.4,
                  margin: "0 0 var(--wp--preset--spacing--30)",
                }}
              >
                &ldquo;Ferg is not only a great creative but a tremendous leader. He advocates
                for design and is innovative within it.&rdquo;
              </AnimatedText>
              <cite style={{ fontStyle: "normal", display: "block" }}>
                <br />
                Dr. Marc O Riain
                <sub>
                  <br />
                  Director RUA Architects / Former President of the Institute of Designers in Ireland (IDI)
                </sub>
              </cite>
            </blockquote>
          </div>

          {/* Right: full-bleed image */}
          <div
            className="about-testimonial-image"
            style={{
              flexBasis: "50%",
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
        </div>
      </div>
    </SiteLayout>
  );
}
