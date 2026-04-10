"use client";

import dynamic from "next/dynamic";

const HeroModelMobile = dynamic(
  () => import("./HeroModelCanvas").then((m) => ({ default: m.HeroModelMobile })),
  { ssr: false, loading: () => null }
);

export default function HeroModelMobileWrapper() {
  return <HeroModelMobile />;
}