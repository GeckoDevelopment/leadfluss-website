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
      // Kundenvideos-Galerie wurde zu Projektbeispiele (Videos + Grafiken).
      { source: "/kundenvideos", destination: "/projektbeispiele", permanent: true },
      // Alte Kontakt-Route zeigt jetzt auf den Anfrage-Funnel.
      { source: "/kontakt", destination: "/anfrage", permanent: true },
      // Zwischenzeitlicher Slug /anfrage-stellen zurück auf /anfrage.
      { source: "/anfrage-stellen", destination: "/anfrage", permanent: true },
      // Alte Franchise-Seite auf den neuen Branchen-Slug umleiten.
      {
        source: "/franchisegeber-videomarketing",
        destination: "/videomarketing-franchisesysteme",
        permanent: true,
      },
      // Alte Photovoltaik-Lead-Seite auf den passenden Blogartikel umleiten.
      {
        source: "/photovoltaik-leads",
        destination: "/blog/solar-leads-kaufen",
        permanent: true,
      },
      // Zweite alte Franchise-Seite ebenfalls auf den neuen Branchen-Slug.
      {
        source: "/franchisepartner-gewinnen",
        destination: "/videomarketing-franchisesysteme",
        permanent: true,
      },
      // Karriere läuft komplett über die externe Karriereseite – alte
      // /karriere-URLs (inkl. Stellenanzeigen) dorthin umleiten.
      {
        source: "/karriere",
        destination: "https://karriere.leadfluss.de/",
        permanent: true,
      },
      {
        source: "/karriere/:path*",
        destination: "https://karriere.leadfluss.de/",
        permanent: true,
      },
      // Fallstudien-Seite wird neu gebaut – vorerst auf die Startseite leiten.
      { source: "/fallstudien", destination: "/", permanent: true },
      // Über-uns-Seite entfernt – auf die Startseite leiten.
      { source: "/ueber-uns", destination: "/", permanent: true },
      // Alte Tools-Seiten auf den externen Generator umleiten.
      {
        source: "/tools",
        destination: "https://www.linkedingenerator.de/",
        permanent: true,
      },
      {
        source: "/tools/auf-linkedin-fett-schreiben",
        destination: "https://www.linkedingenerator.de/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
