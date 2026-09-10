import { groq } from "next-sanity";
import { client } from "./client";
import { isSanityConfigured } from "../env";

export type Projektbeispiel = {
  _id: string;
  title: string;
  /** "video" oder "grafik" – steuert Darstellung und Typ-Filter. */
  mediaType?: "video" | "grafik";
  /** Nur bei Videos: "kundenstimme" | "projektpraesentation" | "firmenvorstellung". */
  videoFormat?: string;
  /** Branchen-Tags für den Filter (feste Liste, siehe VIDEO_BRANCHES). Ein Video kann mehreren Branchen zugeordnet sein. */
  industries?: string[];
  // Video (Mux)
  playbackId?: string;
  status?: string;
  /** Seitenverhältnis von Mux, z. B. "9:16". */
  aspectRatio?: string;
  posterUrl?: string;
  // Grafik / Foto
  imageUrl?: string;
  /** Seitenverhältnis des Bildes, z. B. 1.78. */
  imageAspectRatio?: number;
  company?: {
    name: string;
    branch?: string;
    logoUrl?: string;
  };
};

export const PROJEKTBEISPIELE_QUERY = groq`
  *[_type == "muxVideo" && (defined(video.asset) || defined(image.asset))]
    | order(company->name asc, title asc) {
    _id,
    title,
    "mediaType": select(defined(image.asset) && mediaType == "grafik" => "grafik", "video"),
    videoFormat,
    "industries": select(
      defined(industries) && count(industries) > 0 => industries,
      defined(industry) => [industry],
      []
    ),
    "playbackId": video.asset->playbackId,
    "status": video.asset->status,
    "aspectRatio": video.asset->data.aspect_ratio,
    "posterUrl": poster.asset->url,
    "imageUrl": image.asset->url,
    "imageAspectRatio": image.asset->metadata.dimensions.aspectRatio,
    "company": company->{
      name,
      branch,
      "logoUrl": logo.asset->url
    }
  }
`;

export async function getProjektbeispiele(): Promise<Projektbeispiel[]> {
  if (!isSanityConfigured) return [];
  return client.fetch(PROJEKTBEISPIELE_QUERY);
}

/**
 * Kuratierte Kurzvideos für den Startseiten-Slider. Es zählen nur
 * Video-Projektbeispiele mit gesetztem Flag `showOnHomepage`, sortiert nach
 * `homepageOrder` (leer = ans Ende) und dann Titel.
 */
export const HOMEPAGE_VIDEOS_QUERY = groq`
  *[_type == "muxVideo" && mediaType != "grafik" && showOnHomepage == true && defined(video.asset)]
    | order(coalesce(homepageOrder, 9999) asc, title asc)[0...12] {
    _id,
    title,
    "playbackId": video.asset->playbackId,
    "status": video.asset->status,
    "aspectRatio": video.asset->data.aspect_ratio,
    "posterUrl": poster.asset->url,
    "company": company->{
      name,
      branch,
      "logoUrl": logo.asset->url
    }
  }
`;

export async function getHomepageVideos(): Promise<Projektbeispiel[]> {
  if (!isSanityConfigured) return [];
  return client.fetch(HOMEPAGE_VIDEOS_QUERY);
}
