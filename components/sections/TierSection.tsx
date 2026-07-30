import type { CSSProperties } from "react";
import { TierFilm } from "@/components/sections/TierFilm";
import { Arrow, LinkButton } from "@/components/ui/Button";
import { SpecStrip } from "@/components/ui/SpecStrip";
import { CONTACT } from "@/content/site";
import type { Tier } from "@/content/tiers";

const GLOW: Record<Tier["slug"], string> = {
  izi: "text-izi-glow",
  eon: "text-eon-glow",
  omni: "text-omni-glow",
};

/**
 * One clip per era. `max` is the measured opacity ceiling for each — the
 * point past which that section's own text stops clearing 4.5:1 against the
 * brightest pixel in the footage. Measure the true per-channel peak, never a
 * sampled mid-tone: all three clips blow out to near-white somewhere, so the
 * ceiling is always far lower than the footage's overall tone suggests.
 */
const FILM: Record<Tier["slug"], { src: string; max: number }> = {
  izi: { src: "/hero/izi-ember.mp4", max: 0.18 },
  eon: { src: "/hero/eon-arc.mp4", max: 0.2 },
  omni: { src: "/hero/omni-ring.mp4", max: 0.19 },
};

export function TierSection({ tier }: { tier: Tier }) {
  const isEnterprise = tier.setupInr === null;
  const film = FILM[tier.slug];

  return (
    <section
      aria-labelledby={`tier-${tier.slug}`}
      className="section tier-field relative overflow-hidden"
      style={{ "--tier-core": `var(--color-${tier.slug}-core)` } as CSSProperties}
    >
      <TierFilm src={film.src} max={film.max} />

      <div className="shell relative z-1 flex flex-wrap gap-[clamp(32px,5vw,80px)]">
        <div
          className="max-w-[520px] flex-[1_1_340px] border-t pt-[clamp(24px,3vw,32px)]"
          style={{ borderColor: "var(--tier-core)" }}
        >
          <p className={`eyebrow ${GLOW[tier.slug]}`}>{tier.positioning}</p>
          <h2 id={`tier-${tier.slug}`} className="font-display display-m mt-[clamp(28px,4vw,44px)]">
            {tier.name}
          </h2>
          <p className="subhead mt-2.5 text-text-secondary">{tier.brandMessage}</p>
          <p className="mt-5 max-w-[48ch] text-[15px] leading-[1.55] text-text-secondary text-pretty">
            {tier.etymology}
          </p>

          <div className="mt-[clamp(28px,3vw,36px)] flex flex-wrap items-center gap-x-6 gap-y-3.5">
            {isEnterprise ? (
              <>
                <LinkButton href={CONTACT.salesPhoneHref} variant="secondary">
                  Contact sales
                </LinkButton>
                {/* Secondary, not tertiary: this is the number you are meant
                    to call, and tertiary does not reach 4.5:1 even against the
                    bare void, let alone the film behind it. */}
                <span className="font-mono text-[15px] text-text-secondary">
                  {CONTACT.salesPhone}
                </span>
              </>
            ) : (
              <>
                <LinkButton href="/#book">Book a demo</LinkButton>
                <LinkButton href="/products" variant="quiet">
                  Compare tiers <Arrow />
                </LinkButton>
              </>
            )}
          </div>
        </div>

        <SpecStrip rows={tier.spec} className="flex-[1_1_380px] self-start" />
      </div>
    </section>
  );
}
