const news = process.env.NEXT_PUBLIC_TELEGRAM_NEWS_URL;
const chat = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_URL;
export default function TelegramLinks({ cta = false }: { cta?: boolean }) {
  if (!news && !chat) return null;
  return (<span className="inline-flex gap-3">
    {news && <a href={news} target="_blank" rel="noopener noreferrer" className={cta ? "btn" : "hover:text-blood"}>{cta ? "Подписаться на новости" : "Telegram News"}</a>}
    {chat && <a href={chat} target="_blank" rel="noopener noreferrer" className={cta ? "btn" : "hover:text-blood"}>{cta ? "Сообщество" : "Telegram Community"}</a>}
  </span>);
}
