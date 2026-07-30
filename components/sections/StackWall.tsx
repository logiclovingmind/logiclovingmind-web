import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { STACK } from "@/content/stack";

/**
 * A logo wall and nothing else. Nothing is captioned at rest; the name fades in
 * under the mark on hover, for anyone who does not recognise a glyph on sight.
 * The label is absolutely positioned so revealing it cannot reflow the grid,
 * and it is aria-hidden because the svg already carries the same name.
 *
 * The bodies are trusted, generated content in content/stack.ts, never user
 * input; they are injected as markup because a full-colour brand mark carries
 * gradients and per-path fills that a single `currentColor` cannot express.
 * One mark — AICredits — ships as a bitmap because that brand publishes no
 * vector logo, and is left unoptimised since it is already a 192px sprite.
 */
export function StackWall() {
  return (
    <section aria-labelledby="stack" className="section">
      <div className="shell">
        <h2
          id="stack"
          className="font-display display-m mx-auto max-w-[20ch] text-center text-balance"
        >
          Powered by proven infrastructure.
        </h2>

        <Reveal className="stack mt-[clamp(44px,6vw,80px)]">
          <ul className="stack-marks">
            {STACK.map((mark) => (
              <li key={mark.name} className="stack-mark">
                {mark.body ? (
                  <svg
                    viewBox={`0 0 ${mark.w} ${mark.h}`}
                    preserveAspectRatio="xMidYMid meet"
                    role="img"
                    aria-label={mark.name}
                    className="stack-glyph"
                    dangerouslySetInnerHTML={{ __html: mark.body }}
                  />
                ) : (
                  <Image
                    src={mark.img!}
                    alt={mark.name}
                    width={mark.w}
                    height={mark.h}
                    className="stack-glyph object-contain"
                    unoptimized
                  />
                )}
                <span aria-hidden="true" className="stack-name">
                  {mark.name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
