import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'linen' | 'white' | 'ink' | 'accent';

/*
 * Every surface is white now, so sections are separated by a hairline rule
 * rather than by alternating fills. `tone` is kept as an API so callers do not
 * all have to change, but linen and white resolve to the same thing.
 */
const tones: Record<Tone, string> = {
  linen: 'bg-white text-ink-900 border-b border-ink-200',
  white: 'bg-white text-ink-900 border-b border-ink-200',
  ink: 'bg-ink-900 text-white',
  accent: 'bg-accent-50 text-ink-900 border-b border-ink-200',
};

export function Section({
  id,
  tone = 'linen',
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn('py-section', tones[tone], className)}>
      <div className="container-content">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'light',
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <div
      className={cn(
        'max-w-prose',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn('eyebrow mb-3', dark ? 'text-accent-300' : 'text-accent-600')}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn('text-display-md', dark && 'text-white')}>{title}</h2>
      {intro ? (
        <p className={cn('mt-4 text-body-lg', dark ? 'text-ink-200' : 'text-ink-600')}>{intro}</p>
      ) : null}
    </div>
  );
}
