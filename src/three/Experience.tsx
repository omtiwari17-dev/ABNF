"use client";
/**
 * The single, persistent WebGL canvas. It lives in the root layout so moving
 * from landing → world → site never tears down the renderer; the route decides
 * which scene is mounted inside it.
 */
import { Suspense, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { usePathname } from "next/navigation";
import { parseRoute } from "@/lib/route";
import { getMachine } from "@/content";
import { lowerTier, settingsFor } from "@/lib/quality";
import { getState, setState, useExperience } from "@/lib/store";
import { Starfield } from "./env/Starfield";
import { LandingScene } from "./scenes/LandingScene";
import { GlobeScene } from "./scenes/GlobeScene";
import { SiteScene } from "./scenes/SiteScene";

function Background() {
  return <color attach="background" args={["#050608"]} />;
}

export default function Experience() {
  const pathname = usePathname();
  const route = useMemo(() => parseRoute(pathname), [pathname]);
  const quality = useExperience((s) => s.quality);
  const q = settingsFor(quality);

  // A new route means any descent finished; clear transient state.
  useEffect(() => {
    setState({ descending: null, focusedSite: null });
  }, [pathname]);

  const machine = route.kind === "site" ? getMachine(route.world, route.slug) : undefined;

  return (
    <Canvas
      className="experience-canvas"
      shadows={q.shadows ? { type: THREE.PCFSoftShadowMap } : false}
      dpr={q.dpr}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 42, near: 0.05, far: 4000, position: [0, 0, 9] }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.0;
        setState({ webgl: "ok" });
      }}
      aria-hidden="true"
    >
      <PerformanceMonitor
        onDecline={() => {
          const current = getState().quality;
          if (current !== "low") setState({ quality: lowerTier(current) });
        }}
      />
      <Background />
      {route.kind !== "site" && <Starfield count={q.starCount} />}
      <Suspense fallback={null}>
        {route.kind === "landing" && <LandingScene />}
        {route.kind === "world" && <GlobeScene key={route.world} world={route.world} />}
        {machine && <SiteScene key={machine.slug} machine={machine} />}
      </Suspense>
    </Canvas>
  );
}
