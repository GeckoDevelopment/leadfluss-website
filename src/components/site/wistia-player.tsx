"use client";

import { createElement } from "react";
import Script from "next/script";

// Bindet einen Wistia-Videoplayer als Web-Component ein.
// Das <wistia-player>-Element wird von `player.js` definiert, die
// medienspezifische `embed/<id>.js` liefert die Videodaten. Solange die
// Component noch nicht registriert ist (`:not(:defined)`), zeigt das per
// Inline-Style hinterlegte Swatch-Bild als unscharfe Vorschau – so entsteht
// kein Layout-Shift.
export function WistiaPlayer({
  mediaId,
  aspect = 1.7778,
  swatchPadding = "56.25%",
}: {
  mediaId: string;
  aspect?: number;
  swatchPadding?: string;
}) {
  return (
    <div className="overflow-hidden border border-border bg-muted">
      <style
        dangerouslySetInnerHTML={{
          __html: `wistia-player[media-id='${mediaId}']:not(:defined){background:center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');display:block;filter:blur(5px);padding-top:${swatchPadding};}`,
        }}
      />
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script
        src={`https://fast.wistia.com/embed/${mediaId}.js`}
        strategy="afterInteractive"
        type="module"
      />
      {createElement("wistia-player", {
        "media-id": mediaId,
        aspect: String(aspect),
      })}
    </div>
  );
}
