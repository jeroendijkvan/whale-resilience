# Whale Resilience — Product Requirements Document

**Project name:** Whale Resilience  
**Tagline:** *They were hunted to the edge. They came back.*  
**Hosting:** Vercel (static or Next.js)  
**Reference prototype:** The interactive HTML visualization built in conversation (included as `prototype.html` in this repo — see note at end of this document)

---

## 1. Vision & Tone

This is not a dry data dashboard. It is an **inspiring, emotional experience** that celebrates the resilience of whale populations — creatures that survived centuries of industrial slaughter and are slowly, stubbornly returning. Every design and copy decision should reinforce this narrative arc:

> Decline → Near-extinction → Protection → Return

The visual language should feel like **looking through deep ocean water** — dark, rich, alive. Animations should breathe. Data should feel like poetry, not a spreadsheet. The user should leave feeling moved and hopeful.

---

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSG/SSR for SEO, easy Vercel deploy |
| Styling | Tailwind CSS | Utility-first, dark theme |
| Charts | D3.js v7 | Population trends, uncertainty bands |
| Map | D3 + world-atlas TopoJSON | Natural Earth projection |
| Whale icons | SVG (background-removed PNGs → traced SVG) | See §6 |
| Photo display | Next/Image + Unsplash API or curated CDN | Location hover photos |
| Animations | Framer Motion | Page transitions, scroll reveals |
| Hosting | Vercel | Auto-deploy from GitHub |

---

## 3. Pages & Sections

### 3.1 Landing / Hero

- Full-viewport dark ocean scene (CSS + subtle canvas particle system simulating bioluminescence)
- Large headline, e.g.: **"They were hunted to the edge. They came back."**
- Sub-headline: *"Explore 120 years of whale population data — a story of destruction, protection, and slow, stubborn resilience."*
- Animated whale silhouette (SVG, slow drift across the screen) — species rotates every few seconds
- Scroll-down CTA arrow

### 3.2 Population Trends Chart

Full-width section, dark ocean background.

#### 3.2.1 Species covered (6)
| Species | Colour |
|---|---|
| Sperm whale | `#4ecdc4` teal |
| Fin whale | `#a78bfa` purple |
| Southern Right whale | `#86efac` green |
| Humpback whale | `#fbbf24` amber |
| Blue whale | `#f87171` coral |
| Killer whale / Orca | `#e2e8f0` near-white |

#### 3.2.2 Chart behaviour
- X-axis: years 1900–2024
- Y-axis: global population estimate (thousands)
- Each species rendered as:
  - **Solid line** for survey-based data (post ~1970–1980 depending on species)
  - **Dashed line** for modelled/reconstructed data (pre-1970, derived from catch records)
  - **Shaded uncertainty band** (95% CI) — wider and more transparent in modelled zone, slightly more solid in survey zone
  - **Filled dots** for observed data points, **hollow dots** for modelled
- Vertical dashed gold line at **1986** labelled "IWC Commercial Whaling Moratorium"
- Vertical divider between modelled and survey zones, subtly labelled
- Hover tooltip shows: year, all species values, CI range, data quality (surveyed vs modelled)
- Animated fish schools drift across the background (canvas layer, z-index below chart)
- Ghostly whale silhouettes drift along each species' curve (species-matched shape, very low opacity)

#### 3.2.3 Data honesty notice
Below the chart, a small callout box:
> *"Pre-1970 values are modelled from whaling catch records, not direct surveys. Confidence intervals are wide — treat these as best estimates, not precise counts. Sources: IWC Scientific Committee, Whitehead et al. (2022), IUCN Red List."*

#### 3.2.4 Species legend with whale icons
Each species entry in the legend shows:
- **Whale silhouette icon** (SVG, background removed, species-specific shape — see §6)
- Species name in species colour
- Current estimated population

### 3.3 Key Moments Timeline

A horizontal (desktop) or vertical (mobile) timeline of pivotal moments, e.g.:
- **1904** — First Antarctic whaling station opens
- **1931** — 37,000 whales killed in a single Antarctic season
- **1946** — IWC founded
- **1966** — Blue whale protected
- **1982** — Commercial whaling moratorium agreed
- **1986** — Moratorium takes effect
- **1994** — Southern Ocean Whale Sanctuary declared
- **Today** — Humpbacks upgraded from Vulnerable to Least Concern

