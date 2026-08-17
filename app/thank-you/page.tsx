import type { Metadata } from 'next';
import Link from 'next/link';
import { formattedAddress, site, whatsappLink } from '@/config/site';
import { ButtonLink } from '@/components/ui/Button';
import { CheckIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { ThankYouTracking } from './ThankYouTracking';

/**
 * ⚠️  THIS PATH MUST STAY EXACTLY `/thank-you`.
 *
 * The live Google Ads conversion action triggers on this URL. Renaming it,
 * moving it, or adding a trailing slash silently stops conversion reporting with
 * no error anywhere: the campaign just appears to stop working. `trailingSlash`
 * is pinned to false in next.config.mjs for the same reason.
 *
 * Also kept from the previous build, deliberately:
 *   - noindex, because a thank-you page in search results is a wasted click and
 *     it pollutes conversion data with organic arrivals
 *   - the 10 second auto-redirect back to the homepage
 */

export const metadata: Metadata = {
  title: 'Thank you',
  description: 'Your enquiry has reached Shilp Sarthi. A designer will call you shortly.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: '/thank-you' },
};

export default function ThankYouPage() {
  return (
    <>
      {/* Meta Pixel Lead event and the auto-redirect both live in here. */}
      <ThankYouTracking redirectAfterSeconds={10} />

      <section className="bg-white py-section">
        <div className="container-content">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp/15 text-whatsapp-ink">
              <CheckIcon className="h-8 w-8" />
            </span>

            <h1 className="mt-6 text-display-lg">Thank you, we have your enquiry</h1>

            <p className="mt-4 text-body-lg text-ink-600">
              {site.responsePromise.enabled
                ? site.responsePromise.text
                : 'A designer will call you shortly.'}{' '}
              If you would rather not wait, message us on WhatsApp and you will get an answer faster.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink
                href={whatsappLink('Hi Shilp Sarthi, I just submitted an enquiry on your website.')}
                variant="whatsapp"
                size="lg"
              >
                <WhatsAppIcon />
                Message us now
              </ButtonLink>
              <ButtonLink href={`tel:${site.phones.primary.tel}`} variant="secondary" size="lg">
                <PhoneIcon />
                {site.phones.primary.display}
              </ButtonLink>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-card border border-ink-200 bg-white p-6 text-left sm:p-8">
            <h2 className="text-display-sm">What happens next</h2>
            <ol className="mt-4 space-y-4">
              {[
                {
                  title: 'A designer calls you',
                  body: 'They ask what you need, what your budget is, and give you an honest range before anyone visits.',
                },
                {
                  title: 'We visit and measure, free of charge',
                  body: 'At a time that suits you. No obligation to book anything afterwards.',
                },
                {
                  title: 'You see your own flat in 3D',
                  body: 'Not a showroom render of somebody else’s home, and revised with you until the layout works.',
                },
              ].map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-900 text-caption font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-body font-semibold text-ink-900">{step.title}</p>
                    <p className="mt-0.5 text-body-sm text-ink-600">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-7 border-t border-ink-100 pt-5">
              <h3 className="text-body font-semibold text-ink-900">
                Or come to the studio in the meantime
              </h3>
              <address className="mt-1.5 not-italic text-body-sm leading-relaxed text-ink-600">
                {formattedAddress}
              </address>
              <p className="mt-1.5 text-body-sm text-ink-600">
                {site.studio.hours.map((h) => `${h.days} ${h.open} to ${h.close}`).join('. ')}.
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-caption text-ink-500">
            Taking you back to the{' '}
            <Link href="/" className="underline underline-offset-2 hover:text-ink-800">
              homepage
            </Link>{' '}
            in a few seconds.
          </p>
        </div>
      </section>
    </>
  );
}
