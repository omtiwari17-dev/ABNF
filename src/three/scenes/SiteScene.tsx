"use client";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { Machine } from "@/content/schema";
import { CameraRig, type ShotRequest } from "../CameraRig";
import { FrameOffset } from "../FrameOffset";
import { Terrain, Rocks } from "../env/Terrain";
import { Starfield } from "../env/Starfield";
import { MarsSky } from "../env/MarsSky";
import { Dust } from "../env/Dust";
import { Earth } from "../env/Earth";
import { MachineModel } from "../models/registry";
import { makeTerrainSpec } from "@/lib/terrain";
import { settingsFor } from "@/lib/quality";
import { easeOutCubic } from "@/lib/easing";
import { setState, useExperience } from "@/lib/store";
import { disposeThreeHierarchy } from "@/lib/dispose";

const SUN = {
  // Low lunar sun: long, hard shadows under a black sky.
  moon: new THREE.Vector3(-0.72, 0.26, 0.42).normalize(),
  // Higher Mars sun, softened by dust.
  mars: new THREE.Vector3(0.55, 0.62, 0.38).normalize(),
};

/** Puts the camera high above the site before the first shot, so it descends in. */
function Arrival({ machine }: { machine: Machine }) {
  const camera = useThree((s) => s.camera);
  useLayoutEffect(() => {
    const first = machine.chapters[0]?.shot.position ?? machine.scene.explore.position;
    camera.position.set(first[0] * 3, first[1] + 45, first[2] * 3);
    camera.lookAt(0, 0, 0);
    setState({ veil: 0, sceneReady: true });
  }, [machine, camera]);
  return null;
}

function Hotspots({ machine }: { machine: Machine }) {
  const active = useExperience((s) => s.hotspot);
  const mode = useExperience((s) => s.mode);
  return (
    <>
      {machine.hotspots.map((h, i) => (
        <Html key={h.id} position={h.position} center zIndexRange={[30, 20]}>
          <button
            type="button"
            className={`hotspot${active === h.id ? " is-active" : ""}${mode === "story" ? " hotspot--quiet" : ""}`}
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setState({ hotspot: h.id, mode: "explore" })}
          >
            <span className="hotspot__ring" />
            <span className="hotspot__index">{i + 1}</span>
            <span className="hotspot__label">{h.label}</span>
          </button>
        </Html>
      ))}
    </>
  );
}

function Lighting({ machine, shadows, mapSize }: { machine: Machine; shadows: boolean; mapSize: number }) {
  const moon = machine.world === "moon";
  const span = Math.max(6, machine.scene.maxDistance * 0.6);
  const pos = SUN[machine.world].clone().multiplyScalar(60).toArray() as [number, number, number];
  return (
    <>
      {moon ? <hemisphereLight args={["#1a1d24", "#3a3835", 0.12]} /> : <hemisphereLight args={["#e2b48e", "#6e3d24", 0.75]} />}
      <directionalLight
        position={pos}
        intensity={moon ? 4.2 : 2.3}
        color={moon ? "#fffaf2" : "#fff1dd"}
        castShadow={shadows}
        shadow-mapSize={[mapSize, mapSize]}
        shadow-camera-left={-span}
        shadow-camera-right={span}
        shadow-camera-top={span}
        shadow-camera-bottom={-span}
        shadow-camera-near={1}
        shadow-camera-far={160}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      />
    </>
  );
}

function Atmosphere({ machine }: { machine: Machine }) {
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    if (machine.world === "mars") {
      scene.fog = new THREE.FogExp2("#c9976c", 0.0085);
      scene.background = new THREE.Color("#c9976c");
    } else {
      scene.fog = null;
      scene.background = new THREE.Color("#000000");
    }
    return () => {
      scene.fog = null;
      scene.background = null;
    };
  }, [machine.world, scene]);
  return null;
}

export function SiteScene({ machine }: { machine: Machine }) {
  const quality = useExperience((s) => s.quality);
  const reduced = useExperience((s) => s.reducedMotion);
  const mode = useExperience((s) => s.mode);
  const chapter = useExperience((s) => s.chapter);
  const hotspotId = useExperience((s) => s.hotspot);
  const q = settingsFor(quality);
  const spec = useMemo(() => makeTerrainSpec(machine.world, machine.scene.terrainSeed), [machine.world, machine.scene.terrainSeed]);
  const siteGroupRef = useRef<THREE.Group>(null);

  // Clean up WebGL resources when leaving this site scene
  useEffect(() => {
    const currentGroup = siteGroupRef.current;
    return () => {
      if (currentGroup) {
        disposeThreeHierarchy(currentGroup);
      }
    };
  }, []);

  const shot: ShotRequest | null = useMemo(() => {
    const d = (s: number) => (reduced ? 0 : s);
    if (mode === "story") {
      const c = machine.chapters[chapter] ?? machine.chapters[0];
      if (!c) return null;
      return {
        key: `${machine.slug}-story-${chapter}`,
        position: c.shot.position,
        target: c.shot.target,
        duration: chapter === 0 ? d(3.4) : d(2.2),
        ease: chapter === 0 ? easeOutCubic : undefined,
      };
    }
    const h = machine.hotspots.find((x) => x.id === hotspotId);
    if (h) {
      // Keep the explore viewing direction, but move in close to the part.
      const target = new THREE.Vector3(...h.position);
      const dir = new THREE.Vector3(...machine.scene.explore.position).sub(new THREE.Vector3(...machine.scene.explore.target)).normalize();
      const pos = target.clone().add(dir.multiplyScalar(Math.max(machine.scene.minDistance * 1.15, 1.1)));
      pos.y = Math.max(pos.y, 0.3);
      return { key: `${machine.slug}-hotspot-${h.id}`, position: pos.toArray() as [number, number, number], target: h.position, duration: d(1.4) };
    }
    return { key: `${machine.slug}-explore`, position: machine.scene.explore.position, target: machine.scene.explore.target, duration: d(1.6) };
  }, [machine, mode, chapter, hotspotId, reduced]);

  return (
    <group ref={siteGroupRef}>
      <Arrival machine={machine} />
      <FrameOffset amount={5} />
      <Atmosphere machine={machine} />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        minDistance={machine.scene.minDistance}
        maxDistance={machine.scene.maxDistance}
        maxPolarAngle={Math.PI * 0.48}
        rotateSpeed={0.6}
        zoomSpeed={0.7}
      />
      <CameraRig shot={shot} interactive={mode === "explore"} />
      <Lighting machine={machine} shadows={q.shadows} mapSize={q.shadowMapSize} />
      {machine.world === "moon" ? (
        <>
          <Starfield count={Math.round(q.starCount * 0.5)} opacity={0.55} />
          {machine.scene.earthInSky && <Earth position={[180, 260, -620]} radius={11} />}
        </>
      ) : (
        <>
          <MarsSky sunDir={SUN.mars} />
          <Dust count={q.dustCount} color="#e8c4a0" frozen={reduced} wind={0.8} />
        </>
      )}
      <Terrain spec={spec} segments={q.terrainSegments} shadows={q.shadows} />
      <Rocks spec={spec} count={q.rockCount} shadows={q.shadows} />
      <MachineModel model={machine.model} />
      <Hotspots machine={machine} />
    </group>
  );
}
