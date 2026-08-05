import {
  PortableText as BasePortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-base leading-relaxed text-foreground/90">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl font-semibold tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold tracking-tight">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-signal bg-muted/50 py-3 pl-5 text-lg italic text-foreground/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-foreground/90">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-foreground/90">
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
      return (
        <figure className="mt-8">
          <Image
            src={url}
            alt={value?.alt ?? ""}
            width={1200}
            height={675}
            className="w-full border border-border object-cover"
          />
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
