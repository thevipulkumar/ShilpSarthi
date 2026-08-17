import type { Config } from 'tailwindcss';

/**
 * Colour tokens resolve to CSS custom properties defined in app/globals.css.
 *
 * Two palette directions ship in this repo (BRIEF.md section 14):
 *   Direction A  Warm Linen / Deep Ink / Terracotta   <- shipped default
 *   Direction B  HomeLane-aligned                     <- requires written permission
 *
 * Swapping is a one-line change in config/theme.ts. Because every component
 * references semantic token names only, no component code changes.
 */
const withVar = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
    './config/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: withVar('--ink-50'),
          100: withVar('--ink-100'),
          200: withVar('--ink-200'),
          300: withVar('--ink-300'),
          400: withVar('--ink-400'),
          500: withVar('--ink-500'),
          600: withVar('--ink-600'),
          700: withVar('--ink-700'),
          800: withVar('--ink-800'),
          900: withVar('--ink-900'),
          950: withVar('--ink-950'),
        },
        linen: {
          50: withVar('--linen-50'),
          100: withVar('--linen-100'),
          200: withVar('--linen-200'),
          300: withVar('--linen-300'),
          400: withVar('--linen-400'),
          500: withVar('--linen-500'),
        },
        accent: {
          50: withVar('--accent-50'),
          100: withVar('--accent-100'),
          200: withVar('--accent-200'),
          300: withVar('--accent-300'),
          400: withVar('--accent-400'),
          500: withVar('--accent-500'),
          600: withVar('--accent-600'),
          700: withVar('--accent-700'),
          800: withVar('--accent-800'),
          900: withVar('--accent-900'),
        },
        gold: {
          400: withVar('--gold-400'),
          500: withVar('--gold-500'),
          600: withVar('--gold-600'),
        },
        // WhatsApp brand green. Fixed, not part of either palette direction.
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#128C7E',
          ink: '#075E54',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid type scale. Mobile-first: the min value is the 360px size.
        'display-xl': ['clamp(2.125rem, 1.55rem + 2.55vw, 3.75rem)', { lineHeight: '1.06', letterSpacing: '-0.022em' }],
        'display-lg': ['clamp(1.875rem, 1.45rem + 1.9vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.625rem, 1.35rem + 1.22vw, 2.375rem)', { lineHeight: '1.15', letterSpacing: '-0.017em' }],
        'display-sm': ['clamp(1.375rem, 1.22rem + 0.67vw, 1.75rem)', { lineHeight: '1.22', letterSpacing: '-0.012em' }],
        'body-lg': ['clamp(1.0625rem, 1.02rem + 0.2vw, 1.1875rem)', { lineHeight: '1.65' }],
        'body': ['1rem', { lineHeight: '1.65' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.6' }],
        'caption': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.005em' }],
        'eyebrow': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.11em' }],
      },
      spacing: {
        'section': 'clamp(3.5rem, 2.4rem + 4.9vw, 6.5rem)',
        'safe-bottom': 'env(safe-area-inset-bottom, 0px)',
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      borderRadius: {
        card: '14px',
        sheet: '20px 20px 0 0',
      },
      boxShadow: {
        card: '0 1px 2px rgb(var(--ink-900) / 0.04), 0 8px 24px -12px rgb(var(--ink-900) / 0.14)',
        'card-hover': '0 2px 4px rgb(var(--ink-900) / 0.05), 0 18px 40px -16px rgb(var(--ink-900) / 0.22)',
        panel: '0 4px 12px rgb(var(--ink-900) / 0.06), 0 28px 64px -24px rgb(var(--ink-900) / 0.28)',
        sheet: '0 -8px 40px -12px rgb(var(--ink-900) / 0.28)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translate3d(0, 14px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'sheet-up': {
          from: { transform: 'translate3d(0, 100%, 0)' },
          to: { transform: 'translate3d(0, 0, 0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-corner': {
          from: { opacity: '0', transform: 'translate3d(0, 20px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'sheet-up': 'sheet-up 0.3s cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in': 'scale-in 0.22s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-in-corner': 'slide-in-corner 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
