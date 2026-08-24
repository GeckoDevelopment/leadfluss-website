"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Building2, ChevronDown, Search } from "lucide-react";
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
  const [firmen, setFirmen] = useState<string[]>([]);

  const q = query.trim().toLowerCase();

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

  const matchSuche = (v: Projektbeispiel) => {
    if (!q) return true;
    const haystack = [v.title, v.company?.name, v.industry, v.company?.branch]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  };

  // Basis für Firmen-Optionen: Typ + Branche + Suche (aber ohne Firmen-Filter),
  // damit das Dropdown die jeweils passenden Firmen mit Anzahl zeigt.
  const firmenBasis = useMemo(
    () => nachTyp.filter((v) => (branche === ALLE || v.industry === branche) && matchSuche(v)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nachTyp, branche, q],
  );

  const firmenOptionen = useMemo(() => {
    const counts = new Map<string, number>();
    for (const v of firmenBasis) {
      const n = v.company?.name;
      if (n) counts.set(n, (counts.get(n) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name, "de"));
  }, [firmenBasis]);

  const gefiltert = useMemo(
    () =>
      firmenBasis.filter(
        (v) => firmen.length === 0 || (v.company?.name != null && firmen.includes(v.company.name)),
      ),
    [firmenBasis, firmen],
  );

  const toggleFirma = (name: string) =>
    setFirmen((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  return (
    <div className="space-y-8">
      {/* Suche + Firmen-Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-md">
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
        <FirmenDropdown
          optionen={firmenOptionen}
          selected={firmen}
          onToggle={toggleFirma}
          onReset={() => setFirmen([])}
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
        {firmen.length > 0 ? ` · ${firmen.length === 1 ? "1 Firma" : `${firmen.length} Firmen`}` : ""}
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

function FirmenDropdown({
  optionen,
  selected,
  onToggle,
  onReset,
}: {
  optionen: { name: string; count: number }[];
  selected: string[];
  onToggle: (name: string) => void;
  onReset: () => void;
}) {
  const [offen, setOffen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!offen) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOffen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOffen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [offen]);

  const aktiv = selected.length > 0;
  const label = !aktiv
    ? "Alle Firmen"
    : selected.length === 1
      ? "1 Firma"
      : `${selected.length} Firmen`;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOffen((o) => !o)}
        aria-expanded={offen}
        aria-haspopup="listbox"
        className={
          "flex w-full items-center gap-2 rounded-lg border bg-background py-2.5 pl-3 pr-2.5 text-base transition-colors sm:w-auto " +
          (aktiv ? "border-signal text-foreground" : "border-border text-foreground hover:border-signal/50")
        }
      >
        <Building2 aria-hidden className="size-5 text-muted-foreground" />
        <span className="whitespace-nowrap">{label}</span>
        <ChevronDown
          aria-hidden
          className={"size-4 text-muted-foreground transition-transform " + (offen ? "rotate-180" : "")}
        />
      </button>

      {offen && (
        <div className="absolute right-0 z-20 mt-2 w-72 max-w-[85vw] rounded-lg border border-border bg-background p-2 shadow-lg">
          <div className="max-h-64 overflow-auto">
            {optionen.length === 0 ? (
              <p className="px-2 py-1.5 text-sm text-muted-foreground">Keine Firmen verfügbar.</p>
            ) : (
              optionen.map((o) => (
                <label
                  key={o.name}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(o.name)}
                    onChange={() => onToggle(o.name)}
                    className="size-4 accent-signal"
                  />
                  <span className="flex-1 truncate">{o.name}</span>
                  <span className="text-xs text-muted-foreground">{o.count}</span>
                </label>
              ))
            )}
          </div>
          {aktiv && (
            <button
              type="button"
              onClick={onReset}
              className="mt-1 w-full rounded-md px-2 py-1.5 text-left text-sm font-medium text-signal hover:bg-muted"
            >
              Auswahl zurücksetzen
            </button>
          )}
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
