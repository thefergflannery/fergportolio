"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function WorkIntroScrollOut() {
  useEffect(() => {
    const containers = document.querySelectorAll<HTMLElement>(".work-stagger-out");
    if (!containers.length) return;

    const allWords: HTMLElement[] = [];

    containers.forEach((el) => {
      const existing = el.querySelectorAll<HTMLElement>(".work-out-word");
      if (existing.length > 0) {
        existing.forEach((w) => allWords.push(w));
        return;
      }

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
            span.className = "work-out-word";
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

    gsap.set(allWords, { opacity: 1, y: 0 });

    const trigger = document.querySelector<HTMLElement>("#work");

    const st = ScrollTrigger.create({
      trigger: trigger ?? ".work-stagger-out",
      start: "top top",
      end: "60% top",
      scrub: 1,
      animation: gsap.to(allWords, {
        opacity: 0,
        y: -70,
        stagger: { amount: 0.5, from: "start" },
        ease: "power2.in",
        duration: 1,
      }),
    });

    const tid = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      st.kill();
      clearTimeout(tid);
      allWords.forEach((w) => {
        w.parentNode?.replaceChild(document.createTextNode(w.textContent ?? ""), w);
      });
    };
  }, []);

  return null;
}