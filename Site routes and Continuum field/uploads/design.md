# DESIGN.md — Logic Loving Mind Visual System

The authority on everything visual. Read with `claude.md`. Where the two overlap, this file wins on
appearance; `claude.md` wins on facts, numbers, and copy.

---

## 0. Direction

**Instrument, not brochure.** The reference points are precision measurement equipment, deployment
telemetry, and observatory readouts — surfaces where information is the ornament. The page is near-black,
type-led, and almost entirely monochrome. Color exists on this site the way light exists in a dark room:
emitted, diffuse, never painted on.

The brand's story is a story about *energy states* — fire, electricity, intelligence. So color behaves like
energy: it glows behind things, it has falloff, it lights an area. It never becomes a flat fill, a chip,
a badge, or a button.

Three consequences that shape every screen:

1. **The chrome is achromatic.** Header, nav, buttons, fields, tables, footers, and all running text are
   white, grey, or near-black. A visitor should be able to navigate the entire site and see no hue at all
   except in hero fields and product-tier contexts.
2. **Hue is a location marker.** Red means you are in IZI's territory. Blue means EON. Violet means OMNI.
   Because hue means something, it can't be spent decoratively anywhere else.
3. **Restraint is the premium signal.** One signature moment (§6). Everything else is spacing, hairlines,
   and typographic discipline executed exactly.

---

## 1. Monochrome tokens

```css
:root {
  /* Ground */
  --void:            #07080A;   /* page base — not pure black; keeps hairlines readable */
  --surface:         #0D0F12;   /* section washes, panels */
  --surface-raised:  #14171B;   /* hover states, inputs, nested panels */
  --surface-invert:  #FFFFFF;   /* primary button ground */

  /* Hairlines — structure carries the design, so these matter more than usual */
  --line:            rgba(255,255,255,0.09);
  --line-strong:     rgba(255,255,255,0.18);
  --line-emphasis:   rgba(255,255,255,0.32);

  /* Type */
  --text:            #F2F4F5;   /* headings, primary body */
  --text-secondary:  #9CA3A9;   /* running body, descriptions */
  --text-tertiary:   #656B72;   /* captions, meta, mono eyebrows */
  --text-invert:     #07080A;   /* on --surface-invert */

  /* Focus — always achromatic, always visible */
  --focus:           #FFFFFF;
}
```

Rules

- `--void` is the default page ground. `--surface` is used sparingly, for at most two sections per page —
  it's a rhythm device, not a card style.
- Never pure `#000` and never pure `#FFF` for large fills other than the primary button.
- Body copy is `--text-secondary`. Reserve `--text` for headings and single emphasized lines.
  This one habit does most of the work in making the page feel designed rather than generated.
- Elevation is expressed as a hairline plus a 1px inner top highlight (`inset 0 1px 0 rgba(255,255,255,0.06)`).
  Drop shadows are essentially absent; on near-black they only produce mud.

---

## 2. Tier hues

Each tier gets three values: a **core** (light source and graphics only), a **glow** (the only variant
allowed to carry text or a visible 1px line), and a **deep** (gradient falloff toward the ground).

```css
--izi-core:   #FF3B14;  --izi-glow:   #FF7A45;  --izi-deep:   #5C1000;  /* fire */
--eon-core:   #1E6BFF;  --eon-glow:   #4FC3FF;  --eon-deep:   #061C4D;  /* electricity */
--omni-core:  #7C3AFF;  --omni-glow:  #B58CFF;  --omni-deep:  #230A52;  /* intelligence */
```

**Where hue is allowed**

| Allowed | Not allowed |
|---|---|
| Hero canvas / background field | Any button, in any state |
| A single hairline top rule on a tier panel or table column | Nav, links, active nav state |
| Tier eyebrow label, mono, ≥12px, **glow** variant only | Body text, headings |
| Radial glow behind a tier panel, ≤14% opacity | Card fills, chips, badges, tags |
| Selected/active state inside a tier-scoped comparison | Icons, dividers, footers, form focus rings |
| Data-visualization strokes on a tier page | Gradient text of any kind |

**Hard constraints**

- **One hue per viewport.** The only exception is the progression section on `/` and the comparison table
  on `/products`, where all three appear as three clearly separated fields or columns.
