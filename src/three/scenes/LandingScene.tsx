"use client";
import { useState } from "react";
import { useThree } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { Globe } from "../Globe";
import { CameraRig } from "../CameraRig";
import { getWorld } from "@/content";
import { useExperience } from "@/lib/store";

/** Two worlds hanging in the dark. Real relative size: Mars is about twice the Moon. */
export function LandingScene() {
  const router = useRouter();
  const reduced = useExperience((s) => s.reducedMotion);
  const aspect = useThree((s) => s.viewport.aspect);
  const portrait = aspect < 0.9;
  const [hover, setHover] = useState<string | null>(null);
  const moon = getWorld("moon");
  const mars = getWorld("mars");
  const spin = reduced ? 0 : 0.03;
  const moonPos: [number, number, number] = portrait ? [0.25, 1.55, 0] : [0.7, 1.15, -0.5];
  const marsPos: [number, number, number] = portrait ? [-0.1, -1.0, 0] : [2.4, -0.45, 0];

  return (
    <>
      <CameraRig shot={{ key: `landing-${portrait}`, position: [0, 0, portrait ? 9.5 : 7.2], target: [0, 0, 0], duration: reduced ? 0 : 2.4 }} interactive={false} />
      <ambientLight intensity={0.05} />
      <directionalLight position={[-6, 2, 5]} intensity={2.4} color="#fff6ea" />
      <group position={moonPos} scale={hover === "moon" ? 1.04 : 1}>
        <Globe
          world="moon"
          texture={moon.texture}
          radius={0.62}
          spin={spin}
          onClick={() => router.push("/moon")}
          onPointerOver={() => {
            setHover("moon");
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHover(null);
            document.body.style.cursor = "";
          }}
        />
      </group>
      <group position={marsPos} scale={hover === "mars" ? 1.04 : 1}>
        <Globe
          world="mars"
          texture={mars.texture}
          radius={1.2}
          spin={spin * 0.8}
          onClick={() => router.push("/mars")}
          onPointerOver={() => {
            setHover("mars");
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHover(null);
            document.body.style.cursor = "";
          }}
        />
      </group>
    </>
  );
}
