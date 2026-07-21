/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4800",
        pathname: "/frank-and-oak-files/**",
      },
    ],
  },
};

export default nextConfig;