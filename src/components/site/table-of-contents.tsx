"use client";

import { useEffect, useState } from "react";

export type TocHeading = { id: string; text: string; level: number };

// Schwebendes Inhaltsverzeichnis für Blogartikel. Wird von der Detailseite in
// eine sticky-Spalte rechts neben dem Text gesetzt und hebt per Scroll-Spy den
// Abschnitt hervor, den man gerade liest.
export function TableOfContents({
  headings,
  className,
}: {
  headings: TocHeading[];
  className?: string;
}) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const onScroll = () => {
      // Aktiv = letzte Überschrift, deren Oberkante über der Lesezone (knapp
      // unter der Navbar) liegt.
      let current = headings[0]?.id ?? null;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= 120) current = el.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Inhaltsverzeichnis" className={className}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Inhalt
      </p>
      <ul className="border-l border-border">
        {headings.map((h) => {
          const isActive = active === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(h.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                    history.replaceState(null, "", `#${h.id}`);
                  }
                }}
                className={[
                  "-ml-px block border-l-2 py-1 text-sm leading-snug transition-colors",
                  h.level === 3 ? "pl-6" : "pl-4",
                  isActive
                    ? "border-signal font-medium text-signal"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                ].join(" ")}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
