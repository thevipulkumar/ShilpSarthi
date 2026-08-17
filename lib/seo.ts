/**
 * Shared helpers for page metadata.
 *
 * Two problems these exist to stop recurring:
 *
 *   1. Descriptions written as prose ran to 190 to 290 characters, and Google
 *      truncates the snippet around 155. The tail was being written and never
 *      read. `clampDescription` cuts at a sentence, or failing that a word.
 *   2. A page that sets `openGraph` without `images` does not inherit the
 *      layout's card, it drops it. The five service pages were shipping with no
 *      og:image at all because of this. `ogImage` makes the image explicit at
 *      every call site that overrides openGraph.
 */
import type { Metadata } from 'next';

/** Google truncates around 155 characters. Leave a little headroom. */
const MAX_DESCRIPTION = 152;

export function clampDescription(text: string, max = MAX_DESCRIPTION): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  // Prefer ending on a full sentence, so the snippet never reads as cut off.
  const sentence = clean.slice(0, max + 1).lastIndexOf('. ');
  if (sentence > max * 0.6) return clean.slice(0, sentence + 1);

  const word = clean.slice(0, max + 1).lastIndexOf(' ');
  return clean.slice(0, word > 0 ? word : max).replace(/[,;:]$/, '') + '...';
}

/**
 * Google truncates titles around 60 characters. The layout appends
 * " | Shilp Sarthi", so a page's own portion has 45 to work with.
 */
export const TITLE_BUDGET = 45;

type OgImage = NonNullable<NonNullable<Metadata['openGraph']>['images']>;

/**
 * Resolved against metadataBase by Next, so a path under /public is enough.
 * `alt` is required: a share card with no alt text is invisible to a screen
 * reader reading a shared link.
 */
export function ogImage(src: string, alt: string, width = 1200, height = 630): OgImage {
  return [{ url: src, width, height, alt }];
}

/** The site-wide card: the Oak Forest, Pundag living room. */
export const DEFAULT_OG = '/images/og/default.jpg';
export const DEFAULT_OG_ALT =
  'Living room of a full home interior delivered by Shilp Sarthi at Oak Forest, Pundag, Ranchi';
