import type { Metadata } from "next";
import Link from "next/link";
import { WORK, WORK_STANDFIRST } from "@/content/work";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Live systems built by Logic Loving Mind — WhatsApp agents, booking sites and offline-first tools, each one running and open to try.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="border-b border-line px-(--gutter) pt-[clamp(56px,9vw,120px)] pb-[clamp(40px,6vw,72px)]">
        <div className="measure">
          <p className="eyebrow mb-5">Work</p>
          <h1 className="font-display display-l max-w-[20ch]">
            Systems you can open right now
          </h1>
          <p className="mt-6 max-w-[56ch] text-pretty">{WORK_STANDFIRST}</p>
        </div>
      </section>

      <section className="px-(--gutter) py-[clamp(48px,7vw,96px)]">
        <div className="measure flex flex-col gap-[clamp(36px,4.5vw,60px)]">
          {WORK.map((item) => (
            <article key={item.href}>
              <p className="font-mono text-[13px] tracking-[0.06em] text-text-tertiary">
                {item.vertical}
              </p>
              <h2 className="font-display heading mt-2">{item.title}</h2>
              <p className="mt-4 text-pretty">{item.summary}</p>
              {item.detail.map((line) => (
                <p key={line} className="mt-3 text-pretty text-text-secondary">
                  {line}
                </p>
              ))}
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono mt-5 inline-block text-[13px] tracking-[0.06em]"
              >
                {item.hrefLabel}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line px-(--gutter) py-[clamp(48px,7vw,96px)]">
        <div className="measure">
          <h2 className="font-display heading">Want one of these for your business?</h2>
          <p className="mt-4 max-w-[56ch] text-pretty">
            The fastest way to find out whether this fits is to send a message and
            watch how the agent replies.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              className="btn btn-primary"
              href={CONTACT.whatsappDemo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a demo
            </a>
            <Link className="btn btn-secondary" href="/">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
