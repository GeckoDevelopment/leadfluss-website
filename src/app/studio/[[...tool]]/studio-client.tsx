"use client";

import dynamic from "next/dynamic";

// ssr: false -> Studio wird nur im Browser geladen.
const StudioInner = dynamic(() => import("./studio-inner"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
      Studio wird geladen…
    </div>
  ),
});

export function Studio() {
  return <StudioInner />;
}
