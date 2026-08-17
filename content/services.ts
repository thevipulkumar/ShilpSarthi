export type Service = {
  slug: string;
  title: string;
  /** Used in nav and cards. Shorter than title. */
  shortTitle: string;
  /** Card and meta description. One sentence, no em dashes. */
  summary: string;
  /** Page hero paragraph. */
  intro: string;
  timeline: string;
  includes: string[];
  /** Rendered as an FAQ-style block on the service page. */
  detail: { heading: string; body: string }[];
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: 'full-home-interiors',
    title: 'Full home interiors in Ranchi',
    shortTitle: 'Full home interiors',
    summary:
      'One team, one contract and one timeline for every room, from the kitchen to the last wardrobe handle.',
    intro:
      'A full home project is the reason most people call us. You hand over an empty flat and take back a finished home, with one project manager answering for all of it. No coordinating a carpenter against an electrician against a painter.',
    timeline: '30 to 45 days for a 2BHK, 45 to 60 days for a 3BHK or 4BHK',
    includes: [
      'Modular kitchen with counter, storage and accessories',
      'Fitted wardrobes in every bedroom',
      'TV unit, crockery unit and study or work surfaces',
      'False ceiling and designed lighting',
      'Painting across the flat',
      'Bed, side tables and dresser where the package includes them',
      'Site supervision and a single point of contact',
    ],
    detail: [
      {
        heading: 'What happens on site',
        body: 'Carcasses are manufactured in a factory and delivered flat-packed, so most of the noise and dust of a traditional carpenter job never enters your flat. Assembly, electrical, false ceiling and painting run to a written sequence your project manager shares before work starts.',
      },
      {
        heading: 'How we handle a flat that is still under construction',
        body: 'We can start design and material selection while civil work finishes, then hold manufacturing until the flat is measurable. Booking early usually saves two to three weeks against waiting for handover.',
      },
      {
        heading: 'What is not included',
        body: 'Civil and plumbing changes, appliances, soft furnishings and any structural work are quoted separately. We list them explicitly in your quotation rather than leaving them to be discovered later.',
      },
    ],
    metaTitle: 'Full Home Interiors in Ranchi | Shilp Sarthi',
    metaDescription:
      'Full home interior design in Ranchi. Factory-made modular work, 30 to 45 day timelines, 10 year warranty. Visit our Singh More studio.',
  },
  {
    slug: 'modular-kitchen',
    title: 'Modular kitchen design in Ranchi',
    shortTitle: 'Modular kitchen',
    summary:
      'Factory-built cabinetry sized to your slab, with hardware rated for the way an Indian kitchen actually gets used.',
    intro:
      'A kitchen is the room that decides whether the rest of the project was worth it. We size every unit to your existing slab and plumbing, build it in a factory to a tolerance a site carpenter cannot hold, and assemble it in two to three days.',
    timeline: '18 to 25 days from design sign-off',
    includes: [
      'Base and wall units built to your slab dimensions',
      'Shutters in laminate, acrylic, matte or PU',
      'Soft-close hinges and channels throughout',
      'Tall unit, corner solutions and pull-out baskets',
      'Chimney and hob cut-outs coordinated to your appliances',
      'Loft storage above wall units',
    ],
    detail: [
      {
        heading: 'Why factory manufacturing matters here',
        body: 'Ranchi kitchens take heat, humidity and heavy daily use. Panel edges banded by machine hold up where hand-applied edging lifts within a couple of monsoons. This is the single clearest difference between our work and a local carpenter quote.',
      },
      {
        heading: 'Layouts we build most',
        body: 'L-shaped and parallel layouts suit most Ranchi flats. U-shaped works in independent houses with a dedicated kitchen room. We will tell you honestly if an island will not leave you enough walking space.',
      },
      {
        heading: 'Working around your existing slab',
        body: 'You do not have to break the granite. In most projects we design the modular units around the slab and plumbing already in place, which keeps both cost and timeline down.',
      },
    ],
    metaTitle: 'Modular Kitchen in Ranchi | Shilp Sarthi',
    metaDescription:
      'Modular kitchen design in Ranchi. Factory-built cabinetry, soft-close hardware, 10 year warranty, 18 to 25 day install. Studio at Singh More.',
  },
  {
    slug: 'bedroom-wardrobe',
    title: 'Bedroom and wardrobe design in Ranchi',
    shortTitle: 'Bedroom and wardrobe',
    summary:
      'Floor to ceiling storage that uses the full wall, plus the bed, dresser and lighting to match.',
    intro:
      'Most Ranchi bedrooms lose a foot of storage to a wardrobe that stops short of the ceiling and a gap behind it nobody can clean. We build to the wall and to the ceiling, so the room gains storage without losing floor.',
    timeline: '15 to 20 days from design sign-off',
    includes: [
      'Sliding or hinged wardrobes built to ceiling height',
      'Internal layout planned around what you actually store',
      'Loft storage integrated above',
      'Bed with hydraulic or box storage',
      'Side tables, dresser and wall panelling behind the headboard',
      'Profile or cove lighting',
    ],
    detail: [
      {
        heading: 'Sliding or hinged',
        body: 'Sliding doors save the swing space in a tight room but cost more and always leave one section closed. Hinged doors are cheaper and open fully. In a bedroom under 120 sq ft we usually recommend sliding.',
      },
      {
        heading: 'What goes inside',
        body: 'We plan the internals around your saree stack, suit length and suitcase count rather than a default shelf layout. It costs nothing extra and it is the difference between a wardrobe that works and one you fight with.',
      },
      {
        heading: 'Guest and children rooms',
        body: 'A child’s room needs a layout that survives being rearranged in five years. We build the carcass permanent and keep the study and shelving reconfigurable.',
      },
    ],
    metaTitle: 'Bedroom and Wardrobe Design in Ranchi | Shilp Sarthi',
    metaDescription:
      'Fitted bedroom wardrobes in Ranchi. Floor to ceiling storage, planned internals, 10 year warranty. Visit the Singh More studio.',
  },
  {
    slug: 'living-room',
    title: 'Living room interior design in Ranchi',
    shortTitle: 'Living room',
    summary:
      'The room guests judge you on. TV unit, storage, ceiling and lighting designed as one piece.',
    intro:
      'A living room fails when it is assembled one purchase at a time. We design the TV wall, the storage, the ceiling and the lighting together, so the proportions hold and nothing looks bought separately.',
    timeline: '12 to 18 days from design sign-off',
    includes: [
      'TV unit with concealed cable routing',
      'Crockery or display unit',
      'False ceiling with cove and spot lighting',
      'Feature wall in veneer, louvre, texture or wallpaper',
      'Seating layout planning',
      'Foyer and shoe storage where space allows',
    ],
    detail: [
      {
        heading: 'Lighting is most of the effect',
        body: 'Layered lighting does more for a living room than any single expensive item in it. Cove light for ambience, spots for the feature wall, one warm floor lamp for the evening. We plan the circuits at design stage so no wire gets chased afterwards.',
      },
      {
        heading: 'Small living rooms',
        body: 'In a 2BHK the living and dining usually share one space. We treat them as one composition with a visual break rather than two rooms crammed together.',
      },
      {
        heading: 'Combining with the dining area',
        body: 'A crockery unit that reads as part of the TV wall joinery makes a shared living and dining space look deliberate. It is a small decision with a large effect.',
      },
    ],
    metaTitle: 'Living Room Interior Design in Ranchi | Shilp Sarthi',
    metaDescription:
      'Living room interior design in Ranchi. TV units, feature walls, false ceiling and lighting designed together. Singh More studio, 10 year warranty.',
  },
  {
    slug: 'commercial-interiors',
    title: 'Commercial interior design in Ranchi',
    shortTitle: 'Commercial interiors',
    summary:
      'Offices, clinics, salons, gyms and retail, built around how the space earns and delivered to a date you can plan a launch on.',
    intro:
      'Commercial work is judged on two things: whether the layout supports the business, and whether you opened on the date you told people you would. We commit to both in writing.',
    timeline: '25 to 60 days depending on area and licensing',
    includes: [
      'Layout planned around footfall and staff movement',
      'Reception, workstations and storage joinery',
      'Ceiling, lighting and electrical coordination',
      'Branding, signage and wall graphics',
      'Flooring and surface specification',
      'Handover ready for inspection',
    ],
    detail: [
      {
        heading: 'Work we have delivered',
        body: 'Our commercial portfolio in Ranchi includes fitness, retail and clinic fit-outs, most recently the Anytime Fitness on Kanke Road. Ask us for the reference list at the studio.',
      },
      {
        heading: 'Working around trading hours',
        body: 'For a running business we can sequence the work in phases or run night shifts so you do not close for the full period. This is agreed in writing before we start, not negotiated midway.',
      },
      {
        heading: 'Documentation you will need',
        body: 'We provide drawings suitable for landlord approval and fire or municipal inspection. Licensing itself stays with you, but we will not hand over a space that cannot pass.',
      },
    ],
    metaTitle: 'Commercial Interior Design in Ranchi | Shilp Sarthi',
    metaDescription:
      'Commercial interior design in Ranchi for offices, clinics, salons, gyms and retail. Stage-wise payments, dates you can plan a launch on. Singh More studio.',
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
