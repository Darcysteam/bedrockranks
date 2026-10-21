# BedrockRanks — v0.1 (первая версия)
Сделано: главная, Tier List, профили, регистрация/вход, заявка на ранг, SQL с RLS, sitemap/robots.
НЕ сделано: панель судьи, голосования, админка, турниры, выход из аккаунта в UI, жалобы.
Код не запускался и не собирался (в среде нет интернета) — возможны мелкие ошибки при первой сборке.

## Запуск с телефона (Android)
1. github.com → New repository → Upload files: загрузите содержимое ZIP (распакуйте в «Файлах»).
2. supabase.com → New project → SQL Editor → вставьте supabase/migrations/001_init.sql → Run.
3. Supabase → Project Settings → API: скопируйте URL и anon key.
4. vercel.com → Add New Project → импорт из GitHub → Environment Variables из .env.example → Deploy.
5. Получите ссылку https://…vercel.app. Укажите её в NEXT_PUBLIC_SITE_URL и в Supabase → Auth → URL Configuration.
6. Зарегистрируйтесь на сайте, затем выполните закомментированный SQL внизу миграции, чтобы стать админом.
7. Google Search Console → Add property (URL prefix) → Sitemaps → sitemap.xml.
Ошибки сборки: Vercel → Deployments → Logs, пришлите мне текст.

## Обновление v0.2: 12 рангов и Telegram
1. Supabase → SQL Editor → выполните supabase/migrations/002_rank_history_telegram.sql (001 уже должен быть выполнен). Проверьте порядок: `select name, sort_order from rank_tiers order by sort_order;` (Bronze III = 1 … Elite I = 12).
2. Telegram (необязательно): создайте канал и чат, ссылки укажите в NEXT_PUBLIC_TELEGRAM_NEWS_URL / _CHAT_URL. Для бота: @BotFather → /newbot → токен; добавьте бота админом канала; TELEGRAM_BOT_TOKEN и TELEGRAM_CHANNEL_ID внесите в Vercel → Environment Variables (без NEXT_PUBLIC_). Без них кнопки скрыты, уведомления не отправляются.
3. Уведомление о ранге: POST /api/notify {"history_id": "..."} от имени судьи/админа; текст строится из БД, повторно не отправляется. Остальные шаблоны (матч, регистрация, турнир, голосование) лежат в src/lib/telegram.ts и будут подключены вместе с панелью судьи, голосованиями и турнирами, которых ещё нет.
4. Redeploy на Vercel.
