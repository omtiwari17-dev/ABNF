/**
 * Story content schema. Every machine, site and world in AFTERLIGHT is described
 * by data that passes these schemas; components never hard-code story text.
 * Adding a machine = adding one object to src/content/<world>.ts (see README).
 */
import { z } from "zod";

export const worldIdSchema = z.enum(["moon", "mars"]);
export type WorldId = z.infer<typeof worldIdSchema>;

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "dates are ISO YYYY-MM-DD (UTC)");

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "kebab-case slug");

const vec3 = z.tuple([z.number(), z.number(), z.number()]);
export type Vec3 = z.infer<typeof vec3>;

/** A citable source. Every fact group references one or more by id. */
export const sourceSchema = z.object({
  id: slug,
  label: z.string().min(3),
  publisher: z.string().min(2),
  url: z.string().url(),
});
export type Source = z.infer<typeof sourceSchema>;

const sourceIds = z.array(slug).min(1, "every fact needs at least one source");

export const coordinatesSchema = z.object({
  /** Planetocentric latitude, degrees north. */
  lat: z.number().min(-90).max(90),
  /** Longitude, degrees east-positive in [-180, 180]. */
  lon: z.number().min(-180).max(180),
  /** How well the position is known. */
  confidence: z.enum(["imaged", "reported", "approximate", "unknown"]),
  note: z.string().optional(),
  sourceIds,
});
export type Coordinates = z.infer<typeof coordinatesSchema>;

export const timelineEventSchema = z.object({
  date: isoDate,
  kind: z.enum(["launch", "landing", "milestone", "last-signal", "end", "imaged"]),
  label: z.string().min(3),
  detail: z.string().optional(),
  sourceIds,
});
export type TimelineEvent = z.infer<typeof timelineEventSchema>;

/** A camera framing, in metres relative to the machine origin. */
export const shotSchema = z.object({ position: vec3, target: vec3 });
export type Shot = z.infer<typeof shotSchema>;

export const chapterSchema = z.object({
  id: slug,
  /** Story beat: why it was sent, what it did, how it fell silent, what remains. */
  beat: z.enum(["departure", "the-work", "silence", "what-remains"]),
  title: z.string().min(3),
  body: z.array(z.string().min(20)).min(1).max(4),
  shot: shotSchema,
  sourceIds,
});
export type Chapter = z.infer<typeof chapterSchema>;

export const hotspotSchema = z.object({
  id: slug,
  label: z.string().min(2),
  /** Model-space anchor, metres. Update when swapping in a real GLB. */
  position: vec3,
  body: z.string().min(20),
  sourceIds,
});
export type Hotspot = z.infer<typeof hotspotSchema>;

export const factSchema = z.object({ text: z.string().min(20), sourceIds });
export type Fact = z.infer<typeof factSchema>;

export const statSchema = z.object({
  label: z.string().min(2),
  value: z.string().min(1),
  sourceIds,
});

export const modelRefSchema = z.discriminatedUnion("kind", [
  /** Hand-built low-poly stand-in in src/three/models. */
  z.object({ kind: z.literal("procedural"), id: z.string(), standIn: z.literal(true) }),
  /** A real asset in /public/models; record it in ATTRIBUTIONS.md. */
  z.object({
    kind: z.literal("gltf"),
    url: z.string().startsWith("/models/"),
    scale: z.number().positive().default(1),
    standIn: z.literal(false),
  }),
]);
export type ModelRef = z.infer<typeof modelRefSchema>;

export const machineSchema = z.object({
  slug,
  world: worldIdSchema,
  /** Display order within the world; also drives "next machine". */
  order: z.number().int().nonnegative(),
  name: z.string().min(2),
  mission: z.string().min(2),
  agency: z.string().min(2),
  kind: z.enum(["rover", "lander", "helicopter", "lander-and-rover"]),
  /** One quiet line shown under the name. */
  epitaph: z.string().min(10).max(140),
  /** Short status chip, e.g. "Silent since 2018". */
  status: z.string().min(3).max(40),
  dates: z.object({
    launch: isoDate,
    landing: isoDate,
    lastContact: isoDate,
    /** Present when an authority formally declared the end. */
    declaredEnd: isoDate.optional(),
    sourceIds,
  }),
  site: z.object({ name: z.string().min(2), coordinates: coordinatesSchema }),
  stats: z.array(statSchema).min(3).max(6),
  lastSignal: z.object({
    date: isoDate,
    title: z.string().min(3),
    text: z.string().min(20),
    /** Optional lines revealed one by one in the transmission moment. */
    lines: z.array(z.string()).max(8).optional(),
    /** Make paraphrases and interpretations explicit. */
    caveat: z.string().optional(),
    sourceIds,
  }),
  remains: factSchema,
  funFacts: z.array(factSchema).min(2).max(3),
  chapters: z.array(chapterSchema).length(4),
  hotspots: z.array(hotspotSchema).min(3).max(6),
  timeline: z.array(timelineEventSchema).min(3),
  model: modelRefSchema,
  scene: z.object({
    /** Where free-explore starts and how far the camera may roam. */
    explore: shotSchema,
    minDistance: z.number().positive(),
    maxDistance: z.number().positive(),
    /** Is Earth above the horizon from this site? Moon only, artistic placement. */
    earthInSky: z.boolean().default(false),
    /** Seed so each site's terrain is unique but stable. */
    terrainSeed: z.number().int(),
  }),
  /** Claims we could not fully verify, shown in the sources panel. */
  openQuestions: z.array(z.string()).default([]),
  sources: z.array(sourceSchema).min(2),
});
export type Machine = z.infer<typeof machineSchema>;
export type MachineInput = z.input<typeof machineSchema>;

/** A site shown on the globe without a full 3D story (yet). */
export const markerSiteSchema = z.object({
  slug,
  world: worldIdSchema,
  name: z.string().min(2),
  agency: z.string().min(2),
  date: isoDate,
  coordinates: coordinatesSchema,
  fate: z.string().min(20),
  sources: z.array(sourceSchema).min(1),
});
export type MarkerSite = z.infer<typeof markerSiteSchema>;
export type MarkerSiteInput = z.input<typeof markerSiteSchema>;

export const worldSchema = z.object({
  id: worldIdSchema,
  name: z.string(),
  /** Frame line shown on the globe. */
  title: z.string(),
  intro: z.string().min(40),
  texture: z.string().startsWith("/textures/"),
  radiusKm: z.number().positive(),
  /** Globe longitude (deg east) facing the camera when the world opens. */
  initialLon: z.number().min(-180).max(180),
  initialLat: z.number().min(-90).max(90),
});
export type World = z.infer<typeof worldSchema>;
