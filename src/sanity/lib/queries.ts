import { groq } from "next-sanity";

const POST_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  author,
  readingTime,
  publishedAt,
  seoDescription,
  "coverUrl": coverImage.asset->url,
  "coverAlt": coverImage.alt,
  "authorImageUrl": authorImage.asset->url
`;

/** Übersicht: nur Kern-Felder, kein Body (Performance). */
export const POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...$limit] {
    ${POST_FIELDS}
  }
`;

/** Detailseite: inkl. Portable-Text-Body. */
export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_FIELDS},
    body[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      }
    }
  }
`;

export const POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;
