"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Pointer distance past the element's own edge that still pulls it. */
const REACH = 96;
const MAX_DRIFT = 9;

/**
 * Lets the single call to action lean toward the cursor. Fine pointers only:
 * on touch there is nothing to lean toward, and the element would jump under
 * the finger that is already pressing it.
 */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let box = el.getBoundingClientRect();

    const measure = () => {
      box = el.getBoundingClientRect();
    };

    const tick = () => {
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;

      const settled = Math.abs(targetX - x) < 0.05 && Math.abs(targetY - y) < 0.05;
      if (settled) {
        frame = 0;
        if (!targetX && !targetY) el.style.transform = "";
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      // The box moves with the element once it drifts, so the pull is measured
      // from where the element would sit at rest.
      const centreX = box.left + box.width / 2 - x;
      const centreY = box.top + box.height / 2 - y;
      const dx = event.clientX - centreX;
      const dy = event.clientY - centreY;
      const outside =
        Math.abs(dx) > box.width / 2 + REACH ||
        Math.abs(dy) > box.height / 2 + REACH;

      targetX = outside ? 0 : Math.max(-MAX_DRIFT, Math.min(MAX_DRIFT, dx * 0.3));
      targetY = outside ? 0 : Math.max(-MAX_DRIFT, Math.min(MAX_DRIFT, dy * 0.3));
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span ref={ref} className="magnetic">
      {children}
    </span>
  );
}
