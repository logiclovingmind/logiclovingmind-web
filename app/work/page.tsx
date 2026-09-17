import type { Metadata } from "next";
import Link from "next/link";
import { WORK, WORK_GROUPS, WORK_STANDFIRST, type WorkItem } from "@/content/work";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Live systems built by Logic Loving Mind — WhatsApp agents, agent platforms, operating systems and products, each one running or readable line by line.",
  alternates: { canonical: "/work" },
};

function isLive(item: WorkItem) {
  return /live/i.test(item.tag);
}

function WorkLinks({ item }: { item: WorkItem }) {
  return (
    <div className="font-mono mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] tracking-[0.02em]">
      {item.links.map((link) =>
        link.href ? (
          <a
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="inline-flex items-baseline gap-1.5 text-text-secondary underline-offset-4 no-underline hover:text-text hover:underline"
          >
            {link.label}
            <span aria-hidden="true" className="text-text-tertiary">
              ↗
            </span>
          </a>
        ) : (
          <span key={link.label} className="text-text-tertiary italic">
            {link.label}
          </span>
        )
      )}
    </div>
  );
}

function WorkGroupSection({ id, title, blurb }: { id: string; title: string; blurb: string }) {
  return (
    <section id={id} className="border-t border-line px-(--gutter) py-[clamp(48px,7vw,88px)]">
      <div className="mx-auto grid max-w-[1120px] gap-x-[clamp(32px,5vw,72px)] gap-y-[clamp(28px,4vw,44px)] lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-3">{id}</p>
          <h2 className="font-display heading">{title}</h2>
          <p className="mt-4 max-w-[34ch] text-pretty text-text-secondary">{blurb}</p>
        </div>
        <div className="flex flex-col gap-[clamp(36px,4.5vw,56px)] lg:col-span-8">
          {WORK.filter((item) => item.group === id).map((item) => (
            <article key={item.title}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <h3 className="font-display heading">{item.title}</h3>
                <span className={`chip ${isLive(item) ? "chip-live" : ""}`}>{item.tag}</span>
              </div>
              <p className="mt-3 text-pretty">{item.summary}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {item.detail.map((line) => (
                  <li key={line} className="legal-item text-pretty text-text-secondary">
                    {line}
                  </li>
                ))}
              </ul>
              <p className="font-mono mt-4 text-[12px] tracking-[0.04em] text-text-tertiary">
                {item.stack}
              </p>
              <WorkLinks item={item} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WorkPage() {
  return (
    <>
      <section className="px-(--gutter) pt-[clamp(56px,9vw,120px)] pb-[clamp(48px,7vw,88px)]">
        <div className="measure">
          <p className="eyebrow mb-5">Work</p>
          <h1 className="font-display display-l max-w-[20ch]">
            Shipped, running, and open to inspect
          </h1>
          <p className="mt-6 max-w-[56ch] text-pretty">{WORK_STANDFIRST}</p>
        </div>
      </section>

      {WORK_GROUPS.map((group) => (
        <WorkGroupSection key={group.id} {...group} />
      ))}

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