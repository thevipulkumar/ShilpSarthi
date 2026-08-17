'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { trackPixel } from '@/lib/analytics';

/**
 * Conversion hooks for /thank-you.
 *
 * The Google Ads conversion action fires on the URL itself, configured in the
 * Ads account, so nothing here needs to trigger it. What does need to happen
 * here is the Meta Pixel `Lead` event, which is event-based rather than
 * URL-based.
 *
 * `generate_lead` was already pushed to the dataLayer by LeadForm at submit
 * time. It is deliberately NOT pushed again here: a visitor who reloads this
 * page or arrives at it directly would otherwise inflate the lead count.
 *
 * The 10 second auto-redirect is carried over from the previous build. The
 * redirect waits until after the pixel has had a chance to fire, and it is
 * cancelled if the visitor interacts with the page, so nobody gets pulled away
 * mid-sentence.
 */
export function ThankYouTracking({ redirectAfterSeconds = 10 }: { redirectAfterSeconds?: number }) {
  const router = useRouter();
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    trackPixel('Lead', { content_name: 'Website enquiry' });
  }, []);

  useEffect(() => {
    if (cancelled) return;

    const cancel = () => setCancelled(true);
    // Any deliberate interaction means the visitor is reading. Leave them alone.
    const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, cancel, { once: true, passive: true }));

    const timer = window.setTimeout(() => router.push('/'), redirectAfterSeconds * 1000);

    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, cancel));
    };
  }, [cancelled, redirectAfterSeconds, router]);

  return null;
}
