"use client";
import { useMemo } from "react";
import * as THREE from "three";
import type { WorldId } from "@/content/schema";
import { heightAt, ringRadii, scatterRocks, type TerrainSpec } from "@/lib/terrain";
import { fbm, mulberry32 } from "@/lib/noise";

const PALETTE: Record<WorldId, { low: THREE.Color; high: THREE.Color; dark: THREE.Color; rock: string }> = {
  moon: { low: new THREE.Color("#6f6c69"), high: new THREE.Color("#a29e98"), dark: new THREE.Color("#45423f"), rock: "#77736e" },
  mars: { low: new THREE.Color("#8a4b2c"), high: new THREE.Color("#c27a4c"), dark: new THREE.Color("#5a3020"), rock: "#6b3e2a" },
};

/** Fine regolith grain, generated once, tiled in world space. */
function useGrainTexture(world: WorldId, seed: number) {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const img = ctx.createImageData(size, size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // Tileable by sampling noise on a torus-like wrap.
        const n = fbm(x / 16, y / 16, seed, 4) * 0.5 + fbm(x / 3, y / 3, seed + 2, 2) * 0.5;
        const v = Math.max(0, Math.min(255, 200 + n * 70));
        const i = (y * size + x) * 4;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, [world, seed]);
}

export function Terrain({ spec, segments, shadows }: { spec: TerrainSpec; segments: number; shadows: boolean }) {
  const grain = useGrainTexture(spec.world, spec.seed);

  const geometry = useMemo(() => {
    const rings = Math.round(segments * 0.7);
    const sectors = segments;
    const radii = ringRadii(rings, 2600);
    const pal = PALETTE[spec.world];
    const positions = new Float32Array(rings * sectors * 3);
    const colors = new Float32Array(rings * sectors * 3);
    const uvs = new Float32Array(rings * sectors * 2);
    const c = new THREE.Color();
    let p = 0;
    for (let r = 0; r < rings; r++) {
      const rad = radii[r] ?? 0;
      for (let s = 0; s < sectors; s++) {
        const a = (s / sectors) * Math.PI * 2;
        const x = Math.cos(a) * rad;
        const z = Math.sin(a) * rad;
        const y = heightAt(spec, x, z);
        positions.set([x, y, z], p * 3);
        uvs.set([x / 6, z / 6], p * 2);
        const tone = fbm(x * 0.03, z * 0.03, spec.seed + 21, 3) * 0.5 + 0.5;
        c.copy(pal.low).lerp(pal.high, tone);
        // Darker floors inside craters and dune troughs.
        const shade = THREE.MathUtils.clamp(0.5 + (y + (rad * rad) / (2 * spec.curvature)) * 0.08, 0, 1);
        c.lerp(pal.dark, (1 - shade) * 0.5);
        colors.set([c.r, c.g, c.b], p * 3);
        p++;
      }
    }
    const index: number[] = [];
    for (let r = 0; r < rings - 1; r++) {
      for (let s = 0; s < sectors; s++) {
        const a = r * sectors + s;
        const b = r * sectors + ((s + 1) % sectors);
        const cc = (r + 1) * sectors + s;
        const d = (r + 1) * sectors + ((s + 1) % sectors);
        index.push(a, b, cc, b, d, cc);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    g.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    g.setIndex(index);
    g.computeVertexNormals();
    return g;
  }, [spec, segments]);

  return (
    <mesh geometry={geometry} receiveShadow={shadows}>
      <meshStandardMaterial vertexColors map={grain ?? undefined} roughness={1} metalness={0} />
    </mesh>
  );
}

export function Rocks({ spec, count, shadows }: { spec: TerrainSpec; count: number; shadows: boolean }) {
  const { geometry, matrices } = useMemo(() => {
    const base = new THREE.IcosahedronGeometry(1, 1);
    const pos = base.getAttribute("position") as THREE.BufferAttribute;
    const rand = mulberry32(spec.seed + 99);
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      v.multiplyScalar(0.75 + rand() * 0.45);
      v.y *= 0.62;
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    base.computeVertexNormals();
    const rocks = scatterRocks(spec, count);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const list = rocks.map((rk) => {
      const y = heightAt(spec, rk.x, rk.z) + rk.scale * 0.15;
      e.set(rk.tilt, rk.rotY, rk.tilt * 0.5);
      q.setFromEuler(e);
      return m.compose(new THREE.Vector3(rk.x, y, rk.z), q, new THREE.Vector3(rk.scale, rk.scale, rk.scale)).clone();
    });
    return { geometry: base, matrices: list };
  }, [spec, count]);

  return (
    <instancedMesh
      args={[geometry, undefined, matrices.length]}
      castShadow={shadows}
      receiveShadow={shadows}
      ref={(mesh) => {
        if (!mesh) return;
        matrices.forEach((mat, i) => mesh.setMatrixAt(i, mat));
        mesh.instanceMatrix.needsUpdate = true;
        mesh.computeBoundingSphere();
      }}
    >
      <meshStandardMaterial color={PALETTE[spec.world].rock} roughness={0.95} flatShading />
    </instancedMesh>
  );
}
