"use client";

import { useEffect, useRef } from "react";

export default function CursorBubble() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      if (!el) return;
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
    }

    function onEnterZone() {
      el?.classList.add("is-active");
    }

    function onLeaveZone() {
      el?.classList.remove("is-active");
    }

    document.addEventListener("mousemove", onMove);

    // Show cursor bubble only within .cursor-hello-zone elements
    function bindZones() {
      document.querySelectorAll(".cursor-hello-zone").forEach((zone) => {
        zone.addEventListener("mouseenter", onEnterZone);
        zone.addEventListener("mouseleave", onLeaveZone);
      });
    }

    bindZones();

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.querySelectorAll(".cursor-hello-zone").forEach((zone) => {
        zone.removeEventListener("mouseenter", onEnterZone);
        zone.removeEventListener("mouseleave", onLeaveZone);
      });
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor--fixed" aria-hidden="true">
      HELLO
    </div>
  );
}