Each node: year, short headline, 1-sentence description. Scroll-triggered reveal animation.

### 3.4 Species Cards

Six cards, one per species. Each card:
- Full-bleed species colour tint header
- Large whale icon (SVG — see §6)
- Species name + latin name
- Pre-whaling population estimate
- Population low (year)
- Current estimate
- Trend indicator (↑ recovering / → stable / ↓ declining)
- 2-sentence narrative about their story
- IUCN status badge

### 3.5 Whale Watching World Map

Full-width section.

#### 3.5.1 Map behaviour
- World map rendered with D3 Natural Earth projection
- Dark ocean (`#040d1e`), dark land (`#0e2240`)
- **18+ hotspot locations** plotted as interactive dots
- Each dot is a **pie-chart** showing which species are viewable there (slices in species colours)
- **Hover:** shows location photo (see §3.5.2) + location name + species list tooltip
- **Click:** opens Google Maps at that location in a new tab (`https://www.google.com/maps/search/?api=1&query=LAT,LNG`)
- Cursor changes to pointer on hover

#### 3.5.2 Location photos on hover
Each hotspot has a curated photo (landscape orientation, ~400×250px). Options:
- **Option A (preferred):** Use Unsplash Source API (`https://source.unsplash.com/400x250/?whale,{location}`) — free, no key needed
- **Option B:** Curate a mapping of location → specific Unsplash photo ID (more reliable)
- Photo appears in a floating card near the hovered dot, with:
  - Photo (rounded corners)
  - Location name (bold)
  - Species chips (coloured tags per species)
  - "Open in Google Maps →" link

#### 3.5.3 Species filter
Below the map: clickable species legend chips. Selecting a species fades out all dots that don't include that species. Deselect to show all. Multiple selection is a stretch goal.

#### 3.5.4 Hotspot data
| Location | Lat | Lon | Species |
|---|---|---|---|
| Azores, Portugal | 38.5 | -28.0 | Sperm, Blue, Fin |
| Húsavík, Iceland | 66.0 | -17.3 | Humpback, Blue, Fin |
| Tromsø, Norway | 69.6 | 18.9 | Killer whale, Humpback, Fin |
| Gulf of Alaska | 58.5 | -150.0 | Humpback, Killer whale, Blue |
| Monterey Bay, USA | 36.8 | -122.0 | Blue, Humpback, Fin, Killer whale |
| Baja California, Mexico | 27.0 | -114.0 | Blue, Humpback, Fin, S. Right |
| Dominica, Caribbean | 15.4 | -61.4 | Sperm, Humpback |
| Peninsula Valdés, Argentina | -42.5 | -63.5 | S. Right, Killer whale |
| Hermanus, South Africa | -34.4 | 19.2 | S. Right, Humpback |
| Mirissa, Sri Lanka | 5.9 | 80.5 | Blue, Sperm |
| Kaikoura, New Zealand | -42.4 | 173.7 | Sperm, Humpback, Killer whale |
| Tonga, Pacific | -21.2 | -175.2 | Humpback |
| Antarctica | -65.0 | -60.0 | Killer whale, Humpback, Blue, Fin, S. Right |
| Vancouver Island, Canada | 50.0 | -126.0 | Killer whale, Humpback |
| Newfoundland, Canada | 47.5 | -52.5 | Humpback, Fin, Sperm |
| Svalbard, Norway | 78.5 | 15.0 | Blue, Humpback, Fin |
| Ogasawara, Japan | 27.1 | 142.2 | Sperm, Humpback |
| Andenes, Norway | 69.3 | 16.1 | Sperm, Killer whale |

### 3.6 Footer

- Short closing statement: *"Whales are not just survivors — they are ecosystem engineers, carbon sinks, and a reminder that with protection, nature finds a way back."*
- Links: IWC, IUCN Red List, WWF Whales
- Data sources listed
- "Built with publicly available IWC and IUCN data"

---

## 4. Design System

