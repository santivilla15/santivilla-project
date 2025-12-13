import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizar compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'], // Mantener console.error y console.warn
    } : false,
  },
  
  // Optimizar imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Optimizar carga de imágenes
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Desactivar cosas innecesarias durante el build
  poweredByHeader: false,
  
  // Optimizaciones para builds más rápidos
  experimental: {
    // Optimizar compilación de paquetes grandes
    optimizePackageImports: ['@sentry/nextjs', '@supabase/supabase-js', '@stripe/stripe-js'],
    // Usar Turbopack para builds más rápidos
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Reducir tamaño del bundle
  swcMinify: true,
};

export default nextConfig;
