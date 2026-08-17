import { formattedAddress, site } from '@/config/site';
import type { FaqItem } from '@/content/faq';
import type { Service } from '@/content/services';

/**
 * Structured data builders.
 *
 * HARD RULE: the HomeLane mark must never appear in `name`, `brand`, `legalName`
 * or `alternateName` in any of these objects. Structured data is read by Google
 * as an identity claim, so a mention here reads as "this business is HomeLane"
 * far more strongly than body copy does. BRIEF.md section 4.
 */

const ORG_ID = `${site.url}/#organization`;

export function localBusinessSchema() {
  const sameAs = [site.social.instagram, site.social.facebook, site.social.youtube];
  if (site.studio.googleBusinessProfile) sameAs.push(site.studio.googleBusinessProfile);

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'InteriorDesignService'],
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: [site.phones.primary.tel, site.phones.secondary.tel],
    email: site.email,
    image: `${site.url}/images/og/default.jpg`,
    logo: `${site.url}/images/logo.png`,
    priceRange: site.pricing.priceRange,
    currenciesAccepted: 'INR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.studio.line1}, ${site.studio.line2}`,
      addressLocality: site.studio.city,
      addressRegion: site.studio.state,
      postalCode: site.studio.postalCode,
      addressCountry: site.studio.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.studio.geo.latitude,
      longitude: site.studio.geo.longitude,
    },
    openingHoursSpecification: site.studio.schemaHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: [
      { '@type': 'City', name: 'Ranchi' },
      { '@type': 'State', name: 'Jharkhand' },
    ],
    sameAs,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Interior design services in Ranchi',
      itemListElement: [
        'Full home interiors',
        'Modular kitchen',
        'Bedroom and wardrobe',
        'Living room',
        'Commercial interiors',
      ].map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    serviceType: service.shortTitle,
    url: `${site.url}/services/${service.slug}`,
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'City', name: 'Ranchi' },
      { '@type': 'State', name: 'Jharkhand' },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${site.url}/services/${service.slug}`,
      servicePhone: site.phones.primary.tel,
      serviceLocation: {
        '@type': 'Place',
        name: `${site.name} studio`,
        address: formattedAddress,
      },
    },
  };
}

export function breadcrumbSchema(crumbs: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.href}`,
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-IN',
  };
}
