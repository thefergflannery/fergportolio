import Image from "next/image";
import Link from "next/link";
import AnimatedText from "../ui/AnimatedText";

interface IntroStripProps {
  /** Text shown in the animated heading */
  text: string;
  /** Optional ornament image (Ornament-17.png, ring.png, etc.) */
  ornamentSrc?: string;
  ornamentWidth?: number;
  ornamentHeight?: number;
  /** AOS animation type for the ornament */
  ornamentAos?: string;
  ornamentAosDuration?: string;
  /** Text alignment — "left" (homepage) or "right" (all other pages) */
  align?: "left" | "right";
  /** Arrow scroll target */
  arrowHref?: string;
  /** Whether to use 50/50 column split (homepage) or full-width (other pages) */
  split?: boolean;
}

export default function IntroStrip({
  text,
  ornamentSrc,
  ornamentWidth = 222,
  ornamentHeight = 145,
  ornamentAos = "fade",
  ornamentAosDuration = "950",
  align = "right",
  arrowHref = "#ferg",
  split = false,
}: IntroStripProps) {
  const isLeft = align === "left";

  const inner = (
    <div
      style={{
        backgroundColor: "var(--wp--preset--color--accent-1)",
        display: "flex",
        flexDirection: "column",
        alignItems: isLeft ? "flex-start" : "flex-end",
        justifyContent: "flex-start",
        minHeight: "33vh",
        marginTop: split ? 0 : "var(--wp--preset--spacing--60)",
        marginBottom: split ? 0 : "var(--wp--preset--spacing--60)",
        paddingTop: "var(--wp--preset--spacing--50)",
        paddingRight: "clamp(var(--wp--preset--spacing--50), 10vw, 155px)",
        paddingBottom: "var(--wp--preset--spacing--50)",
        paddingLeft: "var(--wp--preset--spacing--50)",
      }}
    >
      {ornamentSrc && (
        <figure
          style={{ marginBottom: "var(--wp--preset--spacing--30)" }}
          data-aos={ornamentAos}
          data-aos-duration={ornamentAosDuration}
          data-aos-mirror="true"
        >
          <Image
            src={ornamentSrc}
            alt=""
            width={ornamentWidth}
            height={ornamentHeight}
            style={{ objectFit: "contain" }}
          />
        </figure>
      )}

      <AnimatedText
        as="p"
        style={{
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: 1.2,
          textTransform: "uppercase",
          fontSize: "var(--wp--preset--font-size--xx-large)",
          textAlign: isLeft ? "left" : "right",
          margin: 0,
        }}
      >
        {text}
      </AnimatedText>

      <figure
        style={{ marginTop: "var(--wp--preset--spacing--30)" }}
        data-aos="slide-down"
        data-aos-easing="ease-in"
        data-aos-mirror="true"
      >
        <Link href={arrowHref} aria-label="Scroll down">
          <Image src="/images/Arrow-4-1.svg" alt="" width={32} height={36} />
        </Link>
      </figure>
    </div>
  );

  return (
    <div
      id="work"
      style={{
        backgroundColor: "var(--wp--preset--color--accent-1)",
        borderBottom: "1px solid #111111",
        minHeight: "100px",
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
        {split ? (
          <>
            {/* Left column with content */}
            <div style={{ flexBasis: "50%", flexShrink: 0 }}>
              {inner}
            </div>
            {/* Right column empty */}
            <div style={{ flexBasis: "50%" }} />
          </>
        ) : (
          /* Full-width column */
          <div style={{ flexBasis: "100%" }}>
            {inner}
          </div>
        )}
      </div>
    </div>
  );
}
