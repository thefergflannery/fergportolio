"use client";

import Link from "next/link";
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
    <div
      className="top-nav"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        borderBottom: "1px solid #111111",
        minHeight: 0,
        backgroundColor: "#ffffff",
      }}
    >
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
          className="header-row"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            paddingTop: "var(--wp--preset--spacing--30)",
            paddingRight: "26px",
            paddingBottom: 0,
          }}
        >
          {/* Wiggle line separator - left side */}
          <div
            className="site-main-header"
            style={{
              flexBasis: "40%",
              flexShrink: 0,
              paddingTop: "var(--wp--preset--spacing--20)",
              paddingRight: "var(--wp--preset--spacing--40)",
              paddingBottom: "var(--wp--preset--spacing--20)",
            }}
          >
            <hr className="wiggle-line" />
          </div>

          {/* Navigation */}
          <nav
            aria-label="Navigation"
            style={{ flexBasis: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            {/* Desktop nav */}
            <ul
              style={{
                display: "flex",
                gap: "var(--wp--preset--spacing--20)",
                listStyle: "none",
                margin: 0,
                padding: 0,
                flexWrap: "nowrap",
                fontStyle: "normal",
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
                      style={{
                        textDecoration: "none",
                        color: "#111111",
                      }}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      style={{
                        textDecoration: "none",
                        color: "#111111",
                      }}
                    >
                      {item.label}
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
