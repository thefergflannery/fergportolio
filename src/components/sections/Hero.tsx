import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div
      className="hero-cover page-offset"
      style={{
        position: "relative",
        minHeight: "90vh",
        paddingTop: 0,
        overflow: "hidden",
      }}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/mainimage.png"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/videos/shadergradient.mp4" type="video/mp4" />
      </video>

      {/* Overlay (dim-0 = transparent) */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#FFF",
          opacity: 0,
          zIndex: 1,
        }}
      />

      {/* Inner content */}
      <div
        className="hero-inner"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "100%",
          paddingLeft: "70px",
          paddingRight: "var(--wp--preset--spacing--50)",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "flex-end",
            marginBottom: "-450px",
            paddingLeft: 0,
            minHeight: "90vh",
          }}
        >
          <div style={{ flexBasis: "66.66%", flexShrink: 0 }}>
            <h1
              id="ferg"
              className="hero-title hero-stagger-out"
              style={{
                color: "var(--wp--preset--color--accent-1)",
                fontStyle: "normal",
                fontWeight: 800,
                margin: 0,
                fontSize: "var(--wp--preset--font-size--xx-large)",
                lineHeight: 1,
              }}
            >
              FERG.
            </h1>

            <h1
              id="creativeconsultant-art-director-visualdesigner"
              className="hero-stagger-out hero-title"
              style={{
                color: "var(--wp--preset--color--base)",
                fontStyle: "normal",
                fontWeight: 800,
                margin: 0,
                fontSize: "var(--wp--preset--font-size--xx-large)",
                lineHeight: 1,
              }}
            >
              CREATIVE
              <br />
              CONSULTANT.
              <br />
              ART DIRECTOR.
              <br />
              VISUAL
              <br />
              DESIGNER.
            </h1>

            {/* Down arrow linking to #work */}
            <figure style={{ marginTop: "-58px", marginBottom: "-10px" }}>
              <Link href="#work" aria-label="Scroll to selected work">
                <Image
                  src="/images/Group-1597883031.svg"
                  alt=""
                  width={144}
                  height={144}
                />
              </Link>
            </figure>
          </div>

          <div style={{ flexBasis: "33.33%" }} />
        </div>
      </div>
    </div>
  );
}
