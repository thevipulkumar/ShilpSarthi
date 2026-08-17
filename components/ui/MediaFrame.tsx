import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Renders a photograph, or a branded panel when the photograph does not exist yet.
 *
 * The panel is deliberately designed rather than apologetic. A dashed grey box
 * saying "photo pending" makes a live site look broken; this reads as an
 * intentional graphic treatment, so the page holds together in front of a real
 * visitor while the photography is still being collected.
 *
 * In development it also prints the exact path to drop the file at. That hint is
 * stripped from production builds, so a visitor never sees scaffolding.
 *
 * This component is the reason the site cannot accidentally ship a stock
 * photograph captioned as a real Ranchi project. Every image reference carries a
 * `pending` flag, and while it is true no photograph renders at all.
 */

type Props = {
  src: string;
  alt: string;
  pending: boolean;
  /** What belongs here. Shown on the panel, so keep it short and human. */
  pendingLabel?: string;
  ratio?: '4/3' | '3/2' | '1/1' | '16/9' | '9/16';
  sizes: string;
  priority?: boolean;
  className?: string;
};

const ratios: Record<NonNullable<Props['ratio']>, string> = {
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '1/1': 'aspect-square',
  '16/9': 'aspect-video',
  '9/16': 'aspect-[9/16]',
};

export function MediaFrame({
  src,
  alt,
  pending,
  pendingLabel,
  ratio = '4/3',
  sizes,
  priority = false,
  className,
}: Props) {
  if (pending) {
    return (
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden rounded-card border border-ink-200 bg-ink-50',
          ratios[ratio],
          className,
        )}
        role="img"
        aria-label={alt}
      >
        {/* Quiet diagonal texture, so the panel reads as a surface not a void. */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgb(var(--ink-200)) 0 1px, transparent 1px 11px)',
          }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col items-center px-6 text-center">
          <svg
            viewBox="0 0 40 40"
            className="h-10 w-10 opacity-90"
            aria-hidden="true"
            fill="none"
          >
            <path
              d="M8 33V19a12 12 0 0 1 24 0v14"
              className="stroke-accent-600"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path d="M15 33V20.5a5 5 0 0 1 10 0V33Z" className="fill-accent-600/15" />
          </svg>

          <p className="mt-3 text-caption font-bold uppercase tracking-[0.14em] text-ink-500">
            Shilp Sarthi
          </p>
          {pendingLabel ? (
            <p className="mt-1 max-w-[22ch] text-caption leading-snug text-ink-500">
              {pendingLabel}
            </p>
          ) : null}

          {process.env.NODE_ENV === 'development' ? (
            <code className="mt-3 block break-all rounded bg-white/70 px-1.5 py-1 text-[0.6875rem] text-ink-400">
              {src}
            </code>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden rounded-card bg-ink-50', ratios[ratio], className)}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
