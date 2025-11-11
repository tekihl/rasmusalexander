import { defineType } from "sanity"

export const project = defineType({
    name: "project",
    title: "Projects",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title" },
        },
        {
            name: "description",
            title: "Description",
            type: "text",
        },
        {
            name: "media",
            title: "Media",
            type: "array",
            of: [
                // ✅ Image upload (stored on Sanity CDN)
                { type: "image", title: "Image", options: { hotspot: true } },

                // ✅ Vimeo embed
                {
                    type: "object",
                    name: "vimeoEmbed",
                    title: "Vimeo Embed",
                    fields: [
                        {
                            name: "url",
                            title: "Vimeo URL",
                            type: "url",
                            description:
                                "Paste the full Vimeo video URL (e.g. https://vimeo.com/123456789)",
                            validation: (Rule) =>
                                Rule.uri({
                                    scheme: ["http", "https"],
                                    allowRelative: false,
                                }).regex(
                                    /^https?:\/\/(www\.)?vimeo\.com\/\d+/,
                                    {
                                        name: "vimeo",
                                        invert: false,
                                    },

                                ),
                        },
                    ],
                    preview: {
                        select: { url: "url" },
                        prepare({ url }) {
                            return {
                                title: "🎬 Vimeo Embed",
                                subtitle: url,
                            }
                        },
                    },
                },
            ],
            options: { layout: "grid" },
        },
        {
            name: "date",
            title: "Date",
            type: "datetime",
        },
    ],
})
