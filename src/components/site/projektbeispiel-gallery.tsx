"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProjektbeispielCard } from "@/components/site/projektbeispiel-card";
import { VIDEO_BRANCHES } from "@/lib/video-branches";
import type { Projektbeispiel } from "@/sanity/lib/projektbeispiele";

const ALLE = "__alle__";
type Typ = "alle" | "video" | "grafik";

const istGrafik = (v: Projektbeispiel) => v.mediaType === "grafik";

export function ProjektbeispielGallery({ items }: { items: Projektbeispiel[] }) {
  const [query, setQuery] = useState("");
  const [branche, setBranche] = useState<string>(ALLE);
  const [typ, setTyp] = useState<Typ>("alle");

  const typCounts = useMemo(() => {
    const grafiken = items.filter(istGrafik).length;
    return { alle: items.length, video: items.length - grafiken, grafik: grafiken };
  }, [items]);

  // Nach Medientyp vorfiltern – Branchen-Chips richten sich danach.
  const nachTyp = useMemo(() => {
    if (typ === "grafik") return items.filter(istGrafik);
    if (typ === "video") return items.filter((v) => !istGrafik(v));
    return items;
  }, [items, typ]);

  // Nur Branchen anzeigen, zu denen es auch Beispiele gibt (in fester Reihenfolge).
  const branchen = useMemo(() => {
    const counts = new Map<string, number>();
    for (const v of nachTyp) {
      if (v.industry) counts.set(v.industry, (counts.get(v.industry) ?? 0) + 1);
    }
    return VIDEO_BRANCHES.filter((b) => counts.has(b)).map((b) => ({
      name: b,
      count: counts.get(b) ?? 0,
    }));
  }, [nachTyp]);

  const gefiltert = useMemo(() => {
    const q = query.trim().toLowerCase();
    return nachTyp.filter((v) => {
      if (branche !== ALLE && v.industry !== branche) return false;
      if (!q) return true;
      const haystack = [v.title, v.company?.name, v.industry, v.company?.branch]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [nachTyp, query, branche]);

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
          placeholder="Nach Titel oder Firma suchen …"
          className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-base outline-none focus:border-signal focus:ring-1 focus:ring-signal"
        />
      </div>

      {/* Typ-Filter: Alle / Videos / Grafiken */}
      <div className="flex flex-wrap gap-2">
        <FilterChip active={typ === "alle"} onClick={() => setTyp("alle")} label="Alle" count={typCounts.alle} />
        <FilterChip active={typ === "video"} onClick={() => setTyp("video")} label="Videos" count={typCounts.video} />
        <FilterChip active={typ === "grafik"} onClick={() => setTyp("grafik")} label="Grafiken" count={typCounts.grafik} />
      </div>

      {/* Branchen-Filter */}
      <div className="flex flex-wrap gap-2">
        <FilterChip
          active={branche === ALLE}
          onClick={() => setBranche(ALLE)}
          label="Alle Branchen"
          count={nachTyp.length}
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
        {gefiltert.length === 1 ? "Beispiel" : "Beispiele"}
        {branche !== ALLE ? ` in „${branche}“` : ""}
        {query.trim() ? ` für „${query.trim()}“` : ""}
      </p>

      {/* Grid */}
      {gefiltert.length === 0 ? (
        <p className="rounded-lg border border-border bg-muted/40 p-6 text-center text-muted-foreground">
          Keine Beispiele gefunden. Filter oder Suchbegriff anpassen.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {gefiltert.map((v) => (
            <ProjektbeispielCard key={v._id} item={v} />
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
