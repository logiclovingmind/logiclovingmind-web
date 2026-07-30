import { COMPARISON, TIERS } from "@/content/tiers";

const HEADER_STYLE: Record<string, { border: string; text: string }> = {
  izi: { border: "var(--color-izi-core)", text: "text-izi-glow" },
  eon: { border: "var(--color-eon-core)", text: "text-eon-glow" },
  omni: { border: "var(--color-omni-core)", text: "text-omni-glow" },
};

const GRID = "grid grid-cols-[1.7fr_1fr_1fr_1fr]";

/** Presence is a filled square, absence an em dash. No checkmarks, no badges. */
function Cell({ value, mono }: { value: string | boolean; mono?: boolean }) {
  if (value === true) {
    return <span aria-label="Included" className="inline-block size-[7px] bg-text" />;
  }
  if (value === false) {
    return (
      <span className="text-text-tertiary" aria-label="Not included">
        &#8212;
      </span>
    );
  }
  return <span className={mono ? "font-mono text-text" : "text-text"}>{value}</span>;
}

export function ComparisonTable() {
  return (
    <div className="shell overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left text-[15px]">
        <caption className="sr-only">
          Specification and feature comparison across the IZI, EON and OMNI tiers
        </caption>
        <thead>
          <tr className={`${GRID} sticky top-[var(--header-h)] z-5 bg-void`}>
            <th
              scope="col"
              className="eyebrow border-b border-line-strong pt-[22px] pr-5 pb-3.5 text-left"
            >
              Specification
            </th>
            {TIERS.map((tier) => {
              const style = HEADER_STYLE[tier.slug];
              return (
                <th
                  key={tier.slug}
                  scope="col"
                  className={`eyebrow border-b border-line-strong px-5 pt-[22px] pb-3.5 text-left ${style.text}`}
                  style={{ borderTop: `1px solid ${style.border}` }}
                >
                  {tier.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.label} className={GRID}>
              <th
                scope="row"
                className="border-b border-line py-[15px] pr-5 text-left font-normal text-text-secondary"
              >
                {row.label}
              </th>
              <td className="border-b border-line px-5 py-[15px]">
                <Cell value={row.izi} mono={row.mono} />
              </td>
              <td className="border-b border-line px-5 py-[15px]">
                <Cell value={row.eon} mono={row.mono} />
              </td>
              <td className="border-b border-line px-5 py-[15px]">
                <Cell value={row.omni} mono={row.mono} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
