# Contributing to MSC Arabia

Thank you for your interest in contributing to the MSC Arabia website. This document provides guidelines for contributing.

## How to Contribute

### Reporting Bugs
1. Check existing [GitHub Issues](https://github.com/defaltadmin/mscarabia/issues) first
2. Open a new issue with:
   - Clear title describing the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Device/browser/OS info

### Suggesting Features
1. Open a GitHub Issue with `[Feature]` prefix
2. Describe the feature and its business value
3. Include mockups or wireframes if possible

### Code Changes

#### Setup
```bash
git clone https://github.com/defaltadmin/mscarabia.git
cd mscarabia
# No build step needed — edit index.html directly
```

#### Branch Naming
- `fix/description` — bug fixes
- `feature/description` — new features
- `docs/description` — documentation updates
- `a11y/description` — accessibility improvements

#### Pull Request Process
1. Create a branch from `main`
2. Make your changes
3. Test in Chrome, Firefox, Safari, and Edge
4. Test mobile (320px to 1440px)
5. Test Arabic mode (RTL layout)
6. Run Lighthouse (target: 95+ all categories)
7. Submit PR with clear description

#### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
type(scope): description

feat(services): add new service card for cybersecurity
fix(nav): close mobile menu on route change
docs(readme): update project structure
a11y(contact): add aria-labels to form inputs
perf(canvas): reduce particle count on mobile
```

Types: `feat`, `fix`, `docs`, `a11y`, `perf`, `refactor`, `style`, `test`, `chore`

## Code Standards

### HTML
- Use semantic elements (`<section>`, `<nav>`, `<main>`, `<article>`)
- All interactive elements need `aria-label` or visible label
- All images need meaningful `alt` text
- Use `data-i18n` for all user-facing text

### CSS
- Use CSS custom properties from the design system
- Mobile-first responsive design
- No hardcoded colors — use `var(--accent)`, `var(--bg)`, etc.
- Support RTL with `[dir="rtl"]` selectors
- Respect `prefers-reduced-motion`

### JavaScript
- Use `const` and `let`, never `var`
- Guard all `querySelector` calls against `null`
- Expose functions via `window.*` for inline `onclick` handlers
- Add translation keys to BOTH `en` and `ar` objects

### i18n Rules
```html
<!-- Text content -->
<h3 data-i18n="key_name">English fallback</h3>

<!-- Attributes -->
<input data-i18n-placeholder="key_name">

<!-- HTML content (use sparingly) -->
<div data-i18n="key_name" data-i18n-html>fallback</div>
```

Translation keys go in the `translations` object inside the `<script>` block. Add to both `en` and `ar`.

### Security
- Sanitize all user input (strip newlines, limit length)
- Use `rel="noopener noreferrer"` on external links
- No inline event handlers with user data
- No `innerHTML` with unsanitized content
- Follow CSP policy in `_headers`

## Review Criteria

PRs are reviewed for:
1. **Functionality** — Does it work as described?
2. **Security** — No new attack vectors?
3. **Accessibility** — WCAG 2.2 AA compliance?
4. **i18n** — Both languages updated? RTL tested?
5. **Performance** — No regressions in Lighthouse?
6. **Mobile** — Works on 320px+ screens?
7. **Code quality** — Clean, readable, well-structured?

## Questions?

Open a GitHub Issue or email info@mscarabia.com.
