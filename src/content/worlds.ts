import type { World } from "./schema";

export const worlds: World[] = [
  {
    id: "moon",
    name: "The Moon",
    title: "Where the first machines stopped",
    intro:
      "No wind, no weather, almost nothing to wear things away. The machines here did not wear out so much as run out: of power, of daylight, of people listening.",
    texture: "/textures/moon-lroc-2k.jpg",
    radiusKm: 1737.4,
    initialLon: 0,
    initialLat: 15,
  },
  {
    id: "mars",
    name: "Mars",
    title: "Where the dust comes for everything",
    intro:
      "Mars is quieter than it looks. Its thin wind carries dust that settles on every solar panel, sol after sol. Most of the machines here went silent the same way: the light slowly faded.",
    texture: "/textures/mars-2k.jpg",
    radiusKm: 3389.5,
    initialLon: -20,
    initialLat: 10,
  },
];
