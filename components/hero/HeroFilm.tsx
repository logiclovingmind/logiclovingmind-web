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

    const GESTURES = ["pointerdown", "touchstart", "keydown"] as const;

    const stopRetrying = () => {
      document.removeEventListener("visibilitychange", resume);
      for (const type of GESTURES) window.removeEventListener(type, resume);
    };

    const resume = () => {
      if (!video.paused) return stopRetrying();
      void video.play().then(stopRetrying, () => {});
    };

    const attach = () => {
      video.src = "/hero/continuum.mp4";
      void video.play().catch(() => {});
      // iOS Low Power Mode and Android battery savers refuse autoplay outright,
      // which otherwise strands the poster for the whole session. These take the
      // first gesture or foregrounding that follows and try once more.
      document.addEventListener("visibilitychange", resume);
      for (const type of GESTURES)
        window.addEventListener(type, resume, { passive: true });
    };

    // Without a timeout an idle callback can be deferred indefinitely — a busy
    // main thread or a tab opened in the background never yields one.
    const idle =
      window.requestIdleCallback?.(attach, { timeout: 1200 }) ??
      window.setTimeout(attach, 200);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
      stopRetrying();
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
