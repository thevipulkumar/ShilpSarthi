import type { Metadata } from 'next';
import { clampDescription } from '@/lib/seo';
import { PageHeader } from '@/components/ui/Breadcrumbs';
import { ProcessSteps } from '@/components/home/ProcessSteps';
import { PaymentStepper } from '@/components/home/PaymentStepper';
import { Faq } from '@/components/home/Faq';
import { FinalCta } from '@/components/home/FinalCta';
import { faqs } from '@/content/faq';

export const metadata: Metadata = {
  title: 'Our Process | From First Call to Handover',
  description: clampDescription(
    'How a Shilp Sarthi interior project runs in Ranchi: free site visit, 3D design, factory manufacture, installation, and a snag list closed before final payment.',
  ),
  alternates: { canonical: '/process' },
};

/** Reuses the same content the homepage renders, so the two can never drift. */
export default function ProcessPage() {
  const processFaqs = faqs.filter((f) =>
    ['How long does a project take?', 'How do payments work?', 'Who is my point of contact during the project?', 'Do you handle flats that are still under construction?'].includes(
      f.question,
    ),
  );

  return (
    <>
      <PageHeader
        eyebrow="Process"
        title="From your first call to the day you get your keys back"
        intro="Five steps, each with a date and something you physically receive at the end of it. If at any point you cannot tell which step you are on, we have done it wrong."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Process', href: '/process' },
        ]}
      />

      <ProcessSteps tone="white" />
      <PaymentStepper />
      <Faq
        items={processFaqs}
        tone="linen"
        heading="Questions about how a project runs"
      />

      <FinalCta
        sourcePage="/process"
        title="Start at step one"
        intro="A designer calls you back, asks what you actually need, and gives you an honest range before anyone visits."
      />
    </>
  );
}
