"use client";

import * as React from "react";
import Image from "next/image";

/**
 * Zeigt eine der Anfrage-Animationen (animiertes WebP). Die Animation startet
 * erst, wenn die Karte in den Viewport scrollt – und je nach `index`
 * zeitversetzt, sodass die drei Animationen nacheinander loslaufen.
 */
export function SolutionAnimation({
  src,
  alt,
  index = 0,
}: {
  src: string;
  alt: string;
  index?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || started) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            const delay = reduce ? 0 : index * 600;
            window.setTimeout(() => setStarted(true), delay);
          }
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index, started]);

  return (
    <div
      ref={ref}
      className="mx-auto w-full max-w-sm"
      style={{ aspectRatio: "1080 / 312" }}
    >
      {started && (
        <Image
          src={src}
          alt={alt}
          width={1080}
          height={312}
          unoptimized
          className="h-auto w-full animate-in fade-in duration-700"
        />
      )}
    </div>
  );
}
