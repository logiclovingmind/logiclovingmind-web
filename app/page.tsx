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
    <section className="hero-field relative flex min-h-[calc(100svh-var(--header-h)-var(--footer-h))] flex-col items-center justify-center overflow-hidden px-(--gutter) py-[clamp(48px,10vh,96px)] text-center">
      <HeroFilm />
      <div aria-hidden="true" className="hero-scrim" />

      <div className="relative z-2 flex w-full max-w-[760px] flex-col items-center">
        <h1 className="font-display display-xl enter w-full text-balance">
          {SITE.positioning}
        </h1>

        <div className="enter mt-[clamp(36px,6vh,56px)] [--enter-delay:120ms]">
          <LinkButton href={CONTACT.whatsappDemo} external>
            Book a demo
          </LinkButton>
        </div>
      </div>

      <div aria-hidden="true" className="grain" />
    </section>
  );
}
