import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["shadergradient", "three", "@react-three/fiber", "@react-three/drei"],
  async redirects() {
    return [
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
