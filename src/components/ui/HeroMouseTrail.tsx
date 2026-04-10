"use client";

import { useEffect, useRef } from "react";

// Lead blob + trail chain
const LEAD_SIZE = 90;   // px diameter of the front circle
const TRAIL_COUNT = 12; // number of trailing circles
const TRAIL_MIN = 14;   // smallest tail circle diameter

export default function HeroMouseTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Build DOM elements ───────────────────────────────────────────────────
    const all: HTMLDivElement[] = [];

    // Lead blob
    const lead = document.createElement("div");
    lead.style.cssText = `
      position: fixed;
      width: ${LEAD_SIZE}px;
      height: ${LEAD_SIZE}px;
      border-radius: 50%;
      background: #fff;
      mix-blend-mode: difference;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      opacity: 0;
      will-change: left, top;
      transition: width 0.3s ease, height 0.3s ease;
    `;
    document.body.appendChild(lead);
    all.push(lead);

    // Trail circles — shrink from LEAD_SIZE toward TRAIL_MIN
    const trail: HTMLDivElement[] = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const t = i / (TRAIL_COUNT - 1); // 0 → 1
      const size = LEAD_SIZE - (LEAD_SIZE - TRAIL_MIN) * t;
      const dot = document.createElement("div");
      dot.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: #fff;
        mix-blend-mode: difference;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        opacity: 0;
        will-change: left, top;
      `;
      document.body.appendChild(dot);
      all.push(dot);
      trail.push(dot);
    }

    // ── State ────────────────────────────────────────────────────────────────
    // positions[0] = lead, positions[1..N] = trail
    const positions = all.map(() => ({ x: -300, y: -300 }));
    let mouse = { x: -300, y: -300 };
    let isInHero = false;
    let rafId: number;

    function checkHero(x: number, y: number): boolean {
      const hero = document.querySelector(".hero-cover");
      if (!hero) return false;
      const r = hero.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isInHero = checkHero(mouse.x, mouse.y);
    }

    function onScroll() {
      isInHero = checkHero(mouse.x, mouse.y);
    }

    function animate() {
      rafId = requestAnimationFrame(animate);

      if (!isInHero) {
        all.forEach((el) => { el.style.opacity = "0"; });
        return;
      }

      // Lead: fast spring toward mouse
      positions[0].x += (mouse.x - positions[0].x) * 0.18;
      positions[0].y += (mouse.y - positions[0].y) * 0.18;

      // Each trail dot follows the element ahead with a slightly looser spring
      for (let i = 1; i < all.length; i++) {
        const lag = 0.18 - i * 0.008; // progressively looser
        positions[i].x += (positions[i - 1].x - positions[i].x) * Math.max(lag, 0.04);
        positions[i].y += (positions[i - 1].y - positions[i].y) * Math.max(lag, 0.04);
      }

      // Apply positions
      lead.style.opacity = "0.95";
      lead.style.left = `${positions[0].x}px`;
      lead.style.top = `${positions[0].y}px`;

      trail.forEach((dot, i) => {
        const opacity = 0.85 * (1 - (i + 1) / (TRAIL_COUNT + 1));
        dot.style.opacity = String(opacity);
        dot.style.left = `${positions[i + 1].x}px`;
        dot.style.top = `${positions[i + 1].y}px`;
      });
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      all.forEach((el) => el.remove());
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" />;
}