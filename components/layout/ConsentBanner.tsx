'use client';

import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/config/site';
import { readLocal, useClientSnapshot } from '@/lib/hooks';
import { cn } from '@/lib/utils';

/**
 * Lightweight consent notice.
 *
 * Not strictly mandatory in India today, but it future-proofs against the DPDP
 * Act's consent rules and it reads as trustworthy to a visitor deciding whether
 * to hand over a phone number.
 *
 * Deliberately a notice with a choice rather than a blocking wall: it never
 * covers content in a way an ad platform would treat as an interstitial, and it
 * sits above the mobile sticky bar rather than over it.
 */

const KEY = 'ss_consent';

export function ConsentBanner() {
  /*
   * Rendered as nothing on the server, then revealed on the client only if no
   * choice has been recorded. Keeping it out of the server HTML also means it
   * cannot be part of the largest contentful paint.
   */
  const alreadyDecided = useClientSnapshot(
    () => readLocal(KEY) !== null,
    () => true,
  );
  const [decidedNow, setDecidedNow] = useState(false);

  const decide = (value: 'accepted' | 'essential') => {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      /* non-fatal */
    }
    setDecidedNow(true);
  };

  if (!site.features.consentBanner || alreadyDecided || decidedNow) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className={cn(
        'fixed inset-x-0 z-[65] px-3 pb-2 lg:bottom-0 lg:px-5 lg:pb-5',
        // Sits above the mobile CTA bar when there is one, otherwise flush.
        site.features.mobileStickyBar ? 'bottom-[72px]' : 'bottom-0',
      )}
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-ink-200 bg-white p-4 shadow-panel sm:flex-row sm:items-center sm:gap-4">
        <p className="flex-1 text-caption leading-relaxed text-ink-600">
          We use cookies to understand which pages bring people to the studio, and to measure our
          advertising. Nothing here identifies you personally.{' '}
          <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-ink-900">
            Privacy policy
          </Link>
        </p>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide('essential')}
            className="min-h-[44px] rounded-full border border-ink-300 px-4 text-body-sm font-medium text-ink-800 transition-colors hover:bg-ink-50"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => decide('accepted')}
            className="min-h-[44px] rounded-full bg-ink-900 px-4 text-body-sm font-semibold text-white transition-colors hover:bg-ink-800"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
