import type { Metadata } from 'next';
import { clampDescription } from '@/lib/seo';
import Link from 'next/link';
import { isOfferLive, offer, offerEndDateLabel, offerHeadline } from '@/config/offer';
import { site } from '@/config/site';
import { PageHeader } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { Countdown } from '@/components/offer/Countdown';
import { OfferTermsTracker } from './OfferTermsTracker';

export const metadata: Metadata = {
  title: `${offer.label} Offer Terms`,
  description: clampDescription(
    `Full terms for the Shilp Sarthi ${offer.label} offer in Ranchi: what the discount applies against, what is excluded, the minimum order value and the expiry.`,
  ),
  alternates: { canonical: '/offer-terms' },
  robots: { index: true, follow: true, 'max-snippet': 0 },
};

/**
 * OFFER TERMS
 *
 * This page exists because a discount claim needs substantiation:
 *   - India's CCPA guidelines on misleading advertisements require a
 *     substantiated basis behind an "up to 40%" claim.
 *   - Google Ads and Meta both review promotional claims against the landing
 *     page. A percentage with no stated basis is the most common reason a
 *     promotion gets disapproved.
 *
 * The public price table that used to sit in section 3 was removed along with
 * the pricing page. Section 2 now states what the discount is calculated from
 * in words rather than showing the rate card. That is the minimum an ad
 * reviewer needs and it is the only pricing language left anywhere on the site
 * apart from the single "from Rs. 3.5 Lakh" headline.
 */
