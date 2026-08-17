'use client';

import Link from 'next/link';
import { useState } from 'react';
import { offer, offerHeadline, isOfferLive } from '@/config/offer';
import { useSite } from '@/components/providers/SiteProvider';
import { useClientSnapshot } from '@/lib/hooks';
import { Countdown } from './Countdown';

/**
 * Slim sticky announcement bar. Placement 1 of 5.
 *
 * Zero layout shift: the bar renders server-side with its final height, so it
 * does not push the header down after hydration. When the offer expires while
 * the tab is open, the countdown reports it and the bar removes itself.
 */
export function OfferBar() {
  const { offerBarVisible, dismissOfferBar } = useSite();
  const [expired, setExpired] = useState(false);

  /*
   * Evaluated on the server for the initial HTML, then re-evaluated on the
   * client at hydration. That second check matters: a page served from a CDN
   * cache could outlive the deadline, and this is what stops a dead offer from
   * appearing on a stale document.
   */
  const live = useClientSnapshot(
    () => isOfferLive(),
    () => isOfferLive(),
  );

  if (!live || expired || !offerBarVisible) return null;

  return (
    <div className="relative z-50 bg-ink-900 text-white">
      <div className="container-content flex min-h-[44px] items-center justify-center gap-x-3 gap-y-1 py-2 pr-9 text-center sm:pr-10">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-caption sm:text-body-sm">
          <span className="font-semibold text-gold-400">{offer.label}</span>
          <span className="hidden text-ink-400 sm:inline" aria-hidden="true">
            |
          </span>
          <span>{offerHeadline()}</span>
          <span className="hidden text-ink-400 sm:inline" aria-hidden="true">
            |
          </span>
          <Countdown tone="bar" prefix="Ends in" onExpire={() => setExpired(true)} />
          <Link
            href={offer.termsUrl}
            className="underline decoration-ink-400 underline-offset-4 hover:decoration-white"
          >
            Terms
          </Link>
        </p>
      </div>

      <button
        type="button"
        onClick={dismissOfferBar}
        aria-label="Dismiss offer announcement"
        className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ink-300 transition-colors hover:bg-ink-800 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 sm:right-2"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
