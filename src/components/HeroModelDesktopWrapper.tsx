"use client";

import dynamic from "next/dynamic";

const HeroModelDesktop = dynamic(
  () => import("./HeroModelCanvas").then((m) => ({ default: m.HeroModelDesktop })),
  { ssr: false, loading: () => null }
);

export default function HeroModelDesktopWrapper() {
  return <HeroModelDesktop />;
}