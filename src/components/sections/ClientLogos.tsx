"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const logos = [
  { src: "/images/tweak.png",                              alt: "Tweak.com",                        width: 82,  height: 52  },
  { src: "/images/dingle-logo-horizontal-bw-1024x347-1.webp", alt: "Sacred Heart University | Dingle", width: 142, height: 48  },
  { src: "/images/Murphys_Logo_260x.avif",                alt: "Murphy's Ice Cream",               width: 121, height: 79  },
  { src: "/images/fi.png",                                alt: "Fáilte Ireland",                   width: 133, height: 45  },
  { src: "/images/oceanworld.png",                        alt: "Oceanworld Dingle",                width: 120, height: 82  },
  { src: "/images/siar.png",                              alt: "Siar Music Festival",              width: 125, height: 38  },
  { src: "/images/razorspire-white.svg",                  alt: "RazorSpire",                       width: 130, height: 40  },
];

export default function ClientLogos() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const items = wrapper.querySelectorAll<HTMLElement>(".client-logo-item");
    if (!items.length) return;

    // Start all logos hidden
    gsap.set(items, { opacity: 0, x: -32 });

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top 85%",
      end: "top 25%",
      scrub: 0.8,
      animation: gsap.to(items, {
        opacity: 1,
        x: 0,
        stagger: { amount: 0.7, from: "start" },
        ease: "power2.out",
        duration: 1,
      }),
    });

    return () => { st.kill(); };
  }, []);

  return (
    <div
      ref={wrapperRef}
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
            className="client-logo-item"
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