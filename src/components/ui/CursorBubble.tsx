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

      // Check on every move — no bind/unbind needed, works across navigations
      const inZone = !!(e.target as Element | null)?.closest?.(".cursor-hello-zone");
      el.classList.toggle("is-active", inZone);
    }

    document.addEventListener("mousemove", onMove);
    return () => { document.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <div ref={cursorRef} className="cursor--fixed" aria-hidden="true">
      HELLO
    </div>
  );
}
