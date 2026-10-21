"use client";
import { useActionState } from "react";
import { apply } from "./actions";
type O = { id: string; name: string }[];
export default function ApplyForm({ modes, tiers }: { modes: O; tiers: O }) {
  const [msg, act, pending] = useActionState(apply, null);
  return (<form action={act} className="space-y-3">
    <select name="mode_id" className="input" aria-label="PvP mode" required>{modes.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select>
    <select name="platform" className="input" aria-label="Platform"><option>Android</option><option>iOS</option><option>Windows</option><option>Console</option></select>
    <input name="region" className="input" placeholder="Region (optional)" aria-label="Region" />
    <select name="tier_id" className="input" aria-label="Desired rank">{tiers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select>
    <input name="video_url" className="input" placeholder="https://youtube.com/…" aria-label="Video link" required />
    <textarea name="comment" className="input" rows={3} placeholder="Comment" aria-label="Comment" />
    <label className="flex gap-2 text-sm"><input type="checkbox" name="agree" /> I accept the rules</label>
    <button className="btn" disabled={pending}>{pending ? "Sending…" : "Submit"}</button>
    {msg && <p role="alert" className="text-sm">{msg}</p>}</form>);
}
