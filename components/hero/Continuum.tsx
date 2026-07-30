"use client";

import { useEffect, useRef } from "react";

type Lobe = { x: number; y: number; r: number; sp: number; ph: number };

const LOBE_COUNT = 5;
const GLOW_GAIN = 1;
const POINTER_RADIUS = 280;

function readRgb(styles: CSSStyleDeclaration, token: string): [number, number, number] {
  const raw = styles.getPropertyValue(token).trim();
  const hex = raw.replace("#", "");
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
}

/**
 * The Continuum. A slow field of overlapping radial emissions in OMNI's hue,
 * scroll-scrubbed with an autonomous drift so it stays alive when static.
 * Additive blending only, no nameable geometry. design.md §6.
 */
export default function Continuum() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(canvas);
    const core = readRgb(styles, "--color-omni-core");
    const glow = readRgb(styles, "--color-omni-glow");

    const lobes: Lobe[] = Array.from({ length: LOBE_COUNT }, (_, i) => ({
      x: 0.5 + Math.sin(i * 2.399) * 0.34,
      y: 0.74 + Math.cos(i * 1.913) * 0.18,
      r: 0.34 + (((i * 17) % 11) / 11) * 0.3,
      sp: 0.05 + (((i * 7) % 13) / 13) * 0.07,
      ph: i * 1.618,
    }));

    let raf = 0;
    let visible = true;
    let pointer: { x: number; y: number } | null = null;
    const start = performance.now();

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const rgba = (c: [number, number, number], a: number) =>
      `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;

      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      const targetW = Math.round(width * dpr);
      if (canvas.width !== targetW) {
        canvas.width = targetW;
        canvas.height = Math.round(height * dpr);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const t = (performance.now() - start) / 1000;
      const host = canvas.parentElement?.getBoundingClientRect();
      if (!host) return;

      const scrubbed = Math.min(
        1,
        Math.max(
          0,
          (-host.top + window.innerHeight * 0.25) /
            Math.max(1, host.height + window.innerHeight * 0.25),
        ),
      );
      const phase = Math.max(
        0,
        Math.min(2, scrubbed * 2.1 + Math.sin(t * 0.11) * 0.06 + 0.05),
      );
      const smooth = (x: number) => {
        const c = Math.min(1, Math.max(0, x));
        return c * c * (3 - 2 * c);
      };
      const settle = smooth(phase - 1);
      const base = Math.min(width, height) * 1.2;

      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < lobes.length; i++) {
        const lobe = lobes[i];
        const breathe = 0.7 + 0.3 * Math.sin(t * lobe.sp * 2.3 + lobe.ph);
        let cx = (lobe.x + Math.sin(t * lobe.sp + lobe.ph) * 0.07) * width;
        let cy =
          (lobe.y +
            Math.cos(t * lobe.sp * 0.8 + lobe.ph * 1.7) * 0.05 * (1 - settle * 0.5)) *
          height;

        if (pointer) {
          const dx = pointer.x - cx;
          const dy = pointer.y - cy;
          const dist = Math.hypot(dx, dy);
          if (dist < POINTER_RADIUS) {
            const pull = (1 - dist / POINTER_RADIUS) * 0.18;
            cx += dx * pull;
            cy += dy * pull;
          }
        }

        const radius = base * lobe.r * (0.62 + breathe * 0.5);
        const colour = i % 2 ? glow : core;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, rgba(colour, 0.15 * GLOW_GAIN * breathe));
        gradient.addColorStop(0.42, rgba(colour, 0.055 * GLOW_GAIN * breathe));
        gradient.addColorStop(1, rgba(colour, 0));

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 block h-full w-full"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 26%, #000 58%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 26%, #000 58%)",
      }}
    />
  );
}
