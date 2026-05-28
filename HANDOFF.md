# MSC Arabia Website — Handoff Document

**Last updated**: 2026-05-28  
**Live**: https://mscarabia.com  
**Repo**: https://github.com/defaltadmin/mscarabia (branch: `main`)  
**Hosting**: Cloudflare Pages (auto-deploy via Git integration)

---

## IMMEDIATE: Push + Verify

Git auth expired. First action in new session:
```bash
cd "C:\Users\user\My Drive\Documents\MSC\Development\MSCArabia.com"
git push origin main
```
Then verify:
```bash
curl -s https://mscarabia.com/ | head -3  # Should show <!DOCTYPE html>
curl -s https://mscarabia.com/ | grep -c "svc-head"  # Should be >0
curl -s https://mscarabia.com/ | grep -c "<style>"   # Should be 1 (inlined)
```

**If CSS is stale** (v1 still showing), tell the CF AI:
> "Purge the Cloudflare cache for mscarabia.com and retry the latest deployment."

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
├── assets/logo.png         Company logo (155KB, needs WebP)
├── cookie-policy.html      Original policy page
├── privacy-policy.html     Original policy page
├── styles/main.css         External CSS (REFERENCE ONLY — inlined in index.html)
├── scripts/main.js         External JS (REFERENCE ONLY — inlined in index.html)
├── scripts/backgrounds.js  External canvas bg (REFERENCE ONLY)
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

### STILL PENDING (prioritized)

| # | Finding | Severity | What to do |
|---|---------|----------|------------|
| 15 | No cookie consent banner | High | Add simple consent gate — defer GTM/Apollo until accepted |
| 16 | OG image missing (`og-image.jpg`) | High | Create 1200×630 image, add to `/assets/` |
| 17 | Privacy policy wrong email | Medium | Change `info.mscarabia@gmail.com` → `info@mscarabia.com` in `privacy-policy.html` |
| 18 | Privacy policy doesn't disclose tracking | Medium | Add GTM/GA4/Apollo disclosure |
| 19 | No CSP header | Medium | Would need to allow inline scripts + GTM + Apollo + Google Fonts |
| 20 | Logo 155KB PNG (should be WebP) | Medium | Convert to WebP ~15KB, use `<picture>` fallback |
| 21 | Clash Display font never loaded | Low | Either load from fonts.bunny.net or remove from `--font-display` |
| 22 | `var` used throughout JS | Low | Convert to `const`/`let` |
| 23 | Apollo loads without consent | Medium | GDPR/PDPL concern — defer until cookie accepted |
| 24 | Contrast on `.text-muted` partially fixed | Low | `#6b7590` on `#06070b` is ~4.3:1 — still slightly below 4.5:1 |
| 25 | KV rate limiting may not be bound | Low | Document KV binding in CF-SETUP.md or fail-closed |
| 26 | 404 page English only | Low | Add basic Arabic support |

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
