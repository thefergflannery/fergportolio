"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const mouse = { x: 0, y: 0 };

function trackMouse(e: MouseEvent) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
}

function Model() {
  const { scene } = useGLTF("/models/ferg.glb");
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.y * 0.2,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.3,
      0.05
    );
  });

  return <primitive object={scene} ref={groupRef} />;
}

export default function HeroModelCanvas() {
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

useGLTF.preload("/models/ferg.glb");