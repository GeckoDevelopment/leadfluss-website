"use client";

import MuxPlayer from "@mux/mux-player-react";

export function MuxVideoPlayer({
  playbackId,
  title,
  aspectRatio,
  poster,
}: {
  playbackId: string;
  title?: string;
  /** Seitenverhältnis von Mux, z. B. "9:16" oder "16:9". */
  aspectRatio?: string;
  poster?: string;
}) {
  // Mux liefert "9:16"; CSS erwartet "9 / 16".
  const ratio = aspectRatio?.replace(":", " / ") ?? "16 / 9";
  const isPortrait = (() => {
    const [w, h] = (aspectRatio ?? "16:9").split(":").map(Number);
    return w && h ? h > w : false;
  })();

  return (
    <div
      className="mx-auto overflow-hidden rounded-xl border border-border bg-black"
      style={{ aspectRatio: ratio, maxWidth: isPortrait ? "360px" : "100%" }}
    >
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        accentColor="#00c281"
        metadata={{ video_title: title }}
        poster={poster}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
