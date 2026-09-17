import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroFilm } from "@/components/hero/HeroFilm";
import { PointerLight } from "@/components/hero/PointerLight";
import { RevealHeadline } from "@/components/hero/RevealHeadline";
import { LinkButton } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { CONTACT, SITE } from "@/content/site";
import { SELECTED_WORK } from "@/content/work";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.positioning,
  alternates: { canonical: "/" },
};

const WORDS = SITE.tagline.split(" ").length;

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
          <PointerLight />
        </div>

        <div className="relative flex w-full max-w-[860px] flex-col items-center">
          <RevealHeadline
            text={SITE.tagline}
            emphasize={SITE.taglineAccent}
            className="w-full text-balance"
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
          <div className="reveal-view flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-4">Selected work</p>
              <h2 className="font-display display-l max-w-[18ch]">
                The work, running now
              </h2>
              <p className="mt-5 max-w-[52ch] text-pretty text-text-secondary">
                Every system here is live or open to read. We built each one from a real
                manual process, then deployed it to do actual work.
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
                className="group flex flex-col overflow-hidden border border-line transition duration-300 ease-(--ease-out) no-underline hover:-translate-y-1 hover:border-line-emphasis hover:bg-lift"
              >
                {item.image ? (
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={1440}
                      height={900}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 ease-(--ease-out) group-hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-line bg-lift">
                    <span
                      aria-hidden="true"
                      className="font-display text-[88px] leading-none text-text-tertiary opacity-[0.18]"
                    >
                      {item.title[0]}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-tertiary">
                    {item.groupLabel}
                  </p>
                  <h3 className="font-display mt-3 text-[18px] leading-tight text-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-pretty text-[15px] text-text-secondary">
                    {item.line}
                  </p>
                  <span className="font-mono mt-auto inline-flex items-center gap-1.5 pt-5 text-[12px] tracking-[0.06em] text-text">
                    {item.action}
                    <span
                      aria-hidden="true"
                      className="text-text-tertiary transition-transform duration-300 ease-(--ease-out) group-hover:translate-x-0.5 group-hover:text-text"
                    >
                      →
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Close — the pitch is the work itself. */}
      <section className="border-t border-line px-(--gutter) py-[clamp(56px,8vw,104px)] text-center">
        <div className="reveal-view mx-auto max-w-[760px]">
          <p className="eyebrow mb-4">How we work</p>
          <h2 className="font-display display-l text-balance">
            Every build starts with the manual process
          </h2>
          <p className="mt-6 text-pretty text-text-secondary">
            Tell us about a task someone in your business does by hand. We will build the
            system that does it, whether it is an agent, an operating system or a one-off
            tool.
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