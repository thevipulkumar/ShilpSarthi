import type { Metadata } from 'next';
import Link from 'next/link';
import { projects, PHOTO_DISCLOSURE } from '@/content/projects';
import { site } from '@/config/site';
import { PageHeader } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { FinalCta } from '@/components/home/FinalCta';

export const metadata: Metadata = {
  title: 'Interior Design Portfolio, Ranchi',
  description:
    'Interior design projects delivered across Ranchi: Oak Forest Pundag, Harmu, Kanke, Doranda, Lalpur and Kanke Road. Real localities and real configurations.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  const localities = Array.from(new Set(projects.map((p) => p.locality)));

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Homes and spaces we have delivered in Ranchi"
        intro="Every project below is in this city, with the locality and configuration named. Ask us for a reference in your own area and in most cases we will give you a number to call."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Portfolio', href: '/portfolio' },
        ]}
      >
        <ul className="flex flex-wrap gap-2">
          {localities.map((l) => (
            <li
              key={l}
              className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-caption font-medium text-ink-700"
            >
              {l}
            </li>
          ))}
        </ul>
      </PageHeader>

      <Section tone="white">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 50}>
              <article className="group relative flex h-full flex-col">
                <MediaFrame
                  src={project.image.src}
                  alt={project.image.alt}
                  pending={project.assetsPending && !site.useIllustrations}
                  pendingLabel={`Real photograph of the ${project.configuration} in ${project.locality}`}
                  ratio="4/3"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                />

                <div className="mt-3.5 flex flex-1 flex-col">
                  <p className="flex flex-wrap items-center gap-x-2 text-caption font-medium uppercase tracking-wide text-accent-700">
                    <span>{project.locality}</span>
                    <span className="text-ink-300" aria-hidden="true">|</span>
                    <span>{project.configuration}</span>
                  </p>

                  <h2 className="mt-1 text-body-lg font-semibold text-ink-900">
                    <Link href={`/portfolio/${project.slug}`} className="after:absolute after:inset-0">
                      {project.title}
                    </Link>
                  </h2>

                  <p className="mt-1.5 flex-1 text-body-sm leading-relaxed text-ink-600">
                    {project.summary}
                  </p>

                  <p className="mt-3 text-caption font-medium text-ink-700">
                    {project.scope}
                    {project.timeline ? ` | ${project.timeline}` : ''}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        {projects.some((p) => p.representativePhotography) ? (
          <p className="mt-8 rounded-card border border-ink-200 px-4 py-3 text-body-sm text-ink-600">
            {PHOTO_DISCLOSURE}
          </p>
        ) : null}

        <p className="mt-6 max-w-prose text-body text-ink-600">
          We work across {site.serviceArea.localities.join(', ')} and take projects in{' '}
          {site.serviceArea.secondary.join(', ')} case by case.
        </p>
      </Section>

      <FinalCta
        sourcePage="/portfolio"
        title="Want to see one of these in person?"
        intro="Several of our clients are happy to have prospective customers visit. Tell us your locality and configuration and we will try to arrange it."
      />
    </>
  );
}
