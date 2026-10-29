# Validation record

2026-10-29, Node 24.22.0, Next.js 16.4.3, installed Google Chrome.

- `npm run test`: 6 passing tests. 10,000 deterministic puzzles checked for a single changed cell and grid progression; UTC daily seeds and friend sequence round-trip; malformed and unsupported links; timer/penalty/scoring/expiry/pause; unavailable local storage; distinct rendered SVG variants across every family and orientation.
- `npm run build`: production webpack compilation, TypeScript check and static export passed. Home, four content pages, icon, robots and sitemap emitted.
- `npm run typecheck`: passed.
- `npx tsx node_modules/@playwright/test/cli.js test --config playwright.local.config.ts`: 4 browser tests passed using installed Chrome and the running preview. Covered keyboard movement/Enter selection, penalty, 2×2→4×4 progression, pause, completion, immediate replay, PNG download, mocked native sharing with the actual score, unavailable clipboard selectable-link fallback, daily, hidden-tab pause event, denied storage, invalid links, absence of Google scripts, and no horizontal overflow at 320/375/768/1280px. Screenshots are generated in test-results and desktop/320px captures were inspected.
- Local preview http://localhost:3000 returned HTTP 200. Initial sandboxed browser/server attempts failed; running tests through the approved runner with installed Chrome succeeded.
- Native mobile share sheets/audio, physical touch devices, screen readers, ad fill/consent and configured third-party analytics remain owner verification tasks. Ads and analytics were disabled. No live ad requests or approval checks were made.

Logic and desktop browser tests do not prove perceptual fairness or physical-device comfort. Have a few users try the puzzles and test real phones before public launch.

## Hosted preview limitation

A private Sites project was registered, but publication did not complete. Source synchronization failed in the restricted helper, and the alternative interactive repository credential submission was rejected by automatic approval policy. No hosted deployment is claimed. The local preview and static export are playable. `npm run dev` serves source; `npm run preview` serves the exported out directory.
