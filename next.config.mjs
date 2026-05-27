/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable the X-Powered-By header (security best practice)
  poweredByHeader: false,

  images: {
    // Allow locally hosted public images + LeetCode badge images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "leetcode.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.leetcode.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
