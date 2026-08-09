import Link from "next/link";
import { Mark } from "@/components/brand/Mark";
import { Wordmark } from "@/components/brand/Wordmark";
import { SITE } from "@/content/site";

export function Header() {
  return (
    <header className="flex h-[var(--header-h)] items-center justify-center px-(--gutter)">
      <Link
        href="/"
        aria-label={`${SITE.name} — home`}
        className="enter flex items-center gap-[10px] text-text no-underline hover:no-underline"
      >
        <Mark className="h-[22px] w-[22px] shrink-0" />
        <Wordmark width="clamp(164px, 24vw, 196px)" />
      </Link>
    </header>
  );
}
