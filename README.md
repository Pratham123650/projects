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

Drop your resume file into `public/resume.pdf` — the "View résumé" buttons
already link to it.

## Structure

```
src/
  components/   sections + reusable motion primitives (Reveal, Magnetic, Spotlight)
  styles/       tokens.css (design system), base.css, sections.css
  App.jsx       wires ambient layers + sections together
```
