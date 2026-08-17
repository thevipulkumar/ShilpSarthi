'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { isOfferLive, offer, offerHeadline } from '@/config/offer';
import { site } from '@/config/site';
import { useSite } from '@/components/providers/SiteProvider';
import { LeadForm } from '@/components/forms/LeadForm';
import { CloseIcon } from '@/components/ui/Icons';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { Countdown } from './Countdown';

/**
 * THE TIMED OFFER POPUP
 *
 * Google's landing page policy penalises interstitials that obscure content or
 * are hard to dismiss, and Meta's ad review flags the same thing. A timed popup
 * is fine. A timed popup that traps a visitor is a disapproval. Everything below
 * exists to keep this on the right side of that line:
 *
 *   - large close button, never below 44x44
 *   - Escape closes, backdrop click closes
 *   - focus trapped while open, returned to the previously focused element
 *   - bottom sheet on mobile, never a full-screen cover
 *   - the whole thing is switchable off from config/offer.ts in one edit
 *
 * Suppression rules are in `shouldSuppress` below, each mapped to BRIEF.md
 * section 8.
 */

const DISMISS_KEY = 'ss_popup_dismissed_at';
const SHOWN_KEY = 'ss_popup_shown';
const DISMISS_DAYS = 7;
const DWELL_MS = 30_000;
const SCROLL_TRIGGER = 0.55;

export function OfferPopup({ sourcePage = '/' }: { sourcePage?: string }) {
  const { leadSubmitted, formFieldFocused } = useSite();

  const [open, setOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Read live state inside the trigger listeners without re-registering them.
  const suppressRef = useRef({ leadSubmitted, formFieldFocused });
  useEffect(() => {
    suppressRef.current = { leadSubmitted, formFieldFocused };
  }, [leadSubmitted, formFieldFocused]);

  const enabled = offer.popupEnabled && isOfferLive();

  const shouldSuppress = useCallback((): boolean => {
    const s = suppressRef.current;

    if (s.leadSubmitted) return true; // already converted this session
    if (s.formFieldFocused) return true; // typing in a form right now

    try {
      if (window.sessionStorage.getItem(SHOWN_KEY) === '1') return true; // once per session

      const dismissedAt = window.localStorage.getItem(DISMISS_KEY);
      if (dismissedAt) {
        const elapsed = Date.now() - Number(dismissedAt);
        if (Number.isFinite(elapsed) && elapsed < DISMISS_DAYS * 86_400_000) return true;
      }
    } catch {
      // Storage blocked. Suppress rather than risk showing it on every page.
      return true;
    }

    return false;
  }, []);

  const show = useCallback(() => {
    if (!enabled || shouldSuppress()) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    setOpen(true);

    try {
      window.sessionStorage.setItem(SHOWN_KEY, '1');
    } catch {
      /* non-fatal */
    }

    track('popup_shown', { source_page: sourcePage, variant: offer.popupVariant });
  }, [enabled, shouldSuppress, sourcePage]);

  const close = useCallback(
    (reason: 'dismissed' | 'converted') => {
      setOpen(false);

      if (reason === 'dismissed') {
        try {
          window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
        } catch {
          /* non-fatal */
        }
        track('popup_dismissed', { source_page: sourcePage, variant: offer.popupVariant });
      }

      previouslyFocused.current?.focus?.();
    },
    [sourcePage],
  );

  /* Viewport probe. Under 380px a centre modal cannot render without covering
     the screen, so it degrades to a bottom sheet capped at 60% height. */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setIsNarrow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  /* Triggers: whichever of dwell, scroll depth or exit intent comes first. */
  useEffect(() => {
    if (!enabled) return;

    let dwellMs = 0;
    let lastTick = Date.now();
    let fired = false;

    const fire = () => {
      if (fired) return;
      fired = true;
      show();
    };

    // Dwell time, paused while the tab is hidden. A visitor who left the tab
    // open in the background has not spent 30 seconds with the page.
    const interval = window.setInterval(() => {
      const now = Date.now();
      if (document.visibilityState === 'visible') dwellMs += now - lastTick;
      lastTick = now;
      if (dwellMs >= DWELL_MS) {
        window.clearInterval(interval);
        fire();
      }
    }, 1000);

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= SCROLL_TRIGGER) fire();
    };

    // Exit intent, desktop only: a pointer leaving toward the top of the window.
    const onMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget || event.clientY > 8) return;
      if (window.matchMedia('(pointer: coarse)').matches) return;
      fire();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [enabled, show]);

  /* Escape to close, focus trap, and scroll lock while open. */
  useEffect(() => {
    if (!open) return;

    document.body.dataset.scrollLocked = 'true';
    // Focus the close button first, so the very first tab stop is the way out.
    window.setTimeout(() => closeButtonRef.current?.focus(), 50);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close('dismissed');
        return;
      }

      if (event.key !== 'Tab') return;

      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      delete document.body.dataset.scrollLocked;
    };
  }, [open, close]);

  if (!enabled || !open) return null;

  /* Corner card variant. Converts less but cannot be read as an interstitial,
     so it is the safe fallback if either ad platform raises a flag. */
  if (offer.popupVariant === 'corner') {
    return (
      <div
        role="dialog"
        aria-modal="false"
        aria-labelledby="offer-popup-title"
        ref={dialogRef}
        className={cn(
          'fixed right-3 z-[70] w-[min(22rem,calc(100vw-1.5rem))] animate-slide-in-corner rounded-2xl border border-ink-200 bg-white shadow-panel sm:bottom-5 sm:right-5',
          // Clears the mobile CTA bar when it is enabled.
          site.features.mobileStickyBar
            ? 'bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))]'
            : 'bottom-[calc(1rem+env(safe-area-inset-bottom,0px))]',
        )}
      >
        <PopupBody
          sourcePage={sourcePage}
          onClose={() => close('dismissed')}
          onConverted={() => close('converted')}
          closeButtonRef={closeButtonRef}
          compact
        />
      </div>
    );
  }

  /* Modal variant: bottom sheet on mobile, centre modal from sm up. */
  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-ink-950/55 backdrop-blur-[2px]"
        onClick={() => close('dismissed')}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-popup-title"
        ref={dialogRef}
        className={cn(
          'relative w-full bg-white shadow-panel',
          isNarrow
            ? // Bottom sheet. Capped so it never covers the whole viewport.
              'max-h-[60vh] animate-sheet-up overflow-y-auto rounded-t-[20px]'
            : 'max-h-[88vh] max-w-md animate-scale-in overflow-y-auto rounded-2xl',
        )}
      >
        {isNarrow ? (
          <div className="sticky top-0 flex justify-center bg-white pt-2.5" aria-hidden="true">
            <span className="h-1 w-10 rounded-full bg-ink-200" />
          </div>
        ) : null}

        <PopupBody
          sourcePage={sourcePage}
          onClose={() => close('dismissed')}
          onConverted={() => close('converted')}
          closeButtonRef={closeButtonRef}
        />
      </div>
    </div>
  );
}