export default function OfferTermsPage() {
  const live = isOfferLive();

  return (
    <>
      <OfferTermsTracker />

      <PageHeader
        eyebrow="Offer terms"
        title={`${offer.label} offer: full terms`}
        intro={`${offerHeadline()} on interiors booked with Shilp Sarthi in Ranchi. This page sets out what that means, what it applies against, and when it ends.`}
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Offer terms', href: '/offer-terms' },
        ]}
      />

      <Section tone="white">
        <div className="max-w-prose">
          {live ? (
            <div className="rounded-card border border-accent-200 bg-accent-50 p-5">
              <p className="text-body font-bold text-ink-900">
                This offer is currently live. It ends on {offerEndDateLabel()} at 11:59pm IST.
              </p>
              <div className="mt-2">
                <Countdown tone="light" prefix="Time remaining:" className="text-body" />
              </div>
            </div>
          ) : (
            <div className="rounded-card border border-ink-200 bg-white p-5">
              <p className="text-body font-bold text-ink-900">
                This offer has ended. It closed on {offerEndDateLabel()}.
              </p>
              <p className="mt-1 text-body-sm text-ink-600">
                Our normal terms are unchanged.{' '}
                <Link href="/contact" className="font-bold text-accent-600 underline underline-offset-2">
                  Book a free consultation
                </Link>{' '}
                and a designer will give you an honest figure for your flat.
              </p>
            </div>
          )}

          <h2 className="mt-10 text-display-sm">1. What the discount is</h2>
          <p className="mt-3 text-body text-ink-700">
            {offer.flat
              ? `A flat ${offer.percentage}% discount applies to the base price of every qualifying order.`
              : `A discount of up to ${offer.percentage}% applies to the base price of a qualifying order. The exact percentage depends on the scope of work and the finishes selected. Your written quotation states the exact discount applied to your order, in rupees, before you commit to anything.`}
          </p>

          <h2 className="mt-10 text-display-sm">2. What it applies against</h2>
          <p className="mt-3 text-body text-ink-700">
            The discount applies to the base price of the modular and joinery scope in your written
            quotation, calculated from the carpet area of that scope and our standard rate for the
            materials and hardware you select. Those standard rates are the same rates we were
            quoting before this offer began. They are not inflated for the purpose of the discount.
          </p>
          <p className="mt-3 text-body text-ink-700">
            We do not publish a rate card on this website, because a rate applied to a flat nobody
            has measured is a guess. Ask for it at the free consultation and a designer will show you
            the rate your quotation is built from, before and after the discount.
          </p>

          <h2 className="mt-10 text-display-sm">3. What is included</h2>
          <ul className="mt-3 space-y-1.5 text-body text-ink-700">
            {[
              'Design, 3D visuals and revisions before sign-off',
              'Factory manufactured modular units: kitchen, wardrobes and storage joinery',
              'Branded hardware as specified in your quotation',
              'Site measurement, delivery and installation',
              'Project management and warranty documentation',
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-display-sm">4. What is excluded</h2>
          <ul className="mt-3 space-y-1.5 text-body text-ink-700">
            {[
              'Civil work, demolition and any structural change',
              'Plumbing relocation and electrical points beyond the agreed design',
              'Appliances including chimney, hob, oven and refrigerator',
              'Soft furnishings, curtains, rugs and loose decor',
              'Statutory approvals, society charges and GST, which is charged as applicable',
              'Any item quoted as a separate line outside the base price',
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-display-sm">5. Minimum order value</h2>
          <p className="mt-3 text-body text-ink-700">
            The offer applies to orders with a base value of {site.pricing.startingFromLabel} or
            above. Smaller part-scope projects are welcome but are quoted at standard rates.
          </p>

          <h2 className="mt-10 text-display-sm">6. Number of slots</h2>
          <p className="mt-3 text-body text-ink-700">
            {/* TODO CONFIRM the real slot count with the owner. A stated cap must
                be a real production constraint, not a scarcity device. If there
                is no genuine cap, delete this section rather than invent one. */}
            Slots are limited by our production and installation capacity for the period. Once that
            capacity is committed, the offer closes for new orders even if the end date has not been
            reached. Ask us how many slots remain when you enquire and we will tell you honestly.
          </p>

          <h2 className="mt-10 text-display-sm">7. Offer period and expiry</h2>
          <p className="mt-3 text-body text-ink-700">
            The offer runs to {offerEndDateLabel()}, 11:59pm IST. To qualify, your design must be
            signed off and the booking stage completed within the offer period. The discount is then
            locked to your quotation and does not lapse if manufacturing or installation extends
            beyond the end date.
          </p>
          <p className="mt-3 text-body text-ink-700">
            This is a fixed deadline. It is not extended by reloading this page and there is no
            rolling countdown anywhere on this site.
          </p>

          <h2 className="mt-10 text-display-sm">8. General conditions</h2>
          <ul className="mt-3 space-y-1.5 text-body text-ink-700">
            {[
              'The offer cannot be combined with any other discount, referral credit or promotional voucher.',
              'The offer applies to new orders only and cannot be applied retrospectively to a signed contract.',
              'The discount has no cash value and cannot be exchanged or transferred.',
              'Shilp Sarthi may withdraw or amend the offer for orders not yet signed. Any change is published on this page.',
              'All work remains subject to our standard terms of service.',
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-display-sm">9. Campaign terms</h2>
          {offer.franchisorTermsUrl ? (
            <p className="mt-3 text-body text-ink-700">
              {offer.label} is a national campaign that Shilp Sarthi is running locally in Ranchi.
              The campaign owner&rsquo;s published terms also apply and can be read{' '}
              <a
                href={offer.franchisorTermsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-accent-600 underline underline-offset-2"
              >
                here
              </a>
              . Where the two documents differ on anything within Shilp Sarthi&rsquo;s control, the
              terms on this page apply to your order.
            </p>
          ) : (
            <p className="mt-3 rounded-card border border-dashed border-ink-300 bg-white px-4 py-3 text-body-sm text-ink-600">
              TODO before go-live: {offer.label} is being run as the national campaign locally, so the
              campaign owner&rsquo;s published terms document must be linked here. Paste its URL into{' '}
              <code>franchisorTermsUrl</code> in <code>config/offer.ts</code> and this paragraph
              becomes the link automatically.
            </p>
          )}

          <h2 className="mt-10 text-display-sm">10. Questions about this offer</h2>
          <p className="mt-3 text-body text-ink-700">
            Call {site.phones.primary.display} or {site.phones.secondary.display}, email{' '}
            <a href={`mailto:${site.email}`} className="font-bold text-accent-600 underline underline-offset-2">
              {site.email}
            </a>
            , or visit the studio. All enquiries about this offer are handled by Shilp Sarthi.
          </p>

          <p className="mt-8 border-t border-ink-200 pt-5 text-caption text-ink-500">
            Offer period:{' '}
            {new Date(offer.startsAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              timeZone: 'Asia/Kolkata',
            })}{' '}
            to {offerEndDateLabel()}.
          </p>
        </div>
      </Section>
    </>
  );
}
