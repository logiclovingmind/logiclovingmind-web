"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Mark } from "@/components/brand/Mark";
import { Wordmark } from "@/components/brand/Wordmark";
import { CONTACT, ROUTES, SITE } from "@/content/site";

const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes?.length) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-[60] h-[var(--header-h)] bg-[rgba(7,8,10,0.88)] backdrop-blur-[12px]">
        <div className="mx-auto flex h-[var(--header-h)] max-w-(--spacing-shell) items-center justify-between gap-8 px-(--gutter)">
          <Link
            href="/"
            aria-label={`${SITE.name} — home`}
            className="flex items-center gap-[9px] text-text no-underline hover:no-underline"
          >
            <Mark className="h-[23px] w-[23px] shrink-0" />
            <Wordmark width="198px" className="hidden sm:block" />
            <span className="sr-only sm:hidden">{SITE.name}</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-[clamp(18px,2.4vw,34px)] text-[15px] lg:flex">
            {ROUTES.map((route) => {
              const active = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  aria-current={active ? "page" : undefined}
                  className={`nav-link transition-colors duration-(--dur-fast) ${
                    active ? "text-text" : "text-text-secondary hover:text-text"
                  }`}
                >
                  {route.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/#book" className="btn btn-primary hidden shrink-0 lg:inline-flex">
            Book a demo
          </Link>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="flex h-11 w-11 shrink-0 cursor-pointer flex-col items-end justify-center gap-[5px] border-0 bg-transparent lg:hidden"
          >
            <span aria-hidden="true" className="block h-px w-[22px] bg-text" />
            <span aria-hidden="true" className="block h-px w-[14px] bg-text" />
          </button>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-line transition-opacity duration-(--dur-base) ease-(--ease-ui)"
          style={{ opacity: scrolled ? 1 : 0 }}
        />
      </header>

      {menuOpen ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[70] flex flex-col bg-void p-(--gutter)"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="Close menu"
              className="h-11 w-11 cursor-pointer border-0 bg-transparent text-[22px] leading-none text-text"
            >
              &#215;
            </button>
          </div>

          <nav
            aria-label="Primary"
            className="mt-[clamp(32px,8vh,72px)] flex flex-col items-start gap-[22px]"
          >
            {ROUTES.map((route, index) => (
              <Link
                key={route.href}
                href={route.href}
                aria-current={pathname === route.href ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className="font-display display-m no-underline hover:no-underline motion-safe:animate-[llmIn_360ms_var(--ease-out)_both]"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3.5">
            <Link
              href="/#book"
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary w-full"
            >
              Book a demo
            </Link>
            <a
              href={CONTACT.salesPhoneHref}
              className="font-mono text-[15px] text-text-secondary no-underline"
            >
              Sales · {CONTACT.salesPhone}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
