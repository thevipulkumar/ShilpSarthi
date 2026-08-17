/**
 * Wordmark plus the arch device.
 *
 * The arch replaced a filled black tile holding a terracotta house. Two reasons,
 * beyond the tile being the heaviest object on an otherwise all-white site:
 *
 *   1. HomeLane's own mark is a red house glyph with a wordmark beside it. A
 *      house next to "Shilp Sarthi" reads as a derivative of the franchisor's
 *      logo, which is the brand confusion config/theme.ts exists to prevent.
 *   2. An arch is in the work itself. The Oak Forest flat has an arched mirror
 *      and an arch-motif wall, and niches and arched openings are what this
 *      studio actually builds.
 *
 * Ink outer stroke with a solid accent inner: the solid keeps the mark readable
 * at favicon sizes, where a two-stroke arch would close up. The red is kept on
 * the inverse rather than flattening to white; measured, #E71C24 on #212529 is
 * 3.37:1, clear of the 3:1 WCAG 1.4.11 asks of a meaningful graphic.
 *
 * Same geometry as app/icon.svg and the MediaFrame placeholder. If one changes,
 * change all three.
 */

function Arch({ outer, inner }: { outer: string; inner: string }) {
  return (
    <svg viewBox="0 0 40 40" className="h-full w-auto" role="img" aria-label="Shilp Sarthi">
      <path
        d="M8 33V19a12 12 0 0 1 24 0v14"
        className={outer}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.7}
        strokeLinecap="round"
      />
      <path d="M15 33V20.5a5 5 0 0 1 10 0V33Z" className={inner} fill="currentColor" />
    </svg>
  );
}

export function Logo({ className = 'h-10 w-auto' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Arch outer="text-ink-900" inner="text-accent-600" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15em] font-semibold tracking-tight text-ink-900">
          Shilp Sarthi
        </span>
        <span className="mt-0.5 text-[0.5em] font-medium uppercase tracking-[0.16em] text-ink-500">
          Interiors, Ranchi
        </span>
      </span>
    </span>
  );
}

/** Light-on-dark variant for the footer and other ink sections. */
export function LogoInverse({ className = 'h-10 w-auto' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Arch outer="text-white" inner="text-accent-600" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15em] font-semibold tracking-tight text-white">
          Shilp Sarthi
        </span>
        <span className="mt-0.5 text-[0.5em] font-medium uppercase tracking-[0.16em] text-ink-300">
          Interiors, Ranchi
        </span>
      </span>
    </span>
  );
}
