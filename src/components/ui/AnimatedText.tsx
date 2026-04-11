"use client";

import React, { useRef, useEffect, ComponentPropsWithRef, ElementType } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type AnimatedTextProps<T extends ElementType = "p"> = {
  as?: T;
  children: string;
} & Omit<ComponentPropsWithRef<T>, "children" | "as">;

export default function AnimatedText<T extends ElementType = "p">({
  as,
  children,
  ...props
}: AnimatedTextProps<T>) {
  const Tag = (as ?? "p") as ElementType;
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Already split
    if (el.dataset.split === "true") return;
    el.dataset.split = "true";

    const text = el.textContent?.trim() ?? "";
    const frag = document.createDocumentFragment();

    text.split(/\s+/).forEach((word, wi, words) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "word";

      [...word].forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.className = "char";
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
      });

      frag.appendChild(wordSpan);
      if (wi < words.length - 1) frag.appendChild(document.createTextNode(" "));
    });

    el.textContent = "";
    el.appendChild(frag);

    const chars = el.querySelectorAll<HTMLElement>(".char");

    const anim = gsap.from(chars, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "top 35%",
        scrub: true,
      },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.03,
      ease: "power2.out",
    });

    return () => {
      anim.revert(); // reverts inline styles so chars return to natural opacity
      el.dataset.split = ""; // allow re-init if effect re-runs (StrictMode)
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === el) t.kill();
      });
    };
  }, []);

  return React.createElement(Tag, { ref: elRef, className: "animated-text", ...props }, children);
}
