import { defineType } from "sanity"

export const outOfOffice = defineType({
  name: "outOfOffice",
  title: "Out of Office",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "media",
      title: "Media",
      type: "array",
      of: [
        { type: "image", options: { hotspot: true } },
        { type: "file", title: "Video File" },
      ],
    },
    {
      name: "caption",
      title: "Caption",
      type: "text",
    },
  ],
})
