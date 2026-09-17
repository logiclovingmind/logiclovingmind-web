import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { AccentFlare } from "@/components/hero/AccentFlare";
import { HeroFilm } from "@/components/hero/HeroFilm";
import { PointerLight } from "@/components/hero/PointerLight";
import { RevealHeadline } from "@/components/hero/RevealHeadline";
import { LinkButton } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { CONTACT, SITE } from "@/content/site";
import { OPEN, landAfter } from "@/content/motion";
import { SELECTED_WORK } from "@/content/work";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.positioning,
  alternates: { canonical: "/" },
};

const WORDS = SITE.tagline.split(" ").length;
const LAND = landAfter(WORDS);

export default function HomePage() {
  return (
    <>
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

          <p className="enter mt-[clamp(20px,3vh,28px)] max-w-[48ch] text-pretty text-(length:--fs-body-l) leading-[1.6] [--enter-delay:calc(var(--land)_-_240ms)]">
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

      {/* The portfolio — a selection up front, everything grouped on /work. */}
      <section className="border-t border-line px-(--gutter) py-[clamp(56px,8vw,104px)]">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-4">Selected work</p>
              <h2 className="font-display display-l max-w-[18ch]">
                The work, running now
              </h2>
              <p className="mt-5 max-w-[52ch] text-pretty text-text-secondary">
                Every system here is live or readable line by line — built against a real
                manual process, then deployed so it could be used rather than described.
              </p>
            </div>
            <Link
              href="/work"
              className="font-mono inline-flex items-center gap-2 text-[13px] tracking-[0.06em] text-text-secondary underline-offset-4 no-underline hover:text-text hover:underline"
            >
              All work
              <span aria-hidden="true" className="text-text-tertiary">↗</span>
            </Link>
          </div>

          <div className="mt-[clamp(32px,5vw,56px)] grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SELECTED_WORK.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="group flex flex-col justify-between border border-line p-6 transition-colors no-underline hover:border-line-emphasis hover:bg-lift"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-tertiary">
                    {item.groupLabel}
                  </p>
                  <h3 className="font-display mt-4 text-[18px] leading-tight text-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-pretty text-[15px] text-text-secondary">
                    {item.line}
                  </p>
                </div>
                <span className="font-mono mt-7 inline-flex items-center gap-1.5 text-[12px] tracking-[0.06em] text-text">
                  {item.action}
                  <span aria-hidden="true" className="text-text-tertiary transition-transform group-hover:translate-x-0.5 group-hover:text-text">
                    →
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Close — the pitch is the work itself. */}
      <section className="border-t border-line px-(--gutter) py-[clamp(56px,8vw,104px)] text-center">
        <div className="mx-auto max-w-[760px]">
          <p className="eyebrow mb-4">Built the same way anywhere</p>
          <h2 className="font-display display-l text-balance">
            Every build starts with the manual process, not the pitch
          </h2>
          <p className="mt-6 text-pretty text-text-secondary">
            Agents, operating systems or one-off tools — tell us about the task a person
            does by hand, and we will ship the system that does it instead.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton href={CONTACT.whatsappDemo} external>
              Book a demo
            </LinkButton>
            <LinkButton href="/work" variant="secondary">
              See all work
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}