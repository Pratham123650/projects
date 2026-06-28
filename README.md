# Pratham Patel — Portfolio

A futuristic cyber/IT portfolio built with React + Vite, Framer Motion, and GSAP.

## Features
- Terminal-style boot sequence on load
- Matrix-style code rain + connected particle field backgrounds
- Parallax orbs and HUD grid overlay
- Custom reticle cursor that reacts to every interactive element
- 3D tilt glass cards with spotlight glow and click ripple
- Magnetic buttons
- Scroll-reveal animations and a live scroll progress bar
- Fully responsive, with reduced-motion support and visible focus states

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Adding your resume PDF
Drop your resume file into `public/resume.pdf` — the "View Resume PDF" button
already links to it.

## Structure
```
src/
  components/   reusable UI + effect components
  styles/       theme tokens (theme.css) and layout (layout.css)
  App.jsx       wires backgrounds + sections together
```
