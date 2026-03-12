import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <div
      data-aos="slide-up"
      data-aos-duration="1250"
      style={{
        maxWidth: "var(--wp--style--global--wide-size)",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "var(--wp--preset--spacing--50)",
        paddingRight: "var(--wp--preset--spacing--50)",
        paddingTop: "var(--wp--preset--spacing--60)",
        paddingBottom: "var(--wp--preset--spacing--60)",
      }}
    >
      {testimonials.slice(0, 1).map((t) => (
        <div key={t.id}>
          <div
            style={{
              fontSize: "clamp(0.984rem, 0.984rem + ((1vw - 0.2rem) * 0.809), 1.5rem)",
              fontStyle: "italic",
              fontWeight: 300,
              textAlign: "right",
              marginBottom: "var(--wp--preset--spacing--50)",
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </div>

          <div
            style={{
              fontStyle: "normal",
              fontWeight: 800,
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
      ))}
    </div>
  );
}
