import HeroScrollOut from "@/components/ui/HeroScrollOut";
import HeroModelSlot from "@/components/HeroModelSlot";

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
      {/* Mobile background image */}
      <style>{`
        @media (max-width: 768px) {
          .hero-cover {
            background-image: url('/images/mobilefallback.png') !important;
            background-size: cover !important;
            background-position: center center !important;
            background-repeat: no-repeat !important;
          }
        }
      `}</style>

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
          className="hero-row"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "flex-end",
            paddingLeft: 0,
            minHeight: "90vh",
            paddingBottom: "8vh",
          }}
        >
          {/* Hero text */}
          <div className="hero-text-col" style={{ flexBasis: "66.66%", flexShrink: 0 }}>
            <h1
              id="ferg"
              className="hero-title hero-stagger-out"
              style={{
                color: "#111111",
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
              id="lead-creative-consultant-accessibility-expert"
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
              LEAD CREATIVE
              <br />
              CONSULTANT.
              <br />
              LEAD WEB
              <br />
              ACCESSIBILITY
              <br />
              EXPERT.
            </p>
          </div>

          {/* Desktop 3D model — hidden on mobile via CSS */}
          <div
            className="hero-model-desktop"
            style={{
              flexBasis: "33.33%",
              flexShrink: 0,
              height: "90vh",
              position: "relative",
            }}
          >
            <HeroModelSlot />
          </div>
        </div>
      </div>

      <HeroScrollOut />
    </div>
  );
}