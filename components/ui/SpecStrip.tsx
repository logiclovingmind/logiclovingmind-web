import { Reveal } from "./Reveal";

export type Spec = { label: string; value: string };

/** The instrument readout. design.md §5 — mono, tabular, hairline-separated. */
export function SpecStrip({
  rows,
  className,
}: {
  rows: readonly Spec[];
  className?: string;
}) {
  return (
    <Reveal className={["strip", className].filter(Boolean).join(" ")}>
      {rows.map((row) => (
        <div key={row.label} className="strip-row">
          <span className="strip-label">{row.label.toUpperCase()}</span>
          <span className="strip-value">{row.value}</span>
        </div>
      ))}
    </Reveal>
  );
}
