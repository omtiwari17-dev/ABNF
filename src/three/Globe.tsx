"use client";
import { useMemo, useRef, type ReactNode } from "react";
import { useFrame, useLoader, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import type { WorldId } from "@/content/schema";

const atmosphere = {
  moon: { color: "#9fb3cc", strength: 0.35 },
  mars: { color: "#e0875a", strength: 0.5 },
} as const;

/** Thin rim glow: a back-faced shell that brightens toward the limb. */
function Rim({ radius, world }: { radius: number; world: WorldId }) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(atmosphere[world].color) }, uStrength: { value: atmosphere[world].strength } },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          uniform float uStrength;
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            float rim = pow(1.0 - abs(dot(vNormal, vView)), 4.0);
            gl_FragColor = vec4(uColor, rim * uStrength);
          }
        `,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [world],
  );
  return (
    <mesh material={mat} scale={1.06}>
      <sphereGeometry args={[radius, 64, 32]} />
    </mesh>
  );
}

export function Globe({
  world,
  texture,
  radius,
  spin = 0,
  children,
  onClick,
  onPointerOver,
  onPointerOut,
}: {
  world: WorldId;
  texture: string;
  radius: number;
  spin?: number;
  children?: ReactNode;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}) {
  const map = useLoader(THREE.TextureLoader, texture);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (spin && group.current) group.current.rotation.y += delta * spin;
  });
  return (
    <group ref={group}>
      <mesh onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
        <sphereGeometry args={[radius, 96, 64]} />
        <meshStandardMaterial map={map} bumpMap={map} bumpScale={world === "moon" ? 2.2 : 1.2} roughness={1} metalness={0} />
      </mesh>
      <Rim radius={radius} world={world} />
      {children}
    </group>
  );
}
