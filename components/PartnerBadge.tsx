import { HOMELANE_LOGO_PERMITTED } from '@/config/theme';
import { cn } from '@/lib/utils';

/**
 * THE ONLY PLACE THE HOMELANE MARK MAY APPEAR.
 *
 * Every mention of the partnership on the site routes through this component,
 * so the mark can be reworded or removed everywhere from this one file.
 * BRIEF.md section 4.
 *
 * Permitted here:
 *   - the text "Authorised Partner of HomeLane" as a trust badge
 *
 * Not permitted anywhere, including here:
 *   - the HomeLane wordmark or logo file, unless HOMELANE_LOGO_PERMITTED is true
 *     AND a written permission letter covering logo use is on file
 *   - any wording implying Shilp Sarthi is HomeLane
 *   - the mark in a page title, meta description, h1, URL, alt text, og:title,
 *     or structured data name/brand field
 *
 * If the owner ever needs the partnership claim pulled from the site, set
 * `SHOW_PARTNER_BADGE` to false and every instance disappears at once.
 */

const SHOW_PARTNER_BADGE = true;

const PARTNER_TEXT = 'Authorised Partner of HomeLane';

type Props = {
  variant?: 'chip' | 'inline' | 'footer';
  className?: string;
};

export function PartnerBadge({ variant = 'chip', className }: Props) {
  if (!SHOW_PARTNER_BADGE) return null;

  if (variant === 'inline') {
    return <span className={cn('font-medium', className)}>{PARTNER_TEXT}</span>;
  }

  if (variant === 'footer') {
    return (
      <span className={cn('text-body-sm text-ink-300', className)}>{PARTNER_TEXT}</span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-caption font-medium text-ink-700',
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 shrink-0 text-accent-600"
        fill="currentColor"
      >
        <path d="M8 0.75 1.75 3.4v4.05c0 3.55 2.5 6.87 6.25 7.8 3.75-.93 6.25-4.25 6.25-7.8V3.4L8 .75Zm3.03 5.16-3.6 3.6a.75.75 0 0 1-1.06 0L4.97 7.11a.75.75 0 1 1 1.06-1.06l.87.87 3.07-3.07a.75.75 0 0 1 1.06 1.06Z" />
      </svg>
      {PARTNER_TEXT}
    </span>
  );
}

/**
 * The factual partnership paragraph. Allowed in exactly two places: the About
 * page and the homepage partnership section. Explains what the partnership
 * gives the customer, without implying shared identity.
 */
export function PartnerParagraph({ className }: { className?: string }) {
  if (!SHOW_PARTNER_BADGE) return null;
  return (
    <p className={cn('text-body-lg text-ink-600', className)}>
      Shilp Sarthi is an independent business and an authorised partner of HomeLane. That
      partnership is what puts a factory behind your project instead of a site carpenter: your
      units are manufactured to measured drawings on a production line, checked against a
      standardised quality process, and backed by a 10 year warranty on modular work. The design,
      the project management and the contract are ours, and every enquiry you send through this
      site is handled by our own team in Ranchi.
    </p>
  );
}

/** Footer disclaimer. Required on every page. */
export function PartnerDisclaimer({ className }: { className?: string }) {
  return (
    <p className={cn('text-caption leading-relaxed text-ink-400', className)}>
      HomeLane is a trademark of its respective owner. Shilp Sarthi is an independent authorised
      partner and is not the trademark owner. All enquiries submitted on this site are handled by
      Shilp Sarthi.
    </p>
  );
}

/**
 * Guard used by any future component tempted to render the logo. Kept exported
 * so the rule is enforceable in code rather than by memory.
 */
export function mayRenderHomeLaneLogo(): boolean {
  return HOMELANE_LOGO_PERMITTED;
}
