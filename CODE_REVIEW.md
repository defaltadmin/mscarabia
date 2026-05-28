# MSC Arabia — Full Code Review

## For DeepSeek / External AI Review

This is a complete single-page corporate website for MSC Arabia (Riyadh, Saudi Arabia).
All code is in `index.html` — CSS, JS, and HTML are inlined for deployment reliability.

**Live**: https://mscarabia.com
**Tech**: Static HTML/CSS/JS, Cloudflare Pages, Cloudflare Workers (contact form)
**Languages**: English + Arabic (241 translation keys each, RTL support)

---

## Architecture

- Single `index.html` (~136KB) with inlined CSS (~43KB) and JS (~46KB + 3.5KB canvas)
- Cloudflare Pages Function at `functions/api/contact.js` handles form submissions via MailChannels
- `404.html` for custom error page
- `_headers` for security headers and cache rules
- `sitemap.xml` and `robots.txt` for SEO

## Key Patterns

### i18n System
- `translations` object with `en` and `ar` keys (241 each)
- `data-i18n` attributes on HTML elements
- `data-i18n-html` for content with HTML (6 keys: compliance IDs, privacy/cookie modal lists)
- `data-i18n-placeholder` for input placeholders
- Language persisted to `localStorage` key `msca_lang`
- URL param `?lang=ar` also works
- `dir="rtl"` set on `<html>` when Arabic active

### Service Accordion
- 6 service cards with expandable details
- Only one open at a time (accordion behavior)
- Keyboard accessible (Enter/Space handlers)
- "Request Service" CTA links to contact form

### Canvas Background
- Animated mesh gradient with 4 colored blobs
- Grid overlay (subtle red lines)
- Pauses when tab is hidden (`visibilitychange`)
- Proper elapsed time tracking (not raw timestamps)
- DPR-aware with `setTransform` (no accumulation)

### Contact Form
- Two forms: contact and manpower quote
- POST to `/api/contact` via Cloudflare Pages Function
- Honeypot field for anti-spam
- Email validation (regex)
- Input sanitization (strip newlines, 2000 char limit)
- Rate limiting via KV (when bound)
- Sends email via MailChannels API

### Manpower Quote Calculator
- Range sliders for workers (1-1001), duration (1-25 months), budget (500-15000 SAR)
- Permanent checkbox toggles duration slider
- Profession checkboxes, nationality dropdown
- Live cost estimate
- All text properly translated

## Files to Review

### index.html (main file, ~136KB)
Review sections in order:
1. `<head>` — meta tags, structured data (JSON-LD), Open Graph, fonts, analytics
2. `<style>` — all CSS (design system, components, responsive, contrast mode)
3. `<body>` HTML — nav, hero, clients marquee, services accordion, engineering, manpower, about, projects, contact, footer, modals
4. `<script>` — i18n translations (EN+AR), all interactive JS, canvas background

### functions/api/contact.js
Cloudflare Pages Function for form submission.

### _headers
Security headers and cache rules for Cloudflare Pages.

### sitemap.xml, robots.txt, 404.html
Standard SEO and error handling files.

## Known Issues from Previous Audits

### Fixed
- Form submit button selector was wrong (`.form-submit` → `.btn-submit`)
- Canvas animation used raw timestamps (fixed to elapsed time)
- Canvas DPR accumulated on resize (fixed with `setTransform`)
- Keyboard navigation missing on service accordion (added)
- `will-change` not removed after animation (fixed)
- Text-muted contrast too low (#5a6275 → #6b7590)
- Language toggle missing `role="switch"`
- Phone number missing from contact section
- Email validation missing on form submission
- `Vary: Accept-Language` header missing
- Sitemap only had one URL (added sub-pages)
- `workers` text hardcoded in English in manpower calculator
- Typewriter only worked in English (added Arabic words)

### Not Yet Fixed
- No cookie consent banner (tracking loads without consent)
- OG image (`og-image.jpg`) doesn't exist — social shares show no image
- Privacy policy references `info.mscarabia@gmail.com` (should be `info@mscarabia.com`)
- Privacy policy doesn't disclose GTM/GA/Apollo tracking
- No CSP header (would break inline scripts + third-party trackers)
- Logo is 155KB PNG (should be WebP ~15KB)
- Clash Display font referenced but never loaded
- `var` used throughout JS (should be `const`/`let`)
- Apollo.io tracker loads without user consent (PDPL/GDPR concern)
- No `noscript` content for hero section (clients marquee empty without JS)
- Accessibility panel recently moved to nav — needs testing

## What to Focus On

1. **Security** — CSP, input validation, form handler
2. **Accessibility** — WCAG 2.2 AA compliance
3. **Performance** — LCP, INP on mobile
4. **Arabic mode** — any English text leaking through
5. **SEO** — structured data completeness
6. **Legal** — privacy policy accuracy, consent requirements
