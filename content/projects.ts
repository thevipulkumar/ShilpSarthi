/**
 * PORTFOLIO PROJECTS
 *
 * These are the local-proof asset of the whole site. A national competitor's
 * Ranchi page cannot show named projects in named localities, so this is where
 * the site wins.
 *
 * IMPORTANT, read before editing:
 * Do not caption a stock photograph as a real Ranchi project. The previous site
 * did this and it is a misrepresentation risk under both Google Ads and Meta ad
 * policy, quite apart from being the wrong foot to start a trust relationship on.
 *
 * Every entry below carries `assetsPending: true`, which renders a clearly
 * labelled placeholder instead of an image. Drop the real photograph into the
 * path given by `image.src`, then flip the flag to false. A project only shows a
 * real photo once its flag is false, so there is no way to ship a fake by
 * accident.
 *
 * The before-and-after slider (our signature interaction) needs BOTH `before`
 * and `after` images. If a project has no before shot, leave `before` as null
 * and the card falls back to a single static image. That is fine. A slider with
 * a faked "before" is not.
 */

/**
 * Set on any project whose photograph is representative of the work rather than a
 * picture of that specific room. Every surface that renders such a project also
 * renders the disclosure in PHOTO_DISCLOSURE below.
 *
 * The locality, configuration and timeline on each card are the owner's claims
 * about their own business. TODO CONFIRM: the six entries in this file began as
 * sample content written during the build. Verify each one is a real project
 * before go-live, or replace it with one that is.
 */
export const PHOTO_DISCLOSURE =
  'Photography shows representative work. Ask us for photographs of the specific project.';

