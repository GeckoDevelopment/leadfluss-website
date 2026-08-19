import type { MetadataRoute } from "next";

const SITE_URL = "https://leadfluss.de";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Interne Bereiche nicht crawlen.
      disallow: ["/studio", "/styleguide"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
