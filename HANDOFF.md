# MSC Arabia Website — Handoff Document

## What This Is

Corporate website for MSC Arabia (mscarabia.com) — an IT services company in Riyadh, Saudi Arabia. Redesigned and migrated from Infinity Free to Cloudflare Pages.

## Current State (2026-05-28)

**Status**: Deployed to GitHub, pending Cloudflare Pages setup + DNS switch

**Repo**: https://github.com/defaltadmin/mscarabia
**Branch**: `main`
**Hosting**: Cloudflare Pages (auto-deploy via GitHub Actions on push)

### What's Done

| Feature | Status |
|---------|--------|
| Full redesign (dark cyberpunk + 3D glassmorphism) | Done |
| EN/AR bilingual with RTL support | Done |
| All 200+ translation keys preserved | Done |
| 8 sections: Hero, Clients, Services, Engineering, Manpower, Projects, About, Contact | Done |
| Projects section with game.mscarabia.com showcase | Done |
| Side navigation dots (desktop) | Done |
| Manpower quote calculator (sliders, budget, professions) | Done |
| Contact form (Cloudflare Worker + MailChannels) | Done |
| Honeypot anti-spam | Done |
| Privacy/cookie policy modals | Done |
| Clients marquee carousel | Done |
| Scroll reveal animations | Done |
| Accessibility panel (text resize, high contrast) | Done |
| Structured data (JSON-LD ProfessionalService) | Done |
| GTM + Google Analytics (G-NGXKXV7EGM) | Done |
| Open Graph + Twitter cards | Done |
| Hreflang tags (en, ar, x-default) | Done |
| Security headers (_headers) | Done |
| Sitemap + robots.txt | Done |
| GitHub Actions auto-deploy | Done |

### What's Pending

| Task | Priority | Notes |
|------|----------|-------|
| Connect Cloudflare Pages to repo | High | Dashboard: Pages > Create > connect GitHub |
| Set custom domain (mscarabia.com) | High | Add in Pages > Custom domains |
| Create OG image (1200x630) | Medium | Generate or design for social sharing |
| Optimize logo to WebP | Low | 155KB PNG → ~30KB WebP |
| Remove old Infinity Free hosting | Medium | After CF Pages is confirmed working |
| Add Cloudflare Turnstile CAPTCHA | Low | Extra spam protection on forms |

## Project Structure

```
mscarabia/
├── index.html                  # Main page (redesigned)
├── styles/main.css             # All CSS (design system + components)
├── scripts/main.js             # All JS (i18n, interactions, forms)
├── functions/api/contact.js    # Cloudflare Pages Function (contact form)
├── assets/logo.png             # Company logo
├── .github/workflows/deploy.yml # Auto-deploy to CF Pages
├── _headers                    # CF Pages security + cache headers
├── sitemap.xml
├── robots.txt
├── cookie-policy.html
├── privacy-policy.html
└── .gitignore
```

## Key Technical Details

### i18n System
- `translations` object in `scripts/main.js` with `en` and `ar` keys (~200 keys each)
- `data-i18n` attributes on HTML elements, `data-i18n-html` for HTML content
- `data-i18n-placeholder` for input placeholders
- Language persisted to localStorage key `msca_lang`
- URL param `?lang=ar` also works
- `dir="rtl"` set on `<html>` when Arabic active

### Contact Form
- Both contact and manpower forms POST to `/api/contact`
- Cloudflare Pages Function (`functions/api/contact.js`)
- Sends email via MailChannels API (free for CF Workers)
- Honeypot field `website` for anti-spam
- Form type distinguished by `type` field (contact vs manpower)

### Design System
- CSS custom properties in `:root` for colors, spacing, shadows
- Dark palette: `#0a0c14` bg, `#e52020` primary accent
- 3D effects: `transform-style: preserve-3d`, `rotateX()`, layered shadows
- Glassmorphism: `backdrop-filter: blur(16px)`, translucent borders
- Scroll reveal: IntersectionObserver-based `.reveal` class

### Deployment
- Push to `main` branch triggers GitHub Actions
- Wrangler deploys entire directory to CF Pages project `mscarabia`
- Secrets needed: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

## Roadmap — Future Improvements

### Phase 1: Launch (immediate)
- [ ] Connect CF Pages to GitHub repo
- [ ] Set custom domain mscarabia.com
- [ ] Test contact form end-to-end
- [ ] Verify EN/AR toggle on live site
- [ ] Remove Infinity Free hosting

### Phase 2: Polish (1-2 weeks)
- [ ] Generate OG image (1200x630) for social sharing
- [ ] Compress logo.png to WebP (~30KB)
- [ ] Add Cloudflare Turnstile CAPTCHA to forms
- [ ] Lighthouse audit → fix any issues
- [ ] Test on real mobile devices

### Phase 3: Enhancement (1 month)
- [ ] Add loading animation / skeleton screen
- [ ] Parallax effects on hero section
- [ ] Animated counter for stats (IntersectionObserver)
- [ ] Case studies / testimonials section
- [ ] Blog section (if content available)
- [ ] Arabic font optimization (subset IBM Plex Sans Arabic)

### Phase 4: Growth (ongoing)
- [ ] SEO monitoring (Google Search Console)
- [ ] Analytics review (GA4 dashboards)
- [ ] A/B test hero CTA buttons
- [ ] Add more projects to portfolio section
- [ ] Consider Next.js migration if site grows

## Files Changed

| File | Action |
|------|--------|
| `index.html` | Created (redesigned from scratch) |
| `styles/main.css` | Created (extracted + upgraded from inline) |
| `scripts/main.js` | Created (extracted + upgraded from inline) |
| `functions/api/contact.js` | Created (replaces mailto: + PHP) |
| `.github/workflows/deploy.yml` | Created |
| `_headers` | Created |
| `sitemap.xml` | Created (updated date) |
| `robots.txt` | Created (updated for CF) |
| `.gitignore` | Created |
| `assets/logo.png` | Copied from original |
| `cookie-policy.html` | Kept (original) |
| `privacy-policy.html` | Kept (original) |

## Cloudflare Pages Setup Steps

1. Go to Cloudflare Dashboard > Pages
2. Click "Create a project" > "Connect to Git"
3. Select `defaltadmin/mscarabia` repo
4. Build settings: None (static site, no build step)
5. Deploy
6. Go to Custom domains > Add `mscarabia.com`
7. Cloudflare will auto-add DNS CNAME record
8. Test: https://mscarabia.com should load the new site

## Secrets Needed in GitHub

Add these to repo Settings > Secrets > Actions:
- `CLOUDFLARE_API_TOKEN` — Create at CF dashboard > API Tokens > Edit zone token
- `CLOUDFLARE_ACCOUNT_ID` — Found at CF dashboard > right sidebar
