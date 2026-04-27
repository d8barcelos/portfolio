# diogo.dev — portfolio

Personal portfolio for Diogo Barcelos. A single-page site with real depth
hiding behind it: command palette, terminal mode with a working shell,
custom GitHub heatmap, MDX case studies, `/uses` page, vim-flavoured
keyboard nav, and a set of quiet easter eggs.

Live: https://diogobarcelos.dev _(replace once deployed)_

---

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **TailwindCSS** with amber accent over a zinc base
- **shadcn-style** primitives + **Radix Dialog** + **cmdk**
- **Framer Motion** for scoped, choreographed animations
- **MDX** for case studies (`rehype-pretty-code` + `remark-gfm`)
- **Lucide Icons**
- **Geist Sans** + **Geist Mono** (subsetted via `geist/font`)
- Deployed on **Vercel** (edge-cached GitHub fetch, Vercel OG for social images)

## Quick start

```bash
pnpm install
pnpm dev
```

The site runs at `http://localhost:3000`.

### Environment

Copy `.env.example` to `.env.local` and fill what you need. Everything is
optional — without any env vars, the GitHub heatmap falls back to a
placeholder (see `src/lib/github.ts`) and the site otherwise runs fully.

```bash
GITHUB_TOKEN=              # fine-grained PAT with public read
NEXT_PUBLIC_GITHUB_USERNAME=d8barcelos
NEXT_PUBLIC_SITE_URL=https://diogobarcelos.dev
# SPOTIFY_* — reserved for v2; not yet consumed
```

## Commands

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `pnpm dev`        | Run the dev server                   |
| `pnpm build`      | Production build                     |
| `pnpm start`      | Start a production server            |
| `pnpm lint`       | ESLint (errors on `any`)             |
| `pnpm typecheck`  | `tsc --noEmit` against strict config |

## Editing content

All portfolio content is a **typed constant**, not a CMS. No round trips, no
runtime surprises.

- **Identity, experience, projects, skills, education** —
  `src/data/portfolio.ts`. Add an entry, save, reload.
- **Now status strip** — `src/data/now.ts`. Edit the array, save.
- **Nav items / vim jump keys** — `src/data/nav.ts`.
- **Site metadata** (title, url, description) — `src/lib/site.ts`.

## Adding a project case study

1. Add a new entry in `src/data/portfolio.ts` under `projects`.
2. Create a matching MDX file at
   `src/content/projects/<slug>.mdx`.
3. Register it in `src/app/projects/[slug]/page.tsx`:

   ```ts
   const contentMap: Record<string, () => Promise<MDXModule>> = {
     "<slug>": () => import("@/content/projects/<slug>.mdx"),
   };
   ```

That's it. The dynamic route picks the MDX up, typography is handled by
`prose` classes, and the entry shows up on the grid.

## Adding a blog later

The MDX plumbing is already configured (`next.config.mjs`, `mdx-components.tsx`).
To add a blog:

1. Create `src/app/blog/page.tsx` that lists posts from
   `src/content/blog/*.mdx`.
2. Create `src/app/blog/[slug]/page.tsx` mirroring the pattern from
   `src/app/projects/[slug]/page.tsx`.
3. Add typed frontmatter helpers under `src/lib/` if needed.

## Command palette (⌘K / Ctrl+K)

Wired at `src/components/command-palette.tsx`. Opens from:

- `⌘K` / `Ctrl+K` anywhere
- Any element with `data-cmdk-trigger` (delegated click listener)

Actions are plain objects with an `onSelect` — add more at the bottom of
`generalActions` and they'll show up with fuzzy search for free.

## Hacker mode

- Toggle via palette (`hacker` → "Enable hacker mode") or the Konami code
  (`↑↑↓↓←→←→BA`).
- While enabled, a persistent class `hacker-mode` lives on `<html>` and
  rewrites the token set to green-on-black with mono everywhere + scanlines.
- A live shell (`src/components/hacker-shell.tsx`) docks in the bottom-right.
  Press the backtick key (<kbd>`</kbd>) to hide/show it.
- Commands live in `src/lib/shell-commands.ts`. Add yours to the `switch`
  block — `help` will list them.

## Keyboard shortcuts

Press <kbd>?</kbd> anywhere to open the cheatsheet.

- `⌘K` — palette
- `j` / `k` — next / previous section
- `g` then `h / a / e / t / p / s / c` — jump to section
- `` ` `` — show / hide shell (hacker mode only)
- `⌘L` — clear shell
- `↑↑↓↓←→←→BA` — you know what this does

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in the Vercel dashboard.
3. Add environment variables from `.env.example`.
4. Deploy. The GitHub heatmap revalidates every hour; OG images are
   generated on the edge.

## Project layout

```
src/
├── app/                      # App Router: routes, metadata, sitemap, OG image
│   ├── projects/[slug]/      # MDX case studies
│   └── uses/                 # /uses page
├── components/               # composables (palette, shell, heatmap, header…)
│   └── ui/                   # shadcn-style primitives
├── sections/                 # one file per landing section
├── content/projects/*.mdx    # case study bodies
├── data/                     # ALL content as typed constants
├── hooks/                    # useHackerMode, useKeyboardNav
└── lib/                      # utils, github, dates, shell commands
```

## License

Source is public; copy, remix, but please don't pass my bio off as yours.
