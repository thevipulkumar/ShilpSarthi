import { site } from '@/config/site';
import { LeadForm } from '@/components/forms/LeadForm';

/**
 * Free consultation form. Sits in the hero, in the slot the estimator used to
 * occupy.
 *
 * Deliberately short: three fields and a button. The whole point of putting a
 * form here rather than a multi-step tool is that a visitor can see the entire
 * commitment at a glance and finish it in under fifteen seconds.
 */
export function ConsultationForm({ sourcePage = '/' }: { sourcePage?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-panel">
      <div className="border-b border-ink-200 px-5 py-4 sm:px-6">
        <p className="eyebrow text-accent-600">Free consultation</p>
        <h2 className="mt-1 text-display-sm">Talk to a designer today</h2>
        <p className="mt-1 text-body-sm text-ink-600">
          No charge, no obligation, and no site visit fee whether or not you book with us.
        </p>
      </div>

      <div className="px-5 py-5 sm:px-6">
        <LeadForm
          variant="hero"
          sourcePage={sourcePage}
          submitLabel="Book my free consultation"
          compact
        />

        <p className="mt-4 border-t border-ink-200 pt-3 text-center text-caption text-ink-500">
          Prefer to talk now? Call{' '}
          <a
            href={`tel:${site.phones.primary.tel}`}
            className="font-bold text-accent-600 underline underline-offset-2"
          >
            {site.phones.primary.display}
          </a>
        </p>
      </div>
    </div>
  );
}
