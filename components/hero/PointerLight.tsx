"use client";

import { useEffect } from "react";

const REST_X = 50;
const REST_Y = 104;
/** How far the source is allowed to travel, in percent of the viewport. */
const SWING_X = 13;
const SWING_Y = 14;

/**
 * Drifts the ambient light source toward the pointer, so the screen reads as
 * lit rather than printed. Fine pointers only — on touch the field is static,
 * since there is no cursor to follow and the source would snap on every tap.
 */
export function PointerLight() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let targetX = REST_X;
    let targetY = REST_Y;
    let x = REST_X;
    let y = REST_Y;
    let frame = 0;

    const tick = () => {
      x += (targetX - x) * 0.07;
      y += (targetY - y) * 0.07;
      root.style.setProperty("--light-x", `${x.toFixed(2)}%`);
      root.style.setProperty("--light-y", `${y.toFixed(2)}%`);

      const settled =
        Math.abs(targetX - x) < 0.04 && Math.abs(targetY - y) < 0.04;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      targetX = REST_X + (event.clientX / window.innerWidth - 0.5) * 2 * SWING_X;
      targetY = REST_Y - (1 - event.clientY / window.innerHeight) * SWING_Y;
      start();
    };

    const onLeave = () => {
      targetX = REST_X;
      targetY = REST_Y;
      start();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty("--light-x");
      root.style.removeProperty("--light-y");
    };
  }, []);

  return null;
}
