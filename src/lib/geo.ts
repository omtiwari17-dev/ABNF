/**
 * Maps planetocentric lat/lon (deg, east-positive) onto a three.js SphereGeometry
 * using its default UVs and an equirectangular texture centred on 0° longitude.
 * SphereGeometry puts u=0 at lon -180 and builds x = -cos(phi)·sin(theta).
 */
export function latLonToVec3(lat: number, lon: number, radius = 1): [number, number, number] {
  const phi = ((lon + 180) / 360) * Math.PI * 2;
  const theta = ((90 - lat) / 180) * Math.PI;
  return [
    -radius * Math.cos(phi) * Math.sin(theta),
    radius * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

/** Rotation (radians, about Y then X) that brings lat/lon to face +Z. */
export function rotationToFace(lat: number, lon: number): { x: number; y: number } {
  // A point at lon L sits at phi = L+180 deg; rotating by -phi + 90deg brings it to +Z.
  const y = -((lon + 180) / 180) * Math.PI + Math.PI / 2;
  const x = (lat / 180) * Math.PI;
  return { x, y };
}

export function formatLat(lat: number): string {
  return `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? "N" : "S"}`;
}

export function formatLon(lon: number): string {
  return `${Math.abs(lon).toFixed(2)}° ${lon >= 0 ? "E" : "W"}`;
}
