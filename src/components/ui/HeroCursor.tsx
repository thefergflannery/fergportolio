"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/**
 * Arrow cursor bubble — follows the mouse, only active inside .hero-cover.
 * Clicking anywhere on the hero scrolls to #work.
 * z-index 1000, contained to the hero.
 */
export default function HeroCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    let lastX = -9999;
    let lastY = -9999;

    function setVisibility(inHero: boolean) {
      if (!el) return;
      el.style.opacity = inHero ? "1" : "0";
      el.style.pointerEvents = inHero ? "auto" : "none";
    }

    function isMouseOverHero(): boolean {
      const hero = document.querySelector(".hero-cover");
      if (!hero) return false;
      const r = hero.getBoundingClientRect();
      return lastX >= r.left && lastX <= r.right && lastY >= r.top && lastY <= r.bottom;
    }

    function onMove(e: MouseEvent) {
      if (!el) return;
      lastX = e.clientX;
      lastY = e.clientY;
      el.style.left = lastX + "px";
      el.style.top = lastY + "px";
      setVisibility(isMouseOverHero());
    }

    function onScroll() {
      setVisibility(isMouseOverHero());
    }

    document.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        width: "100px",
        height: "100px",
        borderRadius: "9999px",
        backgroundColor: "var(--lime)",
        color: "#111",
        pointerEvents: "none",
        zIndex: 1000,
        opacity: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.15s ease",
      }}
    >
      <Link
        href="#work"
        aria-label="Scroll to selected work"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          borderRadius: "9999px",
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 4L12 20M12 20L6 14M12 20L18 14"
            stroke="#111"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}