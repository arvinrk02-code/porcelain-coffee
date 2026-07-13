# Porcelain — coffee shop demo

A single-page site for **Porcelain Coffee Bar**, the dad-and-daughter coffee bar
at 3C Old Elvet, Durham. Everything on the page was observed, not invented:
colours sampled from photographs of the shop, the display face matched against
their window decal, real 5★ Google reviews, real hours (closed Tuesdays), their
red coaster recreated in SVG.

> Unofficial demo — made with affection, not affiliation.

## Run it

```bash
npm run dev     # → http://localhost:3200 (or 3000 by default)
npm run build   # production build (fully static)
npm run lint
```

## The design

See **[DESIGN.md](./DESIGN.md)** (visual system) and **[BRAND.md](./BRAND.md)**
(research: sampled hexes, signage analysis, review quotes, photo inventory).
Strategy in **[PRODUCT.md](./PRODUCT.md)**. The page is a visit: green shopfront
(hero) → porcelain and wood inside (menu, photos, story) → sit down (reviews) →
leave with the details (hours, map, footer).

## Easter eggs

- Click a **pendant lamp** in the hero — the lights come on.
- The **door** in the shopfront drawing opens by itself the first time you see
  it (lamplight and steam) — and stays clickable after.
- Rest on a **menu item** — a cup ring lands at your cursor: a full circle with
  the odd little gap where the rim didn't sit flush, then it fades like it was
  wiped. (Plain DOM + Web Animations, no React state.)
- The **write-a-review button** pops out bigger with a shadow lift and a quick
  vibration — once on arrival, then every 15s while it's on screen.
- The **open/closed chip** is live, from the real hours, Europe/London.
- Click the **coaster** in the footer.
- There's a note in the console.

All reduced-motion-safe.

## Links & SEO

Instagram (**@porcelaincoffeebar**, verified real) and Google Maps linked in the
footer and Visit section; the Reviews section funnels to a write-a-review deep
link. JSON-LD `CafeOrCoffeeShop` structured data (real geo, hours, rating),
robots.txt + sitemap.xml, OpenGraph/Twitter cards. Set `SITE_URL` in
`src/app/layout.tsx` to the real domain on deploy.

## Stack

Next.js 16 (App Router, static) · React 19 · TypeScript · Tailwind v4
(`@theme` tokens in `src/app/globals.css`) · next/font (Khand / Literata /
Fragment Mono).

| Path | What |
|---|---|
| `src/app/page.tsx` | The page — welcome, photo band, inside section |
| `src/components/` | Hero (lamps), Menu (rings), Reviews, Visit, Footer (coaster), Nav, OpenChip, Roundel, ShopfrontLineArt |
| `src/lib/hours.ts` | Real opening hours + open/closed logic |
| `public/photos/` | Photographs (Google Maps contributors — swap for owner shots before any public deploy) |
| `research/` | Captured photos, colour sampling script, signage crops, final screenshots |
