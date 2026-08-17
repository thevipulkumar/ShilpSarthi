'use client';

import { useEffect, useRef, useState } from 'react';
import { paymentSchedule, scheduleIsPublishable } from '@/content/payment-stages';
import { cn } from '@/lib/utils';

/**
 * Payment transparency, as an animated rail.
 *
 * Placed high on the homepage on purpose: in Ranchi the number one objection is
 * fear of a contractor taking an advance and disappearing, and this answers it
 * before the visitor has time to form it.
 *
 * The rail draws itself and the nodes light up in sequence when the section
 * scrolls into view. That is the one piece of motion in the section, it runs
 * once, and it collapses to a static finished state under prefers-reduced-motion
 * or with JavaScript off, so the content never depends on the animation.
 *
 * Percentages stay hidden until the real contract figures are filled in. See
 * content/payment-stages.ts.
 */
export function PaymentStepper() {
  const showPercentages = scheduleIsPublishable();
  const stages = paymentSchedule.stages;

  const sectionRef = useRef<HTMLElement>(null);

  /*
   * Starts fully lit. The effect only dims it back down once it has confirmed it
   * can animate, so a visitor with reduced motion, or with JavaScript off, sees
   * the finished state rather than an empty rail.
   */
  const [active, setActive] = useState(stages.length - 1);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') return;

    const timers: number[] = [];
    let done = false;

    /*
     * Dim, then light the nodes in sequence the first time the section is
     * visible. There is deliberately no "already on screen, skip it" branch:
     * every attempt to detect that has to measure layout during the effect or
     * in the observer's first callback, and both run before web fonts have
     * settled the height of everything above this section. The section then
     * measures as on screen when it is not, and the animation silently never
     * plays. Playing it immediately in the rare case it is already visible is a
     * far better failure than never playing it at all.
     *
     * Only the step numbers and the rail dim. All the text stays readable
     * throughout, so nothing is hidden behind the animation.
     */
    // Deferred a frame rather than called straight from the effect body: it
    // keeps the dim out of the synchronous mount pass (no cascading render) and
    // gives layout a beat to settle before the observer starts measuring.
    const dim = window.requestAnimationFrame(() => setActive(-1));

    const observer = new IntersectionObserver(
      (entries) => {
        if (done || !entries.some((e) => e.isIntersecting)) return;
        done = true;
        observer.disconnect();
        stages.forEach((_, i) => {
          timers.push(window.setTimeout(() => setActive(i), 140 * i));
        });
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0 },
    );

    /*
     * Wait for web fonts before observing. Without this the observer takes its
     * first measurement against a layout that has not settled, decides the
     * section is on screen when it is about to be pushed a thousand pixels
     * further down, and fires the whole sequence at load, where nobody sees it.
     */
    let cancelled = false;
    const startObserving = () => {
      if (!cancelled) observer.observe(node);
    };

    if (document.fonts && document.fonts.status !== 'loaded') {
      document.fonts.ready.then(startObserving).catch(startObserving);
    } else {
      startObserving();
    }

    // Safety net. If the sequence never runs, the rail must not sit empty.
    const fallback = window.setTimeout(() => {
      if (!done) {
        observer.disconnect();
        setActive(stages.length - 1);
      }
    }, 6000);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(dim);
      observer.disconnect();
      window.clearTimeout(fallback);
      timers.forEach(window.clearTimeout);
    };
  }, [stages]);

  return (
    <section
      ref={sectionRef}
      id="payments"
      className="border-b border-ink-200 bg-white py-section"
      aria-labelledby="payments-heading"
    >
      <div className="container-content">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent-600">Payment transparency</p>
          <h2 id="payments-heading" className="mt-2 text-display-md">
            You pay in stages, against work delivered
          </h2>
          <p className="mt-3 text-body-lg text-ink-600">
            No single large advance. {paymentSchedule.unpublishedNote}
          </p>
        </div>

        {/*
           One column on small screens with a vertical rail, five across on
           desktop with a horizontal one. There is deliberately no two-column
           tablet step: a connector line between steps laid out in two columns
           has nowhere sensible to go.

           Connectors are drawn per segment, positioned against their own step
           rather than as one bar stretched across the grid. The single-bar
           version overshot at both ends, because the nodes sit 14px into their
           column while the bar started at the container edge.
        */}
        <ol className="relative mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-5 lg:gap-4">
          {stages.map((stage, i) => {
            const lit = i <= active;
            const isLast = i === stages.length - 1;
            // The segment leaving this node is filled once the next one lights.
            const segmentFilled = i < active;

            return (
              <li key={stage.stage} className="relative flex gap-4 lg:block">
                {!isLast ? (
                  <>
                    {/* Vertical, small screens. Reaches into the 2rem row gap so
                        consecutive segments meet. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-[13px] top-7 -bottom-8 w-0.5 overflow-hidden bg-ink-200 lg:hidden"
                    >
                      <span
                        className="block h-full w-full origin-top bg-accent-600 transition-transform duration-500 ease-out"
                        style={{ transform: `scaleY(${segmentFilled ? 1 : 0})` }}
                      />
                    </span>

                    {/* Horizontal, desktop. Reaches into the 1rem column gap. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-7 -right-4 top-[13px] hidden h-0.5 overflow-hidden bg-ink-200 lg:block"
                    >
                      <span
                        className="block h-full w-full origin-left bg-accent-600 transition-transform duration-500 ease-out"
                        style={{ transform: `scaleX(${segmentFilled ? 1 : 0})` }}
                      />
                    </span>
                  </>
                ) : null}

                <span
                  className={cn(
                    /*
                     * No background utility in the base classes. `bg-white` here
                     * and `bg-accent-600` in the lit branch are conflicting
                     * Tailwind utilities, and the stylesheet order decides which
                     * wins, not the order they appear in this string. bg-white was
                     * winning, so a lit node rendered as a white circle with a
                     * white numeral inside it.
                     */
                    'relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-caption font-bold transition-all duration-300',
                    lit
                      ? 'border-accent-600 bg-accent-600 text-white'
                      : 'border-ink-300 bg-white text-ink-400',
                  )}
                >
                  {i + 1}
                </span>

                <div className="lg:mt-4 lg:pr-4">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-body-lg font-bold text-ink-900">{stage.stage}</h3>
                    {showPercentages && stage.percentage !== null ? (
                      <span className="text-body-lg font-bold text-accent-600">
                        {stage.percentage}%
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-caption font-bold uppercase tracking-wide text-accent-600">
                    {stage.when}
                  </p>
                  <p className="mt-1.5 text-body-sm text-ink-600">{stage.what}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-10 flex items-start gap-2.5 border-t border-ink-200 pt-5 text-body text-ink-700">
          <svg
            viewBox="0 0 20 20"
            className="mt-1 h-4 w-4 shrink-0 text-accent-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="10" cy="10" r="8" />
            <path d="M10 6v4.5l2.5 1.5" strokeLinecap="round" />
          </svg>
          {paymentSchedule.delayPolicy}
        </p>
      </div>
    </section>
  );
}
