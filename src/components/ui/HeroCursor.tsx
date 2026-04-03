"use client";

import { useEffect, useRef } from "react";

/**
 * Arrow cursor bubble — follows the mouse, only active inside .hero-cover.
 * Uses position:fixed so it overlays correctly regardless of scroll.
 * z-index 1000 keeps it above hero content but below the sticky nav.
 */
export default function HeroCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      if (!el) return;
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";

      const inHero = !!(e.target as Element | null)?.closest?.(".hero-cover");
      el.classList.toggle("is-active", inHero);
    }

    document.addEventListener("mousemove", onMove);
    return () => { document.removeEventListener("mousemove", onMove); };
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
      className="hero-cursor"
    >
      {/* Arrow SVG */}
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
    </div>
  );
}