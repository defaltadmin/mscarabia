# MSC Arabia Website — Roadmap

**Last updated**: 2026-05-29 (session 7 — Sonnet+DeepSeek review round)
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

### 1.2 ~~Cookie banner never shown~~ DONE
- [x] ~~Add show logic in DOMContentLoaded~~ — `if (!localStorage.getItem('cookie_consent')) banner.classList.add('show')`
- **Note**: Was broken when I removed duplicate cookie consent code; now fixed

### 1.3 ~~Saudi Riyal symbol~~ DONE (workaround)
- [x] ~~Replace broken `&#x20C1;` (Costa Rican Colón) with "SAR" text~~
- [x] ~~Remove dead `.sar` CSS class~~
- **Note**: No universally-supported SAR Unicode glyph exists. Text "SAR" is standard.

### 1.4 ~~Remove dead AI chatbot~~ DONE (already cleaned up)
- [x] `.ai-text` CSS and HTML already removed

### 1.5 ~~Fix privacy policy phone number~~ DONE
- [x] ~~Replace "+966 11 XXX XXXX" with +966 55 167 5320~~

### 1.6 ~~Fix `logo.png` size (425KB)~~ DONE
- [x] ~~Use SVG favicon (17KB) instead of PNG (425KB)~~
- [x] Apple-touch-icon still uses PNG (required — SVG not supported for apple-touch-icon)

### 1.7 ~~404 page improvements~~ DONE
- [x] ~~Dark theme matching main site~~
- [x] ~~SVG icon instead of emoji~~
- [x] ~~Gradient heading, hover effect, professional layout~~

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
- [x] ~~Add `data-i18n` to ALL svc-card 1-6 feature list items~~ (svc1 was missed first round, fixed)
- [x] ~~Add `data-i18n` to ALL service card tag spans~~ (svc1 tags added: svc1_tag1-4)
- [x] ~~Add translation keys for all tags (svc1_tag1 through svc6_tag3)~~ in both EN and AR

### 2.4 ~~Typewriter Arabic~~ DONE
- [x] ~~Add Arabic word map~~ — `['تقنية', 'هندسة', 'أمان', 'سحابة', 'إدارة']`
- [x] ~~Re-read `currentLang` each tick~~ — switches dynamically on language toggle

### 2.5 ~~Privacy policy updates~~ DONE
- [x] ~~Add GA4/GTM/Cloudflare disclosure~~ (PDPL requirement)
- [x] ~~Add specific cookie list with purposes~~

### 2.6 ~~Cookie policy cleanup~~ DONE
- [x] ~~Remove CookieYes references and disabled button~~
- [x] ~~Full rewrite with real cookie table~~ (cookie_consent, _ga, msca_*, lang)

### 2.7 ~~Policy pages dark theme~~ DONE
- [x] ~~Update privacy-policy.html and cookie-policy.html to dark theme~~
- [x] ~~Remove CookieYes attribution from privacy policy footer~~

### 2.8 ~~Turnstile fail-closed~~ DONE
- [x] ~~Reject submissions when TURNSTILE_SECRET is not set~~ (500 error)

### 2.9 ~~CORS fail-closed~~ DONE
- [x] ~~Reject requests when Origin header is missing~~ (was passing through)

### 2.10 ~~Remove unsafe-eval from CSP~~ DONE
- [x] ~~Removed `'unsafe-eval'` from `_headers` CSP~~

### 2.11 ~~Fix Resend from address~~ DONE
- [x] ~~Default changed from `onboarding@resend.dev` to `noreply@mscarabia.com`~~
- [x] ~~Requires Resend domain verification for mscarabia.com to actually work~~

---

## Phase 3: Performance Optimization

### 3.1 Material Symbols font
- [x] ~~Already deferred with media="print" onload pattern~~
- [x] ~~noscript fallback present~~
- [ ] Self-host + subset to ~20 icons used (future optimization — 3.9MB is large but non-blocking)

### 3.2 ~~Dead CSS cleanup~~ DONE
- [x] ~~Remove `.svc-head`, `.svc-body-inner`, `.svc-name`, `.svc-icon`, `.svc-brief`, `.svc-feat`~~
- [x] ~~Remove dead `_headers` cache rules for `/styles/*`, `/scripts/*`~~
- [x] ~~Remove dead `initParticles()` function~~
- [x] ~~Remove `.svc-card-hero`, `.svc-card-wide` CSS and HTML~~
- [x] ~~Remove `.svc-card-stats`, `.svc-stat` CSS~~
- [x] ~~Remove `.sar` CSS class~~

### 3.3 ~~Canvas / reduced-motion~~ DONE
- [x] ~~CSS disables all animations + hides canvas under prefers-reduced-motion~~
- [x] ~~Canvas JS skips RAF setup under prefers-reduced-motion~~ (was still running)

### 3.4 DOM size
- [ ] Consider lazy-loading sections below the fold
- **Impact**: Faster initial render

---

## Phase 4: UX Improvements

### 4.1 Service cards DONE
- [x] Feature checklists with green checkmarks
- [x] Richer descriptions
- [x] CTA always visible
- [x] All 6 cards uniform size, shape, and spacing

### 4.2 Mobile nav DONE
- [x] Full-screen overlay with close button + backdrop + ESC key
- [x] Body scroll lock, 52px touch targets
- [x] Focus trap: aria-hidden main/footer, focus close button on open

### 4.3 High contrast mode DONE
- [x] Cover all elements (svc-card, footer, hero, modals)
- [x] Yellow-on-black for CTAs, inputs, icons

### 4.4 A11y persistence DONE
- [x] Text size, contrast, underlines, letter spacing all persist to localStorage
- [x] Restored on page load

### 4.5 Modal focus trap DONE
- [x] Trap Tab/Shift+Tab within modal
- [x] Focus close button on open
- [x] Return focus to trigger element on close

### 4.6 Mobile menu focus trap DONE
- [x] aria-hidden on main/footer when menu open
- [x] Focus close button on open
- [x] Return focus to hamburger on close

### 4.7 Manpower form reset fix DONE
- [x] After form submit, `_updateManpowerQuoteUI()` called to refresh display values

### 4.8 Section aria-labels DONE
- [x] `aria-labelledby` on services, engineering, manpower, contact sections
- [x] Matching `id` on section headings
- [x] `loading="lazy"` on footer logo image

### 4.9 SEO meta DONE
- [x] `<meta name="twitter:url">` added

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
- **Impact**: Data-driven decisions

---

## Phase 6: Infrastructure

### 6.1 GitHub Actions
- [ ] Add HTML validation check
- [ ] Add Lighthouse CI check
- **Impact**: Automated quality gates

### 6.2 Monitoring
- [ ] Add uptime monitoring
- [ ] Add error tracking (Sentry or similar)
- **Impact**: Proactive issue detection

### 6.3 CRM Integration (future)
- [ ] Connect form submissions to CRM
- [ ] Add lead scoring
- **Impact**: Sales pipeline management
