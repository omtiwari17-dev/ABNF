import type { WorldId } from "@/content/schema";

export type SceneRoute =
  | { kind: "landing" }
  | { kind: "world"; world: WorldId }
  | { kind: "site"; world: WorldId; slug: string }
  | { kind: "static" };

/** Which 3D scene a pathname shows. Pure, so the canvas and tests agree. */
export function parseRoute(pathname: string | null): SceneRoute {
  const parts = (pathname ?? "/").split("/").filter(Boolean);
  if (parts.length === 0) return { kind: "landing" };
  const [world, slug, ...rest] = parts;
  if (world !== "moon" && world !== "mars") return { kind: "static" };
  if (!slug) return { kind: "world", world };
  if (rest.length > 0) return { kind: "static" };
  return { kind: "site", world, slug };
}