- Core values are light sources, never text. Contrast on `--void`: cores land near 3–4:1 and fail AA for
  body text. Glows land above 6:1 and pass. Enforce this in code review, not by eye.
- Hue at large scale is always a **radial** falloff toward `--void`, never a linear two-stop gradient,
  and never at an angle. The 135° purple-to-blue diagonal is the single most recognizable AI-generated
  artifact in existence and is banned outright.
- Maximum hue coverage on any tier page: roughly the top 40vh. Below the fold the page returns to monochrome.
- Never tint the logo, the header, or any text with a tier hue.

**Gradient recipe** (the only sanctioned large-field treatment):

```css
background:
  radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--tier-core) 26%, transparent) 0%, transparent 62%),
  radial-gradient(70% 50% at 50% 8%, color-mix(in oklab, var(--tier-deep) 55%, transparent) 0%, transparent 70%),
  var(--void);
```

Overlay a 2–3% monochrome film grain across the whole field. Grain is what stops a dark gradient from
looking like a template — it reads as physical, and it hides banding on cheap panels.

---

## 3. Typography

Three roles, three faces. None of them is the default a generic build would reach for.

| Role | Face | Use |
|---|---|---|
| **Display** | **Satoshi** (Fontshare) 500 / 700 | Headlines, tier names, section openers, buttons |
| **Reading** | **Instrument Sans** (Google) 400 / 500 | Body copy, descriptions, form labels, long-form pages |
| **Utility** | **IBM Plex Mono** (Google) 400 / 500 | Eyebrows, era labels, capacity specs, prices, table headers, deployment steps |

Why this pairing: Satoshi is a geometric grotesque with slightly squared terminals — it echoes the
angular, monolinear construction of the wordmark, which no humanist face would. Instrument Sans is
narrower and a touch more editorial, so paragraphs read as a different voice from the headlines instead of
the same font at a smaller size. IBM Plex Mono supplies the instrument-panel register the brand needs and
is warmer than the developer-default monos. If only one sans can be loaded, use Satoshi throughout and
carry the display/body distinction on weight, tracking, and measure.

### Scale

Desktop values; interpolate with `clamp()` down to the mobile values.

```
display-xl   76 / 0.94 / -0.035em   500    hero headline           (mobile 40 / 1.02)
display-l    56 / 1.00 / -0.030em   500    section openers         (mobile 34 / 1.08)
display-m    40 / 1.08 / -0.025em   500    tier names, sub-heroes  (mobile 28 / 1.14)
heading      28 / 1.20 / -0.020em   500    subsection heads        (mobile 22)
subhead      22 / 1.35 / -0.010em   400    lead paragraphs         (mobile 19)
body-l       19 / 1.60 /  0         400    primary body            (mobile 17)
body         17 / 1.65 /  0         400    dense body, forms       (mobile 16)
small        15 / 1.55 /  0         400    captions, legal         (mobile 14)
eyebrow      12 / 1.00 /  0.14em    500    MONO, UPPERCASE
data-l       32 / 1.10 / -0.010em   400    MONO, tabular figures
data         15 / 1.40 /  0.010em   400    MONO, spec strips, prices
```

Rules

- Negative tracking on display sizes is not optional — untracked large type is what makes a dark page look
  templated. Never letterspace lowercase text positively.
- Uppercase + wide tracking appears **only** in mono eyebrows and table headers. Never an uppercase headline.
- Measure: 60–72 characters for body, 20–28 characters for display headlines. Force display line breaks
  deliberately with a wrapper and `text-wrap: balance` — never let a hero headline break where the
  viewport decides.
- All figures in mono with `font-variant-numeric: tabular-nums`. This includes prices (₹1.5 lakh),
  capacity ranges (5–15 users), and phone numbers. Money and counts should look measured.
- Use real en dashes in ranges, `·` as an inline separator, `₹` never spaced from its figure.
- No italics except the one permitted display moment: the manifesto line on `/about`, set once, in Satoshi 500.
- No text shadows. No gradient text. No outline/stroked text.

---

## 4. Space, grid, radius

