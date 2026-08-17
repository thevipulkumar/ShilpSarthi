import { formattedAddress, site } from '@/config/site';
import { StarIcon } from '@/components/ui/Icons';

/**
 * Real numbers only. Every figure here comes from config/site.ts and each one
 * must be independently checkable, because a visitor who catches one invented
 * number stops believing the rest of the page.
 */
export function TrustStrip() {
  const items = [
    {
      value: `${site.stats.googleRating}`,
      label: `Google rating from ${site.stats.googleReviewCount} reviews`,
      star: true,
    },
    {
      value: `${site.stats.projectsDelivered}+`,
      label: 'Homes and spaces delivered in Ranchi',
    },
    {
      value: `${site.stats.warrantyYears} years`,
      label: 'Warranty on modular work',
    },
    {
      value: 'Singh More',
      label: formattedAddress,
      small: true,
    },
  ];

  return (
    <section className="border-b border-ink-200 bg-white py-8" aria-label="Shilp Sarthi at a glance">
      <div className="container-content">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.label}>
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span
                  className={`flex items-center gap-1.5 font-display font-semibold text-ink-900 ${
                    item.small ? 'text-display-sm' : 'text-display-sm'
                  }`}
                >
                  {item.star ? <StarIcon className="h-5 w-5 text-gold-600" /> : null}
                  {item.value}
                </span>
                <span className="mt-1 block text-caption leading-snug text-ink-600">
                  {item.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
