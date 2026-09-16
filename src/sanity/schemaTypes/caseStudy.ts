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
      name: "video",
      title: "Testimonial-Video (optional)",
      type: "mux.video",
      description:
        "Upload über Mux: echtes Streaming, adaptive Qualität. Wenn gesetzt, wird in der Fallstudie das Video statt des Kundenfotos gezeigt. Nach dem Hochladen kurz warten, bis Status „ready“.",
    }),
    defineField({
      name: "image",
      title: "Kundenfoto (vor Ort)",
      type: "image",
      description:
        "Foto vom Vor-Ort-Termin mit dem Kunden. Wird gezeigt, wenn kein Video hinterlegt ist.",
      options: { hotspot: true },
    }),
    defineField({
      name: "poster",
      title: "Video-Vorschaubild (optional)",
      type: "image",
      description:
        "Nur für Videos. Leer lassen = Mux erzeugt automatisch ein Vorschaubild.",
      options: { hotspot: true },
    }),
    defineField({
      name: "videoCaption",
      title: "Text unter dem Video (optional)",
      type: "string",
      description:
        'Wird direkt unter dem Video angezeigt – z. B. "Johannes Beckert, Geschäftsführer bei Energietechnik Schermuly". Nur relevant, wenn ein Video gezeigt wird.',
    }),
    defineField({
      name: "displayMedia",
      title: "Rechts anzeigen",
      type: "string",
      description:
        "Steuert, was rechts in der Fallstudie erscheint. „Automatisch“ zeigt das Video, falls eins hochgeladen ist, sonst das Foto. Fehlt das gewählte Medium, wird automatisch das andere gezeigt.",
      options: {
        list: [
          { title: "Automatisch (Video, falls vorhanden)", value: "auto" },
          { title: "Kundenfoto", value: "image" },
          { title: "Testimonial-Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "auto",
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
