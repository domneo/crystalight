const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
    },
    fontFamily: {
      display: ["Cormorant"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        crystalight: {
          primary: "#C83631",
          secondary: "#641B19",
          accent: "#C8EFE9",
          neutral: "#876B6B",
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
