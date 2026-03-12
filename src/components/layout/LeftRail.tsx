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
      const speed = 0.2;
      logoRef.current.style.transform = `rotate(${y * speed}deg)`;
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("load", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("load", update);
    };
  }, []);

  return (
    <div
      className="left-rail"
      style={{
        flexBasis: "200%",
        flexShrink: 0,
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <div
        style={{
          backgroundColor: "var(--wp--preset--color--accent-1)",
          borderRight: "1px solid #111111",
          height: "100%",
          paddingLeft: "var(--wp--preset--spacing--50)",
          paddingRight: "var(--wp--preset--spacing--50)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Sticky logo */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            paddingTop: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            ref={logoRef}
            style={{
              marginTop: "-15px",
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            <Link href="/" aria-label="Ferg Flannery – Home">
              <Image
                src="/images/logo.png"
                alt="Ferg Flannery – Creative Consultant"
                width={77}
                height={77}
                priority
              />
            </Link>
          </div>
        </div>

        {/* CONTACT button */}
        <div
          className="rail-buttons"
          style={{
            paddingTop: "var(--wp--preset--spacing--40)",
            paddingBottom: "var(--wp--preset--spacing--50)",
          }}
        >
          <Link
            href="/contact"
            className="rail-contact"
            style={{
              display: "inline-block",
              backgroundColor: "#ffffff",
              color: "#111111",
              borderRadius: "100px",
              paddingTop: "15px",
              paddingRight: "16px",
              paddingBottom: "15px",
              paddingLeft: "16px",
              fontStyle: "normal",
              fontWeight: 800,
              fontSize: "var(--wp--preset--font-size--small)",
              textDecoration: "none",
              textAlign: "left",
              textTransform: "uppercase",
            }}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
