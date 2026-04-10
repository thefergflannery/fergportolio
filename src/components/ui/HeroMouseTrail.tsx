"use client";

import { useEffect, useRef } from "react";

const MAX_LIFE = 50;     // frames a point lives
const RADIUS = 72;       // px radius at birth
const STEP = 6;          // px between trail points along path

export default function HeroMouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Size canvas to its CSS box
    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    type Point = { x: number; y: number; life: number };
    const points: Point[] = [];
    let prevX = -999;
    let prevY = -999;

    function onMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only draw while inside the canvas (= inside hero due to overflow:hidden)
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      const dx = x - prevX;
      const dy = y - prevY;
      const dist = Math.hypot(dx, dy);

      if (prevX < -100 || dist > STEP * 30) {
        // First entry or big teleport — single point
        points.push({ x, y, life: MAX_LIFE });
      } else {
        // Interpolate along path for dense, smooth trail
        const steps = Math.ceil(dist / STEP);
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          points.push({
            x: prevX + dx * t,
            y: prevY + dy * t,
            life: MAX_LIFE,
          });
        }
      }

      prevX = x;
      prevY = y;
    }

    let rafId: number;

    function animate() {
      rafId = requestAnimationFrame(animate);
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = points.length - 1; i >= 0; i--) {
        points[i].life--;
        if (points[i].life <= 0) {
          points.splice(i, 1);
          continue;
        }

        const t = points[i].life / MAX_LIFE; // 1 = fresh → 0 = dead
        const r = RADIUS * t;               // shrinks with age
        const alpha = t;

        const grad = ctx.createRadialGradient(
          points[i].x, points[i].y, 0,
          points[i].x, points[i].y, r
        );
        grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
        grad.addColorStop(1, `rgba(255,255,255,0)`);

        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
}