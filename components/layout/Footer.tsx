import Link from "next/link";
import { LEGAL_ROUTES, SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="font-mono flex min-h-[var(--footer-h)] flex-wrap items-center justify-center gap-x-5 gap-y-1.5 px-(--gutter) py-4 text-[12px] tracking-[0.06em] text-text-secondary">
      <span>{SITE.location}</span>
      {LEGAL_ROUTES.map((route) => (
        <Link key={route.href} href={route.href} className="no-underline hover:text-text">
          {route.label}
        </Link>
      ))}
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}
