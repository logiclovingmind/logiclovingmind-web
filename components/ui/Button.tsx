import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
};

export function LinkButton({
  href,
  variant = "primary",
  external,
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  children: ReactNode;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={VARIANT_CLASS[variant]}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={VARIANT_CLASS[variant]}>
      {children}
    </Link>
  );
}
