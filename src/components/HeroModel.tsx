"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Load the Canvas/R3F component only on the client — WebGL doesn't exist on the server
const HeroModelCanvas = dynamic(() => import("./HeroModelCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function HeroModel() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Render nothing until we know viewport size (avoids hydration flash)
  if (isMobile === null) return null;

  if (isMobile) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/ferg-hero-fallback.jpg"
        alt=""
        aria-hidden="true"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }

  return <HeroModelCanvas />;
}