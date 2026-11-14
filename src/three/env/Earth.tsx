"use client";
import { useMemo } from "react";
import * as THREE from "three";
import { fbm } from "@/lib/noise";

/**
 * A stylised Earth hanging over near-side lunar sites. Artistic placement:
 * its true position in the sky depends on site and date (see DECISIONS.md).
 */
export function Earth({ position, radius }: { position: [number, number, number]; radius: number }) {
  const map = useMemo(() => {
    const w = 256;
    const h = 128;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const img = ctx.createImageData(w, h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const land = fbm(x / 40, y / 40, 7, 5);
        const cloud = fbm(x / 18 + 50, y / 12, 11, 4);
        let rgb = [22, 58, 120];
        if (land > 0.08) rgb = [86, 104, 62];
        if (cloud > 0.12) rgb = [235, 238, 242];
        img.data.set([rgb[0] ?? 0, rgb[1] ?? 0, rgb[2] ?? 0, 255], (y * w + x) * 4);
      }
    }
    ctx.putImageData(img, 0, 0);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  return (
    <mesh position={position} rotation={[0.3, 2.2, 0]}>
      <sphereGeometry args={[radius, 32, 16]} />
      <meshStandardMaterial map={map ?? undefined} roughness={0.8} emissive="#0b1a33" emissiveIntensity={0.25} fog={false} />
    </mesh>
  );
}
