"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroModelDesktop = dynamic(
  () => import("./HeroModelCanvas").then((m) => ({ default: m.HeroModelDesktop })),
  { ssr: false, loading: () => null }
);

const HeroModelMobile = dynamic(
  () => import("./HeroModelCanvas").then((m) => ({ default: m.HeroModelMobile })),
  { ssr: false, loading: () => null }
);

export default function HeroModel() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (isMobile === null) return null;

  if (isMobile) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HeroModelMobile />
      </div>
    );
  }

  return <HeroModelDesktop />;
}