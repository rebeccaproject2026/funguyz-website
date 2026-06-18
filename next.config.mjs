/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.funguyz.ca',
          },
        ],
        destination: 'https://funguyz.ca/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.funguyz.com',
          },
        ],
        destination: 'https://funguyz.com/:path*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Rewrite legacy /product/[slug] to /magic-mushrooms/[slug] as default fallback
      {
        source: '/product/:slug',
        destination: '/magic-mushrooms/:slug',
      },
    ];
  },
};
export default nextConfig;
