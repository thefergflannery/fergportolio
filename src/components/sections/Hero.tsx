import HeroScrollOut from "@/components/ui/HeroScrollOut";
import HeroCursor from "@/components/ui/HeroCursor";

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
      {/* Video background — clipped to hero bounds via its own absolute container */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          poster="/images/mainimage.png"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/videos/shadergradient.mp4" type="video/mp4" />
        </video>

        {/* Overlay (dim-0 = transparent) */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#FFF",
            opacity: 0,
          }}
        />
      </div>

      {/* Inner content — z-index 2, overflows below hero into LogoMarquee */}
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
            paddingLeft: 0,
            minHeight: "90vh",
            marginBottom: "-450px",
          }}
        >
          <div style={{ flexBasis: "66.66%", flexShrink: 0 }}>
            <h1
              id="ferg"
              className="hero-title hero-stagger-out"
              style={{
                color: "var(--wp--preset--color--accent-1)",
                fontStyle: "normal",
                fontWeight: 1000,
                margin: 0,
                fontSize: "var(--wp--preset--font-size--xx-large)",
                lineHeight: 1,
              }}
            >
              FERG.
            </h1>

            <p
              id="creativeconsultant-art-director-visualdesigner"
              className="hero-stagger-out hero-title"
              style={{
                color: "var(--wp--preset--color--base)",
                fontStyle: "normal",
                fontWeight: 1000,
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
            </p>

          </div>

          <div style={{ flexBasis: "33.33%" }} />
        </div>
      </div>
      <HeroScrollOut />
      <HeroCursor />
    </div>
  );
}
