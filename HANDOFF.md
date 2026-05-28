# MSC Arabia Website — Handoff Document

## What This Is

Corporate website for MSC Arabia (mscarabia.com) — an IT services company in Riyadh, Saudi Arabia. Redesigned and migrated from Infinity Free to Cloudflare Pages.

## Current State (2026-05-28)

**Status**: Live at https://mscarabia.com — v2 design deployed, inlined CSS/JS

**Repo**: https://github.com/defaltadmin/mscarabia
**Branch**: `main`
**Hosting**: Cloudflare Pages (auto-deploy via Git integration on push to main)

## Architecture

Single `index.html` (~136KB) with inlined CSS (~43KB) and JS (~46KB + 3.5KB canvas background). This was done because CF Pages was serving stale separate CSS files.

### Files

```
mscarabia/
├── index.html              # Main page (CSS+JS inlined)
├── 404.html                # Custom error page
├── functions/api/contact.js # CF Pages Function (form handler via MailChannels)
├── _headers                # Security headers + cache rules
├── sitemap.xml             # Includes all pages
├── robots.txt
├── assets/logo.png         # Company logo (155KB, needs WebP optimization)
├── cookie-policy.html
├── privacy-policy.html
├── styles/main.css         # External CSS (reference, not currently used — inlined in index.html)
├── scripts/main.js         # External JS (reference, not currently used — inlined in index.html)
├── scripts/backgrounds.js  # External canvas bg (reference)
├── CF-SETUP.md             # Cloudflare setup instructions
├── CODE_REVIEW.md          # Full code review for DeepSeek
├── SONNET-DTP-AUDIT-PROMPT.md # Prompt for DTP game audit
└── README.md
```

## What's Done

| Feature | Status |
|---------|--------|
| Full redesign (luxury dark editorial) | ✅ |
| EN/AR bilingual (241 keys each, RTL) | ✅ |
| 8 sections: Hero, Clients, Services (accordion), Engineering, Manpower, Projects, About, Contact | ✅ |
| Animated canvas background (mesh gradient + particles + grid) | ✅ |
| Expandable accordion service cards with keyboard a11y | ✅ |
| Side navigation dots (desktop) | ✅ |
| Manpower quote calculator (sliders, budget, professions) | ✅ |
| Contact form (CF Worker + MailChannels) | ✅ |
| Email validation on form submission | ✅ |
| Honeypot anti-spam + basic KV rate limiting | ✅ |
| Privacy/cookie policy modals | ✅ |
| Clients marquee carousel | ✅ |
| Scroll reveal animations | ✅ |
| Accessibility panel (in nav bar) | ✅ |
| Structured data (JSON-LD: ProfessionalService + WebSite + SiteNavigation) | ✅ |
| GTM + Google Analytics + Apollo.io tracking | ✅ |
| Security headers (HSTS, X-Content-Type-Options, X-Frame-Options, Vary) | ✅ |
| Hreflang tags (en, ar, x-default) | ✅ |
| 404 page | ✅ |
| Custom domain mscarabia.com | ✅ |
| www.mscarabia.com → mscarabia.com redirect | ✅ (via CF AI) |

## Pending / Next Phases

### Phase 1: Legal & Compliance (HIGH priority)
- [ ] Create OG image (1200×630) for social sharing
- [ ] Update privacy policy — disclose GTM/GA/Apollo tracking
- [ ] Fix privacy policy email (info.mscarabia@gmail.com → info@mscarabia.com)
- [ ] Add cookie consent banner (defer GTM/Apollo until accepted)
- [ ] Add CSP header (needs to allow inline scripts + third-party trackers)

### Phase 2: Performance (MEDIUM priority)
- [ ] Optimize logo.png → WebP (~15KB vs 155KB)
- [ ] Remove Clash Display font reference (never loaded)
- [ ] Self-host Google Fonts for faster KSA loading
- [ ] Add font-display: optional for Material Symbols
- [ ] Fix will-change cleanup on mobile (IntersectionObserver callback)

### Phase 3: Code Quality (LOW priority)
- [ ] Convert var → const/let throughout JS
- [ ] Remove external CSS/JS files (or reference them instead of inlining)
- [ ] Add source maps for debugging
- [ ] Fix privacy policy to be bilingual

### Phase 4: DTP Game Audit
- [ ] Run Sonnet audit on donttouchpurple repo using SONNET-DTP-AUDIT-PROMPT.md
- [ ] Send CODE_REVIEW.md to DeepSeek for MSC Arabia site review

## Lighthouse Scores (2026-05-28)

| Metric | Mobile | PC |
|--------|--------|-----|
| Performance | 67 | 78 |
| Accessibility | 92 | 79 |
| Best Practices | 54 | 54 |
| SEO | 100 | 100 |

**Key issues**: BP 54 due to third-party cookies (Apollo, GTM), deprecated APIs. Perf drag from render-blocking fonts and GTM.

## i18n System

- 241 EN + 241 AR translation keys (verified match)
- `data-i18n` on elements, `data-i18n-html` for HTML content
- Typewriter switches words per language
- All form labels, placeholders, options translated
- Manpower calculator fully bilingual
- `localStorage` key `msca_lang` persists choice
- `?lang=ar` URL param works

## Cloudflare Setup

- **Pages project**: mscarabia (connected to GitHub repo)
- **Build output directory**: `.` (set via CF AI)
- **Custom domain**: mscarabia.com ✅
- **www redirect**: www.mscarabia.com → mscarabia.com ✅
- **Pages Functions**: `functions/api/contact.js` (auto-detected)
- **No GitHub Actions** — using built-in Git integration

## Security Checklist

- [x] X-Content-Type-Options: nosniff
- [x] X-Frame-Options: SAMEORIGIN
- [x] Strict-Transport-Security (HSTS)
- [x] Vary: Accept-Language
- [x] Input sanitization on form fields
- [x] Email validation on form submission
- [x] Honeypot anti-spam
- [x] Rate limiting via KV (when bound)
- [ ] CSP header (pending — would break inline scripts)
- [ ] Cookie consent banner (pending)
- [ ] SRI hashes on third-party scripts (pending)

## Commands

```bash
# Local preview
npx serve .

# Direct deploy (requires wrangler auth)
npx wrangler pages deploy . --project-name=mscarabia
```
