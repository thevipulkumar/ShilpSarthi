import Link from 'next/link';
import { site } from '@/config/site';
import { services } from '@/content/services';
import { LogoInverse } from '@/components/ui/Logo';
import { PartnerBadge, PartnerDisclaimer } from '@/components/PartnerBadge';

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy policy' },
  { href: '/terms-of-service', label: 'Terms of service' },
  { href: '/offer-terms', label: 'Offer terms' },
];

const companyLinks = [
  { href: '/about', label: 'About us' },
  { href: '/process', label: 'Our process' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  // Dynamic, so the year never goes stale the way the old site's did.
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-ink-200">
      <div className="container-content py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <LogoInverse className="h-10 w-auto" />
            <p className="mt-4 max-w-xs text-body-sm leading-relaxed text-ink-300">
              A Ranchi interior design studio you can walk into. Full home interiors, modular
              kitchens and commercial fit-outs, delivered across this city since{' '}
              {year - site.stats.yearsInRanchi}.
            </p>
            <div className="mt-4">
              <PartnerBadge variant="footer" />
            </div>

            <ul className="mt-5 flex gap-3">
              <li>
                <SocialLink href={site.social.instagram} label="Instagram">
                  <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.25.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2Zm0 5.16a4.64 4.64 0 1 0 0 9.28 4.64 4.64 0 0 0 0-9.28Zm0 7.65a3.01 3.01 0 1 1 0-6.02 3.01 3.01 0 0 1 0 6.02Zm5.91-7.83a1.08 1.08 0 1 1-2.17 0 1.08 1.08 0 0 1 2.17 0Z" />
                </SocialLink>
              </li>
              <li>
                <SocialLink href={site.social.facebook} label="Facebook">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34v7.03C18.34 21.24 22 17.08 22 12.06Z" />
                </SocialLink>
              </li>
              <li>
                <SocialLink href={site.social.youtube} label="YouTube">
                  <path d="M21.58 7.19a2.5 2.5 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42a2.5 2.5 0 0 0-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81a2.5 2.5 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.5 2.5 0 0 0 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81ZM10 15.02V8.98L15.2 12 10 15.02Z" />
                </SocialLink>
              </li>
            </ul>
          </div>

          <FooterColumn title="Services">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.shortTitle}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {companyLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <div>
            <h2 className="text-body font-semibold text-white">Visit the studio</h2>
            <address className="mt-3 not-italic text-body-sm leading-relaxed text-ink-300">
              {site.studio.line1}
              <br />
              {site.studio.line2}
              <br />
              {site.studio.city}, {site.studio.state} {site.studio.postalCode}
            </address>

            <ul className="mt-4 space-y-2 text-body-sm">
              <li>
                <a
                  href={`tel:${site.phones.primary.tel}`}
                  className="font-medium text-white hover:text-accent-300"
                >
                  {site.phones.primary.display}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phones.secondary.tel}`}
                  className="font-medium text-white hover:text-accent-300"
                >
                  {site.phones.secondary.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="text-ink-300 hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>

            <div className="mt-4 text-body-sm text-ink-300">
              {site.studio.hours.map((h) => (
                <p key={h.days}>
                  {h.days}: {h.open} to {h.close}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-ink-800 pt-6">
          {/* Required on every page. Routed through PartnerBadge.tsx. */}
          <PartnerDisclaimer className="max-w-3xl" />

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-caption text-ink-400">
              &copy; {year} {site.legalName}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-caption text-ink-400 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-caption text-ink-500">
            Serving {site.serviceArea.localities.join(', ')} and all of {site.serviceArea.primary}.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-body font-semibold text-white">{title}</h2>
      <ul className="mt-3 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="flex min-h-[44px] items-center text-body-sm text-ink-300 transition-colors hover:text-white lg:min-h-0 lg:py-1"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}, opens in a new tab`}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 text-ink-300 transition-colors hover:border-accent-500 hover:text-accent-300"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
