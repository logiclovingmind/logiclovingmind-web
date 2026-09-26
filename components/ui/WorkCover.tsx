/** The cover used when a system has no public interface to photograph. It is a
 *  designed plate, not an empty frame: the monogram sits in a hairline square and
 *  the reason is stated, so a missing screenshot never reads as a broken tile. */
export function WorkCover({
  monogram,
  tag,
  note,
  className = "",
}: {
  monogram: string;
  tag: string;
  note: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex aspect-[16/10] flex-col justify-between overflow-hidden border border-line-strong bg-lift p-6 ${className}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-line" />
        <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-line" />
      </div>
      <p className="font-mono relative text-[11px] tracking-[0.12em] text-text-tertiary uppercase">
        {tag}
      </p>
      <div className="relative flex flex-col items-center gap-4">
        <span className="font-display flex h-[86px] w-[86px] items-center justify-center border border-line-emphasis text-[52px] leading-none text-text-secondary">
          {monogram}
        </span>
        <span className="font-mono text-[11px] tracking-[0.06em] text-text-tertiary">
          {note}
        </span>
      </div>
    </div>
  );
}
