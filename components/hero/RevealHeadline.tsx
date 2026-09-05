import { Fragment, type CSSProperties, type ReactNode } from "react";

/**
 * The headline, split so each word can wipe up from behind its own clip box.
 * The split is by space only, so the words stay real text: the h1 reads as one
 * sentence to a screen reader and to a crawler.
 *
 * The accent word carries an extra span on each side of the clip box — one
 * outside it to hold the aura the clip must not cut, and one inside it so the
 * wipe and the effects are not fighting over the same transform.
 */
export function RevealHeadline({
  text,
  emphasize,
  className,
  accentOverlay,
}: {
  text: string;
  emphasize?: string;
  className?: string;
  accentOverlay?: ReactNode;
}) {
  const words = text.split(" ");

  return (
    <h1 className={`font-display display-xl ${className ?? ""}`}>
      {words.map((word, i) => {
        const accent = word === emphasize;

        const clipped = (
          <span className="reveal-word" style={{ "--i": i } as CSSProperties}>
            <span>{accent ? <span className="reveal-em">{word}</span> : word}</span>
          </span>
        );

        return (
          <Fragment key={i}>
            {accent ? (
              <span className="accent">
                {clipped}
                {accentOverlay}
              </span>
            ) : (
              clipped
            )}
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </h1>
  );
}
