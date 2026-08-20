"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

// Einzelne Inhaltsblöcke, die beim Scrollen nacheinander erscheinen sollen –
// nicht die ganze Sektion, sondern Überschriften, Texte, Bilder, Karten,
// Formulare und Grid-/Listen-Elemente.
const DEFAULT_SELECTOR = [
  "main section h2",
  "main section h3",
  "main section p",
  "main section img",
  "main section article",
  "main section form",
  "main section ul > li",
  "main section [class*='grid'] > *",
].join(", ");

/**
 * Blendet einzelne Inhaltsblöcke beim Herunterscrollen nach und nach ein
 * (Fade + leichtes Hochschieben, 0,7s), Geschwister leicht zeitversetzt.
 *
 * Umgesetzt über eine requestAnimationFrame-Schleife (Positions-Polling), weil
 * in eingebetteten Vorschau-Umgebungen weder scroll-Events noch der
 * IntersectionObserver zuverlässig feuern – getBoundingClientRect stimmt
 * dagegen überall. Die Schleife läuft nur so lange, bis alle Elemente sichtbar
 * sind, und wird bei jedem Seitenwechsel neu gestartet.
 */
export function ScrollReveal({
  selector = DEFAULT_SELECTOR,
}: {
  selector?: string;
}) {
  const pathname = usePathname();

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const reveal = (el: Element) => el.classList.add("lf-revealed");

    // Zielelemente sammeln und verschachtelte Treffer entfernen: Wenn eine
    // Karte (article/grid-child) selbst animiert wird, sollen ihre inneren
    // Texte nicht zusätzlich einzeln animiert werden.
    const all = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const allSet = new Set<Element>(all);
    const isNested = (el: Element) => {
      let p = el.parentElement;
      while (p) {
        if (allSet.has(p)) return true;
        p = p.parentElement;
      }
      return false;
    };
    const els = all.filter(
      (el) => !isNested(el) && !el.closest("[data-no-reveal]"),
    );
    if (els.length === 0) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      els.forEach((el) => {
        el.setAttribute("data-reveal", "");
        reveal(el);
      });
      return;
    }

    // Geschwister leicht versetzt einblenden (Stagger).
    const perParent = new Map<Element | null, number>();
    els.forEach((el) => {
      el.setAttribute("data-reveal", "");
      const parent = el.parentElement;
      const i = perParent.get(parent) ?? 0;
      perParent.set(parent, i + 1);
      if (i > 0) {
        el.style.transitionDelay = `${Math.min(i * 70, 350)}ms`;
      }
    });

    const viewportHeight = () =>
      window.innerHeight ||
      document.documentElement?.clientHeight ||
      window.visualViewport?.height ||
      0;

    const inView = (el: Element, h: number) => {
      const rect = el.getBoundingClientRect();
      return rect.top < h * 0.92 && rect.bottom > 0;
    };

    // Bereits sichtbare Elemente sofort zeigen (kein Flackern beim Laden).
    let pending = els.slice();
    const h0 = viewportHeight();
    if (h0 > 0) {
      pending = pending.filter((el) => {
        if (inView(el, h0)) {
          reveal(el);
          return false;
        }
        return true;
      });
    }

    let raf = 0;
    let noViewportFrames = 0;

    const tick = () => {
      const h = viewportHeight();
      if (h === 0) {
        if (++noViewportFrames > 60) {
          pending.forEach(reveal);
          pending = [];
          return;
        }
        raf = requestAnimationFrame(tick);
        return;
      }
      noViewportFrames = 0;

      pending = pending.filter((el) => {
        if (inView(el, h)) {
          reveal(el);
          return false;
        }
        return true;
      });
      if (pending.length > 0) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [pathname, selector]);

  return null;
}
