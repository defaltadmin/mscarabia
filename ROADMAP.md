# MSC Arabia Website — Roadmap

**Last updated**: 2026-05-29 (session 6)
**Status**: Active development

---

## Phase 1: Critical Bug Fixes

These are broken features that throw errors or display wrong content.

### 1.1 ~~Define missing JS functions~~ DONE
- [x] ~~Define `underlines()` function~~ — toggle underline links a11y mode with persistence
- [x] ~~Define `letterSpacing(delta)` function~~ — adjust letter spacing a11y mode with persistence
- [x] ~~`adjustTextSize()` bounded~~ — min 12px, max 24px, persisted to localStorage
- [x] ~~High contrast persisted~~ — saves/restores from localStorage
- **Note**: `loadGA()`/`denyGA()` were already defined in head script — audit was wrong

### 1.2 Restore Saudi Riyal font files
- [ ] Create `assets/fonts/regular/` and `assets/fonts/bold/` directories
- [ ] Add saudi_riyal.woff2, .woff, .ttf for both weights
- **Impact**: Saudi Riyal currency symbol (﷼) does not render on live site

### 1.3 Create GitHub Actions deploy workflow
- [ ] Create `.github/workflows/deploy.yml` with `wrangler pages deploy`
- **Impact**: Auto-deploy on push to main does not work

### 1.4 ~~Remove dead AI chatbot~~ DONE (already cleaned up)
- [x] `.ai-text` CSS and HTML already removed

### 1.5 Fix privacy policy phone number
- [ ] Replace "+966 11 XXX XXXX" with real phone or remove
- **Impact**: Looks unprofessional on live site

### 1.6 Fix `logo.png` size (425KB)
- [ ] Optimize or replace with SVG/WebP favicon (<50KB)
- **Impact**: Loaded on every page, slows initial render

---

## Phase 2: i18n & Legal Compliance

### 2.1 ~~Cookie banner i18n~~ DONE
- [x] ~~Move cookie banner text to translation keys~~ — `cookie_text`, `cookie_link`, `cookie_decline`, `cookie_accept`
- [x] ~~Add Arabic translation for consent text~~
- [x] Cookie banner links to inline modal instead of `/cookie-policy.html` (which returned 404)

### 2.2 ~~Fix svc2_desc / svc6_desc i18n mismatches~~ DONE
- [x] ~~Remove hardcoded "Licensed for Apple, Microsoft, and Android ecosystems." from svc2_desc HTML~~
- [x] ~~Replace stale Arabic svc6_desc with correct "Support & Maintenance" text~~
- [x] ~~Fix svc6_item1/2/3 Arabic translations~~ (were describing cloud services)

### 2.3 ~~Service cards i18n~~ DONE
- [x] ~~Add `data-i18n` to all svc-card 2-6 feature list items~~
- [x] ~~Add `data-i18n` to all service card tag spans~~
- [x] ~~Add translation keys for all tags (svc2_tag1 through svc6_tag3)~~ in both EN and AR
- [x] ~~Add `data-i18n` to hero stat labels~~ (`stat_uptime`, `stat_years`, `stat_enterprises`)

### 2.4 Privacy policy updates
- [ ] Add GTM/GA disclosure (PDPL requirement)
- [ ] Add Saudi PDPL data subject rights
- [ ] Add data retention period
- [ ] Add specific cookie list with purposes
- **Impact**: Legal compliance risk

### 2.5 Cookie policy cleanup
- [ ] Remove CookieYes references
- [ ] Remove disabled "Consent Preferences" button
- [ ] Update to match custom consent banner
- **Impact**: Misleading policy content

### 2.6 Policy pages dark theme
- [ ] Update privacy-policy.html and cookie-policy.html to dark theme matching main site
- **Impact**: Jarring white flash when navigating from dark main site

### 2.7 Turnstile fail-closed
- [ ] Change contact.js to reject submissions when TURNSTILE_SECRET is not set
- **Impact**: Silent CAPTCHA bypass when env var missing

### 2.8 Fix Resend from address
- [ ] Replace `onboarding@resend.dev` with verified domain (e.g., `noreply@mscarabia.com`)
- **Impact**: Emails flagged as spam, "on behalf of resend.dev" shown to recipients

### 2.9 Remove unsafe-eval from CSP
- [ ] Audit for eval()/new Function() usage, remove `'unsafe-eval'` if none found
- **Impact**: CSP allows eval-based attacks unnecessarily

---

## Phase 3: Performance Optimization

### 3.1 Font loading
- [ ] Self-host Material Symbols (3.9MB from Google Fonts is biggest perf drag)
- [ ] Subset to only icons actually used (~50 of 1000+)
- [ ] Use `font-display: block` for Material Symbols
- **Impact**: LCP improvement, reduce external requests

