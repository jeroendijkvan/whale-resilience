# Whale Resilience

> *They were hunted to the edge. They came back.*

An interactive, emotional visualization of 120 years of whale population data —
a story of decline, near-extinction, protection, and slow, stubborn recovery.

## Tech

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- D3.js v7 + world-atlas TopoJSON
- Canvas-based animated chart with bioluminescent particles, drifting fish,
  ghostly whale silhouettes, and species uncertainty bands
- Hand-traced SVG silhouettes for six species

## Sections

1. **Hero** — full-viewport ocean scene with rotating species and bioluminescent particles
2. **Population trends** — 1900–2024, six species, modelled vs. surveyed data, 95% CI bands
3. **Key moments** — pivotal dates from the first Antarctic whaling station to today
4. **Species cards** — narrative + stats for each of the six whales
5. **Whale watching map** — 18 hotspots worldwide, click for Google Maps

## Local development

```bash
npm install
npm run dev
```

## Sources

IWC Scientific Committee · Whitehead et al. (2022) · Branch et al. (2008) ·
Brandão et al. (2018) · IUCN Red List assessments. Pre-1970 figures are
modelled from whaling catch records — uncertainty bands are wide.

## Built with AI

This project was scaffolded, designed and implemented end-to-end with
AI-assisted development as a showcase of what's possible.
