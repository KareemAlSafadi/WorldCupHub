# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

World Cup Hub — a FIFA World Cup history site. React 19 SPA (plain JSX, no TypeScript), Vite 8, Tailwind CSS 4, React Router 7. All data is static and bundled; there is no backend, no fetching, and no test suite. The visual identity is a soft dark theme — pitch green (#1FA463) accents on deep navy-black surfaces, Plus Jakarta Sans type, rounded-2xl cards with subtle rings.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build
- `npm run lint` — ESLint (flat config in `eslint.config.js`; covers `**/*.{js,jsx}`, ignores `dist`)

## Architecture

### Data layer (the important part)

`src/lib/data.js` is the single data-access layer. Pages and components never import the data files directly — they call its getters/filters (`getAllTournaments`, `getTournamentByYear`, `getTeamBySlug`, `filterTournaments`, `getStats`, …). At module load it merges the sources below, sorts, and derives each team's `tournamentResults`.

Data sources in `src/data/`:

- `tournaments.json` — summary index of every edition (1930–2026). Each entry has a `detailLevel`: `"preview"` (2026, in progress) or `"full"` (every completed edition). A legacy `"summary"` tier (facts only, EmptyState fallbacks in the UI) is still supported but currently has no members.
- `tournamentDetails.js` — exports `fullTournaments`: 2022 and 2018 are defined inline; every other edition lives in a `tournaments/wcYYYY.js` file. Records are merged over the matching `tournaments.json` summary by year (the wcYYYY file wins).
- `teams.json` — all teams (incl. defunct: Soviet Union, Czechoslovakia, Yugoslavia, East/West Germany, Dutch East Indies) with `slug`, FIFA `code`, `confederation`, titles/appearances.
- `allTimeScorers.json` — static all-time top-scorer list, exposed via `getAllTimeScorers()`.

Full-tournament shape: `standings` (object keyed by group label — letters, numbers, or `"2A"`/`"Final Round"` for second group stages), `matches` (flat array; each match has an `id` like `"2014-qf-1"`, optional `venue`, optional `pens`/`extra`), and `bracket` (rounds referencing match ids from `matches`).

Historical format quirks the data/UI already handle: `'Second round'` is a valid match stage (1950/1974/1978/1982 second group phases — it's in `STAGE_ORDER` in `FixturesList.jsx`); 1934/1938 are knockout-only (no `standings`; replays are separate matches with ids like `"1938-qf-4r"`, and only the decisive match is referenced in `bracket`); 1950 has no bracket (decided by the `"Final Round"` group); pre-1994 standings record the historical 2-points-per-win values.

**2026 live-updating workflow**: `wc2026.js` defines `GROUPS` + all 72 group fixtures with `homeScore`/`awayScore: null`, and derives `standings` via its local `computeStandings()` (3 pts/win, sorted points → GD → GF). To record a result, fill in the two scores on the match — the group table updates automatically. When the knockout rounds are set, append their matches and add a `bracket` array (see wc2022 shape). `detailLevel` stays `"preview"` until the tournament ends; `FixturesList` renders a blinking "VS" for null scores, and `buildTeamResults` in `data.js` skips standings rows with `played === 0`.

To add or extend tournament data: create/edit `src/data/tournaments/wcYYYY.js`, register it in `fullTournaments` in `tournamentDetails.js`, and keep that year's `detailLevel` accurate in `tournaments.json`.

### Two mapping tables that must stay in sync with the data

- `src/lib/flags.js` — `FIFA_TO_FLAG` maps FIFA 3-letter codes to `flag-icons` CSS country codes. Any new team/match code needs an entry here or `getFlagClass` returns null (no flag renders).
- `src/lib/data.js` — `NAME_TO_SLUG` handles team names whose slug isn't just lowercase-hyphenated (e.g. "United States" → `usa`, "Bosnia and Herzegovina" → `bosnia`). Team names in tournament data must resolve to a slug present in `teams.json` for team-page history to link up.

### Routing and UI

- `src/App.jsx` — `BrowserRouter`, all routes nested under `Layout` (navbar + outlet). Every page is lazy-loaded with a matching skeleton fallback from `src/components/Skeleton.jsx`. Routes: `/`, `/tournaments`, `/tournaments/:year`, `/teams`, `/teams/:slug`, `/records`, `/compare` (head-to-head via `?a=slug&b=slug` search params + `getHeadToHead()` in data.js), and a `*` catch-all 404.
- Every page calls `usePageTitle('...')` from `src/lib/usePageTitle.js` to set the document title (no argument on Home restores the default).
- Styling is Tailwind 4 via the `@tailwindcss/vite` plugin — there is no `tailwind.config.js`; theme tokens live in the `@theme` block in `src/index.css` (`pitch`, `pitch-dim`, `surface`, `surface-raised`, `surface-overlay`). The site is dark-only (`bg-surface` on body). Shared utilities: `animate-fade-up`, `stagger-children`, `transition-premium`, `animate-pulse-soft` (used for "live"/upcoming indicators); a `prefers-reduced-motion` block disables them.
- Font: Plus Jakarta Sans (default `font-sans`), loaded from Google Fonts in `index.html`.
- Flags render via `flag-icons` CSS classes through the `FlagBadge` component. Defunct/edge-case codes map to nearest modern flags (`URS`→ru, `FRG`/`GDR`→de, `TCH`→cz, `YUG`→rs, `ZAI`→cd, `DEI`→id).
