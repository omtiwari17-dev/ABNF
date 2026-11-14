"use client";
/**
 * Shared materials and primitive parts for the low-poly stand-in models.
 * Every model built from these is a placeholder: see ATTRIBUTIONS.md for
 * the real assets to swap in. Units are metres; +Y up; machines face +Z.
 */
import { useMemo, type ReactNode } from "react";
import * as THREE from "three";

export type MaterialKey =
  | "foil"
  | "foilDark"
  | "silver"
  | "white"
  | "black"
  | "solar"
  | "solarDusty"
  | "rubber"
  | "copper"
  | "carbon"
  | "ghost";

const DUST = new THREE.Color("#a5714c");

function make(key: MaterialKey, dust: number): THREE.Material {
  const tint = (hex: string) => new THREE.Color(hex).lerp(DUST, dust);
  switch (key) {
    case "foil":
      return new THREE.MeshStandardMaterial({ color: tint("#c9a04a"), metalness: 1 - dust * 0.7, roughness: 0.32 + dust * 0.5 });
    case "foilDark":
      return new THREE.MeshStandardMaterial({ color: tint("#7c5f2a"), metalness: 0.9 - dust * 0.6, roughness: 0.4 + dust * 0.4 });
    case "silver":
      return new THREE.MeshStandardMaterial({ color: tint("#c8cacc"), metalness: 0.85 - dust * 0.6, roughness: 0.35 + dust * 0.4 });
    case "white":
      return new THREE.MeshStandardMaterial({ color: tint("#e6e4df"), metalness: 0.05, roughness: 0.7 });
    case "black":
      return new THREE.MeshStandardMaterial({ color: tint("#1b1c1e"), metalness: 0.3, roughness: 0.6 });
    case "solar":
      return new THREE.MeshStandardMaterial({ color: tint("#1c2a4a"), metalness: 0.6 - dust * 0.4, roughness: 0.25 + dust * 0.6 });
    case "solarDusty":
      return new THREE.MeshStandardMaterial({ color: new THREE.Color("#1c2a4a").lerp(DUST, Math.max(0.55, dust)), metalness: 0.2, roughness: 0.85 });
    case "rubber":
      return new THREE.MeshStandardMaterial({ color: tint("#2a2a2a"), metalness: 0.2, roughness: 0.9 });
    case "copper":
      return new THREE.MeshStandardMaterial({ color: tint("#a8693a"), metalness: 0.9, roughness: 0.35 });
    case "carbon":
      return new THREE.MeshStandardMaterial({ color: tint("#2b2d30"), metalness: 0.4, roughness: 0.45 });
    case "ghost":
      return new THREE.MeshBasicMaterial({ color: "#ece7dd", wireframe: true, transparent: true, opacity: 0.35 });
  }
}

/** Material set for one model; `dust` 0..1 tints everything toward Mars dust. */
export function useMaterials(dust = 0): Record<MaterialKey, THREE.Material> {
  return useMemo(() => {
    const keys: MaterialKey[] = ["foil", "foilDark", "silver", "white", "black", "solar", "solarDusty", "rubber", "copper", "carbon", "ghost"];
    return Object.fromEntries(keys.map((k) => [k, make(k, dust)])) as Record<MaterialKey, THREE.Material>;
  }, [dust]);
}

type V3 = [number, number, number];

export function Box({ size, position, rotation, material }: { size: V3; position?: V3; rotation?: V3; material: THREE.Material }) {
  return (
    <mesh position={position} rotation={rotation} material={material} castShadow receiveShadow>
      <boxGeometry args={size} />
    </mesh>
  );
}

export function Cyl({
  r,
  rTop,
  h,
  position,
  rotation,
  material,
  seg = 16,
}: {
  r: number;
  rTop?: number;
  h: number;
  position?: V3;
  rotation?: V3;
  material: THREE.Material;
  seg?: number;
}) {
  return (
    <mesh position={position} rotation={rotation} material={material} castShadow receiveShadow>
      <cylinderGeometry args={[rTop ?? r, r, h, seg]} />
    </mesh>
  );
}

/** A thin rod between two points. */
export function Strut({ from, to, r = 0.01, material }: { from: V3; to: V3; r?: number; material: THREE.Material }) {
  const { position, quaternion, length } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = b.clone().sub(a);
    const len = dir.length();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    return { position: a.add(b).multiplyScalar(0.5), quaternion: q, length: len };
  }, [from, to]);
  return (
    <mesh position={position} quaternion={quaternion} material={material} castShadow>
      <cylinderGeometry args={[r, r, length, 6]} />
    </mesh>
  );
}

/** Wheel lying on its side: axis along X. */
export function Wheel({ r, w, position, material, hub }: { r: number; w: number; position: V3; material: THREE.Material; hub?: THREE.Material }) {
  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]} material={material} castShadow receiveShadow>
        <cylinderGeometry args={[r, r, w, 20]} />
      </mesh>
      {hub && (
        <mesh rotation={[0, 0, Math.PI / 2]} material={hub} castShadow>
          <cylinderGeometry args={[r * 0.35, r * 0.35, w * 1.15, 12]} />
        </mesh>
      )}
    </group>
  );
}

/** Flat disc (e.g. InSight's decagonal arrays), facing +Y. */
export function Disc({ r, position, rotation, material, seg = 10, thickness = 0.02 }: { r: number; position?: V3; rotation?: V3; material: THREE.Material; seg?: number; thickness?: number }) {
  return (
    <mesh position={position} rotation={rotation} material={material} castShadow receiveShadow>
      <cylinderGeometry args={[r, r, thickness, seg]} />
    </mesh>
  );
}

export function Group({ children, position, rotation, scale }: { children: ReactNode; position?: V3; rotation?: V3; scale?: number }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {children}
    </group>
  );
}
