# AFTERLIGHT: Space Archaeology (ABNF)
> *"Discover the stories left behind."*

**ABNF** (*Abandoned But Not Forgotten*) / **AFTERLIGHT: Space Archaeology** is an interactive digital storytelling and 3D exploration platform that introduces school-age space enthusiasts (ages ~9–17) and educators to the robotic explorers, landers, and scientific instruments NASA has left behind across the solar system (the Moon, Mars, and deep space).

---

## 🚀 Key Highlights & Architecture

- **Interactive 3D Celestial Environments:** Horizon-arc 3D rendering of the Moon and Mars built with React Three Fiber, Drei, and Three.js, featuring dynamic atmosphere shaders and texture crossfading.
- **Scroll-Driven Storytelling (Core):** Narrative chapters (*Origin → Engineering → Journey → Operations → Key Events & Challenges → Discoveries → Legacy*) connecting engineering design directly to scientific discoveries.
- **Interactive 3D Hardware Inspection:** Orbit controls, zoom limits, and clickable hotspots explaining hardware components and their scientific purpose.
- **Source-Backed Specifications:** Every technical fact and historical claim links to primary sources (NASA NSSDC, science.nasa.gov).
- **Dual-Status Taxonomy:** Strict domain separation between *operational status* (e.g., inactive/completed) and *physical status* (e.g., remains at landing site), with fate confidence tracked as `documented`, `inferred`, or `unknown`.
- **Accessible & Performance-First:** Built to WCAG 2.2 AA standards, full keyboard navigation, reduced-motion fallbacks, and 3D device capability tiers (with static WebGL fallbacks).

---

## 🛠 Technology Stack

| Layer | Technology | Key Responsibility |
|---|---|---|
| **Frontend** | Next.js 14+ (App Router), TypeScript (Strict) | Application UI, server-side rendering, routing |
| **Styling & Components** | Tailwind CSS + shadcn/ui | Dark cinematic space design system, tokens, accessible primitives |
| **3D Rendering** | Three.js + React Three Fiber + Drei | Planetary horizon scenes, interactive 3D equipment models |
| **3D Asset Formats** | Blender (Source), compressed GLB (Draco/KTX2) | High-fidelity, optimized hardware models (≤ 5MB) |
| **Animations** | Framer Motion (GSAP for pinned sequences) | Smooth transitions, chapter scroll triggers |
| **Backend API** | Node.js + Express.js + TypeScript | RESTful API, business logic, OpenAPI/Swagger docs |
| **Validation** | Zod | Runtime contract validation shared between API and web |
| **Database & ORM** | PostgreSQL + Prisma ORM | Relational data persistence, type-safe queries, migrations |
| **Authentication** | Auth.js (OAuth 2.0 / NextAuth) | Google Workspace / OAuth login with signed JWT verification |
| **Asset Storage** | Cloudflare R2 / AWS S3 + CDN | Storage for compressed GLB models, high-res textures, and media |
| **Post-MVP Audio/TTS** | Kokoro TTS + Web Audio API | Ambient soundscapes, interactive chapter narration (Phase 10) |

---

## 📁 Repository Structure & Context Documentation

```text
ABNF/
├── README.md                      # Project overview & architectural entry point
└── context/                       # Canonical architecture and product documentation
    ├── Project_overview.md        # Executive summary, mission vision & feature list
    ├── achitecture&techStack.md   # System architecture, data flow & component boundaries
    ├── Prd.md                     # Product Requirements Document (PRD v1.0)
    ├── dev&taskBreakdown.md       # 10-phase roadmap (Phases 1–7 MVP, 8–10 Post-MVP)
    ├── userworkflow&Stories.md    # Detailed user workflows (W1–W7), personas & edge cases
    ├── uxDesignSpec.md            # Visual identity, tokens, component catalog & UX rules
    ├── agents.md                  # Developer & AI coding agent guidelines and constraints
    ├── data&research.md           # Source-grounded NASA research for all launch hardware
    └── afterlight.png             # UI design reference for the Explore landing experience
```

---

## 🎯 Target MVP Launch Hardware

The initial release (Phases 1–7) focuses on 4 primary exploration items:

| Celestial Body | Hardware | Mission | Historical Significance |
|---|---|---|---|
| **The Moon** | **Apollo Lunar Module (LM)** | Apollo 11 (*Eagle*) & Apollo 15 (*Falcon*) | First crewed landing craft; descent stages remain at landing sites |
| **The Moon** | **Lunar Roving Vehicle (LRV)** | Apollo 15 | First crewed surface rover; expanded exploration radius to 5 km |
| **Mars** | **Sojourner Rover** | Mars Pathfinder (1997) | First free-ranging mobile rover on Mars; operated 83 sols |
| **Mars** | **Spirit & Opportunity (MER)** | Mars Exploration Rovers (2004) | Longest-operating rover pair; discovered evidence of past water |

*(Note: Viking 1 Lander research is complete in `context/data&research.md` and prepared for the v1.1 catalog expansion).*

---

## 🚦 Roadmap Summary

- **Phase 1–2:** Foundation, Monorepo Setup, Design Tokens, Prisma DB, Express Skeleton & OAuth
- **Phase 3–4:** Explore Landing Experience (3D Horizon, Toggle) & Equipment Exploration Grid
- **Phase 5–6:** Storytelling Engine (3D Viewer, Hotspots), Specification Pages & 3D Asset Production
- **Phase 7:** Hardening, Accessibility Audits (WCAG 2.2 AA), QA & Production Launch
- **Phase 8–10 (Post-MVP):** Full Catalog Filters, Landing Site Markers, Bookmarks, Audio Engine & TTS
