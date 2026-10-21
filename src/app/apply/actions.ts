"use server";
import { supabaseServer } from "@/lib/supabase/server";
const HOSTS = ["youtube.com","www.youtube.com","youtu.be","twitch.tv","www.twitch.tv","streamable.com","medal.tv"];
export async function apply(_: string | null, f: FormData): Promise<string | null> {
  const s = await supabaseServer(); const { data: { user } } = await s.auth.getUser();
  if (!user) return "Please log in first.";
  const mode_id = String(f.get("mode_id")); const tier_id = String(f.get("tier_id")); const platform = String(f.get("platform"));
  const region = String(f.get("region") ?? "").slice(0, 40) || null; const comment = String(f.get("comment") ?? "").slice(0, 1000);
  if (!["Android","iOS","Windows","Console"].includes(platform)) return "Choose a platform.";
  if (f.get("agree") !== "on") return "You must accept the rules.";
  let url: URL; try { url = new URL(String(f.get("video_url"))); } catch { return "Invalid video link."; }
  if (url.protocol !== "https:" || !HOSTS.includes(url.hostname)) return "Use an https link from YouTube, Twitch, Streamable or Medal.";
  const since = new Date(Date.now() - 3600_000).toISOString();
  const { count } = await s.from("rank_applications").select("*", { count: "exact", head: true }).eq("user_id", user.id).gte("created_at", since);
  if ((count ?? 0) >= 3) return "Too many applications. Try again later.";
  const { error } = await s.from("rank_applications").insert({ user_id: user.id, mode_id, desired_tier_id: tier_id, platform, region, video_url: url.toString(), comment });
  if (error) return error.code === "23505" ? "You already have an open application for this mode." : "Could not save the application.";
  return "Application submitted. Status: Pending.";
}
