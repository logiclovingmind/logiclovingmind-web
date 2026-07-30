import type { Metadata } from "next";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { Reveal } from "@/components/ui/Reveal";
import { SpecStrip } from "@/components/ui/SpecStrip";
import { AUTOMATION_FOREVER } from "@/content/program";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Automation Forever — three seats, no setup fee",
  description:
    "Three launch seats. No setup cost, a refundable ₹50,000 commitment deposit, and a 30-day live pilot measured against two outcomes.",
  alternates: { canonical: "/automation-forever" },
};

export default function AutomationForeverPage() {
  return (
    <>
      <section className="border-b border-line px-(--gutter) pt-[clamp(56px,9vw,120px)] pb-[clamp(48px,7vw,88px)]">
        <div className="shell flex flex-wrap items-end gap-[clamp(32px,5vw,80px)]">
          <div className="max-w-[680px] flex-[1_1_440px]">
            <p className="eyebrow mb-5">Automation Forever · Limited launch</p>
            <h1 className="font-display display-l max-w-[22ch]">
              Three seats. No setup fee. One condition.
            </h1>
          </div>
          <div className="flex-[1_1_240px]">
            <p className="font-mono text-[32px] leading-[1.1] tracking-[-0.01em] text-text tabular-nums">
              {AUTOMATION_FOREVER.seatsLabel}
            </p>
            <p className="mt-2 text-[15px] text-text-tertiary">
              Selected companies only. We are choosing, not selling.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="af-contract" className="section bg-surface">
        <div className="shell flex flex-wrap gap-[clamp(32px,5vw,72px)]">
          <div className="max-w-[460px] flex-[1_1_340px]">
            <h2 id="af-contract" className="font-display display-m">
              The deposit is a checkable contract, not a purchase.
            </h2>
            <p className="mt-6 max-w-[52ch] text-pretty">
              You pay ₹50,000 to hold a seat. We run a live 30-day pilot. If the
              two outcomes below are not met, the deposit comes back. If they are
              met, you continue on six months of support at ₹50,000 — a separate
              figure. The deposit is never credited against support.
            </p>
          </div>
          <SpecStrip rows={AUTOMATION_FOREVER.contract} className="flex-[1_1_420px] self-start" />
        </div>
      </section>

      <section aria-labelledby="af-eligibility" className="section border-b border-line">
        <div className="shell flex flex-wrap gap-[clamp(32px,5vw,72px)]">
          <div className="max-w-[400px] flex-[1_1_300px]">
            <p className="eyebrow mb-5">Eligibility</p>
            <h2 id="af-eligibility" className="font-display display-m">
              Check yourself before you apply.
            </h2>
            <p className="mt-6 max-w-[44ch] text-pretty">
              All three are required. Below any of them the 30-day outcomes are not
              reachable and the pilot wastes your month and ours.
            </p>
          </div>
          <Reveal className="flex-[1_1_440px] border-t border-line-strong">
            <ul className="m-0 list-none p-0">
              {AUTOMATION_FOREVER.eligibility.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-5 border-b border-line py-5 text-text"
                >
                  <span aria-hidden className="inline-block size-[7px] flex-none bg-text" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-[clamp(28px,4vw,40px)] max-w-[42ch]">
              <p className="eyebrow">Included</p>
              <p className="mt-2.5 text-[15px] leading-[1.55] text-text-secondary">
                {AUTOMATION_FOREVER.included}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="book" aria-labelledby="af-apply" className="section">
        <div className="shell flex flex-wrap gap-[clamp(32px,5vw,80px)]">
          <div className="max-w-[380px] flex-[1_1_280px]">
            <h2 id="af-apply" className="font-display display-m">
              Apply for a seat
            </h2>
            <p className="mt-5 max-w-[40ch] text-pretty">
              Five fields. A founder reads every application and answers within one
              working day.
            </p>
            <p className="font-mono mt-6 text-[15px] text-text-tertiary">
              Or talk to the system first
              <br />
              <a
                href={CONTACT.whatsappDemo}
                target="_blank"
                rel="noopener"
                className="text-text-secondary underline-offset-4 hover:underline"
              >
                wa.me/919978445088 &#8594;
              </a>
            </p>
          </div>
          <div className="max-w-[560px] flex-[1_1_480px]">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
