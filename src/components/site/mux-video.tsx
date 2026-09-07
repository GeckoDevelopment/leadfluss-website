"use client";

import { useRef, useState } from "react";
import MuxPlayer, { type MuxPlayerCSSProperties } from "@mux/mux-player-react";
import type MuxPlayerElement from "@mux/mux-player";
import { Play } from "lucide-react";

// Bindet ein Mux-Video ein (Ersatz für den früheren WistiaPlayer).
// Erwartet die öffentliche Mux-Playback-ID. Das Seitenverhältnis wird als
// Container-`aspect-ratio` gesetzt, damit vor dem Laden kein Layout-Shift
// entsteht. Solange noch keine Playback-ID hinterlegt ist, zeigt die Component
// einen dezenten Platzhalter statt eines kaputten Players.
//
// Im `background`-Modus läuft das Video als stummer Endlos-Loop ohne
// Bedienleiste; ein Klick pausiert bzw. startet die Wiedergabe.
export function MuxVideo({
  playbackId,
  title,
  aspect = 1.7778,
  poster,
  background = false,
}: {
  playbackId?: string;
  title?: string;
  /** Seitenverhältnis als Zahl (Breite/Höhe), z. B. 1.7778 für 16:9. */
  aspect?: number;
  poster?: string;
  /** Stummer Endlos-Loop ohne Steuerleiste, Klick pausiert/startet. */
  background?: boolean;
}) {
  return (
    <div
      className="overflow-hidden bg-muted"
      style={{ aspectRatio: aspect }}
    >
      {!playbackId ? (
        <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
          Video folgt in Kürze.
        </div>
      ) : background ? (
        <BackgroundMuxVideo playbackId={playbackId} title={title} poster={poster} />
      ) : (
        <MuxPlayer
          playbackId={playbackId}
          streamType="on-demand"
          accentColor="#00c281"
          metadata={title ? { video_title: title } : undefined}
          poster={poster}
          style={
            {
              height: "100%",
              width: "100%",
              // Füllt den (durch den Border minimal schmaleren) Rahmen randlos,
              // damit keine schwarzen Balken entstehen.
              "--media-object-fit": "cover",
            } as MuxPlayerCSSProperties
          }
        />
      )}
    </div>
  );
}

function BackgroundMuxVideo({
  playbackId,
  title,
  poster,
}: {
  playbackId: string;
  title?: string;
  poster?: string;
}) {
  const ref = useRef<MuxPlayerElement | null>(null);
  const [paused, setPaused] = useState(false);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
    } else {
      el.pause();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={paused ? "Video abspielen" : "Video pausieren"}
      className="group relative block h-full w-full"
    >
      <MuxPlayer
        ref={ref}
        playbackId={playbackId}
        streamType="on-demand"
        autoPlay="muted"
        loop
        muted
        playsInline
        nohotkeys
        metadata={title ? { video_title: title } : undefined}
        poster={poster}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        style={
          {
            height: "100%",
            width: "100%",
            "--controls": "none",
            "--media-object-fit": "cover",
            pointerEvents: "none",
          } as MuxPlayerCSSProperties
        }
      />
      {/* Play-Symbol nur im pausierten Zustand */}
      {paused && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/20">
          <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-signal-foreground shadow-lg ring-1 ring-black/5 transition-transform group-hover:scale-110">
            <Play className="ml-0.5 size-6 fill-current" />
          </span>
        </span>
      )}
    </button>
  );
}
