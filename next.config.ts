import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Desactivar Turbopack y usar webpack para evitar problemas de build
  experimental: {
    turbo: undefined,
  },
};

export default nextConfig;
