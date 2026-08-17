import type { Metadata, Viewport } from 'next';
import { Lato, Poppins } from 'next/font/google';
import { site } from '@/config/site';
import { DEFAULT_OG, DEFAULT_OG_ALT, ogImage } from '@/lib/seo';
import { PALETTE } from '@/config/theme';
import { SiteProvider } from '@/components/providers/SiteProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { OfferBar } from '@/components/offer/OfferBar';
import { OfferPopup } from '@/components/offer/OfferPopup';
import { ConsentBanner } from '@/components/layout/ConsentBanner';
import { MobileStickyBar, MobileStickyBarSpacer } from '@/components/layout/MobileStickyBar';
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
  MetaPixel,
} from '@/components/analytics/Analytics';
import { websiteSchema } from '@/lib/schema';
import './globals.css';

/*
 * Typography, matched to the two reference sites the owner selected: Poppins for
 * headings (Livspace) and Lato for body and UI (HomeLane). This replaces the
 * earlier Playfair Display and Outfit pairing at the owner's direction.
 *
 * next/font downloads and self-hosts both at build time, so there is no request
 * to Google and no font-swap flash.
 */
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['500', '600', '700'],
});

const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Interior Design in Ranchi | Shilp Sarthi',
    // No partner brand in any page title. BRIEF.md section 4.
    template: '%s | Shilp Sarthi',
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: site.url,
    siteName: site.name,
    title: 'Interior Design in Ranchi | Shilp Sarthi',
    description: site.description,
    images: ogImage(DEFAULT_OG, DEFAULT_OG_ALT),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interior Design in Ranchi | Shilp Sarthi',
    description: site.description,
    images: [DEFAULT_OG],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: true, address: true, email: true },
  category: 'Interior Design',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#E71C24',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      data-palette={PALETTE}
      className={`${poppins.variable} ${lato.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
      </head>
      <body className="min-h-dvh">
        <GoogleTagManagerNoScript />

        <a
          href="#main"
          className="sr-only-focusable absolute left-4 top-4 z-[100] rounded-full bg-ink-900 px-4 py-2 text-body-sm font-semibold text-white"
        >
          Skip to main content
        </a>

        <SiteProvider>
          <OfferBar />
          <Header />

          <main id="main">{children}</main>

          <Footer />

          {site.features.mobileStickyBar ? (
            <>
              <MobileStickyBarSpacer />
              <MobileStickyBar />
            </>
          ) : null}
          <OfferPopup />
          <ConsentBanner />
        </SiteProvider>

        <GoogleTagManager />
        <MetaPixel />
      </body>
    </html>
  );
}
