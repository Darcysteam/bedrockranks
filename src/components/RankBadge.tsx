import { TIERS, rankColor } from "@/lib/ranks";
export default function RankBadge({ name, size = 40 }: { name?: string | null; size?: number }) {
  if (!name) return null;
  const t = TIERS.find(x => x.name === name); const c = rankColor(name);
  const num = name.split(" ")[1] ?? "";
  return (<span className="inline-flex items-center gap-2" title={name}>
    <svg width={size} height={size} viewBox="0 0 40 40" role="img" aria-label={name}>
      <path d="M20 2 36 8v12c0 9-7 15-16 18C11 35 4 29 4 20V8z" fill="#141417" stroke={c} strokeWidth="2.5" />
      <text x="20" y="18" textAnchor="middle" fontSize="11">{t?.icon}</text>
      <text x="20" y="31" textAnchor="middle" fontSize="11" fontWeight="800" fill={c}>{num}</text>
    </svg><span className="font-semibold" style={{ color: c }}>{name}</span></span>);
}
