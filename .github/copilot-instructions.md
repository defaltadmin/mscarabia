# MSC Arabia — Copilot Instructions

## Project Identity
- **Site**: MSC Arabia — IT services corporate website (Riyadh, Saudi Arabia)
- **Stack**: Vanilla HTML5/CSS3/JS (no frameworks), Cloudflare Pages + Functions
- **Backend**: Cloudflare Pages Function (`functions/api/contact.js`) — Resend API for email
- **Live**: https://mscarabia.com
- **Repo**: https://github.com/defaltadmin/mscarabia
- **Hosting**: Cloudflare Pages (auto-deploy on push to `main`)

## Architecture
Single `index.html` (~3600 lines) with all CSS (~1800 lines) and JS (~800 lines) inlined. This is intentional — zero HTTP requests for critical path, single-file deployment simplicity.

```
MSCArabia.com/
├── index.html              ← EVERYTHING (CSS + JS inlined)
├── functions/api/contact.js ← Cloudflare Pages Function
├── _headers                ← CSP, HSTS, security headers
├── 404.html                ← Custom error page
├── privacy-policy.html     ← Privacy page
├── cookie-policy.html      ← Cookie page
├── sitemap.xml             ← SEO
├── robots.txt              ← Crawler rules
├── assets/
│   ├── logo.png            ← Company logo (raster)
│   ├── logo.svg            ← Company logo (SVG)
│   ├── og-image.jpg        ← Open Graph image
│   └── fonts/              ← Self-hosted fonts
└── HANDOFF.md              ← Project handoff
```

## Key Conventions
1. **Single-file architecture** — all CSS/JS in `index.html`. No build step, no frameworks.
2. **Bilingual EN/AR** — 241 translation keys per language, `data-i18n` attributes, RTL via `dir="rtl"` on `<html>`. Language persisted to `localStorage` key `msca_lang`.
3. **Dark cyberpunk theme** — CSS custom properties: `--accent: #a855f7`, `--bg: #0a0a0f`, `--text: #e2e8f0`, `--border: #1e293b`
4. **CSS vars only** — no hardcoded hex colors. Use `--green`, `--orange`, `--error`, `--text-primary`, `--text-secondary`, `--text-tertiary`, `--bg`, `--accent`, `--border`, etc.
5. **U+20C1 (Saudi Riyal)** — Unicode 17.0 symbol, always paired with `<span class="sar-fallback">SAR</span>` for unsupported browsers
6. **Contact form** — Cloudflare Pages Function + Resend API + Turnstile CAPTCHA + honeypot. Server-side validation in `functions/api/contact.js`.
7. **Cookie consent** — GA gated behind accept/decline banner, consent stored in `localStorage`.
8. **High contrast mode** — `.contrast` class on `<html>`, covers all elements.
9. **prefers-reduced-motion** — all animations respect this.

## Design System
- **Colors**: `--accent: #a855f7` (purple), `--green: var(--accent)` (success), `--orange: #ff8c42` (warning), `--error: #ef4444` (danger)
- **Typography**: Plus Jakarta Sans (display), IBM Plex Sans Arabic (body), DM Mono (mono)
- **Animations**: GSAP scroll reveals, CSS transitions on hover, canvas 2D hero background at 30fps
- **Responsive**: Mobile-first, breakpoints at 640px, 768px, 1024px

## Important
- This is a SEPARATE repo from the game (`defaltadmin/donttouchpurple`). Commits here go to `defaltadmin/mscarabia`.
- The parent directory `deploy-ready/` is the game repo. Do NOT mix them.
- No build step — edit `index.html` directly. Preview with `npx serve .`.
- Cloudflare Pages auto-deploys on push to `main` via Git integration.
