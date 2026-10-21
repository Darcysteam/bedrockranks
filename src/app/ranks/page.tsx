import type { Metadata } from "next";
import Link from "next/link";
import RankBadge from "@/components/RankBadge";
import { TIERS } from "@/lib/ranks";
export const metadata: Metadata = { title: "Ranks", description: "All 12 BedrockRanks tiers from Bronze III to Elite I with requirements.", alternates: { canonical: "/ranks" } };
export default function Ranks() {
  return (<div><h1 className="mb-2 text-3xl font-bold">Rank system</h1>
    <p className="mb-4 text-white/70">12 tiers, lowest to highest. Rank is separate in every PvP mode. Elite I is the top.</p>
    <ol className="space-y-3">{TIERS.map((t, i) => (<li key={t.name} className="card" style={{ borderColor: t.color }}>
      <div className="flex items-center justify-between"><RankBadge name={t.name} /><span className="text-sm text-white/50">#{i + 1}</span></div>
      <p className="mt-2 text-sm">{t.desc}</p><p className="text-sm text-white/60">Requirement: {t.req}</p>
      <Link className="text-sm underline" href={`/tier-list?rank=${encodeURIComponent(t.name)}`}>Show players</Link></li>))}</ol></div>);
}
