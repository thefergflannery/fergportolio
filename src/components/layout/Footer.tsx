import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--wp--preset--color--contrast)",
        paddingTop: "var(--wp--preset--spacing--60)",
        paddingBottom: "var(--wp--preset--spacing--50)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--wp--style--global--wide-size)",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "var(--wp--preset--spacing--50)",
          paddingRight: "var(--wp--preset--spacing--50)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "var(--wp--preset--spacing--30)",
          }}
        >
          {/* Left: Accessibility link */}
          <div>
            <p style={{ margin: 0 }}>
              <Link
                href="/accessibility"
                style={{
                  color: "var(--wp--preset--color--accent-1)",
                  textDecoration: "none",
                  fontSize: "0.58rem",
                }}
              >
                Accessibility Statement
              </Link>
            </p>
          </div>

          {/* Centre: Social links */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a
              href="https://www.instagram.com/thefergflannery/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--wp--preset--color--accent-1)",
                textDecoration: "none",
                fontSize: "0.58rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                gap: "6px",
                color: "var(--wp--preset--color--accent-1)",
                textDecoration: "none",
                fontSize: "0.58rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M11 17v-4c0-1.5 1-2 2-2s2 .5 2 2v4M11 10v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Right: Contact info */}
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                margin: 0,
                fontSize: "0.7rem",
                color: "var(--wp--preset--color--accent-1)",
                textAlign: "right",
              }}
            >
              hello@fergflannery.com
              <br />
              +353830216104
              <br />
              Cork. IE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}