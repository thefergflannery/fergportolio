import type { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";

export const metadata: Metadata = {
  title: "Accessibility Statement – Ferg Flannery",
  description: "Accessibility statement for fergflannery.com – WCAG 2.2 AA compliance status, known exceptions, and contact details.",
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
            marginBottom: "var(--wp--preset--spacing--30)",
          }}
        >
          Accessibility Statement
        </h1>

        <p style={{ fontSize: "var(--wp--preset--font-size--small)", color: "var(--wp--preset--color--accent-4)", marginBottom: "var(--wp--preset--spacing--50)" }}>
          Last reviewed: March 2026
        </p>

        <p style={{ fontSize: "var(--wp--preset--font-size--medium)", lineHeight: 1.7, marginBottom: "var(--wp--preset--spacing--40)" }}>
          Ferg Flannery is committed to ensuring this website is accessible to people of all abilities. This site has been designed and built with accessibility as a core requirement, not an afterthought.
        </p>

        {/* Conformance */}
        <h2 style={{ fontSize: "var(--wp--preset--font-size--large)", fontWeight: 700, marginTop: "var(--wp--preset--spacing--50)", marginBottom: "var(--wp--preset--spacing--30)", textTransform: "uppercase" }}>
          Conformance Status
        </h2>
        <p style={{ fontSize: "var(--wp--preset--font-size--medium)", lineHeight: 1.7, marginBottom: "var(--wp--preset--spacing--30)" }}>
          This website aims to conform to the{" "}
          <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
            Web Content Accessibility Guidelines (WCAG) 2.2
          </a>{" "}
          Level AA. WCAG 2.2 AA is also the standard required under the{" "}
          <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019L0882" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
            European Accessibility Act 2025
          </a>.
        </p>
        <p style={{ fontSize: "var(--wp--preset--font-size--medium)", lineHeight: 1.7 }}>
          The following measures have been taken to support accessibility on this site:
        </p>
        <ul style={{ fontSize: "var(--wp--preset--font-size--medium)", lineHeight: 1.9, paddingLeft: "var(--wp--preset--spacing--40)", marginTop: "var(--wp--preset--spacing--20)" }}>
          <li>Skip to main content link provided for keyboard users</li>
          <li>All pages have a unique, descriptive <code>&lt;title&gt;</code></li>
          <li>Document language set to <code>lang="en"</code></li>
          <li>Semantic HTML structure with one <code>&lt;h1&gt;</code> per page</li>
          <li>All interactive elements accessible by keyboard</li>
          <li>Focus indicators visible on all interactive elements</li>
          <li>Colour contrast meets WCAG 2.2 AA minimum ratios (4.5:1 for normal text, 3:1 for large text)</li>
          <li>All meaningful images have descriptive alternative text</li>
          <li>Decorative images and background videos are hidden from assistive technology</li>
          <li>ARIA live regions used to announce dynamic content changes (e.g. testimonial carousel)</li>
          <li>Navigation landmark regions in place (<code>&lt;main&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;footer&gt;</code>)</li>
          <li>Text resizable up to 200% without loss of content or functionality</li>
          <li>No content relies on colour alone to convey meaning</li>
          <li>Responsive design — no horizontal scrolling at 320px viewport width</li>
          <li>Reduced motion preferences respected via <code>prefers-reduced-motion</code> where animations are used</li>
        </ul>

        {/* Known exceptions */}
        <h2 style={{ fontSize: "var(--wp--preset--font-size--large)", fontWeight: 700, marginTop: "var(--wp--preset--spacing--60)", marginBottom: "var(--wp--preset--spacing--30)", textTransform: "uppercase" }}>
          Known Exceptions
        </h2>
        <p style={{ fontSize: "var(--wp--preset--font-size--medium)", lineHeight: 1.7, marginBottom: "var(--wp--preset--spacing--30)" }}>
          The following items are known exceptions or partial conformance areas:
        </p>
        <ul style={{ fontSize: "var(--wp--preset--font-size--medium)", lineHeight: 1.9, paddingLeft: "var(--wp--preset--spacing--40)", marginTop: "var(--wp--preset--spacing--20)" }}>
          <li>
            <strong>Hover-only thumbnail previews (Project List)</strong> — The floating image thumbnail that appears when hovering over project rows is a pointer-device enhancement only. The same content is fully accessible via the linked project page. This is a decorative feature and does not affect access to any required information.
          </li>
          <li>
            <strong>GSAP scroll-triggered text animations</strong> — Headings and body text on some pages animate in as you scroll. The text content is present in the DOM at all times and accessible to screen readers regardless of animation state. On devices that indicate a preference for reduced motion, animations are suppressed where possible.
          </li>
          <li>
            <strong>Background videos (Hero, Contact)</strong> — Decorative video backgrounds are muted, loop silently, and are hidden from assistive technology. No content critical to understanding the page is conveyed through video alone. No captions are required as the videos contain no dialogue or meaningful audio.
          </li>
          <li>
            <strong>Third-party content</strong> — Links to external sites (fergflanneryphoto.com, Instagram, client websites) are outside the scope of this statement. Accessibility of third-party content cannot be guaranteed.
          </li>
        </ul>

        {/* Technical spec */}
        <h2 style={{ fontSize: "var(--wp--preset--font-size--large)", fontWeight: 700, marginTop: "var(--wp--preset--spacing--60)", marginBottom: "var(--wp--preset--spacing--30)", textTransform: "uppercase" }}>
          Technical Approach
        </h2>
        <p style={{ fontSize: "var(--wp--preset--font-size--medium)", lineHeight: 1.7 }}>
          This site is built using Next.js (React) with semantic HTML5 elements, ARIA attributes where required, and CSS that respects user preferences. Accessibility was considered throughout the design and build process, including colour contrast checking, keyboard navigation testing, and screen reader review using macOS VoiceOver.
        </p>

        {/* Feedback */}
        <h2 style={{ fontSize: "var(--wp--preset--font-size--large)", fontWeight: 700, marginTop: "var(--wp--preset--spacing--60)", marginBottom: "var(--wp--preset--spacing--30)", textTransform: "uppercase" }}>
          Feedback & Contact
        </h2>
        <p style={{ fontSize: "var(--wp--preset--font-size--medium)", lineHeight: 1.7, marginBottom: "var(--wp--preset--spacing--30)" }}>
          If you experience any accessibility barriers on this site, or if a page or feature is not working as expected with your assistive technology, please get in touch. Feedback is welcomed and issues will be addressed as a priority.
        </p>
        <p style={{ fontSize: "var(--wp--preset--font-size--medium)", lineHeight: 1.7 }}>
          Email:{" "}
          <a href="mailto:hello@fergflannery.com" style={{ color: "inherit" }}>
            hello@fergflannery.com
          </a>
          <br />
          Phone:{" "}
          <a href="tel:+353830216104" style={{ color: "inherit" }}>
            +353 83 021 6104
          </a>
        </p>
      </div>
    </SiteLayout>
  );
}