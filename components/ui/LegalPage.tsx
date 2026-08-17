import type { ReactNode } from 'react';
import { PageHeader, type Crumb } from '@/components/ui/Breadcrumbs';

/**
 * Shared shell for the legal pages.
 *
 * The previous build styled these in DM Serif Display on navy, which made them
 * look like a different website. They now sit on the same type system and the
 * same palette as everything else, which is also what makes them read as
 * genuine rather than boilerplate someone pasted in.
 */
export function LegalPage({
  title,
  intro,
  lastUpdated,
  crumbs,
  children,
}: {
  title: string;
  intro?: string;
  lastUpdated: string;
  crumbs: Crumb[];
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} intro={intro} crumbs={crumbs} />

      <section className="bg-white py-section">
        <div className="container-content">
          <p className="text-body-sm text-ink-500">Last updated: {lastUpdated}</p>

          {/*
            Scoped typography rather than a prose plugin: the whole legal body is
            styled from here, so the two legal pages cannot drift apart.
          */}
          <div
            className="mt-8 max-w-prose
              [&_a]:font-medium [&_a]:text-accent-700 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-accent-800
              [&_h2]:mt-10 [&_h2]:text-display-sm [&_h2:first-child]:mt-0
              [&_h3]:mt-6 [&_h3]:text-body-lg [&_h3]:font-semibold [&_h3]:text-ink-900
              [&_li]:text-body [&_li]:leading-relaxed [&_li]:text-ink-700
              [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5
              [&_p]:mt-3 [&_p]:text-body [&_p]:leading-relaxed [&_p]:text-ink-700
              [&_strong]:font-semibold [&_strong]:text-ink-900
              [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5"
          >
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
