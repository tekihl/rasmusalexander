import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
    appType: "mpa", // ← multiple pages, not a single app
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                projects: resolve(__dirname, "projects.html"),
                outOfOffice: resolve(__dirname, "outOfOffice.html"),
                // Add other pages later if needed:
                // project: resolve(__dirname, "project.html"),
            },
        },
    },
})
