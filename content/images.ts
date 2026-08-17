/**
 * THE IMAGE MANIFEST
 *
 * Every image on the site is declared here, with where it came from and what
 * licence it sits under. No component references an image file directly.
 *
 * The point is auditability. If HomeLane ever queries usage, or the partner
 * agreement changes, the owner needs to identify and pull every affected file in
 * minutes. `npm run images:provenance` prints exactly that list.
 *
 * It is also a safety interlock. Some slots make factual claims about Shilp
 * Sarthi's own work: a portfolio card captioned "Bariatu, 3BHK", the before and
 * after slider, the named project manager, the Singh More studio. A licensed
 * third-party photograph in one of those slots is a false statement on a page
 * carrying paid traffic, and the licence does not make the caption true.
 * `SiteImage` refuses to render that combination.
 */

export type ImageSource =
  /** Shilp Sarthi's own photography. The destination for every slot. */
  | 'own'
  /** Supplied under the HomeLane partner agreement. */
  | 'homelane-licensed'
  /** Drawn by scripts/generate-illustrations.mjs. A stopgap. */
  | 'generated'
  /** Third-party stock under a licence permitting commercial use. */
  | 'stock-licensed';

/**
 * What the slot asserts. `own-work` slots carry a claim about a project Shilp
 * Sarthi delivered; `illustrative` slots decorate and claim nothing.
 */
export type SlotKind = 'own-work' | 'illustrative';

export interface ImageSlot {
  /** Stable key. Components ask for images by this, never by path. */
  id: string;
  /** Path under /public. */
  src: string;
  /** Descriptive only. Never a locality, project, client or date on a licensed asset. */
  alt: string;
  width: number;
  height: number;
  source: ImageSource;
  kind: SlotKind;
  /** Where a licensed third-party asset came from. */
  sourceUrl?: string;
  /** ISO date the asset was retrieved. */
  retrievedAt?: string;
  /** e.g. 'HomeLane partner agreement, ref XXX'. */
  licenceNote?: string;
  /** Original pixel dimensions, so a higher-resolution swap is possible later. */
  note?: string;
  /** Page prominence, 1 is highest. Orders the replacement backlog. */
  prominence: number;
}

/**
 * Sources that may never occupy an `own-work` slot, whatever the licence says.
 * Section 3 of the asset brief.
 */
export const FORBIDDEN_IN_OWN_WORK: ImageSource[] = ['homelane-licensed', 'stock-licensed'];

