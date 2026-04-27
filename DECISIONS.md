# Design decisions

Short journal of the opinionated calls behind this portfolio. Anything not
listed here is a default I didn't have to think about.

## Accent: terminal amber

`hsl(38 100% 55%)` in dark, `hsl(38 100% 50%)` in light.

- Electric blue is the default everyone ships; amber sidesteps that.
- Acid green would fight with hacker mode's green-on-black palette. Amber
  creates a deliberate **warm default → cold terminal** duality when the
  user toggles.
- Reads as "backend / infra" more than "crypto startup".
- Tuned against zinc-950: passes AA for body, 4.5:1 on borders and CTAs.

## Neutral: zinc, not slate

Zinc is crisper on OLED and has less blue tint, which is exactly what I want
in a theme that leans on warm accents.

## Typography: Geist Sans + Geist Mono

Geist is from Vercel, variable, and pairs perfectly with itself — Sans for
UI/body, Mono for timestamps, section labels, key hints, and any piece of
chrome I want to feel technical. Subsetted via `geist/font` to avoid the
"font-weight waterfall" most sites ship.

## Background texture: one treatment, not five

A fine SVG grid at ~10% opacity + a restrained radial glow behind the hero.
No per-section shifting gradients, no noise everywhere — those contradict
the minimalist brief. A touch of SVG noise sits over the hero only, mixed
at 3.5% to take the curse off flat dark.

## Signature features I prioritised (and why)

1. **Command palette.** The highest-leverage nerd signal on a tech portfolio —
   one interaction that shows the visitor the whole site map, plus theme,
   hacker mode, copy-email, resume, shortcuts, and `/uses` in one affordance.
   If I shipped only one thing, it would be this.
2. **Hacker mode with a working shell.** Terminal aesthetics without a shell
   are just CSS. With a real `help` / `ls` / `cat about.md` / `goto
   projects` loop, it becomes memorable. Commands map cleanly to content I
   already have, so no duplication.
3. **Animated SVG architecture diagram as hero art.** A photo or blob says
   nothing specific. A backend architecture says "this is the kind of work
   I do." The flowing dashed edges tell the visitor it's alive without
   demanding attention.
4. **Custom GitHub heatmap.** Ships as a server component with hourly
   revalidation. Degrades to a deterministic placeholder when `GITHUB_TOKEN`
   is missing, so the layout never looks empty in local dev.
5. **Vim-flavoured keyboard nav.** `j/k`, `g`+letter, `?`. Discoverable
   without being in the way — mouse users never see it; keyboard users
   find it instantly.
6. **MDX project case studies.** Each featured project has a real page at
   `/projects/[slug]`. The writing-as-signal goes further than another card
   grid would.

## Signature features I pushed back on

- **Spotify now-playing: deferred.** OAuth refresh-token dance + a
  serverless route + token rotation is a lot of surface area for a single
  line of status text. The hand-curated `data/now.ts` reads as *taste*,
  not *API plumbing*. Env vars are reserved in `.env.example` for v2.
- **Sound effects on hover/click: skipped by default.** Accessibility risk,
  ~0% of visitors leave them on, and shipping a sound library is cost
  without payoff.
- **Per-section shifting gradients: skipped.** Directly contradicts the
  restrained brief. One background treatment, applied consistently.
- **`react-github-calendar`: skipped**, as the brief asked. The custom
  renderer lets me use the amber accent, the site's font stack, and
  tooltips that feel consistent with the rest of the page.

## State / control flow

- **Theme** — `next-themes`, `attribute="class"`, dark default, no system
  auto to keep the amber contrast deterministic.
- **Hacker mode** — small React context (`useHackerMode`) with a
  `localStorage` key and a root `<html>` class. Not in next-themes because
  it isn't a theme: it's a mode that swaps tokens, fonts, and cursor
  treatments all at once. Boot animation is a short overlay, not a
  page-level router transition — toggling the mode shouldn't unmount the
  site.
- **Palette** — `cmdk`, mounted once at the root under `AppShell`. The
  `data-cmdk-trigger` attribute + a single delegated click listener keeps
  trigger buttons lightweight (no imperative refs, no extra providers).

## Data shape

All content is a typed constant under `src/data/`. Adding a job or project
is a 10-second edit, not a CMS migration. `as const` + named types give
inference everywhere it's used. If this ever grows past what constants can
handle, the MDX plumbing is already there to absorb long-form content.

## What's next (suggested)

- **Blog** — MDX is wired. Create `src/app/blog/*` mirroring the projects
  pattern. A small `reading-time` util lands in one file.
- **CMS, if needed** — Contentlayer 2 or a local MDX + Zod frontmatter
  pipeline. Don't reach for a hosted CMS until you've felt the pain of
  editing typed constants, which may never come.
- **Analytics** — `@vercel/analytics` + `@vercel/speed-insights`. One line
  in `layout.tsx` each. Skip Google Analytics.
- **Spotify now-playing** — when I'm ready to own the token rotation. Env
  vars already reserved.
- **i18n** — pt-BR would be nice. `next-intl` or a light locale switch in
  `data/portfolio.ts`. Not worth it until there's a reader audience.
- **A real /uses list** — replace the sensible placeholders with the
  specific models and links; that page is the one that drifts fastest.
