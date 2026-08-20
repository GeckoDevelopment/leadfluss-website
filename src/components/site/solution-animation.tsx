"use client";

import * as React from "react";

/**
 * Zeigt eine der Anfrage-Animationen als stummes Autoplay-Video (MP4/WebM).
 * Video wird hardware-dekodiert und läuft dadurch auch auf schwächeren
 * Mobilgeräten flüssig – im Gegensatz zu animiertem WebP. Der Hintergrund ist
 * bereits auf die Sektionsfarbe (#f9fbfa) gerendert, sodass es nahtlos wirkt.
 *
 * Die Wiedergabe startet, sobald das Video in den Viewport scrollt, und je
 * nach `index` leicht zeitversetzt.
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
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let started = false;
    let raf = 0;

    const inView = () => {
      const h =
        window.innerHeight || document.documentElement?.clientHeight || 0;
      if (h === 0) return false;
      const r = v.getBoundingClientRect();
      return r.top < h * 0.9 && r.bottom > 0;
    };

    const start = () => {
      if (started) return;
      started = true;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const delay = reduce ? 0 : index * 500;
      window.setTimeout(() => {
        v.play?.().catch(() => {});
      }, delay);
    };

    const tick = () => {
      if (inView()) {
        start();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [index]);

  return (
    <div className="mx-auto w-full max-w-sm" style={{ aspectRatio: "600 / 174" }}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="auto"
        aria-label={alt}
        className="h-auto w-full"
      >
        <source src={`${src}.webm`} type="video/webm" />
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}
