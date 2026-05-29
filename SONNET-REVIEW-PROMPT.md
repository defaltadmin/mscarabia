# Sonnet Review Prompt — MSC Arabia Website

**Instructions**: This prompt is for Sonnet (Claude) which has git repo access.
The repo is at: `C:\Users\user\My Drive\Documents\MSC\Development\donttouchpurple\deploy-ready\MSCArabia.com\`
Remote: `https://github.com/defaltadmin/mscarabia` (branch: `main`)

---

## Paste This Prompt

```
You are auditing the MSC Arabia corporate website — a single-page static site for an IT services company in Riyadh, Saudi Arabia.

Live: https://mscarabia.com
GitHub: https://github.com/defaltadmin/mscarabia
Repo path: MSCArabia.com/ (inside the larger DTP deploy-ready folder)

## Architecture
- Single `index.html` (~3600 lines) with ALL CSS and JS inlined
- Cloudflare Pages Function at `functions/api/contact.js` (Resend API)
- Security headers in `_headers` (CSP, HSTS, etc.)
- Standalone pages: `404.html`, `privacy-policy.html`, `cookie-policy.html`
- i18n: 241 translation keys each for EN and AR, `data-i18n` attribute system
- Dark cyberpunk theme, canvas hero background, bento grid service cards
- Cookie consent banner gating Google Analytics

## Read These Files (in order)
1. `MSCArabia.com/index.html` — THE main file (read in chunks: lines 1-1700 for CSS, 1700-2250 for HTML, 2250-3529 for JS)
2. `MSCArabia.com/functions/api/contact.js` — form handler
3. `MSCArabia.com/_headers` — security headers + CSP
4. `MSCArabia.com/privacy-policy.html`
5. `MSCArabia.com/cookie-policy.html`
6. `MSCArabia.com/404.html`
7. `MSCArabia.com/HANDOFF.md` — current project state

## Known Bugs (found this session — NOT YET FIXED)

### Critical
1. `loadGA()` / `denyGA()` — Cookie consent calls these functions but they're NEVER DEFINED. Accept/Decline buttons throw ReferenceError.
2. `underlines()` / `letterSpacing()` — A11y panel buttons call these but they don't exist. Buttons throw ReferenceError.
3. `.ai-text` chatbot — CSS + HTML exists but NO JavaScript to open/close/handle it. Dead feature visible in DOM.
4. Saudi Riyal font files MISSING — `assets/fonts/saudi-riyal.css` references files in `fonts/regular/` and `fonts/bold/` that don't exist. Currency symbol won't render.
5. GitHub Actions deploy workflow MISSING — `.github/workflows/` is empty. No auto-deploy.

### High
6. AR `svc6_desc` — Arabic says "scalable cloud infrastructure" instead of "Support & Maintenance". Stale translation.
7. AR `svc6_item1/2/3` — Also describe cloud services, not support & maintenance.
8. `svc2_desc` — HTML has "Licensed for Apple, Microsoft, and Android ecosystems." appended but i18n doesn't. Hardcoded English leaks in Arabic mode.
9. Service cards 2-6 features NOT translated — `data-i18n` attributes missing on feature list items. Keys exist but are never applied.
10. Service card tags never translated — all tag spans are hardcoded English, no keys exist.
11. Cookie banner — Entirely hardcoded English, not i18n-aware.
12. Privacy policy — Phone number is "+966 11 XXX XXXX" (placeholder).
13. Turnstile CAPTCHA silently skipped when `TURNSTILE_SECRET` env var is missing.
14. Resend sandbox `from` address (`onboarding@resend.dev`) — emails show "on behalf of resend.dev".

### Medium
15. `logo.png` is 425KB — loaded as favicon on every page.
16. CSP has `unsafe-eval` — may not be needed.
17. Dead `_headers` cache rules for `/styles/*` and `/scripts/*` (all inlined now).
18. Dead CSS selectors (`.svc-item`, `.svc-name`, `.svc-head`, `.svc-body-inner`).
19. `initParticles()` dead code — references non-existent `#hero-particles` element.
20. Manpower form reset leaves stale UI display values after success.
21. `adjustTextSize()` unbounded — no min/max, no persistence.
22. High contrast mode not persisted — resets on reload.
23. Modal focus trap missing — keyboard users can tab behind overlay.
24. Mobile menu doesn't trap focus.
25. Canvas doesn't pause off-screen — wastes GPU when scrolled past.
26. `prefers-reduced-motion` not honored by canvas, typewriter, marquee, CSS animations.
27. Privacy policy doesn't disclose GTM/GA (PDPL/GDPR requirement).
28. Cookie policy still references CookieYes (removed).
29. Policy pages use light theme (jarring from dark main site).
30. Missing `</html>` closing tag.
31. Typewriter words always English regardless of language.
32. Service card stats labels ("Uptime SLA", "Years KSA", "Enterprises") not translated.

## Audit ALL of These Areas

### 1. Security
- CSP policy in `_headers` — is it restrictive enough? Any gaps?
- `contact.js` — input validation, Turnstile verification, rate limiting, CORS
- XSS vectors — `innerHTML` usage with translation data? `FormData` sanitization?
- API key exposure — any secrets in client-side code?
- Honeypot implementation — is it accessible? Does it work?

### 2. Accessibility (WCAG 2.2 AA)
- Keyboard navigation — can all interactive elements be reached and activated?
- Screen reader — are ARIA labels correct? Any missing?
- Focus management — does focus trap work in modals? Does mobile menu trap focus?
- Color contrast — check text against backgrounds, especially `--text-muted`
- Touch targets — 44px minimum on all interactive elements
- Skip navigation — does it work?
- Reduced motion — any animations that should respect `prefers-reduced-motion`?

### 3. i18n / RTL
- Any English text leaking through in Arabic mode?
- Any `data-i18n` keys missing from the translations object?
- Any translations in the object not used by any HTML element?
- RTL layout — are there elements that don't flip correctly?
- Arabic text — are translations natural and professional?

### 4. Mobile / Responsive
- Nav hamburger — works, has close mechanism, ESC key, backdrop
- Service cards — readable on 320px? Cards don't overflow?
- Contact form — usable on mobile? Input types correct?
- Manpower calculator — sliders work on touch?
- Modals — scrollable on small screens? Close button accessible?
- Safe area insets — notch devices handled?

### 5. Performance
- Render-blocking resources — fonts, Material Symbols
- DOM size — 3600-line HTML is large
- Canvas — GPU usage, FPS on low-end devices, `visibilitychange` pause
- IntersectionObserver — used efficiently?
- Font loading strategy — `display=block` vs `display=swap`
- Image optimization — logo format, OG image size

### 6. Legal / Compliance
- Privacy policy — accurate data collection disclosure?
- Cookie consent — does it actually gate ALL tracking? (GA is gated, but what about GTM, Cloudflare Zaraz?)
- Saudi PDPL — data subject rights listed? Grievance officer?
- GDPR — if EU users visit, is consent granular enough?
- Cookie policy — does it match actual cookies used?

### 7. Contact Form E2E
- Client-side validation — email regex, required fields, message length
- Honeypot — accessible label hidden correctly?
- Turnstile — loads correctly? Resets on error?
- Server-side — contact.js validates, sanitizes, sends via Resend
- Error handling — user sees meaningful errors?
- Success state — form replaced correctly? Translations work?

### 8. Service Cards UX
- Feature lists — clear, specific, informative?
- Stats row — compelling? Accurate?
- CTA buttons — always visible (not hover-only)?
- Tags — useful or decorative?
- Mobile — cards readable, no overflow?
- Visual hierarchy — is it clear what each service offers?

### 9. Dead Code / Cleanup
- Undefined JS functions (loadGA, denyGA, underlines, letterSpacing)
- Dead CSS selectors
- Dead HTML elements (`.ai-text` chatbot)
- Unused translation keys
- Dead cache rules in `_headers`

### 10. Canvas / Animation
- Hero canvas — renders correctly? DPR-aware?
- `visibilitychange` — pauses correctly?
- Scroll parallax — smooth? Performance impact?
- Particles — creates DOM elements, any cleanup?
- Resize handler — debounced correctly?

## Output Format

For EACH finding:
- **File:Line** — exact location
- **Severity** — Critical / High / Medium / Low
- **Category** — Security / A11y / Performance / UX / i18n / Legal / Dead Code / Bug
- **Issue** — what's wrong
- **Fix** — specific code change
- **Impact** — what this affects

Group by severity (Critical first). Summary count at top. Be brutal — find everything. Also provide a ROADMAP with prioritized phases for fixing everything.
```
