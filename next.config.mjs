/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "young-shape-8414.fly.storage.tigris.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
