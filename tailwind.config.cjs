/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        crystalight: {
          primary: "#641B19",
          secondary: "#C83631",
          accent: "#1CC7B8",
          neutral: "#926863",
          "base-100": "#f2f2f2",
          info: "#42aebd",
          success: "#489380",
          warning: "#eb8014",
          error: "#e01a2e",
        },
      },
    ],
  },
};
