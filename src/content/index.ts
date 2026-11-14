/**
 * Content access. Data is parsed through the zod schemas once at import, so a
 * malformed entry fails the build and the test suite rather than the visitor.
 */
import { machineSchema, markerSiteSchema, worldSchema, type Machine, type MarkerSite, type World, type WorldId } from "./schema";
import { moonMachines, moonMarkers } from "./moon";
import { marsMachines, marsMarkers } from "./mars";
import { worlds as rawWorlds } from "./worlds";

export const WORLDS: World[] = rawWorlds.map((w) => worldSchema.parse(w));

export const MACHINES: Machine[] = [...moonMachines, ...marsMachines]
  .map((m) => machineSchema.parse(m))
  .sort((a, b) => (a.world === b.world ? a.order - b.order : a.world.localeCompare(b.world)));

export const MARKERS: MarkerSite[] = [...moonMarkers, ...marsMarkers].map((m) => markerSiteSchema.parse(m));

export function isWorldId(v: string): v is WorldId {
  return v === "moon" || v === "mars";
}

export function getWorld(id: WorldId): World {
  const w = WORLDS.find((x) => x.id === id);
  if (!w) throw new Error(`Unknown world ${id}`);
  return w;
}

export function machinesOf(world: WorldId): Machine[] {
  return MACHINES.filter((m) => m.world === world).sort((a, b) => a.order - b.order);
}

export function markersOf(world: WorldId): MarkerSite[] {
  return MARKERS.filter((m) => m.world === world);
}

export function getMachine(world: WorldId, slug: string): Machine | undefined {
  return MACHINES.find((m) => m.world === world && m.slug === slug);
}

/** The next machine in the same world, wrapping; after the last, hop to the other world. */
export function nextMachine(current: Machine): Machine {
  const list = machinesOf(current.world);
  const i = list.findIndex((m) => m.slug === current.slug);
  const next = list[i + 1];
  if (next) return next;
  const other = machinesOf(current.world === "moon" ? "mars" : "moon")[0];
  return other ?? list[0] ?? current;
}

export function previousMachine(current: Machine): Machine | undefined {
  const list = machinesOf(current.world);
  const i = list.findIndex((m) => m.slug === current.slug);
  return i > 0 ? list[i - 1] : undefined;
}

export function sourcesById(machine: Pick<Machine, "sources">, ids: string[]) {
  return ids.map((id) => machine.sources.find((s) => s.id === id)).filter((s): s is NonNullable<typeof s> => Boolean(s));
}
