import Link from 'next/link';
import { featuredProjects, revealProjects, PHOTO_DISCLOSURE } from '@/content/projects';
import { site } from '@/config/site';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRightIcon } from '@/components/ui/Icons';
import { BeforeAfterSlider } from '@/components/portfolio/BeforeAfterSlider';

/**
 * Local proof. The heading says the quiet part out loud: these are homes in
 * THIS city, with the locality named on every card.
 *
 * A national brand's Ranchi page cannot do this. That is the entire advantage,
 * so it gets the strongest placement of any content section.
 *
 * The signature before-and-after reveal leads the section, using the first
 * project that has both images available.
 */
export function LocalProof() {
  /*
   * Prefer a project whose photographs are real. Until any exist, fall back to
   * the first project that has a before and after pair so the interaction is
   * still visible and reviewable, and say plainly in the caption that the images
   * are placeholders. The claim of real work is never made over a placeholder.
   */
  const realShowcase = revealProjects.find((p) => !p.beforeAfterPending);
  const showcase = realShowcase ?? revealProjects[0] ?? null;
  const showcaseIsPlaceholder = showcase !== null && Boolean(showcase.beforeAfterPending);

  return (
    <Section id="portfolio" tone="white">
      <SectionHeading
        eyebrow="Local proof"
        title="Homes we have delivered in Ranchi"
        intro="Pundag, Harmu, Kanke, Doranda, Lalpur. Named localities, real configurations, and a reference you can call in most of them."
      />

      {showcase ? (
        <Reveal className="mt-9">
          <div className="grid items-center gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <BeforeAfterSlider
              before={showcase.before!}
              after={showcase.after!}
              label={
                showcaseIsPlaceholder
                  ? 'Drag the handle to see the change. Illustrated until the photographs of this project are in.'
                  : `${showcase.title}. Drag the handle to see the change.`
              }
            />
            <div>
              <p className="eyebrow text-accent-600">Before and after</p>
              <h3 className="mt-2 text-display-sm">{showcase.title}</h3>
              <p className="mt-3 text-body text-ink-600">{showcase.summary}</p>
              {showcase.timeline ? (
                <p className="mt-3 text-body-sm font-medium text-ink-700">{showcase.timeline}</p>
              ) : null}
              <Link
                href={`/portfolio/${showcase.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-body font-semibold text-accent-700 underline underline-offset-4 hover:text-accent-800"
              >
                See the full project
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </Reveal>
      ) : null}

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={i * 60}>
            <article className="group relative flex h-full flex-col">
              <MediaFrame
                src={project.image.src}
                alt={project.image.alt}
                pending={project.assetsPending && !site.useIllustrations}
                pendingLabel={`Real photograph of the ${project.configuration} in ${project.locality}`}
                ratio="4/3"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                className="transition-transform duration-300 group-hover:scale-[1.01]"
              />

              <div className="mt-3.5">
                <p className="flex flex-wrap items-center gap-x-2 text-caption font-medium uppercase tracking-wide text-accent-700">
                  <span>{project.locality}</span>
                  <span className="text-ink-300" aria-hidden="true">
                    |
                  </span>
                  <span>{project.configuration}</span>
                </p>
                <h3 className="mt-1 text-body-lg font-semibold text-ink-900">
                  <Link href={`/portfolio/${project.slug}`} className="after:absolute after:inset-0">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-1 text-body-sm text-ink-600">
                  {project.scope}
                  {project.timeline ? `. ${project.timeline}` : ''}.
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      {featuredProjects.some((p) => p.representativePhotography) ? (
        <p className="mt-5 text-caption text-ink-500">{PHOTO_DISCLOSURE}</p>
      ) : null}

      <div className="mt-9">
        <ButtonLink href="/portfolio" variant="secondary" size="lg">
          See the full portfolio
          <ArrowRightIcon />
        </ButtonLink>
      </div>
    </Section>
  );
}
