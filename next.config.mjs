/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'funguyz.ca',
          },
        ],
        destination: 'https://www.funguyz.ca/:path*',
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
