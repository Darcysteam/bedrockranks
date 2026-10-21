import "server-only";
// Token lives only in server env vars. Without them every call is a safe no-op.
export const tgEnabled = () => !!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHANNEL_ID);
export const templates = {
  rank_update: (v: { player_name: string; pvp_mode: string; new_rank: string; previous_rank: string; profile_url: string }) =>
    `🏆 BEDROCKRANKS — RANK UPDATE\n\nИгрок: ${v.player_name}\nРежим: ${v.pvp_mode}\nНовый ранг: ${v.new_rank}\nПредыдущий ранг: ${v.previous_rank}\n\nРезультат подтверждён судьями.\n\n${v.profile_url}`,
  match_results: (v: { player_name: string; pvp_mode: string; score: string; url: string }) => `⚔️ BEDROCKRANKS — MATCH RESULT\n\nИгрок: ${v.player_name}\nРежим: ${v.pvp_mode}\nСчёт: ${v.score}\n\nПодтверждено судьёй.\n\n${v.url}`,
  new_registration: (v: { pvp_mode: string; url: string }) => `📝 BEDROCKRANKS — ОТКРЫТА РЕГИСТРАЦИЯ НА ПРОВЕРКУ\n\nРежим: ${v.pvp_mode}\n\n${v.url}`,
  tournament_start: (v: { name: string; url: string }) => `🏟 BEDROCKRANKS — ТУРНИР НАЧАЛСЯ\n\n${v.name}\n\n${v.url}`,
  vote_result: (v: { player_name: string; result: string; url: string }) => `🗳 BEDROCKRANKS — ИТОГИ ГОЛОСОВАНИЯ\n\nИгрок: ${v.player_name}\nИтог: ${v.result}\n\n${v.url}`,
};
export async function sendTelegram(text: string): Promise<boolean> {
  if (!tgEnabled()) return false;
  const r = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHANNEL_ID, text, disable_web_page_preview: false }),
  });
  return r.ok;
}
