import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /thank-you is the Google Ads conversion URL. Keeping crawlers off it
        // stops organic arrivals from firing a paid conversion.
        disallow: ['/api/', '/thank-you'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
