# AFTERLIGHT: Space Archaeology — System Architecture & Technology Stack
Version: 1.1 · Status: Approved System Design · Target Audience: Architecture, Engineering, Infrastructure

---

## 1. Technology Matrix & Boundaries

| Layer | Technology | Status | Key Responsibilities |
|---|---|---|---|
| **Frontend Framework** | Next.js (App Router) + TypeScript | **MVP** | Routing, server-side page rendering, SEO metadata, layout shell |
| **Styling & Design Tokens** | Tailwind CSS + CSS Variables | **MVP** | Dark cinematic theme, planet-aware CSS tokens (`--accent`, `--bg`, etc.) |
| **UI Component Library** | shadcn/ui (Radix Primitives) | **MVP** | Accessible dialogs, tabs, segmented toggle, menus, sliders |
| **3D Planetary Scene** | React Three Fiber + Drei + Three.js | **MVP** | Horizon-arc planet rendering, custom atmospheric glow shaders, starfield |
| **3D Model Viewer** | React Three Fiber + OrbitControls | **MVP** | Hardware inspection, part hotspots, camera clamping, lighting rigs |
| **3D Asset Formats** | Blender (source) → GLB (Draco/KTX2) | **MVP** | Highly optimized 3D models (≤ 5MB), compressed textures (≤ 2MB) |
| **Page & UI Transitions** | Framer Motion | **MVP** | Planet switch crossfades, card list animations, chapter scroll reveals |
| **Cinematic Scroll** | GSAP ScrollTrigger (Optional) | **MVP** | Pinned story chapters and synchronized 3D camera tracks |
| **Backend API** | Node.js + Express.js + TypeScript | **MVP** | REST API endpoints, business logic, authorization, error formatting |
| **Data Validation** | Zod (Shared Package) | **MVP** | Runtime request validation (params, query, body) and API contract typing |
| **Database** | PostgreSQL | **MVP** | Relational storage for bodies, missions, equipment, stories, evidence |
| **ORM & Migrations** | Prisma ORM | **MVP** | Type-safe queries, relational joins, automated database migrations |
| **API Documentation** | Swagger / OpenAPI 3.0 | **MVP** | Interactive API specification and contract testing |
| **Authentication** | Auth.js (OAuth 2.0 / NextAuth) | **MVP** | Google Workspace / OAuth login with signed JWT verification on API |
| **Static & Asset Storage** | Cloudflare R2 + CDN | **MVP** | Hosting 3D GLB models, planetary textures, diagrams, and images |
| **Frontend Hosting** | Vercel Edge / Serverless | **MVP** | Global CDN distribution, Next.js optimized hosting |
| **Backend Hosting** | Render / Railway / AWS ECS | **MVP** | Continuous container deployment for Express API and Prisma |
| **Ambient Audio** | Web Audio API + HTML Audio | **Post-MVP** | Space soundscapes, UI SFX, global volume/mute controls (Phase 9) |
| **AI Narration (TTS)** | Kokoro TTS (in-browser) or Cloud TTS | **Post-MVP** | Story voice narration, subtitle synchronization (Phase 10) |

---

## 2. Monorepo Repository Topology

```text
afterlight/
├── apps/
│   ├── web/                    # Next.js App Router Application
│   │   ├── app/                # Server and client route handlers
│   │   │   ├── layout.tsx      # Root layout, theme provider, global header & footer
│   │   │   ├── page.tsx        # Redirects to /explore/[body] (default: mars)
│   │   │   ├── explore/[body]/ # Landing & equipment grid for moon/mars
│   │   │   ├── equipment/[slug]# Specification detail page
│   │   │   ├── stories/[slug]/ # Scroll-based interactive storytelling engine
│   │   │   ├── missions/       # Mission index and detail pages
│   │   │   └── evidence/       # Verified source gallery & citations
│   │   ├── components/
│   │   │   ├── ui/             # shadcn/ui primitives
│   │   │   ├── explore/        # PlanetScene, BodyToggle, StatsStrip, FeaturedCard
│   │   │   ├── story/          # ChapterShell, ModelViewer, HotspotOverlay, EngToDiscovery
│   │   │   └── spec/           # SpecGrid, InstrumentList, MilestoneTimeline, SourceList
│   │   ├── hooks/              # useBodyStore, useReducedMotion, use3DCapability
│   │   └── lib/                # Shared apiClient, analytics, formatters
│   └── api/                    # Express.js REST API
│       ├── src/
│       │   ├── routes/         # Route definitions (bodies, missions, equipment, stories)
│       │   ├── controllers/    # Request handling & HTTP response mapping
│       │   ├── services/       # Domain business logic & data aggregation
│       │   ├── middleware/     # Zod validator, auth verifier, rate limiter, error handler
│       │   └── prisma/         # Prisma schema, migrations, seed scripts
│       └── swagger/            # OpenAPI specification definitions
├── packages/
│   ├── types/                  # Shared TypeScript interfaces & Zod schemas
│   └── config/                 # Shared Tailwind, ESLint, and TSConfig presets
├── assets-src/                 # Blender source files and uncompressed textures (Git LFS)
└── context/                    # Architecture, PRD, workflows, UX specs, and research
```

