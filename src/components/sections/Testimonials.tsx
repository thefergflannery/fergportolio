"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { testimonials } from "@/data/testimonials";

const INTERVAL = 5000;
const FADE_MS = 240;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function goTo(newIndex: number) {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    setFading(true);
    fadeTimerRef.current = setTimeout(() => {
      setIndex(newIndex);
      setFading(false);
    }, FADE_MS);
  }

  const next = useCallback(
    () => goTo((index + 1) % testimonials.length),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index]
  );
  const prev = useCallback(
    () => goTo((index - 1 + testimonials.length) % testimonials.length),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index]
  );

  // Auto-scroll — resets whenever paused state or index changes
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next]);

  // Cleanup fade timer on unmount
  useEffect(() => {
    return () => { if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current); };
  }, []);

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
          marginLeft: 0,
          marginRight: "auto",
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "stretch",
        }}
      >
        {/* Left: photo — flush with left-rail edge */}
        <div
          className="testimonial-photo"
          style={{
            flexBasis: "50%",
            flexShrink: 0,
            overflow: "hidden",
            minHeight: "380px",
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

        {/* Right: quote — fixed height to prevent resize between slides */}
        <div
          className="testimonial-quote"
          style={{
            flexBasis: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "var(--wp--preset--spacing--60) var(--wp--preset--spacing--50)",
            backgroundColor: "var(--wp--preset--color--base)",
            minHeight: "380px",
          }}
        >
          {/* Fading content wrapper — opacity transition, no height change */}
          <div
            aria-live="polite"
            aria-atomic="true"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              transition: `opacity ${FADE_MS}ms ease`,
              opacity: fading ? 0 : 1,
            }}
          >
            <div
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
          </div>

          {/* Nav controls — outside fade wrapper so they stay visible during transition */}
          {testimonials.length > 1 && (
            <div style={{ display: "flex", gap: "12px", marginTop: "var(--wp--preset--spacing--30)" }}>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                style={btnStyle}
              >
                <svg width="12" height="12" viewBox="0 0 896 1024" aria-hidden="true">
                  <path fill="currentColor" d="M463.072 951.070l14.142-14.14c9.372-9.372 9.372-24.568 0-33.942l-356.988-356.988h751.774c13.254 0 24-10.746 24-24v-20c0-13.254-10.746-24-24-24h-751.774l356.988-356.988c9.372-9.372 9.372-24.568 0-33.942l-14.142-14.14c-9.372-9.372-24.568-9.372-33.94 0l-422.102 422.1c-9.372 9.372-9.372 24.568 0 33.942l422.102 422.1c9.372 9.372 24.568 9.372 33.94-0.002z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                style={btnStyle}
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

const btnStyle: React.CSSProperties = {
  background: "none",
  border: "1px solid #111111",
  borderRadius: "9999px",
  width: "36px",
  height: "36px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};