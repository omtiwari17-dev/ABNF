"use client";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import type * as THREE from "three";

/** On wide screens, shift the frame right so the subject clears the left-hand panel. */
export function FrameOffset({ amount }: { amount: number }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const aspect = useThree((s) => s.viewport.aspect);
  useEffect(() => {
    camera.filmOffset = aspect > 1.1 ? -amount : 0;
    camera.updateProjectionMatrix();
    return () => {
      camera.filmOffset = 0;
      camera.updateProjectionMatrix();
    };
  }, [camera, aspect, amount]);
  return null;
}
