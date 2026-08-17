import Link from 'next/link';
import { breadcrumbSchema } from '@/lib/schema';

export type Crumb = { name: string; href: string };

/** Renders the visible trail and its BreadcrumbList schema together, so the two
 *  can never describe different paths. Used on every nested route. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-caption text-ink-600">
          {crumbs.map((crumb, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-ink-800">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-ink-900 hover:underline">
                    {crumb.name}
                  </Link>
                )}
                {!last ? (
                  <span className="text-ink-400" aria-hidden="true">
                    /
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/** Standard page header used by every interior page. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-ink-200 bg-white py-10 sm:py-14">
      <div className="container-content">
        {crumbs ? <Breadcrumbs crumbs={crumbs} /> : null}
        {eyebrow ? <p className="eyebrow mt-4 text-accent-600">{eyebrow}</p> : null}
        <h1 className={`text-display-lg ${eyebrow ? 'mt-2' : 'mt-4'}`}>{title}</h1>
        {intro ? <p className="mt-4 max-w-prose text-body-lg text-ink-600">{intro}</p> : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </header>
  );
}
