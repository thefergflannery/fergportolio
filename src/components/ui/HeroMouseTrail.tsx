"use client";

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 20;
const DOT_SIZE = 18; // px diameter

export default function HeroMouseTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create trail dot elements
    const dots: HTMLDivElement[] = [];
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const dot = document.createElement("div");
      const scale = 1 - i / TRAIL_LENGTH; // shrink toward tail
      const size = DOT_SIZE * scale;
      dot.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: #1a1a1a;
        mix-blend-mode: difference;
        pointer-events: none;
        z-index: 999;
        transform: translate(-50%, -50%);
        opacity: 0;
        will-change: left, top;
      `;
      document.body.appendChild(dot);
      dots.push(dot);
    }

    // Spring positions for each dot
    const positions: { x: number; y: number }[] = dots.map(() => ({ x: -200, y: -200 }));
    let mouse = { x: -200, y: -200 };
    let isInHero = false;
    let rafId: number;

    function isMouseInHero(x: number, y: number): boolean {
      const hero = document.querySelector(".hero-cover");
      if (!hero) return false;
      const r = hero.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isInHero = isMouseInHero(mouse.x, mouse.y);
    }

    function onScroll() {
      isInHero = isMouseInHero(mouse.x, mouse.y);
    }

    function animate() {
      rafId = requestAnimationFrame(animate);

      if (!isInHero) {
        // Fade out all dots when outside hero
        dots.forEach((dot) => {
          dot.style.opacity = "0";
        });
        return;
      }

      // Lead dot follows mouse directly
      positions[0].x += (mouse.x - positions[0].x) * 0.35;
      positions[0].y += (mouse.y - positions[0].y) * 0.35;

      // Each subsequent dot follows the one before it
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.35;
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.35;
      }

      dots.forEach((dot, i) => {
        const opacity = (1 - i / TRAIL_LENGTH) * 0.85;
        dot.style.opacity = String(opacity);
        dot.style.left = `${positions[i].x}px`;
        dot.style.top = `${positions[i].y}px`;
      });
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      dots.forEach((dot) => dot.remove());
    };
  }, []);

  // This component only mounts the effect — no visible DOM of its own
  return <div ref={containerRef} aria-hidden="true" />;
}