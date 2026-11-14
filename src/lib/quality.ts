export type QualityTier = "low" | "medium" | "high";

export interface DeviceHints {
  width: number;
  cores?: number;
  memoryGb?: number;
  coarsePointer: boolean;
}

export interface QualitySettings {
  tier: QualityTier;
  dpr: [number, number];
  terrainSegments: number;
  shadowMapSize: number;
  shadows: boolean;
  dustCount: number;
  starCount: number;
  rockCount: number;
}

const SETTINGS: Record<QualityTier, Omit<QualitySettings, "tier">> = {
  low: { dpr: [1, 1.25], terrainSegments: 96, shadowMapSize: 512, shadows: false, dustCount: 250, starCount: 1500, rockCount: 120 },
  medium: { dpr: [1, 1.5], terrainSegments: 160, shadowMapSize: 1024, shadows: true, dustCount: 600, starCount: 3000, rockCount: 260 },
  high: { dpr: [1, 2], terrainSegments: 256, shadowMapSize: 2048, shadows: true, dustCount: 1200, starCount: 5000, rockCount: 420 },
};

/** Pick a starting tier from cheap device hints; PerformanceMonitor can lower it later. */
export function pickTier(h: DeviceHints): QualityTier {
  const smallTouch = h.coarsePointer && h.width < 900;
  if ((h.memoryGb !== undefined && h.memoryGb <= 2) || (h.cores !== undefined && h.cores <= 2)) return "low";
  if (smallTouch) return "medium";
  if ((h.cores ?? 8) >= 8 && (h.memoryGb ?? 8) >= 8) return "high";
  return "medium";
}

export function settingsFor(tier: QualityTier): QualitySettings {
  return { tier, ...SETTINGS[tier] };
}

export function lowerTier(tier: QualityTier): QualityTier {
  return tier === "high" ? "medium" : "low";
}
