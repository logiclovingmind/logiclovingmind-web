"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type SaveDataNavigator = Navigator & { connection?: { saveData?: boolean } };

/**
 * The tier's own footage, held behind the section and woken when the section
 * is the thing being read — by hover where there is a pointer, by scroll
 * position where there is not.
 *
 * Nothing is fetched until then, so a section nobody reaches costs nothing.
 * This also owns the visible state: it sets `data-film` on the section, which
 * is the only thing CSS fades on, and drives play/pause so a section nobody is
 * looking at is not decoding frames.
 */
export function TierFilm({ src, max }: { src: string; max: number }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const section = video?.closest("section");
    if (!video || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ((navigator as SaveDataNavigator).connection?.saveData) return;

    const wake = () => {
      section.dataset.film = "on";
      if (!video.src) video.src = src;
      // A refused autoplay leaves the layer dark, which is the resting state.
      void video.play().catch(() => {});
    };
    const rest = () => {
      delete section.dataset.film;
      video.pause();
    };

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      section.addEventListener("pointerenter", wake);
      section.addEventListener("pointerleave", rest);
      return () => {
        section.removeEventListener("pointerenter", wake);
        section.removeEventListener("pointerleave", rest);
        rest();
      };
    }

    // Touch has no hover to give, so scroll position stands in. The margins
    // light the section only once it holds the middle band of the viewport —
    // a ratio threshold would never fire on a section taller than the screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? wake() : rest()),
      { rootMargin: "-35% 0px -35% 0px" },
    );
    io.observe(section);
    return () => {
      io.disconnect();
      rest();
    };
  }, [src]);

  return (
    <div
      className="tier-film"
      aria-hidden="true"
      style={{ "--film-max": max } as CSSProperties}
    >
      <video ref={ref} muted loop playsInline preload="none" tabIndex={-1} />
    </div>
  );
}
