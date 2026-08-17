/**
 * Homepage FAQ. Rendered as an accordion and emitted as FAQPage structured data,
 * so the answers must be genuinely useful and genuinely true. Ten questions,
 * ordered roughly by how early a Ranchi homeowner asks them.
 */

export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: 'What does a 2BHK interior cost in Ranchi?',
    answer:
      'A full 2BHK interior with us starts at Rs. 3.5 Lakh. Where yours lands depends on carpet area, how much loose furniture you want and the finishes you pick, so we will not pretend a website can price your flat. Book a free consultation and a designer gives you an honest range on the call, then we confirm it in writing after a free site visit.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'A 2BHK takes 30 to 45 days from design sign-off. A 3BHK or 4BHK takes 45 to 60 days. Commercial work runs 25 to 60 days depending on area and licensing. The committed date goes into your contract, not into a phone conversation.',
  },
  {
    question: 'Do you have a showroom I can visit in Ranchi?',
    answer:
      'Yes. Our studio is on the 4th floor of Royal Heights, beside True Value at Singh More. You can walk in Monday to Saturday between 10am and 8pm, or Sunday between 11am and 6pm, open the actual drawers, feel the shutter finishes and see hardware working before you commit to anything. There is free parking in the forecourt and a lift to the floor.',
  },
  {
    question: 'How do payments work?',
    answer:
      'Payment is staged against work delivered, not taken as a single advance. You receive the full stage-wise schedule in writing before any work starts and before any money changes hands. The final payment falls due only after you have walked the flat and we have closed your snag list.',
  },
  {
    question: 'What warranty do I get?',
    answer:
      'Modular units carry a 10 year warranty. Hardware carries the manufacturer warranty, which we hand over in writing with your project file. The warranty is backed by the manufacturing process behind our partnership, so it does not depend on any one carpenter still being in business.',
  },
  {
    question: 'Can you work with my existing kitchen slab and flooring?',
    answer:
      'In most projects, yes, and it is usually the right call. We design modular units around the slab and plumbing already in place, which keeps both cost and timeline down. Breaking a good granite slab to fit a standard cabinet size is something we will talk you out of.',
  },
  {
    question: 'Do you handle flats that are still under construction?',
    answer:
      'Yes. We start design and material selection while civil work finishes, then hold manufacturing until the flat can be measured accurately. Booking at that stage usually saves two to three weeks against waiting for handover.',
  },
  {
    question: 'Which areas of Ranchi do you work in?',
    answer:
      'All of Ranchi, including Bariatu, Harmu, Lalpur, Kanke, Doranda, Ratu Road, Ashok Nagar, Morabadi, Argora and Singh More. We take work in Hazaribagh, Jamshedpur, Dhanbad and Bokaro case by case, depending on scope and schedule.',
  },
  {
    question: 'What is not included in the quoted price?',
    answer:
      'Civil and plumbing changes, appliances, soft furnishings and any structural work are quoted separately. We list them explicitly in your quotation so nothing surfaces as a surprise halfway through the project.',
  },
  {
    question: 'Who is my point of contact during the project?',
    answer:
      'One named project manager, based in Ranchi, with a direct number you can call. Not a call centre and not a ticket number. They are on your site themselves, and if a date is going to slip you hear it from them before you notice it.',
  },
];
