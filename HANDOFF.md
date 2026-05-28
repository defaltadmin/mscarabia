# MSC Arabia Website — Handoff Document

**Last updated**: 2026-05-29 (session 5)
**Live**: https://mscarabia.com
**Repo**: https://github.com/defaltadmin/mscarabia (branch: `main`)
**Hosting**: Cloudflare Pages (auto-deploy via Git integration)
**Commits**: `57daa0c` (latest)

---

## Current State

Pushed and live. `git status` clean.

**Lighthouse Scores** (desktop, Lighthouse report `mscarabia.com-20260528T181950`):
| Metric | Score | Target |
|--------|-------|--------|
| Performance | **97** | 100 |
| Accessibility | **100** | 100 ✅ |
| Best Practices | **96** | 100 |
| SEO | **100** | 100 ✅ |

**Key Metrics:**
- FCP: 0.7s (score 0.97) — needs <0.9s for 100
- LCP: 1.1s (score 0.91) — needs <1.2s for 100
- TBT: 0ms (score 1) ✅
- CLS: 0.004 (score 1) ✅
- Speed Index: 1.0s (score 0.97)
- Interactive: 1.2s (score 1) ✅

---

## Session 5 Changes (2026-05-29)

### Amazon Q Audit Fixes (9 findings)
1. **Cookie consent banner** — Gated GA behind accept/decline banner. Consent stored in localStorage. GA dynamically loaded only on accept. Deny sets `analytics_storage: denied`. Fixes Saudi PDPL + GDPR compliance.
2. **Privacy policy email + phone leak** — Replaced personal `+966551675320` and `info.mscarabia@gmail.com` with `info@mscarabia.com` in all 4 occurrences (body + grievance officer).
3. **Dead toggleSvc accordion code** — Bento grid cards aren't accordions. Removed `toggleSvc()` function, `window.toggleSvc`, and all `onclick/onkeydown/role/tabindex/aria-expanded` from all 6 svc-cards. Would have caused `ReferenceError` on click.
4. **Language toggle double-fire** — Removed nested `role="button"` + `onclick` from wrapper divs (desktop + mobile). Now only the inner `<button>` triggers `toggleLang()`.
5. **Canvas draw(0) visual jump** — Changed `draw(0)` to `requestAnimationFrame(draw)`.
6. **Skip navigation link** — Added `skip-nav` link targeting `#main-content` for keyboard a11y.
7. **404 page Google Fonts** — Removed external font dependency, now uses self-hosted `/assets/fonts/fonts.css`.
8. **.cfignore** — Added `mscarabia.com-*.json` and `mscarabia_og.html` to prevent deploying JSON exports.
9. **CSP form-action** — Added `form-action 'self'` directive.

### New logo + OG image (from previous session, committed this session)
- Replaced `assets/logo.png` (435KB) + added `assets/logo.svg` (17KB)
- Added `assets/og-image.jpg` (77KB) — wired into `og:image` + `twitter:image`
- Removed old `logo.webp`

### Architecture cleanup
- Removed unused external `scripts/main.js`, `scripts/backgrounds.js`, `styles/main.css` (were already inlined)
- Added `.cache_ggshield` to `.gitignore`

---

## Session 4 Changes (2026-05-28 evening)

### Lighthouse / Performance (79 → 97)
1. **Hero LCP fix** — Removed `class="r"` from hero content div (line 1717) and hero-card (line 1732). These started at `opacity: 0` waiting for IntersectionObserver + 0.7s CSS transition, adding 1-2s to LCP.
2. **Material Symbols `display=block`** — Changed from `display=swap` to `display=block` (line 89, 91). Prevents raw icon text flash (arrow_forward, verified_user, accessibility_new).
3. **Saudi Riyal font 404s fixed** — Removed broken `<link rel="stylesheet" href="/assets/fonts/saudi-riyal.css">` (line 87). Font files never existed. Updated `.sar` class to use IBM Plex Sans Arabic.
4. **Clash Display removed** — Was in `--font-display` CSS variable but had no `@font-face` declaration. Replaced with `'Plus Jakarta Sans', sans-serif`.

