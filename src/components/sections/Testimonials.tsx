import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const t = testimonials[0];
  if (!t) return null;

  return (
    <div
      style={{
        backgroundColor: "var(--wp--preset--color--base)",
        borderTop: "1px solid #111111",
        borderBottom: "1px solid #111111",
      }}
    >
      <div
        style={{
          maxWidth: "var(--wp--style--global--wide-size)",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "stretch",
        }}
      >
        {/* Left: photo (70% flex-basis) */}
        <div
          data-aos="fade-up-right"
          style={{
            flexBasis: "70%",
            flexShrink: 0,
            overflow: "hidden",
            minHeight: "340px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Document.jpg"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "83% 41%",
              display: "block",
            }}
          />
        </div>

        {/* Right: quote (30% flex-basis) */}
        <div
          data-aos="slide-up"
          data-aos-duration="1250"
          style={{
            flexBasis: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "var(--wp--preset--spacing--60) var(--wp--preset--spacing--50)",
            backgroundColor: "var(--wp--preset--color--base)",
          }}
        >
          <div
            style={{
              fontSize: "clamp(0.984rem, 0.984rem + ((1vw - 0.2rem) * 0.809), 1.5rem)",
              fontStyle: "italic",
              fontWeight: 300,
              textAlign: "right",
              marginBottom: "var(--wp--preset--spacing--50)",
              lineHeight: 1.4,
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </div>

          <div
            style={{
              fontStyle: "normal",
              fontWeight: 1000,
              textAlign: "right",
            }}
          >
            {t.author}
          </div>

          {t.company && (
            <div
              style={{
                textTransform: "uppercase",
                textAlign: "right",
              }}
            >
              {t.company}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
