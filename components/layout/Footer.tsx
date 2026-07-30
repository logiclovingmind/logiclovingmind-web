import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { CONTACT, LEGAL_ROUTES, ROUTES, SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line px-(--gutter) pt-[clamp(48px,7vw,88px)] pb-[clamp(40px,5vw,64px)]">
      <div className="shell flex flex-wrap gap-[clamp(32px,5vw,72px)]">
        <div className="max-w-[380px] flex-[1_1_300px] text-text-tertiary">
          <Wordmark width="min(240px, 100%)" />
          <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.55]">{SITE.positioning}</p>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-[1_1_180px] flex-col items-start gap-3 text-[15px]"
        >
          {ROUTES.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-text-secondary no-underline hover:text-text"
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <address className="font-mono flex flex-[1_1_260px] flex-col gap-2.5 text-[15px] text-text-tertiary not-italic">
          <a href={CONTACT.salesPhoneHref} className="text-text-secondary no-underline hover:text-text">
            {CONTACT.salesPhone} · sales
          </a>
          <a href={`mailto:${CONTACT.generalEmail}`} className="text-text-secondary no-underline hover:text-text">
            {CONTACT.generalEmail}
          </a>
          <a href={`mailto:${CONTACT.supportEmail}`} className="text-text-secondary no-underline hover:text-text">
            {CONTACT.supportEmail}
          </a>
          <a
            href={CONTACT.whatsappDemo}
            target="_blank"
            rel="noopener"
            className="text-text-secondary no-underline hover:text-text"
          >
            Live demo on WhatsApp
          </a>
          <span>{SITE.location}</span>
        </address>
      </div>

      <div className="shell font-mono mt-[clamp(40px,5vw,64px)] flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-text-tertiary">
        <span>
          © {new Date().getFullYear()} {SITE.name}
        </span>
        {LEGAL_ROUTES.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="text-text-secondary no-underline hover:text-text"
          >
            {route.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
