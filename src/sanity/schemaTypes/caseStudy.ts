import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Fallstudie",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Kunde / Firma",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Kurzbeschreibung des Betriebs",
      type: "string",
      description: 'z. B. "Regionaler Solarfachbetrieb"',
    }),
    defineField({
      name: "branch",
      title: "Branche",
      type: "string",
      description: 'z. B. "Photovoltaik"',
    }),
    defineField({
      name: "location",
      title: "Ort / Region",
      type: "string",
    }),
    defineField({
      name: "result",
      title: "Ergebnis (Kennzahl)",
      type: "string",
      description: 'z. B. "50+ Leads pro Monat"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Beschreibung",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "logo",
      title: "Logo (optional)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
      description: "Kleiner = weiter vorne.",
    }),
  ],
  orderings: [
    {
      title: "Reihenfolge",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "result", media: "logo" },
  },
});
