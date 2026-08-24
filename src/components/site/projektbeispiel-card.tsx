"use client";

import { useEffect, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { Play, X, ZoomIn } from "lucide-react";
import type { Projektbeispiel } from "@/sanity/lib/projektbeispiele";

/** Seitenverhältnis kann als Mux-String ("16:9") oder als Zahl (1.78) kommen. */
function ratioStyle(ratio?: string | number) {
  let w = 16;
  let h = 9;
  if (typeof ratio === "number" && ratio > 0) {
    w = ratio;
    h = 1;
  } else if (typeof ratio === "string" && ratio.includes(":")) {
    const [pw, ph] = ratio.split(":").map(Number);
    if (pw && ph) {
      w = pw;
      h = ph;
    }
  }
  const isPortrait = h > w;
  return {
    aspectRatio: `${w} / ${h}`,
    maxWidth: isPortrait ? "300px" : "100%",
  };
}

export function ProjektbeispielCard({ item: v }: { item: Projektbeispiel }) {
  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  const isGrafik = v.mediaType === "grafik";

  // Mux-Bild-URLs (nur mit öffentlicher Playback-ID nutzbar).
  const staticThumb = v.playbackId
    ? `https://image.mux.com/${v.playbackId}/thumbnail.webp?width=640&time=1`
    : undefined;
  const animatedThumb = v.playbackId
    ? `https://image.mux.com/${v.playbackId}/animated.webp?width=640&start=0&end=5&fps=15`
    : undefined;
  const previewSrc = v.posterUrl ?? (hover ? animatedThumb : staticThumb);

  // Lightbox per Escape schließen.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <article className="space-y-3">
      <div
        className="mx-auto overflow-hidden rounded-xl border border-border bg-black"
        style={ratioStyle(isGrafik ? v.imageAspectRatio : v.aspectRatio)}
      >
        {isGrafik ? (
          v.imageUrl ? (
            <button
              type="button"
              onClick={() => setLightbox(true)}
              aria-label={`Grafik „${v.title}“ vergrößern`}
              className="group relative block h-full w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.imageUrl}
                alt={v.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-signal-foreground opacity-0 shadow-md ring-1 ring-black/5 transition-opacity duration-150 group-hover:opacity-100">
                <ZoomIn className="size-5" />
              </span>
            </button>
          ) : (
            <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
              Keine Grafik hinterlegt.
            </div>
          )
        ) : !v.playbackId ? (
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
            {/* Play-Button ohne Overlay */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-signal-foreground shadow-lg ring-1 ring-black/5 transition-transform group-hover:scale-110">
                <Play className="ml-0.5 size-6 fill-current" />
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold leading-snug">{v.title}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            {v.company?.name && <span>{v.company.name}</span>}
            {(v.industries ?? []).map((b) => (
              <span
                key={b}
                className="rounded-full bg-signal/10 px-2 py-0.5 text-xs font-medium text-signal"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
        {v.company?.logoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={v.company.logoUrl}
            alt={v.company?.name ? `Logo ${v.company.name}` : ""}
            loading="lazy"
            className="h-10 w-auto max-w-[120px] shrink-0 object-contain"
          />
        )}
      </div>

      {/* Lightbox für Grafiken */}
      {lightbox && v.imageUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={v.title}
          onClick={() => setLightbox(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8"
        >
          <button
            type="button"
            aria-label="Schließen"
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/90 text-signal-foreground shadow-lg ring-1 ring-black/5"
          >
            <X className="size-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={v.imageUrl}
            alt={v.title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
          />
        </div>
      )}
    </article>
  );
}
