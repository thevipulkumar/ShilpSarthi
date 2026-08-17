import Link from 'next/link';
import { services } from '@/content/services';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRightIcon } from '@/components/ui/Icons';

/**
 * Each card links to its service page and carries a quote action that lands on
 * the contact form with the service prefilled, so the visitor never has to
 * restate what they just clicked.
 */
export function ServicesGrid() {
  return (
    <Section id="services" tone="linen">
      <SectionHeading
        eyebrow="What we do"
        title="Five things, done properly"
        intro="Take the whole flat or take one room. Part-scope projects are welcome, and most of ours start that way."
      />

      <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal as="li" key={service.slug} delay={i * 60}>
            <article className="group flex h-full flex-col rounded-card border border-ink-200 bg-white p-6 transition-all duration-200 hover:border-accent-300 hover:shadow-card-hover">
              <h3 className="text-display-sm">
                <Link
                  href={`/services/${service.slug}`}
                  className="after:absolute after:inset-0 focus-visible:outline-none"
                >
                  {service.shortTitle}
                </Link>
              </h3>

              <p className="mt-2 flex-1 text-body-sm leading-relaxed text-ink-600">
                {service.summary}
              </p>

              <p className="mt-4 text-caption font-bold uppercase tracking-wide text-ink-500">
                {service.timeline}
              </p>

              {/* Both actions clear the 44px touch target minimum. */}
              <div className="relative z-10 mt-4 flex flex-wrap items-center gap-x-3 border-t border-ink-100 pt-1">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-body-sm font-semibold text-ink-900 transition-colors group-hover:text-accent-700"
                >
                  See details
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                {/* Prefills the enquiry form with this service. */}
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="inline-flex min-h-[44px] items-center text-body-sm font-semibold text-accent-700 underline underline-offset-4 hover:text-accent-800"
                >
                  Get a quote
                </Link>
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal as="li" delay={services.length * 60}>
          <div className="flex h-full flex-col justify-center rounded-card border border-dashed border-ink-300 bg-white p-6">
            <h3 className="text-display-sm">Something else?</h3>
            <p className="mt-2 text-body-sm text-ink-600">
              Tell us the room and the budget. If it is not work we should take, we will say so and
              point you somewhere better.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-semibold text-accent-700 underline underline-offset-4"
            >
              Talk to a designer
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </ul>
    </Section>
  );
}
