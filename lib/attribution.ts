/**
 * UTM and click ID capture.
 *
 * Captured on first load into sessionStorage and attached to every submission.
 * Without this, no ad platform can attribute a lead back to the click that paid
 * for it, and the whole reporting chain is guesswork.
 *
 * First-touch wins: once a value is stored for the session it is not overwritten
 * by a later internal navigation that happens to carry different parameters.
 */

const STORAGE_KEY = 'ss_attribution';

export type Attribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  fbclid: string;
  landing_page: string;
  referrer: string;
};

const EMPTY: Attribution = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  utm_content: '',
  gclid: '',
  fbclid: '',
  landing_page: '',
  referrer: '',
};

function safeSession(): Storage | null {
  try {
    if (typeof window === 'undefined') return null;
    // Reading the property throws in some privacy modes, so probe it.
    const s = window.sessionStorage;
    const probe = '__ss_probe__';
    s.setItem(probe, '1');
    s.removeItem(probe);
    return s;
  } catch {
    return null;
  }
}

/** Call once on first load. Safe to call repeatedly. */
export function captureAttribution(): Attribution {
  const store = safeSession();
  if (!store) return EMPTY;

  const existing = store.getItem(STORAGE_KEY);
  if (existing) {
    try {
      return { ...EMPTY, ...(JSON.parse(existing) as Partial<Attribution>) };
    } catch {
      // Corrupted value, fall through and rewrite it.
    }
  }

  const params = new URLSearchParams(window.location.search);
  const captured: Attribution = {
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    utm_term: params.get('utm_term') ?? '',
    utm_content: params.get('utm_content') ?? '',
    gclid: params.get('gclid') ?? '',
    fbclid: params.get('fbclid') ?? '',
    landing_page: window.location.pathname + window.location.search,
    referrer: document.referrer || '',
  };

  try {
    store.setItem(STORAGE_KEY, JSON.stringify(captured));
  } catch {
    // Storage full or blocked. The values still work for this page view.
  }
  return captured;
}

export function getAttribution(): Attribution {
  const store = safeSession();
  if (!store) return EMPTY;
  const raw = store.getItem(STORAGE_KEY);
  if (!raw) return EMPTY;
  try {
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<Attribution>) };
  } catch {
    return EMPTY;
  }
}

/** Marks that this session has already produced a lead. Suppresses the popup. */
const LEAD_KEY = 'ss_lead_submitted';

export function markLeadSubmitted(): void {
  try {
    safeSession()?.setItem(LEAD_KEY, '1');
  } catch {
    /* non-fatal */
  }
}

export function hasSubmittedLead(): boolean {
  try {
    return safeSession()?.getItem(LEAD_KEY) === '1';
  } catch {
    return false;
  }
}
