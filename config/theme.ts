/**
 * PALETTE DIRECTION SWITCH
 * ------------------------
 * BRIEF.md section 14.
 *
 *   'independent'  Direction A. Warm Linen, Deep Ink, Terracotta.
 *                  Shipped default. Requires no permission from anyone.
 *
 *   'partner'      Direction B. HomeLane-aligned accent, Deep Ink retained
 *                  for structure and body text so contrast holds.
 *                  DO NOT ACTIVATE until written brand-usage permission from
 *                  HomeLane is confirmed and filed. As of the last update to
 *                  this file, permission had NOT been granted.
 *
 * To switch: change the one line below. Nothing else in the codebase needs to
 * change. The value is written onto <html data-palette="..."> and every colour
 * token in tailwind.config.ts resolves through CSS custom properties.
 *
 * Direction B's accent hex values in app/globals.css are PLACEHOLDERS in the
 * correct colour family. Before activating, extract the exact values from
 * HomeLane's live CSS and replace them, and re-run the contrast check in the
 * README so the CTA still clears WCAG AA.
 */
export type PaletteDirection = 'independent' | 'partner';

export const PALETTE: PaletteDirection = 'independent';

/**
 * Logo usage is gated separately from the palette. Even with palette Direction B
 * active, the HomeLane wordmark or logo file must not render anywhere on the
 * site unless this is true AND the permission letter covers logo use
 * specifically. See components/PartnerBadge.tsx, which is the single place the
 * mark is allowed to appear.
 */
export const HOMELANE_LOGO_PERMITTED = false;
