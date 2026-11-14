import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMachine, isWorldId, MACHINES, nextMachine } from "@/content";
import { MachineView } from "@/ui/MachineView";

export const dynamicParams = false;

export function generateStaticParams() {
  return MACHINES.map((m) => ({ world: m.world, slug: m.slug }));
}

type Params = Promise<{ world: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { world, slug } = await params;
  const m = isWorldId(world) ? getMachine(world, slug) : undefined;
  if (!m) return {};
  return { title: m.name, description: m.epitaph, openGraph: { title: `${m.name} · Afterlight`, description: m.epitaph } };
}

export default async function MachinePage({ params }: { params: Params }) {
  const { world, slug } = await params;
  const m = isWorldId(world) ? getMachine(world, slug) : undefined;
  if (!m) notFound();
  const n = nextMachine(m);
  return <MachineView machine={m} next={{ href: `/${n.world}/${n.slug}`, name: n.name, world: n.world }} />;
}
