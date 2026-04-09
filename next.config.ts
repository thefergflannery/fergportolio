import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["shadergradient", "three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
