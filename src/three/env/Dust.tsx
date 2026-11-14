"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mulberry32 } from "@/lib/noise";

/** Drifting dust motes near the camera. Frozen when reduced motion is on. */
export function Dust({ count, color, frozen, wind = 1 }: { count: number; color: string; frozen: boolean; wind?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { geometry, material, seeds } = useMemo(() => {
    const rand = mulberry32(42);
    const pos = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos.set([(rand() - 0.5) * 40, rand() * 6, (rand() - 0.5) * 40], i * 3);
      seeds[i] = rand();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({
      color,
      size: 0.035,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    return { geometry: g, material: m, seeds };
  }, [count, color]);

  useFrame((state, delta) => {
    if (frozen || !ref.current) return;
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);
    for (let i = 0; i < count; i++) {
      const s = seeds[i] ?? 0;
      const ix = i * 3;
      arr[ix] = (arr[ix] ?? 0) + (0.9 + s) * wind * dt;
      arr[ix + 1] = (arr[ix + 1] ?? 0) + Math.sin(t * 0.7 + s * 20) * 0.08 * dt;
      arr[ix + 2] = (arr[ix + 2] ?? 0) + Math.cos(t * 0.3 + s * 9) * 0.25 * wind * dt;
      if ((arr[ix] ?? 0) > 20) arr[ix] = -20;
    }
    attr.needsUpdate = true;
  });

  return <points ref={ref} geometry={geometry} material={material} frustumCulled={false} />;
}
