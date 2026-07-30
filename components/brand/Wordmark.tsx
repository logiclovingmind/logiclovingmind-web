/**
 * Rendered as a CSS mask rather than inline SVG: the wordmark is ~12KB of path
 * data and appears in both header and footer, so inlining it would cost more
 * document weight than a single cached request. `currentColor` is still
 * honoured — the mask is applied over a currentColor fill.
 *
 * viewBox 56.985 387 1177.887 56.848 → aspect ratio 20.72:1.
 * claude.md §8: never render below 160px wide; use the mark alone instead.
 */
const ASPECT = 1177.887 / 56.848;

export function Wordmark({
  width,
  className,
}: {
  /** CSS length. Minimum 160px per the brand rules. */
  width: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "block",
        width,
        aspectRatio: `${ASPECT}`,
        background: "currentColor",
        WebkitMask: "url(/wordmark.svg) no-repeat left center / contain",
        mask: "url(/wordmark.svg) no-repeat left center / contain",
      }}
    />
  );
}
