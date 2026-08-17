'use client';

import { useState } from 'react';
import type { FaqItem } from '@/content/faq';
import { Section, SectionHeading } from '@/components/ui/Section';
import { ChevronDownIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

/**
 * FAQ accordion.
 *
 * Built on native <details>/<summary> so every answer is present in the DOM and
 * readable with JavaScript disabled, which also means the FAQPage structured
 * data on this page describes content a crawler can actually see.
 *
 * Only one panel opens at a time, handled in React rather than by the `name`
 * attribute so the behaviour is identical across browsers.
 */
export function Faq({
  items,
  tone = 'linen',
  heading = 'Questions Ranchi homeowners ask us',
}: {
  items: FaqItem[];
  tone?: 'linen' | 'white';
  heading?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" tone={tone}>
      {/* Heading centred, questions stacked beneath it in one column. */}
      <SectionHeading
        eyebrow="FAQ"
        title={heading}
        intro="If your question is not here, call us and ask it. We would rather answer it now than have you find out later."
        align="center"
      />

      <ul className="mx-auto mt-10 max-w-3xl divide-y divide-ink-200 border-y border-ink-200">
        {items.map((item, i) => {
          const open = openIndex === i;
          return (
            <li key={item.question}>
              <details
                open={open}
                onToggle={(e) => {
                  const isOpen = (e.currentTarget as HTMLDetailsElement).open;
                  setOpenIndex(isOpen ? i : (current) => (current === i ? null : current));
                }}
                className="group"
              >
                <summary className="flex w-full cursor-pointer list-none items-start justify-between gap-4 py-4 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="text-body-lg font-medium text-ink-900">{item.question}</h3>
                  <span
                    className={cn(
                      'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-700 transition-transform duration-200',
                      open && 'rotate-180 bg-accent-100 text-accent-700',
                    )}
                    aria-hidden="true"
                  >
                    <ChevronDownIcon className="h-4 w-4" />
                  </span>
                </summary>
                {/* Answer indented clear of the chevron column, not under it. */}
                <div className="pb-5 pr-11">
                  <p className="text-body leading-relaxed text-ink-600">{item.answer}</p>
                </div>
              </details>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
