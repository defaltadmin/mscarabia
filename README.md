# MSC Arabia

Corporate website for **ESTABLISHMENT MARSAH ALHALLOUL FOR INFORMATION TECHNOLOGY** — a Riyadh-based IT services company.

**Live**: [mscarabia.com](https://mscarabia.com)

## About

MSC Arabia provides managed IT services, MDM licensing, fire safety engineering, manpower solutions, and hardware procurement across Saudi Arabia. Certified for Aramco, STC, and Petro Rabigh.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5, semantic elements, structured data (JSON-LD) |
| Styling | Custom CSS with design system (CSS custom properties) |
| JavaScript | Vanilla JS, IntersectionObserver, i18n system |
| Backend | Cloudflare Pages Functions (contact form via MailChannels) |
| Hosting | Cloudflare Pages |
| CI/CD | GitHub Actions (auto-deploy on push to `main`) |
| Analytics | Google Tag Manager + Google Analytics |

## Features

- **Bilingual** — Full EN/AR support with RTL layout and 226 translation keys per language
- **Dark Cyberpunk Theme** — 3D glassmorphism effects, animated particles, glow orbs
- **Interactive Manpower Quote** — Sliders for workers, duration, budget with live cost estimate
- **Contact Form** — Serverless via Cloudflare Workers + MailChannels (free email delivery)
- **Projects Portfolio** — Showcases [game.mscarabia.com](https://game.mscarabia.com) and mscarabia.com
- **Side Navigation** — Floating dot nav for desktop with active section tracking
- **Accessibility** — Text resize, high contrast mode, ARIA labels, keyboard navigation
- **SEO Optimized** — JSON-LD structured data, Open Graph, Twitter cards, hreflang, sitemap
- **Security Headers** — X-Content-Type-Options, X-Frame-Options, CSP, HSTS

## Project Structure

```
├── index.html                  # Main page
├── styles/main.css             # Design system + all component styles
├── scripts/main.js             # i18n, interactions, animations, forms
├── functions/api/contact.js    # Cloudflare Pages Function (form handler)
├── assets/logo.png             # Company logo
├── _headers                    # CF Pages security + cache headers
├── .cfignore                   # Exclude .git from deploy
├── .github/workflows/deploy.yml # Auto-deploy to CF Pages
├── sitemap.xml
├── robots.txt
├── cookie-policy.html
└── privacy-policy.html
```

## Development

No build step. Edit files directly.

```bash
# Local preview (any static server)
npx serve .
# or
python -m http.server 5000
```

## Deployment

Push to `main` branch triggers automatic deployment to Cloudflare Pages via GitHub Actions.

## Related Projects

| Project | URL |
|---------|-----|
| Don't Touch Purple (game) | [game.mscarabia.com](https://game.mscarabia.com) |
| Game source code | [github.com/defaltadmin/donttouchpurple](https://github.com/defaltadmin/donttouchpurple) |

## License

All rights reserved. ESTABLISHMENT MARSAH ALHALLOUL FOR INFORMATION TECHNOLOGY.
