import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";
import { DefList } from "@/components/ui/DefList";
import { SPECIALIZATION } from "@/content/capabilities";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Why we build for real estate only",
  description:
    "Built around how property is sold in India: RERA projects, unit inventory, budget and possession qualification, and getting a buyer to the site visit.",
  alternates: { canonical: "/why-real-estate-only" },
};

export default function WhyRealEstateOnlyPage() {
  return (
    <>
      <section className="border-b border-line px-(--gutter) pt-[clamp(56px,9vw,120px)] pb-[clamp(48px,7vw,88px)]">
        <div className="shell flex flex-wrap items-end gap-[clamp(32px,5vw,80px)]">
          <div className="max-w-[680px] flex-[1_1_440px]">
            <p className="eyebrow mb-5">Why real estate only</p>
            <h1 className="font-display display-l max-w-[24ch]">
              A generic assistant learns generic conversation.
            </h1>
          </div>
          <p className="max-w-[42ch] flex-[1_1_280px] text-pretty">
            This one was built around how property is actually sold in India:
            inventory, RERA projects, budgets, possession timelines, and getting
            someone to the site.
          </p>
        </div>
      </section>

      <section aria-labelledby="specialization" className="section bg-surface">
        <div className="shell flex flex-wrap gap-[clamp(32px,5vw,72px)]">
          <div className="max-w-[360px] flex-[1_1_280px]">
            <h2 id="specialization" className="font-display display-m">
              What specialization actually changes.
            </h2>
          </div>
          <DefList items={SPECIALIZATION} tone="secondary" className="flex-[1_1_520px]" />
        </div>
      </section>

      <section
        aria-labelledby="why-close"
        className="px-(--gutter) py-[clamp(72px,11vw,160px)] text-center"
      >
        <div className="mx-auto max-w-[760px]">
          <h2 id="why-close" className="font-display display-l text-balance">
            Bring us a lead you lost last week.
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-pretty">
            We will run it through the system on the call and you can judge the
            transcript yourself.
          </p>
          <div className="mt-[clamp(28px,4vw,40px)] flex flex-wrap justify-center gap-x-5 gap-y-3.5">
            <LinkButton href={CONTACT.whatsappDemo} external>
              Book a demo
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
