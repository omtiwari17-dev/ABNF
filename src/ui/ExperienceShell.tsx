"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { loadPrefs, setState, useExperience } from "@/lib/store";
import { pickTier } from "@/lib/quality";

// three.js stays out of the server bundle and off the critical path.
const Experience = dynamic(() => import("@/three/Experience"), { ssr: false });

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function ExperienceShell() {
  const webgl = useExperience((s) => s.webgl);
  const veil = useExperience((s) => s.veil);
  const reduced = useExperience((s) => s.reducedMotion);

  useEffect(() => {
    loadPrefs();
    const nav = navigator as Navigator & { deviceMemory?: number };
    setState({
      quality: pickTier({
        width: window.innerWidth,
        cores: nav.hardwareConcurrency,
        memoryGb: nav.deviceMemory,
        coarsePointer: window.matchMedia("(pointer: coarse)").matches,
      }),
      webgl: hasWebGL() ? "unknown" : "failed",
    });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(reduced);
  }, [reduced]);

  return (
    <>
      <div className="experience" aria-hidden="true">
        {webgl !== "failed" && <Experience />}
        {webgl === "failed" && <div className="experience-fallback" />}
      </div>
      <div className="veil" style={{ opacity: veil }} aria-hidden="true" />
      {webgl === "failed" && (
        <p className="webgl-note panel" role="status">
          Your browser can’t show the 3D scenes, so you’re seeing the archive as text. Every story and source is still here.
        </p>
      )}
    </>
  );
}
