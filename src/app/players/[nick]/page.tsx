import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase/server";
import RankBadge from "@/components/RankBadge";
export const dynamic = "force-dynamic";
type P = { params: Promise<{ nick: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> { const { nick } = await params; return { title: `${decodeURIComponent(nick)} — Player Profile`, description: `Verified Minecraft Bedrock PvP ranks of ${decodeURIComponent(nick)}.` }; }
export default async function Player({ params }: P) {
  const nick = decodeURIComponent((await params).nick); const s = await supabaseServer();
  const { data: p } = await s.from("profiles").select("id,nickname,platform,region,status").ilike("nickname", nick).maybeSingle();
  if (!p) notFound();
  const { data: ranks } = await s.from("player_ranks").select("verified_at, pvp_modes(name), rank_tiers(name)").eq("player_id", p.id);
  const { data: hist } = await s.from("rank_history").select("created_at, pvp_modes(name), new:rank_tiers!new_tier_id(name), prev:rank_tiers!previous_tier_id(name)").eq("player_id", p.id).order("created_at", { ascending: false }).limit(20) as { data: any[] | null };
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/players/${encodeURIComponent(p.nickname)}`;
  return (<div><h1 className="text-3xl font-bold">{p.nickname}</h1>
    <p className="text-white/60">Status: {p.status} · Platform: {p.platform ?? "Not Verified"}{p.region ? ` · ${p.region}` : ""} · Ownership of this nickname is not verified.</p>
    <h2 className="mt-6 mb-2 text-xl font-bold">Ranks by mode</h2>
    {ranks?.length ? <ul className="grid gap-3 sm:grid-cols-2">{ranks.map((r: any, i: number) => <li className="card" key={i}>{r.pvp_modes?.name}: <RankBadge name={r.rank_tiers?.name} /><div className="text-xs text-white/50">Verified {new Date(r.verified_at).toLocaleDateString()}</div></li>)}</ul> : <p className="card">Unranked</p>}<h2 className="mt-6 mb-2 text-xl font-bold">Rank history</h2>
    {hist?.length ? <ul className="space-y-2">{hist.map((h, i) => <li className="card text-sm" key={i}>{h.pvp_modes?.name}: {h.prev?.name ?? "Unranked"} → <b>{h.new?.name}</b> <span className="text-white/50">· {new Date(h.created_at).toLocaleDateString()}</span></li>)}</ul> : <p className="card">No rank changes yet.</p>}
    <a className="btn mt-6" target="_blank" rel="noopener noreferrer" href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(p.nickname + " — BedrockRanks")}`}>Share in Telegram</a></div>);
}
