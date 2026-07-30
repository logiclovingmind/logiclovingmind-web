"use client";

import { useEffect, useRef } from "react";

type SaveDataNavigator = Navigator & { connection?: { saveData?: boolean } };

/**
 * The hero film — the mark with the three tier hues circling it.
 *
 * The element ships with a poster but no source, so the markup renders the
 * still on its own: no JavaScript, reduced motion and Save-Data all keep the
 * poster and never pull the loop. The poster is frame 0 of that same loop, so
 * when the video does attach there is nothing to fade and nothing shifts.
 */
export function HeroFilm() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ((navigator as SaveDataNavigator).connection?.saveData) return;

    const attach = () => {
      video.src = "/hero/continuum.mp4";
      // A refused autoplay is not an error worth surfacing; the poster stays.
      void video.play().catch(() => {});
    };

    const idle =
      window.requestIdleCallback?.(attach) ?? window.setTimeout(attach, 200);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, []);

  return (
    <div className="hero-media" aria-hidden="true">
      <video
        ref={ref}
        poster="/hero/continuum-poster.jpg"
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
      />
    </div>
  );
}
