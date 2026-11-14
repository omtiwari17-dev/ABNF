AFTERLIGHT
Technical Implementation Plan
Project: Interactive Moon and Mars Space Equipment Discovery Platform
Tagline: The stories humanity left beyond Earth.
1. Development Objective
Build an interactive web platform where users can explore human-made equipment left behind on the Moon and Mars, discover its mission history, view its location in a 3D environment, and experience its story through reading or cinematic audio narration.

Apollo 11 is an example dataset for the initial demonstration, not the limit of the platform. The architecture must support multiple missions across both destinations.
2. Technology Stack
Component	Technology
Frontend	Next.js, React, TypeScript
Styling	Tailwind CSS, shadcn/ui
Animation	Framer Motion
3D	Three.js, React Three Fiber, Drei
Backend	Node.js, Express.js, TypeScript
Database	PostgreSQL
ORM	Prisma
Validation	Zod
Text-to-Speech	Kokoro TTS (browser-side)
Audio	Web Audio API
Media storage	Cloudflare R2
Frontend hosting	Vercel
Backend hosting	Render or Railway


3. System Architecture
The application uses a modular monolith architecture with two independently deployed applications:
- apps/web — Next.js frontend.
- apps/api — Express.js backend.
PostgreSQL stores structured data. Cloudflare R2 stores large media assets such as 3D models, images, and audio files.

The frontend communicates with the backend through REST APIs. Three.js rendering, browser-side text-to-speech, and audio mixing run primarily in the browser.
High-level request flow
User / Browser
      |
      v
Next.js Frontend (Vercel)
      |
      | HTTPS / REST API / JSON
      v
Express.js Backend (Render / Railway)
      |
      +------> Prisma ORM ------> PostgreSQL (Neon)
      |
      +------> Cloudflare R2 (media asset references)

Browser-side experiences:
- Three.js / React Three Fiber: 3D rendering
- Kokoro TTS: narration generation
- Web Audio API: narration, ambience and effects mixing
4. Development Phases
Phase 1 — Project Foundation
Tasks
- Create the project repository.
- Initialize Next.js with TypeScript.
- Initialize Express.js with TypeScript.
- Configure PostgreSQL and Prisma.
- Configure environment variables.
- Establish frontend-to-backend communication.
- Create reusable API response and error-handling structures.
Deliverable: Working frontend and backend connected to the database.
Phase 2 — UI/UX and Design System
Tasks
- Create the dark, cinematic design system.
- Implement navigation and responsive layouts.
- Build the homepage hero.
- Create the Moon/Mars destination selector.
- Implement destination-specific routes.
- Add transitions between destinations.
Deliverable: Responsive homepage with a working Moon/Mars experience.
Phase 3 — Database and Backend APIs
Core database entities
- Destination
- Mission
- Equipment
- EquipmentEvent
- EquipmentAsset
- Story
- StoryChapter
- Source
- Evidence
Tasks
- Create the Prisma schema and migrations.
- Add destination and mission relationships.
- Create equipment records.
- Implement event timelines.
- Connect stories to missions and equipment.
- Connect evidence to source references.
- Implement filtering and search.
Initial API endpoints
Method	Endpoint	Purpose
GET	/api/v1/destinations	List Moon and Mars
GET	/api/v1/missions	List missions, optionally filtered by destination
GET	/api/v1/missions/:slug	Get mission details
GET	/api/v1/equipment	List and filter equipment
GET	/api/v1/equipment/:slug	Get equipment details
GET	/api/v1/equipment/:id/events	Get equipment timeline
GET	/api/v1/equipment/:id/evidence	Get supporting evidence
GET	/api/v1/stories/:id	Get story and chapters
GET	/api/v1/search	Search missions and equipment


