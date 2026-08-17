/**
 * STAGE-WISE PAYMENT SCHEDULE
 *
 * In Ranchi the number one objection is fear of a contractor taking an advance
 * and disappearing. Publishing your own schedule is the single highest-trust
 * thing on the page, which is why this section sits high on the homepage,
 * before the visitor has time to form the objection.
 *
 * WHY THE PERCENTAGES ARE NULL
 * ----------------------------
 * The real percentages must come from the owner's actual contract. Copying a
 * franchisor's published schedule would put numbers on this site that do not
 * match what a customer will actually sign, and publishing wrong numbers is
 * worse than publishing none.
 *
 * While `published` is false, the stepper shows the stages and what happens at
 * each one, with the percentages replaced by a line explaining that the written
 * schedule is shared before work begins. That is honest and still does most of
 * the trust work.
 *
 * TO PUBLISH: fill in every `percentage` from the real contract, check they sum
 * to 100, then set `published: true`. The component refuses to render
 * percentages that do not add up.
 */

export type PaymentStage = {
  stage: string;
  when: string;
  what: string;
  /** Percentage of contract value due at this stage. null until confirmed. */
  percentage: number | null;
};

export const paymentSchedule = {
  published: false,

  stages: [
    {
      stage: 'Booking',
      when: 'At design sign-off',
      what: 'Design frozen, materials chosen.',
      percentage: null,
    },
    {
      stage: 'Production',
      when: 'Before manufacturing',
      what: 'Final measurements taken at your flat.',
      percentage: null,
    },
    {
      stage: 'Dispatch',
      when: 'Before material ships',
      what: 'Units built and quality checked.',
      percentage: null,
    },
    {
      stage: 'Installation',
      when: 'During assembly',
      what: 'Fitting, electrical, ceiling, paint.',
      percentage: null,
    },
    {
      stage: 'Handover',
      when: 'After your snag list closes',
      what: 'You sign off. Then the last payment.',
      percentage: null,
    },
  ] satisfies PaymentStage[],

  /**
   * Shown directly beneath the stepper. This is the bit that separates a real
   * commitment from a marketing schedule.
   * TODO CONFIRM the exact delay remedy with the owner before go-live.
   */
  delayPolicy:
    'Miss your date for a reason that is ours, and the delay comes off the final payment.',

  /** Rendered when `published` is false. */
  unpublishedNote:
    'You get the exact percentages in writing before any work starts, and before any money moves.',
} as const;

/** Guards against a half-filled schedule going live. */
export function scheduleIsPublishable(): boolean {
  if (!paymentSchedule.published) return false;
  const values = paymentSchedule.stages.map((s) => s.percentage);
  if (values.some((v) => v === null)) return false;
  const total = values.reduce<number>((sum, v) => sum + (v ?? 0), 0);
  return total === 100;
}
