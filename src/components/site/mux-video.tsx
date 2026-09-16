"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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
//
// Im `preview`-Modus dient das Video selbst als „Thumbnail": die ersten
// Sekunden laufen stumm im Loop; ein Klick startet die volle Wiedergabe mit
// Ton und Steuerleiste.
export function MuxVideo({
  playbackId,
  title,
  aspect = 1.7778,
  poster,
  background = false,
  preview = false,
}: {
  playbackId?: string;
  title?: string;
  /** Seitenverhältnis als Zahl (Breite/Höhe), z. B. 1.7778 für 16:9. */
  aspect?: number;
  poster?: string;
  /** Stummer Endlos-Loop ohne Steuerleiste, Klick pausiert/startet. */
  background?: boolean;
  /** Stumme Sekunden-Vorschau im Loop; Klick startet volle Wiedergabe mit Ton. */
  preview?: boolean;
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
      ) : preview ? (
        <PreviewMuxVideo playbackId={playbackId} title={title} poster={poster} />
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

// Liest `prefers-reduced-motion` SSR-sicher als externen Store aus (Server-
// Snapshot: false), damit die Sekunden-Vorschau bei Nutzern mit reduzierter
// Bewegung nicht automatisch startet.
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

// Zeigt das Video selbst als Vorschau-Thumbnail: die ersten `previewSeconds`
// laufen stumm im Loop. Ein Klick startet die volle Wiedergabe mit Ton und
// eingeblendeter Steuerleiste. Bei `prefers-reduced-motion` bleibt die Vorschau
// stehen (Poster + Play-Button), bis geklickt wird.
function PreviewMuxVideo({
  playbackId,
  title,
  poster,
  previewSeconds = 6,
}: {
  playbackId: string;
  title?: string;
  poster?: string;
  previewSeconds?: number;
}) {
  const ref = useRef<MuxPlayerElement | null>(null);
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);
  const reduce = usePrefersReducedMotion();

  // Vorschau erst starten, wenn sie im Viewport ist (zuverlässiger als das
  // reine autoplay-Attribut und schont Bandbreite). Beim Verlassen pausieren –
  // aber nur, solange die volle Wiedergabe noch nicht gestartet wurde.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e || activeRef.current) return;
        if (e.isIntersecting) {
          el.muted = true;
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  // Solange die volle Wiedergabe nicht gestartet ist, nur die ersten Sekunden
  // wiederholen.
  const handleTimeUpdate = () => {
    const el = ref.current;
    if (!el || active) return;
    if (el.currentTime >= previewSeconds) el.currentTime = 0;
  };

  const startFull = () => {
    const el = ref.current;
    if (!el) return;
    activeRef.current = true;
    setActive(true);
    el.muted = false;
    el.currentTime = 0;
    void el.play();
  };

  return (
    <div className="group relative h-full w-full">
      <MuxPlayer
        ref={ref}
        playbackId={playbackId}
        streamType="on-demand"
        accentColor="#00c281"
        autoPlay={reduce ? false : "muted"}
        loop={!active}
        muted={!active}
        playsInline
        nohotkeys={!active}
        preload="auto"
        poster={poster}
        metadata={title ? { video_title: title } : undefined}
        onTimeUpdate={handleTimeUpdate}
        style={
          {
            height: "100%",
            width: "100%",
            "--controls": active ? undefined : "none",
            "--media-object-fit": "cover",
            pointerEvents: active ? "auto" : "none",
          } as MuxPlayerCSSProperties
        }
      />
      {/* Klickfläche mit Play-Symbol, bis die volle Wiedergabe startet */}
      {!active && (
        <button
          type="button"
          onClick={startFull}
          aria-label="Video mit Ton abspielen"
          className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-white/30 text-white shadow-lg ring-1 ring-white/40 backdrop-blur-[2px] transition-transform group-hover:scale-110 group-hover:bg-white/40">
            <Play className="ml-1 size-7 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
