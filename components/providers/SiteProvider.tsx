'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { captureAttribution, hasSubmittedLead } from '@/lib/attribution';
import { readSession, useClientSnapshot } from '@/lib/hooks';

/**
 * Cross-component state the popup needs in order to stay out of the way.
 *
 * The popup suppression rules in BRIEF.md section 8 depend on things only other
 * components know: whether a form field is focused, whether a lead already
 * converted. Rather than have the popup reach into the DOM to guess, components
 * report their state here.
 */

type SiteState = {
  leadSubmitted: boolean;
  markLeadConverted: () => void;
  formFieldFocused: boolean;
  setFormFieldFocused: (focused: boolean) => void;
  offerBarVisible: boolean;
  dismissOfferBar: () => void;
};

const SiteContext = createContext<SiteState | null>(null);

const OFFER_BAR_KEY = 'ss_offer_bar_dismissed';

export function SiteProvider({ children }: { children: ReactNode }) {
  /*
   * Two sources feed each of these flags: what storage said when the page
   * loaded, and what has happened since. They are combined rather than synced,
   * so nothing has to be copied from storage into state on mount.
   */
  const leadInStorage = useClientSnapshot(
    () => hasSubmittedLead(),
    () => false,
  );
  const barDismissedInStorage = useClientSnapshot(
    () => readSession(OFFER_BAR_KEY) === '1',
    () => false,
  );

  const [convertedThisRender, setConvertedThisRender] = useState(false);
  const [barDismissedNow, setBarDismissedNow] = useState(false);

  const [formFieldFocused, setFormFieldFocused] = useState(false);

  const leadSubmitted = leadInStorage || convertedThisRender;
  const offerBarVisible = !barDismissedInStorage && !barDismissedNow;

  useEffect(() => {
    // First-load attribution capture, writing to sessionStorage. Everything
    // downstream reads it back from there at submit time.
    captureAttribution();
  }, []);

  const markLeadConverted = useCallback(() => setConvertedThisRender(true), []);

  const dismissOfferBar = useCallback(() => {
    setBarDismissedNow(true);
    try {
      // Session scoped, not 7 day scoped: a returning visitor in a new session
      // should see a live offer again.
      window.sessionStorage.setItem(OFFER_BAR_KEY, '1');
    } catch {
      /* non-fatal */
    }
  }, []);

  const value = useMemo<SiteState>(
    () => ({
      leadSubmitted,
      markLeadConverted,
      formFieldFocused,
      setFormFieldFocused,
      offerBarVisible,
      dismissOfferBar,
    }),
    [
      leadSubmitted,
      markLeadConverted,
      formFieldFocused,
      offerBarVisible,
      dismissOfferBar,
    ],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteState {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
}
