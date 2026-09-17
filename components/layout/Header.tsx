import Link from "next/link";
import { Mark } from "@/components/brand/Mark";
import { Wordmark } from "@/components/brand/Wordmark";
import { CONTACT, SITE } from "@/content/site";

const NAV = [{ href: "/work", label: "Work" }];

export function Header() {
  return (
    <header className="flex h-[var(--header-h)] items-center justify-between px-(--gutter)">
      <Link
        href="/"
        aria-label={`${SITE.name} — home`}
        className="enter flex items-center gap-[10px] text-text no-underline hover:no-underline"
      >
        <Mark className="h-[22px] w-[22px] shrink-0" />
        <Wordmark width="clamp(164px, 24vw, 196px)" />
      </Link>

      <nav className="enter font-mono flex items-center gap-6 text-[12px]">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="tracking-[0.08em] text-text-secondary underline-offset-4 no-underline hover:text-text"
          >
            {item.label}
          </Link>
        ))}
        <a
          href={CONTACT.whatsappDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="tracking-[0.08em] text-text no-underline hover:underline"
        >
          Book a demo
        </a>
      </nav>
    </header>
  );
}