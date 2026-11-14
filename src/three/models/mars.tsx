"use client";
/**
 * Mars stand-in models (low-poly, hand-built). Proportions follow published
 * dimensions; details are simplified. Replace with NASA 3D Resources GLBs when
 * available (see ATTRIBUTIONS.md) and update hotspot positions in src/content/mars.ts.
 */
import { Box, Cyl, Disc, Strut, Wheel, useMaterials } from "./parts";

/** Sojourner (0.63 x 0.48 x 0.28 m) beside the Pathfinder lander. */
export function Sojourner() {
  const m = useMaterials(0.35);
  const wheelZ = [0.22, 0, -0.22];
  return (
    <group>
      {/* Rover */}
      <group>
        <Box size={[0.36, 0.1, 0.5]} position={[0, 0.17, 0]} material={m.foil} />
        <Box size={[0.46, 0.012, 0.58]} position={[0, 0.235, -0.02]} material={m.solar} />
        {/* Front stereo cameras */}
        <Box size={[0.14, 0.05, 0.04]} position={[0, 0.17, 0.27]} material={m.black} />
        {/* APXS on its rear deployment arm */}
        <Strut from={[0, 0.15, -0.25]} to={[0, 0.1, -0.33]} r={0.008} material={m.silver} />
        <Cyl r={0.025} h={0.05} position={[0, 0.09, -0.34]} material={m.silver} />
        {/* Antenna whip */}
        <Strut from={[0.15, 0.24, -0.2]} to={[0.15, 0.5, -0.2]} r={0.004} material={m.black} />
        {/* Rocker-bogie */}
        {[-1, 1].map((side) => (
          <group key={side}>
            <Strut from={[side * 0.22, 0.14, 0.22]} to={[side * 0.22, 0.2, -0.02]} r={0.01} material={m.silver} />
            <Strut from={[side * 0.22, 0.2, -0.02]} to={[side * 0.22, 0.12, -0.22]} r={0.01} material={m.silver} />
            {wheelZ.map((z) => (
              <Wheel key={z} r={0.065} w={0.07} position={[side * 0.25, 0.065, z]} material={m.silver} hub={m.black} />
            ))}
          </group>
        ))}
      </group>

      {/* Pathfinder lander: tetrahedral base, three open petals, deflated airbags */}
      <group position={[-1.9, 0, -1.6]} rotation={[0, 0.5, 0]}>
        <Cyl r={0.55} rTop={0.45} h={0.35} seg={3} position={[0, 0.25, 0]} material={m.white} />
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2 + Math.PI / 3;
          return (
            <group key={i} rotation={[0, a, 0]}>
              <Box size={[0.95, 0.03, 0.9]} position={[0, 0.06, 0.95]} material={m.solar} />
              <mesh position={[0, 0.12, 1.55]} scale={[1, 0.25, 0.6]} material={m.white} castShadow>
                <sphereGeometry args={[0.45, 10, 6]} />
              </mesh>
            </group>
          );
        })}
        {/* Rear ramp the rover drove down */}
        <Box size={[0.3, 0.02, 0.9]} position={[0.55, 0.15, 0.85]} rotation={[0.3, 0.6, 0]} material={m.silver} />
        {/* IMP camera mast */}
        <Strut from={[0, 0.4, 0]} to={[0, 1.1, 0]} r={0.02} material={m.silver} />
        <Box size={[0.18, 0.12, 0.1]} position={[0, 1.15, 0]} material={m.black} />
        {/* ASI/MET weather mast */}
        <Strut from={[0.3, 0.4, -0.2]} to={[0.3, 1.3, -0.2]} r={0.008} material={m.silver} />
        <Disc r={0.12} position={[-0.25, 0.48, 0.1]} rotation={[0.4, 0, 0]} material={m.silver} seg={16} />
      </group>
    </group>
  );
}