```css
--s-1: 4px;   --s-2: 8px;   --s-3: 12px;  --s-4: 16px;  --s-5: 24px;
--s-6: 32px;  --s-7: 48px;  --s-8: 64px;  --s-9: 96px;  --s-10: 128px; --s-11: 160px;

--max-shell:   1440px;
--max-content: 1200px;
--max-prose:   680px;

--radius-sm: 2px;   /* buttons, inputs, chips */
--radius-md: 4px;   /* panels, tier cards */
--radius-lg: 6px;   /* the largest radius on the site */
```

- 12-column grid. Gutters: 20px mobile, 32px tablet, 48px desktop. Outer margin: 24 / 40 / 72.
- Section vertical rhythm: `--s-11` (160) desktop, `--s-9` (96) tablet, `--s-8` (64) mobile.
  One rhythm, applied consistently. Define it on a single `.section` class and never override per-section —
  competing padding selectors are the most common source of a page that feels subtly wrong.
- **Asymmetry is the default.** Content sits in columns 1–7 or 2–8, with the mono meta column at 9–12.
  Full-width centered layout is reserved for the hero and the final CTA. Nothing else on the site is centered.
- Radii stay tiny. Near-square corners read as engineered; 16px pill corners read as consumer SaaS.
- Section boundaries are `1px solid var(--line)` full-bleed rules — no gaps, no gradients, no dividers with
  ornament. Occasionally extend a vertical hairline from a section rule down through the content column
  to tie the grid together; this is the system's quiet signature.

---

## 5. Components

**Buttons** — three variants, all achromatic, all `--radius-sm`, height 48 (desktop) / 44 (mobile),
horizontal padding `--s-5`, Satoshi 500, 16px, no uppercase, no icon unless the icon is a directional arrow.

| Variant | Rest | Hover | Focus |
|---|---|---|---|
| Primary | `--surface-invert` bg, `--text-invert` label | bg `#E8EAEB`, translateY(-1px) | 2px `--focus` ring, 2px offset |
| Secondary | transparent, `1px solid --line-strong`, `--text` | border `--line-emphasis`, bg `rgba(255,255,255,0.04)` | same ring |
| Quiet | text only, `--text-secondary`, arrow | `--text`, arrow shifts 3px right | same ring |

No button ever carries a tier hue, a gradient, or a glow. Disabled = 40% opacity, no cursor change beyond
`not-allowed`.

**Header** — 68px, `--void` at 88% with `backdrop-filter: blur(12px)`, bottom hairline that only appears
after 24px of scroll. Left: mark + wordmark. Center or right: nav in Instrument Sans 15px
`--text-secondary`, active item goes `--text` with a 1px underline offset 6px — never a hue.
Far right: one primary button. Mobile: full-screen panel, `--void`, links at display-m, staggered in at
40ms intervals, focus trapped, `Esc` closes.

**Tier panel** — the site's most repeated composition:

```
┌──────────────────────────────────────────────┐  ← 1px top rule in --tier-core
│  FIRE · 3000 BCE                             │  mono eyebrow, --tier-glow
│                                              │
│  IZI                                         │  display-m, --text
│  Ignite your business.                       │  subhead, --text-secondary
│                                              │
│  ────────────────────────────────────────    │  --line
│  SETUP              ₹1.5 lakh                │  mono label / mono figure
│  SUPPORT            ₹1 lakh / year           │
│  USERS              5–15                     │
│  CONVERSATIONS      100–500 / day            │
│  MESSAGES           1,000–3,000 / day        │
│  ────────────────────────────────────────    │
│                                              │
│  [ Book a demo ]        View IZI →           │
└──────────────────────────────────────────────┘
   radial --tier-core glow behind, ≤14% opacity, top-anchored
```

The spec strip is a real readout, not decoration — mono, tabular, hairline-separated, left labels in
`--text-tertiary`, right figures in `--text`. It is the single most brand-appropriate component on the
site and should appear on every product surface.

**Era labels** — the structural device that replaces generic `01 / 02 / 03` numbering.
`FIRE · 3000 BCE`, `ELECTRICITY · 1879`, `INTELLIGENT SYSTEMS · NOW`. Mono eyebrow, tier glow.
Sequence markers are permitted **only** on `/how-it-works`, where the steps are genuinely ordered.

**Comparison table** — hairline grid, no zebra striping, no shadows, sticky header row on scroll.
Column headers: mono uppercase, with a 1px top rule in that column's tier core — the only hue in the table.
Cells monochrome; presence marked with a small filled square (`--text`), absence with an em dash
(`--text-tertiary`). No checkmark icons, no "most popular" badge, no highlighted column.

