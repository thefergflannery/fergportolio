"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback } from "react";
import AnimatedText from "../ui/AnimatedText";
import { projects } from "@/data/projects";
import { sideProjects } from "@/data/side-projects";

interface ThumbState {
  src: string;
  x: number;
  y: number;
  visible: boolean;
}

export default function ProjectList() {
  const [thumb, setThumb] = useState<ThumbState>({
    src: "",
    x: 0,
    y: 0,
    visible: false,
  });

  const handleEnter = useCallback(
    (src: string) => () => setThumb((s) => ({ ...s, src, visible: true })),
    []
  );

  const handleLeave = useCallback(
    () => setThumb((s) => ({ ...s, visible: false })),
    []
  );

  const handleMove = useCallback((e: React.MouseEvent) => {
    setThumb((s) => ({ ...s, x: e.clientX, y: e.clientY }));
  }, []);

  return (
    <>
      {/* Floating hover thumbnail */}
      {thumb.visible && thumb.src && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            left: thumb.x + 20,
            top: thumb.y - 60,
            width: 300,
            height: 200,
            pointerEvents: "none",
            zIndex: 9999,
            overflow: "hidden",
            borderRadius: "4px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          }}
        >
          <Image
            src={thumb.src}
            alt=""
            fill
            style={{ objectFit: "cover" }}
            sizes="300px"
          />
        </div>
      )}

      <div id="swork" style={{ paddingRight: 0, paddingLeft: 0 }}>
        {/* "Selected Work" heading */}
        <div
          style={{
            paddingLeft: "var(--wp--preset--spacing--50)",
            paddingRight: "var(--wp--preset--spacing--50)",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <AnimatedText
            as="h2"
            id="selected-work"
            data-aos="slide-up"
            style={{
              textTransform: "uppercase",
              textAlign: "left",
              margin: 0,
              paddingTop: "var(--wp--preset--spacing--40)",
              paddingBottom: "var(--wp--preset--spacing--40)",
            }}
          >
            Selected Work
          </AnimatedText>
        </div>

        {/* Project rows */}
        <div data-aos="slide-up" data-aos-duration="900" data-aos-easing="ease-out" data-aos-mirror="true">
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              textTransform: "uppercase",
            }}
          >
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    borderBottom: "1px solid #111111",
                    marginTop: "var(--wp--preset--spacing--20)",
                    marginBottom: "var(--wp--preset--spacing--20)",
                    paddingLeft: "var(--wp--preset--spacing--50)",
                    paddingRight: "var(--wp--preset--spacing--50)",
                    gap: "var(--wp--preset--spacing--40)",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  onMouseEnter={handleEnter(project.thumbnailImage)}
                  onMouseLeave={handleLeave}
                  onMouseMove={handleMove}
                >
                  {/* Col 1: Project title */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ margin: 0 }}>{project.title}</h3>
                  </div>

                  {/* Col 2: Project subtitle/tagline */}
                  <div style={{ flexShrink: 0 }}>
                    <span
                      style={{
                        fontStyle: "italic",
                        fontWeight: 400,
                        textTransform: "capitalize",
                        fontSize: "var(--wp--preset--font-size--small)",
                      }}
                    >
                      {project.subtitle}
                    </span>
                  </div>

                  {/* Col 3: Arrow icon */}
                  <div
                    style={{
                      flexShrink: 0,
                      marginTop: "var(--wp--preset--spacing--30)",
                      marginBottom: "var(--wp--preset--spacing--30)",
                    }}
                  >
                    <Image
                      src="/images/arrow-circle-detour-row.svg"
                      alt=""
                      width={40}
                      height={40}
                      style={{ display: "block" }}
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Side Projects subsection */}
        <div
          style={{
            paddingLeft: "var(--wp--preset--spacing--50)",
            paddingRight: "var(--wp--preset--spacing--50)",
            paddingTop: "var(--wp--preset--spacing--50)",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "var(--wp--preset--font-size--small)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--wp--preset--color--accent-4)",
            }}
          >
            Side Projects
          </p>
        </div>

        <div data-aos="slide-up" data-aos-duration="900" data-aos-easing="ease-out" data-aos-mirror="true">
          <ul style={{ listStyle: "none", margin: 0, padding: 0, textTransform: "uppercase" }}>
            {sideProjects.map((project, i) => (
              <li key={project.href || i}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    borderBottom: "1px solid #111111",
                    marginTop: "var(--wp--preset--spacing--20)",
                    marginBottom: "var(--wp--preset--spacing--20)",
                    paddingLeft: "var(--wp--preset--spacing--50)",
                    paddingRight: "var(--wp--preset--spacing--50)",
                    gap: "var(--wp--preset--spacing--40)",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  onMouseEnter={handleEnter(project.thumbnailImage)}
                  onMouseLeave={handleLeave}
                  onMouseMove={handleMove}
                >
                  {/* Col 1: Project title */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ margin: 0 }}>{project.title}</h3>
                  </div>

                  {/* Col 2: Subtitle */}
                  <div style={{ flexShrink: 0 }}>
                    <span
                      style={{
                        fontStyle: "italic",
                        fontWeight: 400,
                        textTransform: "capitalize",
                        fontSize: "var(--wp--preset--font-size--small)",
                      }}
                    >
                      {project.subtitle}
                    </span>
                  </div>

                  {/* Col 3: External link arrow */}
                  <div
                    style={{
                      flexShrink: 0,
                      marginTop: "var(--wp--preset--spacing--30)",
                      marginBottom: "var(--wp--preset--spacing--30)",
                    }}
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                      <circle cx="20" cy="20" r="19.5" stroke="#111111"/>
                      <path d="M14 26L26 14M26 14H18M26 14V22" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
