import pwa from "next-pwa";

const withPWA = pwa({
  dest: 'public'
});

const nextConfig = withPWA({
  experimental: {
    serverActions: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});

export default nextConfig;
