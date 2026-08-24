import { defineField, defineType } from "sanity";
import { VIDEO_BRANCHES } from "../../lib/video-branches";

// Interner Typname bleibt "muxVideo", damit bereits hochgeladene Videos
// erhalten bleiben. Angezeigt wird er als "Kundenvideo".
export const muxVideo = defineType({
  name: "muxVideo",
  title: "Kundenvideo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Videoname",
      type: "string",
      description: "Wonach im Suchfeld gefunden werden soll (z. B. Kampagne, Thema).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "company",
      title: "Firma / Kunde",
      type: "reference",
      to: [{ type: "company" }],
      description:
        "Die zugehörige Firma. Name, Logo und Branche kommen automatisch aus dem Firmen-Dokument.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "industry",
      title: "Branche (Filter-Tag)",
      type: "string",
      description: "Bestimmt, unter welchem Branchen-Filter das Video erscheint.",
      options: {
        list: VIDEO_BRANCHES.map((b) => ({ title: b, value: b })),
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "mux.video",
      description:
        "Upload läuft über Mux: echtes Streaming, adaptive Qualität, automatische Thumbnails. Nach dem Hochladen kurz warten, bis Status „ready“.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "poster",
      title: "Eigenes Vorschaubild (optional)",
      type: "image",
      description: "Leer lassen = Mux erzeugt automatisch ein Vorschaubild.",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "title",
      company: "company.name",
      industry: "industry",
      media: "poster",
    },
    prepare({ title, company, industry, media }) {
      return {
        title: title || company || "Kundenvideo",
        subtitle: [company, industry].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