### 3.2 ~~Dead CSS cleanup~~ DONE
- [x] ~~Remove `.svc-head`, `.svc-body-inner`, `.svc-name`, `.svc-icon`, `.svc-brief`, `.svc-feat` from mobile media query~~
- [x] ~~Remove dead `_headers` cache rules for `/styles/*`, `/scripts/*`~~
- [x] ~~Remove dead `initParticles()` function~~ (container never existed)
- [x] ~~Remove `.svc-name` from contrast selector~~

### 3.3 ~~Canvas / reduced-motion~~ DONE
- [x] ~~Add `prefers-reduced-motion` check~~ — CSS disables all animations + hides canvas
- [x] ~~Canvas pauses on `document.hidden`~~ (already existed)

### 3.4 DOM size
- [ ] Consider lazy-loading sections below the fold
- [ ] Evaluate if all 6 service cards need feature lists immediately
- **Impact**: Faster initial render

---

## Phase 4: UX Improvements

### 4.1 Service cards (DONE — session 6)
- [x] Feature checklists with green checkmarks
- [x] Stats row on hero card
- [x] Richer descriptions
- [x] CTA always visible

### 4.2 Mobile nav (DONE — session 6)
- [x] Full-screen overlay
- [x] Close button + backdrop + ESC key
- [x] Body scroll lock
- [x] 52px touch targets

### 4.3 High contrast mode (DONE — session 6)
- [x] Cover all elements (svc-card, footer, hero, modals)
- [x] Yellow-on-black for CTAs, inputs, icons
- [x] Image brightness boost
- [x] Side nav dots active state

### 4.4 A11y persistence (DONE — session 6)
- [x] Text size, contrast, underlines, letter spacing all persist to localStorage
- [x] Restored on page load

### 4.5 Manpower form reset fix (DONE — session 6)
- [x] After form submit, `update()` called to refresh display values

### 4.6 Modal focus trap
- [ ] Trap focus inside modal when open
- [ ] Return focus to trigger on close
- **Impact**: WCAG 2.2 AA compliance

### 4.7 404 page improvements
- [ ] Add Arabic version
- [ ] Replace emoji with SVG icon
- [ ] Add search or navigation links
- **Impact**: Better error recovery UX

---

## Phase 5: SEO & Marketing

### 5.1 Structured data
- [ ] Add LocalBusiness schema with all fields
- [ ] Add Service schema for each service
- **Impact**: Rich snippets in search results

### 5.2 Content
- [ ] Add blog/resources section
- [ ] Add case studies
- [ ] Add client testimonials
- **Impact**: SEO content, trust signals

### 5.3 Analytics
- [ ] Track form submissions as conversions
- [ ] Track service card clicks
- [ ] Track language toggle usage
- [ ] Track accessibility panel usage
- **Impact**: Data-driven decisions

---

## Phase 6: Infrastructure

### 6.1 GitHub Actions
- [ ] Add HTML validation check
- [ ] Add Lighthouse CI check
- [ ] Add link checker
- **Impact**: Automated quality gates

### 6.2 Monitoring
- [ ] Add uptime monitoring
- [ ] Add error tracking (Sentry or similar)
- [ ] Add form submission logging
- **Impact**: Proactive issue detection

### 6.3 CRM Integration (future)
- [ ] Connect form submissions to CRM
- [ ] Add lead scoring
- [ ] Add email follow-up automation
- **Impact**: Sales pipeline management

---

## Done This Session (2026-05-29)

| Change | Status |
|--------|--------|
| Mobile nav hamburger fix | DONE |
| High contrast mode expansion | DONE |
| Service cards redesign | DONE |
| DTP menu updated (8 AI tools) | DONE |
| Handoff separation (game vs website) | DONE |
| Folder structure decision | DONE |
| README rewrite | DONE |
| CODE_OF_CONDUCT.md | DONE |
| CONTRIBUTING.md | DONE |
| REVIEW-PACKET-DEEPSEEK.md | DONE |
| SONNET-REVIEW-PROMPT.md | DONE |
| ROADMAP.md | DONE |
| a11y: underlines() function defined | DONE |
| a11y: letterSpacing() function defined | DONE |
| a11y: adjustTextSize() bounded + persisted | DONE |
| a11y: contrast mode persisted | DONE |
| i18n: svc6 Arabic translation fixed | DONE |
| i18n: svc2_desc hardcoded English removed | DONE |
| i18n: svc2-6 feature items translated | DONE |
| i18n: service card tags translated | DONE |
| i18n: hero stat labels translated | DONE |
| i18n: cookie banner translated | DONE |
| i18n: cookie banner links to modal (not 404) | DONE |
| Dead code: initParticles() removed | DONE |
| Dead CSS: old svc selectors removed | DONE |
| Dead _headers: /styles/*, /scripts/* rules removed | DONE |
| prefers-reduced-motion: canvas + animations respect it | DONE |
| Manpower form: display values refresh after reset | DONE |
