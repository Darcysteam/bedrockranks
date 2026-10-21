import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { RANKS } from "@/lib/ranks";
import TelegramLinks from "@/components/TelegramLinks";
export const dynamic = "force-dynamic";
async function count(t: string) { const s = await supabaseServer(); const { count } = await s.from(t).select("*", { count: "exact", head: true }); return count ?? 0; }
export default async function Home() {
  let stats: [string, number][] | null = null;
  try { stats = [["Players", await count("profiles")], ["Verified matches", await count("matches")], ["Applications", await count("rank_applications")]]; } catch {}
  const s = await supabaseServer();
  const { data: recent } = await s.from("player_ranks").select("verified_at, profiles(nickname), pvp_modes(name), rank_tiers(name)").order("verified_at", { ascending: false }).limit(6);
  return (<div className="space-y-8">
    <section className="py-8"><h1 className="text-4xl font-extrabold">Minecraft Bedrock <span className="text-blood">PvP Tier List</span></h1>
      <p className="mt-2 text-white/70">Ranks are assigned only after judge-verified matches. Separate rank for every mode.</p>
      <div className="mt-4 flex gap-3"><Link className="btn" href="/tier-list">Full Tier List</Link><Link className="btn" href="/apply">Apply for Rank</Link><TelegramLinks cta /></div>
      <form action="/tier-list" className="mt-4 flex gap-2"><input name="q" className="input max-w-xs" placeholder="Search player" aria-label="Search player" /><button className="btn">Search</button></form></section>
    <section aria-label="Stats" className="grid grid-cols-3 gap-3">{stats ? stats.map(([k,v]) => <div className="card" key={k}><div className="text-3xl font-bold">{v}</div><div className="text-sm text-white/60">{k}</div></div>) : <p className="card col-span-3">Stats unavailable: database not connected.</p>}</section>
    <section><h2 className="mb-3 text-2xl font-bold">Latest rank changes</h2>
      {recent?.length ? <ul className="grid gap-3 sm:grid-cols-2">{recent.map((r: any, i: number) => <li className="card" key={i}><Link href={`/players/${r.profiles?.nickname}`}>{r.profiles?.nickname} — {r.pvp_modes?.name}: {r.rank_tiers?.name}</Link></li>)}</ul> : <p className="card">No verified ranks yet.</p>}</section>
    <section><h2 className="mb-3 text-2xl font-bold">Ranks</h2><div className="grid gap-3 sm:grid-cols-4">{RANKS.map(r => <div key={r.key} className="card" style={{ borderColor: r.color }}><h3 className="font-bold" style={{ color: r.color }}>{r.name}</h3><p className="text-sm text-white/60">{r.desc}</p></div>)}</div></section>
  </div>);
}
