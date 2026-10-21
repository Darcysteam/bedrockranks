"use server";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
export async function auth(_: string | null, f: FormData): Promise<string | null> {
  const email = String(f.get("email") ?? "").trim(); const password = String(f.get("password") ?? ""); const nickname = String(f.get("nickname") ?? "").trim(); const mode = String(f.get("mode"));
  if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 8) return "Enter a valid email and a password of 8+ characters.";
  const s = await supabaseServer();
  if (mode === "signup") {
    if (!/^[A-Za-z0-9_ ]{3,16}$/.test(nickname)) return "Nickname: 3-16 letters, digits, _ or space.";
    const { error } = await s.auth.signUp({ email, password, options: { data: { nickname } } });
    if (error) return error.message; return "Check your email to confirm the account (if confirmation is enabled), then log in.";
  }
  const { error } = await s.auth.signInWithPassword({ email, password });
  if (error) return "Wrong email or password."; redirect("/");
}
export async function logout() { const s = await supabaseServer(); await s.auth.signOut(); redirect("/"); }
