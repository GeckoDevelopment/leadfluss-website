import { groq } from "next-sanity";
import { client } from "./client";
import { isSanityConfigured } from "../env";

export type MuxVideo = {
  _id: string;
  title: string;
  /** Mux Playback-ID – reicht dem Player zum Streamen (kein Token nötig). */
  playbackId?: string;
  /** "ready" sobald Mux das Video fertig verarbeitet hat. */
  status?: string;
  /** Seitenverhältnis von Mux, z. B. "9:16" – zum sauberen Layout. */
  aspectRatio?: string;
  posterUrl?: string;
};

export const MUX_VIDEO_QUERY = groq`
  *[_type == "muxVideo"] | order(_createdAt desc) {
    _id,
    title,
    "playbackId": video.asset->playbackId,
    "status": video.asset->status,
    "aspectRatio": video.asset->data.aspect_ratio,
    "posterUrl": poster.asset->url
  }
`;

export async function getMuxVideos(): Promise<MuxVideo[]> {
  if (!isSanityConfigured) return [];
  return client.fetch(MUX_VIDEO_QUERY);
}
