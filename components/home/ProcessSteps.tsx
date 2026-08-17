import { processSteps } from '@/content/process';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { CheckIcon } from '@/components/ui/Icons';

export function ProcessSteps({ tone = 'white' }: { tone?: 'white' | 'linen' }) {
  return (
    <Section id="process" tone={tone}>
      <SectionHeading
        eyebrow="How it works"
        title="Five steps, and you know where you are in all of them"
        intro="Each step has a date and something you physically receive at the end of it. If you cannot tell which step you are on, we have done it wrong."
      />

      <ol className="mt-9 grid gap-4 lg:grid-cols-5">
        {processSteps.map((step, i) => (
          <Reveal as="li" key={step.number} delay={i * 70}>
            <div className="flex h-full flex-col rounded-card border border-ink-200 bg-white p-5">
              <span className="font-display text-display-sm font-semibold text-accent-300">
                {step.number}
              </span>
              <h3 className="mt-1 text-body-lg font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-0.5 text-caption font-medium uppercase tracking-wide text-accent-700">
                {step.duration}
              </p>
              <p className="mt-2.5 flex-1 text-body-sm leading-relaxed text-ink-600">{step.body}</p>
              <p className="mt-4 flex items-start gap-1.5 border-t border-ink-100 pt-3 text-caption leading-snug text-ink-700">
                <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-600" />
                {step.youGet}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
