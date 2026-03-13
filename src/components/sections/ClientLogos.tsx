const logos = [
  { src: "/images/tweak.png",                              alt: "Tweak.com",                        width: 82,  height: 52  },
  { src: "/images/dingle-logo-horizontal-bw-1024x347-1.webp", alt: "Sacred Heart University | Dingle", width: 142, height: 48  },
  { src: "/images/Murphys_Logo_260x.avif",                alt: "Murphy's Ice Cream",               width: 121, height: 79  },
  { src: "/images/fi.png",                                alt: "Fáilte Ireland",                   width: 133, height: 45  },
  { src: "/images/oceanworld.svg",                        alt: "Oceanworld Dingle",                width: 120, height: 82  },
  { src: "/images/siar.png",                              alt: "Siar Music Festival",              width: 125, height: 38  },
];

export default function ClientLogos() {
  return (
    <div
      data-aos="slide-up"
      data-aos-duration="1350"
      style={{
        backgroundColor: "var(--wp--preset--color--contrast)",
        paddingTop: "var(--wp--preset--spacing--40)",
        paddingBottom: "var(--wp--preset--spacing--40)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--wp--style--global--wide-size)",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "var(--wp--preset--spacing--50)",
          paddingRight: "var(--wp--preset--spacing--50)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--wp--preset--spacing--40)",
        }}
      >
        {logos.map((logo) => (
          <div
            key={logo.alt}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              style={{ width: `${logo.width}px`, height: "auto", display: "block" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
