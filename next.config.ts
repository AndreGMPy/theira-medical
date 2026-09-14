import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/precios",
        destination: "/catalogo",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
