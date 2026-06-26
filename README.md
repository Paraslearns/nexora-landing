# Nexora — Next-Gen AI Data Automation Platform (Landing Page)

A premium, high-converting, responsive SaaS landing page built under the Phase 1
"Next-Gen AI Platform Speed Run" brief. Built with **Next.js 16 (App Router) +
TypeScript + Tailwind v4 + custom CSS**. No external UI or animation component
libraries — every interaction and transition is written from scratch using native
CSS Transitions / Animations and the DOM API.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
npm start        # serve the production build
```

## How the scored requirements are met

### Feature 1 — Matrix-driven pricing + performance-isolated currency switcher
- All prices derive from a **multi-dimensional config matrix** in
  [`app/lib/pricing.ts`](app/lib/pricing.ts):
  `price = baseRate × fx[currency] × tariff[currency] × (annual ? 0.8 : 1)`.
  Nothing is hardcoded in the markup — the initial USD/monthly strings are
  computed and server-rendered (crawlable).
- **State isolation:** [`app/components/Pricing.tsx`](app/components/Pricing.tsx)
  holds **zero React state**. Currency, billing cycle, and dropdown open-state
  live in `useRef`s; toggling them mutates **only the targeted price text nodes**
  (and each control's own active marker) via direct `textContent` / attribute
  writes. React never re-renders the component or any parent → no global reflow.

### Feature 2 — Bento grid → Accordion with resize context-lock (zero deps)
- [`app/components/Features.tsx`](app/components/Features.tsx) renders **one DOM
  tree** that CSS reshapes: a 6-column bento grid on desktop, a touch accordion
  below the `760px` breakpoint.
- The accordion's open/close uses the native **`grid-template-rows: 0fr → 1fr`**
  transition (no JS height measuring, no libraries). Desktop detail reveals use
  opacity/transform only — **no layout thrash**.
- **Context lock:** a `matchMedia` listener detects the breakpoint crossing and
  transfers the last-hovered desktop node index into the accordion's open state
  (and back), so the matching panel is already open after the reflow.

### SEO & semantic HTML
- Semantic landmarks: `<header> <main> <section> <article> <footer> <nav> <figure>`.
- Full metadata in [`app/layout.tsx`](app/layout.tsx): title template, description,
  keywords, canonical, Open Graph + Twitter cards, robots.
- Generated PNG OG/Twitter images ([`app/opengraph-image.tsx`](app/opengraph-image.tsx),
  [`app/twitter-image.tsx`](app/twitter-image.tsx)) via `next/og`.
- `robots.txt`, `sitemap.xml`, and JSON-LD structured data.
- Accessible image `alt`, ARIA on interactive controls, skip-link, focus-visible.

### Loading sequence & motion
- [`app/components/Loader.tsx`](app/components/Loader.tsx) runs a `460ms` entry veil
  (< 500ms cap) over already-rendered, crawlable HTML — it never blocks TTI.
- Motion tokens in [`app/globals.css`](app/globals.css):
  micro-interactions `175ms ease-out`, structural reflows `360ms ease-in-out`.

## Swapping in the official asset package

The design is fully tokenized so the provided assets drop in with minimal edits:

| Asset | Where to change |
| --- | --- |
| **Color palette** | the hex values in `:root` of [`app/globals.css`](app/globals.css) |
| **Fonts (2 families)** | the two loaders in [`app/layout.tsx`](app/layout.tsx) — keep the `--font-display-src` / `--font-body-src` variable names (use `next/font/local` for self-hosted files) |
| **SVG pack** | drop into `public/` and reference, or replace the inline glyphs in [`app/components/Icons.tsx`](app/components/Icons.tsx) |

## Deploy

Optimized for Vercel (zero-config) but works on any platform that runs Next.js.

```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```