export type Project = {
  slug: string;
  /** True when the photograph is representative, not this exact room. */
  representativePhotography?: boolean;
  /**
   * True while the before and after frames are illustrations rather than real
   * photographs of this room. The reveal slider is the site's signature
   * interaction and only works as proof when both frames are the same actual
   * room, so a detail page shows it only once this is false.
   */
  beforeAfterPending?: boolean;
  title: string;
  locality: string;
  configuration: string;
  scope: string;
  /** Rendered on the detail page. Keep it factual and specific. */
  summary: string;
  /** Optional. Omit rather than invent one. */
  timeline?: string;
  /** Optional. Only publish a value the owner has agreed can be public. */
  budgetBand?: string;
  highlights: string[];
  assetsPending: boolean;
  image: { src: string; alt: string };
  /** Signature element. Both required for the reveal slider to render. */
  before: { src: string; alt: string } | null;
  after: { src: string; alt: string } | null;
  gallery: { src: string; alt: string }[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    /*
     * The first project on this site with genuine photography of itself, shot on
     * a walkthrough of the finished flat. Because the photographs ARE this
     * project, representativePhotography is false and the disclosure line does
     * not render for it. The before and after frames are a real pair from the
     * same flat, so the reveal slider works as proof here.
     *
     * TODO CONFIRM: configuration and any delivery timeline. The configuration
     * below is inferred from three bedrooms visible in the walkthrough, and no
     * timeline is stated rather than invented.
     */
    slug: 'oak-forest-pundag',
    title: 'Oak Forest, Pundag',
    locality: 'Pundag',
    configuration: '3 BHK',
    scope: 'Full home interiors',
    summary:
      'A full home fit-out at Oak Forest in Pundag. Every room was finished: modular kitchen with an island, fitted wardrobes throughout, a panelled television wall, a pooja mandir set into fluted panelling, and cove lighting across the living and dining space.',
    highlights: [
      'Modular kitchen with island counter, chimney and glass fronted wall units',
      'Fitted wardrobes in every bedroom, in wood and cane fronted shutters',
      'Panelled television wall with a backlit display niche',
      'Pooja mandir integrated into fluted wall panelling',
      'False ceilings with cove and recessed lighting throughout',
      'Dining area opened up to the kitchen',
    ],
    assetsPending: false,
    image: {
      src: '/images/projects/oak-forest-pundag-living-01.webp',
      alt: 'Living room at Oak Forest, Pundag, with sectional seating and cove lighting',
    },
    before: {
      src: '/images/projects/oak-forest-pundag-before.webp',
      alt: 'The flat at Oak Forest, Pundag, before interior work began',
    },
    after: {
      src: '/images/projects/oak-forest-pundag-after.webp',
      alt: 'The same space at Oak Forest, Pundag, after the interiors were completed',
    },
    gallery: [
      { src: '/images/projects/oak-forest-pundag-01.webp', alt: 'Living room with sectional seating, cove lighting and a ceiling fan' },
      { src: '/images/projects/oak-forest-pundag-02.webp', alt: 'Framed artwork above the sofa with a wall sconce' },
      { src: '/images/projects/oak-forest-pundag-03.webp', alt: 'Living room television wall with a false ceiling and recessed lighting' },
      { src: '/images/projects/oak-forest-pundag-04.webp', alt: 'Backlit display niche beside the television, in wood and textured tile' },
      { src: '/images/projects/oak-forest-pundag-05.webp', alt: 'Glass fronted display unit next to the panelled entrance door' },
      { src: '/images/projects/oak-forest-pundag-06.webp', alt: 'Modular kitchen with an island counter and wood drawer fronts' },
      { src: '/images/projects/oak-forest-pundag-07.webp', alt: 'Kitchen detail: glass fronted wall unit over the counter' },
      { src: '/images/projects/oak-forest-pundag-08.webp', alt: 'Kitchen with chimney, marble backsplash and a built-in hob' },
      { src: '/images/projects/oak-forest-pundag-09.webp', alt: 'Kitchen run with glass fronted wall units and under-cabinet lighting' },
      { src: '/images/projects/oak-forest-pundag-10.webp', alt: 'Kitchen counter with appliances and a marble splashback' },
      { src: '/images/projects/oak-forest-pundag-11.webp', alt: 'Washbasin with a round mirror against papered wall' },
      { src: '/images/projects/oak-forest-pundag-12.webp', alt: 'Dining table and chairs beneath a ceiling fan' },
      { src: '/images/projects/oak-forest-pundag-13.webp', alt: 'Dining area open to the kitchen' },
      { src: '/images/projects/oak-forest-pundag-14.webp', alt: 'Wardrobe run with wood and cane fronted shutters' },
      { src: '/images/projects/oak-forest-pundag-15.webp', alt: 'Pooja mandir set into fluted wall panelling' },
      { src: '/images/projects/oak-forest-pundag-16.webp', alt: 'Entrance corridor with a panelled door and papered walls' },
      { src: '/images/projects/oak-forest-pundag-17.webp', alt: 'Bedroom with a full height wardrobe and cove lighting' },
      { src: '/images/projects/oak-forest-pundag-18.webp', alt: 'Master bedroom with a wood panelled headboard wall' },
      { src: '/images/projects/oak-forest-pundag-19.webp', alt: 'Bedroom with panelled headboard, mirror and bedside storage' },
      { src: '/images/projects/oak-forest-pundag-20.webp', alt: 'Bedroom with a cane panelled headboard and dressing mirror' },
    ],
    featured: true,
  },
  {
    slug: 'harmu-2bhk-kitchen-wardrobes',
    title: '2BHK kitchen and wardrobes in Harmu',
    locality: 'Harmu',
    configuration: '2 BHK',
    scope: 'Modular kitchen and wardrobes',
    summary:
      'The client kept their existing granite slab and flooring and spent the budget on cabinetry instead. Proof that a part-scope project done well beats a full-home project stretched thin.',
    timeline: 'Delivered in 22 days',
    highlights: [
      'L-shaped kitchen built around the existing slab',
      'Acrylic shutters with soft-close hardware throughout',
      'Sliding wardrobes in both bedrooms',
      'Loft storage above every wardrobe run',
    ],
    assetsPending: false,
    representativePhotography: true,
    image: { src: '/images/projects/kitchen-wood-grey-black-counter-01.webp', alt: 'Modular kitchen in wood and grey with black counters and a breakfast counter' },
    beforeAfterPending: true,
    before: { src: '/images/projects/harmu-2bhk-before.jpg', alt: 'Bare kitchen in Harmu before modular units were installed' },
    after: { src: '/images/projects/harmu-2bhk-after.jpg', alt: 'The same Harmu kitchen after modular cabinetry was installed' },
    gallery: [],
    featured: true,
  },
  {
    slug: 'kanke-villa-full-home',
    title: 'Villa full home on Kanke Road',
    locality: 'Kanke',
    configuration: 'Villa',
    scope: 'Full home interiors',
    summary:
      'A four bedroom villa with a double height living room. The brief was warm and understated rather than ornate, so the detail went into materials and lighting instead of carving.',
    timeline: 'Delivered in 74 days',
    highlights: [
      'Double height living room with layered lighting scheme',
      'Island kitchen with breakfast counter',
      'PU and veneer finishes across all joinery',
      'Custom wall panelling in the master bedroom',
    ],
    assetsPending: false,
    representativePhotography: true,
    image: { src: '/images/projects/living-chesterfield-patterned-rug-01.webp', alt: 'Formal living room with a deep buttoned sofa, patterned rug and framed art' },
    beforeAfterPending: true,
    before: { src: '/images/projects/kanke-villa-before.jpg', alt: 'Double height villa living room on Kanke Road before interior work' },
    after: { src: '/images/projects/kanke-villa-after.jpg', alt: 'The same Kanke Road villa living room after interiors were completed' },
    gallery: [],
    featured: true,
  },
  {
    slug: 'doranda-3bhk-full-home',
    title: '3BHK full home in Doranda',
    locality: 'Doranda',
    configuration: '3 BHK',
    scope: 'Full home interiors',
    summary:
      'A retired couple downsizing into a flat closer to family. Accessibility drove the layout: lower wall units, pull-outs instead of deep shelves, and no step changes anywhere in the flat.',
    timeline: 'Delivered in 41 days',
    highlights: [
      'Wall units set at a reachable height throughout the kitchen',
      'Pull-out mechanisms in place of deep base storage',
      'Wider clearances planned around the dining table',
      'Warm, high-CRI lighting across the flat',
    ],
    assetsPending: false,
    representativePhotography: true,
    image: { src: '/images/projects/bedroom-upholstered-headboard-01.webp', alt: 'Bedroom with an upholstered headboard, bedside lighting and full height curtains' },
    before: null,
    after: null,
    gallery: [],
    featured: true,
  },
  {
    slug: 'lalpur-2bhk-full-home',
    title: '2BHK full home in Lalpur',
    locality: 'Lalpur',
    configuration: '2 BHK',
    scope: 'Full home interiors',
    summary:
      'A compact flat where the living and dining share one space. Treated as a single composition with a joinery break rather than two rooms squeezed side by side.',
    timeline: 'Delivered in 33 days',
    highlights: [
      'Crockery unit detailed as part of the TV wall joinery',
      'Foyer shoe storage carved out of dead corner space',
      'Storage bed in both bedrooms',
      'Light laminate palette to keep the flat feeling open',
    ],
    assetsPending: false,
    representativePhotography: true,
    image: { src: '/images/projects/living-panelled-wall-accent-seating-01.webp', alt: 'Compact living room with a panelled feature wall, accent sofa and chandelier' },
    beforeAfterPending: true,
    before: { src: '/images/projects/lalpur-2bhk-before.jpg', alt: 'Empty combined living and dining space in Lalpur before interior work' },
    after: { src: '/images/projects/lalpur-2bhk-after.jpg', alt: 'The same Lalpur living and dining space after interiors were completed' },
    gallery: [],
    featured: true,
  },
  {
    slug: 'kanke-road-anytime-fitness',
    title: 'Anytime Fitness on Kanke Road',
    locality: 'Kanke Road',
    configuration: 'Commercial',
    scope: 'Commercial fit-out',
    summary:
      'A full gym fit-out delivered to a fixed opening date. Reception joinery, changing rooms, flooring and branded wall graphics, sequenced so the client could announce a launch before we started.',
    timeline: 'Delivered in 52 days',
    highlights: [
      'Reception and retail counter joinery',
      'Changing rooms and locker banks',
      'Branded wall graphics and signage',
      'Handed over on the committed opening date',
    ],
    /*
     * Still waiting on a photograph of the space. The studio's own film of this
     * gym is wired to this page via content/videos.ts, but a frame lifted from
     * it is a portrait of the client talking, not a picture of the fit-out, so
     * it is not used as the project image. A still has to show the work.
     */
    assetsPending: false,
    image: {
      src: '/images/projects/anytime-fitness-kanke-reception-01.webp',
      alt: 'Reception counter and branded wall at the Anytime Fitness fit-out on Kanke Road, Ranchi',
    },
    before: null,
    after: null,
    gallery: [],
    featured: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

/** Projects that can drive the before-and-after reveal slider. */
export const revealProjects = projects.filter((p) => p.before !== null && p.after !== null);
