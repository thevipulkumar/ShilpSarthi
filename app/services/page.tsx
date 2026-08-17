import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/content/services';
import { PageHeader } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRightIcon, CheckIcon } from '@/components/ui/Icons';
import { SiteImage } from '@/components/ui/SiteImage';
import { FinalCta } from '@/components/home/FinalCta';
import { cn } from '@/lib/utils';
import { OfferBand } from '@/components/offer/OfferBand';

export const metadata: Metadata = {
  title: 'Interior Design Services in Ranchi',
  description:
    'Full home interiors, modular kitchens, bedroom wardrobes, living rooms and commercial fit-outs in Ranchi. Prices, timelines and what each service includes.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we design and build in Ranchi"
        intro="Take the whole flat or take one room. Each page below gives the starting price, the timeline and exactly what is and is not included, so you can compare us properly against anyone else you are talking to."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
        ]}
      />

      <Section tone="white">
        <ul className="grid gap-5 lg:grid-cols-2">
          {services.map((service, i) => {
            const spansRow = i === services.length - 1 && services.length % 2 === 1;

            return (
            <Reveal as="li" key={service.slug} delay={i * 60} className={spansRow ? 'lg:col-span-2' : undefined}>
              <article
                className={cn(
                  'group relative flex h-full overflow-hidden rounded-card border border-ink-200 bg-white transition-all duration-200 hover:border-accent-300 hover:shadow-card-hover',
                  spansRow ? 'flex-col lg:flex-row' : 'flex-col',
                )}
              >
                {/*
                  The same photograph the detail page leads with. Without it this
                  index was the only card grid on the site with no imagery, while
                  every page it links to opened with one.
                */}
                <SiteImage
                  id={`service.${service.slug}`}
                  ratio="16/9"
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className={cn('rounded-none', spansRow && 'lg:w-1/2 lg:shrink-0')}
                />

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h2 className="text-display-sm">
                  <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0">
                    {service.shortTitle}
                  </Link>
                </h2>

                <p className="mt-2 text-body text-ink-600">{service.summary}</p>

                <p className="mt-4 text-caption font-bold uppercase tracking-wide text-ink-500">
                  {service.timeline}
                </p>

                <ul className="mt-4 flex-1 space-y-1.5">
                  {service.includes.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-body-sm text-ink-600">
                      <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-600" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 inline-flex items-center gap-1.5 text-body-sm font-semibold text-accent-700">
                  See what is included
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </p>
                </div>
              </article>
            </Reveal>
            );
          })}
        </ul>
      </Section>

      <OfferBand />
      <FinalCta sourcePage="/services" title="Not sure which one you need?" intro="Describe the flat and what is bothering you about it. A designer will tell you what actually needs doing, including when the answer is less than you expected." />
    </>
  );
}
