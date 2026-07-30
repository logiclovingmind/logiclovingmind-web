"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type SaveDataNavigator = Navigator & { connection?: { saveData?: boolean } };

/**
 * The tier's own footage, held behind the section and woken by the pointer.
 *
 * Nothing is fetched until the first hover, so the section costs nothing to
 * anyone who never reaches for it. CSS gates the layer to fine-pointer, wide
 * viewports and fades it; this only mirrors that gate so the bytes follow the
 * pixels, and drives play/pause so a section nobody is looking at is not
 * decoding frames.
 */
export function TierFilm({ src, max }: { src: string; max: number }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const section = video?.closest("section");
    if (!video || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if ((navigator as SaveDataNavigator).connection?.saveData) return;

    const wake = () => {
      if (!video.src) video.src = src;
      // A refused autoplay leaves the layer dark, which is the resting state.
      void video.play().catch(() => {});
    };
    const rest = () => video.pause();

    section.addEventListener("pointerenter", wake);
    section.addEventListener("pointerleave", rest);
    return () => {
      section.removeEventListener("pointerenter", wake);
      section.removeEventListener("pointerleave", rest);
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
