AFTERLIGHT: Space Archaeology – Development & Task Breakdown
Version 1.0 · Companion to the PRD · Audience: Engineering, Design, Content, QA
The build is split into 7 MVP phases (Phases 1–7) that deliver a launchable product, followed by 3 post-MVP phases (Phases 8–10). Work is ordered by dependency, not by calendar. Each phase has a clear “Done when” check.
1. MVP Definition
The MVP is the smallest release that delivers the core promise: pick Moon or Mars, choose a machine, experience its story, and read its specifications.
In the MVP
Deferred (post-MVP)
OAuth sign-in and signed-in header state
Bookmarks, progress sync, personalised sections
Explore landing page: 3D planet, Moon/Mars toggle, stats, Featured and Spotlight cards
Interactive landing-site markers on the planet
Planet-filtered equipment cards (Moon: Apollo Lunar Module, LRV; Mars: Sojourner, Spirit and Opportunity)
Equipment filters (mission, status, decade)
Scroll-based story for each of the 4 launch equipment items, with a 3D viewer and hotspots
Quizzes, glossary polish, ambient audio and sound effects
Equipment specification page with sources
Metric/imperial toggle and “explain simply” hints
Basic Missions, Equipment and Evidence pages (simple lists)
Search, advanced Evidence gallery, Stories index with progress
Responsive layout, accessibility basics, reduced-motion support
Text-to-speech narration
Rule for scope decisions: if it does not appear in the left column, it does not block the MVP release.
2. Phase Overview
Phase
Name
Scope
Outcome
1
Foundation and Setup
MVP
Repos, CI, environments, design tokens, database, API skeleton
2
Authentication
MVP
Users can sign in and out with OAuth
3
Explore Landing Page
MVP
Landing page matches the reference design, with a working Moon/Mars toggle
4
Equipment Exploration
MVP
Equipment cards change with the selected planet and link to detail pages
5
Storytelling Engine and Specification Pages
MVP
Story and specification templates working end to end on one equipment item
6
MVP Content and 3D Production
MVP
All 4 launch equipment items have a story, specs, evidence and a 3D model
7
Hardening, QA and Launch
MVP
Tested, accessible, performant, deployed to production
8
Supporting Pages
Post-MVP
Full Missions, Equipment, Stories and Evidence experiences
9
Personalisation, Search and Engagement
Post-MVP
Bookmarks, progress, search, quizzes, audio
10
Text-to-Speech Narration
Post-MVP
AI narration for stories
Suggested team roles: Product lead, UI/UX designer, 2 frontend engineers, backend engineer, 3D/technical artist, content writer/researcher, QA.
3. Architecture Summary
• Monorepo: apps/web (Next.js App Router, TypeScript), apps/api (Express, Prisma, TypeScript), packages/types (shared Zod schemas and types), assets-src (Blender sources).
• Server components for content, client components for 3D. Pages and metadata render on the server for SEO; React Three Fiber scenes load dynamically with SSR off.
• One persistent canvas on the landing page; switching Moon/Mars swaps textures, lighting and glow rather than remounting the scene.
• Shared Zod schemas used for API validation and frontend typing.
• Assets on Cloudflare R2 behind a CDN; the database stores asset keys only.
• 3D quality tiers (low, medium, high) with a static-image fallback.
• Auth: Auth.js (NextAuth) with OAuth providers on the frontend, issuing a signed token the Express API verifies. Confirm this approach in Phase 1.
4. MVP Phases
Phase 1 – Foundation and Setup
Goal: a working skeleton that every later phase builds on.
ID
Task
Owner
1.1
Review the PRD and resolve open questions (Perseverance/MOXIE scope, Stats metrics, auth providers)
Product
1.2
Create the monorepo, linting, formatting, commit hooks and branch strategy
FE/BE
1.3
Set up CI: typecheck, lint, test, build
BE
1.4
Provision Vercel, Render/Railway, PostgreSQL, R2 bucket and dev/staging/prod environments
BE
1.5
Define design tokens: colours (Moon silver, Mars orange), typography, spacing, glow effects
Designer
1.6
Obtain and finalise the specification page reference design
Designer
1.7
Initialise Next.js, Tailwind CSS and shadcn/ui with the dark, space-themed base
FE
1.8
Build the global layout: Header (navigation, search icon, Sign In), Footer, mobile menu
FE
1.9
Write the Prisma schema and migrations (User, CelestialBody, Mission, Equipment, Instrument, Story, StoryChapter, MissionEvent, Evidence)
BE
1.10
Write a seed script with bodies, missions and equipment placeholders
BE
1.11
Build the Express skeleton: routing, error handling, Zod validation middleware, CORS, rate limiting
BE
1.12
Set up Swagger/OpenAPI with the first endpoints (/api/bodies, /api/stats)
BE
1.13
Set up the API client, data-fetching conventions, error tracking and analytics
FE/BE
Done when: CI is green, the app and API deploy to staging, and the API returns seeded data to the frontend.
Phase 2 – Authentication
Goal: users can sign in with OAuth and see a personalised header.
ID
Task
Owner
2.1
Integrate Auth.js with the chosen OAuth providers (for example Google and one more)
FE/BE
2.2
Create or find the user record on first sign-in; store name, email and avatar only
BE
2.3
Verify the session token in the Express API; add a protected-route helper
BE
2.4
Build the Sign In dialog with provider buttons and a short privacy note
FE
2.5
Build the signed-in header: avatar, user menu, Sign out
FE
2.6
Return the user to the page they were on after sign-in; handle cancel, provider error and expired session
FE
2.7
Add a welcome toast and a basic account page
FE
Done when: a user can sign in, see their avatar, refresh without losing the session, and sign out.
Phase 3 – Explore Landing Page
Goal: the landing page visually matches the reference design.
ID
Task
Owner
3.1
Build the hero layout: headline, sub-copy, toggle and “Start Exploring” call to action
FE
3.2
Build the React Three Fiber scene: planet as a horizon arc, atmosphere glow shader, starfield, slow rotation
FE
3.3
Prepare Moon and Mars textures (albedo and normal maps), compressed for the web
3D
3.4
Build the Moon/Mars toggle (shadcn) with accessible states
FE
3.5
Implement the transition: planet swap, accent colour, headline and copy swap (Framer Motion)
FE
3.6
Add a global body-selection store, saved locally
FE
3.7
Build the Stats strip with count-up animation from /api/stats
FE/BE
3.8
Build the Featured Mission and Spotlight cards, with GET /api/featured?body=
FE/BE
3.9
Add device capability detection, quality tiers and a static-image fallback
FE
3.10
Make the page responsive (mobile: stacked cards, smaller planet)
FE
3.11
Optimise: lazy loading, texture compression, Lighthouse check
FE
Done when: the toggle switches the scene, copy, stats and cards smoothly, and the page works on mobile and without WebGL.
Phase 4 – Planet-Based Equipment Exploration
Goal: equipment cards change with the selected planet.
ID
Task
Owner
4.1
Build GET /api/bodies/:slug/equipment with filtering
BE
4.2
Build the equipment section below the hero, revealed by “Start Exploring”
FE
4.3
Build the equipment card: image or mini 3D preview, status badge, mission, year
FE
4.4
Animate the card list when the planet changes
FE
4.5
Link cards to the equipment page and prefetch the route
FE
4.6
Add loading, empty and error states (including a “Coming soon” state)
FE
Done when: Moon shows the Apollo Lunar Module and LRV, Mars shows Sojourner and Spirit/Opportunity, and each card opens its equipment page.
Phase 5 – Storytelling Engine and Specification Pages
Goal: both templates work end to end, proven on one equipment item (Sojourner recommended) before the others are produced.
5A. Storytelling engine
ID
Task
Owner
5.1
Finalise the story data model: chapter types (text, media, 3D, diagram, timeline)
BE/FE
5.2
Build GET /api/equipment/:slug/story returning ordered chapters and media
BE
5.3
Build the chapter framework with scroll-triggered reveals (Framer Motion; GSAP only if needed for pinned sequences)
FE
5.4
Build the reusable 3D model viewer: orbit controls, zoom limits, lighting, loading state
FE
5.5
Build the hotspot system: clickable labelled points that open explanation panels
FE
5.6
Build the “Engineering to Discovery” component linking hardware features to scientific results
FE
5.7
Build annotated diagram components
FE/Designer
5.8
Add the progress bar and chapter navigation
FE
5.9
Add reduced-motion and low-power alternatives
FE
5.10
Build the story end screen: links to specifications and related equipment
FE
5B. Specification page
ID
Task
Owner
5.11
Build GET /api/equipment/:slug with instruments, milestones and sources
BE
5.12
Build the header: name, mission, status, hero image or 3D model, “Read the story” button
FE
5.13
Build the specification grid: launch, vehicle, manufacturer, agency, dimensions, mass, power, location
FE
5.14
Build the instruments and capabilities component
FE
5.15
Build the milestone timeline component
FE
5.16
Build the scientific contributions section
FE
5.17
Add source citations per fact
FE/BE
5.18
Add SEO metadata and Open Graph images
FE
Done when: one equipment item has a complete story (all chapters, working 3D viewer and hotspots) and a complete specification page, reachable from its card.
Phase 6 – MVP Content and 3D Production
Goal: all 4 launch equipment items are complete. This phase starts early and runs alongside Phases 3–5.
ID
Task
Owner
6.1
Collect sources and write research briefs for each equipment item
Content
6.2
Sojourner: story, specification data, evidence
Content
6.3
Apollo Lunar Module: story, specification data, evidence
Content
6.4
Lunar Roving Vehicle: story, specification data, evidence
Content
6.5
Spirit and Opportunity: story, specification data, evidence
Content
6.6
Featured and Spotlight copy for each planet (confirm Perseverance and MOXIE decision)
Content
6.7
Create 3D models in Blender: Sojourner, Lunar Module, LRV, MER rover (or adapt NASA public models)
3D
6.8
Export, optimise and compress GLB files (Draco/KTX2) and validate them in the viewer
3D
6.9
Prepare images and diagrams; record the licence and attribution for every asset
Content/Designer
6.10
Educator review of language level and scientific accuracy
External
6.11
Upload assets to R2 and seed production content
BE
Done when: every launch equipment item has a reviewed story, a specification record, at least 5 evidence items and an optimised 3D model.
Phase 7 – Hardening, QA and Launch
Goal: the MVP is tested, accessible, secure and live.
ID
Task
Owner
7.1
Build simple Missions, Equipment and Evidence list pages
FE/BE
7.2
Write privacy policy and terms; complete the child-safety review
Product
7.3
Run an accessibility audit and fix issues: keyboard, screen reader, contrast, text alternatives for 3D
FE/QA
7.4
Test across browsers and devices
QA
7.5
Run performance checks (Lighthouse, web vitals) and optimise
FE
7.6
Run a security review: auth flow, rate limits, input validation, dependency audit
BE
7.7
Write end-to-end tests (Playwright) for the core flows
QA
7.8
Run user acceptance testing on staging with educators and students
Product
7.9
Deploy to production with DNS, monitoring dashboards and backups
BE
7.10
Prepare the launch checklist and rollback plan; write the README, API docs and content authoring guide
All
Done when: all MVP acceptance criteria pass on staging and the production release is live and monitored.
5. Post-MVP Phases
Phase 8 – Supporting Pages
ID
Task
Owner
8.1
Missions index and mission detail pages with timeline
FE/BE
8.2
Equipment catalogue with filters (mission, status, decade)
FE/BE
8.3
Stories index page
FE
8.4
Evidence gallery with lightbox, attribution and filters
FE/BE
8.5
Interactive landing-site markers on the planet linked to equipment cards
FE
8.6
Metric/imperial toggle and beginner tooltips on specification pages
FE
Phase 9 – Personalisation, Search and Engagement
ID
Task
Owner
9.1
Save story progress and “Continue where you left off”
FE/BE
9.2
Bookmarks and a personalised “Continue exploring” section
FE/BE
9.3
Global search: API endpoint and results overlay
FE/BE
9.4
Glossary tooltips for technical terms
FE
9.5
Audio manager: ambient loop, sound effects, global mute and volume (Web Audio API)
FE
9.6
End-of-story quizzes
FE
9.7
Motion polish and page transitions
FE
Phase 10 – Text-to-Speech Narration
ID
Task
Owner
10.1
Evaluate Kokoro TTS in the browser against a server-side provider (quality, size, cost, latency)
BE/FE
10.2
Pre-generate chapter audio and store it in R2 (recommended for consistency and speed)
BE
10.3
Build the narration player: play/pause, speed, chapter sync, captions
FE
10.4
Duck ambient audio while narration plays
FE
10.5
Add audioUrl and caption fields to StoryChapter and update the content pipeline
BE
Design the schema and audio manager with narration in mind from Phase 1 to avoid rework.
6. MVP Acceptance Criteria
1.  A new visitor can reach a story from the landing page in 3 clicks or fewer.
2.  Toggling Moon/Mars updates the scene, copy, stats and cards.
3.  All 4 launch equipment items have a story, a specification page and a 3D model.
4.  Every specification fact has a source link.
5.  Sign in, sign out and session persistence work.
6.  The site works on mobile, tablet and desktop, with a fallback when WebGL is unavailable.
7.  All core flows can be completed with a keyboard only; reduced motion is respected.
8.  Performance budgets below are met.
7. Performance Budgets
Item
Budget
Landing page JavaScript (initial, excluding the 3D chunk)
≤ 200 KB gzipped
3D chunk (Three.js, React Three Fiber, Drei; lazy-loaded)
≤ 400 KB gzipped
Planet textures
≤ 2 MB per body (compressed)
Equipment 3D model
≤ 5 MB each
Largest Contentful Paint
≤ 2.5 s
Interaction latency
≤ 200 ms
8. Testing Strategy
Level
Tools
Scope
Unit
Vitest or Jest
Utilities, Zod schemas, store logic
API
Supertest
Endpoint contracts, validation, auth
Component
Testing Library
Cards, toggle, specification grid, story chapters
End-to-end
Playwright
Sign in, toggle planet, open equipment, complete a story, view specifications
Visual
Playwright screenshots
Landing page against the reference at key breakpoints
Performance
Lighthouse CI
Landing page and a story page
Accessibility
axe plus manual screen-reader checks
All pages
9. Definition of Done
• Code reviewed and merged with passing CI.
• Matches the approved design at mobile, tablet and desktop.
• Meets accessibility criteria (keyboard, contrast, reduced motion).
• Tests added for new logic.
• Content reviewed for accuracy and age-appropriateness.
• API documented in Swagger.
• No regression in performance budgets.
10. Risks and Mitigations
Risk
Impact
Mitigation
3D asset creation is the largest effort
Delays MVP
Start 3D early (Phase 6 runs in parallel); adapt NASA public models; limit to 4 models
Heavy WebGL on school devices
Poor experience
Quality tiers, static fallback, lazy loading
Auth split between Next.js and Express
Complexity
Decide the approach and prototype it in Phase 1
Content volume and accuracy
Quality
Start content early; educator review; keep a source log
Scope creep (TTS, search, quizzes)
MVP slips
Keep these in post-MVP phases or behind feature flags
Child data and privacy
Legal
Early legal review; minimal data; guest browsing
Reference design differs from available content
Rework
Resolve the Perseverance/MOXIE question in Phase 1
Asset licensing
Legal
Record the licence for every asset; prefer public-domain NASA media
11. Where to Start
1.  Confirm launch content scope and the open questions in the PRD (task 1.1).
2.  Share the second reference design for the specification page (task 1.6).
3.  Create the repository, CI and environments (tasks 1.2–1.4).
4.  Prototype the planet scene to validate performance on target devices (task 3.2).
5.  Begin research and 3D asset sourcing in parallel (tasks 6.1 and 6.7).