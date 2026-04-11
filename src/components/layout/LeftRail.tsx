"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function LeftRail() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      if (!logoRef.current) return;
      const y = window.scrollY || window.pageYOffset || 0;
      logoRef.current.style.transform = `rotate(${y * 0.2}deg)`;
    }

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="left-rail">
      {/* Scroll-rotate logo */}
      <div ref={logoRef} className="scroll-rotate">
        <Link href="/" aria-label="Ferg Flannery – Home">
          <Image
            src="/images/FF-black.svg"
            alt="Ferg Flannery – Creative Consultant"
            width={54}
            height={54}
            priority
          />
        </Link>
      </div>

      {/* CONTACT button — rotated, pinned to bottom */}
      <Link href="/contact" className="rail-contact">
        Contact
      </Link>
    </div>
  );
}
