import Link from 'next/link';
import { workVideos } from '@/content/videos';
import { site } from '@/config/site';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { VideoEmbed } from '@/components/media/VideoEmbed';
import { ArrowRightIcon } from '@/components/ui/Icons';

/**
 * Work on video.
 *
 * Opens the evidence, directly after the trust strip and ahead of the portfolio
 * stills. A visitor arriving cold from an advert sees real footage of finished
 * work, and hears a client say it out loud, before reading a word about scope or
 * price. The stills that follow then add detail to a claim the video has already
 * made.
 *
 * Vertical, four across with the channel card fifth, because that is how the
 * footage was actually shot and
 * because roughly 85 percent of paid traffic here is mobile, where a vertical
 * frame fills the screen and a letterboxed 16:9 one wastes two thirds of it.
 *
 * Every frame is loaded behind a facade. Nothing downloads from YouTube until a
 * visitor presses play.
 */
export function WorkVideos() {
  if (workVideos.length === 0) return null;

  return (
    <Section id="videos" tone="white">
      <SectionHeading
        eyebrow="On video"
        title="See the work, and hear it from a client"
        intro="Filmed on our own sites in Ranchi. No showreel, no stock footage, no voiceover."
      />

      <ul className="mt-9 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
        {workVideos.map((video, i) => (
          <Reveal as="li" key={video.youtubeId} delay={i * 70}>
            <VideoEmbed
              kind="youtube"
              youtubeId={video.youtubeId}
              title={video.title}
              poster={video.poster}
              posterAlt={video.posterAlt}
              aspect={video.aspect}
              caption={video.caption}
            />
            {video.projectSlug ? (
              <Link
                href={`/portfolio/${video.projectSlug}`}
                className="mt-1.5 inline-flex items-center gap-1 text-body-sm font-bold text-accent-600 underline underline-offset-4 hover:text-accent-700"
              >
                See the project
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            ) : null}
          </Reveal>
        ))}

        {/* Fills the last column on wide screens rather than leaving a gap. */}
        <Reveal as="li" delay={workVideos.length * 70} className="col-span-2 lg:col-span-1">
          <div className="flex h-full flex-col justify-center rounded-card border border-ink-200 p-5">
            <h3 className="text-body-lg font-bold text-ink-900">More on our channel</h3>
            <p className="mt-2 text-body-sm text-ink-600">
              We post site progress and finished rooms as we go. It is the least edited view of how
              we work that you will find.
            </p>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-body-sm font-bold text-accent-600 underline underline-offset-4 hover:text-accent-700"
            >
              Watch on YouTube
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </ul>
    </Section>
  );
}
