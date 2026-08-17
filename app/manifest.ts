import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} | Interior Design in Ranchi`,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#FFFFFF',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
