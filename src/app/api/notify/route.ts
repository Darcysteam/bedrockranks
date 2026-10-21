import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { sendTelegram, templates, tgEnabled } from "@/lib/telegram";
// POST {history_id}. Only a logged-in judge/admin may call it; the text is built from DB rows, never from client input.
export async function POST(req: Request) {
  if (!tgEnabled()) return NextResponse.json({ ok: false, reason: "telegram_not_configured" });
  const s = await supabaseServer(); const { data: { user } } = await s.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { data: me } = await s.from("profiles").select("role").eq("id", user.id).single();
  if (!me || !["judge", "admin"].includes(me.role)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const body = await req.json().catch(() => null); const id = body?.history_id;
  if (typeof id !== "string") return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const { data: h } = await s.from("rank_history").select("id, notified_at, profiles(nickname), pvp_modes(name), new:rank_tiers!new_tier_id(name), prev:rank_tiers!previous_tier_id(name)").eq("id", id).maybeSingle() as { data: any };
  if (!h || h.notified_at) return NextResponse.json({ error: "not_found_or_already_sent" }, { status: 404 });
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const ok = await sendTelegram(templates.rank_update({ player_name: h.profiles.nickname, pvp_mode: h.pvp_modes.name, new_rank: h.new.name, previous_rank: h.prev?.name ?? "Unranked", profile_url: `${site}/players/${encodeURIComponent(h.profiles.nickname)}` }));
  if (ok) await s.from("rank_history").update({ notified_at: new Date().toISOString() }).eq("id", id);
  return NextResponse.json({ ok });
}
