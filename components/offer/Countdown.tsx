'use client';

import { useEffect, useState } from 'react';
import { offer, offerEndDateLabel, offerEndsAtMs } from '@/config/offer';
import { cn, pad2, splitDuration } from '@/lib/utils';

/**
 * Countdown to a real deadline.
 *
 * The end instant is a fixed IST timestamp in config/offer.ts. It does not roll
 * forward and it does not reset on reload, which is the only reason a countdown
 * is defensible on this site at all.
 *
 * Beyond `countdownThresholdDays` remaining, it renders the date instead. A
 * clock ticking down forty days reads as theatre.
 *
 * Renders nothing until mounted so the server and client cannot disagree about
 * the current time, and reserves its own height so nothing shifts when it
 * appears.
 */

type Props = {
  tone?: 'light' | 'dark' | 'bar';
  className?: string;
  /** Shown before the digits, eg "Ends in". */
  prefix?: string;
  onExpire?: () => void;
};

export function Countdown({ tone = 'light', className, prefix = 'Ends in', onExpire }: Props) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const end = offerEndsAtMs();
    const tick = () => setRemaining(end - Date.now());

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (remaining !== null && remaining <= 0) onExpire?.();
  }, [remaining, onExpire]);

  if (remaining === null) {
    // Placeholder of the same height, so there is zero layout shift on hydration.
    return <span className={cn('inline-block h-[1.2em] w-[8.5em]', className)} aria-hidden="true" />;
  }

  if (remaining <= 0) return null;

  const { days, hours, minutes } = splitDuration(remaining);

  const toneClasses = {
    light: 'text-ink-900',
    dark: 'text-white',
    bar: 'text-white',
  }[tone];

  // Far from the deadline, a date is more credible than a clock.
  if (days >= offer.countdownThresholdDays) {
    return (
      <span className={cn('font-semibold tabular-nums', toneClasses, className)}>
        Ends {offerEndDateLabel()}
      </span>
    );
  }

  return (
    <span className={cn('inline-flex items-baseline gap-1.5', toneClasses, className)}>
      {prefix ? <span className="font-normal opacity-80">{prefix}</span> : null}
      <span className="font-semibold tabular-nums" aria-hidden="true">
        {days > 0 ? `${days}d ` : ''}
        {pad2(hours)}h {pad2(minutes)}m
      </span>
      <span className="sr-only">
        {`${days} days ${hours} hours ${minutes} minutes remaining, ending ${offerEndDateLabel()}`}
      </span>
    </span>
  );
}
