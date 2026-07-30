import type { Metadata } from "next";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { LinkButton } from "@/components/ui/Button";
import { ProductsJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "IZI, EON and OMNI — capacity, pricing and features compared",
  description:
    "Three tiers of one system for real estate WhatsApp automation. Setup from ₹1.5 lakh. Compare users, conversations, messages per day and features.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-line px-(--gutter) pt-[clamp(56px,9vw,120px)] pb-[clamp(48px,7vw,88px)]">
        <div className="shell flex flex-wrap items-end gap-[clamp(32px,5vw,80px)]">
          <div className="max-w-[640px] flex-[1_1_440px]">
            <p className="eyebrow mb-5">Products</p>
            <h1 className="font-display display-l max-w-[24ch]">
              Three tiers of the same system, sized to your lead volume.
            </h1>
          </div>
          <p className="max-w-[42ch] flex-[1_1_280px] text-pretty">
            The engine is identical. What changes is capacity, the surface your team
            works in, and how much of your operation the system holds.
          </p>
        </div>
      </section>

      <section
        aria-label="Tier comparison"
        className="border-b border-line px-(--gutter) pt-[clamp(48px,7vw,96px)] pb-[clamp(64px,10vw,160px)]"
      >
        <ComparisonTable />

        <div className="shell mt-[clamp(32px,4vw,48px)] flex flex-wrap items-center gap-x-10 gap-y-5">
          <LinkButton href="/#book">Book a demo</LinkButton>
          <p className="max-w-[52ch] text-[15px] text-text-tertiary">
            You pay Meta, AI token and hosting costs directly, at cost. Accounts are
            registered in your name.
          </p>
        </div>
      </section>

      <ProductsJsonLd />
    </>
  );
}
