import HeroScrollOut from "@/components/ui/HeroScrollOut";
import HeroModel from "@/components/HeroModel";

export default function Hero() {
  return (
    <div
      className="hero-cover page-offset"
      style={{
        position: "relative",
        minHeight: "90vh",
        paddingTop: 0,
        overflow: "hidden",
        backgroundColor: "var(--wp--preset--color--accent-1)",
      }}
    >
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
          {/* Left: hero text */}
          <div style={{ flexBasis: "66.66%", flexShrink: 0 }}>
            <h1
              id="ferg"
              className="hero-title hero-stagger-out"
              style={{
                color: "#fff",
                mixBlendMode: "difference",
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
                color: "#fff",
                mixBlendMode: "difference",
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

          {/* Right: 3D model — fills the right third of the hero */}
          <div
            style={{
              flexBasis: "33.33%",
              flexShrink: 0,
              height: "90vh",
              position: "relative",
            }}
          >
            <HeroModel />
          </div>
        </div>
      </div>
      <HeroScrollOut />
    </div>
  );
}