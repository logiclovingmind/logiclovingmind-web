import { Reveal } from "./Reveal";
import type { Definition } from "@/content/capabilities";

/** Mono term, prose description. Used for capabilities and the specialization argument. */
export function DefList({
  items,
  tone = "primary",
  className,
}: {
  items: readonly Definition[];
  tone?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Reveal className={["def", className].filter(Boolean).join(" ")}>
      <dl className="m-0">
        {items.map((item) => (
          <div key={item.term} className="def-row">
            <dt className="def-term">{item.term.toUpperCase()}</dt>
            <dd
              className={`def-desc m-0 ${tone === "primary" ? "text-text" : "text-text-secondary"}`}
            >
              {item.desc}
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
