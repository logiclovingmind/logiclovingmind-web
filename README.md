# logiclovingmind.com

Marketing site for Logic Loving Mind, an AI automation studio.

Live at **[logiclovingmind.com](https://logiclovingmind.com)**.

## What it is

A single monochrome page selling one thing: a WhatsApp AI agent that answers a property
enquiry in about five seconds, qualifies the buyer on budget and timeline, and books the
site visit into a calendar — without a human touching it.

The design brief was restraint. The product is unfamiliar to most of the people being
sold to, so the page leads with a plain sentence rather than a feature grid, and the
motion is there to hold attention through the explanation, not to decorate it.

## Notable pieces

- **A continuous background field** rendered edge to edge across the whole document
  rather than per-section, so scrolling reads as one surface instead of stacked bands.
- **A custom motion layer** — reveal-on-enter headlines, a pointer-tracking light, an
  accent flare and a magnetic call-to-action — built directly rather than pulled from an
  animation library, to keep the bundle small.
- **Tier films** that autoplay on hover and fall back to tap on touch devices.
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

## Layout

```
app/          routes, including privacy and terms
components/   hero, motion primitives, magnetic button
content/      site copy, motion config and legal text, kept out of components
```
