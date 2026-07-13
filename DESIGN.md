# Porcelain — Style Reference

> the shopfront, as a page

**Theme:** light. The page is a visit: a full drench of the shop's own painted
green (outside), a warm porcelain canvas with dark walnut accents (inside), and
tomato red only in coaster-sized doses. Flat surfaces, no shadows — depth comes
from the green→porcelain→mahogany transitions, the way it does when you walk in
off the street. Every colour was sampled from photographs of the real shop; the
display face was matched against the real window decal.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Shopfront | `oklch(0.46 0.11 133)` | `--color-shopfront` | The painted green. Hero field, Visit section — the page's dominant brand surface |
| Shopfront Deep | `oklch(0.35 0.09 135)` | `--color-shopfront-deep` | Panel shadow; footer; the hero after you turn the lamps on |
| Shopfront Lit | `oklch(0.68 0.1 128)` | `--color-shopfront-lit` | Gloss highlight; the OPEN dot |
| Porcelain | `oklch(0.96 0.012 95)` | `--color-porcelain` | Warm bone canvas — body background, text on mahogany |
| Cream | `oklch(0.92 0.02 95)` | `--color-cream` | Plate cream, deeper surfaces |
| Mahogany | `oklch(0.32 0.055 45)` | `--color-mahogany` | The panelled walls — "Step in" section |
| Walnut | `oklch(0.42 0.07 50)` | `--color-walnut` | Table tops; coffee-ring stains |
| Ink | `oklch(0.24 0.012 75)` | `--color-ink` | Warm espresso near-black — primary text |
| Ink Soft | `oklch(0.4 0.02 70)` | `--color-ink-soft` | Mono footnotes, attributions (8.2:1 on porcelain) |
| Glass | `oklch(0.97 0.008 95)` | `--color-glass` | The white window-decal text on green |
| Roundel | `oklch(0.6 0.2 27)` | `--color-roundel` | Coaster red — stars, the P mark, plate-rim rings. Never large fields |
| Roundel Deep | `oklch(0.5 0.19 27)` | `--color-roundel-deep` | Red when it must carry text |
| Brass | `oklch(0.68 0.09 80)` | `--color-brass` | Letterbox brass — focus rings, hairlines |
| Hairline | `oklch(0.87 0.02 90)` | `--color-hairline` | Quiet borders on porcelain |

## Tokens — Typography

### Khand — the signage · `--font-display`
Condensed industrial gothic matched against the shop's real window decal
(flat-topped A, squared terminals, open counters). Weight 500. **Always caps,
always tracked**: 0.3em for the wordmark, 0.22em for links and labels, up to
0.62em for the small "COFFEE" line. This is the **glass decal** system — used
like the shop uses it (the window, a couple of painted marks), never as
every-section scaffolding.

### Literata — the reading nook · `--font-serif`
Bookish body serif for sentences, headings and review quotes. 400 body / 600
display headings, italic for list titles and asides. Body at 1.0625rem,
line-height 1.7.

### Fragment Mono — the receipt · `--font-mono`
Hours, prices, addresses, attributions — data only, mostly uppercase at
0.75–0.875rem. The serif speaks, the mono measures.

## Signature elements

- **Pendant lamps** (hero): two globe lamps on thin cords sway gently over the
  green. Click one — the lights come on, the globes glow warm, the whole field
  deepens like evening. `aria-pressed`, reduced-motion-safe.
- **Coffee rings** (menu): resting on an item sets a faint walnut cup-ring down
  beside it. Max 4, fade after 7s, decoration only (`aria-hidden`).
- **Live hours chip**: computed from the real hours (8:30–5, closed Tue,
  Europe/London) — "Open now — till 5pm" / "Closed Tuesdays — back tomorrow, 8:30".
- **The coaster** (footer): SVG recreation of their red roundel; click and it
  wobbles like a dropped coaster settling.
- **Console note** for the curious.
- **Line-art shopfront** (welcome): the elevation drawn from the photo — fascia,
  curtains, benches, dog bowl. 2.5px ink strokes, no fills. **The door opens** —
  click it and the leaf swings inward on warm lamplight and a curl of steam.
- **Menu card**: hairline-framed cream panel set like a printed menu — centred
  decal mark with brass rules, hand-drawn cup/cake icons in the same ink line
  language, dotted leaders from item to note.

## Rules

- Two surfaces + wood. Green and porcelain carry the page; mahogany appears
  once, when you step inside. Red ≤ coaster-sized.
- Flat. No shadows, no gradients (except the lamps' glow when lit).
- Photography is documentary and edge-to-edge natural — no border radius.
- Ghost buttons only: 1px glass border, decal type, no fill.
- Copy is short, British, and observed: "proper flat whites", "closed Tuesdays",
  never "artisanal experiences". If we didn't see it, it isn't on the page.
- Contrast verified numerically: body 14.6:1, worst small text 4.7:1.

## Layout

Full-dvh green hero framed by a 1px inset border (the panelled fascia), then a
1024–1152px centred column on porcelain. Sections alternate text blocks, a
two-up photo band, one full-width mahogany drench, staggered review quotes, and
the green Visit/Footer bookend. Generous vertical rhythm: py-24 → py-32.
