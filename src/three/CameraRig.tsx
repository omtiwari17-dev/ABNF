"use client";
/**
 * Moves the camera and orbit target between shots. Every scene describes
 * *where* the camera should be; this rig decides *how* it gets there.
 */
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { easeInOutCubic } from "@/lib/easing";

/** The slice of drei's OrbitControls the rig needs. */
export interface OrbitLike {
  target: THREE.Vector3;
  enabled: boolean;
  update: () => void;
}

export interface ShotRequest {
  position: [number, number, number];
  target: [number, number, number];
  /** Seconds. 0 = cut. */
  duration: number;
  /** Changing the key restarts the move even if the shot is identical. */
  key: string;
  ease?: (t: number) => number;
  onDone?: () => void;
}

export function CameraRig({ shot, interactive }: { shot: ShotRequest | null; interactive: boolean }) {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as unknown as OrbitLike | null;
  const move = useRef<{
    fromPos: THREE.Vector3;
    fromTarget: THREE.Vector3;
    toPos: THREE.Vector3;
    toTarget: THREE.Vector3;
    t: number;
    duration: number;
    ease: (t: number) => number;
    onDone?: () => void;
  } | null>(null);
  const lastKey = useRef<string | null>(null);

  useEffect(() => {
    if (!shot || shot.key === lastKey.current) return;
    lastKey.current = shot.key;
    const currentTarget = controls ? controls.target.clone() : new THREE.Vector3();
    move.current = {
      fromPos: camera.position.clone(),
      fromTarget: currentTarget,
      toPos: new THREE.Vector3(...shot.position),
      toTarget: new THREE.Vector3(...shot.target),
      t: 0,
      duration: shot.duration,
      ease: shot.ease ?? easeInOutCubic,
      onDone: shot.onDone,
    };
  }, [shot, camera, controls]);

  useEffect(() => {
    if (controls) controls.enabled = interactive && !move.current;
  }, [controls, interactive]);

  useFrame((_, delta) => {
    const m = move.current;
    if (!m) return;
    m.t = m.duration <= 0 ? 1 : Math.min(1, m.t + Math.min(delta, 0.05) / m.duration);
    const k = m.ease(m.t);
    camera.position.lerpVectors(m.fromPos, m.toPos, k);
    const target = new THREE.Vector3().lerpVectors(m.fromTarget, m.toTarget, k);
    if (controls) {
      controls.target.copy(target);
      controls.enabled = false;
      controls.update();
    } else {
      camera.lookAt(target);
    }
    if (m.t >= 1) {
      move.current = null;
      if (controls) controls.enabled = interactive;
      m.onDone?.();
    }
  });

  return null;
}
