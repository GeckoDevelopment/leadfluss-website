import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Fallstudie",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Firma",
      type: "reference",
      to: [{ type: "company" }],
      description: "Die Firma/Kunde dieser Fallstudie (Name, Logo, Branche, Ort).",
      validation: (rule) => rule.required(),
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
      title: "Beschreibung der Zusammenarbeit",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Kundenfoto (vor Ort)",
      type: "image",
      description: "Foto vom Vor-Ort-Termin mit dem Kunden.",
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
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "company.name", subtitle: "result", media: "image" },
  },
});
