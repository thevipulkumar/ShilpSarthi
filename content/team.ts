/**
 * THE NAMED POINT OF CONTACT
 *
 * This is the single thing on the site that neither national competitor can
 * replicate in Ranchi: a named person, a real face, and a number that reaches
 * them without a call centre in between.
 *
 * Rules:
 *   - Never use a stock portrait here. A stock face is worse than no face,
 *     because a visitor who reverse-image-searches it stops trusting the whole
 *     site, including the parts that are true.
 *   - `photoPending: true` renders a visible placeholder with the person's real
 *     name and number still shown. That is honest and still useful.
 *   - The direct number must actually ring this person's handset.
 *
 * TODO CONFIRM: name, photograph and direct number. Everything below marked
 * REPLACE is a stand-in and must be corrected before go-live.
 */

export type TeamMember = {
  name: string;
  role: string;
  /** Displayed with a tel: link. Must reach the person directly. */
  phoneDisplay: string;
  phoneTel: string;
  /** Years in the trade, not years at Shilp Sarthi, unless they match. */
  experience: string;
  /** First person. This is meant to sound like a person, not a company. */
  quote: string;
  photo: { src: string; alt: string };
  photoPending: boolean;
};

export const projectManager: TeamMember = {
  name: 'Arunabh Sharma',
  role: 'Head of Operations, Ranchi',
  /*
   * TODO CONFIRM: this is currently the main studio line. The section promises a
   * number that reaches this person directly, so replace it with his own handset
   * if that promise is to hold.
   */
  phoneDisplay: '97092 11050',
  phoneTel: '+919709211050',
  experience: 'More than 5 years in interiors',
  /*
   * TODO CONFIRM: this quote was drafted during the build and is attributed to a
   * named real person. He needs to read it and agree to it, or replace it with
   * his own words, before go-live. Nobody should find sentences on a website
   * under their name that they did not say.
   */
  quote:
    'I am on these sites myself. If something slips, you hear it from me before you notice it, and you hear what we are doing about it.',
  photo: {
    src: '/images/team/arunabh-sharma-head-of-operations.webp',
    alt: 'Arunabh Sharma, Head of Operations at Shilp Sarthi in Ranchi',
  },
  photoPending: false,
};
