import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, projects, PHOTO_DISCLOSURE } from '@/content/projects';
import { getVideoForProject } from '@/content/videos';
import { DEFAULT_OG, DEFAULT_OG_ALT, clampDescription, ogImage } from '@/lib/seo';
import { site, whatsappLink } from '@/config/site';
import { PageHeader } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { Reveal } from '@/components/ui/Reveal';
import { BeforeAfterSlider } from '@/components/portfolio/BeforeAfterSlider';
import { VideoEmbed } from '@/components/media/VideoEmbed';
import { ButtonLink } from '@/components/ui/Button';
import { CheckIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { FinalCta } from '@/components/home/FinalCta';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  /*
   * Title carries the city rather than the phrase "Interior Design Project":
   * with the layout's " | Shilp Sarthi" appended, the old pattern ran to 76
   * characters on the Harmu page and Google cut it. "Ranchi" is also the term
   * people actually search on.
   *
   * The card is this project's own photograph ONLY when the photograph actually
   * is this project. Four entries carry representativePhotography, meaning the
   * image is licensed work standing in for the real thing; on the page that is
   * honest because PHOTO_DISCLOSURE renders directly beneath it, but a share
   * card carries no disclosure. A WhatsApp forward would then show a licensed
   * interior under the words "3BHK full home in Doranda, Ranchi" and read as a
   * photograph of that flat. Those pages fall back to the site card, which shows
   * Oak Forest and says so.
   */
  const ownPhotograph = !project.assetsPending && !project.representativePhotography;
  const hero = ownPhotograph ? project.image : null;
  const description = clampDescription(
    `${project.scope} in ${project.locality}, Ranchi. ${project.summary}`,
  );

  return {
    title: `${project.title}, Ranchi`,
    description,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.title}, Ranchi | Shilp Sarthi`,
      description,
      url: `${site.url}/portfolio/${project.slug}`,
      type: 'article',
      images: hero ? ogImage(hero.src, hero.alt) : ogImage(DEFAULT_OG, DEFAULT_OG_ALT),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title}, Ranchi | Shilp Sarthi`,
      description,
      images: [hero ? hero.src : DEFAULT_OG],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  /*
   * The reveal slider needs a genuine pair from the same room. The pairs in the
   * repo are still illustrations, so on a detail page the hero is the project
   * photograph and the slider is held back until real frames exist. Showing an
   * illustrated slider instead of the photograph is what made these pages look
   * as though their images were missing.
   */
  const canReveal =
    project.before !== null && project.after !== null && !project.beforeAfterPending;

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const video = getVideoForProject(project.slug);

  return (
    <>
      <PageHeader
        eyebrow={`${project.locality} | ${project.configuration}`}
        title={project.title}
        intro={project.summary}
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Portfolio', href: '/portfolio' },
          { name: project.title, href: `/portfolio/${project.slug}` },
        ]}
      />

      <Section tone="white">
        {/* The photograph always leads. */}
        <MediaFrame
          src={project.image.src}
          alt={project.image.alt}
          pending={project.assetsPending && !site.useIllustrations}
          pendingLabel={`Real photograph of the ${project.configuration} in ${project.locality}`}
          ratio="3/2"
          sizes="(max-width: 1024px) 100vw, 900px"
          priority
          className="mx-auto max-w-4xl"
        />

        {/* And the reveal follows it, once there is a genuine pair to show. */}
        {canReveal ? (
          <BeforeAfterSlider
            before={project.before!}
            after={project.after!}
            label="Drag the handle to see the change."
            className="mx-auto mt-10 max-w-3xl"
          />
        ) : null}

        {project.representativePhotography ? (
          <p className="mx-auto mt-4 max-w-4xl text-caption text-ink-500">{PHOTO_DISCLOSURE}</p>
        ) : null}

        <div className="mx-auto mt-10 grid max-w-4xl gap-9 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-display-sm">What we built</h2>
            <ul className="mt-4 space-y-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-body text-ink-700">
                  <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-accent-600" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            {video ? (
              <VideoEmbed
                kind="youtube"
                youtubeId={video.youtubeId}
                title={video.title}
                poster={video.poster}
                posterAlt={video.posterAlt}
                aspect={video.aspect}
                caption={video.caption}
                className="mb-6 mx-auto max-w-[18rem]"
              />
            ) : null}

            <dl className="h-fit rounded-card border border-ink-200 bg-white p-6">
            <div>
              <dt className="text-caption uppercase tracking-wide text-ink-500">Locality</dt>
              <dd className="mt-0.5 text-body font-semibold text-ink-900">{project.locality}</dd>
            </div>
            <div className="mt-4">
              <dt className="text-caption uppercase tracking-wide text-ink-500">Configuration</dt>
              <dd className="mt-0.5 text-body font-semibold text-ink-900">{project.configuration}</dd>
            </div>
            <div className="mt-4">
              <dt className="text-caption uppercase tracking-wide text-ink-500">Scope</dt>
              <dd className="mt-0.5 text-body font-semibold text-ink-900">{project.scope}</dd>
            </div>
            {project.timeline ? (
              <div className="mt-4">
                <dt className="text-caption uppercase tracking-wide text-ink-500">Timeline</dt>
                <dd className="mt-0.5 text-body font-semibold text-ink-900">{project.timeline}</dd>
              </div>
            ) : null}
            {project.budgetBand ? (
              <div className="mt-4">
                <dt className="text-caption uppercase tracking-wide text-ink-500">Budget band</dt>
                <dd className="mt-0.5 text-body font-semibold text-ink-900">{project.budgetBand}</dd>
              </div>
            ) : null}

            <ButtonLink
              href={whatsappLink(
                `Hi Shilp Sarthi, I saw the ${project.title} project. I have a ${project.configuration} and would like something similar.`,
              )}
              variant="whatsapp"
              fullWidth
              className="mt-6"
            >
              <WhatsAppIcon />
              I want something like this
            </ButtonLink>
            </dl>
          </div>
        </div>
      </Section>

      {project.gallery.length > 0 ? (
        <Section tone="white">
          <h2 className="text-display-sm">Room by room</h2>
          <p className="mt-2 max-w-prose text-body text-ink-600">
            Every frame below is this flat, shot on a walkthrough after handover.
          </p>

          {/*
             The stills were filmed vertically, so they are shown at their native
             9:16 rather than cropped into landscape. Two across on a phone, five
             on a wide screen.
          */}
          <Reveal>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {project.gallery.map((shot) => (
                <li key={shot.src}>
                  <figure>
                    <MediaFrame
                      src={shot.src}
                      alt={shot.alt}
                      pending={false}
                      ratio="9/16"
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                    />
                    <figcaption className="mt-2 text-caption leading-snug text-ink-500">
                      {shot.alt}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      ) : null}

      <Section tone="linen">
        <h2 className="text-display-sm">More projects in Ranchi</h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <article className="group relative">
                <MediaFrame
                  src={r.image.src}
                  alt={r.image.alt}
                  pending={r.assetsPending && !site.useIllustrations}
                  pendingLabel={`${r.configuration} in ${r.locality}`}
                  ratio="4/3"
                  sizes="(max-width: 640px) 100vw, 320px"
                />
                <h3 className="mt-3 text-body font-semibold text-ink-900">
                  <Link href={`/portfolio/${r.slug}`} className="after:absolute after:inset-0">
                    {r.title}
                  </Link>
                </h3>
                <p className="text-caption text-ink-600">
                  {r.locality} | {r.scope}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta
        sourcePage={`/portfolio/${project.slug}`}
        title={`Have a ${project.configuration} in ${site.serviceArea.primary}?`}
        intro="Tell us the locality and what you want done. We measure free of charge and quote against the real space."
      />
    </>
  );
}
