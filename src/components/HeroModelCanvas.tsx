"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

// ── Shared input state ───────────────────────────────────────────────────────
const mouse = { x: 0, y: 0 };
const scroll = { y: 0 };       // raw scrollY, updated by listener
const hover = { active: false };

function trackMouse(e: MouseEvent) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
}

function trackScroll() {
  scroll.y = window.scrollY;
}

// ── Renderer colour space ────────────────────────────────────────────────────
function RendererSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
  }, [gl]);
  return null;
}

// ── Reactive directional light ───────────────────────────────────────────────
// Switches colour to lime on hover, neutral white otherwise
function KeyLight() {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const limeColor = new THREE.Color("#51ff00");
  const neutralColor = new THREE.Color("#ffffff");

  useFrame(() => {
    if (!lightRef.current) return;
    const target = hover.active ? limeColor : neutralColor;
    lightRef.current.color.lerp(target, 0.08);
  });

  return <directionalLight ref={lightRef} position={[3, 4, 5]} intensity={1.5} />;
}

// ── 3D model ─────────────────────────────────────────────────────────────────
const CAM_Z = 3;
const CAM_FOV = 45;

function Model() {
  const { scene } = useGLTF("/models/ferg.glb");
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();

  // Lerped targets — mouse + scroll each contribute to rotation
  const rotTarget = useRef({ x: 0, y: 0 });
  const scrollRotY = useRef(0); // cumulative scroll-driven Y rotation

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const centre = new THREE.Vector3();
    box.getCenter(centre);
    scene.position.sub(centre);

    // Shift down — 0.75 factor leaves breathing room above overflow:hidden boundary
    const halfH = Math.tan((CAM_FOV * Math.PI) / 360) * CAM_Z;
    const newBox = new THREE.Box3().setFromObject(scene);
    const modelHalfH = (newBox.max.y - newBox.min.y) / 2;
    scene.position.y -= (halfH - modelHalfH) * 0.75;
  }, [scene, size]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Scroll: accumulate rotation — each pixel scrolled adds a fraction of a radian
    // Clamp to prevent endless spinning if user scrolls a lot
    const scrollDelta = scroll.y * 0.003;
    scrollRotY.current = THREE.MathUtils.lerp(scrollRotY.current, scrollDelta, 0.06);

    // Mouse follow adds on top of scroll rotation
    rotTarget.current.x = mouse.y * 0.35;
    rotTarget.current.y = mouse.x * 0.45;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      rotTarget.current.x,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rotTarget.current.y + scrollRotY.current,
      0.05
    );

    void delta;
  });

  return <primitive object={scene} ref={groupRef} />;
}

// ── Desktop canvas ────────────────────────────────────────────────────────────
export function HeroModelDesktop() {
  useEffect(() => {
    window.addEventListener("mousemove", trackMouse, { passive: true });
    window.addEventListener("scroll", trackScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", trackMouse);
      window.removeEventListener("scroll", trackScroll);
    };
  }, []);

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      onMouseEnter={() => { hover.active = true; }}
      onMouseLeave={() => { hover.active = false; }}
    >
      <Canvas
        camera={{ position: [0, 0, CAM_Z], fov: CAM_FOV }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
      >
        <RendererSetup />
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <KeyLight />
        <directionalLight position={[-3, -2, -3]} intensity={0.4} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/ferg.glb");