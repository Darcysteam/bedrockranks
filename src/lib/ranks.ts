export const RANKS = [
  { key: "bronze", name: "Bronze", color: "#cd7f32", desc: "Entry level: solid basics and a first verified win streak." },
  { key: "silver", name: "Silver", color: "#d0d8e0", desc: "Consistent fundamentals against verified opponents." },
  { key: "gold", name: "Gold", color: "#ffd23f", desc: "Advanced tactics and reliable results in judged duels." },
  { key: "elite", name: "Elite", color: "#ff2a3d", desc: "Top of the mode. Confirmed by judges in multiple matches." },
] as const;
// Order = DB rank_tiers.sort_order (1..12). Elite I is the highest.
export const TIERS = [
  { name: "Bronze III", color: "#8a5a2b", icon: "🛡", desc: "First verified steps in a mode.", req: "Win a judged match against a Bronze-level opponent." },
  { name: "Bronze II", color: "#a66a32", icon: "🛡", desc: "Stable basics and movement.", req: "Win a judged first-to-5 against Bronze III or higher." },
  { name: "Bronze I", color: "#cd7f32", icon: "🛡", desc: "Top of Bronze, ready for Silver.", req: "Two judged wins in a row at Bronze II level." },
  { name: "Silver III", color: "#7f8a96", icon: "⚔", desc: "Consistent fundamentals.", req: "Beat a Bronze I player in a judged match." },
  { name: "Silver II", color: "#a3adb8", icon: "⚔", desc: "Good timing and trades.", req: "Win judged matches against Silver III." },
  { name: "Silver I", color: "#d0d8e0", icon: "⚔", desc: "Best of Silver.", req: "Win against Silver II and show consistency." },
  { name: "Gold III", color: "#b8901a", icon: "👑", desc: "Advanced tactics.", req: "Beat a Silver I player in a judged match." },
  { name: "Gold II", color: "#d9a920", icon: "👑", desc: "Reliable results under pressure.", req: "Win judged matches against Gold III." },
  { name: "Gold I", color: "#ffd23f", icon: "👑", desc: "Near the top of the mode.", req: "Win against Gold II with judge approval." },
  { name: "Elite III", color: "#9e1020", icon: "🔥", desc: "Elite entry.", req: "Beat a Gold I player; confirmed by at least two judges." },
  { name: "Elite II", color: "#d1142a", icon: "🔥", desc: "Proven top player.", req: "Win judged matches against Elite III." },
  { name: "Elite I", color: "#ff2a3d", icon: "💀", desc: "Highest rank of the system.", req: "Win against Elite II; confirmed by an administrator." },
] as const;
export const rankColor = (name?: string) =>
  TIERS.find(t => t.name === name)?.color ?? RANKS.find(r => name?.toLowerCase().startsWith(r.key))?.color ?? "#555";