### 4.1 Palette
```
Background (deep ocean):  #03091a
Surface:                  #050e1f
Land (map):               #0e2240
Ocean (map):              #040d1e
Text primary:             #d0e8f4
Text secondary:           rgba(180,210,240,0.6)
Text muted:               rgba(130,180,215,0.38)
Moratorium gold:          rgba(255,225,80,0.4)
```

Species colours: see §3.2.1

### 4.2 Typography
- **Display:** Fraunces or Playfair Display (serif, for headlines — emphasises age and gravitas)
- **Body / UI:** Inter or system-ui (clean, legible)
- Scale: 48px hero → 32px h2 → 20px h3 → 16px body → 11px labels

### 4.3 Motion
- All section reveals: fade-up on scroll (Framer Motion `whileInView`)
- Chart lines: draw-on animation (D3 path length trick)
- Whale silhouettes: slow sinusoidal drift, very low opacity, never jarring
- Fish schools: looping canvas animation
- Map dots: subtle pulse on load
- Hover states: 200ms ease transitions

### 4.4 Responsiveness
- Mobile-first
- Chart: scrollable horizontally on small screens, or simplified to last 40 years
- Map: simplified dot map at <640px, tap to show tooltip
- Timeline: vertical on mobile, horizontal on ≥1024px
- Species cards: 1 column mobile, 2 tablet, 3 desktop

---

## 5. Data

All population data is baked into the application as static JSON (no live API needed for chart data). The JSON structure per species:

```json
{
  "id": "humpback",
  "name": "Humpback whale",
  "latinName": "Megaptera novaeangliae",
  "color": "#fbbf24",
  "iucnStatus": "Least Concern",
  "preWhalingEstimate": 125000,
  "populationLow": { "year": 1970, "value": 9000 },
  "currentEstimate": 83000,
  "trend": "recovering",
  "dataQuality": "Good — best-monitored large whale",
  "narrative": "...",
  "dataPoints": [
    { "year": 1900, "best": 125, "low": 80, "high": 165, "observed": false },
    ...
  ]
}
```

Values are in thousands. `observed: false` = modelled from catch records. `observed: true` = survey-based.

**Sources:**
- IWC Scientific Committee population status summaries (2024)
- Whitehead et al. (2022), *Scientific Reports* — sperm whales
- Branch et al. (2008) — blue whale catch series
- Brandão et al. (2018) — Southern Right whale (SA)
- Findlay & Wilkinson survey series — humpback (W. Indian Ocean)
- IUCN Red List assessments

---

## 6. Whale Icons

Each species needs a high-quality, recognisable silhouette icon. **Do not use generic clipart.** The goal is accuracy — a marine biologist should be able to identify the species at a glance.

### 6.1 Approach
1. Source reference photos (Unsplash / Wikimedia Commons / NOAA public domain)
2. For each species, find a clean **side-profile photo** against a plain background if possible
3. Remove background (rembg Python library, or remove.bg API, or manual masking)
4. Trace to SVG path using Inkscape "Trace Bitmap" or Potrace
5. Simplify paths for web use (target: <2KB per icon SVG)
6. Export as `whale-[species].svg` with `viewBox="0 0 200 80"`

### 6.2 Key distinguishing features per species
| Species | Must-have feature in silhouette |
|---|---|
| Sperm whale | Boxy/blunt head, offset blowhole, narrow lower jaw |
| Fin whale | Sleek torpedo, prominent falcate dorsal fin, asymmetric colouration |
| S. Right whale | No dorsal fin, highly arched jawline, callosities on rostrum |
| Humpback | Long white pectoral fins (≥30% body length), bumpy rostrum, jagged trailing edge on flukes |
| Blue whale | Massive, very long, tiny dorsal fin far back, mottled pattern |
| Killer whale | Bold black-and-white, tall straight dorsal fin (males), saddle patch |

### 6.3 Fallback
If automated tracing produces poor results, use the hand-drawn SVG paths already in `prototype.html` as a fallback — they are anatomically reasonable and render cleanly at all sizes.

---

## 7. Map Location Photos

