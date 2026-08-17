import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getService, services } from '@/content/services';
import { site } from '@/config/site';
import { PageHeader } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { SiteImage } from '@/components/ui/SiteImage';
import { getImage } from '@/content/images';
import { DEFAULT_OG, DEFAULT_OG_ALT, ogImage } from '@/lib/seo';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRightIcon, CheckIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { FinalCta } from '@/components/home/FinalCta';
import { OfferBand } from '@/components/offer/OfferBand';
import { serviceSchema } from '@/lib/schema';
import { whatsappLink } from '@/config/site';

/** Pre-renders the five service URLs listed in BRIEF.md section 9 at build time. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const slot = getImage(`service.${service.slug}`);

  return {
    // metaTitle already carries the brand, so opt out of the layout template.
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${site.url}/services/${service.slug}`,
      type: 'website',
      /*
       * Explicit, because setting openGraph at all replaces the layout's object
       * rather than merging into it. Without this these five pages shipped with
       * no og:image, so every share of a service page showed no card.
       */
      images: slot ? ogImage(slot.src, slot.alt, slot.width, slot.height) : ogImage(DEFAULT_OG, DEFAULT_OG_ALT),
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
      images: [slot ? slot.src : DEFAULT_OG],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }}
      />

      <PageHeader
        eyebrow="Service"
        title={service.title}
        intro={service.intro}
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
          { name: service.shortTitle, href: `/services/${service.slug}` },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/contact?service=${service.slug}`} size="lg">
            Get a quote for this
          </ButtonLink>
          <ButtonLink
            href={whatsappLink(`Hi Shilp Sarthi, I am interested in ${service.shortTitle.toLowerCase()} for my property in Ranchi.`)}
            variant="whatsapp"
            size="lg"
          >
            <WhatsAppIcon />
            Ask on WhatsApp
          </ButtonLink>
        </div>
      </PageHeader>

      <Section tone="white">
        <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <h2 className="text-display-sm">What is included</h2>
            <ul className="mt-4 space-y-2.5">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-body text-ink-700">
                  <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-accent-600" />
                  {item}
                </li>
              ))}
            </ul>

            <dl className="mt-8 rounded-card border border-ink-200 p-6">
              <dt className="text-caption font-bold uppercase tracking-wide text-ink-500">
                Typical timeline
              </dt>
              <dd className="mt-1 text-body-lg font-bold text-ink-900">{service.timeline}</dd>
            </dl>

            <p className="mt-4 text-body-sm text-ink-600">
              For a figure against your own flat,{' '}
              <Link href="/contact" className="font-bold text-accent-600 underline underline-offset-2">
                book a free consultation
              </Link>
              . A designer gives you an honest range on the call.
            </p>
          </div>

          <SiteImage
            id={`service.${service.slug}`}
            ratio="4/3"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
        </div>
      </Section>

      <Section tone="linen">
        <h2 className="text-display-md">Detail worth knowing before you commit</h2>
        <div className="mt-7 grid gap-6 lg:grid-cols-3">
          {service.detail.map((block) => (
            <div key={block.heading} className="rounded-card border border-ink-200 bg-white p-6">
              <h3 className="text-body-lg font-semibold text-ink-900">{block.heading}</h3>
              <p className="mt-2 text-body-sm leading-relaxed text-ink-600">{block.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <h2 className="text-display-sm">Other services</h2>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/services/${other.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-4 py-2.5 text-body-sm font-medium text-ink-800 transition-colors hover:border-accent-400 hover:text-accent-700"
              >
                {other.shortTitle}
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <OfferBand />

      <FinalCta
        sourcePage={`/services/${service.slug}`}
        serviceInterest={service.shortTitle}
        title={`Get a quote for ${service.shortTitle.toLowerCase()}`}
        intro="We measure your space free of charge and confirm the price against the real room, not a showroom average."
      />
    </>
  );
}
