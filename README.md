# Spot the Glitch

A mobile-first 30-second visual puzzle. Next.js + TypeScript + CSS, exported to static files. No account, database, API, external font, or game engine. All ads and analytics are off by default.

## Run and preview

Node 20.9+ (Node 22/24 recommended).

```sh
npm ci
cp .env.example .env.local
npm run dev
# http://localhost:3000
```

Production:

```sh
npm run test
npm run build
npm run typecheck
npm run preview
# serves out/ at http://localhost:3000
```

Browser checks: `npx playwright install chromium` then `npm run test:e2e`. With installed Google Chrome and an already running preview, use `npx tsx node_modules/@playwright/test/cli.js test --config playwright.local.config.ts`. The tests use a dev server unless an existing server is on port 3000. Screenshots appear in test-results. Do not run development and production builds simultaneously (they share .next).

## Hosting cheaply

Upload **out/** to any static HTTPS host. No server runtime is needed. A basic static hosting tier and an optional domain are sufficient; check the provider's current terms and limits. Cloudflare Pages: build `npm ci && npm run build`, output `out`. Netlify: same command, publish `out`. On Vercel import the repository, use Next.js with static export and confirm `out` is published. For any host preserve directory index routes (`/privacy/` → `/privacy/index.html`). No SPA catch-all is necessary.

Set `NEXT_PUBLIC_SITE_URL` to the actual origin (no trailing slash) before building. It is embedded into canonical URLs, Open Graph metadata, robots and sitemap. Preview uses example.com until configured; do not index that placeholder build. Share URLs always use the current browser origin. Deploy via HTTPS for clipboard and native sharing support. No production deployment or account creation is needed to play locally.

## Owner launch actions

- Complete all `[ADD ...]` / `[OWNER ...]` fields in `app/[page]/page.tsx` with a monitored contact address, operator, dates, and appropriate policies. Review legal text for your actual operation, host, region and audience.
- Set the real site URL; rebuild and verify social-card.png, canonical URLs, sitemap.xml and robots.txt. Submit sitemap in your search console if desired.
- Test on real iOS/Android devices, including screen reader, touch, audio and native share sheets.
- Leave ads and analytics disabled until configured, disclosed and consent-tested. See [ad setup](docs/ADS.md).
- Follow the [14-day launch and measurement plan](docs/LAUNCH.md).

## Structure

- `lib/puzzles.ts`: pure indexed seeded generation; UTC daily seeds; strict versioned link parsing.
- `lib/engine.ts`: elapsed-time timer, scoring, penalty, expiry.
- `components/Game.tsx`: UI lifecycle, pause/resume, input and results.
- `components/Symbol.tsx`: original geometric SVG shapes. Every odd variant changes geometry, never color alone.
- `lib/storage.ts`: guarded local storage; corrupt numeric bests are ignored.
- `lib/sharing.ts`: native share → clipboard → selectable link; browser canvas score PNG.
- `lib/analytics.ts`: optional consent-gated, exception-safe adapter.
- `components/Ads.tsx`: disabled-by-default display slot, independent of gameplay.

## Fairness and limits

2×2 for the first 3 puzzles, 3×3 through puzzle 9, then 4×4. Each correct answer is +1; wrong picks remove 2 seconds. Time is measured by performance.now, not interval counts. Leaving the tab pauses; resume explicitly. A closed/reloaded page abandons the round. Daily means midnight UTC; date is based on device time, not a trusted server. Daily replays and friend links intentionally repeat their sequence, so memorization is possible. Practice replays use a fresh seed.

Version `v1` is part of the link format and hash. Keep the v1 generator frozen or add a version dispatcher when changing generation; otherwise old links would silently change. Scores are self-reported; no anti-cheat or verified leaderboard is claimed. Bests are local and scoped to practice, UTC day, or friend seed. Private browsing or cleared storage loses records. The game uses visual puzzles; keyboard and high-contrast support do not make it a nonvisual game.

Shared PNGs are generated locally; download counts mean an attempt, not a proven social post. Native sharing requires browser support and may be cancelled. Ad fill and approval are never guaranteed. No H5 ad API or interstitial/rewarded path is included.

## Verification report

See [actual validation results and preview limitations](docs/VALIDATION.md). Six logic/render tests, production build and standalone type check passed. Four Chrome browser tests also passed; physical-device verification remains outstanding.
