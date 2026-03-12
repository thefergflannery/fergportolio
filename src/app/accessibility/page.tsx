import type { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";

export const metadata: Metadata = {
  title: "Accessibility Statement – Ferg Flannery",
};

export default function AccessibilityPage() {
  return (
    <SiteLayout>
      <div
        style={{
          maxWidth: "var(--wp--style--global--content-size)",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "var(--wp--preset--spacing--50)",
          paddingRight: "var(--wp--preset--spacing--50)",
          paddingTop: "var(--wp--preset--spacing--70)",
          paddingBottom: "var(--wp--preset--spacing--80)",
        }}
      >
        <h1
          style={{
            fontSize: "var(--wp--preset--font-size--xx-large)",
            fontWeight: 800,
            textTransform: "uppercase",
            marginBottom: "var(--wp--preset--spacing--50)",
          }}
        >
          Accessibility Statement
        </h1>

        <p style={{ fontSize: "var(--wp--preset--font-size--medium)", lineHeight: 1.7 }}>
          Ferg Flannery is committed to ensuring digital accessibility for people of
          all abilities. We continually improve the user experience for everyone and
          apply the relevant accessibility standards.
        </p>

        <h2
          style={{
            fontSize: "var(--wp--preset--font-size--large)",
            fontWeight: 700,
            marginTop: "var(--wp--preset--spacing--50)",
            marginBottom: "var(--wp--preset--spacing--30)",
            textTransform: "uppercase",
          }}
        >
          Conformance Status
        </h2>

        <p style={{ fontSize: "var(--wp--preset--font-size--medium)", lineHeight: 1.7 }}>
          This site aims to conform to the Web Content Accessibility Guidelines
          (WCAG) 2.1 Level AA.
        </p>

        <h2
          style={{
            fontSize: "var(--wp--preset--font-size--large)",
            fontWeight: 700,
            marginTop: "var(--wp--preset--spacing--50)",
            marginBottom: "var(--wp--preset--spacing--30)",
            textTransform: "uppercase",
          }}
        >
          Feedback
        </h2>

        <p style={{ fontSize: "var(--wp--preset--font-size--medium)", lineHeight: 1.7 }}>
          If you experience any accessibility barriers on this site, please contact{" "}
          <a
            href="mailto:hello@fergflannery.com"
            style={{ color: "inherit" }}
          >
            hello@fergflannery.com
          </a>
          .
        </p>
      </div>
    </SiteLayout>
  );
}
