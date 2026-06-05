/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // async rewrites() {
  //   return [
  //     // Rewrite legacy /product/[slug] to /magic-mushrooms/[slug] as default fallback
  //     {
  //       source: '/product/:slug',
  //       destination: '/magic-mushrooms/:slug',
  //     },
  //   ];
  // },
};
export default nextConfig;
