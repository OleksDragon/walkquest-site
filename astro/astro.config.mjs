import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://walkquest.site",
  output: "static",
  build: {
    format: "file",
  },
});
