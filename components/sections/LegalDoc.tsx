import type { LegalDocument } from "@/content/legal";

/**
 * Renders either legal document. Both are long-form reading rather than
 * marketing, so the measure is tighter than the rest of the site and the
 * headings step down one level from the display scale.
 */
export function LegalDoc({ doc }: { doc: LegalDocument }) {
  return (
    <>
      <section className="border-b border-line px-(--gutter) pt-[clamp(56px,9vw,120px)] pb-[clamp(40px,6vw,72px)]">
        <div className="measure">
          <p className="eyebrow mb-5">{doc.eyebrow}</p>
          <h1 className="font-display display-l max-w-[20ch]">{doc.title}</h1>
          <p className="mt-6 max-w-[56ch] text-pretty">{doc.standfirst}</p>
          <p className="font-mono mt-8 text-[13px] text-text-tertiary">
            Last updated {doc.updated}
          </p>
        </div>
      </section>

      <section className="px-(--gutter) py-[clamp(48px,7vw,96px)]">
        <div className="measure flex flex-col gap-[clamp(36px,4.5vw,60px)]">
          {doc.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display heading">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-pretty">
                  {paragraph}
                </p>
              ))}
              {section.list ? (
                <ul className="mt-4 flex flex-col gap-2.5">
                  {section.list.map((item) => (
                    <li key={item} className="legal-item text-pretty">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
