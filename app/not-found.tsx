import type { Metadata } from 'next';
import { services } from '@/content/services';
import { site, whatsappLink } from '@/config/site';
import { Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

/**
 * A 404 on a page paid traffic lands on is a wasted click, so this offers the
 * three things a lost visitor most likely wanted rather than an apology.
 */
export default function NotFound() {
  return (
    <Section tone="linen">
      <div className="mx-auto max-w-2xl py-8 text-center">
        <p className="eyebrow text-accent-600">404</p>
        <h1 className="mt-2 text-display-lg">That page has moved or never existed</h1>
        <p className="mt-4 text-body-lg text-ink-600">
          Nothing is broken with your enquiry and nothing has been lost. Pick up from one of these,
          or just call us and we will point you at the right thing.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Go to the homepage
          </ButtonLink>
          <ButtonLink
            href={whatsappLink('Hi Shilp Sarthi, I was looking for something on your website.')}
            variant="whatsapp"
            size="lg"
          >
            <WhatsAppIcon />
            Ask on WhatsApp
          </ButtonLink>
          <ButtonLink href={`tel:${site.phones.primary.tel}`} variant="secondary" size="lg">
            <PhoneIcon />
            {site.phones.primary.display}
          </ButtonLink>
        </div>

        <ul className="mt-10 grid gap-2 text-left sm:grid-cols-2">
          {[
            { href: '/portfolio', label: 'Homes we have delivered here' },
            { href: '/process', label: 'How a project runs' },
            ...services.slice(0, 4).map((s) => ({
              href: `/services/${s.slug}`,
              label: s.shortTitle,
            })),
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex min-h-[48px] items-center justify-between gap-3 rounded-card border border-ink-200 bg-white px-4 text-body-sm font-medium text-ink-800 transition-colors hover:border-accent-400 hover:text-accent-700"
              >
                {link.label}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
