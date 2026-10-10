import {
  PortableText as BasePortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

// Dieses Banner-Bild (Sanity-Asset) wird in Blog-Artikeln als Call-to-Action
// genutzt und soll überall auf das Anfrage-Formular verlinken. Erkennung über
// den stabilen Asset-Hash in der Bild-URL.
const ANFRAGE_CTA_IMAGE_HASH = "6f81e1cbffc43c7d32fb538e9cc369deacb30cf6";

const components: PortableTextComponents = {
  block: {
    // Fließtext: 18px (2px größer als die vorherige Basis von 16px).
    normal: ({ children }) => (
      <p className="mt-5 text-[18px] leading-relaxed text-foreground/90">
        {children}
      </p>
    ),
    // Überschriften: jeweils 3px größer (h2 24→27px, h3 20→23px).
    h2: ({ children, value }) => (
      <h2
        id={`h-${value._key}`}
        className="mt-12 scroll-mt-24 text-[27px] font-semibold tracking-tight"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={`h-${value._key}`}
        className="mt-8 scroll-mt-24 text-[23px] font-semibold tracking-tight"
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-signal bg-muted/50 py-3 pl-5 text-xl italic text-foreground/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-[18px] text-foreground/90">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-[18px] text-foreground/90">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-signal underline decoration-signal/40 underline-offset-2 hover:decoration-signal"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const url: string | undefined = value?.url;
      if (!url) return null;
      const isAnfrageCta = url.includes(ANFRAGE_CTA_IMAGE_HASH);
      const image = (
        <Image
          src={url}
          alt={value?.alt ?? ""}
          width={1200}
          height={675}
          className="w-full border border-border object-cover"
        />
      );
      return (
        <figure className="mt-8">
          {isAnfrageCta ? (
            <Link
              href="/anfrage"
              aria-label={value?.alt ?? "Zum Anfrage-Formular"}
              className="block transition-opacity hover:opacity-90"
            >
              {image}
            </Link>
          ) : (
            image
          )}
          {value?.caption && (
            <figcaption className="mt-2 text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PortableText({ value }: { value: unknown }) {
  if (!Array.isArray(value)) return null;
  return <BasePortableText value={value} components={components} />;
}
