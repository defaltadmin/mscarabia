# MSC Arabia — DeepSeek Review Packet

**Date**: 2026-05-29
**Live**: https://mscarabia.com
**GitHub**: https://github.com/defaltadmin/mscarabia
**Hosting**: Cloudflare Pages (auto-deploy on push to main)
**Email**: Cloudflare Pages Functions + Resend API

---

## What You're Reviewing

A single-page corporate website for an IT services company in Riyadh, Saudi Arabia.
All code is in one `index.html` (~3600 lines) with inlined CSS and JS.
Companion files: `functions/api/contact.js`, `_headers`, `404.html`, `privacy-policy.html`, `cookie-policy.html`, `sitemap.xml`, `robots.txt`.

**Tech**: Vanilla HTML/CSS/JS, no frameworks, no build tools, no npm.
**Languages**: English + Arabic (241 translation keys each, RTL support)

---

## File Map

```
MSCArabia.com/
├── index.html              ← THE FILE (all CSS/JS inlined)
├── functions/api/contact.js ← Cloudflare Pages Function (form handler, Resend API)
├── _headers                 ← Security headers + CSP + cache rules
├── 404.html                 ← Custom error page
├── privacy-policy.html      ← Standalone privacy page
├── cookie-policy.html       ← Standalone cookie page
├── sitemap.xml              ← SEO sitemap
├── robots.txt               ← Crawler rules
├── assets/
│   ├── logo.png             ← Company logo (PNG)
│   ├── logo.svg             ← Company logo (SVG)
│   ├── og-image.jpg         ← Open Graph image
│   └── fonts/               ← Self-hosted fonts
└── HANDOFF.md               ← Project handoff document
```

---

## Architecture

### CSS (~1800 lines in `<style>`)
- Design system via CSS custom properties (`--accent`, `--bg`, `--text`, `--border`, etc.)
- Dark cyberpunk/synthwave theme
- Responsive: mobile-first, breakpoints at 640px, 768px, 1024px
- High contrast mode (`.contrast` class on `<html>`)
- Accessibility panel: text resize, contrast toggle, underline links, letter spacing
- Service cards: bento grid layout with 6 cards (1 hero 2×2, 4 regular, 1 wide)
- Canvas hero background with morphing gradient orbs + floating shapes

### JavaScript (~1200 lines in `<script>`)
- IIFE-wrapped, no modules, no build
- i18n system: `data-i18n` attributes → `translations[lang].key`
- Mobile nav: hamburger toggle, full-screen overlay, ESC close, backdrop
- Contact form: POST to `/api/contact` via Cloudflare Pages Function
- Manpower quote form: sliders + checkboxes → cost estimate → POST to same endpoint
- Modals: privacy policy + cookie policy (in-page overlays)
- Scroll reveal: IntersectionObserver for `.r` class elements
- Canvas hero: morphing gradient orbs + floating geometric shapes + scroll parallax
- Cookie consent banner: show/hide based on localStorage `cookie_consent`
- TypeWriter effect for hero headline word cycling
- Stats counter animation for hero stats

### Contact API (`functions/api/contact.js`)
- Cloudflare Pages Function (ESM export)
- CORS: origin allowlist (`mscarabia.com`)
- Honeypot anti-spam
- Cloudflare Turnstile CAPTCHA verification
- Rate limiting via KV (optional binding)
- Input sanitization (strip newlines, 2000 char limit)
- Email via Resend API
- Two form types: contact + manpower quote

---

## Known Bugs (FOUND THIS SESSION — NOT YET FIXED)

### Critical

1. **`loadGA()` / `denyGA()` undefined** — Cookie consent banner calls `loadGA()` on accept and `denyGA()` on decline, but NEITHER FUNCTION IS DEFINED anywhere in the JS. Will throw `ReferenceError: loadGA is not defined` when user clicks Accept. Google Analytics never actually loads or gets blocked.
   - Location: `index.html:~3518-3523`

2. **`underlines()` and `letterSpacing()` undefined** — Accessibility panel has buttons calling `underlines()` and `letterSpacing(delta)` but these functions don't exist. Buttons will throw ReferenceError on click.
   - Location: HTML at `index.html:~1770-1780`, no corresponding JS functions

