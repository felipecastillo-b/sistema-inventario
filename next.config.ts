import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // loader: 'cloudinary',
    // path: 'https://res.cloudinary.com/your-account-name',
  },
  // reactStrictMode: true,  // opcional
};

export default nextConfig;