import Image from "next/image";

// Duplicate items so the loop is seamless
const ITEMS = Array.from({ length: 9 });

export default function LogoMarquee() {
  return (
    <div
      style={{
        borderBottom: "1px solid #111111",
        overflow: "hidden",
      }}
    >
      <div className="marquee-track">
        {/* Render two sets so it loops seamlessly */}
        {[...ITEMS, ...ITEMS].map((_, i) => (
          <div key={i} className="marquee-item" aria-hidden={i >= 9 ? "true" : undefined}>
            <Image
              src="/images/Group-1597883091-1.svg"
              alt={i === 0 ? "Client logos" : ""}
              width={152}
              height={152}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
