"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

// Shared input — written by mouse or accelerometer, read by useFrame
const input = { x: 0, y: 0 };

export function trackMouse(e: MouseEvent) {
  input.x = (e.clientX / window.innerWidth) * 2 - 1;
  // Corrected: positive y = mouse up = tilt back (no negation)
  input.y = (e.clientY / window.innerHeight) * 2 - 1;
}

export function trackGyro(beta: number, gamma: number) {
  // beta  = front/back tilt  (-180 → 180), gamma = left/right (-90 → 90)
  input.x = THREE.MathUtils.clamp(gamma / 45, -1, 1);   // left/right → x
  input.y = THREE.MathUtils.clamp(beta / 60, -1, 1);    // forward/back → y
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

const CAM_Z = 3;
const CAM_FOV = 45;

function Model({ centred = false }: { centred?: boolean }) {
  const { scene } = useGLTF("/models/ferg.glb");
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const centre = new THREE.Vector3();
    box.getCenter(centre);
    scene.position.sub(centre);

    if (!centred) {
      // Shift down so model bottom aligns with canvas bottom
      const halfH = Math.tan((CAM_FOV * Math.PI) / 360) * CAM_Z;
      const newBox = new THREE.Box3().setFromObject(scene);
      const modelHalfH = (newBox.max.y - newBox.min.y) / 2;
      scene.position.y -= halfH - modelHalfH;
    }
  }, [scene, size, centred]);

  useFrame(() => {
    if (!groupRef.current) return;
    // Y axis: mouse up (input.y < 0) → tilt forward (negative x rotation) — corrected
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      input.y * 0.35,
      0.05
    );
    // X axis: mouse right → rotate right
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      input.x * 0.45,
      0.05
    );
  });

  return <primitive object={scene} ref={groupRef} />;
}

function SceneContents({ centred }: { centred: boolean }) {
  return (
    <>
      <RendererSetup />
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} />
      <directionalLight position={[-3, -2, -3]} intensity={0.4} />
      <Suspense fallback={null}>
        <Model centred={centred} />
      </Suspense>
    </>
  );
}

// Desktop: fills right column, bottom-aligned, mouse follow
export function HeroModelDesktop() {
  useEffect(() => {
    window.addEventListener("mousemove", trackMouse, { passive: true });
    return () => window.removeEventListener("mousemove", trackMouse);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, CAM_Z], fov: CAM_FOV }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneContents centred={false} />
    </Canvas>
  );
}

// Mobile: centred in viewport, gyroscope follow
export function HeroModelMobile() {
  useEffect(() => {
    let listening = false;

    function startGyro() {
      window.addEventListener(
        "deviceorientation",
        (e: DeviceOrientationEvent) => {
          if (e.beta !== null && e.gamma !== null) {
            trackGyro(e.beta, e.gamma);
          }
        },
        { passive: true }
      );
      listening = true;
    }

    // iOS 13+ requires permission
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((state: string) => {
          if (state === "granted") startGyro();
        })
        .catch(() => {});
    } else {
      startGyro();
    }

    return () => {
      if (listening) {
        window.removeEventListener("deviceorientation", startGyro as never);
      }
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, CAM_Z], fov: CAM_FOV }}
      style={{ width: "100vw", height: "60vh" }}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneContents centred={true} />
    </Canvas>
  );
}

useGLTF.preload("/models/ferg.glb");