import type { Metadata } from 'next';
import { formattedAddress, site } from '@/config/site';
import { PageHeader } from '@/components/ui/Breadcrumbs';
import { Section, SectionHeading } from '@/components/ui/Section';
import { SiteImage } from '@/components/ui/SiteImage';
import { PartnerBadge, PartnerParagraph } from '@/components/PartnerBadge';
import { ProjectManager } from '@/components/home/ProjectManager';
import { FinalCta } from '@/components/home/FinalCta';

export const metadata: Metadata = {
  title: 'About Our Ranchi Interior Design Studio',
  description:
    'Shilp Sarthi is an interior design studio at Singh More, Ranchi. Who we are, how we work, and what our manufacturing partnership means for your project.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const year = new Date().getFullYear();

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="An interior design studio with a door you can walk through"
        intro={`We have been designing and delivering interiors in Ranchi since ${year - site.stats.yearsInRanchi}. Not from a warehouse in another city, and not through a call centre. From a studio at Singh More that you are welcome to visit before you spend anything.`}
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
        ]}
      >
        <PartnerBadge />
      </PageHeader>

      <Section tone="white">
        <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="max-w-prose">
            <h2 className="text-display-sm">Why we started</h2>
            <p className="mt-4 text-body-lg text-ink-600">
              Ranchi homeowners had two options and neither was good. A local contractor who quotes
              cheap, takes a large advance, and disappears for three weeks in the middle. Or a
              national brand with a polished website, a call centre in another state, and nobody who
              has ever stood in your flat.
            </p>
            <p className="mt-4 text-body-lg text-ink-600">
              We built the thing that was missing: factory manufacturing and a written contract, run
              by people who live in this city and whose reputation here is the only asset they have.
            </p>

            <h2 className="mt-10 text-display-sm">How we work</h2>
            <p className="mt-4 text-body-lg text-ink-600">
              Everything on this site is meant to be checkable. The timelines are the ones we put in
              contracts, and the payment schedule is given to you in writing before any money changes
              hands. If a claim on this website cannot survive you asking us to prove it at the
              studio, it should not be on the website.
            </p>

            <h2 className="mt-10 text-display-sm">Our manufacturing partnership</h2>
            {/* Allowed placement 1 of 2 for the factual partnership paragraph. */}
            <PartnerParagraph className="mt-4" />
          </div>

          <div>
            <SiteImage id="studio.finishes" ratio="4/3" sizes="(max-width: 1024px) 100vw, 460px" />

            <dl className="mt-6 rounded-card border border-ink-200 bg-white p-6">
              <div>
                <dt className="text-caption uppercase tracking-wide text-ink-500">Studio</dt>
                <dd className="mt-1 text-body-sm leading-relaxed text-ink-800">
                  <address className="not-italic">{formattedAddress}</address>
                  <p className="mt-1.5 text-ink-600">
                    Known locally as {site.studio.localIdentity}.
                  </p>
                </dd>
              </div>
              <div className="mt-5">
                <dt className="text-caption uppercase tracking-wide text-ink-500">Service area</dt>
                <dd className="mt-1 text-body-sm text-ink-800">
                  {site.serviceArea.primary} primary. {site.serviceArea.secondary.join(', ')} case by
                  case.
                </dd>
              </div>
              <div className="mt-5">
                <dt className="text-caption uppercase tracking-wide text-ink-500">Delivered</dt>
                <dd className="mt-1 text-body-sm text-ink-800">
                  {site.stats.projectsDelivered}+ homes and commercial spaces
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      <ProjectManager />

      <Section tone="white">
        <SectionHeading
          eyebrow="Straight answers"
          title="Things we will tell you that a sales team might not"
        />
        <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'When you do not need us',
              body: 'If your flat needs one wardrobe and a coat of paint, a full home package is the wrong purchase. We will scope it down and quote the smaller job.',
            },
            {
              title: 'When to keep what you have',
              body: 'A good granite slab and sound flooring are worth designing around, not breaking. In most projects that saves both money and two weeks.',
            },
            {
              title: 'What changes the price',
              body: 'Materials and hardware, not how carefully the work is done. Nobody gets the careless version, whatever the budget.',
            },
            {
              title: 'What we do not include',
              body: 'Civil work, plumbing changes, appliances and soft furnishings are quoted separately and listed explicitly. Nothing appears halfway through as a surprise.',
            },
            {
              title: 'Where a cheaper quote comes from',
              body: 'Usually thinner carcass material, hand-applied edge banding, or unbranded hardware. Ask any quote you receive to name the ply grade and the hinge brand.',
            },
            {
              title: 'What happens if we are late',
              body: 'The committed date is in your contract. If we miss it for a reason that is ours, that is set against the final payment rather than argued about.',
            },
          ].map((item) => (
            <li key={item.title} className="rounded-card border border-ink-200 bg-white p-6">
              <h3 className="text-body-lg font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-2 text-body-sm leading-relaxed text-ink-600">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta
        sourcePage="/about"
        title="Come and see the studio"
        intro="Walk in during opening hours or book a slot so a designer is free when you arrive."
      />
    </>
  );
}
