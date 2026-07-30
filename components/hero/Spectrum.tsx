import type { CSSProperties } from "react";
import { TIERS } from "@/content/tiers";

/**
 * The film's three hues are the three eras the tiers are named for, circling
 * the mark. Naming them turns the loop from decoration into the legend for
 * the product line — the same square used for presence in the comparison
 * table, carrying the tier's own hue.
 */
export function Spectrum() {
  return (
    <ul className="spectrum">
      {TIERS.map((tier) => (
        <li
          key={tier.slug}
          className="spectrum-item"
          style={{ "--tier-core": `var(--color-${tier.slug}-core)` } as CSSProperties}
        >
          <span aria-hidden="true" className="spectrum-dot" />
          <span className="spectrum-name">{tier.name}</span>
          <span className="spectrum-era">{tier.era}</span>
        </li>
      ))}
    </ul>
  );
}
