'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site, whatsappLink } from '@/config/site';
import { PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { track } from '@/lib/analytics';

/**
 * Mobile sticky conversion bar. WhatsApp first, because in this market WhatsApp
 * converts at a multiple of form rates.
 *
 * Two things it must never do:
 *   - overlap a form submit button. It hides itself whenever a submit button is
 *     inside the viewport, so the last tap of a form is never covered.
 *   - overlap the popup. The popup sits at a higher z-index and, in corner
 *     variant, is offset upward to clear this bar.
 *
 * A spacer of matching height sits at the end of <body>, so the bar never covers
 * the footer's last line either.
 */
export function MobileStickyBar() {
  const pathname = usePathname();

  /*
   * Recorded against the path it was measured on. On navigation the stored value
   * stops matching and the bar derives back to visible, so there is no reset
   * effect and no chance of it staying hidden on a page with no form.
   */
  const [measured, setMeasured] = useState<{ path: string; hidden: boolean } | null>(null);
  const hidden = measured?.path === pathname ? measured.hidden : false;

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('button[type="submit"]'));
    if (targets.length === 0) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setMeasured({ path: pathname, hidden: visible.size > 0 });
      },
      // Bottom margin matches the bar height, so it clears the button before
      // the button reaches it rather than after.
      { rootMargin: '0px 0px -72px 0px' },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [pathname]);

  // The thank-you page is a conversion confirmation. Nothing should compete
  // with it, and the Google Ads trigger fires there.
  if (pathname === '/thank-you') return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-ink-200 bg-white/95 pb-safe-bottom backdrop-blur transition-transform duration-300 ease-out lg:hidden"
      style={{ transform: hidden ? 'translateY(110%)' : 'translateY(0)' }}
      aria-hidden={hidden}
    >
      <div className="grid grid-cols-2 gap-2 px-3 py-2.5">
        <a
          href={whatsappLink('Hi Shilp Sarthi, I would like to discuss interiors for my home in Ranchi.')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('click_whatsapp', { source_page: pathname, context: 'mobile_sticky_bar' })}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-whatsapp text-body font-semibold text-whatsapp-ink active:bg-whatsapp-dark active:text-white"
        >
          <WhatsAppIcon />
          WhatsApp
        </a>

        <a
          href={`tel:${site.phones.primary.tel}`}
          onClick={() => track('click_to_call', { source_page: pathname, context: 'mobile_sticky_bar' })}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-ink-900 text-body font-semibold text-white active:bg-ink-950"
        >
          <PhoneIcon className="h-4 w-4" />
          Call now
        </a>
      </div>
    </div>
  );
}

/** Reserves the bar's height so it never covers page content at the bottom. */
export function MobileStickyBarSpacer() {
  return <div className="h-[72px] lg:hidden" aria-hidden="true" />;
}
