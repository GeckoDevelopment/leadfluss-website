"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MuxVideo } from "@/components/site/mux-video";
import type { Projektbeispiel } from "@/sanity/lib/projektbeispiele";

// Mux-Seitenverhältnis "b:h" → Zahl b/h. Ohne Angabe Hochkant 9:16.
function aspectOf(ratio?: string): number {
  if (ratio) {
    const [w, h] = ratio.split(":").map(Number);
    if (w && h) return w / h;
  }
  return 9 / 16;
}

const ARROW =
  "flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-foreground shadow-lg ring-1 ring-black/10 transition hover:scale-105";

/**
 * Endloses Coverflow-Karussell für die Referenz-Videos einer Firma. Immer nur
 * das mittlere Video ist voll sichtbar und abspielbar (stumme Vorschau, Klick
 * startet mit Ton); links und rechts ragen die Nachbar-Videos leicht (weich
 * ausgeblendet) herein. Über die Pfeile rückt das jeweils nächste Video in die
 * Mitte – rundherum ohne Anfang/Ende.
 *
 * Technik: Die Liste wird dreifach gerendert; `active` startet in der mittleren
 * Kopie. Läuft `active` beim Blättern in eine Rand-Kopie, springt es nach der
 * Animation unsichtbar (ohne Transition) um eine Kopienlänge zurück. Breiten
 * und Verschiebung basieren auf Container-Query-Einheiten (`cqw`).
 */
export function ReferenceCarousel({
  videos,
  maxWidth = 450,
}: {
  videos: Projektbeispiel[];
  /** Maximale Breite des Karussells in px (Standard 450). */
  maxWidth?: number;
}) {
  const n = videos.length;
  const [active, setActive] = useState(n); // Start in der mittleren Kopie
  const [animate, setAnimate] = useState(true);

  if (n === 0) return null;

  const renderMedia = (v: Projektbeispiel, isActive: boolean) => {
    const aspect = aspectOf(v.aspectRatio);
    const thumb =
      v.posterUrl ??
      (v.playbackId
        ? `https://image.mux.com/${v.playbackId}/thumbnail.webp?width=640&time=1`
        : undefined);
    return (
      <div className="overflow-hidden rounded-2xl">
        {isActive && v.playbackId ? (
          <MuxVideo
            playbackId={v.playbackId}
            title={v.title}
            aspect={aspect}
            poster={v.posterUrl}
            preview
          />
        ) : (
          <div className="bg-black" style={{ aspectRatio: aspect }}>
            {thumb && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumb}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            )}
          </div>
        )}
      </div>
    );
  };

  // Einzelvideo: kein Karussell nötig.
  if (n === 1) {
    return (
      <div className="mx-auto max-w-[300px]">{renderMedia(videos[0], true)}</div>
    );
  }

  const display = [...videos, ...videos, ...videos];

  // Nach der Animation unsichtbar in die mittlere Kopie zurückspringen.
  const handleTransitionEnd = () => {
    if (active >= n && active < 2 * n) return;
    const wrapped = active < n ? active + n : active - n;
    setAnimate(false);
    setActive(wrapped);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true)),
    );
  };

  return (
    <div
      className="mx-auto flex items-center gap-1.5 sm:gap-2"
      style={{ maxWidth }}
    >
      <button
        type="button"
        onClick={() => setActive((a) => a - 1)}
        aria-label="Vorheriges Video"
        className={ARROW}
      >
        <ChevronLeft className="size-5" />
      </button>

      <div className="relative w-full overflow-hidden [container-type:inline-size]">
        {/* Fade-Ränder: die seitlich angedeuteten Videos blenden weich aus. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent" />
        <div
          className={`flex ${animate ? "transition-transform duration-500 ease-out" : ""}`}
          style={{
            transform: `translateX(calc(50cqw - (${active} + 0.5) * 74cqw))`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {display.map((v, i) => (
            <div
              key={i}
              className="w-[74cqw] shrink-0 px-1.5"
              aria-hidden={i !== active}
            >
              <div
                className={`transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-40"
                }`}
              >
                {renderMedia(v, i === active)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setActive((a) => a + 1)}
        aria-label="Nächstes Video"
        className={ARROW}
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