Deliverable: Functional API that can serve information about multiple missions and destinations.
Phase 4 — Mission and Equipment Explorer
Tasks
- Build mission listing pages.
- Create individual mission detail pages.
- Build equipment cards and detail pages.
- Add destination, mission, and equipment filters.
- Display operational and physical status separately.
- Add historical timelines.
- Display evidence and source links.
Deliverable: Users can discover and investigate equipment through structured historical information.
Phase 5 — Interactive 3D Environment
Tasks
- Integrate Three.js using React Three Fiber.
- Load Moon and Mars 3D models.
- Implement camera controls and lighting.
- Add planetary surface locations.
- Load equipment GLB models.
- Add interactive equipment markers.
- Connect markers to equipment API records.
- Implement loading states and mobile performance optimizations.
Deliverable: Interactive planetary environment where users can discover equipment by selecting locations.
Phase 6 — Immersive Storytelling and Audio
Tasks
- Build story pages and chapter navigation.
- Implement Read Mode.
- Integrate browser-side Kokoro TTS.
- Add play, pause, stop, and seek controls.
- Add background ambience and sound effects.
- Use Web Audio API for audio mixing.
- Implement chapter-based playback.
- Add narration loading and error states.
- Keep the complete story transcript accessible.
Deliverable: One complete story that works in both reading and listening modes.
Phase 7 — Mission Expansion
Tasks
- Add additional verified lunar missions.
- Add verified Mars missions.
- Populate their equipment and historical events.
- Attach evidence and source references.
- Reuse the existing 3D and storytelling architecture.
Deliverable: Platform that supports multiple missions across both destinations.
Phase 8 — Testing and Deployment
Tasks
- Test all API endpoints.
- Validate database relationships.
- Test destination switching.
- Test equipment markers and 3D interactions.
- Test audio playback across supported browsers.
- Check mobile responsiveness.
- Optimize 3D models and media assets.
- Deploy frontend and backend.
- Configure production database and storage.
- Verify source links and historical claims.
Deliverable: Working, publicly accessible platform.
5. Recommended Project Structure
afterlight/
├── apps/
│   ├── web/
│   │   ├── public/
│   │   │   ├── models/
│   │   │   ├── images/
│   │   │   └── audio/
│   │   └── src/
│   │       ├── app/
│   │       ├── components/
│   │       │   ├── layout/
│   │       │   ├── planet/
│   │       │   ├── three/
│   │       │   ├── mission/
│   │       │   ├── equipment/
│   │       │   ├── story/
│   │       │   └── audio/
│   │       ├── hooks/
│   │       ├── services/
│   │       └── lib/
│   │
│   └── api/
│       ├── prisma/
│       └── src/
│           ├── config/
│           ├── routes/
│           ├── controllers/
│           ├── services/
│           ├── repositories/
│           ├── validators/
│           ├── middleware/
│           └── integrations/
│
└── packages/
    └── shared/
6. MVP Priorities
Must Have
1. Moon/Mars destination switching.
2. Multiple-mission-ready data model.
3. Mission and equipment discovery.
4. Equipment details and historical timeline.
5. One interactive 3D planetary environment.
6. One complete story with Read and Listen modes.
7. Evidence and source references.
Should Have
1. Interactive 3D environments for both destinations.
2. Multiple equipment markers.
3. Mission and equipment search.
4. Background ambience and sound effects.
5. Responsive mobile experience.
Future Enhancements
1. More planetary missions and equipment.
2. Advanced 3D surface reconstruction.
3. More languages and narration voices.
4. Educational quizzes.
5. Advanced mission comparisons.
7. Data Quality Requirements
- Every important historical claim should have a supporting source.
- Unknown equipment fates must remain marked as unknown.
- Inferred locations must not be displayed as confirmed coordinates.
- Operational status must not be confused with physical presence.
- 3D locations should be labelled as approximate when exact positioning is unavailable.
- Generated narration and recreated sound effects must not be represented as authentic historical recordings.
8. Final Expected Outcome
A cinematic, interactive Moon and Mars exploration platform where visitors can discover equipment left behind by humanity, explore its planetary environment, understand its historical significance, and experience its story through immersive narration.

AFTERLIGHT — The stories humanity left beyond Earth.