/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow locally hosted public images + future remote CDN
    remotePatterns: [],
  },
};

export default nextConfig;
