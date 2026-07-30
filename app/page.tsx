import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { HeroFilm } from "@/components/hero/HeroFilm";
import { Spectrum } from "@/components/hero/Spectrum";
import { StackWall } from "@/components/sections/StackWall";
import { TierSection } from "@/components/sections/TierSection";
import { Arrow, LinkButton } from "@/components/ui/Button";
import { DefList } from "@/components/ui/DefList";
import { SpecStrip } from "@/components/ui/SpecStrip";
import { Mark } from "@/components/brand/Mark";
import { CAPABILITIES, OWNERSHIP } from "@/content/capabilities";
import { AUTOMATION_FOREVER } from "@/content/program";
import { CONTACT } from "@/content/site";
import { PROGRESSION, TIERS } from "@/content/tiers";

export const metadata: Metadata = {
  title:
    "WhatsApp lead automation for real estate developers — Logic Loving Mind",
  description:
    "An operating system that answers every WhatsApp lead in seconds, qualifies buyers and books site visits. Built for real estate companies only. Bangalore.",
  alternates: { canonical: "/" },
};

const GLOW = {
  izi: "text-izi-glow",
  eon: "text-eon-glow",
  omni: "text-omni-glow",
} as const;

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero-field relative flex min-h-[min(84vh,880px)] flex-col overflow-hidden">
        <HeroFilm />
        <div aria-hidden="true" className="hero-scrim" />

        <div className="relative z-2 mx-auto flex w-full max-w-[1000px] flex-auto flex-col px-(--gutter) pt-[clamp(56px,11vh,120px)] pb-[clamp(28px,4vh,48px)] text-center">
          {/* Secondary over the film — tertiary misses AA against it. */}
          <p className="eyebrow mb-[clamp(24px,4vh,40px)] text-text-secondary">
            Real estate only
          </p>
          <h1 className="font-display display-xl mx-auto max-w-[22ch] text-balance">
            Replies in five seconds. Qualifies. Books the site visit.
          </h1>
          <p className="mx-auto mt-[clamp(20px,3vh,28px)] max-w-[60ch] text-(length:--fs-body-l) leading-[1.6] text-pretty">
            An operating system that runs customer conversations for real estate
            companies — continuously, in natural language, on infrastructure you own.
          </p>
          <div className="mt-[clamp(28px,4vh,40px)] flex flex-wrap items-center justify-center gap-x-5 gap-y-3.5">
            <LinkButton href="#book">Book a demo</LinkButton>
            <LinkButton href={CONTACT.whatsappDemo} variant="quiet" external>
              See the live demo on WhatsApp <Arrow />
            </LinkButton>
          </div>

          <div className="mt-auto flex justify-center pt-[clamp(40px,8vh,96px)]">
            <Spectrum />
          </div>
        </div>

        <div aria-hidden="true" className="grain" />
      </section>

      {/* ── Negative positioning ─────────────────────────────── */}
      <section aria-labelledby="positioning" className="section">
        <div className="shell flex flex-wrap gap-[clamp(32px,5vw,80px)]">
          <div className="max-w-[280px] flex-[1_1_200px]">
            <p className="eyebrow" id="positioning">
              Positioning
            </p>
          </div>
          <div className="flex-[1_1_460px]">
            <p className="font-display display-l">
              Not a chatbot.
              <br />
              Not a marketing agency.
              <br />
              Not an automation agency.
              <br />
              Not an AI wrapper.
            </p>
            <p className="mt-[clamp(24px,3vw,36px)] max-w-[56ch] text-pretty">
              It is an operating system engineered for one industry, deployed on
              accounts and infrastructure that stay in your name. Three pilot seats
              exist. Two people built it.
            </p>
          </div>
        </div>
      </section>

      {/* ── What the system does ─────────────────────────────── */}
      <section aria-labelledby="capabilities" className="section bg-surface">
        <div className="shell flex flex-wrap gap-[clamp(32px,5vw,72px)]">
          <div className="max-w-[420px] flex-[1_1_300px]">
            <p className="eyebrow mb-5">What the system does</p>
            <h2 id="capabilities" className="font-display display-m">
              Eight functions, running without a break.
            </h2>
            <p className="mt-6 text-pretty">
              Trained specifically on real estate conversations. Not a
              general-purpose assistant pointed at your inbox.
            </p>
          </div>
          <DefList items={CAPABILITIES} className="flex-[1_1_520px]" />
        </div>
      </section>

      {/* ── The progression ──────────────────────────────────── */}
      <section
        aria-labelledby="progression"
        className="border-b border-line py-(--section-y)"
      >
        <div className="shell px-(--gutter)">
          <div className="flex flex-wrap items-end gap-[clamp(24px,4vw,72px)]">
            <h2
              id="progression"
              className="font-display display-l max-w-[24ch] flex-[1_1_420px]"
            >
              Three times work stopped being repetitive.
            </h2>
            <p className="max-w-[44ch] flex-[1_1_280px] text-pretty">
              Each tier is a stage in the same progression. The pattern is not new;
              the third stage is.
            </p>
          </div>
        </div>

        <div className="mt-[clamp(40px,6vw,80px)] flex flex-wrap gap-px border-y border-line bg-line">
          {PROGRESSION.map((stage) => (
            <div
              key={stage.era}
              className="era-field flex-[1_1_300px] px-[clamp(24px,3vw,40px)] py-[clamp(32px,4vw,56px)]"
              style={{ "--tier-core": `var(--color-${stage.hue}-core)` } as CSSProperties}
            >
              <p className={`eyebrow ${GLOW[stage.hue]}`}>{stage.era}</p>
              <p className="font-display heading mt-[clamp(40px,7vw,88px)]">
                {stage.title}
              </p>
              <p className="mt-3 text-[15px] leading-[1.55]">{stage.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tiers ────────────────────────────────────────────── */}
      {TIERS.map((tier) => (
        <TierSection key={tier.slug} tier={tier} />
      ))}

      {/* ── Ownership ────────────────────────────────────────── */}
      <section aria-labelledby="ownership" className="section relative overflow-hidden bg-surface">
        <Mark
          className="pointer-events-none absolute -top-[22%] -right-[14%] h-[min(640px,72vw)] w-[min(640px,72vw)] text-white opacity-4"
        />
        <div className="shell relative flex flex-wrap gap-[clamp(32px,5vw,80px)]">
          <div className="max-w-[640px] flex-[1_1_440px]">
            <p className="eyebrow mb-5">Ownership</p>
            <h2 id="ownership" className="font-display display-l max-w-[22ch]">
              You own the accounts. You pay the vendors directly.
            </h2>
            <p className="mt-6 max-w-[58ch] text-pretty">
              We set up Meta Business, WhatsApp Cloud API, the AI accounts and the
              VPS. All of it is registered to you. Meta, token and hosting costs go
              from you to them, at cost, with no markup added by us. Nothing is
              resold and nothing is locked.
            </p>
          </div>
          <SpecStrip rows={OWNERSHIP} className="flex-[1_1_300px] self-start" />
        </div>
      </section>

      {/* ── The stack ────────────────────────────────────────── */}
      <StackWall />

      {/* ── Automation Forever ───────────────────────────────── */}
      <section aria-labelledby="af" className="section">
        <div className="shell flex flex-wrap gap-[clamp(32px,5vw,80px)]">
          <div className="max-w-[280px] flex-[1_1_200px]">
            <p className="eyebrow">Automation Forever</p>
            <p className="font-mono mt-5 text-(length:--fs-data-l) leading-[1.1] tracking-[-0.01em] text-text">
              {AUTOMATION_FOREVER.seatsLabel}
            </p>
          </div>
          <div className="flex-[1_1_460px]">
            <h2 id="af" className="font-display display-m max-w-[26ch]">
              Three companies run the platform without paying a setup fee.
            </h2>
            <p className="mt-6 max-w-[58ch] text-pretty">
              A ₹50,000 commitment deposit holds a seat. If the system does not
              produce 30 qualified buyer conversations and 10 site-visit-intent
              prospects within 30 days, the deposit is returned. If it does, you
              continue on six months of support at ₹50,000 — separate from the
              deposit, which is never credited against it.
            </p>
            <div className="mt-[clamp(28px,3vw,36px)]">
              <LinkButton href="/automation-forever" variant="secondary">
                Apply for Automation Forever
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── Close ────────────────────────────────────────────── */}
      <section id="book" aria-labelledby="close" className="px-(--gutter) py-[clamp(72px,11vw,160px)] text-center">
        <div className="mx-auto max-w-[760px]">
          <h2 id="close" className="font-display display-l text-balance">
            See it answer a lead while you watch.
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-pretty">
            Twenty minutes. We run your own lead scenario through the system and you
            read the transcript it produces.
          </p>
          <div className="mt-[clamp(28px,4vw,40px)] flex flex-wrap items-center justify-center gap-x-5 gap-y-3.5">
            <LinkButton href={CONTACT.whatsappDemo} external>
              Book a demo
            </LinkButton>
            <a
              href={CONTACT.salesPhoneHref}
              className="font-mono btn btn-quiet text-[15px]"
            >
              or call {CONTACT.salesPhone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
