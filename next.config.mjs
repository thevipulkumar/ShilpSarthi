/*
 * NEXT_PUBLIC_* values are inlined into the bundle at build time, not read at
 * runtime. If the host builds before these are set in its environment, the site
 * ships with empty tracking IDs and every campaign silently records no
 * conversions, with nothing in the logs to say so. That happened on the first
 * Hostinger deploy, so the build now says it out loud.
 *
 * WEB3FORMS_ACCESS_KEY is deliberately not checked here: it is read at request
 * time by app/api/lead/route.ts, so it only needs to exist in the running
 * process, and warning about it during a build would be a false alarm.
 */
const buildTimePublicVars = ['NEXT_PUBLIC_GTM_ID', 'NEXT_PUBLIC_GA4_ID', 'NEXT_PUBLIC_META_PIXEL_ID'];
const missing = buildTimePublicVars.filter((name) => !process.env[name]);

if (missing.length > 0 && process.env.NODE_ENV === 'production') {
  console.warn(
    `\n  WARNING  Building without ${missing.join(', ')}.\n` +
      '           These are baked in at build time, so the deployed site will have\n' +
      '           no analytics or conversion tracking. Set them in the host\n' +
      '           environment and rebuild; a restart alone will not pick them up.\n',
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    // Every project photo is served from /public. Add remote patterns here only
    // if the owner later moves media to a CDN.
    remotePatterns: [],
  },

  // The Google Ads conversion action fires on the exact path /thank-you.
  // Adding a trailing slash silently breaks conversion reporting, so this is
  // pinned to false deliberately. See BRIEF.md section 9.
  trailingSlash: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
