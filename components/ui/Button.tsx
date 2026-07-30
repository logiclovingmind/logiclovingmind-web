import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  quiet: "btn btn-quiet",
};

type LinkButtonProps = {
  href: string;
  variant?: Variant;
  external?: boolean;
  children: ReactNode;
  className?: string;
};

export function LinkButton({
  href,
  variant = "primary",
  external,
  children,
  className,
}: LinkButtonProps) {
  const cls = [VARIANT_CLASS[variant], className].filter(Boolean).join(" ");

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      {...rest}
      className={[VARIANT_CLASS[variant], className].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
}

/** The directional arrow is the only icon permitted on a button. design.md §5. */
export function Arrow() {
  return <span className="arrow">&#8594;</span>;
}
