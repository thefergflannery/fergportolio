"use client";

import { useEffect, useRef } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";

export default function HeroGradient() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      if (!wrapperRef.current) return;
      // Parallax: move at 40% of scroll rate so it stays mostly in place
      const y = window.scrollY * 0.4;
      wrapperRef.current.style.transform = `translateY(${y}px)`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        willChange: "transform",
      }}
    >
      <ShaderGradientCanvas
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
        pixelDensity={2.3}
        fov={40}
      >
        <ShaderGradient
          animate="on"
          brightness={1.3}
          cAzimuthAngle={180}
          cDistance={5.41}
          cPolarAngle={90}
          cameraZoom={1}
          color1="#11ff00"
          color2="#009f00"
          color3="#44a308"
          envPreset="city"
          grain="on"
          lightType="3d"
          positionX={-0.4}
          positionY={0}
          positionZ={0}
          reflection={0.1}
          rotationX={0}
          rotationY={10}
          rotationZ={50}
          shader="defaults"
          type="waterPlane"
          uAmplitude={1}
          uDensity={2.9}
          uFrequency={5.5}
          uSpeed={0.3}
          uStrength={2.3}
          uTime={0}
          wireframe={false}
        />
      </ShaderGradientCanvas>
    </div>
  );
}