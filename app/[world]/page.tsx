import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorld, isWorldId, machinesOf, markersOf, WORLDS } from "@/content";
import { WorldPanel } from "@/ui/WorldPanel";

export const dynamicParams = false;

export function generateStaticParams() {
  return WORLDS.map((w) => ({ world: w.id }));
}

type Params = Promise<{ world: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { world } = await params;
  if (!isWorldId(world)) return {};
  const w = getWorld(world);
  return { title: w.name, description: w.intro };
}

export default async function WorldPage({ params }: { params: Params }) {
  const { world } = await params;
  if (!isWorldId(world)) notFound();
  return <WorldPanel world={getWorld(world)} machines={machinesOf(world)} markers={markersOf(world)} />;
}
