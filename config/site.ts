/**
 * Single source of truth for business details.
 * Everything a non-developer might need to change about contact details,
 * promises, or feature flags lives in this file.
 */

export const site = {
  name: 'Shilp Sarthi',
  legalName: 'Shilp Sarthi',
  tagline: "Ranchi's trusted home interior design studio",

  /** Change this at go-live if the final domain differs. Used for canonicals. */
  url: 'https://www.shilpsarthi.in',

  description:
    'Shilp Sarthi designs and delivers full home interiors, modular kitchens and wardrobes in Ranchi. Visit our Singh More studio and see homes we have delivered in Pundag, Harmu, Kanke and Doranda.',

  studio: {
    line1: '4th Floor, Royal Heights',
    line2: 'Beside True Value, Singh More',
    city: 'Ranchi',
    state: 'Jharkhand',
    postalCode: '834004',
    country: 'IN',
    /**
     * Local offline identity of the outlet. This is also the name the Google
     * Business Profile carries, which is why it now appears in two places rather
     * than one: the Contact address block, and the embedded map on the homepage.
     */
    localIdentity: 'HomeLane Singh More Ranchi',
    /** TODO CONFIRM: drop a pin on the studio and paste the exact coordinates. */
    geo: { latitude: 23.3585, longitude: 85.2795 },

    /*
     * The embedded map resolves the real Google listing rather than searching on
     * the address text, so the pin lands on the correct building.
     *
     * KNOW WHAT THIS RENDERS. The listing is titled "HomeLane Singh More,
     * Interior Design Studio" and does not mention Shilp Sarthi, so the embedded
     * map displays that name. The owner chose this deliberately, accepting the
     * trade-off, and confirmed the listing name cannot be changed under the
     * franchise terms. Because the map shows the mark either way, the section
     * carries a line explaining the local identity: an unexplained HomeLane label
     * under a Shilp Sarthi heading is worse than a stated one.
     *
     * Source: https://share.google/1Lk5M7WRC9vU7gXoU
     */
    mapsListingName: 'HomeLane Singh More, Interior Design Studio',
    mapsEmbedQuery: 'HomeLane+Singh+More,+Interior+Design+Studio+Ranchi',

    /*
     * Deliberately empty. The owner chose to keep it out of the structured data,
     * so `sameAs` does not tie this site's identity to a HomeLane-named entity.
     * Leaving it blank also means the "Read our Google reviews" button stays a
     * placeholder rather than pointing at a listing under another name.
     */
    googleBusinessProfile: '',
    parking: 'Free parking in the building forecourt, lift to the 4th floor.',
    hours: [
      { days: 'Monday to Saturday', open: '10:00', close: '20:00' },
      { days: 'Sunday', open: '11:00', close: '18:00' },
    ],
    /** Machine-readable equivalent of the above, for LocalBusiness schema. */
    schemaHours: [
      { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '20:00' },
      { days: ['Sunday'], opens: '11:00', closes: '18:00' },
    ],
  },

  phones: {
    primary: { display: '97092 11050', tel: '+919709211050' },
    secondary: { display: '98013 49992', tel: '+919801349992' },
  },

  whatsapp: {
    number: '919801349992',
    link: 'https://wa.me/919801349992',
  },

  /**
   * Public-facing address only. This forwards to the existing Gmail inbox so
   * no lead flow breaks. Do NOT display the Gmail address anywhere on the site.
   * BRIEF.md section 4.
   */
  email: 'info@shilpsarthi.in',

  social: {
    instagram: 'https://instagram.com/shilp_sarthi',
    facebook: 'https://facebook.com/ShilpSarthi',
    youtube: 'https://youtube.com/@ShilpSarthiArchitect',
  },

  /**
   * Numbers shown in the trust strip.
   * TODO CONFIRM: are these current? Stale figures are an ad-review risk.
   */
  stats: {
    googleRating: 4.9,
    googleReviewCount: 62,
    projectsDelivered: 250,
    warrantyYears: 10,
    yearsInRanchi: 8,
  },

  pricing: {
    startingFrom: 350000,
    startingFromLabel: 'Rs. 3.5 Lakh',
    startingFromConfig: '2BHK',
    /** Rendered into LocalBusiness schema. */
    priceRange: '₹₹',
  },

  timelines: {
    '2bhk': '30 to 45 days',
    '3bhk4bhk': '45 to 60 days',
  },

  serviceArea: {
    primary: 'Ranchi',
    secondary: ['Hazaribagh', 'Jamshedpur', 'Dhanbad', 'Bokaro'],
    localities: [
      'Bariatu',
      'Harmu',
      'Lalpur',
      'Kanke',
      'Doranda',
      'Ratu Road',
      'Ashok Nagar',
      'Morabadi',
      'Argora',
      'Singh More',
    ],
  },

  /**
   * The 30-minute callback promise. Confirmed by the owner as staffable.
   * If the team can no longer honour it, set enabled to false. It disappears
   * from the hero and the forms with no other code change.
   */
  responsePromise: {
    enabled: true,
    text: 'A designer calls you within 30 minutes, 10am to 8pm.',
    short: 'Designer calls back in 30 minutes',
  },

  /**
   * While no photographs exist, the vector illustrations from
   * `npm run illustrations` stand in for them on the service, studio and about
   * pages. Set this to false to go back to blank panels, or just drop real
   * photographs into /incoming and run `npm run photos`, which overwrites them.
   *
   * Deliberately does NOT cover the project manager portrait or the portfolio
   * project cards: an illustration in place of a named person, or of a specific
   * delivered flat, is a claim rather than a decoration.
   */
  useIllustrations: true,

  features: {
    /*
     * The fixed WhatsApp and Call bar pinned to the bottom on mobile. Switched
     * off: it read as cheap next to the rest of the page and it covered content.
     *
     * Turning it back on is this one line. Nothing else needs changing: the
     * consent banner and the corner popup both read this flag and reclaim the
     * 72px it used to occupy, and the bottom spacer comes back with it.
     *
     * Worth knowing what is lost while it is off. Mobile is roughly 85 percent of
     * paid traffic here and WhatsApp converts well in this market, so the always
     * reachable tap target went with it. What remains on mobile: the call button
     * in the sticky header at every breakpoint, the WhatsApp button in the hero,
     * and the consultation form.
     */
    mobileStickyBar: false,

    /**
     * Hindi toggle on the enquiry forms. Off until the owner confirms the
     * team can handle Hindi enquiries end to end. Turning this on without that
     * staffing produces Hindi leads nobody can answer.
     */
    hindiToggle: false,
    /** Instagram feed via Behold.so. Needs a feed ID in .env.local first. */
    instagramFeed: false,
    /** Consent banner. Future-proofs against DPDP Act consent rules. */
    consentBanner: true,
  },
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/process', label: 'Process' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export const formattedAddress = [
  site.studio.line1,
  site.studio.line2,
  `${site.studio.city}, ${site.studio.state} ${site.studio.postalCode}`,
].join(', ');

/** Builds a prefilled WhatsApp link. Keeps message copy out of components. */
export function whatsappLink(message?: string): string {
  if (!message) return site.whatsapp.link;
  return `${site.whatsapp.link}?text=${encodeURIComponent(message)}`;
}
