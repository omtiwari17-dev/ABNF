/**
 * Heightfield generation for site scenes. Pure functions (no three.js) so they
 * can be unit-tested and so the same seed always yields the same landscape.
 */
import type { WorldId } from "@/content/schema";
import { fbm, mulberry32, ridged } from "./noise";

export interface Crater {
  x: number;
  z: number;
  r: number;
  depth: number;
}

export interface TerrainSpec {
  world: WorldId;
  seed: number;
  /** Radius around the machine kept nearly flat, metres. */
  padRadius: number;
  /** Effective planet radius for the fake horizon drop, metres. */
  curvature: number;
  craters: Crater[];
}

export function makeTerrainSpec(world: WorldId, seed: number): TerrainSpec {
  const rand = mulberry32(seed);
  const craters: Crater[] = [];
  const count = world === "moon" ? 70 : 18;
  for (let i = 0; i < count; i++) {
    // Power-law sizes: many small, few large. Keep them off the landing pad.
    const r = world === "moon" ? 1.5 + Math.pow(rand(), 3.2) * 60 : 2 + Math.pow(rand(), 3) * 30;
    const dist = 8 + r + Math.pow(rand(), 0.8) * 420;
    const a = rand() * Math.PI * 2;
    craters.push({ x: Math.cos(a) * dist, z: Math.sin(a) * dist, r, depth: r * (world === "moon" ? 0.18 : 0.1) });
  }
  return { world, seed, padRadius: 5, curvature: world === "moon" ? 6000 : 9000, craters };
}

/** Bowl with a raised rim, the classic simple-crater profile. */
function craterProfile(d: number, c: Crater): number {
  const t = d / c.r;
  if (t > 2.2) return 0;
  if (t < 1) return -c.depth * (1 - t * t) + c.depth * 0.25;
  const rim = Math.exp(-Math.pow((t - 1) * 3.2, 2));
  return c.depth * 0.25 * rim;
}

export function heightAt(spec: TerrainSpec, x: number, z: number): number {
  const { seed, world } = spec;
  const d = Math.hypot(x, z);
  let h: number;
  if (world === "moon") {
    // Gentle rolling regolith, faint hummocks, then a distant massif.
    h = fbm(x * 0.012, z * 0.012, seed) * 6 + fbm(x * 0.09, z * 0.09, seed + 5, 3) * 0.6;
    h += Math.max(0, fbm(x * 0.0025, z * 0.0025, seed + 9, 3)) * 70 * smooth(250, 900, d);
  } else {
    // Wind-sculpted plains: ripples, low dunes, eroded mesas on the horizon.
    const ripple = fbm(x * 0.35, z * 0.08, seed + 3, 2) * 0.03;
    const dunes = ridged(x * 0.012, z * 0.02, seed + 7, 3) * 1.4;
    h = fbm(x * 0.01, z * 0.01, seed) * 4 + dunes + ripple;
    const mesa = fbm(x * 0.003, z * 0.003, seed + 11, 4);
    h += smoothStepRange(0.15, 0.25, mesa) * 55 * smooth(300, 800, d);
  }
  for (const c of spec.craters) {
    const cd = Math.hypot(x - c.x, z - c.z);
    if (cd < c.r * 2.2) h += craterProfile(cd, c);
  }
  // Keep the machine's footprint level so models sit cleanly.
  const pad = smooth(spec.padRadius * 0.6, spec.padRadius * 2.4, d);
  h *= pad;
  // Fake horizon: drop the ground away with distance.
  h -= (d * d) / (2 * spec.curvature);
  return h;
}

function smooth(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function smoothStepRange(a: number, b: number, x: number): number {
  return smooth(a, b, x);
}

/** Rings that start dense at the machine and spread out toward the horizon. */
export function ringRadii(rings: number, maxRadius: number): number[] {
  const out = [0];
  const k = Math.log(maxRadius / 0.25 + 1) / (rings - 1);
  for (let i = 1; i < rings; i++) out.push(0.25 * (Math.exp(k * i) - 1));
  return out;
}

export interface RockSpec {
  x: number;
  z: number;
  scale: number;
  rotY: number;
  tilt: number;
}

export function scatterRocks(spec: TerrainSpec, count: number): RockSpec[] {
  const rand = mulberry32(spec.seed * 7 + 3);
  const rocks: RockSpec[] = [];
  const marsy = spec.world === "mars";
  while (rocks.length < count) {
    const dist = 3.5 + Math.pow(rand(), 1.6) * 160;
    const a = rand() * Math.PI * 2;
    const x = Math.cos(a) * dist;
    const z = Math.sin(a) * dist;
    // Small rocks dominate; Mars plains are rockier.
    const size = (marsy ? 0.03 : 0.02) + Math.pow(rand(), marsy ? 7 : 8) * (marsy ? 0.55 : 0.7);
    rocks.push({ x, z, scale: size, rotY: rand() * Math.PI * 2, tilt: (rand() - 0.5) * 0.6 });
  }
  return rocks;
}
