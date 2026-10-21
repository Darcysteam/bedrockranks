import Link from "next/link";
import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase/server";
import RankBadge from "@/components/RankBadge";
import { RANKS } from "@/lib/ranks";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Tier List", description: "Verified Minecraft Bedrock PvP ranks by mode.", alternates: { canonical: "/tier-list" } };
export default async function TierList({ searchParams }: { searchParams: Promise<{ mode?: string; q?: string; rank?: string; page?: string }> }) {
  const sp = await searchParams; const s = await supabaseServer();
  const { data: modes } = await s.from("pvp_modes").select("slug,name").eq("active", true).order("name");
  const mode = sp.mode ?? modes?.[0]?.slug; const page = Math.max(1, Number(sp.page) || 1); const per = 20;
  let rows: any[] = [];
  if (mode) {
    let q = s.from("player_ranks").select("verified_at, profiles!inner(nickname), pvp_modes!inner(slug), rank_tiers!inner(name,sort_order)").eq("pvp_modes.slug", mode);
    if (sp.rank) q = sp.rank.includes(" ") ? q.eq("rank_tiers.name", sp.rank) : q.ilike("rank_tiers.name", `${sp.rank.replace(/[%_]/g, "")} %`);
    if (sp.q) q = q.ilike("profiles.nickname", `%${sp.q.replace(/[%_]/g, "")}%`);
    const { data } = await q.order("rank_tiers(sort_order)", { ascending: false }).range((page-1)*per, page*per-1); rows = data ?? [];
  }
  return (<div><h1 className="mb-4 text-3xl font-bold">Tier List</h1>
    <div className="mb-4 flex flex-wrap gap-2">{modes?.map(m => <Link key={m.slug} href={`/tier-list?mode=${m.slug}`} className={`rounded-lg border px-3 py-1 ${m.slug===mode?"border-blood bg-blood":"border-white/20"}`}>{m.name}</Link>)}</div>
    <div className="mb-4 flex flex-wrap gap-2 text-sm"><Link href={`/tier-list?mode=${mode ?? ""}`} className="underline">All ranks</Link>{RANKS.map(r => <Link key={r.key} href={`/tier-list?mode=${mode ?? ""}&rank=${r.name}`} className="rounded border px-2 py-0.5" style={{ borderColor: r.color, color: r.color }}>{r.name}</Link>)}</div>
    <form className="mb-4 flex gap-2"><input type="hidden" name="mode" value={mode ?? ""} /><input name="q" defaultValue={sp.q} className="input max-w-xs" placeholder="Nickname" aria-label="Nickname" /><button className="btn">Search</button></form>
    {rows.length ? <ul className="space-y-2">{rows.map((r, i) => <li key={i}><Link className="card flex justify-between" href={`/players/${r.profiles.nickname}`}><span>{r.profiles.nickname}</span><span className="flex items-center gap-3"><RankBadge name={r.rank_tiers.name} size={28} /><span className="text-xs text-white/50">{new Date(r.verified_at).toLocaleDateString()}</span></span></Link></li>)}</ul> : <p className="card">No verified players for this mode yet.</p>}
    <div className="mt-4 flex gap-3">{page>1 && <Link className="btn" href={`/tier-list?mode=${mode}&page=${page-1}`}>Prev</Link>}{rows.length===per && <Link className="btn" href={`/tier-list?mode=${mode}&page=${page+1}`}>Next</Link>}</div></div>);
}
