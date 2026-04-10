"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

const mouse = { x: 0, y: 0 };

function trackMouse(e: MouseEvent) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
}

// Fix renderer colour space so GLB PBR materials display correctly
function RendererSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
  }, [gl]);
  return null;
}

function Model() {
  const { scene } = useGLTF("/models/ferg.glb");
  const groupRef = useRef<THREE.Group>(null);

  // Centre on bounding box so model sits at world origin
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const centre = new THREE.Vector3();
    box.getCenter(centre);
    scene.position.sub(centre);
  }, [scene]);

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
      <RendererSetup />
      {/* Environment preset provides image-based lighting so GLB materials render correctly */}
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} />
      <directionalLight position={[-3, -2, -3]} intensity={0.4} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/ferg.glb");