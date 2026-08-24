"use client";

import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { Play } from "lucide-react";
import type { Kundenvideo } from "@/sanity/lib/kundenvideos";

function ratioStyle(aspectRatio?: string) {
  const [w, h] = (aspectRatio ?? "16:9").split(":").map(Number);
  const isPortrait = w && h ? h > w : false;
  return {
    aspectRatio: (aspectRatio ?? "16:9").replace(":", " / "),
    maxWidth: isPortrait ? "300px" : "100%",
  };
}

export function KundenvideoCard({ video: v }: { video: Kundenvideo }) {
  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);

  // Mux-Bild-URLs (nur mit öffentlicher Playback-ID nutzbar).
  const staticThumb = v.playbackId
    ? `https://image.mux.com/${v.playbackId}/thumbnail.webp?width=640&time=1`
    : undefined;
  const animatedThumb = v.playbackId
    ? `https://image.mux.com/${v.playbackId}/animated.webp?width=640&start=0&end=5&fps=15`
    : undefined;
  const previewSrc = v.posterUrl ?? (hover ? animatedThumb : staticThumb);

  return (
    <article className="space-y-3">
      <div
        className="mx-auto overflow-hidden rounded-xl border border-border bg-black"
        style={ratioStyle(v.aspectRatio)}
      >
        {!v.playbackId ? (
          <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
            Video wird noch verarbeitet …
          </div>
        ) : playing ? (
          <MuxPlayer
            playbackId={v.playbackId}
            streamType="on-demand"
            autoPlay
            accentColor="#00c281"
            metadata={{ video_title: v.title }}
            poster={v.posterUrl}
            style={{ height: "100%", width: "100%" }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            aria-label={`Video „${v.title}“ abspielen`}
            className="group relative block h-full w-full"
          >
            {previewSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewSrc}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            )}
            {/* Firmenlogo oben links */}
            {v.company?.logoUrl && (
              <span className="absolute left-3 top-3 z-10 flex items-center rounded-lg bg-white/90 px-3 py-2 shadow-md ring-1 ring-black/5 backdrop-blur-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.company.logoUrl}
                  alt={v.company?.name ? `Logo ${v.company.name}` : ""}
                  loading="lazy"
                  className="h-10 w-auto max-w-[160px] object-contain"
                />
              </span>
            )}
            {/* Play-Button ohne Overlay */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-signal-foreground shadow-lg ring-1 ring-black/5 transition-transform group-hover:scale-110">
                <Play className="ml-0.5 size-6 fill-current" />
              </span>
            </span>
          </button>
        )}
      </div>

      <div>
        <h3 className="font-semibold leading-snug">{v.title}</h3>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          {v.company?.name && <span>{v.company.name}</span>}
          {v.industry && (
            <span className="rounded-full bg-signal/10 px-2 py-0.5 text-xs font-medium text-signal">
              {v.industry}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
