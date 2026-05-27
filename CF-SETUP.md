# Cloudflare Pages Setup — Copy-Paste Instructions

## Step 1: Delete the wrong Worker

The previous deploy created a Worker called `mscarabia` instead of a Pages project.
Go to: Cloudflare Dashboard > Workers & Pages > mscarabia > Settings > "Delete" (bottom)

## Step 2: Create Pages project

Go to: Workers & Pages > Create > Pages > Connect to Git

- Repository: `defaltadmin/mscarabia`
- Production branch: `main`
- Framework preset: **None**
- Build command: **(leave empty)**
- Build output directory: **.**
- Click "Save and Deploy"

## Step 3: Add custom domain

After first deploy completes:
Go to: mscarabia (Pages project) > Custom domains > Set up a custom domain

- Enter: `mscarabia.com`
- It will auto-add a CNAME record pointing to `mscarabia.pages.dev`

## Step 4: Enable Functions

The `functions/api/contact.js` file should auto-detect as a Pages Function.
No extra config needed — Pages reads the `functions/` directory automatically.

## Step 5: Verify

Visit:
- https://mscarabia.pages.dev (CF subdomain)
- https://mscarabia.com (custom domain — after DNS propagates, ~5 min)

Test:
- EN/AR toggle in nav
- Contact form submission
- Manpower quote calculator
- Side nav dots (desktop)
- All sections scroll correctly

---

## Cloudflare AI Prompt (paste into CF AI assistant)

```
I need to set up Cloudflare Pages for my static website. Here's what to do:

1. The repo is github.com/defaltadmin/mscarabia, production branch is main
2. It's a pure static site — no build step, no framework. Output directory is "." (the repo root)
3. There's a functions/ directory with one Pages Function at functions/api/contact.js that handles form submissions via MailChannels
4. I want the custom domain mscarabia.com (DNS is already on Cloudflare)
5. There's a .cfignore file that excludes .git/, .wrangler/, .github/, and node_modules/
6. A previous deploy accidentally created a Worker called "mscarabia" — delete it first if it exists, then create the Pages project properly

After setup, the site should be live at both mscarabia.pages.dev and mscarabia.com.

The GitHub Actions workflow at .github/workflows/deploy.yml uses `wrangler pages deploy . --project-name=mscarabia` for auto-deploy on push to main.
```