/** Opportunity (1.6 L x 2.3 W x 1.5 H m), dust-covered after 15 years. */
export function Opportunity() {
  const m = useMaterials(0.55);
  return (
    <group>
      {/* Warm electronics box */}
      <Box size={[0.9, 0.32, 1.1]} position={[0, 0.55, 0]} material={m.foilDark} />
      {/* Solar deck and wings */}
      <Box size={[1.05, 0.03, 1.3]} position={[0, 0.73, -0.05]} material={m.solarDusty} />
      <Box size={[0.65, 0.03, 0.9]} position={[0.85, 0.73, -0.15]} rotation={[0, 0, -0.03]} material={m.solarDusty} />
      <Box size={[0.65, 0.03, 0.9]} position={[-0.85, 0.73, -0.15]} rotation={[0, 0, 0.03]} material={m.solarDusty} />
      <Box size={[0.9, 0.03, 0.45]} position={[0, 0.73, -0.9]} material={m.solarDusty} />
      {/* Pancam mast assembly */}
      <Cyl r={0.04} h={0.72} position={[0.18, 1.1, 0.45]} material={m.white} />
      <Box size={[0.32, 0.1, 0.12]} position={[0.18, 1.48, 0.46]} material={m.white} />
      <Cyl r={0.025} h={0.04} position={[0.06, 1.48, 0.53]} rotation={[Math.PI / 2, 0, 0]} material={m.black} />
      <Cyl r={0.025} h={0.04} position={[0.3, 1.48, 0.53]} rotation={[Math.PI / 2, 0, 0]} material={m.black} />
      {/* High-gain dish and low-gain mast */}
      <Cyl r={0.14} rTop={0.14} h={0.03} position={[-0.3, 0.9, -0.3]} rotation={[0.6, 0, 0]} material={m.white} />
      <Strut from={[-0.3, 0.75, -0.3]} to={[-0.3, 0.88, -0.3]} r={0.02} material={m.silver} />
      <Strut from={[-0.38, 0.75, 0.3]} to={[-0.38, 1.05, 0.3]} r={0.01} material={m.silver} />
      {/* Instrument arm, stowed under the front with its tool turret */}
      <Strut from={[-0.2, 0.42, 0.55]} to={[0.15, 0.38, 0.78]} r={0.025} material={m.silver} />
      <Strut from={[0.15, 0.38, 0.78]} to={[0.32, 0.35, 0.68]} r={0.022} material={m.silver} />
      <Cyl r={0.07} h={0.12} position={[0.32, 0.32, 0.72]} material={m.silver} seg={6} />
      {/* Rocker-bogie and six wheels */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <Strut from={[side * 0.55, 0.13, 0.58]} to={[side * 0.55, 0.45, 0.05]} r={0.025} material={m.silver} />
          <Strut from={[side * 0.55, 0.45, 0.05]} to={[side * 0.55, 0.3, -0.25]} r={0.025} material={m.silver} />
          <Strut from={[side * 0.55, 0.3, -0.25]} to={[side * 0.55, 0.13, -0.55]} r={0.025} material={m.silver} />
          {[0.58, 0, -0.55].map((z) => (
            <Wheel key={z} r={0.13} w={0.16} position={[side * 0.62, 0.13, z]} material={m.silver} hub={m.black} />
          ))}
        </group>
      ))}
    </group>
  );
}

