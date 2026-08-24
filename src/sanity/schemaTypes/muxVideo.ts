import { defineField, defineType } from "sanity";

export const muxVideo = defineType({
  name: "muxVideo",
  title: "Video (Mux)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "mux.video",
      description:
        "Upload läuft über Mux: echtes Streaming, adaptive Qualität, automatische Thumbnails. Nach dem Hochladen kurz warten, bis Mux fertig verarbeitet hat (Status „ready“).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "poster",
      title: "Eigenes Vorschaubild (optional)",
      type: "image",
      description:
        "Leer lassen = Mux erzeugt automatisch ein Vorschaubild aus dem Video.",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", media: "poster" },
  },
});
