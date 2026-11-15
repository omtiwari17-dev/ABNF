import { describe, it, expect } from "vitest";
import { MACHINES, WORLDS, MARKERS, getMachine, getWorld, machinesOf, markersOf, nextMachine } from "@/content";
import { machineSchema, worldSchema, markerSiteSchema } from "@/content/schema";

describe("Content Validation & Integrity", () => {
  it("has valid worlds configured", () => {
    expect(WORLDS.length).toBe(2);
    WORLDS.forEach((w) => {
      expect(() => worldSchema.parse(w)).not.toThrow();
    });
  });

  it("has all machines matching schema", () => {
    expect(MACHINES.length).toBeGreaterThan(0);
    MACHINES.forEach((m) => {
      expect(() => machineSchema.parse(m)).not.toThrow();
      expect(m.chapters.length).toBe(4);
      expect(m.hotspots.length).toBeGreaterThanOrEqual(3);
      expect(m.sources.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("has all markers matching schema", () => {
    expect(MARKERS.length).toBeGreaterThan(0);
    MARKERS.forEach((marker) => {
      expect(() => markerSiteSchema.parse(marker)).not.toThrow();
    });
  });

  it("retrieves world and machines by id correctly", () => {
    const moon = getWorld("moon");
    expect(moon.name).toBe("The Moon");
    const moonMachines = machinesOf("moon");
    expect(moonMachines.length).toBeGreaterThan(0);

    const firstMoon = moonMachines[0];
    if (firstMoon) {
      const found = getMachine("moon", firstMoon.slug);
      expect(found).toBeDefined();
      expect(found?.slug).toBe(firstMoon.slug);
    }
  });

  it("calculates nextMachine correctly wrapping through worlds", () => {
    const moonMachines = machinesOf("moon");
    const marsMachines = machinesOf("mars");
    expect(moonMachines.length).toBeGreaterThan(0);
    expect(marsMachines.length).toBeGreaterThan(0);

    const lastMoon = moonMachines[moonMachines.length - 1];
    if (lastMoon) {
      const next = nextMachine(lastMoon);
      expect(next.world).toBe("mars");
    }
  });
});
