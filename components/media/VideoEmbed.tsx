'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PlayIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

/**
 * Facade video loader.
 *
 * Nothing loads until the visitor asks for it: a poster frame and a play button
 * stand in for the player. A YouTube iframe costs roughly half a megabyte and
 * several hundred milliseconds of main thread time before anyone presses play,
 * which is why embeds are the usual reason a Lighthouse score collapses. With
 * three of them on the homepage that would have been a megabyte and a half of
 * player nobody asked for.
 *
 * Handles a YouTube id or a self-hosted file, and 9:16 as well as 16:9 so the
 * vertical Shorts play in their own shape instead of being letterboxed.
 */

type Aspect = '9/16' | '16/9';

const aspects: Record<Aspect, string> = {
  '9/16': 'aspect-[9/16]',
  '16/9': 'aspect-video',
};

type Props = {
  title: string;
  poster: string;
  posterAlt: string;
  aspect?: Aspect;
  /** Shown under the poster before play, and kept visible after. */
  caption?: string;
  priority?: boolean;
  className?: string;
} & ({ kind: 'youtube'; youtubeId: string } | { kind: 'file'; src: string });

export function VideoEmbed({
  title,
  poster,
  posterAlt,
  aspect = '16/9',
  caption,
  priority = false,
  className,
  ...source
}: Props) {
  const [activated, setActivated] = useState(false);

  return (
    <figure className={cn('w-full', className)}>
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-card bg-ink-900',
          aspects[aspect],
        )}
      >
        {!activated ? (
          <>
            <Image
              src={poster}
              alt={posterAlt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
              className="object-cover"
            />

            <div
              className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent"
              aria-hidden="true"
            />

            <button
              type="button"
              onClick={() => setActivated(true)}
              className="group absolute inset-0 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
            >
              <span className="sr-only">{`Play video: ${title}`}</span>
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-accent-600 shadow-panel transition-transform duration-200 group-hover:scale-105"
                aria-hidden="true"
              >
                <PlayIcon className="ml-1 h-7 w-7" />
              </span>
            </button>

            <p className="pointer-events-none absolute bottom-3 left-3 right-3 text-body-sm font-bold text-white">
              {title}
            </p>
          </>
        ) : source.kind === 'youtube' ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${source.youtubeId}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <video
            src={source.src}
            poster={poster}
            controls
            autoPlay
            muted
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
          >
            Your browser cannot play this video.
          </video>
        )}
      </div>

      {caption ? (
        <figcaption className="mt-2.5 text-body-sm leading-snug text-ink-600">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
