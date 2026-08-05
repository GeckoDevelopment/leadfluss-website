import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog-Artikel",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-Kürzel",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Anrisstext",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: "coverImage",
      title: "Titelbild",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternativtext",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Rubrik",
      type: "string",
      options: {
        list: [
          "Leadgenerierung",
          "Performance-Marketing",
          "Handwerk",
          "Case Study",
          "Insights",
        ],
      },
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "string",
    }),
    defineField({
      name: "authorImage",
      title: "Autor-Bild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "readingTime",
      title: "Lesezeit (Minuten)",
      type: "number",
    }),
    defineField({
      name: "body",
      title: "Inhalt",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Absatz", value: "normal" },
            { title: "Überschrift 2", value: "h2" },
            { title: "Überschrift 3", value: "h3" },
            { title: "Zitat", value: "blockquote" },
          ],
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) =>
                      rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alternativtext", type: "string" }),
            defineField({ name: "caption", title: "Bildunterschrift", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Veröffentlicht am",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO-Beschreibung",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
  ],
  orderings: [
    {
      title: "Veröffentlicht (neueste zuerst)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
