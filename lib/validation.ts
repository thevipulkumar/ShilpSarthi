/**
 * Shared validation. Used by both the client form and the API route, so a
 * request that bypasses the browser cannot get past rules the UI enforces.
 */

/** Indian mobile numbers are 10 digits starting 6, 7, 8 or 9. */
const INDIAN_MOBILE = /^[6-9]\d{9}$/;

/** Strips +91, 0091, leading 0, spaces, dashes and brackets. */
export function normalisePhone(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 13 && digits.startsWith('091')) return digits.slice(3);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits;
}

export function isValidIndianMobile(input: string): boolean {
  return INDIAN_MOBILE.test(normalisePhone(input));
}

export function isValidName(input: string): boolean {
  const trimmed = input.trim();
  return trimmed.length >= 2 && trimmed.length <= 80;
}

export type LeadPayload = {
  name: string;
  phone: string;
  propertyType: string;
  message?: string;
  source_page: string;
  form_variant: string;
  service_interest?: string;
  estimate_range?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
  /** Honeypot. Must be empty. Bots fill it because it is in the DOM. */
  company?: string;
  /** Milliseconds between form render and submit. Humans take longer than this. */
  elapsedMs?: number;
};

/** Minimum time a genuine visitor takes to fill three fields. */
export const MIN_FILL_MS = 2500;

export type ValidationResult = { ok: true } | { ok: false; error: string };

export function validateLead(payload: Partial<LeadPayload>): ValidationResult {
  // Honeypot: silently invalid. The caller returns a success-shaped response so
  // the bot has no signal to tune against.
  if (payload.company && payload.company.trim() !== '') {
    return { ok: false, error: 'spam' };
  }

  if (typeof payload.elapsedMs === 'number' && payload.elapsedMs < MIN_FILL_MS) {
    return { ok: false, error: 'spam' };
  }

  if (!payload.name || !isValidName(payload.name)) {
    return { ok: false, error: 'Please enter your name.' };
  }

  if (!payload.phone || !isValidIndianMobile(payload.phone)) {
    return { ok: false, error: 'Please enter a valid 10 digit mobile number.' };
  }

  return { ok: true };
}
