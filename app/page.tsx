import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { AccentFlare } from "@/components/hero/AccentFlare";
import { HeroFilm } from "@/components/hero/HeroFilm";
import { PointerLight } from "@/components/hero/PointerLight";
import { RevealHeadline } from "@/components/hero/RevealHeadline";
import { LinkButton } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { CONTACT, SITE } from "@/content/site";
import { OPEN, landAfter } from "@/content/motion";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.positioning,
  alternates: { canonical: "/" },
};

const WORDS = SITE.tagline.split(" ").length;
const LAND = landAfter(WORDS);

export default function HomePage() {
  return (
    <section
      // Closes the opening timeline: every delay after the headline is derived
      // from when its last word lands.
      style={{ "--word-count": WORDS } as CSSProperties}
      className="opening relative flex min-h-[calc(100svh-var(--header-h)-var(--footer-h))] flex-col items-center justify-center px-(--gutter) py-[clamp(48px,10vh,96px)] text-center"
    >
      {/* Fixed to the viewport rather than to this section, so the field runs
          under the header and the footer too. Scoped to the section it belongs
          to instead of the layout, so the legal pages stay plain. */}
      <div aria-hidden="true" className="ambient">
        <HeroFilm />
        <div className="ambient-scrim" />
        <div className="grain" />
        <div className="ambient-pulse" />
        <div className="ambient-flash" />
        <PointerLight />
      </div>

      <div className="relative flex w-full max-w-[860px] flex-col items-center">
        <RevealHeadline
          text={SITE.tagline}
          emphasize={SITE.taglineAccent}
          className="w-full text-balance"
          accentOverlay={
            <AccentFlare
              startMs={LAND}
              fireMs={OPEN.fire}
              voltMs={OPEN.volt}
            />
          }
        />

        <p className="enter mt-[clamp(20px,3vh,28px)] max-w-[46ch] text-pretty text-(length:--fs-body-l) leading-[1.6] [--enter-delay:calc(var(--land)_-_240ms)]">
          {SITE.positioning}
        </p>

        <div className="enter mt-[clamp(32px,5vh,48px)] [--enter-delay:calc(var(--land)_-_100ms)]">
          <Magnetic>
            <LinkButton href={CONTACT.whatsappDemo} external>
              Book a demo
            </LinkButton>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