3. **AI chatbot panel dead feature** — `.ai-text` CSS class exists (lines ~1200-1280), HTML panel exists (line ~1838-1848), but NO JavaScript opens it, closes it, or handles messages. Dead UI element visible in DOM.

### Critical (Companion Files)

4. **Saudi Riyal font files MISSING** — `assets/fonts/saudi-riyal.css` references 6 font files in `fonts/regular/` and `fonts/bold/` subdirectories (saudi_riyal.woff2, .woff, .ttf) but **no such subdirectories or files exist**. The Saudi Riyal currency symbol (﷼) will NOT render on the live site.
   - Location: `assets/fonts/saudi-riyal.css` → references files in `assets/fonts/regular/` and `assets/fonts/bold/`

5. **GitHub Actions deploy workflow MISSING** — `.github/workflows/` is empty. CF-SETUP.md references `deploy.yml` using `wrangler pages deploy` but the file doesn't exist. Auto-deploy on push to main will NOT work.
   - Location: `.github/workflows/` (empty directory)

### High

6. **`svc2_desc` HTML/i18n mismatch** — The HTML for MDM Licensing card has "Licensed for Apple, Microsoft, and Android ecosystems." appended to the brief, but the i18n translation only has "secure, deploy, and manage all your fleet devices from a single console." The extra sentence is hardcoded English and won't switch to Arabic.
   - Location: `index.html:~1941` vs `index.html:~2305`

7. **Cookie banner hardcoded English only** — The entire cookie consent banner text is hardcoded in English, not i18n. Arabic users see English consent text.
   - Location: `index.html:~3505-3512`

8. **Privacy policy placeholder phone** — Shows "+966 11 XXX XXXX" — obviously a placeholder, looks unprofessional on a live site.
   - Location: `privacy-policy.html:~34`

9. **Turnstile CAPTCHA silently skipped** — When `TURNSTILE_SECRET` env var is not set, the form accepts submissions without any CAPTCHA verification (line 51 of contact.js). Should fail-closed or warn.
   - Location: `functions/api/contact.js:~51`

