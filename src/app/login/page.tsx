"use client";
import { useActionState, useState } from "react";
import { auth } from "./actions";
export default function Login() {
  const [msg, act, pending] = useActionState(auth, null); const [mode, setMode] = useState("login");
  return (<div className="mx-auto max-w-sm"><h1 className="mb-4 text-3xl font-bold">{mode === "login" ? "Log in" : "Sign up"}</h1>
    <form action={act} className="space-y-3"><input type="hidden" name="mode" value={mode} />
      {mode === "signup" && <input name="nickname" className="input" placeholder="Minecraft nickname" aria-label="Nickname" required />}
      <input name="email" type="email" className="input" placeholder="Email" aria-label="Email" required />
      <input name="password" type="password" className="input" placeholder="Password (8+)" aria-label="Password" required minLength={8} />
      <button className="btn w-full" disabled={pending}>{pending ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}</button>
      {msg && <p role="alert" className="text-sm text-red-400">{msg}</p>}</form>
    <button className="mt-3 text-sm underline" onClick={() => setMode(mode === "login" ? "signup" : "login")}>{mode === "login" ? "No account? Sign up" : "Have an account? Log in"}</button></div>);
}
