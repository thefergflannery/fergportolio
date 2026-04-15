export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        backgroundColor: "#111111",
        borderTop: "1px solid #333",
        paddingTop: "var(--wp--preset--spacing--70)",
        paddingBottom: "var(--wp--preset--spacing--70)",
        paddingLeft: "var(--wp--preset--spacing--50)",
        paddingRight: "var(--wp--preset--spacing--50)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "flex-start",
          gap: "var(--wp--preset--spacing--60)",
        }}
      >
        {/* Left: label */}
        <div style={{ flexShrink: 0 }}>
          <p
            style={{
              margin: 0,
              color: "#444",
              fontSize: "var(--wp--preset--font-size--small)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              whiteSpace: "nowrap",
            }}
          >
            Contact:
          </p>
        </div>

        {/* Right: details */}
        <div style={{ flex: 1 }}>
          <p style={{ margin: "0 0 4px" }}>
            <a
              href="mailto:hello@fergflannery.com"
              style={{
                color: "#ffffff",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontSize: "var(--wp--preset--font-size--x-large)",
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              hello@fergflannery.com
            </a>
          </p>

          <p style={{ margin: "0 0 4px" }}>
            <a
              href="tel:+353830216104"
              style={{
                color: "#ffffff",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontSize: "var(--wp--preset--font-size--large)",
                fontWeight: 300,
              }}
            >
              +353 83 021 6104
            </a>
          </p>

          <p
            style={{
              margin: "0 0 var(--wp--preset--spacing--40)",
              fontSize: "var(--wp--preset--font-size--small)",
              color: "#51ff00",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Cork. IE
          </p>

          {/* Social links */}
          <div style={{ display: "flex", gap: "var(--wp--preset--spacing--20)", flexWrap: "wrap" }}>
            <a
              href="https://www.instagram.com/thefergflannery/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#ffffff",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontSize: "var(--wp--preset--font-size--small)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
              IG
            </a>

            <span style={{ color: "#444", fontSize: "var(--wp--preset--font-size--small)" }}>/</span>

            <a
              href="https://www.linkedin.com/in/ferg-flannery/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#ffffff",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontSize: "var(--wp--preset--font-size--small)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M11 17v-4c0-1.5 1-2 2-2s2 .5 2 2v4M11 10v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              LI
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}