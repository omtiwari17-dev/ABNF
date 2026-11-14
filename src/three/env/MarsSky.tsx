"use client";
import { useMemo } from "react";
import * as THREE from "three";

/**
 * Daytime Mars sky: butterscotch near the horizon, dusky toward the zenith,
 * and the bluish halo that fine dust scatters around the Sun.
 */
export function MarsSky({ sunDir }: { sunDir: THREE.Vector3 }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: { uSun: { value: sunDir.clone().normalize() } },
        vertexShader: /* glsl */ `
          varying vec3 vDir;
          void main() {
            vDir = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uSun;
          varying vec3 vDir;
          void main() {
            float h = clamp(vDir.y, -0.2, 1.0);
            vec3 horizon = vec3(0.80, 0.60, 0.43);
            vec3 mid = vec3(0.62, 0.44, 0.32);
            vec3 zenith = vec3(0.30, 0.22, 0.19);
            vec3 col = mix(horizon, mid, smoothstep(0.0, 0.25, h));
            col = mix(col, zenith, smoothstep(0.25, 1.0, h));
            float s = max(dot(vDir, uSun), 0.0);
            col += vec3(0.45, 0.55, 0.65) * pow(s, 40.0) * 0.55;
            col += vec3(1.0, 0.98, 0.95) * pow(s, 900.0) * 1.6;
            col = mix(col, horizon * 0.9, smoothstep(0.0, -0.2, h));
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      }),
    [sunDir],
  );
  return (
    <mesh material={material} renderOrder={-20} frustumCulled={false}>
      <sphereGeometry args={[1400, 32, 16]} />
    </mesh>
  );
}
