import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Twoje dotychczasowe ustawienia
  allowedDevOrigins: ['130.162.219.206'],

  // Nowa autoryzacja dla zdjęć z Twojej domeny
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pawelcv.pl',
      },
      {
        protocol: 'https',
        hostname: 'www.pawelcv.pl',
      }
    ],
  },
};

export default nextConfig;
