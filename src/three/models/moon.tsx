"use client";
/**
 * Moon stand-in models (low-poly, hand-built). Proportions follow published
 * dimensions; details are simplified. Replace with real GLBs when available
 * (see ATTRIBUTIONS.md) and update hotspot positions in src/content/moon.ts.
 */
import { Box, Cyl, Disc, Strut, Wheel, useMaterials } from "./parts";

/** Lunokhod 1: a pressurised tub on eight wheels, solar lid open (about 2.2 m long). */
export function Lunokhod() {
  const m = useMaterials();
  const wheelZ = [0.75, 0.25, -0.25, -0.75];
  return (
    <group>
      {/* Tub: wider at the top, like the real magnesium hull */}
      <mesh position={[0, 0.78, 0]} castShadow receiveShadow material={m.foilDark}>
        <cylinderGeometry args={[1.05, 0.8, 0.62, 24, 1]} />
      </mesh>
      <Cyl r={1.07} h={0.05} position={[0, 1.1, 0]} material={m.silver} seg={24} />
      {/* Radiator top surface */}
      <Cyl r={0.98} h={0.02} position={[0, 1.13, 0]} material={m.white} seg={24} />
      {/* Hinged lid with solar cells on its inner face, opened up and back */}
      <group position={[0, 1.13, -0.85]} rotation={[-2.1, 0, 0]}>
        <mesh position={[0, 0, 0.95]} rotation={[0, 0, 0]} castShadow material={m.solar}>
          <cylinderGeometry args={[1.0, 1.0, 0.03, 24, 1, false, -Math.PI / 2, Math.PI]} />
        </mesh>
      </group>
      {/* Forward TV camera windows */}
      <Box size={[0.12, 0.08, 0.05]} position={[-0.22, 0.82, 0.93]} material={m.black} />
      <Box size={[0.12, 0.08, 0.05]} position={[0.22, 0.82, 0.93]} material={m.black} />
      {/* French laser retroreflector on the front */}
      <Box size={[0.32, 0.12, 0.06]} position={[0.55, 0.92, 0.82]} rotation={[-0.4, 0.5, 0]} material={m.silver} />
      {/* Directional antenna on a short mast; conical low-gain antenna */}
      <Strut from={[0.55, 1.13, 0.2]} to={[0.55, 1.45, 0.2]} r={0.02} material={m.silver} />
      <Cyl r={0.04} rTop={0.11} h={0.42} position={[0.55, 1.5, 0.35]} rotation={[1.1, 0, 0]} material={m.silver} seg={10} />
      <Cyl r={0.02} rTop={0.09} h={0.24} position={[-0.55, 1.28, 0.25]} material={m.silver} seg={10} />
      {/* Rear radioisotope heat source housing */}
      <Cyl r={0.1} h={0.22} position={[0, 0.78, -0.98]} rotation={[Math.PI / 2, 0, 0]} material={m.silver} />
      {/* Eight wire-spoked wheels */}
      {[-1, 1].map((side) =>
        wheelZ.map((z) => <Wheel key={`${side}${z}`} r={0.255} w={0.2} position={[side * 0.85, 0.255, z]} material={m.silver} hub={m.black} />),
      )}
      {/* Odometer ninth wheel */}
      <Wheel r={0.1} w={0.04} position={[0, 0.1, -0.95]} material={m.silver} />
    </group>
  );
}

