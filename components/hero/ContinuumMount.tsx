"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Continuum = dynamic(() => import("./Continuum"), { ssr: false });

/**
 * Gate for the hero canvas. The static gradient behind it is what paints first;
 * this only ever mounts after the page is interactive, and never on the paths
 * claude.md §10 rules out: reduced motion, narrow viewports, low core count,
 * or a missing 2D context.
 */
export function ContinuumMount() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;
    if ((navigator.hardwareConcurrency ?? 8) <= 4) return;
    if (!document.createElement("canvas").getContext("2d")) return;

    const idle =
      window.requestIdleCallback?.(() => setEnabled(true)) ??
      window.setTimeout(() => setEnabled(true), 200);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, []);

  if (!enabled) return null;
  return <Continuum />;
}
