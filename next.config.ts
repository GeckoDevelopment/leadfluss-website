import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Sanity CDN (Blog-Bilder)
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return [
      // Alte Kontakt-Route zeigt jetzt auf den Anfrage-Funnel.
      { source: "/kontakt", destination: "/anfrage", permanent: true },
    ];
  },
};

export default nextConfig;
