# Optional advertising — owner activation guide

Reviewed official sources on 2026-10-29:

- [AdSense content ads on game pages](https://support.google.com/adsense/answer/2768340): Google strongly recommends at least 150 pixels between content ads and the game, or removing them from game pages. Do not obscure play links or create ad-dominated intermediate pages.
- [H5 Games Ads signup](https://developers.google.com/ad-placement/docs/signup): by application, requires an approved AdSense account; approval is not guaranteed. Ordinary account approval does not by itself authorize H5 formats.
- [Google EU user consent policy](https://www.google.com/about/company/user-consent-policy/)
- [Google CMP requirements](https://support.google.com/adsense/answer/13554116)

Recheck current policies when activating. This implementation is preparation, not approval or a legal compliance certification.

## Default behavior

`NEXT_PUBLIC_ADS_ENABLED=false`. No Google scripts, ad requests, H5 ads or consent banner are loaded. Ads have no effect on timer or play. There is no ad refresh, click encouragement, ad overlay, disguised button, rewarded mechanic, or ad-only transition.

The sole optional placement is below all gameplay and explanatory sections, with an additional 160px top margin. It appears only at viewport widths ≥1100px; it is omitted on phones and tablets. Fixed 728×90 display format avoids squeezing unsuitable units onto small screens. Check spacing again after any future layout change. Auto ads are not integrated; leave them off so Google does not add unreviewed placements near game controls.

## Before enabling

1. Complete owner/contact/privacy/terms pages and real canonical origin; launch a useful, accessible HTTPS site. Obtain AdSense account and site approval; complete Google's requested ownership verification and other account actions. Approval and earnings are not promised.
2. Obtain an ordinary display slot. Use the provided manual placement only. Set the real publisher (`ca-pub-` + 16 digits) and numeric slot IDs in `.env.local` or host build variables. Never put secrets in `NEXT_PUBLIC_` variables.
3. Publish the correct Google-supplied `ads.txt` entry at the root if required by your account; replace its publisher ID with your own. Do not publish a fabricated publisher entry. Follow the account's ads.txt verification instructions.
4. Implement a suitable consent management platform. For EEA/UK/Switzerland ad serving, review Google's certified CMP / TCF requirements. Configure regional disclosures, legitimate consent/legal bases, reject and withdrawal options, and Google consent signals. Nonpersonalized ads are not a universal exemption from consent rules. Review other regional requirements as applicable.
5. Hook the CMP to the slot only after its Google signals are established:

```js
window.dispatchEvent(new CustomEvent('glitch:consent', { detail: { ads: true } }));
// On denial or withdrawal:
window.dispatchEvent(new CustomEvent('glitch:consent', { detail: { ads: false } }));
```

This event is an integration hook, NOT a CMP or proof of compliance. Emit after React has mounted; re-emit when a returning visitor's CMP resolves. Default is denied. The CMP owns Google consent state and cookies; removing the slot does not undo previously loaded third-party script/storage. On withdrawal also update Google's consent and follow CMP guidance, potentially reloading after preferences are saved. The MVP does not reload ads after a revoke/regrant in the same visit; reload the page after resolving preferences. The slot requests at most once per mounted page and does not refresh after game replay.

6. Set `NEXT_PUBLIC_ADS_ENABLED=true`; rebuild. In a staging/test setup approved by Google, verify accepted/rejected/withdrawn consent, narrow viewports, no-fill, blockers, script failure, spacing, CLS and unchanged gameplay. Do not click your own live ads. If the page initially loads narrow and later widens, a reload may be needed for the optional ad; this conservative no-ad behavior is intentional.
7. Watch policy center, consent failures, layout regressions and invalid traffic. Remove the slot if spacing or experience becomes unsuitable.

## H5 ads

There is deliberately no H5 API, interstitial, or rewarded integration. Apply separately through Google's H5 process only if desired. Do not enable full-screen ordinary display ads as a substitute. Implement and review approved H5 formats in a later change after receiving the necessary Google permissions.
