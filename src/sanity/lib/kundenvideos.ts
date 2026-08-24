import { groq } from "next-sanity";
import { client } from "./client";
import { isSanityConfigured } from "../env";

export type Kundenvideo = {
  _id: string;
  title: string;
  /** Branchen-Tag für den Filter (feste Liste, siehe VIDEO_BRANCHES). */
  industry?: string;
  playbackId?: string;
  status?: string;
  /** Seitenverhältnis von Mux, z. B. "9:16". */
  aspectRatio?: string;
  posterUrl?: string;
  company?: {
    name: string;
    branch?: string;
    logoUrl?: string;
  };
};

export const KUNDENVIDEOS_QUERY = groq`
  *[_type == "muxVideo" && defined(video.asset)]
    | order(company->name asc, title asc) {
    _id,
    title,
    industry,
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

export async function getKundenvideos(): Promise<Kundenvideo[]> {
  if (!isSanityConfigured) return [];
  return client.fetch(KUNDENVIDEOS_QUERY);
}
