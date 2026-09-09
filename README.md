# Pratham Patel — Portfolio

A luxury dark portfolio built with React + Vite and Framer Motion.

## Design

- Deep ink-blue base with champagne + dusk-blue accents
- Fraunces (display serif) · Hanken Grotesk (body) · Spline Sans Mono (labels)
- Signature hero: a network topology drawn in champagne hairlines
- Floating glass navbar with scroll-spy and hide-on-scroll
- Scroll-reveal sections, magnetic buttons, subtle 3D tilt project cards,
  cursor-tracked card glow, animated experience timeline, mouse-follow ambient light
- All animations are transform/opacity only (60 FPS), `prefers-reduced-motion` respected

## Getting started

```
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
npm run deploy   # publish dist/ via gh-pages
```

## Adding your resume PDF

Drop your resume file into `public/resume.pdf`, then set `PROFILE.resume` to
`'/resume.pdf'` in `src/data/content.js`. Resume actions stay hidden until both
steps are complete, so the public site never points to a missing file.

## Adding project evidence

Project case studies, technology relationships, screenshot slots, education,
current work, and certifications are managed in `src/data/content.js`.

For a real screenshot:

1. Save a sanitized, optimized image under `public/evidence/`.
2. Add its public path (for example, `/evidence/proxmox-overview.webp`) as the
   evidence item's `src` value.
3. Add specific alt text. Keep captions focused on what the screenshot proves.

Never publish hostnames, IP addresses, domains, usernames, client information,
credentials, keys, or identifiable dashboard data. The Certifications section
stays hidden while `CERTIFICATIONS` is empty.

## Structure

```
src/
  components/   homepage sections, case studies, architecture, evidence gallery
  data/         all portfolio facts and cross-links between skills and evidence
  styles/       tokens.css (design system), base.css, sections.css
  App.jsx       wires ambient layers + sections together
```
