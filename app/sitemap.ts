import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { services } from '@/content/services';
import { projects } from '@/content/projects';

/**
 * Sitemap.
 *
 * Deliberately excluded:
 *   /thank-you   noindex, and indexing it would pollute conversion data
 *   /blog        scaffold with no posts yet, so nothing to crawl
 *
 * Priorities reflect what the site is actually trying to rank for: the homepage
 * carries the primary Ranchi keywords, the service pages carry the secondary
 * ones, and the legal pages exist to be linked rather than found.
 *
 * /pricing was listed here at priority 0.9 for some time after the page itself
 * was removed, so the sitemap was pointing Google at a 404 and calling it one of
 * the most important URLs on the site. Anything added here must resolve.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/portfolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/process`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/offer-terms`, lastModified: now, changeFrequency: 'weekly', priority: 0.4 },
    { url: `${site.url}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${site.url}/terms-of-service`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${site.url}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
