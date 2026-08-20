import { defineField, defineType } from "sanity";

// Firma / Kunde – wiederverwendbar (Fallstudien, Logo-Übersicht, o. Ä.).
export const company = defineType({
  name: "company",
  title: "Firma / Kunde",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Firmenname",
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
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "logoOverview",
      title: "Logo für Startseiten-Übersicht",
      type: "image",
      description:
        "Alternative Logo-Variante für die große Logo-Übersicht auf der Startseite (z. B. einfarbig/dunkel, gut auf hellem Hintergrund erkennbar).",
      options: { hotspot: true },
    }),
    defineField({
      name: "website",
      title: "Website (optional)",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "branch", media: "logo" },
  },
});
