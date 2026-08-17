'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV_LINKS, site } from '@/config/site';
import { ButtonLink } from '@/components/ui/Button';
import { CloseIcon, PhoneIcon } from '@/components/ui/Icons';
import { Logo } from '@/components/ui/Logo';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  /*
   * The menu must close on navigation, otherwise it stays open over the new
   * page. That is derived from the path rather than reset in an effect: state
   * recorded against a path that is no longer current simply reads as closed,
   * so there is no second render pass after every navigation.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const menuOpen = openedOn === pathname;

  const setMenuOpen = (open: boolean) => setOpenedOn(open ? pathname : null);

  /*
   * The root link needs an exact match. A prefix test would mark Home active on
   * every route, since every path begins with a slash. It happens not to today
   * only because `'/services'.startsWith('//')` is false, which is too subtle a
   * thing to leave a future edit resting on.
   */
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.dataset.scrollLocked = 'true';

    // Closes by clearing the recorded path, so this does not depend on the
    // setMenuOpen closure and the listener is registered exactly once per open.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenedOn(null);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      delete document.body.dataset.scrollLocked;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container-content flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
          <Logo className="h-9 w-auto lg:h-10" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'rounded-full px-3 py-2 text-body-sm font-medium transition-colors',
                      active
                        ? 'bg-ink-100 text-ink-900'
                        : 'text-ink-700 hover:bg-ink-100 hover:text-ink-900',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/*
            The call button stays visible at every breakpoint. On mobile it
            collapses to the icon so it never crowds the logo out.
          */}
          <a
            href={`tel:${site.phones.primary.tel}`}
            onClick={() => track('click_to_call', { source_page: pathname, context: 'header' })}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 text-body-sm font-semibold text-ink-900 transition-colors hover:bg-ink-100 sm:px-4"
          >
            <PhoneIcon className="h-4 w-4 text-accent-600" />
            <span className="hidden sm:inline">{site.phones.primary.display}</span>
            <span className="sr-only sm:hidden">Call {site.phones.primary.display}</span>
          </a>

          <ButtonLink href="/contact" size="sm" className="hidden md:inline-flex">
            Book free site visit
          </ButtonLink>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink-800 transition-colors hover:bg-ink-100 lg:hidden"
          >
            {menuOpen ? (
              <CloseIcon />
            ) : (
              <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-ink-200 bg-white lg:hidden"
        >
          <ul className="container-content grid gap-1 py-3">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex min-h-[48px] items-center rounded-xl px-4 text-body font-medium transition-colors',
                      active ? 'bg-ink-100 text-ink-900' : 'text-ink-800 hover:bg-ink-100',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-1">
              <ButtonLink href="/contact" fullWidth size="md">
                Book free site visit
              </ButtonLink>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
