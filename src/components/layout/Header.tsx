"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Selected Work", href: "/work" },
  { label: "About Me", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "photography", href: "https://www.fergflanneryphoto.com/", external: true },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="top-nav" style={{ borderBottom: "1px solid #111111" }}>
      <div
        style={{
          maxWidth: "var(--wp--style--global--wide-size)",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "var(--wp--preset--spacing--50)",
          paddingRight: "var(--wp--preset--spacing--50)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            paddingTop: "var(--wp--preset--spacing--30)",
            paddingBottom: "var(--wp--preset--spacing--30)",
          }}
        >
          {/* Mobile logo — hidden on desktop via CSS */}
          <div className="mobile-logo">
            <Link href="/" aria-label="Ferg Flannery – Home">
              <Image src="/images/FF-black.svg" alt="Ferg Flannery" width={48} height={48} priority />
            </Link>
          </div>

          {/* Wiggle line — left side, hidden on mobile */}
          <div
            className="wiggle-line-wrap"
            style={{
              flex: 1,
              paddingTop: "var(--wp--preset--spacing--20)",
              paddingRight: "var(--wp--preset--spacing--40)",
              paddingBottom: "var(--wp--preset--spacing--20)",
            }}
          >
            <span className="wiggle-line" aria-hidden="true" />
          </div>

          {/* Navigation */}
          <nav
            aria-label="Navigation"
            style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
          >
            <ul
              style={{
                display: "flex",
                gap: "var(--wp--preset--spacing--20)",
                listStyle: "none",
                margin: 0,
                padding: 0,
                flexWrap: "nowrap",
                fontWeight: 300,
                textTransform: "uppercase",
                fontSize: "var(--wp--preset--font-size--small)",
                justifyContent: "flex-end",
              }}
            >
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-item-link"
                    >
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="nav-item-link"
                    >
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
