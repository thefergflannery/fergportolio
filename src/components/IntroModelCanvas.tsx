"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

// ── Shared scroll + element state ────────────────────────────────────────────
// elementCenterY: absolute Y of the slot's centre in the document
const introState = { scrollY: 0, elementCenterY: 0 };

function trackIntroScroll() {
  introState.scrollY = window.scrollY;
}

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
  const scrollRotX = useRef(0);

  useEffect(() => {
    // Centre and scale the model
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

    // Y rotation: scroll-driven (same as hero model)
    const yTarget = introState.scrollY * 0.003;
    scrollRotY.current = THREE.MathUtils.lerp(scrollRotY.current, yTarget, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      scrollRotY.current,
      0.05
    );

    // X rotation: 0 when element centre is at viewport centre
    // small tilt as user scrolls past — clamped tight so flat logo stays visible
    const viewportH = window.innerHeight;
    const distFromCenter = introState.scrollY + viewportH / 2 - introState.elementCenterY;
    const xTarget = THREE.MathUtils.clamp(distFromCenter * 0.0002, -0.15, 0.15);
    scrollRotX.current = THREE.MathUtils.lerp(scrollRotX.current, xTarget, 0.06);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      scrollRotX.current,
      0.05
    );
  });

  return <primitive object={scene} ref={groupRef} />;
}

// ── Exported canvas component ────────────────────────────────────────────────
// containerRef: the slot wrapper div — used to calculate element centre
export function IntroModelDesktop({
  modelSrc,
  containerRef,
}: {
  modelSrc: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    window.addEventListener("scroll", trackIntroScroll, { passive: true });

    function updateCenter() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      introState.elementCenterY = window.scrollY + rect.top + rect.height / 2;
    }

    // Delay first measure so fonts/images have settled
    const tid = setTimeout(updateCenter, 300);
    window.addEventListener("resize", updateCenter, { passive: true });

    return () => {
      clearTimeout(tid);
      window.removeEventListener("scroll", trackIntroScroll);
      window.removeEventListener("resize", updateCenter);
    };
  }, [containerRef]);

  return (
    // Shift canvas left by ~10% so the model's visual centre aligns with text edge
    <Canvas
      camera={{ position: [0.4, 0, CAM_Z], fov: CAM_FOV }}
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