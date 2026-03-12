"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback } from "react";
import AnimatedText from "../ui/AnimatedText";
import { projects } from "@/data/projects";

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
            width: 180,
            height: 120,
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
            sizes="180px"
          />
        </div>
      )}

      <div id="swork" style={{ paddingRight: 0, paddingLeft: 0 }}>
        {/* "Selected Work" heading */}
        <div
          style={{
            maxWidth: "var(--wp--style--global--wide-size)",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "var(--wp--preset--spacing--50)",
            paddingRight: "var(--wp--preset--spacing--50)",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <AnimatedText
            as="h2"
            id="selected-work"
            data-aos="slide-up"
            style={{
              textTransform: "uppercase",
              textAlign: "right",
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
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    borderBottom: "1px solid #111111",
                    marginTop: "var(--wp--preset--spacing--20)",
                    marginBottom: "var(--wp--preset--spacing--20)",
                    paddingLeft: "var(--wp--preset--spacing--40)",
                    paddingRight: "var(--wp--preset--spacing--40)",
                    gap: "var(--wp--preset--spacing--40)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={handleEnter(project.thumbnailImage)}
                  onMouseLeave={handleLeave}
                  onMouseMove={handleMove}
                >
                  {/* Col 1: Project title */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ margin: 0 }}>
                      <Link
                        href={`/projects/${project.slug}`}
                        style={{ color: "#111111", textDecoration: "none" }}
                      >
                        {project.title}
                      </Link>
                    </h3>
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
                    <Link href={`/projects/${project.slug}`} tabIndex={-1} aria-hidden="true">
                      <Image
                        src="/images/arrow-circle-detour-row.svg"
                        alt=""
                        width={40}
                        height={40}
                        style={{ display: "block" }}
                      />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
