import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRightIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Interior Design Notes from Ranchi',
  description:
    'Practical notes on interior design in Ranchi: what things cost, what to ask a contractor, and what holds up through a monsoon. Coming soon.',
  alternates: { canonical: '/blog' },
  // The route is scaffolded for phase 2 but has nothing to index yet. An empty
  // indexed page is a thin-content signal, so keep it out until posts exist.
  robots: { index: false, follow: true },
};

/**
 * Phase 2 scaffold, per BRIEF.md section 9: the route exists so links and the
 * information architecture are settled, but there is no content yet.
 *
 * When posts are ready:
 *   1. add content/posts.ts with typed entries
 *   2. add app/blog/[slug]/page.tsx
 *   3. flip `robots.index` above to true
 *   4. add the blog to the sitemap entries in app/sitemap.ts
 */
export default function BlogPage() {
  const planned = [
    'Six questions to ask any contractor before you pay an advance',
    'Laminate, acrylic or PU: which finish survives a Ranchi monsoon',
    'Designing a kitchen around a granite slab you do not want to break',
    'Under construction flats: when to start design and when to wait',
  ];

  return (
    <>
      <PageHeader
        eyebrow="Notes"
        title="Interior design notes from Ranchi"
        intro="We are writing up the questions we get asked most often at the studio, with real numbers rather than general advice. The first pieces are being drafted now."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
        ]}
      />

      <Section tone="white">
        <div className="max-w-prose">
          <h2 className="text-display-sm">What is coming</h2>
          <ul className="mt-5 space-y-3">
            {planned.map((title) => (
              <li
                key={title}
                className="flex items-start gap-3 border-b border-ink-100 pb-3 text-body text-ink-700"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden="true" />
                {title}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-body-lg text-ink-600">
            In the meantime, the answers to most of these are already on the site, or you can just
            ask us. A designer will tell you straight, including when the answer is that you need
            less work than you thought.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Book a free consultation
              <ArrowRightIcon />
            </ButtonLink>
            <ButtonLink href="/portfolio" variant="secondary" size="lg">
              See our work in Ranchi
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
