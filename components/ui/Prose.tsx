import type { ReactNode } from 'react';

/**
 * Typographic wrapper for the legal pages.
 *
 * The previous build set these pages in DM Serif Display on navy, which was a
 * different type system from the rest of the site. They are unified onto
 * Playfair Display and Outfit here so nothing reads as a page from another
 * website. Styled without the Tailwind typography plugin to avoid the dependency
 * for three pages.
 */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        max-w-prose text-body leading-relaxed text-ink-700
        [&_a]:font-medium [&_a]:text-accent-700 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-accent-800
        [&_h2]:mt-10 [&_h2]:text-display-sm [&_h2]:text-ink-900
        [&_h3]:mt-7 [&_h3]:text-body-lg [&_h3]:font-semibold [&_h3]:text-ink-900
        [&_p]:mt-3
        [&_ul]:mt-3 [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul>li]:list-disc [&_ul>li]:marker:text-accent-500
        [&_ol]:mt-3 [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_ol>li]:list-decimal [&_ol>li]:marker:text-ink-500
        [&_strong]:font-semibold [&_strong]:text-ink-900
        [&_table]:mt-4 [&_table]:w-full [&_table]:text-body-sm
        [&_th]:border-b [&_th]:border-ink-200 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-ink-900
        [&_td]:border-b [&_td]:border-ink-100 [&_td]:py-2 [&_td]:align-top
      "
    >
      {children}
    </div>
  );
}
