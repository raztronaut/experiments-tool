import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/': ['./src/app/experiments/**/*'],
  },
};

export default nextConfig;
