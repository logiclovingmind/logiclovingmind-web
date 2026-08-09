import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100svh-var(--header-h)-var(--footer-h))] flex-col items-center justify-center px-(--gutter) text-center">
      <p className="eyebrow mb-6">404</p>
      <h1 className="font-display display-l">Nothing here.</h1>
      <div className="mt-[clamp(32px,5vh,48px)]">
        <LinkButton href="/" variant="secondary">
          Home
        </LinkButton>
      </div>
    </section>
  );
}
