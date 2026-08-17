import { formattedAddress, site, whatsappLink } from '@/config/site';
import { LeadForm } from '@/components/forms/LeadForm';
import { ButtonLink } from '@/components/ui/Button';
import { PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons';

export function FinalCta({
  sourcePage = '/',
  serviceInterest,
  title = 'Tell us about your flat',
  intro = 'Three fields and a designer calls you back. No obligation, and no site visit charge whether or not you book with us.',
}: {
  sourcePage?: string;
  serviceInterest?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section id="contact-form" className="bg-white py-section border-b border-ink-200">
      <div className="container-content">
        <div className="grid gap-9 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <p className="eyebrow text-accent-600">Get started</p>
            <h2 className="mt-2 text-display-md">{title}</h2>
            <p className="mt-4 max-w-prose text-body-lg text-ink-600">{intro}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={whatsappLink('Hi Shilp Sarthi, I would like to discuss interiors for my home in Ranchi.')}
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

            <dl className="mt-8 grid gap-5 border-t border-ink-200 pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-body font-semibold text-ink-900">Studio</dt>
                <dd className="mt-1 text-body-sm leading-relaxed text-ink-600">
                  <address className="not-italic">{formattedAddress}</address>
                </dd>
              </div>
              <div>
                <dt className="text-body font-semibold text-ink-900">Both numbers</dt>
                <dd className="mt-1 space-y-1 text-body-sm text-ink-600">
                  <a href={`tel:${site.phones.primary.tel}`} className="block hover:text-ink-900">
                    {site.phones.primary.display}
                  </a>
                  <a href={`tel:${site.phones.secondary.tel}`} className="block hover:text-ink-900">
                    {site.phones.secondary.display}
                  </a>
                  <a href={`mailto:${site.email}`} className="block hover:text-ink-900">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card sm:p-7">
            <LeadForm
              variant="inline"
              sourcePage={sourcePage}
              serviceInterest={serviceInterest}
              submitLabel="Book my free site visit"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
