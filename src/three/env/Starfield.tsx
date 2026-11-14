"use client";
import { useMemo } from "react";
import * as THREE from "three";
import { mulberry32 } from "@/lib/noise";

const vert = /* glsl */ `
  attribute float aSize;
  attribute float aTint;
  varying float vTint;
  void main() {
    vTint = aTint;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize;
    gl_Position = projectionMatrix * mv;
  }
`;
const frag = /* glsl */ `
  uniform float uOpacity;
  varying float vTint;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float a = smoothstep(0.5, 0.0, length(c));
    vec3 warm = vec3(1.0, 0.86, 0.72);
    vec3 cool = vec3(0.78, 0.86, 1.0);
    gl_FragColor = vec4(mix(cool, warm, vTint), a * uOpacity);
  }
`;

/** Fixed, seeded starfield on a far sphere. Cheap: one draw call, no animation. */
export function Starfield({ count, radius = 900, opacity = 1 }: { count: number; radius?: number; opacity?: number }) {
  const { geometry, material } = useMemo(() => {
    const rand = mulberry32(1969);
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const tint = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const u = rand() * 2 - 1;
      const t = rand() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      pos.set([s * Math.cos(t) * radius, u * radius, s * Math.sin(t) * radius], i * 3);
      size[i] = 0.6 + Math.pow(rand(), 8) * 3.2;
      tint[i] = rand();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    g.setAttribute("aTint", new THREE.BufferAttribute(tint, 1));
    const m = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: { uOpacity: { value: opacity } },
      transparent: true,
      depthWrite: false,
      fog: false,
    });
    return { geometry: g, material: m };
  }, [count, radius, opacity]);

  return <points geometry={geometry} material={material} frustumCulled={false} renderOrder={-10} />;
}
