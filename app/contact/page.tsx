import type { Metadata } from 'next';
import { formattedAddress, site, whatsappLink } from '@/config/site';
import { getService } from '@/content/services';
import { PageHeader } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { LeadForm } from '@/components/forms/LeadForm';
import { ButtonLink } from '@/components/ui/Button';
import { SiteImage } from '@/components/ui/SiteImage';
import { PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { PartnerBadge } from '@/components/PartnerBadge';

export const metadata: Metadata = {
  title: 'Contact Our Ranchi Interior Design Studio',
  description:
    'Visit the Shilp Sarthi studio at 4th Floor, Royal Heights, Singh More, Ranchi. Call 97092 11050, WhatsApp us, or book a free site visit.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service: serviceSlug } = await searchParams;
  const service = serviceSlug ? getService(serviceSlug) : undefined;

  const mapSrc = `https://www.google.com/maps?q=${site.studio.mapsEmbedQuery}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${site.studio.mapsEmbedQuery}`;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={service ? `Get a quote for ${service.shortTitle.toLowerCase()}` : 'Talk to a designer in Ranchi'}
        intro={
          service
            ? `${service.summary} Typically delivered in ${service.timeline}.`
            : 'Call, WhatsApp, or walk into the studio. Whichever you pick, you get a person in Ranchi rather than a queue.'
        }
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact' },
        ]}
      />

      <Section tone="white">
        <div className="grid gap-9 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={whatsappLink(
                  service
                    ? `Hi Shilp Sarthi, I am interested in ${service.shortTitle.toLowerCase()} for my property in Ranchi.`
                    : 'Hi Shilp Sarthi, I would like to discuss interiors for my home in Ranchi.',
                )}
                variant="whatsapp"
                size="lg"
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </ButtonLink>
              <ButtonLink href={`tel:${site.phones.primary.tel}`} variant="secondary" size="lg">
                <PhoneIcon />
                {site.phones.primary.display}
              </ButtonLink>
            </div>

            {site.responsePromise.enabled ? (
              <p className="mt-4 rounded-card border border-ink-200 px-4 py-3 text-body-sm font-medium text-ink-700">
                {site.responsePromise.text}
              </p>
            ) : null}

            <dl className="mt-8 space-y-6 border-t border-ink-100 pt-7">
              <div>
                <dt className="text-body font-semibold text-ink-900">Studio address</dt>
                <dd className="mt-1.5 text-body text-ink-600">
                  <address className="not-italic leading-relaxed">{formattedAddress}</address>
                  {/*
                    The only permitted mention of the offline outlet name, per
                    BRIEF.md section 4: the Contact page address block, described
                    as the studio's local identity.
                  */}
                  <p className="mt-2 text-body-sm text-ink-500">
                    Locally, our outlet is also known as {site.studio.localIdentity}. Either name
                    will get you to the same 4th floor studio.
                  </p>
                  <div className="mt-3">
                    <PartnerBadge />
                  </div>
                </dd>
              </div>

              <div>
                <dt className="text-body font-semibold text-ink-900">Phone</dt>
                <dd className="mt-1.5 space-y-1 text-body text-ink-600">
                  <a href={`tel:${site.phones.primary.tel}`} className="block hover:text-ink-900">
                    {site.phones.primary.display}
                  </a>
                  <a href={`tel:${site.phones.secondary.tel}`} className="block hover:text-ink-900">
                    {site.phones.secondary.display}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-body font-semibold text-ink-900">Email</dt>
                <dd className="mt-1.5 text-body text-ink-600">
                  <a href={`mailto:${site.email}`} className="hover:text-ink-900">
                    {site.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-body font-semibold text-ink-900">Opening hours</dt>
                <dd className="mt-1.5 space-y-0.5 text-body text-ink-600">
                  {site.studio.hours.map((h) => (
                    <p key={h.days}>
                      {h.days}: {h.open} to {h.close}
                    </p>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="text-body font-semibold text-ink-900">Parking</dt>
                <dd className="mt-1.5 text-body leading-relaxed text-ink-600">
                  {site.studio.parking}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card sm:p-7">
              <h2 className="text-display-sm">Book a free site visit</h2>
              <p className="mt-2 text-body-sm text-ink-600">
                We measure your flat, check the plumbing and electrical positions, and quote against
                the real space. Free, and no obligation to book anything.
              </p>
              <LeadForm
                variant="inline"
                sourcePage="/contact"
                serviceInterest={service?.shortTitle}
                submitLabel="Book my free site visit"
                className="mt-5"
              />
            </div>

            <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-card border border-ink-100">
              <iframe
                src={mapSrc}
                title={`Map to the ${site.name} studio at Singh More, Ranchi`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            <ButtonLink href={directionsUrl} variant="secondary" fullWidth className="mt-3">
              Get directions
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="linen">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SiteImage id="studio.craft" ratio="4/3" sizes="(max-width: 1024px) 100vw, 440px" />
          <div>
            <h2 className="text-display-md">Come and open the drawers</h2>
            <p className="mt-4 max-w-prose text-body-lg text-ink-600">
              Renders are easy to make look good. Hardware is not. Come to the studio and you can
              work a soft-close drawer, compare a laminate against an acrylic shutter under the same
              light, and look at a cut carcass edge for yourself. Fifteen minutes there answers
              questions a website cannot.
            </p>
            <p className="mt-4 text-body text-ink-600">
              Walk in during opening hours, or call ahead and we will make sure a designer is free
              when you arrive.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