/** Apollo 15 LRV (3.1 m long, 0.82 m wheels) parked with antenna raised. */
export function LunarRover() {
  const m = useMaterials();
  const wheelX = 0.92;
  const wheelZ = 1.15;
  return (
    <group>
      {/* Chassis */}
      <Box size={[1.2, 0.08, 2.5]} position={[0, 0.5, 0]} material={m.silver} />
      {/* Fenders */}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => <Box key={`${sx}${sz}`} size={[0.26, 0.03, 0.9]} position={[sx * wheelX, 0.84, sz * wheelZ]} rotation={[0, 0, sx * -0.15]} material={m.white} />),
      )}
      {/* Wire-mesh wheels */}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => <Wheel key={`w${sx}${sz}`} r={0.41} w={0.23} position={[sx * wheelX, 0.41, sz * wheelZ]} material={m.silver} hub={m.black} />),
      )}
      {/* Two seats */}
      {[-0.3, 0.3].map((x) => (
        <group key={x}>
          <Box size={[0.48, 0.04, 0.45]} position={[x, 0.62, -0.15]} material={m.white} />
          <Box size={[0.48, 0.4, 0.04]} position={[x, 0.82, -0.38]} rotation={[-0.15, 0, 0]} material={m.white} />
        </group>
      ))}
      {/* Control console and T-handle */}
      <Strut from={[0, 0.54, 0.35]} to={[0, 0.95, 0.4]} r={0.03} material={m.silver} />
      <Box size={[0.36, 0.25, 0.1]} position={[0, 1.05, 0.42]} rotation={[-0.3, 0, 0]} material={m.black} />
      <Strut from={[0, 0.55, 0.15]} to={[0, 0.8, 0.15]} r={0.015} material={m.black} />
      {/* High-gain umbrella antenna on its mast */}
      <Strut from={[-0.3, 0.55, 0.95]} to={[-0.3, 1.55, 1.0]} r={0.018} material={m.silver} />
      <mesh position={[-0.3, 1.62, 1.05]} rotation={[-0.9, 0, 0.2]} castShadow material={m.silver}>
        <coneGeometry args={[0.46, 0.18, 12, 1, true]} />
      </mesh>
      {/* Low-gain helical antenna */}
      <Strut from={[0.35, 0.55, 0.95]} to={[0.35, 1.25, 0.95]} r={0.012} material={m.silver} />
      <Cyl r={0.04} h={0.3} position={[0.35, 1.38, 0.95]} material={m.white} seg={8} />
      {/* Ground-commanded TV camera (GCTA) on the front */}
      <Strut from={[0.05, 0.55, 1.2]} to={[0.05, 1.05, 1.25]} r={0.02} material={m.silver} />
      <Box size={[0.22, 0.18, 0.32]} position={[0.05, 1.12, 1.28]} material={m.white} />
      <Cyl r={0.05} h={0.08} position={[0.05, 1.12, 1.47]} rotation={[Math.PI / 2, 0, 0]} material={m.black} />
      {/* Rear tool pallet */}
      <Box size={[1.0, 0.3, 0.35]} position={[0, 0.7, -1.2]} material={m.foil} />
    </group>
  );
}

/** Surveyor 3 (about 3 m tall) with its TV camera gone, taken home by Apollo 12. */
export function Surveyor() {
  const m = useMaterials(0.15);
  const legs = [0, 1, 2].map((i) => (i / 3) * Math.PI * 2 + Math.PI / 2);
  return (
    <group rotation={[0.03, 0, -0.02]}>
      {/* Triangular spaceframe */}
      <Cyl r={0.75} h={0.5} seg={3} position={[0, 0.85, 0]} material={m.ghost} />
      <Cyl r={0.42} h={0.38} seg={3} position={[0, 0.85, 0]} material={m.foil} />
      {/* Electronics compartments */}
      <Box size={[0.42, 0.3, 0.42]} position={[0.32, 0.9, 0.2]} material={m.white} />
      <Box size={[0.42, 0.3, 0.42]} position={[-0.32, 0.9, 0.2]} material={m.white} />
      {/* Three legs with crushable footpads */}
      {legs.map((a) => (
        <group key={a}>
          <Strut from={[Math.cos(a) * 0.55, 0.7, Math.sin(a) * 0.55]} to={[Math.cos(a) * 1.9, 0.12, Math.sin(a) * 1.9]} r={0.035} material={m.silver} />
          <Strut from={[Math.cos(a) * 0.35, 1.05, Math.sin(a) * 0.35]} to={[Math.cos(a) * 1.9, 0.12, Math.sin(a) * 1.9]} r={0.02} material={m.silver} />
          <Cyl r={0.15} rTop={0.11} h={0.1} position={[Math.cos(a) * 1.95, 0.05, Math.sin(a) * 1.95]} material={m.silver} />
        </group>
      ))}
      {/* Central mast with planar antenna and solar panel */}
      <Cyl r={0.03} h={2.1} position={[0, 2.05, 0]} material={m.silver} />
      <Box size={[0.85, 0.03, 0.6]} position={[0, 3.05, -0.25]} rotation={[0.9, 0, 0]} material={m.solar} />
      <Box size={[0.95, 0.03, 0.95]} position={[0, 2.8, 0.35]} rotation={[-0.6, 0, 0]} material={m.white} />
      {/* Empty TV camera mount: the camera itself was returned to Earth */}
      <Box size={[0.12, 0.12, 0.12]} position={[0.55, 1.15, 0.55]} material={m.silver} />
      <mesh position={[0.55, 1.45, 0.55]} material={m.ghost}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 12]} />
      </mesh>
      {/* Surface sampler arm with its scoop removed */}
      <Strut from={[-0.45, 0.8, 0.5]} to={[-0.9, 0.35, 1.25]} r={0.02} material={m.silver} />
      <Box size={[0.12, 0.1, 0.18]} position={[-0.9, 0.32, 1.28]} material={m.ghost} />
    </group>
  );
}

