import Link from 'next/link';
import { isOfferLive, offer, offerEndDateLabel, offerHeadline } from '@/config/offer';
import { site, whatsappLink } from '@/config/site';
import { ButtonLink } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { Countdown } from './Countdown';

/**
 * Mid-page offer band. Placement 4 of 5.
 * Server component: it disappears on its own the moment the deadline passes.
 */
export function OfferBand() {
  if (!isOfferLive()) return null;

  return (
    <section className="bg-ink-900 py-12 text-white sm:py-14" aria-labelledby="offer-band-heading">
      <div className="container-content">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow mb-2 text-gold-400">{offer.label}</p>
            <h2 id="offer-band-heading" className="text-display-sm text-white">
              {offerHeadline()} on interiors booked before {offerEndDateLabel()}
            </h2>
            <p className="mt-3 text-body text-ink-200">
              Book a free site visit before the deadline and the discount is locked to your
              quotation. What the discount applies against, and what it excludes, is set out in
              full on the terms page.
            </p>
            <div className="mt-4">
              <Countdown tone="dark" prefix="Ends in" className="text-body-lg" />
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
            <ButtonLink
              href={whatsappLink(
                `Hi Shilp Sarthi, I want to book a free site visit under the ${offer.label} offer.`,
              )}
              variant="whatsapp"
              size="lg"
              className="whitespace-nowrap"
            >
              <WhatsAppIcon />
              Book on WhatsApp
            </ButtonLink>
            <ButtonLink href={`tel:${site.phones.primary.tel}`} variant="secondary" size="lg" className="whitespace-nowrap">
              Call {site.phones.primary.display}
            </ButtonLink>
          </div>
        </div>

        <p className="mt-6 border-t border-ink-800 pt-4 text-caption text-ink-300">
          <Link href={offer.termsUrl} className="underline underline-offset-4 hover:text-white">
            {offer.label} terms and conditions
          </Link>
          . Discount applies to the package base price stated in the terms. Minimum order value
          applies.
        </p>
      </div>
    </section>
  );
}