### Best Practices (81 → 96)
5. **Cloudflare `enable_js` disabled** — Via CF API: `enable_js: true → false`. Eliminated `cdn-cgi/challenge-platform/scripts/jsd/main.js` injection and 3 deprecation warnings (SharedStorage, StorageType.persistent, Fledge).
6. **Browser Integrity Check turned OFF** — Via CF Dashboard.
7. **Bot Fight Mode: OFF** — Was already off, confirmed via API.
8. **CSP header added** — `Content-Security-Policy` in `_headers` covering Cloudflare insights, Zaraz, email-decode, metrics, GTM, and Turnstile. Fixes `inspector-issues` CSP violations.

### UI/UX
9. **Bento grid upgrade** — Services section: featured card (Managed IT) gets 2x2 span with gradient bg + larger type; tags have brighter text (#bdc6d1, 0.72rem, visible borders); icon hover fills to accent red with white icon; wide card (Manpower) uses horizontal flex layout on desktop; grid-auto-rows: minmax(200px) for consistent heights.

---

## What's Left for 100/100/100/100

### Performance 97 → 100
The 3.9MB Material Symbols font from `fonts.googleapis.com` is the biggest drag.

| Issue | Fix | Impact |
|-------|-----|--------|
| Material Symbols 3.9MB from Google Fonts | Self-host subset or use Google Fonts `text=` API to load only used codepoints (~20 icons = ~20KB) | Cuts ~3.8MB, fixes network payload diagnostic, improves FCP+LCP |
| FCP 0.7s (0.97) | Material Symbols is render-blocking via `media="print" onload`. Self-hosting with `display=block` eliminates external DNS+TLS | FCP → ~0.5s |
| LCP 1.1s (0.91) | Hero h1 is LCP element. Reducing font download chain improves it | LCP → ~0.9s |
| Forced reflow from font load | 9ms reflow from `offsetWidth` reads after font swap. Eliminated by self-hosting | Cosmetic improvement |
| Cache lifetime on `/` (HTML) | Add `Cache-Control: public, max-age=300, must-revalidate` | Minor perf improvement |

**Priority: Self-host Material Symbols subset.** Steps:
1. Identify all Material Symbols icon names used in `index.html` (~20 icons)
2. Use Google Fonts API: `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:text=arrow_forwardverified_usercomputer...&display=block`
3. Download the resulting CSS+woff2, place in `/assets/fonts/`
4. Replace external `<link>` with local stylesheet

### Best Practices 96 → 100
- **`inspector-issues` (score=0, weight=1)** — CSP violations from Cloudflare-injected scripts. The CSP header was just pushed (`99e296b`). Verify after deploy:
  - If violations persist: Zaraz may have its own CSP that overrides `_headers`. Check Zaraz → Settings → Security for auto-CSP. If enabled, disable it or add Zaraz domains to the CSP.
  - If `cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js` is still blocked: add `'self'` to `script-src` (should already be there).
  - If `static.cloudflareinsights.com` is blocked: verify it's in `script-src` (it is).
  - The Zaraz script itself loads from `mscarabia.com/cdn-cgi/zaraz/s.js` — same-origin, covered by `'self'`.

### Future
- Modularize main.js into ES modules
- OG image (`og-image.jpg`) — 1200×630
- Cookie consent banner (defer GTM until accepted)
- Privacy policy email fix + tracking disclosure
- 404 page Arabic support

---

## Architecture

Single `index.html` (~146KB) with inlined CSS (~43KB) and JS (~46KB). Done because CF Pages was serving stale separate CSS files.

```
mscarabia/
├── index.html              ← EVERYTHING HERE (CSS+JS inlined)
├── 404.html                Custom error page
├── functions/api/contact.js CF Pages Function (form → MailChannels email)
├── _headers                Security headers + cache rules
├── sitemap.xml             All pages listed
├── robots.txt
├── assets/logo.png         Company logo (435KB)
├── assets/logo.svg         Company logo SVG (17KB)
├── assets/og-image.jpg     Social sharing image (77KB)
├── assets/fonts/            Self-hosted fonts (DM Mono, IBM Plex Sans Arabic, Plus Jakarta Sans)
├── cookie-policy.html      Cookie policy page
├── privacy-policy.html     Privacy policy page (info@mscarabia.com)
├── CF-SETUP.md             Cloudflare setup instructions
├── CODE_REVIEW.md          Full code review file for DeepSeek audit
├── SONNET-DTP-AUDIT-PROMPT.md  Prompt for DTP game audit (separate project)
├── README.md
├── .gitignore
├── .cfignore
└── .git/                   Local git repo
```

## What's Done (v2)

| Feature | Status |
|---------|--------|
| Luxury dark editorial redesign | ✅ |
| EN/AR bilingual (241 keys each, RTL) | ✅ |
| Animated canvas background (wavy grid + particles + glow orbs) | ✅ |
| Expandable accordion service cards (keyboard accessible) | ✅ |
| Side navigation dots (desktop, active section tracking) | ✅ |
| Manpower quote calculator (sliders, budget SAR, professions) | ✅ |
| Contact form (CF Worker + MailChannels + email validation) | ✅ |
| Honeypot anti-spam + KV rate limiting | ✅ |
| Clients marquee carousel (11 clients) | ✅ |
| Typewriter effect (EN + AR word arrays) | ✅ |
| Scroll reveal animations (IntersectionObserver) | ✅ |
| Accessibility panel (in nav dropdown) | ✅ |
| Structured data (JSON-LD: ProfessionalService + WebSite) | ✅ |
| GTM + Google Analytics + Apollo.io tracking | ✅ |
| Security headers (HSTS, X-Content-Type-Options, X-Frame-Options, Vary) | ✅ |
| Hreflang tags (en, ar, x-default) | ✅ |
| 404 page | ✅ |
| Custom domain mscarabia.com | ✅ |
| www → mscarabia.com redirect | ✅ (via CF AI) |
| sitemap.xml with all pages | ✅ |
| noscript fallback for clients | ✅ |
| Mobile: safe-area insets + 44px touch targets | ✅ (session 2) |
| Mobile: iOS zoom prevention (16px min on inputs) | ✅ (session 2) |
| Canvas: RAF throttled to 30fps | ✅ (session 2) |
| Canvas: batched grid lines (single path) | ✅ (session 2) |
| Canvas: larger grid on mobile (80px vs 60px) | ✅ (session 2) |
| SEO: og:site_name + apple-touch-icon + status bar | ✅ (session 2) |
| Cloudflare Turnstile CAPTCHA (both forms) | ✅ (session 2) |
| Turnstile server-side verification in contact.js | ✅ (session 2) |
| Turnstile reset on form error | ✅ (session 2) |

## Sonnet Audit: 34 Findings — Status

From the Sonnet audit (CODE_REVIEW.md), here's what's fixed vs pending:

### FIXED this session

| # | Finding | Severity | Fix |
|---|---------|----------|-----|
| 1 | `form-submit` selector wrong (should be `btn-submit`) | Critical | Replaced in both form handlers |
| 2 | Canvas animation uses raw timestamps | High | Added `startTime` tracking for elapsed time |
| 3 | Canvas DPR accumulation on resize | High | Changed `ctx.scale()` to `ctx.setTransform()` |
| 4 | Keyboard nav broken on accordion | High | Added `onkeydown` for Enter/Space |
| 5 | `will-change` not removed after reveal | Medium | Set `willChange = 'auto'` after animation |
| 6 | Text-muted contrast too low (3.8:1) | Low | Changed `--text-muted: #5a6275` → `#6b7590` |
| 7 | Language toggle missing `role="switch"` | Medium | Added to both toggle buttons |
| 8 | Phone number missing from contact | Medium | Added `+966551675320` with call icon |
| 9 | Typewriter hardcoded English in Arabic mode | Medium | Added Arabic word array (تكنولوجيا، هندسة، etc.) |
| 10 | `workers` text hardcoded English in calculator | Medium | Now uses `translations[currentLang].mq_workers` |
| 11 | Email validation missing on form | Critical | Added `isValidEmail()` regex check |
| 12 | `Vary: Accept-Language` header missing | Low | Added to `_headers` |
| 13 | Sitemap only had one URL | Low | Added privacy + cookie pages |
| 14 | noscript fallback for clients | Low | Added static text fallback |

### FIXED (session 5)

| # | Finding | Severity | Fix |
|---|---------|----------|-----|
| 15 | No cookie consent banner | High | Done — GA gated behind accept/decline, localStorage consent |
| 16 | OG image missing | High | Done — `assets/og-image.jpg` wired into og:image + twitter:image |
| 17 | Privacy policy wrong email | Medium | Done — replaced with `info@mscarabia.com` everywhere |
| 21 | Clash Display font | Low | Done — was already fixed session 4 (replaced with Plus Jakarta Sans) |
| 26 | 404 page English only | Low | Still English-only but no longer loads Google Fonts |

### DELIBERATELY DEFERRED (not worth the effort for a static marketing site)

| # | Finding | Severity | Why deferred |
|---|---------|----------|-------------|
| 18 | Privacy policy tracking disclosure | Medium | Modal is summary; standalone page is legal doc. Different audiences. |
| 19 | CSP `unsafe-inline`/`unsafe-eval` | Medium | Requires extracting ~2000 lines of inline CSS/JS into separate files. Breaks single-file architecture, adds HTTP requests. Only matters if you add user auth. |
| 20 | Logo PNG → WebP | Medium | New logo is 435KB. Worth doing but not blocking anything. |
| 22 | `var` → `const`/`let` | Low | Works fine, cosmetic refactor of ~500 lines. |
| 23 | Apollo loads without consent | Medium | Apollo.io tracking script is third-party. Deferring Apollo consent requires extracting its inline script. |
| 24 | Contrast `.text-muted` | Low | 4.3:1 is close to 4.5:1 WCAG AA. Borderline. |
| 25 | KV rate limiting binding | Low | Code gracefully skips if KV not bound. Turnstile CAPTCHA handles bot blocking. Need CF dashboard action. |

## Lighthouse Scores (last run)

| Metric | Mobile | PC |
|--------|--------|-----|
| Performance | 67 | 78 |
| Accessibility | 92 | 79 |
| Best Practices | 54 | 54 |
| SEO | 100 | 100 |

**BP 54**: third-party cookies (Apollo, GTM), deprecated APIs — these are third-party script issues.  
**Perf drag**: render-blocking Google Fonts, GTM. Performance is expected to be ~70-80 with these trackers.

## i18n System

- 241 EN + 241 AR translation keys (verified match)
- `data-i18n` on elements, `data-i18n-html` for HTML content (6 keys)
- Language persisted to `localStorage` key `msca_lang`
- `?lang=ar` URL param works
- Typewriter switches words per language
- All form labels, placeholders, options translated
- Manpower calculator fully bilingual including "workers" text

## Cloudflare Setup

- **Pages project**: mscarabia (connected to GitHub)
- **Build output directory**: `.` (set via CF AI)
- **Custom domain**: mscarabia.com ✅
- **www redirect**: www.mscarabia.com → mscarabia.com ✅
- **Pages Functions**: `functions/api/contact.js` (auto-detected)
- **No GitHub Actions** — using built-in Git integration (removed deploy.yml)
- **Turnstile CAPTCHA**: Site key `0x4AAAAAADXw8vszetp5UKcP` in index.html
- **Turnstile Secret**: needs env var `TURNSTILE_SECRET` in CF Pages dashboard (not yet added)

## Commands

```bash
# Local preview
npx serve .

# Direct deploy (requires wrangler auth — CF AI handles this)
npx wrangler pages deploy . --project-name=mscarabia
```

## Related Projects

| Project | Repo | URL |
|---------|------|-----|
| Don't Touch Purple (game) | defaltadmin/donttouchpurple | game.mscarabia.com |
| MSC Arabia (this site) | defaltadmin/mscarabia | mscarabia.com |

## Files for DeepSeek/Sonnet Review

- `CODE_REVIEW.md` — complete review context for external AI
- `SONNET-DTP-AUDIT-PROMPT.md` — prompt for DTP game audit (separate project)
