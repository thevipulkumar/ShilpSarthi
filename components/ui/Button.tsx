import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'whatsapp' | 'ghost' | 'dark';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-offset-2';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent-600 text-white shadow-sm hover:bg-accent-700 active:bg-accent-800 focus-visible:ring-accent-600',
  secondary:
    'border border-ink-300 bg-white text-ink-900 hover:border-ink-500 hover:bg-ink-50 focus-visible:ring-ink-600',
  whatsapp:
    'bg-whatsapp text-whatsapp-ink shadow-sm hover:bg-[#1fbe5b] active:bg-whatsapp-dark active:text-white focus-visible:ring-whatsapp-dark',
  ghost: 'text-ink-700 hover:bg-ink-100 hover:text-ink-900 focus-visible:ring-ink-600',
  dark: 'bg-ink-900 text-white hover:bg-ink-800 active:bg-ink-950 focus-visible:ring-ink-600',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-[40px] px-4 text-body-sm',
  md: 'min-h-[48px] px-6 text-body',
  lg: 'min-h-[54px] px-7 text-body-lg',
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  ...rest
}: SharedProps & ComponentProps<'button'>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  href,
  ...rest
}: SharedProps & Omit<ComponentProps<typeof Link>, 'className'>) {
  const isExternal = typeof href === 'string' && /^(https?:|tel:|mailto:)/.test(href);

  if (isExternal) {
    const external = href as string;
    const isHttp = external.startsWith('http');
    return (
      <a
        href={external}
        className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(rest as ComponentProps<'a'>)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
