"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Reverse of AnimatedText — hero words exit upward as the user scrolls away.
 * Targets elements with className "hero-stagger-out".
 * Splits text into word <span>s then scrubs them out with a stagger.
 */
export default function HeroScrollOut() {
  useEffect(() => {
    const containers =
      document.querySelectorAll<HTMLElement>(".hero-stagger-out");
    if (!containers.length) return;

    // Split each container's text nodes into word spans
    const allWords: HTMLElement[] = [];

    containers.forEach((el) => {
      // Reuse existing spans if already split (handles StrictMode double-invoke)
      const existing = el.querySelectorAll<HTMLElement>(".hero-out-word");
      if (existing.length > 0) {
        existing.forEach((w) => allWords.push(w));
        return;
      }

      // Walk text nodes (preserves <br> elements)
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (node.textContent?.trim()) textNodes.push(node as Text);
      }

      textNodes.forEach((textNode) => {
        const words = (textNode.textContent ?? "").split(/(\s+)/);
        const frag = document.createDocumentFragment();
        words.forEach((chunk) => {
          if (/^\s+$/.test(chunk)) {
            frag.appendChild(document.createTextNode(chunk));
          } else if (chunk) {
            const span = document.createElement("span");
            span.className = "hero-out-word";
            span.textContent = chunk;
            span.style.display = "inline-block";
            frag.appendChild(span);
            allWords.push(span);
          }
        });
        textNode.parentNode?.replaceChild(frag, textNode);
      });
    });

    if (!allWords.length) return;

    // Set initial state — words start visible
    gsap.set(allWords, { opacity: 1, y: 0 });

    const st = ScrollTrigger.create({
      trigger: ".hero-cover",
      start: "top top",
      end: "55% top",
      scrub: 1,
      animation: gsap.to(allWords, {
        opacity: 0,
        y: -70,
        stagger: { amount: 0.5, from: "start" },
        ease: "power2.in",
        duration: 1,
      }),
    });

    // Refresh after fonts/images settle so trigger bounds are accurate on mobile
    const tid = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      st.kill();
      clearTimeout(tid);
    };
  }, []);

  return null;
}