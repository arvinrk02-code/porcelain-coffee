# Porcelain — Brand & Research (v2, from real photos)

> Everything below is observed from the actual shop (Google Maps photos & reviews,
> captured July 2026 into `research/`). Demo build — not the shop's official site.

## The shop

- **Porcelain Coffee Bar**, 3C Old Elvet, Durham DH1 3HL
- **4.9★ · 81 Google reviews** · £1–10 per person
- **Hours: 8:30–17:00 every day, closed Tuesdays**
- Dad-and-daughter team. Beans **locally roasted by Fika**. Dine-in + takeaway.
- Dog bowl by the door. Handwritten cake labels. Model sailboat on the shelf.

## What it actually looks like

**Outside:** glossy leafy-green Victorian shopfront (panelled fascia + pilasters),
white letterspaced "PORCELAIN / C O F F E E" decals on the glass, green door with
brass letterbox, white half-height café curtains, two folding wooden benches,
mosaic-tiled threshold, coir mat, dog bowl.

**Inside:** full-height mahogany/dark-wood panelling, dark wood floors, big dark-wood
counter, white globe pendant lamps, chrome espresso machine, retail Fika bags on
shelves, fresh flowers, cake cabinet with handwritten price tags.

**Crockery / brand:** white porcelain cups; saucers & plates with a **tomato-red rim**
printed "PORCELAIN COFFEE"; a red circular coaster — big angular white **P** with
"PORCELAIN COFFEE" wrapping it in circular text. Same condensed gothic everywhere.

## Sampled palette (median of real pixels — see research/patch-sheet.png)

| Sample | Hex | Notes |
|---|---|---|
| door mid-panel green | `#396314` | truest mid paint tone |
| lower panel (shade) | `#213e0f` | deep shadow green |
| fascia (sunlit gloss) | `#95ab70` | blown highlight |
| coaster red | `#e2373a` | the brand red — exact |
| table wood | `#6b4431` | walnut table tops |
| floor | `#5c3635` | mahogany floor |
| plate cream | `#c9c6a9` | warm cream crockery |

### Screen tokens derived from samples
- `shopfront` `#44661e` (hero field), `shopfront-deep` `#2c4212`, `shopfront-lit` `#7d9a55`
- `porcelain` `#f5f1e8` (canvas), `cream` `#efe8d9`
- `mahogany` `#5a3527`, `walnut` `#6b4431`
- `roundel` `#e2373a` (small doses only — stars, P mark, one accent)
- `ink` `#26211c`, `brass` `#b98d4f` (hairlines)

## Typography

**Signage** (see research/zoom-signage-right.png): condensed industrial gothic caps,
flat-topped A, squared counters, wide tracking; "COFFEE" smaller, tracked wider.
Google-Font candidates to test against the photo: **Oswald**, **Khand**, **Big Shoulders**.
Body: warm serif (**Lora**) for sentences and review quotes.
Data (hours/prices/labels): mono (**IBM Plex Mono**) — the serif speaks, the mono measures.

## Real menu facts (photos + reviews)

Flat white · cappuccino · espresso · iced latte · hot chocolate (cocoa-dusted) ·
hand-whisked matcha · chai latte
Homemade cakes: pecan & banana loaf (4.25, handwritten label), carrot cake with
cream-cheese frosting, vegan cookies. Retail Fika bags.

## 5★ review quotes (Google, real, first-name attributed)

- "Porcelain serves up the best coffee in Durham city by far." — Jonathan H.
- "A gorgeous little spot with amazing coffee… We will definitely be back!" — Lydia Jane A.
- "Stunning decor, lush atmosphere and a top notch brew. 10/10!" — Christopher B.
- "I think I've accidentally found my new fav coffee shop in Durham!" — Layla Jade
- "Warm and cosy with good coffee." — Google reviewer

## Design system (sculpted from the Monte reference, soul is Porcelain's)

Keep Monte's discipline: two dominant surfaces, one display voice + mono counterpoint,
flat (no shadows), ghost pill buttons, generous space, line-art not icons.
Swap Monte's soul for Porcelain's: **green field = standing outside; porcelain/cream +
wood = stepping inside; red only as the coaster/rim accent.** The page is a visit:
outside → inside → sit down → details as you leave.

Motifs from the shop itself: inset hairline frame (panelled fascia), globe pendant
lamps, half-curtains, circular coaster text, red-rimmed plates, handwritten cake tags.

## Easter eggs (small, reduced-motion-safe)

1. Globe pendant lamps hang into the hero; click = lights on/off (hero warms/cools).
2. Menu item hover leaves a faint coffee-ring on the paper, like a cup set down.
3. Live OPEN/CLOSED enamel chip from real hours (Europe/London; "back Wednesday" on Tuesdays).
4. Footer coaster: click → wobble-settle like a dropped coaster.

## Photo inventory (`research/`)

| File | Use |
|---|---|
| clean-01-shopfront.jpeg | hero band / outside section |
| clean-02-side.jpeg | visit section |
| clean-03-flatwhites-coaster.jpeg | coffee/menu |
| clean-04-hotchoc-cake.jpeg | cakes |
| clean-05-cake-cabinet.jpeg | cakes (handwritten label!) |
| clean-06-interior.jpeg | inside/story |
| clean-07-table-machine.jpeg | reviews backdrop / atmosphere |

Photos are Google Maps user contributions (Kevin Creaghan, Matthew Farler, Shakib Wakib,
Dominique Fennell, Anthony North East, Margot McDonald, Christopher Bradshaw-Easton) —
fine for a local demo; swap for owner-supplied shots before any public deploy.
