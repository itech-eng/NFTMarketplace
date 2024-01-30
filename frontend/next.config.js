/** @type {import('next').NextConfig} */

const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  // assetPrefix: process.env.NEXT_PUBLIC_BASE_URL,
  // basePath: process.env.BASE_URL,
  reactStrictMode: true,
  /* async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/:path*",
      },
    ];
  }, */
  images: {
    domains: ["localhost", process.env.NEXT_PUBLIC_API_URL],
  },
});
