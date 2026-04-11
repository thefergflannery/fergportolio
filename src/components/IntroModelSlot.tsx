"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Props {
  modelSrc: string;
}

export default function IntroModelSlot({ modelSrc }: Props) {
  const [Comp, setComp] = useState<ComponentType<{ modelSrc: string }> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("./IntroModelCanvas").then((m) => {
      setComp(() => m.IntroModelDesktop);
    });
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, x: -32 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "top 35%",
      scrub: 0.8,
      animation: gsap.to(el, {
        opacity: 1,
        x: 0,
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
        width: "100%",
        height: "220px",
        marginBottom: "var(--wp--preset--spacing--30)",
      }}
    >
      {Comp && <Comp modelSrc={modelSrc} />}
    </div>
  );
}