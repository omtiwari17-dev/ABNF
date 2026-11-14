"use client";
import { useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { Globe } from "../Globe";
import { CameraRig, type ShotRequest } from "../CameraRig";
import { FrameOffset } from "../FrameOffset";
import { getWorld, machinesOf, markersOf } from "@/content";
import type { WorldId } from "@/content/schema";
import { latLonToVec3 } from "@/lib/geo";
import { easeInCubic } from "@/lib/easing";
import { setState, useExperience } from "@/lib/store";

const R = 2;

interface Pin {
  slug: string;
  name: string;
  featured: boolean;
  pos: THREE.Vector3;
}

/** A DOM button pinned to the globe; hidden when it rotates to the far side. */
function Marker({ pin, onSelect, focused }: { pin: Pin; onSelect: (p: Pin) => void; focused: boolean }) {
  const camera = useThree((s) => s.camera);
  const [visible, setVisible] = useState(true);
  const normal = useMemo(() => pin.pos.clone().normalize(), [pin.pos]);
  const tmp = useRef(new THREE.Vector3());
  useFrame(() => {
    const toCam = tmp.current.copy(camera.position).sub(pin.pos).normalize();
    const v = normal.dot(toCam) > 0.12;
    if (v !== visible) setVisible(v);
  });
  return (
    <Html position={pin.pos} center zIndexRange={[20, 10]} style={{ pointerEvents: visible ? "auto" : "none" }}>
      <button
        type="button"
        className={`globe-pin${pin.featured ? " globe-pin--featured" : ""}${focused ? " is-focused" : ""}`}
        data-visible={visible}
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => onSelect(pin)}
        onPointerEnter={() => setState({ focusedSite: pin.slug })}
        onPointerLeave={() => setState({ focusedSite: null })}
      >
        <span className="globe-pin__dot" />
        <span className="globe-pin__label">{pin.name}</span>
      </button>
    </Html>
  );
}

/** Key light rides beside the camera so the visible face is always lit, raking from the upper left. */
function CameraLight() {
  const ref = useRef<THREE.DirectionalLight>(null);
  const offset = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera }) => {
    if (!ref.current) return;
    offset.set(-3, 2, 0).applyQuaternion(camera.quaternion);
    ref.current.position.copy(camera.position).add(offset);
  });
  return <directionalLight ref={ref} intensity={2.6} color="#fff4e6" />;
}

export function GlobeScene({ world }: { world: WorldId }) {
  const router = useRouter();
  const w = getWorld(world);
  const reduced = useExperience((s) => s.reducedMotion);
  const descending = useExperience((s) => s.descending);
  const focusedSite = useExperience((s) => s.focusedSite);
  const lastSite = useRef<string | null>(null);

  const pins: Pin[] = useMemo(
    () => [
      ...machinesOf(world).map((m) => ({ slug: m.slug, name: m.name, featured: true, pos: new THREE.Vector3(...latLonToVec3(m.site.coordinates.lat, m.site.coordinates.lon, R * 1.003)) })),
      ...markersOf(world).map((m) => ({ slug: m.slug, name: m.name, featured: false, pos: new THREE.Vector3(...latLonToVec3(m.coordinates.lat, m.coordinates.lon, R * 1.003)) })),
    ],
    [world],
  );

  const shot: ShotRequest = useMemo(() => {
    if (descending) {
      const pin = pins.find((p) => p.slug === descending);
      if (pin) {
        const dir = pin.pos.clone().normalize();
        return {
          key: `descend-${descending}`,
          position: dir.clone().multiplyScalar(R * 1.08).toArray() as [number, number, number],
          target: pin.pos.toArray() as [number, number, number],
          duration: reduced ? 0.01 : 1.7,
          ease: easeInCubic,
          onDone: () => router.push(`/${world}/${descending}`),
        };
      }
    }
    const start = latLonToVec3(w.initialLat, w.initialLon, 7);
    return { key: `globe-${world}`, position: start, target: [0, 0, 0], duration: reduced ? 0 : 2.2 };
  }, [descending, pins, reduced, router, w, world]);

  // Fade to the dust veil in the final stretch of the dive.
  useFrame(({ camera }) => {
    if (!descending) return;
    const d = camera.position.length();
    const veil = THREE.MathUtils.clamp((4.2 - d) / 1.8, 0, 1);
    setState({ veil });
  });

  const select = (pin: Pin) => {
    if (pin.featured) {
      lastSite.current = pin.slug;
      setState({ descending: pin.slug, focusedSite: null });
    } else {
      setState({ focusedSite: pin.slug });
    }
  };

  return (
    <>
      <CameraRig shot={shot} interactive={!descending} />
      <OrbitControls makeDefault enablePan={false} minDistance={3.2} maxDistance={10} rotateSpeed={0.5} zoomSpeed={0.6} autoRotate={!reduced && !descending && !focusedSite} autoRotateSpeed={0.25} enableDamping />
      <ambientLight intensity={world === "moon" ? 0.08 : 0.15} />
      <FrameOffset amount={7} />
      <CameraLight />
      <Globe world={world} texture={w.texture} radius={R}>
        {pins.map((p) => (
          <Marker key={p.slug} pin={p} onSelect={select} focused={focusedSite === p.slug} />
        ))}
      </Globe>
    </>
  );
}