function PopupBody({
  sourcePage,
  onClose,
  onConverted,
  closeButtonRef,
  compact,
}: {
  sourcePage: string;
  onClose: () => void;
  onConverted: () => void;
  closeButtonRef: React.RefObject<HTMLButtonElement | null>;
  compact?: boolean;
}) {
  return (
    <div className={cn('relative px-5 pb-5', compact ? 'pt-4' : 'pt-5 sm:px-6 sm:pb-6')}>
      {/* 44x44 minimum, always reachable, always the first tab stop. */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close offer"
        className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900 focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2"
      >
        <CloseIcon />
      </button>

      <p className="eyebrow text-accent-600">{offer.label}</p>
      <h2 id="offer-popup-title" className="mt-1 pr-10 text-display-sm">
        {offerHeadline()} on your interiors
      </h2>

      <div className="mt-2">
        <Countdown tone="light" prefix="Offer ends in" className="text-body-sm" />
      </div>

      <p className="mt-2 text-body-sm text-ink-600">
        Leave your number and a designer calls you back with a room by room breakdown. No obligation
        to book anything.
      </p>

      <LeadForm
        variant="popup"
        sourcePage={sourcePage}
        submitLabel="Get my free consultation"
        compact
        onSuccess={onConverted}
        className="mt-4"
      />

      <p className="mt-3 text-center text-caption text-ink-500">
        <Link href={offer.termsUrl} className="underline underline-offset-2 hover:text-ink-700">
          {offer.label} terms apply
        </Link>
      </p>
    </div>
  );
}
