import Image from "next/image";
import Link from "next/link";
import AnimatedText from "../ui/AnimatedText";

export default function DesignIntent() {
  return (
    <div
      id="work"
      style={{
        backgroundColor: "var(--wp--preset--color--accent-1)",
        borderBottom: "1px solid #111111",
        minHeight: "33vh",
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
        }}
      >
        {/* Left column */}
        <div
          style={{
            flexBasis: "50%",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              backgroundColor: "var(--wp--preset--color--accent-1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              minHeight: "33vh",
              paddingTop: "var(--wp--preset--spacing--50)",
              paddingRight: "155px",
              paddingBottom: "var(--wp--preset--spacing--50)",
              paddingLeft: "var(--wp--preset--spacing--50)",
            }}
          >
            {/* Ornament with AOS fade */}
            <figure
              style={{ marginBottom: "var(--wp--preset--spacing--30)" }}
              data-aos="fade"
              data-aos-duration="950"
              data-aos-mirror="true"
            >
              <Image
                src="/images/Ornament-17.png"
                alt=""
                width={222}
                height={145}
                style={{ objectFit: "cover", objectPosition: "30% 30%" }}
              />
            </figure>

            {/* Animated text paragraph */}
            <AnimatedText
              as="p"
              style={{
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: 1.2,
                textTransform: "uppercase",
                fontSize: "var(--wp--preset--font-size--x-large)",
                margin: 0,
              }}
            >
              design with intent with over 25 Years experience across the creative
              landscape from concept to creation.
            </AnimatedText>

            {/* Down arrow */}
            <figure
              style={{ marginTop: "var(--wp--preset--spacing--30)" }}
              data-aos="slide-down"
              data-aos-easing="ease-in"
              data-aos-mirror="true"
            >
              <Link href="#selected-work" aria-label="Scroll to selected work">
                <Image
                  src="/images/Arrow-4-1.svg"
                  alt=""
                  width={32}
                  height={36}
                />
              </Link>
            </figure>
          </div>
        </div>

        {/* Right column (empty) */}
        <div style={{ flexBasis: "50%" }} />
      </div>
    </div>
  );
}
