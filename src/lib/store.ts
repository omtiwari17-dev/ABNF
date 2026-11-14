"use client";
/**
 * Tiny shared store bridging DOM overlays and the persistent 3D canvas.
 * Route params decide *which* scene is shown; this store holds the moment-to-moment
 * experience state (story chapter, hotspot, descent, audio, motion preference).
 */
import { useSyncExternalStore } from "react";
import type { QualityTier } from "./quality";

export type ViewMode = "story" | "explore";

export interface ExperienceState {
  mode: ViewMode;
  chapter: number;
  hotspot: string | null;
  /** Marker slug the globe is currently diving toward. */
  descending: string | null;
  /** Hovered/focused marker on the globe. */
  focusedSite: string | null;
  audio: boolean;
  reducedMotion: boolean;
  quality: QualityTier;
  webgl: "unknown" | "ok" | "failed";
  sceneReady: boolean;
  transmission: boolean;
  /** 0..1 opacity of the full-screen transition veil. */
  veil: number;
}

const initial: ExperienceState = {
  mode: "story",
  chapter: 0,
  hotspot: null,
  descending: null,
  focusedSite: null,
  audio: false,
  reducedMotion: false,
  quality: "medium",
  webgl: "unknown",
  sceneReady: false,
  transmission: false,
  veil: 0,
};

let state = initial;
const listeners = new Set<() => void>();

export function getState(): ExperienceState {
  return state;
}

export function setState(patch: Partial<ExperienceState> | ((s: ExperienceState) => Partial<ExperienceState>)): void {
  const next = typeof patch === "function" ? patch(state) : patch;
  let changed = false;
  for (const k in next) {
    if (next[k as keyof ExperienceState] !== state[k as keyof ExperienceState]) changed = true;
  }
  if (!changed) return;
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

function subscribe(l: () => void): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useExperience<T>(select: (s: ExperienceState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => select(state),
    () => select(initial),
  );
}

/** Reset per-machine state when entering a new site. */
export function resetForSite(): void {
  setState({ mode: "story", chapter: 0, hotspot: null, descending: null, transmission: false, sceneReady: false });
}

const PREFS_KEY = "afterlight:prefs";

export function loadPrefs(): void {
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    const systemReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const prefs = raw ? (JSON.parse(raw) as Partial<Pick<ExperienceState, "reducedMotion">>) : {};
    setState({ reducedMotion: prefs.reducedMotion ?? systemReduced });
  } catch {
    // storage blocked: fall back to the system preference only
    setState({ reducedMotion: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false });
  }
}

export function savePrefs(): void {
  try {
    window.localStorage.setItem(PREFS_KEY, JSON.stringify({ reducedMotion: state.reducedMotion }));
  } catch {
    // ignore
  }
}
