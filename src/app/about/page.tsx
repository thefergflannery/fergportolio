import type { Metadata } from "next";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";
import LogoMarquee from "@/components/sections/LogoMarquee";
import AnimatedText from "@/components/ui/AnimatedText";
import Link from "next/link";

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

      {/* Design intent strip */}
      <div
        style={{
          backgroundColor: "var(--wp--preset--color--accent-1)",
          borderBottom: "1px solid #111111",
        }}
      >
        <div
          style={{
            maxWidth: "var(--wp--style--global--wide-size)",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "var(--wp--preset--spacing--50)",
            paddingRight: "var(--wp--preset--spacing--50)",
            paddingTop: "var(--wp--preset--spacing--50)",
            paddingBottom: "var(--wp--preset--spacing--50)",
          }}
        >
          <figure
            style={{ marginBottom: "var(--wp--preset--spacing--30)" }}
            data-aos="fade"
            data-aos-duration="950"
            data-aos-mirror="true"
          >
            <Image src="/images/Ornament-17.png" alt="" width={222} height={145} />
          </figure>

          <AnimatedText
            as="p"
            style={{
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: 1.2,
              textTransform: "uppercase",
              fontSize: "var(--wp--preset--font-size--xx-large)",
              textAlign: "right",
              margin: 0,
            }}
          >
            {">25 years experience across design from concept to creation"}
          </AnimatedText>

          <figure
            style={{ marginTop: "var(--wp--preset--spacing--30)" }}
            data-aos="slide-down"
            data-aos-easing="ease-in"
            data-aos-mirror="true"
          >
            <Link href="#ferg" aria-label="Scroll to about">
              <Image src="/images/Arrow-4-1.svg" alt="" width={32} height={36} />
            </Link>
          </figure>
        </div>
      </div>

      {/* #ferg: photo + bio */}
      <div
        id="ferg"
        style={{
          maxWidth: "var(--wp--style--global--wide-size)",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "var(--wp--preset--spacing--50)",
          paddingRight: "var(--wp--preset--spacing--50)",
          paddingTop: "var(--wp--preset--spacing--30)",
          paddingBottom: "var(--wp--preset--spacing--50)",
          borderBottom: "1px solid #111111",
          display: "flex",
          flexWrap: "nowrap",
          gap: "var(--wp--preset--spacing--40)",
          alignItems: "center",
        }}
      >
        {/* Left: photo */}
        <div style={{ flexBasis: "40%", flexShrink: 0 }}>
          <Image
            src="/images/ferg-photo.jpg"
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
          <p style={{ margin: 0 }}>
            In recent years, his focus has expanded into creative project management —
            collaborating with agencies, stakeholders, and development teams to deliver
            projects at scale.
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}
