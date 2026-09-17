# logiclovingmind.com

Marketing site and portfolio for Logic Loving Mind, an AI automation studio.

Live at **[logiclovingmind.com](https://logiclovingmind.com)**.

## What it is

A monochrome site in two parts, both built to the same brief of restraint:

- **The homepage** opens with the studio's one-line pitch over a continuous ambient
  field, then leads into a selection of live work before asking for the demo.
- **The `/work` portfolio** is the full catalogue — every system the studio ships,
  grouped as agent platforms, agents on WhatsApp, operating systems, products and
  sites. Each entry is live or readable line by line, and carries its real link
  (demo, public repo, or case study) rather than a process diagram.

The design brief is restraint. The work is unfamiliar to most people being sold to,
so the pages lead with plain sentences rather than feature grids, and the motion is
there to hold attention through the explanation, not to decorate it.

## Notable pieces

- **A continuous background field** rendered edge to edge across the whole document
  rather than per-section, so scrolling reads as one surface instead of stacked bands.
- **A custom motion layer** — reveal-on-enter headlines, a pointer-tracking light, an
  accent flare and a magnetic call-to-action — built directly rather than pulled from
  an animation library, to keep the bundle small.
- **A portfolio data model** in `content/work.ts`: every project carries a status tag
  (`Live`, `Public`, `Private`, `In progress`), detail bullets, a stack line and
  links. Private repos render as screen-share invites instead of dead anchors.
- **Privacy policy and terms pages**, which are a hard requirement for Meta WhatsApp
  Business API approval, not an afterthought.
- Applications submitted here route into DOMINIUS, the internal operating system that
  handles the pipeline from that point on.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Vercel

## Running it

```bash
npm install
npm run dev
```

## Deploying

```bash
vercel --prod
```

The project is already linked (`vercel link` was run), so a plain production deploy
picks up the correct project and domain.

## Layout

```
app/          routes, including /work, privacy and terms
components/   hero, motion primitives, magnetic button, header/footer nav
content/      site copy, motion config, legal text and the work catalogue,
              kept out of components
```