/**
 * THE OFFER. Everything about the promotion lives here.
 *
 * To END the offer:            set `active: false`. That is the only change needed.
 * To change the discount:      edit `percentage`.
 * To extend it:                edit `endsAt`. Use a real date. See the warning below.
 *
 * The offer appears in exactly five places (BRIEF.md section 5):
 *   1. the sticky announcement bar
 *   2. the hero eyebrow
 *   3. the estimate result
 *   4. one mid-page offer band
 *   5. the timed popup
 * Do not add a sixth. Past five it reads as a discount store, not a studio.
 */

export type OfferConfig = {
  active: boolean;
  /** Campaign name as shown to visitors. */
  label: string;
  /** Short form for the announcement bar on narrow screens. */
  shortLabel: string;
  percentage: number;
  /**
   * true  -> copy reads "Flat 40% off", the discount applies to every order.
   * false -> copy reads "Up to 40% off".
   * Never say "up to" in one place and describe it as flat in another. The
   * component picks the wording from this flag so the two cannot drift.
   */
  flat: boolean;
  /** ISO 8601 with IST offset. The countdown is computed from this instant. */
  startsAt: string;
  endsAt: string;
  /** Local substantiation page. Required by both ad platforms. */
  termsUrl: string;
  /**
   * This is the franchisor's national Freedom Festival campaign run locally, so
   * HomeLane's own published terms PDF also applies and must be reachable.
   * TODO CONFIRM: paste the current Freedom Festival terms PDF URL from
   * HomeLane. Until this is filled in, /offer-terms shows only the local terms,
   * which is safe but incomplete.
   */
  franchisorTermsUrl: string;
  /**
   * Beyond this many days remaining, the countdown renders as a plain date
   * rather than a ticking clock. A clock counting down 40 days looks fake.
   */
  countdownThresholdDays: number;
  /**
   * 'modal'   centre modal on desktop, bottom sheet on mobile
   * 'corner'  slide-in corner card, converts less but never risks a policy flag
   * Switch to 'corner' if either ad platform raises an interstitial issue.
   */
  popupVariant: 'modal' | 'corner';
  /** Master kill switch for the timed popup, independent of `active`. */
  popupEnabled: boolean;
};

export const offer: OfferConfig = {
  active: true,

  // Confirmed by the owner as HomeLane's national campaign, run locally.
  label: 'Freedom Festival',
  shortLabel: 'Freedom Festival',

  percentage: 40,
  flat: false,

  startsAt: '2026-08-01T00:00:00+05:30',
  // TODO CONFIRM the exact closing instant with the owner.
  // This MUST be a real deadline. Do not make it roll forward, and do not
  // reset it on reload. When this timestamp passes, every offer surface on the
  // site disappears by itself with no deploy required.
  endsAt: '2026-08-15T23:59:59+05:30',

  termsUrl: '/offer-terms',
  franchisorTermsUrl: '',

  countdownThresholdDays: 7,

  popupVariant: 'modal',
  popupEnabled: true,
};

/** Discount wording, derived so "up to" and "flat" can never contradict. */
export function offerHeadline(): string {
  return offer.flat ? `Flat ${offer.percentage}% off` : `Up to ${offer.percentage}% off`;
}

export function offerEyebrow(): string {
  return `${offer.label} | ${offerHeadline()}`;
}

/** Multiplier applied to an estimate to show the post-discount figure. */
export function discountMultiplier(): number {
  return (100 - offer.percentage) / 100;
}

/**
 * True only while the offer is switched on AND inside its real window.
 * Every offer surface calls this. Safe to call on the server and the client:
 * both compare against the same fixed IST timestamp.
 */
export function isOfferLive(now: Date = new Date()): boolean {
  if (!offer.active) return false;
  const start = new Date(offer.startsAt).getTime();
  const end = new Date(offer.endsAt).getTime();
  const t = now.getTime();
  return t >= start && t <= end;
}

export function offerEndsAtMs(): number {
  return new Date(offer.endsAt).getTime();
}

/** "15 August 2026", rendered in IST regardless of the visitor's timezone. */
export function offerEndDateLabel(): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(offer.endsAt));
}
