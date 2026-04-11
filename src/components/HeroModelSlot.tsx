"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";

export default function HeroModelSlot() {
  const [Comp, setComp] = useState<ComponentType | null>(null);

  useEffect(() => {
    // Import only runs in the browser — safe for WebGL/Canvas
    import("./HeroModelCanvas").then((m) => {
      setComp(() => m.HeroModelDesktop);
    });
  }, []);

  if (!Comp) return null;
  return <Comp />;
}