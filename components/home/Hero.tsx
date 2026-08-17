import Link from 'next/link';
import { isOfferLive, offer, offerEyebrow } from '@/config/offer';
import { site, whatsappLink } from '@/config/site';
import { ConsultationForm } from '@/components/home/ConsultationForm';
import { PartnerBadge } from '@/components/PartnerBadge';
import { ButtonLink } from '@/components/ui/Button';
import { WhatsAppIcon, StarIcon } from '@/components/ui/Icons';

/**
 * Hero. The free consultation form sits in the right-hand slot.
 *
 * The h1 carries the primary keyword and no mention of the partner brand.
 */
export function Hero() {
  const offerLive = isOfferLive();

  const chips = [
    `${site.stats.googleRating} on Google`,
    `${site.stats.projectsDelivered}+ homes delivered`,
    `${site.stats.warrantyYears} year warranty`,
  ];

  return (
    <section className="border-b border-ink-200 bg-white">
      <div className="container-content py-10 sm:py-14 lg:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            {offerLive ? (
              <p className="eyebrow mb-4 flex w-fit max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full bg-accent-600 px-3 py-1.5 text-white">
                <span>{offerEyebrow()}</span>
                <Link
                  href={offer.termsUrl}
                  className="font-normal underline decoration-white/50 underline-offset-2 hover:decoration-white"
                >
                  Terms
                </Link>
              </p>
            ) : null}

            <h1 className="text-display-xl">Ranchi&rsquo;s trusted home interior design studio</h1>

            <p className="mt-4 max-w-xl text-body-lg text-ink-600">
              Full home interiors from {site.pricing.startingFromLabel} for a{' '}
              {site.pricing.startingFromConfig}. A named project manager on a direct line, and a
              studio at Singh More you can walk into this week.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {chips.map((chip, i) => (
                <li
                  key={chip}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1.5 text-caption font-bold text-ink-700"
                >
                  {i === 0 ? <StarIcon className="h-3.5 w-3.5 text-gold-500" /> : null}
                  {chip}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#consultation" size="lg">
                Book a free consultation
              </ButtonLink>
              <ButtonLink
                href={whatsappLink(
                  'Hi Shilp Sarthi, I would like to discuss interiors for my home in Ranchi.',
                )}
                variant="whatsapp"
                size="lg"
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </ButtonLink>
            </div>

            {site.responsePromise.enabled ? (
              <p className="mt-4 flex items-center gap-2 text-body-sm font-bold text-ink-700">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-whatsapp-dark" />
                </span>
                {site.responsePromise.text}
              </p>
            ) : null}

            <div className="mt-6">
              <PartnerBadge />
            </div>
          </div>

          <div id="consultation" className="lg:sticky lg:top-24">
            <ConsultationForm sourcePage="/" />
          </div>
        </div>
      </div>
    </section>
  );
}
