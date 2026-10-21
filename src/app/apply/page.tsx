import { supabaseServer } from "@/lib/supabase/server";
import ApplyForm from "./form";
export const dynamic = "force-dynamic";
export const metadata = { title: "Apply for Rank" };
export default async function Apply() {
  const s = await supabaseServer();
  const { data: modes } = await s.from("pvp_modes").select("id,name").eq("active", true);
  const { data: tiers } = await s.from("rank_tiers").select("id,name").order("sort_order");
  return (<div className="mx-auto max-w-lg"><h1 className="mb-4 text-3xl font-bold">Apply for Rank</h1><ApplyForm modes={modes ?? []} tiers={tiers ?? []} /></div>);
}