export const images: ImageSlot[] = [
  /* ---- Service cards. Illustrative, so licensed imagery is permitted here. -- */
  {
    id: 'service.full-home-interiors',
    src: '/images/services/living-dining-tv-unit-display-01.webp',
    alt: 'Living and dining area with a television unit, glazed display cabinet and marble flooring',
    width: 800, height: 600, source: 'homelane-licensed', kind: 'illustrative', prominence: 3,
    retrievedAt: '2026-08-16',
    licenceNote: 'HomeLane partner agreement. TODO: add the agreement reference.',
    note: 'original 800x600, supplied in ./images',
  },
  {
    id: 'service.modular-kitchen',
    src: '/images/services/kitchen-island-marble-green-stools-01.webp',
    alt: 'Modular island kitchen with a marble counter, pendant lights and green bar stools',
    width: 800, height: 600, source: 'homelane-licensed', kind: 'illustrative', prominence: 3,
    retrievedAt: '2026-08-16',
    licenceNote: 'HomeLane partner agreement. TODO: add the agreement reference.',
    note: 'original 800x600, supplied in ./images',
  },
  {
    id: 'service.bedroom-wardrobe',
    src: '/images/services/bedroom-fitted-wardrobe-ceiling-fan-01.webp',
    alt: 'Bedroom with a fitted floor to ceiling wardrobe, ceiling fan and tiled flooring',
    width: 800, height: 600, source: 'homelane-licensed', kind: 'illustrative', prominence: 3,
    retrievedAt: '2026-08-16',
    licenceNote: 'HomeLane partner agreement. TODO: add the agreement reference.',
    note: 'original 800x600, supplied in ./images',
  },
  {
    id: 'service.living-room',
    src: '/images/services/living-room-daylight-chandelier-01.webp',
    alt: 'Living room in daylight with a chandelier, upholstered seating and full height windows',
    width: 800, height: 600, source: 'homelane-licensed', kind: 'illustrative', prominence: 3,
    retrievedAt: '2026-08-16',
    licenceNote: 'HomeLane partner agreement. TODO: add the agreement reference.',
    note: 'original 800x600, supplied in ./images',
  },
  {
    id: 'service.commercial-interiors',
    src: '/images/services/commercial-interiors.jpg',
    alt: 'Commercial interior with a reception counter and seating',
    width: 1200, height: 900, source: 'stock-licensed', kind: 'illustrative', prominence: 4,
    sourceUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    retrievedAt: '2026-08-16',
    licenceNote: 'Unsplash Licence: commercial use permitted, no attribution required',
    note: 'original 1600x1068',
  },

  /*
   * Atmospheric imagery for About and Contact. Marked illustrative, and the copy
   * around them describes the work rather than claiming to be a photograph of the
   * Singh More studio. That distinction is the whole reason these are permitted
   * where studio.interior is not.
   */
  {
    id: 'studio.craft',
    src: '/images/studio/wardrobe-internals-drawers-hanging-01.webp',
    alt: 'Wardrobe internals with hanging space, a drawer bank and shelving',
    width: 800, height: 600, source: 'homelane-licensed', kind: 'illustrative', prominence: 4,
    retrievedAt: '2026-08-16',
    licenceNote: 'HomeLane partner agreement. TODO: add the agreement reference.',
    note: 'original 800x600, supplied in ./images',
  },
  {
    id: 'studio.finishes',
    src: '/images/studio/reading-corner-joinery-shelving-01.webp',
    alt: 'Reading corner with built-in shelving joinery and an armchair',
    width: 800, height: 600, source: 'homelane-licensed', kind: 'illustrative', prominence: 5,
    retrievedAt: '2026-08-16',
    licenceNote: 'HomeLane partner agreement. TODO: add the agreement reference.',
    note: 'original 800x600, supplied in ./images',
  },

  /*
   * Interim stand-in for the Visit us section while the studio photograph is
   * being taken. Marked illustrative because the section renders it with a
   * caption saying it shows the kind of work on display rather than the room
   * itself. `studio.interior` below stays an own-work slot and stays at the top
   * of `npm run images:audit`, so this does not quietly become permanent.
   *
   * TO REMOVE: drop the real studio photograph in and set studio.interior's
   * source to 'own'. StudioVisit switches over on its own and this slot and its
   * caption disappear.
   */
  {
    id: 'studio.interim',
    src: '/images/studio/finishes-glossy-cabinets-interim-01.webp',
    alt: 'Kitchen cabinetry in a glossy ecru finish with brushed hardware',
    width: 800, height: 600, source: 'homelane-licensed', kind: 'illustrative', prominence: 2,
    retrievedAt: '2026-08-17',
    licenceNote: 'HomeLane partner agreement. TODO: add the agreement reference.',
    note: 'original 800x600, supplied in ./images. Interim only.',
  },

  /* ---- Own-work slots. Licensed third-party imagery is refused here. -------- */
  {
    id: 'studio.interior',
    src: '/images/studio/shilp-sarthi-studio-singh-more.jpg',
    alt: 'Inside the Shilp Sarthi studio at Royal Heights, Singh More, Ranchi',
    width: 1200, height: 900, source: 'generated', kind: 'own-work', prominence: 2,
  },
  {
    id: 'studio.team',
    src: '/images/studio/shilp-sarthi-team-ranchi.jpg',
    alt: 'The Shilp Sarthi design and project team at the Singh More studio',
    width: 1200, height: 900, source: 'generated', kind: 'own-work', prominence: 5,
  },
  {
    id: 'team.project-manager',
    src: '/images/team/arunabh-sharma-head-of-operations.webp',
    alt: 'Arunabh Sharma, Head of Operations at Shilp Sarthi in Ranchi',
    width: 640, height: 640, source: 'own', kind: 'own-work', prominence: 1,
    note: 'original 640x640 jpeg, supplied in ./images',
  },
];

export function getImage(id: string): ImageSlot | undefined {
  return images.find((i) => i.id === id);
}

/** True if this asset may not sit in this slot. Enforced by SiteImage. */
export function violatesSlotRule(slot: ImageSlot): boolean {
  return slot.kind === 'own-work' && FORBIDDEN_IN_OWN_WORK.includes(slot.source);
}