---

## 3. High-Level Architecture Diagram

```text
                                +---------------------------+
                                |      CLIENT BROWSER       |
                                | (School Laptop / Mobile)  |
                                +-------------+-------------+
                                              |
                   +--------------------------+--------------------------+
                   |                                                     |
                   v                                                     v
      +-------------------------+                           +-------------------------+
      |    NEXT.JS FRONTEND     |                           |   3D WEBGL ENGINE       |
      |   (Vercel Edge / SSR)   |                           |  (R3F + Drei Canvas)    |
      +------------+------------+                           +------------+------------+
                   |                                                     |
                   | (REST API Calls / JSON)                             | (Fetch Assets)
                   v                                                     v
      +-------------------------+                           +-------------------------+
      |    EXPRESS REST API     |                           |   CLOUDFLARE R2 + CDN   |
      |  (Render / Railway / TS)|                           | (GLBs, Textures, Audio) |
      +------------+------------+                           +-------------------------+
                   |
        +----------+----------+
        |  Zod Request Schema |
        |  Rate Limit / CORS  |
        |  JWT Session Verify |
        +----------+----------+
                   |
                   v
      +-------------------------+
      |     CONTROLLER LAYER    |
      +------------+------------+
                   |
                   v
      +-------------------------+
      |      SERVICE LAYER      |
      | (Business Logic & Aggs) |
      +------------+------------+
                   |
                   v
      +-------------------------+
      |       PRISMA ORM        |
      +------------+------------+
                   |
                   v
      +-------------------------+
      |   POSTGRESQL DATABASE   |
      | (Missions, Specs, etc.) |
      +-------------------------+
```

---

## 4. Key Architectural Patterns & Decisions

### 4.1 Hybrid Rendering & Performance Optimization
- **Server Components by Default:** Next.js Server Components are utilized for content-heavy pages (Specification page, Evidence lists, SEO metadata) to ensure sub-2.5s Largest Contentful Paint (LCP) and zero-bundle hydration overhead.
- **Dynamic 3D Canvas:** R3F 3D components are strictly loaded via `next/dynamic` with `{ ssr: false }`.
- **Persistent Landing Canvas:** On the Explore landing page, the 3D canvas remains mounted across planet toggle events. Changing between Moon and Mars updates shader uniforms, lighting, and textures rather than destroying and recreating the WebGL context.
- **Hardware Capability Tiers:** The client assesses GPU/device tier on initialization:
  - **Tier High (Desktop/Modern GPU):** Full shaders, normal maps, dynamic atmospheric scattering, 60fps.
  - **Tier Medium (Mobile/Tablets):** Compressed textures, lower polycounts, 30fps lock.
  - **Tier Low / Fallback (No WebGL/School Filters):** Seamlessly replaces the 3D viewport with an optimized static image and semantic HTML hotspots.

### 4.2 Data Integrity & Domain Modeling
- **Decoupled Status Modeling:** Equipment models strictly separate:
  - `operationalStatus`: e.g., `ACTIVE`, `INACTIVE`, `LOST`, `RETIRED`.
  - `physicalStatus`: e.g., `SURFACE_LANDING_SITE`, `IMPACTED`, `ORBIT_DECAYED`, `DEEP_SPACE`.
  - `fateConfidence`: strictly validated enum: `DOCUMENTED`, `INFERRED`, `UNKNOWN`.
- **Primary Source Linkage:** Every fact, date, coordinate, and metric stored in the database maintains a foreign relation to an `Evidence` record containing source URL (NASA NSSDC, science.nasa.gov), license, and attribution.

### 4.3 Security & Student Privacy (COPPA / GDPR-K Compliance)
- **Zero-Password Storage:** Pure OAuth 2.0 identity integration (Google Workspace for Education, Microsoft, GitHub).
- **Minimal Data Ingestion:** User records store only external `providerId`, `email`, and `name`.
- **Read-Only Anonymous Access:** 100% of educational content, 3D scenes, stories, specifications, and evidence are publicly accessible without authentication. Sign-in only unlocks optional personalization (bookmarks and progress saving).
- **Strict API Sanitation:** All inputs validated against shared Zod schemas with automatic parameter stripping to prevent injection attacks.
