import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@klema/shared", "@klema/db"],
};

export default nextConfig;
