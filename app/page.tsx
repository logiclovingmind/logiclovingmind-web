import type { Metadata } from "next";
import { HeroFilm } from "@/components/hero/HeroFilm";
import { LinkButton } from "@/components/ui/Button";
import { CONTACT, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.positioning}`,
  description: SITE.positioning,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <section className="relative flex min-h-[calc(100svh-var(--header-h)-var(--footer-h))] flex-col items-center justify-center px-(--gutter) py-[clamp(48px,10vh,96px)] text-center">
      {/* Fixed to the viewport rather than to this section, so the field runs
          under the header and the footer too. Scoped to the section it belongs
          to instead of the layout, so the legal pages stay plain. */}
      <div aria-hidden="true" className="ambient">
        <HeroFilm />
        <div className="ambient-scrim" />
        <div className="grain" />
      </div>

      <div className="relative flex w-full max-w-[760px] flex-col items-center">
        <h1 className="font-display display-xl enter w-full text-balance">
          {SITE.positioning}
        </h1>

        <div className="enter mt-[clamp(36px,6vh,56px)] [--enter-delay:120ms]">
          <LinkButton href={CONTACT.whatsappDemo} external>
            Book a demo
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
