# 14-day organic launch experiment

Hypothesis: a clear 30-second demo gets people to complete a round, and a reproducible friend or daily challenge gives some of them a reason to replay or return. This is an experiment, not a prediction of virality or revenue. Use only original gameplay footage and actual scores. Disclose that challenge scores are self-reported. Do not invent leaderboards, usage counts, ratings or percentile claims.

| Day | Action | Learn |
| --- | --- | --- |
| 1 | Watch 5 consenting testers use a phone without instruction. Fix unclear rules, taps, and timer behavior. | Can people start within five seconds? |
| 2 | Test 320px phones, keyboard, storage denial and shared links. Complete owner pages; publish HTTPS preview. | Are all rounds playable? |
| 3 | Record three vertical clips: orientation, missing line, extra detail. End with a real round result and readable URL. | Which difference is clear on a small video? |
| 4 | Post one 10–15 second clip to an owned social account. Use “Can you spot the different shape?” and a direct game link. | Link visits → starts, with permitted campaign tags. |
| 5 | Ask moderators of two relevant puzzle/casual-game communities whether a free game challenge is welcome. Read their rules. | Where is useful participation permitted? |
| 6 | Share a playable demo in one permitted feedback thread, with a specific request about puzzle fairness. Reply helpfully. | Confusion and unfair variants. |
| 7 | Publish today's UTC daily seed link. Invite replies with actual scores, explicitly self-reported. Compare first-week metrics. | Daily starts and next-day returns. |
| 8 | Fix the largest observed drop-off. Change one thing only (e.g. button wording). Keep existing seeded generation stable. | Does the change improve completion? |
| 9 | Post a new clip with a different opening frame. Keep CTA and destination consistent with day 4. | Compare start rate by source, with sample sizes. |
| 10 | Offer a friend challenge using an actual completed round and its exact link. No incentives or fabricated rivalry. | Share attempts per completed round. |
| 11 | Return to permitted threads with improvements and answers. Avoid duplicate promotional posts. | Feedback quality and repeat play. |
| 12 | Run a daily challenge at a consistent UTC time on an owned channel. Explain reset time and repeatability. | Do daily players return? |
| 13 | Interview a few returning and nonreturning testers. Ask what made them stop or play again. | Reasons behind quantitative patterns. |
| 14 | Review metrics, device issues and comments. Keep, revise, or pause the acquisition approach based on observed behavior. | Choose one next experiment; no premature ad expansion. |

## Measurement and consent

No analytics service or network event collector is installed. `lib/analytics.ts` exposes `configureAnalytics(adapter, hasConsent)` and `setAnalyticsConsent(boolean)`. Supply a first-party or chosen vendor adapter only after reviewing its current docs, retention, regional requirements, privacy disclosures and consent. Default is deny. Initialize before Game mounts if you need the returning-player event, or buffer initialization within your own approved consent flow. Do not replay historical events from before consent. With late consent, initial return detection may be unmeasured; report that limit.

Events: `start {mode}`, `complete {mode,score}`, `replay {mode}`, `share {method,mode,score}`, `return {}`. Replay is a new round start for measurement, even though it has its own event name. Shared seed and full challenge URL are deliberately excluded from the analytics payload. Never collect contact information through game events. Add consented session/round identifiers at the adapter boundary if required to deduplicate; minimize data and document retention. A no-cookie adapter is not automatically exempt from all requirements.

| Metric | Definition | Interpretation |
| --- | --- | --- |
| Completion | completed rounds / (start + replay rounds) | Abandoned, reloaded rounds remain uncompleted; pause time is excluded from play time. |
| Replay | completed rounds followed by replay / completed rounds | Requires session/round association; raw replay / complete is only an approximation. |
| Sharing | completed rounds with ≥1 share action / completed rounds | Native success, clipboard success and image attempt are separate. Cancellation is not success. A share is not proof a friend opened it. |
| Return | consented visitors seen on a later UTC date / eligible first-day cohort | Needs a consented, minimal date-based cohort identifier at adapter boundary. The built-in visited flag only indicates a repeat visit, not D1/D7 retention. |
| Activation | started visitors / landing visitors | Add consented pageviews in the adapter; source visits are not starts. |

The MVP return event means “visited this browser before,” not “returned on a later day.” For true D1/D7, implement consented cohort dates in your selected analytics integration. Report returning visits separately until then. Multiple tabs and cleared storage can distort counts; disclose exclusions and consent coverage. Native share cancellation is logged with method `cancelled`; exclude it from successful shares. The manual-link fallback means a selectable link was offered, not that it was copied. Download events measure an attempted export.

Choose provisional internal goals after a baseline (for example ≥70% completion and ≥25% session replay among at least 100 consented starts); these are experimental thresholds, not industry benchmarks. Show absolute counts alongside rates. Compare by device, mode and permitted campaign source; avoid interpreting tiny samples. If completion is weak, improve fairness and input clarity before buying traffic or enabling ads.
