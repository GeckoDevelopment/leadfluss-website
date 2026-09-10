"use client";

import { useRef, useState } from "react";
import MuxPlayer, { type MuxPlayerCSSProperties } from "@mux/mux-player-react";
import type MuxPlayerElement from "@mux/mux-player";
import { Play } from "lucide-react";
import type { Projektbeispiel } from "@/sanity/lib/projektbeispiele";

// Alle Kacheln teilen sich ein einheitliches Hochkant-Format (9:16), damit die
// Reihe unabhängig vom Quellformat der einzelnen Videos gleichmäßig aussieht.
// Abweichende Formate werden per `object-cover` mittig beschnitten.
const TILE_ASPECT = "9 / 16";

/**
 * Endlos-Slider der kuratierten Kurzvideos. Die Videos fahren als
 * nahtloses Marquee von links nach rechts; sobald der Cursor über der
 * Sektion liegt, bleibt der Lauf stehen und setzt beim Verlassen fort.
 * Jedes Video läuft stumm im Loop ohne Bedienleiste; ein Klick pausiert
 * bzw. startet die Wiedergabe.
 */
export function HomeVideoShowcase({ items }: { items: Projektbeispiel[] }) {
  if (items.length === 0) return null;

  // Track verdoppeln, damit die Verschiebung um 50 % nahtlos zur zweiten
  // Kopie überblendet. Tempo skaliert mit der Anzahl, damit die
  // Laufgeschwindigkeit unabhängig von der Videoanzahl konstant wirkt.
  const loop = [...items, ...items];
  const durationSec = Math.max(24, items.length * 7);

  return (
    <div className="group relative overflow-hidden">
      {/* Weiche Ränder, damit die Videos an den Kanten aus-/einblenden. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent sm:w-20" />
      <div
        className="flex w-max animate-[lf-marquee_var(--marquee-dur)_linear_infinite_reverse] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ "--marquee-dur": `${durationSec}s` } as React.CSSProperties}
      >
        {loop.map((v, i) => (
          <ShowcaseCard
            key={`${v._id}-${i}`}
            item={v}
            duplicate={i >= items.length}
          />
        ))}
      </div>
    </div>
  );
}

function ShowcaseCard({
  item: v,
  duplicate = false,
}: {
  item: Projektbeispiel;
  duplicate?: boolean;
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
    <article
      aria-hidden={duplicate || undefined}
      className="mr-4 w-48 shrink-0 space-y-3 sm:mr-5 sm:w-56"
    >
      <div
        className="overflow-hidden rounded-xl border border-border bg-black"
        style={{ aspectRatio: TILE_ASPECT }}
      >
        {!v.playbackId ? (
          <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
            Video wird noch verarbeitet …
          </div>
        ) : (
          <button
            type="button"
            onClick={toggle}
            tabIndex={duplicate ? -1 : undefined}
            aria-label={
              paused
                ? `Video „${v.title}“ abspielen`
                : `Video „${v.title}“ pausieren`
            }
            className="group/card relative block h-full w-full"
          >
            <MuxPlayer
              ref={ref}
              playbackId={v.playbackId}
              streamType="on-demand"
              autoPlay="muted"
              loop
              muted
              playsInline
              nohotkeys
              metadata={{ video_title: v.title }}
              poster={v.posterUrl}
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
                <span className="flex size-12 items-center justify-center rounded-full bg-white/90 text-signal-foreground shadow-lg ring-1 ring-black/5 transition-transform group-hover/card:scale-110">
                  <Play className="ml-0.5 size-5 fill-current" />
                </span>
              </span>
            )}
          </button>
        )}
      </div>

      {v.company?.logoUrl ? (
        <div className="flex h-12 items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={v.company.logoUrl}
            alt={v.company?.name ? `Logo ${v.company.name}` : ""}
            loading="lazy"
            className="max-h-12 w-auto max-w-[85%] object-contain"
          />
        </div>
      ) : (
        v.company?.name && (
          <p className="truncate text-center text-sm text-muted-foreground">
            {v.company.name}
          </p>
        )
      )}
    </article>
  );
}
