export type ProcessStep = {
  number: string;
  title: string;
  duration: string;
  body: string;
  /** What the customer physically has at the end of this step. */
  youGet: string;
};

/**
 * Numbered because the content genuinely is a sequence. Numbering something
 * that is not a sequence is the sort of thing that makes a site feel templated.
 */
export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Talk to a designer',
    duration: 'Day 1',
    body: 'You call, WhatsApp or use the estimator. A designer calls back within 30 minutes between 10am and 8pm, asks what you actually need, and gives you an honest range before anyone visits.',
    youGet: 'A price range and a straight answer about what your budget covers',
  },
  {
    number: '02',
    title: 'Free site visit and measurement',
    duration: 'Day 2 to 4',
    body: 'We come to your flat, measure every room, check the plumbing and electrical positions, and photograph the site. This is free and it carries no obligation to book anything.',
    youGet: 'Accurate measurements and a written scope',
  },
  {
    number: '03',
    title: 'Design and 3D walkthrough',
    duration: 'Day 5 to 12',
    body: 'You see your own flat in 3D, not a showroom render of somebody else’s. We revise it with you until the layout works, then price the final version line by line.',
    youGet: '3D visuals of your flat and an itemised quotation',
  },
  {
    number: '04',
    title: 'Factory manufacturing',
    duration: 'Day 13 to 30',
    body: 'Your units are manufactured in a factory to the measurements we took, not cut on your living room floor. Machine-banded edges are the reason this work outlasts site carpentry through a Ranchi monsoon.',
    youGet: 'Progress updates from your project manager, and a dispatch date',
  },
  {
    number: '05',
    title: 'Installation and handover',
    duration: 'Day 31 to 45',
    body: 'Assembly, electrical, false ceiling and painting run to the sequence your project manager shared at the start. You then walk the flat and list anything you want fixed. We close that list before the final payment falls due.',
    youGet: 'A finished home, your warranty documents and a closed snag list',
  },
];