**Forms** — `--surface-raised` fill, `1px solid --line`, `--radius-sm`, height 48, label above in
Instrument Sans 15 `--text-secondary`. Focus: border `--line-emphasis` + 2px white ring, **never a hue**.
Errors: mono 13px, `--izi-glow`, below the field — this is the one functional use of a tier color outside
tier context, and it is deliberate: the error color is fire. Required fields marked in the label, never
with a bare asterisk.

**Footer** — three columns: wordmark + one-line positioning · routes · contact block with both emails,
phone, WhatsApp demo, and "HSR Layout, Bangalore." Hairline top rule, `--text-tertiary`, no social icon
row, no newsletter capture, no back-to-top button.

---

## 6. The signature: The Continuum

One WebGL/canvas hero on `/`. This is where all the boldness is spent, and nothing else on the site
competes with it.

**Concept.** A single particle field passes through the three energy states the brand is built on. It is
the same matter throughout — only its organization changes. That's the argument: fire, electricity, and
intelligence are the same story at three levels of order.

```
State 1 — FIRE          ~2,000 particles, curl-noise turbulence, rising, dispersing.
                        Emission --izi-core → --izi-glow. Chaotic, unstructured, warm.

State 2 — ELECTRICITY   Particles snap onto an irregular lattice. Short arcs jump between
                        nearest neighbors on a stochastic timer. --eon-core → --eon-glow.
                        Ordered but unstable; energy travels, it doesn't yet decide.

State 3 — INTELLIGENCE  The lattice resolves into a directed graph that breathes slowly.
                        Nodes illuminate in sequence along edges, like a message being
                        routed and answered. --omni-core → --omni-glow. Ordered and purposeful.
```

**Behavior.** Scroll-scrubbed across the hero's height, plus a slow autonomous drift so the field is alive
when static. Pointer position applies a gentle attractor within a ~180px radius — noticeable, never playful.
Transitions between states are morphs of the same particle positions, 1.6s, `cubic-bezier(0.16,1,0.3,1)`.
The field is bottom-anchored and fades to `--void` before the headline's baseline, so type always sits on
clean ground. The headline never overlaps a bright region.

**Constraints.** Additive blending only, no post-processing bloom. No visible geometry, no wireframe globe,
no rotating sphere, no floating cubes, no neural-network diagram with labeled nodes. Nothing in the field
should be nameable as an object.

**Degradation** — non-negotiable, spec'd in `claude.md` §10.
`prefers-reduced-motion`, WebGL failure, low core count, or viewport < 768px all render a **static still of
State 3** as an optimized image plus the CSS gradient recipe from §2, in violet. The still is generated
from the real canvas, never illustrated separately. The hero is a post-LCP dynamic import; the still is
what paints first, always.

**Elsewhere.** Product pages get the §2 gradient in their own hue with grain — no canvas, no second
animation. There is exactly one Continuum on the site.

---

## 7. Motion

```
--dur-fast:  120ms    /* hover, focus, color change */
--dur-base:  220ms    /* buttons, field states, nav */
--dur-slow:  360ms    /* panel and menu transitions */
--dur-reveal: 620ms   /* scroll entrances */

--ease-out:  cubic-bezier(0.16, 1, 0.30, 1);    /* entrances, morphs */
--ease-ui:   cubic-bezier(0.40, 0, 0.20, 1);    /* interactive states */
```

- Scroll entrance: `opacity 0 → 1` with `translateY(12px → 0)`, `--dur-reveal`, `--ease-out`,
  60ms stagger, threshold 0.2, **fires once**. Never re-animate on scroll-up.
- Hover on panels: border `--line` → `--line-strong` and a ≤4% background lift. No scale, no lift beyond 1px,
  no glow bloom.
- Page transitions: 180ms cross-fade at most, or none. No wipes, no curtains, no loading screens.
- **Prohibited:** scroll-jacking, pinned horizontal sections, counting-up numbers, typewriter text,
  marquee logo strips, parallax on more than one layer, bounce/elastic easing, spring physics on anything,
  cursor-following blobs, magnetic buttons, scroll-triggered video scrub, text that assembles letter by letter.
