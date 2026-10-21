import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import TelegramLinks from "@/components/TelegramLinks";
const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "BedrockRanks — Minecraft Bedrock PvP Tier List", template: "%s | BedrockRanks" },
  description: "Independent tier list for Minecraft Bedrock PvP: verified ranks per mode, player profiles and judged matches.",
  openGraph: { title: "BedrockRanks", description: "Minecraft Bedrock PvP tier list", type: "website" },
  alternates: { canonical: "/" },
};
const nav = [["Home","/"],["Tier List","/tier-list"],["Ranks","/ranks"],["Rules","/rules"],["Apply for Rank","/apply"]];
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>
    <header className="border-b border-blood/40"><nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 p-4" aria-label="Main">
      <Link href="/" className="text-xl font-extrabold text-blood">BedrockRanks</Link>
      {nav.map(([t,h]) => <Link key={h} href={h} className="text-sm hover:text-blood">{t}</Link>)}
      <span className="ml-auto flex gap-4 text-sm"><TelegramLinks /><Link href="/login" className="hover:text-blood">Log in</Link></span>
    </nav></header>
    <main className="mx-auto max-w-5xl p-4">{children}</main>
    <footer className="mx-auto max-w-5xl p-4 text-sm text-white/50"><Link href="/rules">Rules</Link> · <Link href="/privacy">Privacy</Link> · <TelegramLinks /> · Not affiliated with Mojang or Microsoft.</footer>
  </body></html>);
}
