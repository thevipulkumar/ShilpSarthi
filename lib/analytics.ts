/**
 * dataLayer event helpers.
 *
 * Every event the site fires is declared here. Components never touch
 * window.dataLayer directly, so the event vocabulary cannot drift and GTM has a
 * single file to be configured against.
 */

export type AnalyticsEvent =
  | 'generate_lead'
  | 'click_to_call'
  | 'click_whatsapp'
  | 'popup_shown'
  | 'popup_dismissed'
  | 'popup_converted'
  | 'offer_terms_viewed';

type Payload = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, payload: Payload = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

/** Meta Pixel standard events. GTM handles GA4; this is the pixel's own path. */
export function trackPixel(event: 'PageView' | 'Lead', payload: Payload = {}): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq('track', event, payload);
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? '';
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? '';
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '';