- `prefers-reduced-motion: reduce` removes all transforms and canvas motion; state changes become instant
  opacity swaps. Test this path as a first-class rendering, not a fallback.

---

## 8. Imagery and icons

- **No stock photography.** No 3D blobs, chrome spheres, glass orbs, glowing brains, circuit-board
  overlays, abstract node graphs, robot hands, humanoid faces, or holographic city renders.
- **Icons are near-absent.** If one is unavoidable, it's a 1.25px-stroke geometric glyph drawn in-house,
  16 or 20px, `--text-secondary`, and it never carries a hue. Ship no icon library.
- The only permitted photography, ever, is real product screenshots at real fidelity, on `--surface`, with a
  hairline border and a mono caption. Until those exist, the OS is represented by spec strips and type.
- The oversized mark at ≤4% opacity, cropped by a section edge, is the sanctioned structural graphic.
- Film grain at 2–3% may sit over hue fields. Nowhere else.

---

## 9. Anti-slop rules

Any of these fails review, independent of execution quality.

**Layout**
1. Bento grids. Six-to-nine unequal rounded cards in a mosaic.
2. Three equal columns of icon + heading + two lines ("Fast · Secure · Scalable").
3. Everything centered. Beyond the hero and final CTA, the site is left-aligned and asymmetric.
4. Glassmorphism — frosted translucent cards floating over a blurred gradient.
5. Feature cards with a colored icon chip in the top-left corner.
6. A "logos of companies we work with" strip. There are none. Don't imply otherwise.

**Color**
7. Any linear/diagonal gradient as a surface. Radial falloff only, per §2.
8. Gradient text, gradient borders, gradient buttons.
9. Neon glow on text or UI. Glow belongs to the canvas.
10. Hue in chrome — colored nav states, colored links, colored buttons, colored footers.
11. More than one tier hue in a viewport outside the two sanctioned comparison moments.
12. Purple-to-blue at 135°. Also indigo-to-cyan, violet-to-pink, and every other variant of it.

**Type**
13. Inter, Geist, Poppins, Montserrat, or a system-stack default as the display face.
14. Untracked display type. Uppercase headlines. Positively letterspaced lowercase.
15. Headline over a busy area of the canvas.

**Copy**
16. Any banned word from `claude.md` §3.
17. Emoji, anywhere, including as bullets or section markers.
18. Invented statistics, testimonials, customer counts, or "as featured in."
19. A mocked-up dashboard populated with fabricated numbers.
20. `01 / 02 / 03` numbering on content that isn't a sequence. Use era labels (§5).

**Motion**
21. Anything in the §7 prohibited list.
22. More than one ambient animation on a page.

---

## 10. Accessibility floor

- WCAG 2.2 AA throughout. Body text ≥ 4.5:1, large display ≥ 3:1, hairlines exempt but never load-bearing
  for meaning.
- Tier cores fail as text and are forbidden from carrying it. Glows are verified passing on `--void`.
- `:focus-visible` on every interactive element: 2px `--focus`, 2px offset, `--radius-sm`. Never removed,
  never hue-tinted, never replaced by a subtle border change.
- Full keyboard path: skip link → header → nav → content → footer. Mobile menu traps focus and closes on `Esc`.
- Canvas is `aria-hidden` and purely decorative; the hero's meaning lives entirely in the text.
- Every field has a real `<label>`. Errors are announced via `aria-live="polite"` and tied with
  `aria-describedby`. Never placeholder-as-label.
- Touch targets ≥ 44×44px. Tested at 360px with 200% text zoom and no horizontal scroll.

---

## 11. Build order

1. `tokens.css` from §1–§4, verbatim. Nothing else starts until this exists.
2. Type scale and a specimen page — render every scale step in place and correct the tracking by eye at
   1440 and 390 before building components.
3. Shell: header, footer, `.section` rhythm, grid container, section hairlines.
4. Primitives: Button, Field, SpecStrip, TierPanel, ComparisonTable.
5. `/` without the canvas, using the static gradient. The home page must be excellent before any
   animation exists — if it isn't, the canvas is compensating.
6. The Continuum, as a post-LCP dynamic import, with the still shipped first.
7. Remaining routes, product children last so the TierPanel is fully settled.
8. Audit against `claude.md` §11 and §9 above. Then remove one element per page.
