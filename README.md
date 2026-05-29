# MSC Arabia

Corporate website for **ESTABLISHMENT MARSAH ALHALLOUL FOR INFORMATION TECHNOLOGY** — a Riyadh-based IT services company providing managed IT, MDM licensing, fire safety engineering, manpower solutions, and hardware procurement across Saudi Arabia.

**Live**: [mscarabia.com](https://mscarabia.com)
**GitHub**: [defaltadmin/mscarabia](https://github.com/defaltadmin/mscarabia)
**Hosting**: Cloudflare Pages (auto-deploy on push to `main`)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5, semantic elements, structured data (JSON-LD) |
| Styling | Custom CSS with design system (CSS custom properties) |
| JavaScript | Vanilla JS (no frameworks), IntersectionObserver, Canvas 2D |
| i18n | Custom 241-key EN/AR system with RTL support |
| Backend | Cloudflare Pages Functions (contact form via Resend API) |
| Security | Cloudflare Turnstile CAPTCHA, honeypot, KV rate limiting |
| Hosting | Cloudflare Pages (auto-deploy on push to `main`) |
| Analytics | Google Tag Manager + Google Analytics (cookie-gated) |

## Features

- **Bilingual** — Full EN/AR support with RTL layout and 241 translation keys per language
- **Dark Cyberpunk Theme** — Canvas hero with morphing gradient orbs, floating shapes, scroll parallax
- **Service Cards** — Bento grid layout with feature checklists, stats, and rich descriptions
- **Interactive Manpower Quote** — Sliders for workers, duration, budget with live cost estimate
- **Contact Form** — Serverless via Cloudflare Workers + Resend API with Turnstile CAPTCHA
- **Accessibility** — Text resize, high contrast mode, underline links, letter spacing, ARIA labels, keyboard nav
- **Cookie Consent** — Custom banner gating analytics, PDPL/GDPR compliant
- **SEO** — JSON-LD structured data, Open Graph, Twitter cards, hreflang, sitemap
- **Security Headers** — CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Permissions-Policy

## Project Structure

```
MSCArabia.com/
├── index.html                  # Main page (all CSS/JS inlined)
├── functions/
│   └── api/
│       └── contact.js          # Cloudflare Pages Function (form handler)
├── assets/
│   ├── logo.png                # Company logo (raster)
│   ├── logo.svg                # Company logo (vector)
│   ├── og-image.jpg            # Open Graph social image
│   └── fonts/                  # Self-hosted web fonts
├── _headers                    # Security headers + CSP + cache rules
├── 404.html                    # Custom error page
├── privacy-policy.html         # Standalone privacy policy
├── cookie-policy.html          # Standalone cookie policy
├── sitemap.xml                 # SEO sitemap
├── robots.txt                  # Crawler rules
├── README.md                   # This file
├── CODE_OF_CONDUCT.md          # Community guidelines
├── CONTRIBUTING.md             # Contribution guidelines
├── HANDOFF.md                  # Project handoff document
├── CODE_REVIEW.md              # Full code review reference
└── REVIEW-PACKET-DEEPSEEK.md   # DeepSeek code review packet
```

## Getting Started

### Prerequisites
- A modern web browser
- (Optional) Cloudflare account for deployment

### Local Development

No build step. Edit `index.html` directly.

```bash
# Clone the repo
git clone https://github.com/defaltadmin/mscarabia.git
cd mscarabia

# Serve locally (any static server works)
npx serve .          # Node.js
python -m http.server 8000   # Python
php -S localhost:8000         # PHP
```

Visit `http://localhost:8000` in your browser.

### Environment Variables (Cloudflare)

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key for email delivery |
| `CONTACT_EMAIL` | Recipient email (default: info@mscarabia.com) |
| `FROM_EMAIL` | Sender email (default: onboarding@resend.dev) |
| `TURNSTILE_SECRET` | Cloudflare Turnstile secret key |
| `RATE_LIMIT_KV` | KV namespace binding for rate limiting |

## Architecture Decisions

### Why Inlined CSS/JS?
All CSS and JavaScript is inlined in `index.html` for:
- Zero HTTP requests for critical rendering
- Single-file deployment simplicity
- No build tooling required
- Cloudflare Pages serves it with aggressive caching

### Why Vanilla JS?
- No framework overhead for a single-page marketing site
- ~1200 lines of JS handles all interactions
- No hydration, no bundle, no node_modules
- Faster LCP and TBT than any framework approach

### Why Custom i18n?
- 241 keys per language is manageable without a library
- `data-i18n` attributes are simple and debuggable
- No runtime dependency
- RTL handled via `dir="rtl"` on `<html>`

## Related Projects

| Project | URL | Repo |
|---------|-----|------|
| Don't Touch Purple (game) | [game.mscarabia.com](https://game.mscarabia.com) | [defaltadmin/donttouchpurple](https://github.com/defaltadmin/donttouchpurple) |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community standards.

## License

Proprietary. All rights reserved by ESTABLISHMENT MARSAH ALHALLOUL FOR INFORMATION TECHNOLOGY.
