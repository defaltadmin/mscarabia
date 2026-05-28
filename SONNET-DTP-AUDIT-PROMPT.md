# Sonnet Audit Prompt — Don't Touch Purple

**Instructions:** Open a NEW Sonnet conversation. First, clone the repo and share the code, THEN paste the prompt below.

## Step 1: Share the code

Run this first in the conversation:
```bash
git clone --depth 1 https://github.com/defaltadmin/donttouchpurple /tmp/dtp-audit
```

Then share the key files by reading them into context:
- `engine/GameEngine.ts`
- `engine/subsystems/TickProcessor.ts`
- `components/App.tsx`
- `components/HUD/PlayerPanel.tsx`
- `components/HUD/GameArea.tsx`
- `components/Backgrounds/` (list all files)
- `src/config/game.ts`
- `services/firebase.ts`
- `services/firestoreService.ts`
- `workers/scoreWorker.ts`
- `hooks/` (all files)
- `e2e/smoke.spec.ts`
- `DESIGN.md`
- `AGENTS.md`
- `package.json`
- `vite.config.ts`
- `firebase.json`
- `firestore.rules`

## Step 2: Paste this prompt

```
You are auditing "Don't Touch Purple" — a reflex-based grid-tapping game.

Live: https://game.mscarabia.com
Tech: React 18, TypeScript 5, Vite 7, Firebase (Auth + Firestore + Analytics), OGL/WebGL backgrounds, Cloudflare Workers

## Architecture Rules (from AGENTS.md)
1. Pure game logic in engine/ — zero React imports
2. Cell arrays replaced each tick — never mutate in place
3. sessionStorage for game state (not localStorage)
4. Generation counter for callbacks referencing cell indices
5. data-testid on all key interactive elements
6. CSS vars from DESIGN.md — no hardcoded hex colors
7. RAF idle skip — check document.hidden, skip render when no active entities
8. WebGL context loss handlers on all OGL backgrounds
9. React.memo for external library components in expensive contexts
10. safeSet wrapper for localStorage writes that grow (quota handling)

## Audit ALL of these areas:

### 1. Code Quality & Architecture
- engine/ — stale closures, memory leaks, race conditions, generation counter correctness
- TickProcessor — cell lifecycle, boss events, difficulty scaling
- hooks/ — useGameEngine bridge, custom hooks, state machines
- components/ — unnecessary re-renders, missing React.memo, prop drilling
- TypeScript — any types, missing interfaces, strict mode violations
- data-testid coverage on interactive elements

### 2. Performance
- Core Web Vitals (LCP, INP, CLS)
- Bundle size — dead code, unused imports, tree-shaking
- RAF optimization — idle skip, double RAF, visibility API
- WebGL context loss handling on ALL 12 backgrounds
- Canvas DPR scaling — setTransform vs accumulated scale
- Font loading — render-blocking?
- IntersectionObserver for lazy-loading backgrounds
- React.memo on expensive components

### 3. Game Design & Balance
- src/config/game.ts — difficulty curve, spawn rates, timing
- Powerup weights and distribution
- Boss event balance — too easy/hard?
- Scoring system — anti-cheat, server-side validation?
- 37 achievements — all achievable? Proper tracking?
- Daily/weekly challenges — UTC boundary handling?
- Dust economy — earn vs spend rates

### 4. UX / QoL
- Onboarding — does the game teach new players?
- Settings — haptics, sound, accessibility
- Game over screen — informative enough? Restart flow?
- Leaderboard — real-time updates? Stale data?
- Mobile — touch targets 44px+, haptic feedback, safe areas
- Accessibility — screen reader, keyboard, contrast, reduced motion
- Error states — network failures, auth, offline mode
- Loading states — skeletons, spinners

### 5. Security
- Firebase security rules — open reads/writes?
- Score submission — anti-tampering? Server-side validation?
- CSP headers — proper restrictions?
- XSS vectors — user content sanitization?
- API keys — properly scoped client-side keys?
- App Check — wired up?
- Cloudflare Worker — CORS, rate limiting, auth

### 6. Firebase & Backend
- Firestore rules review
- Auth flow — anonymous vs authenticated
- Analytics — key actions tracked?
- Offline persistence
- Data model efficiency

### 7. Testing
- Unit test coverage gaps
- E2E — critical paths covered?
- Flaky tests?
- Missing test scenarios

### 8. SEO & Marketing
- Meta tags, OG tags, structured data
- Social sharing cards
- Landing page quality

### 9. Build & Deploy
- Vite config optimizations
- GitHub Actions workflow
- Cloudflare Pages config — headers, caching, functions
- Environment variables

## Output Format

For EACH finding:
- **File:Line** — exact location
- **Severity** — Critical / High / Medium / Low
- **Category** — Performance / Security / UX / Balance / Code Quality / Testing
- **Issue** — what's wrong
- **Fix** — specific code change
- **Impact** — what this affects

Group by severity (Critical first). Summary count at top. Be brutal — find everything.
```
