/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
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
