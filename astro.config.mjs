import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  redirects: {
    "/contact-information": "/contact",
    "/flip-catalogue": "/catalogues/flip/calendars",
    "/flip-catalogue-notebooks-gifts": "/catalogues/flip/notebooks-gifts",
    "/disclaimer-content-warning": "/disclaimer",
  },
});
