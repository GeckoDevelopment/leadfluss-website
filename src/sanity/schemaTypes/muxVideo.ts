import { defineField, defineType } from "sanity";
import { VIDEO_BRANCHES } from "../../lib/video-branches";

// Interner Typname bleibt "muxVideo", damit bereits hochgeladene Videos
// erhalten bleiben. Angezeigt wird er als "Projektbeispiel" – ein Beispiel
// kann entweder ein Video (über Mux) ODER eine Grafik/Foto sein.
export const muxVideo = defineType({
  name: "muxVideo",
  title: "Projektbeispiel",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
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
      name: "industries",
      title: "Branchen (Filter-Tags)",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Eine oder mehrere Branchen. Das Beispiel erscheint unter jedem gewählten Branchen-Filter (z. B. Photovoltaik + Wärmepumpe).",
      options: {
        list: VIDEO_BRANCHES.map((b) => ({ title: b, value: b })),
      },
      validation: (rule) =>
        rule.required().min(1).unique().error("Bitte mindestens eine Branche wählen."),
    }),
    defineField({
      name: "mediaType",
      title: "Medientyp",
      type: "string",
      description: "Bestimmt, ob dieses Beispiel ein Video oder eine Grafik/Foto ist.",
      options: {
        list: [
          { title: "Video", value: "video" },
          { title: "Grafik / Foto", value: "grafik" },
        ],
        layout: "radio",
      },
      initialValue: "video",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "videoFormat",
      title: "Videoformat",
      type: "string",
      description: "Um welche Art von Video handelt es sich?",
      options: {
        list: [
          { title: "Kundenstimmen-Video", value: "kundenstimme" },
          { title: "Projektpräsentation", value: "projektpraesentation" },
          { title: "Firmenvorstellung", value: "firmenvorstellung" },
        ],
        layout: "radio",
      },
      hidden: ({ parent }) => parent?.mediaType !== "video",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { mediaType?: string } | undefined;
          if (parent?.mediaType === "video" && !value) {
            return "Bitte ein Videoformat wählen.";
          }
          return true;
        }),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "mux.video",
      description:
        "Upload läuft über Mux: echtes Streaming, adaptive Qualität, automatische Thumbnails. Nach dem Hochladen kurz warten, bis Status „ready“.",
      hidden: ({ parent }) => parent?.mediaType !== "video",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { mediaType?: string } | undefined;
          if (parent?.mediaType === "video" && !value) {
            return "Bitte ein Video hochladen.";
          }
          return true;
        }),
    }),
    defineField({
      name: "image",
      title: "Grafik / Foto",
      type: "image",
      description:
        "Werbegrafik oder Foto. Wird in der Galerie als Vorschau gezeigt und öffnet sich beim Klick groß.",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== "grafik",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { mediaType?: string } | undefined;
          if (parent?.mediaType === "grafik" && !value) {
            return "Bitte eine Grafik / ein Foto hochladen.";
          }
          return true;
        }),
    }),
    defineField({
      name: "poster",
      title: "Eigenes Vorschaubild (optional)",
      type: "image",
      description: "Nur für Videos. Leer lassen = Mux erzeugt automatisch ein Vorschaubild.",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
  ],
  preview: {
    select: {
      title: "title",
      company: "company.name",
      industries: "industries",
      industry: "industry",
      mediaType: "mediaType",
      poster: "poster",
      image: "image",
    },
    prepare({ title, company, industries, industry, mediaType, poster, image }) {
      const typLabel = mediaType === "grafik" ? "Grafik" : "Video";
      const branchen =
        Array.isArray(industries) && industries.length > 0
          ? industries.join(", ")
          : industry;
      return {
        title: title || company || "Projektbeispiel",
        subtitle: [company, branchen, typLabel].filter(Boolean).join(" · "),
        media: mediaType === "grafik" ? image : poster || image,
      };
    },
  },
});
