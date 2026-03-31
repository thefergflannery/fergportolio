"use client";

import { useState, useEffect, useRef } from "react";
import { testimonials } from "@/data/testimonials";

const INTERVAL = 5000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, index]);

  const t = testimonials[index];
  if (!t) return null;

  return (
    <div
      style={{
        backgroundColor: "var(--wp--preset--color--base)",
        borderTop: "1px solid #111111",
        borderBottom: "1px solid #111111",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="testimonial-layout"
        style={{
          maxWidth: "var(--wp--style--global--wide-size)",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "stretch",
        }}
      >
        {/* Left: photo */}
        <div
          className="testimonial-photo"
          style={{
            flexBasis: "70%",
            flexShrink: 0,
            overflow: "hidden",
            minHeight: "340px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Document.jpg"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "83% 41%",
              display: "block",
            }}
          />
        </div>

        {/* Right: quote */}
        <div
          className="testimonial-quote"
          style={{
            flexBasis: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "var(--wp--preset--spacing--60) var(--wp--preset--spacing--50)",
            backgroundColor: "var(--wp--preset--color--base)",
          }}
        >
          <div
            key={t.id}
            style={{
              fontSize: "clamp(0.984rem, 0.984rem + ((1vw - 0.2rem) * 0.809), 1.5rem)",
              fontStyle: "italic",
              fontWeight: 300,
              textAlign: "right",
              marginBottom: "var(--wp--preset--spacing--50)",
              lineHeight: 1.4,
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </div>

          <div style={{ fontStyle: "normal", fontWeight: 1000, textAlign: "right" }}>
            {t.author}
          </div>

          {t.company && (
            <div style={{ textTransform: "uppercase", textAlign: "right", marginBottom: "var(--wp--preset--spacing--40)" }}>
              {t.company}
            </div>
          )}

          {/* Nav controls */}
          {testimonials.length > 1 && (
            <div style={{ display: "flex", gap: "12px", marginTop: "var(--wp--preset--spacing--30)" }}>
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                style={{
                  background: "none",
                  border: "1px solid #111111",
                  borderRadius: "9999px",
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 896 1024" aria-hidden="true">
                  <path fill="currentColor" d="M463.072 951.070l14.142-14.14c9.372-9.372 9.372-24.568 0-33.942l-356.988-356.988h751.774c13.254 0 24-10.746 24-24v-20c0-13.254-10.746-24-24-24h-751.774l356.988-356.988c9.372-9.372 9.372-24.568 0-33.942l-14.142-14.14c-9.372-9.372-24.568-9.372-33.94 0l-422.102 422.1c-9.372 9.372-9.372 24.568 0 33.942l422.102 422.1c9.372 9.372 24.568 9.372 33.94-0.002z" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                style={{
                  background: "none",
                  border: "1px solid #111111",
                  borderRadius: "9999px",
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 896 1024" aria-hidden="true" style={{ transform: "rotate(180deg)" }}>
                  <path fill="currentColor" d="M463.072 951.070l14.142-14.14c9.372-9.372 9.372-24.568 0-33.942l-356.988-356.988h751.774c13.254 0 24-10.746 24-24v-20c0-13.254-10.746-24-24-24h-751.774l356.988-356.988c9.372-9.372 9.372-24.568 0-33.942l-14.142-14.14c-9.372-9.372-24.568-9.372-33.94 0l-422.102 422.1c-9.372 9.372-9.372 24.568 0 33.942l422.102 422.1c9.372 9.372 24.568 9.372 33.94-0.002z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