10. **Resend sandbox `from` address** — Default sender is `onboarding@resend.dev` (Resend's testing address). Emails will show "on behalf of resend.dev" and may be flagged as spam. Must use verified domain.
    - Location: `functions/api/contact.js:~186`

11. **`logo.png` is 425KB** — Loaded as favicon on every page. Should be <50KB or use SVG/WebP.
    - Location: `assets/logo.png`

12. **CSP has `unsafe-eval`** — `_headers` CSP includes `'unsafe-eval'` in script-src. If no code uses `eval()`, this should be removed.
    - Location: `_headers:~8`

### Medium

13. **Dead `_headers` cache rules** — Cache rules for `/styles/*` and `/scripts/*` reference directories that DON'T EXIST. All CSS/JS is inlined in `index.html`. These rules are dead weight.
    - Location: `_headers:~10-17`

14. **Dead CSS selectors** — `.svc-item`, `.svc-name`, `.svc-head`, `.svc-body-inner` still in CSS but no longer used. Also `.toggleSvc` references.
    - Location: various in `<style>`

15. **Privacy policy doesn't disclose GTM/GA tracking** — Policy mentions "Marketing/Promotional" but doesn't specifically name Google Tag Manager, Google Analytics, or cookies used for analytics. Saudi PDPL and GDPR require specific disclosure.
    - Location: `privacy-policy.html:~69`

16. **Cookie policy references CookieYes widget** — Still has a disabled "Consent Preferences" button and mentions CookieYes. The site now uses a custom consent banner, not CookieYes.
    - Location: `cookie-policy.html:~54-55`

17. **404 page emoji rendering** — Uses `&#x1F6D1;` (🛑) emoji in a div, but no emoji font loaded. May render as □ on some systems.
    - Location: `404.html:~22`

18. **Policy pages light theme** — `privacy-policy.html` and `cookie-policy.html` use light theme (`background: #fafafa`) while main site is dark. Jarring visual transition.
    - Location: both standalone HTML files

19. **Origin check allows missing Origin** — `contact.js` passes origin check when Origin header is absent (`if (origin && origin !== ...)`). Non-browser clients bypass CORS.
    - Location: `functions/api/contact.js:~30`

20. **Empty duration field** — When permanent is unchecked and duration is empty, email reads "Contract Duration: months".
    - Location: `functions/api/contact.js:~93`

21. **Service cards 2-6 feature lists NOT translated** — Card 1 features use `data-i18n` correctly. Cards 2-6 feature items are raw text with no `data-i18n` attributes. Translation keys exist (`svc2_item1` through `svc6_item3`) but are never applied.
    - Location: `index.html:~1943-2005`

22. **Service card tags never translated** — All tag spans (e.g., `<span>Server Management</span>`) have no `data-i18n` and no translation keys. Always English.
    - Location: `index.html:~1932, 1947, 1962, 1977, 1992, 2007`

23. **svc6_item1/2/3 Arabic translations wrong** — Arabic feature items for Service 6 describe cloud services, not support & maintenance.
    - Location: `index.html:~2600-2602`

24. **initParticles() dead code** — References `getElementById('hero-particles')` but no such element exists. Function is a harmless no-op but dead code.
    - Location: `index.html:~3316`

25. **Missing `</html>` closing tag** — File ends with `</body>` but no `</html>`.
    - Location: `index.html:~3527`

26. **Manpower form reset leaves stale UI** — After success, `form.reset()` resets slider values but display numbers (`mq_employees_val`, etc.) retain old values.
    - Location: `index.html:~3259`

27. **adjustTextSize() unbounded** — No min/max limits, no persistence. Users can make text infinitely small or large.
    - Location: `index.html:~3281-3283`

28. **High contrast mode not persisted** — Toggles CSS class but doesn't save to localStorage. Resets on reload.
    - Location: `index.html:~3286-3288`

29. **Modal focus trap missing** — Keyboard users can tab through content behind modal overlay. Close button doesn't receive initial focus.
    - Location: `index.html:~3152-3179`

30. **Mobile menu doesn't trap focus** — Screen reader users can interact with content behind overlay.
    - Location: `index.html:~3080-3102`

31. **Canvas doesn't pause off-screen** — Animation runs continuously via RAF even when user scrolls past hero. Only pauses on `document.hidden`.
    - Location: `index.html:~3452-3501`

32. **prefers-reduced-motion not honored** — Canvas animation, typewriter, marquee, and CSS animations continue regardless of motion preference.
    - Location: `index.html:~151, ~3355-3502`

33. **Typewriter words always English** — Cycles through `['IT', 'Engineering', 'Security', 'Cloud', 'MDM']` regardless of language.
    - Location: `index.html:~2897`

### Low

13. **`var` used throughout JS** — All JS uses `var` instead of `const`/`let`. Not a bug but poor practice (hoisting, scoping issues).

14. **No `noscript` content** — Canvas hero, marquee, and all interactive features require JS. No fallback content.

15. **Cookie banner not styled in contrast mode properly** — `.cookie-banner` gets `background: #000` in contrast mode but the text inside isn't explicitly forced to white. Banner border also needs explicit styling.

---

## What to Focus On

1. **Security** — CSP policy, input validation in contact.js, Turnstile integration, CORS
2. **Accessibility** — WCAG 2.2 AA: keyboard nav, screen reader, contrast, touch targets
3. **i18n completeness** — Any English leaking through in Arabic mode, any missing keys
4. **Mobile UX** — Nav, touch targets, form usability, responsive layout
5. **Performance** — LCP, INP, render-blocking resources, DOM size
6. **Legal/Compliance** — Privacy policy accuracy, PDPL/GDPR consent, cookie disclosure
7. **Service cards** — Are they informative enough? Clear CTAs? Good visual hierarchy?
8. **Dead code** — Unused CSS, undefined JS functions, dead HTML elements
9. **Contact form** — End-to-end: validation, honeypot, Turnstile, Resend delivery, error handling
10. **Canvas performance** — GPU usage, FPS on mobile, visibility API pause

---

## Output Format

For EACH finding:
```
## Finding N: [Title]
- **File**: MSCArabia.com/index.html (or companion file)
- **Line**: ~NNN
- **Severity**: Critical / High / Medium / Low
- **Category**: Security / A11y / Performance / UX / i18n / Legal / Dead Code / Bug
- **Issue**: What's wrong
- **Fix**: Specific code change
- **Impact**: What this affects
```

Group by severity. Summary count at top. Be brutal.