/** Ingenuity (0.49 m tall, 1.2 m rotors) at rest with broken blades. */
export function Ingenuity() {
  const m = useMaterials(0.3);
  // Blades snapped about a third of the way from the tip; one torn off at the root.
  const blade = (len: number, y: number, angle: number, key: string) => (
    <group key={key} position={[0, y, 0]} rotation={[0, angle, 0]}>
      <Box size={[len, 0.008, 0.07]} position={[len / 2 + 0.03, 0, 0]} material={m.carbon} />
    </group>
  );
  const legs = [0, 1, 2, 3].map((i) => (i / 4) * Math.PI * 2 + Math.PI / 4);
  return (
    <group rotation={[0.08, 0.4, -0.05]}>
      {/* Fuselage */}
      <Box size={[0.14, 0.14, 0.16]} position={[0, 0.18, 0]} material={m.foil} />
      {/* Landing legs */}
      {legs.map((a) => (
        <group key={a}>
          <Strut from={[Math.cos(a) * 0.06, 0.13, Math.sin(a) * 0.06]} to={[Math.cos(a) * 0.3, 0.02, Math.sin(a) * 0.3]} r={0.006} material={m.carbon} />
          <Cyl r={0.022} h={0.012} position={[Math.cos(a) * 0.3, 0.01, Math.sin(a) * 0.3]} material={m.carbon} />
        </group>
      ))}
      {/* Mast */}
      <Cyl r={0.012} h={0.26} position={[0, 0.38, 0]} material={m.silver} />
      {/* Lower and upper rotors (broken) */}
      <Cyl r={0.03} h={0.04} position={[0, 0.3, 0]} material={m.black} />
      <Cyl r={0.03} h={0.04} position={[0, 0.39, 0]} material={m.black} />
      {blade(0.38, 0.3, 0.2, "l1")}
      {blade(0.36, 0.3, 0.2 + Math.PI, "l2")}
      {blade(0.37, 0.39, 1.4, "u1")}
      {blade(0.06, 0.39, 1.4 + Math.PI, "u2")}
      {/* Solar panel on top */}
      <Box size={[0.17, 0.01, 0.1]} position={[0, 0.49, 0]} material={m.solar} />
      {/* Cameras: downward nav camera, horizon-facing colour camera */}
      <Cyl r={0.012} h={0.02} position={[0, 0.1, 0.03]} material={m.black} />
      <Box size={[0.03, 0.025, 0.02]} position={[0, 0.15, 0.085]} material={m.black} />
    </group>
  );
}

/** InSight (about 6 m wide with arrays) with SEIS and HP3 on the ground. */
export function InSight() {
  const m = useMaterials(0.65);
  return (
    <group>
      {/* Deck */}
      <Cyl r={0.78} h={0.2} seg={6} position={[0, 0.95, 0]} material={m.foilDark} />
      <Cyl r={0.7} h={0.04} seg={6} position={[0, 1.07, 0]} material={m.white} />
      {/* Three legs */}
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2 + Math.PI / 6;
        return (
          <group key={i}>
            <Strut from={[Math.cos(a) * 0.5, 0.85, Math.sin(a) * 0.5]} to={[Math.cos(a) * 0.95, 0.05, Math.sin(a) * 0.95]} r={0.035} material={m.silver} />
            <Cyl r={0.12} rTop={0.08} h={0.06} position={[Math.cos(a) * 0.95, 0.03, Math.sin(a) * 0.95]} material={m.silver} />
          </group>
        );
      })}
      {/* Two decagonal solar arrays, 2.2 m across, dust-covered */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <Strut from={[side * 0.7, 1.0, 0]} to={[side * 0.95, 1.05, 0]} r={0.03} material={m.silver} />
          <Disc r={1.1} position={[side * 2.05, 1.06, 0]} material={m.solarDusty} />
        </group>
      ))}
      {/* RISE antennas on the deck */}
      <Box size={[0.12, 0.16, 0.12]} position={[0.3, 1.17, -0.35]} material={m.white} />
      <Box size={[0.12, 0.16, 0.12]} position={[-0.3, 1.17, -0.35]} material={m.white} />
      {/* Robotic arm reaching forward, with camera and grapple */}
      <Strut from={[0, 1.1, 0.55]} to={[0, 1.65, 1.0]} r={0.03} material={m.white} />
      <Strut from={[0, 1.65, 1.0]} to={[0.1, 1.05, 1.55]} r={0.025} material={m.white} />
      <Box size={[0.12, 0.08, 0.1]} position={[0.1, 1.0, 1.58]} material={m.black} />
      {/* SEIS under its wind and thermal shield */}
      <mesh position={[0.25, 0, 1.75]} scale={[1, 0.62, 1]} material={m.silver} castShadow receiveShadow>
        <sphereGeometry args={[0.36, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      <Cyl r={0.37} h={0.03} position={[0.25, 0.015, 1.75]} material={m.foilDark} />
      {/* HP3 support structure with the mole's tether */}
      <Box size={[0.3, 0.45, 0.22]} position={[-0.95, 0.24, 1.35]} material={m.white} />
      <Strut from={[-0.95, 0.02, 1.2]} to={[-0.55, 0.05, 0.9]} r={0.006} material={m.black} />
    </group>
  );
}
