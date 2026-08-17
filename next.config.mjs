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
