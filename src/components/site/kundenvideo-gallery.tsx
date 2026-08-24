"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { MuxVideoPlayer } from "@/components/site/mux-video-player";
import { VIDEO_BRANCHES } from "@/lib/video-branches";
import type { Kundenvideo } from "@/sanity/lib/kundenvideos";

const ALLE = "__alle__";

export function KundenvideoGallery({ videos }: { videos: Kundenvideo[] }) {
  const [query, setQuery] = useState("");
  const [branche, setBranche] = useState<string>(ALLE);

  // Nur Branchen anzeigen, zu denen es auch Videos gibt (in fester Reihenfolge).
  const branchen = useMemo(() => {
    const counts = new Map<string, number>();
    for (const v of videos) {
      if (v.industry) counts.set(v.industry, (counts.get(v.industry) ?? 0) + 1);
    }
    return VIDEO_BRANCHES.filter((b) => counts.has(b)).map((b) => ({
      name: b,
      count: counts.get(b) ?? 0,
    }));
  }, [videos]);

  const gefiltert = useMemo(() => {
    const q = query.trim().toLowerCase();
    return videos.filter((v) => {
      if (branche !== ALLE && v.industry !== branche) return false;
      if (!q) return true;
      const haystack = [v.title, v.company?.name, v.industry, v.company?.branch]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [videos, query, branche]);

  return (
    <div className="space-y-8">
      {/* Suchfeld */}
      <div className="relative max-w-md">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nach Videoname oder Firma suchen …"
          className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-base outline-none focus:border-signal focus:ring-1 focus:ring-signal"
        />
      </div>

      {/* Branchen-Filter */}
      <div className="flex flex-wrap gap-2">
        <FilterChip
          active={branche === ALLE}
          onClick={() => setBranche(ALLE)}
          label="Alle"
          count={videos.length}
        />
        {branchen.map((b) => (
          <FilterChip
            key={b.name}
            active={branche === b.name}
            onClick={() => setBranche(b.name)}
            label={b.name}
            count={b.count}
          />
        ))}
      </div>

      {/* Ergebnis-Zähler */}
      <p className="text-sm text-muted-foreground">
        {gefiltert.length}{" "}
        {gefiltert.length === 1 ? "Video" : "Videos"}
        {branche !== ALLE ? ` in „${branche}“` : ""}
        {query.trim() ? ` für „${query.trim()}“` : ""}
      </p>

      {/* Grid */}
      {gefiltert.length === 0 ? (
        <p className="rounded-lg border border-border bg-muted/40 p-6 text-center text-muted-foreground">
          Keine Videos gefunden. Filter oder Suchbegriff anpassen.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {gefiltert.map((v) => (
            <article key={v._id} className="space-y-3">
              {v.playbackId ? (
                <MuxVideoPlayer
                  playbackId={v.playbackId}
                  title={v.title}
                  aspectRatio={v.aspectRatio}
                  poster={v.posterUrl}
                />
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-xl border border-border bg-muted/40 p-4 text-center text-sm text-muted-foreground">
                  Video wird noch verarbeitet …
                </div>
              )}
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
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors " +
        (active
          ? "border-signal bg-signal text-signal-foreground"
          : "border-border bg-background text-foreground hover:border-signal/50")
      }
    >
      {label}
      <span className={active ? "ml-1.5 opacity-80" : "ml-1.5 text-muted-foreground"}>
        {count}
      </span>
    </button>
  );
}
