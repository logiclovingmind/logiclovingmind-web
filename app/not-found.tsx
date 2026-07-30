import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="px-(--gutter) py-[clamp(96px,16vw,220px)]">
      <div className="shell max-w-[680px]">
        <p className="eyebrow mb-5">404</p>
        <h1 className="font-display display-l">That page does not exist.</h1>
        <p className="mt-6 max-w-[46ch] text-pretty">
          The link is wrong or the page has moved. The system itself is still
          answering — start on the home page, or talk to it directly.
        </p>
        <div className="mt-[clamp(28px,4vw,40px)] flex flex-wrap gap-x-5 gap-y-3.5">
          <LinkButton href="/">Back to home</LinkButton>
          <LinkButton href={CONTACT.whatsappDemo} external variant="secondary">
            Book a demo
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
