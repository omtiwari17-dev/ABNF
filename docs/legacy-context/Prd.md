AFTERLIGHT: Space Archaeology – Product Requirements Document (PRD)
Version 1.0 · Status: Draft for review · Audience: Product, Design, Engineering, Content
1. Product Summary
AFTERLIGHT: Space Archaeology is an interactive digital storytelling platform that introduces school-age space enthusiasts to the robotic explorers and hardware NASA has left behind on the Moon, on Mars and in deep space. Instead of presenting a dry archive, the platform lets users explore 3D models, follow scroll-driven stories and inspect structured evidence, so they understand what each machine was, how it worked, what it discovered and why it still matters.
Tagline (from the landing page): “Discover the stories left behind.”
2. Goals and Non-Goals
2.1 Goals
1.  Make forgotten space hardware feel alive through immersive 3D and narrative.
2.  Teach engineering and science together: connect how a machine was built to what humanity learned from it.
3.  Be accessible and engaging for ages roughly 9–17, and still rewarding for adult space enthusiasts.
4.  Provide trustworthy, source-linked content (every fact traceable to NASA or other primary sources).
5.  Deliver a fast, polished experience on desktop and mobile.
2.2 Non-Goals (v1)
• Live mission telemetry or real-time data feeds.
• User-generated content, comments or social features.
• Native mobile apps (responsive web only).
• Full multi-language support (architecture should allow it later).
• AI-generated narration at launch (planned as a future enhancement).
3. Target Users
Persona
Description
Needs
Curious Student (primary)
Age 9–17, loves space, uses phone or school laptop
Simple language, visual and interactive content, short sessions
Teacher / Educator
Uses the site in class or assigns it as homework
Accurate, citable content; clear structure; classroom-safe
Space Enthusiast
Adult hobbyist or parent
Depth: specs, timelines, sources
Returning Member
Signed-in user
Saved progress, personalised recommendations
4. Scope Overview
Module
Priority
Release
Authentication (OAuth)
P0
MVP
Explore landing page with Moon/Mars toggle
P0
MVP
Planet-based equipment exploration
P0
MVP
Interactive storytelling (scroll-based)
P0
MVP
Equipment specification page
P0
MVP
Missions, Equipment and Evidence index pages
P1
MVP / v1.1
Search
P1
v1.1
Text-to-speech narration
P2
Future
Deep-space / additional bodies
P2
Future
5. Functional Requirements
5.1 Authentication
ID
Requirement
Priority
AUTH-1
Users can sign in with OAuth providers (recommended: Google, plus GitHub or Microsoft).
P0
AUTH-2
The “Sign In” button in the header opens a sign-in dialog; success returns the user to the page they were on.
P0
AUTH-3
Browsing, stories and specification pages work without signing in; sign-in unlocks personalisation.
P0
AUTH-4
Signed-in users see their avatar/name in the header and can sign out.
P0
AUTH-5
Personalisation: remember last selected planet, story progress and bookmarked equipment.
P1
AUTH-6
Minimal data collection (name, email, avatar). Child-privacy considerations must be reviewed (see Section 9).
P0
5.2 Home / Explore Landing Page
Based on the provided reference design.
ID
Requirement
Priority
HOME-1
Global header: logo (“AFTERLIGHT – Space Archaeology”), navigation (Explore, Missions, Equipment, Stories, Evidence), search icon and Sign In button.
P0
HOME-2
Hero with an interactive 3D planet (React Three Fiber) as a large horizon arc, with an atmospheric glow in the planet’s accent colour.
P0
HOME-3
Headline and sub-copy change with the selected body (e.g. “Discover the stories left behind on Mars”).
P0
HOME-4
Moon/Mars segmented toggle. Switching animates the 3D scene (texture, lighting, glow colour), the copy, the accent colour and the content below.
P0
HOME-5
“Start Exploring” call to action scrolls or navigates to the equipment section for the selected body.
P0
HOME-6
Statistics strip: number of missions, equipment, stories and evidence/sources, loaded from the API and animated on first view.
P0
HOME-7
“Featured Mission” card (e.g. Mars Perseverance) with image/3D render, short description and “Explore Mission” button.
P0
HOME-8
“Spotlight” card for a featured instrument or piece of equipment (e.g. MOXIE).
P0
HOME-9
Featured and Spotlight content is managed in the database and changes with the selected body.
P1
HOME-10
Graceful fallback to a static image if WebGL is unavailable or the device is low-powered.
P0
5.3 Planet-Based Equipment Exploration
ID
Requirement
Priority
EXP-1
The equipment list is filtered by the selected celestial body and updates without a full page reload.
P0
EXP-2
Moon: Apollo Lunar Modules and Lunar Roving Vehicles (LRVs) as launch content.
P0
EXP-3
Mars: Sojourner, Spirit and Opportunity as launch content.
P0
EXP-4
Each piece of equipment is shown as a card with image/3D preview, name, mission, year and status badge.
P0
EXP-5
Cards link to the equipment’s story and specification page.
P0
EXP-6
Optional interactive markers on the 3D planet showing landing sites; selecting one highlights the related card.
P1
EXP-7
Filters: mission, status (active, inactive, lost, retired), decade.
P2
5.4 Interactive Storytelling (Core Feature)
Every piece of equipment has its own story experience.
ID
Requirement
Priority
STORY-1
Scroll-driven narrative with distinct chapters: Origin → Engineering → Journey → Operations → Key Events and Challenges → Discoveries → Legacy.
P0
STORY-2
Each chapter supports text, images, diagrams, video/animation and an embedded 3D model view.
P0
STORY-3
Animated transitions between chapters (Framer Motion; GSAP optional for cinematic sequences).
P0
STORY-4
3D model viewer: rotate, zoom, and clickable hotspots that explain parts (e.g. wheels, antenna, instruments).
P0
STORY-5
Each story explicitly links an engineering feature to the scientific knowledge gained from it.
P0
STORY-6
Progress indicator and chapter navigation; progress saved for signed-in users.
P1
STORY-7
Reading level appropriate for school-age users; glossary tooltips for technical terms.
P1
STORY-8
Ambient audio and sound effects with a clear mute/volume control (muted by default).
P1
STORY-9
Quick comprehension checks (short quizzes) at the end of a story.
P2
STORY-10
Future: Text-to-speech narration (Kokoro TTS in browser or another provider) with play/pause, chapter sync and speed control.
P2
5.5 Equipment Specification / Metadata Page
Inspired by the second UI reference image.
ID
Requirement
Priority
SPEC-1
Display: equipment name, mission name, launch date, mission duration, launch vehicle.
P0
SPEC-2
Display: manufacturer, country/agency, equipment type, primary purpose.
P0
SPEC-3
Display: dimensions, mass, power source.
P0
SPEC-4
Display: scientific instruments and capabilities.
P0
SPEC-5
Display: operational status, landing location or final known location.
P0
SPEC-6
Display: milestone timeline and scientific contributions/discoveries.
P0
SPEC-7
Sources: each fact links to a source (NASA NSSDC, science.nasa.gov, etc.).
P0
SPEC-8
Beginner-friendly presentation: tooltips, unit conversion toggle (metric/imperial), “Explain simply” hints.
P1
SPEC-9
Call-to-action to open the equipment’s story; related equipment links.
P0
5.6 Supporting Pages
• Missions: list and detail of missions with their equipment.
• Equipment: global, filterable catalogue.
• Stories: index of all story experiences with progress for signed-in users.
• Evidence: gallery of images, documents and data with source attribution.
• Search: global search across missions, equipment and stories.
6. Content Requirements
Launch content set (MVP):
Body
Equipment
Primary source
Moon
Apollo Lunar Modules
NASA NSSDC (1969-059C)
Moon
Lunar Roving Vehicles
NASA NSSDC (1971-063C)
Mars
Sojourner (Mars Pathfinder)
science.nasa.gov
Mars
Spirit and Opportunity (MER)
science.nasa.gov
• Each item requires a full story, a specification record, at least 5 evidence items and a 3D model.
• All text is reviewed for scientific accuracy and age-appropriate language.
• NASA media is generally public domain, but each asset’s usage terms must be verified and recorded.
7. Non-Functional Requirements
Area
Requirement
Performance
Largest Contentful Paint under 2.5 s on a mid-range laptop; 3D scenes target 60 fps desktop / 30 fps mobile; 3D models in compressed GLB (Draco/KTX2), under about 5 MB per model.
Accessibility
WCAG 2.2 AA; keyboard navigation; alt text; transcripts/captions; respects reduced-motion preference; text alternative for 3D content.
Responsiveness
Fully usable from 360 px mobile to large desktop.
Browser support
Latest two versions of Chrome, Edge, Safari and Firefox.
Security
OAuth only (no password storage); input validation with Zod; rate limiting; HTTPS; secure cookies.
Reliability
99.5% uptime target; CDN caching for static assets.
SEO
Server-rendered pages, structured metadata and Open Graph images for each story and equipment page.
Observability
Error tracking, web-vitals monitoring and privacy-friendly analytics.
API docs
Swagger/OpenAPI published for all endpoints.
8. Technical Overview
Layer
Technology
Frontend
Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui
3D
Three.js, React Three Fiber, Drei; Blender assets in GLB/GLTF
Animation
Framer Motion; GSAP (optional)
Backend
Node.js, Express.js, TypeScript, Zod, Swagger/OpenAPI
Data
PostgreSQL with Prisma
Audio
HTML Audio, Web Audio API; Kokoro TTS (future)
Storage
Cloudflare R2 (audio, images, 3D assets)
Hosting
Vercel (frontend); Render or Railway (backend)
8.1 Core Data Entities
• User – id, name, email, avatar, provider, createdAt
• CelestialBody – id, name (Moon/Mars), theme colours, texture assets
• Mission – id, name, agency, bodyId, launchDate, endDate, status, summary
• Equipment – id, missionId, name, type, manufacturer, mass, dimensions, power source, status, landing site, model URL, slug
• Instrument – id, equipmentId, name, purpose
• Story – id, equipmentId, title, status, estimated reading time
• StoryChapter – id, storyId, order, title, body, media references, hotspot data
• MissionEvent – id, missionId/equipmentId, date, title, description
• Evidence – id, type (image, document, data), title, sourceUrl, license, attribution, relations
• Bookmark / StoryProgress – userId, targetId, progress
8.2 Indicative API Endpoints
• GET /api/bodies · GET /api/bodies/:slug/equipment
• GET /api/stats
• GET /api/missions · GET /api/missions/:slug
• GET /api/equipment · GET /api/equipment/:slug
• GET /api/equipment/:slug/story
• GET /api/evidence
• GET /api/featured?body=mars
• GET/PUT /api/me/progress · POST /api/me/bookmarks (authenticated)
9. Risks and Open Questions
#
Item
Notes / Recommendation
1
Child privacy (COPPA / GDPR-K)
OAuth for under-13 users needs legal review; consider a guest-first model and parent/teacher consent flow.
2
Reference design vs. scope
The reference shows Mars Perseverance and MOXIE, but the launch equipment list covers Sojourner, Spirit and Opportunity. Decide whether Perseverance and MOXIE are in MVP content, or swap the featured cards to match.
3
“Forgotten” theme vs. active rovers
Perseverance is still active; confirm the editorial framing (“left behind” vs. “legacy”).
4
Stats strip
The reference shows “Stories” without a number; decide the metric (e.g. “6 Stories”).
5
Headline copy
“Discover the stories left behind on the Mars.” has an extra “the”; use “on Mars” and “on the Moon”.
6
3D asset effort
Blender models are the largest cost and schedule risk; consider NASA public 3D models as a starting point.
7
Mobile performance
Heavy WebGL on low-end phones; needs quality tiers and a static fallback.
8
Content accuracy
Needs a named reviewer (educator or domain expert) before publishing.
9
Second UI reference
Specification page reference image was mentioned but not yet provided; design must be confirmed.
10
Final auth providers
Choose providers suitable for school accounts (Google Workspace for Education).
10. Success Metrics
Metric
Target (first 3 months)
Landing-to-story click-through
≥ 35%
Story completion rate
≥ 40%
Average session duration
≥ 4 minutes
Moon/Mars toggle usage
≥ 50% of sessions
Sign-in conversion
≥ 10% of returning visitors
Lighthouse (performance / accessibility)
≥ 85 / ≥ 95
Educator satisfaction (survey)
≥ 4.2 / 5
11. Release Plan
• MVP (Alpha → Beta): Auth, landing page, Moon/Mars equipment exploration, 4 equipment stories, specification pages, evidence gallery.
• v1.1: Search, bookmarks and progress, filters, quizzes, mobile refinements.
• v1.2 / Future: TTS narration, additional bodies and deep-space missions (Voyager, Pioneer, etc.), teacher resources.