For each of the 18 hotspots, curate a specific Unsplash photo URL (landscape, ocean/whale-watching scene). Store as a mapping in `data/hotspots.json`:

```json
{
  "id": "azores",
  "name": "Azores, Portugal",
  "lat": 38.5,
  "lon": -28.0,
  "species": ["Sperm whale", "Blue whale", "Fin whale"],
  "photo": "https://images.unsplash.com/photo-XXXXXXXX?w=400&h=250&fit=crop",
  "photoCredit": "Photographer Name / Unsplash",
  "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=38.5,-28.0"
}
```

Photos should show:
- The location's seascape or coastline (not just generic ocean)
- Or: an actual whale-watching scene at that location
- Avoid photos showing whales being harmed

---

## 8. Accessibility

- All charts: `role="img"` with `aria-label` describing what is shown; fallback text between tags
- Keyboard-navigable species filter chips
- Color is never the sole differentiator — all species also distinguished by line style (solid/dashed) and dot shape (filled/hollow)
- Reduced-motion mode: disable canvas animations, simplify chart transitions
- Contrast ratio ≥ 4.5:1 for all body text on dark backgrounds

---

## 9. Performance

- Target Lighthouse score: ≥ 90 on all metrics
- D3 and world-atlas loaded only on map section (lazy import)
- Chart canvas uses `requestAnimationFrame` throttled to 30fps for background animation
- Location photos: lazy-loaded, preloaded on hover intent (`mouseenter` on dot)
- TopoJSON: use `countries-110m.json` (low resolution is fine at map scale)
- Static JSON data: bundled at build time, no runtime fetch

---

## 10. Project Structure (suggested)

```
whale-resilience/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Single-page app orchestrator
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── PopulationChart.tsx # D3 chart component
│   ├── Timeline.tsx
│   ├── SpeciesCards.tsx
│   ├── WhaleMap.tsx        # D3 map + hotspots
│   ├── WhaleSilhouette.tsx # SVG icon component
│   └── MapTooltip.tsx      # Hover card with photo
├── data/
│   ├── species.json        # All population time-series data
│   └── hotspots.json       # Map locations + photos + Google Maps URLs
├── public/
│   └── icons/
│       ├── whale-sperm.svg
│       ├── whale-fin.svg
│       ├── whale-right.svg
│       ├── whale-humpback.svg
│       ├── whale-blue.svg
│       └── whale-orca.svg
├── prototype.html          # Original interactive prototype (reference)
└── README.md
```

---

## 11. Deployment

1. Push to GitHub repository
2. Connect repository to Vercel
3. Framework preset: **Next.js**
4. No environment variables required for MVP (all data is static)
5. Optional: add `UNSPLASH_ACCESS_KEY` env var if switching to Unsplash API for dynamic photos

---

## 12. Should you include `prototype.html` in the repo?

**Yes — absolutely include it.** Here's why:

- It contains the **exact working D3/Canvas implementation** of the population chart, uncertainty bands, animated fish/whale layer, and world map — copy-pasteable into Next.js components
- It documents the **precise data values** for all 6 species (best estimates + CI ranges for all 18 time points) as inline JavaScript — the developer can extract these directly into `species.json`
- It shows the **exact colour palette, font sizes, line weights, and animation timings** that define the visual language — no ambiguity for the developer
- It proves the design works — the developer can open it in a browser to see the target output before writing a single line of Next.js

**Recommendation:** Add a note at the top of `prototype.html`:
```html
<!-- 
  WHALE RESILIENCE — Interactive Prototype
  This file is the reference implementation for the production Next.js app.
  All data, colours, animations and chart logic should be ported from here.
  See whale-resilience-requirements.md for full specification.
-->
```

The prototype is essentially a **working spec** — far more useful than wireframes or Figma mockups for a data visualisation project like this.

---

## 13. Out of Scope (v1)

- User accounts or saved preferences
- Social sharing of specific species views
- Real-time data updates (IWC data is annual at best)
- Mobile app
- Multi-language support
- Sound/audio (whale songs) — compelling but complex; consider v2

---

*Document version: 1.0 — May 2026*  
*Prepared based on iterative visualization prototype built with Claude Sonnet 4.6*
