"use client";

import { useEffect, useRef } from "react";

/** Simulation grid resolution, in CSS pixels per cell. */
const CELL = 4;

/** Offsets into the charge, in ms: when a bolt is drawn and for how long. */
const STRIKES = [
  { at: 0, hold: 70, forks: 3 },
  { at: 130, hold: 45, forks: 1 },
  { at: 300, hold: 80, forks: 2 },
  { at: 385, hold: 40, forks: 1 },
  { at: 560, hold: 95, forks: 3 },
  { at: 720, hold: 55, forks: 2 },
] as const;

type Point = { x: number; y: number };

/**
 * Burns and then electrifies the accent word.
 *
 * Both stages are drawn rather than styled, because neither can be faked with
 * a shadow: fire needs a silhouette that churns independently of the glyphs,
 * and lightning needs actual branching geometry. The fire is a heat-advection
 * grid seeded from the letterforms themselves, so the flame rises off the
 * shape of the word. The bolts are midpoint-displaced paths struck through it.
 *
 * Everything is drawn in white and composited with `screen`, so the effect can
 * only ever add light — it cannot introduce a hue or darken the word.
 */
export function AccentFlare({
  startMs,
  fireMs,
  voltMs,
}: {
  startMs: number;
  fireMs: number;
  voltMs: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const accent = canvas?.parentElement;
    const word = accent?.querySelector<HTMLElement>(".reveal-em");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !accent || !word || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const flash = document.querySelector<HTMLElement>(".ambient-flash");

    let gridW = 0;
    let gridH = 0;
    let cssW = 0;
    let cssH = 0;
    let heat = new Float32Array(0);
    let seed = new Float32Array(0);
    let grid: HTMLCanvasElement | null = null;
    let gridCtx: CanvasRenderingContext2D | null = null;
    let image: ImageData | null = null;

    const build = () => {
      const box = canvas.getBoundingClientRect();
      cssW = box.width;
      cssH = box.height;
      if (cssW < 8 || cssH < 8) return false;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;

      gridW = Math.max(16, Math.round(cssW / CELL));
      gridH = Math.max(16, Math.round(cssH / CELL));
      heat = new Float32Array(gridW * gridH);
      seed = new Float32Array(gridW * gridH);

      grid = document.createElement("canvas");
      grid.width = gridW;
      grid.height = gridH;
      gridCtx = grid.getContext("2d", { willReadFrequently: true });
      if (!gridCtx) return false;
      image = gridCtx.createImageData(gridW, gridH);

      // The emitter is the word itself, redrawn at grid resolution and read
      // back as an alpha mask, so every letter is its own source of flame.
      const style = getComputedStyle(word);
      const wordBox = word.getBoundingClientRect();
      const scale = gridW / cssW;
      gridCtx.setTransform(scale, 0, 0, scale, 0, 0);
      gridCtx.font = `${style.fontWeight} ${parseFloat(style.fontSize)}px ${style.fontFamily}`;
      gridCtx.textAlign = "center";
      gridCtx.textBaseline = "middle";
      gridCtx.fillStyle = "#fff";
      gridCtx.fillText(
        word.textContent ?? "",
        wordBox.left - box.left + wordBox.width / 2,
        wordBox.top - box.top + wordBox.height / 2,
      );
      const mask = gridCtx.getImageData(0, 0, gridW, gridH).data;
      for (let i = 0; i < seed.length; i++) seed[i] = mask[i * 4 + 3] / 255;
      gridCtx.setTransform(1, 0, 0, 1, 0, 0);
      return true;
    };

    // Each cell pulls from the one below it with a random sideways drift, which
    // is what makes the column wander and split the way a flame does.
    const burn = (intensity: number) => {
      for (let y = 0; y < gridH - 1; y++) {
        const row = y * gridW;
        const below = row + gridW;
        for (let x = 0; x < gridW; x++) {
          let sx = x + ((Math.random() * 3) | 0) - 1;
          if (sx < 0) sx = 0;
          else if (sx >= gridW) sx = gridW - 1;
          const v = heat[below + sx] - (Math.random() * 0.13 + 0.02);
          heat[row + x] = v > 0 ? v : 0;
        }
      }
      if (intensity <= 0) return;
      for (let i = 0; i < seed.length; i++) {
        if (seed[i] < 0.3) continue;
        const v = seed[i] * intensity * (0.75 + Math.random() * 0.25);
        if (v > heat[i]) heat[i] = v;
      }
    };

    const paintFire = () => {
      const data = image!.data;
      let sum = 0;
      for (let i = 0; i < heat.length; i++) {
        const h = heat[i];
        sum += h;
        const a = h * h * 320;
        const p = i * 4;
        data[p] = 255;
        data[p + 1] = 255;
        data[p + 2] = 255;
        data[p + 3] = a > 255 ? 255 : a;
      }
      gridCtx!.putImageData(image!, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      // Upscaling the coarse grid is what softens the cells into flame.
      ctx.drawImage(grid!, 0, 0, cssW, cssH);
      return sum / heat.length;
    };

    const makeBolt = (from: Point, to: Point, spread: number) => {
      let pts: Point[] = [from, to];
      let offset = spread;
      for (let pass = 0; pass < 5; pass++) {
        const next: Point[] = [pts[0]];
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1];
          const b = pts[i];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.hypot(dx, dy) || 1;
          const push = (Math.random() - 0.5) * offset;
          next.push({
            x: (a.x + b.x) / 2 - (dy / len) * push,
            y: (a.y + b.y) / 2 + (dx / len) * push,
          });
          next.push(b);
        }
        pts = next;
        offset *= 0.55;
      }
      return pts;
    };

    const drawBolt = (pts: Point[], scale: number) => {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#fff";
      ctx.shadowColor = "#fff";

      // Three passes: a wide bloom, the body, then a hot core drawn last so the
      // centre of the bolt stays a hard white line.
      const passes: [number, number, number][] = [
        [14 * scale, 0.1, 26 * scale],
        [4.5 * scale, 0.45, 12 * scale],
        [1.6 * scale, 1, 0],
      ];
      for (const [width, alpha, blur] of passes) {
        ctx.lineWidth = width;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = blur;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const strike = (forks: number) => {
      const wordBox = word.getBoundingClientRect();
      const box = canvas.getBoundingClientRect();
      const targetX = wordBox.left - box.left + Math.random() * wordBox.width;
      const targetY = wordBox.top - box.top + wordBox.height * 0.55;
      const scale = Math.max(0.55, cssW / 520);

      const main = makeBolt(
        { x: targetX + (Math.random() - 0.5) * cssW * 0.5, y: 0 },
        { x: targetX, y: targetY },
        cssW * 0.22,
      );
      drawBolt(main, scale);

      for (let f = 0; f < forks; f++) {
        const root = main[Math.floor(main.length * (0.2 + Math.random() * 0.6))];
        drawBolt(
          makeBolt(
            root,
            {
              x: root.x + (Math.random() - 0.5) * cssW * 0.55,
              y: root.y + Math.random() * cssH * 0.3,
            },
            cssW * 0.1,
          ),
          scale * 0.6,
        );
      }
    };

    let raf = 0;
    let t0 = 0;
    let ready = false;
    let fonts = false;
    let lastFlare = -1;

    // The word's own glow is a CSS expression of this one number, so the
    // stylesheet owns how it looks and the simulation only says how hot it is.
    const setFlare = (v: number) => {
      if (Math.abs(v - lastFlare) < 0.02) return;
      lastFlare = v;
      accent.style.setProperty("--flare", v.toFixed(3));
    };

    const finish = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      ctx.clearRect(0, 0, cssW, cssH);
      canvas.style.display = "none";
      accent.style.removeProperty("--flare");
      if (flash) flash.style.opacity = "0";
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const t = performance.now() - t0;
      if (!ready) {
        if (!fonts) return;
        ready = build();
        if (!ready) return;
      }

      if (t < fireMs) {
        const p = t / fireMs;
        // Held, then withdrawn, so the fire burns itself out into the charge
        // rather than being switched off.
        burn(p < 0.62 ? 1 : Math.max(0, 1 - (p - 0.62) / 0.38));
        setFlare(Math.min(1, 0.2 + paintFire() * 9));
        return;
      }

      const vt = t - fireMs;
      if (vt < voltMs) {
        ctx.clearRect(0, 0, cssW, cssH);
        const hit = STRIKES.find((s) => vt >= s.at && vt < s.at + s.hold);
        if (!hit) {
          setFlare(0.06);
          if (flash) flash.style.opacity = "0";
          return;
        }
        strike(hit.forks);
        setFlare(1);
        // Capped well under the WCAG 2.3.1 flash threshold: at this opacity the
        // field never gets bright enough for the cuts to count as flashes.
        if (flash) flash.style.opacity = (0.05 + Math.random() * 0.04).toFixed(3);
        return;
      }

      finish();
    };

    document.fonts.ready.then(() => {
      fonts = true;
    });

    let stopped = false;
    const begin = () => {
      if (stopped) return;
      t0 = performance.now();
      raf = requestAnimationFrame(frame);
    };

    // Anchored to the wipe rather than to a clock. CSS animation delays are
    // measured from the element's first style resolution, not from navigation,
    // so any timer started here would run however early the page took to
    // paint. This animation ends on the exact frame the word lands.
    const wipe = accent
      .querySelector(".reveal-word")
      ?.getAnimations()
      .find((a) => (a as { animationName?: string }).animationName === "llmAccentClip");

    let fallback = 0;
    if (wipe) void wipe.finished.then(begin).catch(() => {});
    else fallback = window.setTimeout(begin, startMs);

    return () => {
      stopped = true;
      if (fallback) clearTimeout(fallback);
      if (raf) cancelAnimationFrame(raf);
      accent.style.removeProperty("--flare");
      if (flash) flash.style.opacity = "0";
    };
  }, [startMs, fireMs, voltMs]);

  return <canvas ref={ref} className="accent-flare" aria-hidden="true" />;
}
