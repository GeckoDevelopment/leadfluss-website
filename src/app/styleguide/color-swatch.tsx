"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";

function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      /* Clipboard nicht verfügbar */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={`${value} kopieren`}
      className="group flex w-full items-center justify-between gap-2 border border-border bg-muted/40 px-2 py-1 text-left transition-colors hover:border-signal"
    >
      <code className="text-xs text-muted-foreground">{value}</code>
      {copied ? (
        <Check className="size-3.5 text-signal" />
      ) : (
        <Copy className="size-3.5 text-muted-foreground group-hover:text-signal" />
      )}
    </button>
  );
}

export function ColorSwatch({
  name,
  token,
  hex,
  cls,
  fg,
  border,
}: {
  name: string;
  token: string;
  hex?: string;
  cls: string;
  fg: string;
  border?: boolean;
}) {
  return (
    <div className="border border-border bg-card">
      <div
        className={`${cls} ${fg} flex h-20 items-end p-3 ${border ? "border-b border-border" : ""}`}
      />
      <div className="space-y-1.5 p-3">
        <div className="text-sm font-semibold">{name}</div>
        {hex && <CopyValue value={hex} />}
        <CopyValue value={token} />
      </div>
    </div>
  );
}
