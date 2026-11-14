# Audit: AFTERLIGHT before the redesign

Date: 2026-11-15. Scope: everything in the repo at commit `25c6880` plus the uncommitted `apps/` and `packages/` trees.

## 1. Inventory

### Workspace
| Item | What it is |
|---|---|
| `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json` | pnpm monorepo: `apps/web`, `apps/api`, `packages/types`, `packages/config` |
| `context/*.md` | Product documents: PRD, overview, architecture, UX spec, task breakdown, user stories, agent rules, NSSDCA research notes |
| `context/afterlite.png` | Landing-page visual reference (planet horizon) |

### `apps/web` (Next.js 15, React 19, App Router)
| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Redirects to `/explore/mars` |
| `/explore/[body]` | `app/explore/[body]/page.tsx` | Hero planet + stats strip + featured/spotlight cards + equipment grid. All data hard-coded inside the page |
| `/equipment`, `/equipment/[slug]` | `app/equipment/**` | Spec sheet + `ModelViewer` |
| `/stories`, `/stories/[slug]` | `app/stories/**` | Scroll story; chapter text hard-coded in `StoryEngine.tsx` (396 lines) |
| `/missions`, `/evidence` | `app/missions`, `app/evidence` | Static list pages |

| Component | Notes |
|---|---|
| `explore/PlanetScene.tsx` | R3F sphere with a random canvas texture (`Math.random()`: different every load, mismatches SSR) and a rim-glow shader |
| `equipment/ModelViewer.tsx` | Three primitive-built models (Sojourner, Opportunity, LM) that spin forever; hotspots are `Html` labels |
| `story/StoryEngine.tsx` | framer-motion scroll story; content inline |
| `explore/BodyToggle, EquipmentGrid, FeaturedCard, SpotlightCard, StatsStrip, HeroText, ScrollHint` | Card UI around the hero |
| `layout/Header, Footer` | Nav to 5 sections + Sign-in button |
| `lib/supabase/*`, `middleware.ts` | Supabase session refresh on every request. Crashes when env vars are absent |
| `lib/api.ts` | Fetch helper for the Express API (not used by any page) |

Dependencies: next, react, three, @react-three/fiber, @react-three/drei, framer-motion, gsap, @gsap/react, 4× Radix, Supabase (2), lucide-react, cva, clsx, tailwind-merge, tailwindcss-animate, zod, Tailwind 3.

### `apps/api` (Express + Prisma)
Routes `bodies, equipment, evidence, featured, missions, stats`, all served from `src/data/mockData.ts`. A 259-line Prisma schema and a seed script exist but no database is wired up. Swagger docs, helmet, rate limiting. Committed `dist/` build output and a real `.env`.

### `packages/types`, `packages/config`
Zod schemas and TS types for the API contract; a shared Tailwind config.

### Assets
None. `public/` holds only `robots.txt`. No 3D models, textures, or audio.

## 2. Assessment against the core MVP

> An interactive 3D storytelling experience about machines abandoned on the Moon and Mars.

The current build is a catalog website with a 3D decoration on top. The 3D scene never leads anywhere: you can't descend to a site, the machines aren't on any terrain, and the story is a separate page of scrolling text. A content-only backend is overkill for ~20 records that change a few times a year. Auth has no job in this experience.

## 3. Keep / rewrite / delete

| Decision | Item | Why |
|---|---|---|
| **Keep** | Next.js 15 App Router, React 19, TypeScript strict | Static generation gives SEO and deep links for free; already installed |
| **Keep** | three + @react-three/fiber + drei | Right tool for the core. Versions are current |
| **Keep** | zod | Used to validate story data at test and build time |
| **Keep (as reference)** | `context/data&research.md` facts | Good source-grounded notes (Apollo 11/15, Pathfinder, MER). Re-verified and folded into the data files |
| **Rewrite** | Planet scene → `GlobeScene` | Deterministic textures, site markers at real coordinates, cinematic descent |
| **Rewrite** | ModelViewer → per-machine model modules + `SiteScene` | Machines sit on real-feeling terrain with proper lighting; hotspots come from data |
| **Rewrite** | StoryEngine → data-driven story mode with camera shots | Narrative drives the camera, not a separate page |
| **Rewrite** | Design system | New concept, tokens, type, motion (see `docs/DESIGN_SYSTEM.md`) |
| **Delete** | `apps/api`, Prisma, Swagger | Static typed data replaces it. Adding a rover is now a data change, not a migration |
| **Delete** | Supabase auth + middleware | No user accounts in the MVP; the middleware also breaks the app without env vars |
| **Delete** | `/missions`, `/evidence`, `/equipment`, `/stories` pages, stats strip, featured/spotlight cards | Catalog UI that competes with the 3D experience. Sources now live inside each story |
| **Delete** | gsap, framer-motion, Radix, lucide, cva, tailwind-merge, Tailwind | One motion system (R3F frame loop + CSS), a small hand-built UI. Fewer deps, smaller bundle |
| **Delete** | Monorepo layout | One app does not need workspaces. Flattened to a single Next.js project at the repo root |
| **Archive** | `context/*` | Moved to `docs/legacy-context/`. Superseded by the new docs but kept for history |

The removed uncommitted code is preserved in `.backup/legacy-code-2026-11-15.tar.gz` (git-ignored). It was never committed, so this is the only copy.

## 4. Phased plan

Every phase leaves the app running.

1. **Foundation.** Flatten repo, install, new design tokens and fonts, route skeleton (`/`, `/[world]`, `/[world]/[slug]`, `/about`), persistent canvas with WebGL fallback.
2. **Content.** Typed schema + data files for 4 featured machines per world and lighter secondary sites, every fact group cited. Verified by research passes against NASA / ISRO / ESA / Roscosmos / LROC / HiRISE.
3. **Worlds.** Starfield, Moon and Mars globes with site markers at real coordinates, lifespan timeline, cinematic descent.
4. **Sites and machines.** Procedural terrain per world (harsh Moon light, Mars haze and dust), stand-in machine models, hotspots, story mode with camera shots, free-explore mode, timeline scrubber, next-object flow.
5. **Atmosphere and access.** Generated ambient audio (Mars wind, Moon near-silence), last-transmission moment with captions, onboarding hint, intentional loader, reduced motion, keyboard flow, quality tiers for mobile.
6. **Hardening.** Vitest suite for data and core logic, README, DECISIONS, ATTRIBUTIONS, browser checks at desktop and phone widths.
