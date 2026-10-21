import type { MetadataRoute } from "next";
import { supabaseServer } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const s0 = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"; const s = await supabaseServer();
  const { data } = await s.from("profiles").select("nickname").limit(5000);
  return [...["", "/tier-list", "/ranks", "/rules", "/privacy"].map(p => ({ url: s0 + p })), ...(data ?? []).map(p => ({ url: `${s0}/players/${encodeURIComponent(p.nickname)}` }))];
}
