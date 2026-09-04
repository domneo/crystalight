# Crystalight Printcraft

The website for a supplier of calendars, diaries, and corporate gifts.

It's a static [Astro](https://astro.build) site that pulls its catalogue content from a headless WordPress backend at build time and renders each catalogue as either an embedded PDF or a flipbook.

## Stack

- **[Astro 2](https://astro.build)** — static site generation, `.astro` components
- **[Tailwind CSS](https://tailwindcss.com)** + **[daisyUI](https://daisyui.com)** — styling, with a custom `crystalight` theme in `tailwind.config.cjs`
- **WordPress REST API** — catalogue content
- **[PDF.js](https://mozilla.github.io/pdf.js/)** — vendored under `public/pdfjs`, serves the PDF catalogue viewer
- **pnpm** — package manager (`pnpm-lock.yaml`)

## Getting started

```sh
pnpm install
cp .env-sample .env   # then fill in the values below
pnpm dev              # http://localhost:3000
```

### Environment variables

| Variable                     | Purpose                                             |
| :--------------------------- | :-------------------------------------------------- |
| `PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps Embed API key for the map on `/contact` |
| `WP_USERNAME`                | WordPress user for the REST API (Basic auth)        |
| `WP_PASSWORD`                | WordPress application password for that user        |

The WordPress credentials are only used at build time, in `src/services/wpService.ts`. Without them the catalogue endpoints return nothing and the homepage builds empty.

## Commands

All commands are run from the root of the project:

| Command          | Action                                                       |
| :--------------- | :----------------------------------------------------------- |
| `pnpm install`   | Install dependencies                                         |
| `pnpm dev`       | Start the dev server at `localhost:3000`                     |
| `pnpm build`     | Build the production site to `./dist/`                       |
| `pnpm preview`   | Preview the production build locally                         |
| `pnpm prettier`  | Format all files (includes `.astro` via the Prettier plugin) |
| `pnpm astro ...` | Run Astro CLI commands, e.g. `astro add`, `astro check`      |

## Project structure

```
public/            Banners, icons, logos, and the vendored PDF.js viewer
src/
├── archive/       Archived pages
├── components/    Header, Footer, Hero carousel, catalogue cards
├── layouts/
│   └── Layout.astro       Shared shell — meta tags, fonts, header/footer
├── pages/
│   ├── index.astro        Homepage: hero + main and small catalogues
│   ├── about.astro
│   ├── contact.astro      Contact details + Google Maps embed
│   ├── disclaimer.astro
│   └── catalogues/
│       ├── pdf/[id].astro     PDF.js viewer, one route per PDF media ID
│       └── flip/[slug].astro  Flipbook iframe, one route per slug
├── services/
│   └── wpService.ts       WordPress REST API client
└── utils/
    ├── generateCatalogueData.ts  Resolves a catalogue to its preview image + URL
    └── headerNavigation.ts       Header nav items
```

## How catalogues work

Catalogues live in WordPress as two custom post types — `catalogue_main` (featured, shown large on the homepage) and `catalogue_small` (grouped by `catalogue-category` taxonomy). Each carries ACF fields describing its format:

- **`pdf`** — `pdf_file` is a media ID. The build resolves it to a source URL and generates `/catalogues/pdf/<id>`, which loads it in the bundled PDF.js viewer.
- **`flipbook`** — `flipbook_id` and `slug` generate `/catalogues/flip/<slug>`, which iframes the flipBook hosted on the WordPress server.

Preview images come from the `image_pdf` / `image_flipbook` fields. A flipbook with no preview falls back to its first page; anything still missing falls back to `public/catalogue_placeholder.svg`.

Because everything is fetched in `getStaticPaths` and page frontmatter, **adding or changing a catalogue in WordPress requires a rebuild** for it to appear on the site.
