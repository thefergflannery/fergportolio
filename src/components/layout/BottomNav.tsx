"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function BottomNav() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (CSS.supports("animation-timeline", "scroll()")) return;

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
    <div
      style={{
        borderTop: "1px solid #111111",
        backgroundColor: "var(--wp--preset--color--accent-1)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--wp--style--global--wide-size)",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "var(--wp--preset--spacing--50)",
          paddingRight: "var(--wp--preset--spacing--50)",
          paddingTop: "var(--wp--preset--spacing--50)",
          paddingBottom: "var(--wp--preset--spacing--50)",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "var(--wp--preset--spacing--50)",
        }}
      >
        <div
          ref={logoRef}
          className="scroll-rotate"
          style={{ margin: 0, flexShrink: 0 }}
        >
          <Image
            src="/images/Group-1597883091-1.svg"
            alt=""
            width={152}
            height={152}
          />
        </div>

        <nav aria-label="Navigation 2">
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "var(--wp--preset--spacing--20)",
              textAlign: "right",
            }}
          >
            {[
              { label: "Selected Work", href: "/work" },
              { label: "About Me", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    fontSize: "var(--wp--preset--font-size--small)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
