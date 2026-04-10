"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ── Mouse tracking shared state ─────────────────────────────────────────────
// Stored outside the component so the canvas doesn't re-render on every move
const mouse = { x: 0, y: 0 };

function trackMouse(e: MouseEvent) {
  // Normalise to ±1 across the viewport
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
}

// ── 3D model inner component ────────────────────────────────────────────────
function Model() {
  const { scene } = useGLTF("/models/ferg.glb");
  const groupRef = useRef<THREE.Group>(null);

  // Target rotation accumulator
  const target = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!groupRef.current) return;

    // Map normalised mouse to rotation range
    target.current.x = mouse.y * 0.2;  // tilt up/down ±0.2 rad
    target.current.y = mouse.x * 0.3;  // pan left/right ±0.3 rad

    // Lerp current rotation toward target — 0.05 = smooth, lazy follow
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      target.current.x,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      target.current.y,
      0.05
    );
  });

  return <primitive object={scene} ref={groupRef} />;
}

// ── Canvas wrapper ───────────────────────────────────────────────────────────
function ModelCanvas() {
  useEffect(() => {
    window.addEventListener("mousemove", trackMouse, { passive: true });
    return () => window.removeEventListener("mousemove", trackMouse);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} />
      <directionalLight position={[-3, -2, -3]} intensity={0.4} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  );
}

// ── Public component — handles mobile/desktop split ─────────────────────────
export default function HeroModel() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (isMobile) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/ferg-hero-fallback.jpg"
        alt=""
        aria-hidden="true"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }

  return <ModelCanvas />;
}

// Preload so the GLB starts fetching before Suspense mounts
useGLTF.preload("/models/ferg.glb");