# Deploying pratham-patel.com (GitHub Pages)

Target repo: `Pratham123650/projects` · source branch: `main` · published branch: `gh-pages`
Custom domain: `pratham-patel.com` (kept via `public/CNAME`, copied into every build)
Vite `base: '/'` is correct for a custom domain — do not change it.

## One-time setup (PowerShell or any terminal)

```
git clone https://github.com/Pratham123650/projects.git
cd projects
```

(Skip the clone if you already have the repo on your computer — just `cd` into it
and make sure it's up to date: `git pull`.)

## 1. Replace the source with the new site

Extract `portfolio-v2.zip` (from the Claude outputs folder) and copy everything
in it into the repo folder, overwriting existing files. No files need deleting —
the new version reuses every old filename and only adds new ones.

Also put your resume at `public/resume.pdf` if it isn't there already.

## 2. Build and test locally

```
npm install
npm run build
npm run preview
```

Open the preview URL it prints (http://localhost:4173) and check the site.

## 3. Commit and push the source

```
git add -A
git commit -m "Redesign: Digital Infrastructure Journey v2 — boot sequence, packet system, skills map, homelab rack, virtualization sequence, terminal, System View"
git push origin main
```

## 4. Deploy to GitHub Pages

```
npm run deploy
```

This runs the build again and publishes `dist/` to the `gh-pages` branch
(with `--nojekyll`). GitHub Pages picks it up automatically — the custom
domain stays configured because `dist/CNAME` is included.

## 5. Verify

Wait 1–2 minutes, then hard-refresh https://pratham-patel.com (Ctrl+Shift+R).
You should see the new boot sequence ("INITIALIZING SYSTEM …").

## If something looks wrong

- Blank page → check the browser console; make sure `base: '/'` in
  vite.config.js was not changed.
- Old site still showing → hard refresh (the boot sequence only plays once
  per session, but the old design is visually different).
- 404 on pratham-patel.com → repo Settings → Pages → confirm branch is
  `gh-pages` and the custom domain is `pratham-patel.com`.
