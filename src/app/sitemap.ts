import type { MetadataRoute } from "next";
import { getPostSlugs } from "@/sanity/lib/posts";

const SITE_URL = "https://leadfluss.de";

// Öffentliche, indexierbare Seiten. Bewusst NICHT enthalten:
// /styleguide und /studio (intern) sowie /impressum & /datenschutz (noindex).
const ROUTES = [
  "",
  "/leistungen",
  "/vor-ort-videodreh",
  "/fallstudien",
  "/ueber-uns",
  "/blog",
  "/faq",
  "/karriere",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const slugs = await getPostSlugs().catch(() => [] as string[]);
  const postEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
