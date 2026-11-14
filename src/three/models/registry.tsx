"use client";
/**
 * Maps a machine's model reference to a component. Procedural stand-ins are
 * code-split per world; GLB models stream from /public/models.
 */
import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import { useGLTF } from "@react-three/drei";
import type { ModelRef } from "@/content/schema";

const moon = () => import("./moon");
const mars = () => import("./mars");

const PROCEDURAL: Record<string, LazyExoticComponent<ComponentType>> = {
  lunokhod: lazy(() => moon().then((m) => ({ default: m.Lunokhod }))),
  "lunar-rover": lazy(() => moon().then((m) => ({ default: m.LunarRover }))),
  surveyor: lazy(() => moon().then((m) => ({ default: m.Surveyor }))),
  "vikram-pragyan": lazy(() => moon().then((m) => ({ default: m.VikramPragyan }))),
  sojourner: lazy(() => mars().then((m) => ({ default: m.Sojourner }))),
  opportunity: lazy(() => mars().then((m) => ({ default: m.Opportunity }))),
  ingenuity: lazy(() => mars().then((m) => ({ default: m.Ingenuity }))),
  insight: lazy(() => mars().then((m) => ({ default: m.InSight }))),
};

export const PROCEDURAL_MODEL_IDS = Object.keys(PROCEDURAL);

function GltfModel({ url, scale }: { url: string; scale: number }) {
  const { scene } = useGLTF(url, true);
  return <primitive object={scene} scale={scale} />;
}

export function MachineModel({ model }: { model: ModelRef }) {
  if (model.kind === "gltf") {
    return (
      <Suspense fallback={null}>
        <GltfModel url={model.url} scale={model.scale} />
      </Suspense>
    );
  }
  const Component = PROCEDURAL[model.id];
  if (!Component) return null;
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
}
