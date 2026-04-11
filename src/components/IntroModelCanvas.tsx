"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

// ── Scroll state ─────────────────────────────────────────────────────────────
const introScroll = { y: 0 };
function trackIntroScroll() { introScroll.y = window.scrollY; }

// ── Renderer setup ───────────────────────────────────────────────────────────
function RendererSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
  }, [gl]);
  return null;
}

// ── Logo model ───────────────────────────────────────────────────────────────
const CAM_Z = 3.5;
const CAM_FOV = 45;

function LogoModel({ modelSrc }: { modelSrc: string }) {
  const { scene } = useGLTF(modelSrc);
  const groupRef = useRef<THREE.Group>(null);
  const scrollRotY = useRef(0);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const centre = new THREE.Vector3();
    box.getCenter(centre);
    scene.position.sub(centre);

    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    scene.scale.setScalar(2.2 / maxDim);
  }, [scene]);

  useFrame(() => {
    if (!groupRef.current) return;
    const yTarget = introScroll.y * 0.003;
    scrollRotY.current = THREE.MathUtils.lerp(scrollRotY.current, yTarget, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      scrollRotY.current,
      0.05
    );
  });

  return <primitive object={scene} ref={groupRef} />;
}

// ── Exported canvas component ─────────────────────────────────────────────────
// Camera at X=+1.3 shifts the view right → model appears on the LEFT of the
// full-width canvas, aligning visually with the text left edge below.
export function IntroModelDesktop({ modelSrc }: { modelSrc: string }) {
  useEffect(() => {
    window.addEventListener("scroll", trackIntroScroll, { passive: true });
    return () => window.removeEventListener("scroll", trackIntroScroll);
  }, []);

  return (
    <Canvas
      camera={{ position: [1.3, 0, CAM_Z], fov: CAM_FOV }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <RendererSetup />
      <Environment preset="studio" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <directionalLight position={[-3, -2, -3]} intensity={0.3} />
      <Suspense fallback={null}>
        <LogoModel modelSrc={modelSrc} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/logo-green.glb");