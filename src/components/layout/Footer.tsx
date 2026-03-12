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
              +353 83 021 6104
              <br />
              Cork. IE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
