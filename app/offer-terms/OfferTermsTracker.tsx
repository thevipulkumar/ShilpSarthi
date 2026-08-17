'use client';

import { useEffect } from 'react';
import { offer } from '@/config/offer';
import { track } from '@/lib/analytics';

/**
 * Fires `offer_terms_viewed` once per page view.
 *
 * Worth measuring rather than assuming: if almost nobody reaches this page, the
 * offer copy is being taken on trust, and if a large share do, the discount is
 * doing more of the persuading than the work is.
 */
export function OfferTermsTracker() {
  useEffect(() => {
    track('offer_terms_viewed', { offer_label: offer.label, offer_percentage: offer.percentage });
  }, []);

  return null;
}
