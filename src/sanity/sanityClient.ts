import { createClient } from "@sanity/client"

export const client = createClient({
  projectId: "880t31nt",   // ← your Sanity project ID
  dataset: "production",   // ← your dataset
  apiVersion: "2025-01-01", // ← use today’s date or the latest version
  useCdn: true,             // true = faster, cached reads (perfect for public data)
})