/** Chandrayaan-3: Vikram lander (about 2 x 2 x 1.2 m) and Pragyan rover. */
export function VikramPragyan() {
  const m = useMaterials();
  const legs = [0, 1, 2, 3].map((i) => (i / 4) * Math.PI * 2 + Math.PI / 4);
  return (
    <group>
      {/* Vikram body */}
      <Box size={[1.8, 1.0, 1.8]} position={[0, 1.0, 0]} material={m.foil} />
      <Box size={[1.5, 0.3, 1.5]} position={[0, 1.65, 0]} material={m.foilDark} />
      {/* Side solar panel */}
      <Box size={[0.02, 1.0, 1.6]} position={[0.92, 1.0, 0]} material={m.solar} />
      {/* Four legs */}
      {legs.map((a) => (
        <group key={a}>
          <Strut from={[Math.cos(a) * 0.8, 0.7, Math.sin(a) * 0.8]} to={[Math.cos(a) * 1.35, 0.06, Math.sin(a) * 1.35]} r={0.04} material={m.silver} />
          <Cyl r={0.16} rTop={0.1} h={0.06} position={[Math.cos(a) * 1.35, 0.03, Math.sin(a) * 1.35]} material={m.silver} />
        </group>
      ))}
      {/* Ramp down which Pragyan rolled */}
      <Box size={[0.75, 0.03, 1.5]} position={[0, 0.3, 1.45]} rotation={[0.38, 0, 0]} material={m.silver} />
      {/* NASA laser retroreflector array on top */}
      <mesh position={[-0.4, 1.86, -0.4]} castShadow material={m.silver}>
        <sphereGeometry args={[0.07, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      {/* ChaSTE thermal probe pushed into the ground */}
      <Strut from={[-0.9, 0.8, 0.5]} to={[-1.25, 0.0, 0.7]} r={0.015} material={m.silver} />
      {/* Langmuir probe boom */}
      <Strut from={[0.6, 1.8, -0.6]} to={[1.1, 2.3, -1.0]} r={0.01} material={m.silver} />

      {/* Pragyan (0.92 x 0.75 x 0.4 m), parked in sleep mode */}
      <group position={[2.6, 0, 3.2]} rotation={[0, -0.6, 0]}>
        <Box size={[0.6, 0.25, 0.8]} position={[0, 0.32, 0]} material={m.foil} />
        <Box size={[0.02, 0.5, 0.75]} position={[0.32, 0.55, 0]} rotation={[0, 0, -0.3]} material={m.solar} />
        <Box size={[0.25, 0.08, 0.06]} position={[0, 0.55, 0.38]} material={m.black} />
        <Strut from={[-0.15, 0.45, -0.3]} to={[-0.15, 0.7, -0.3]} r={0.01} material={m.silver} />
        {[-1, 1].map((side) =>
          [0.3, 0, -0.3].map((z) => <Wheel key={`${side}${z}`} r={0.1} w={0.08} position={[side * 0.36, 0.1, z]} material={m.silver} hub={m.black} />),
        )}
      </group>
    </group>
  );
}
