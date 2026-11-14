#Technology Stack

| Layer | Technology | Responsibility |
|---|---|---|
| Frontend | Next.js App Router + TypeScript | Website, routing, pages, and application UI |
| Styling | Tailwind CSS | Responsive styling and layout |
| UI Components | shadcn/ui | Reusable controls, dialogs, tabs, and sliders |
| 3D Rendering | Three.js + React Three Fiber + Drei | Planet scenes, equipment models, and interactive markers |
| 3D Asset Creation | Blender; GLB/GLTF formats | Create and optimize 3D models |
| UI Animation | Framer Motion | Page, component, and content transitions |
| Cinematic Animation | GSAP (optional) | More complex hero and scroll-based sequences |
| Backend | Node.js + Express.js + TypeScript | REST API and application logic |
| Validation | Zod | Runtime validation of API inputs |
| Database | PostgreSQL | Missions, equipment, events, stories, and evidence |
| ORM | Prisma | Database schema, migrations, and type-safe queries |
| API Documentation | Swagger / OpenAPI | API endpoint documentation and testing |
| Narration | Kokoro TTS in the browser, or another TTS provider | Generate spoken story narration |
| Audio Playback | HTML Audio + Web Audio API | Narration, ambience, effects, and volume mixing |
| File Storage | Cloudflare R2 or equivalent | Store audio, images, and 3D assets |
| Frontend Hosting | Vercel | Deploy the Next.js application |
| Backend Hosting | Render, Railway, or equivalent | Deploy the Express API |

Architecture High Level 

                         VISITOR
                            |
                            v
                    NEXT.JS FRONTEND
                  /         |          \
                 /          |           \
          3D EXPERIENCE   EXPRESS API   AUDIO PLAYER
          Three.js/R3F        |         TTS + Web Audio
                              |
                              v
                       ZOD VALIDATION
                              |
                              v
                   ROUTER / CONTROLLER
                              |
                              v
                         SERVICE LAYER
                              |
                              v
                       PRISMA ORM
                              |
                              v
                        POSTGRESQL

             AUDIO / IMAGES / 3D ASSETS
                              |
                              v
                       CLOUDFLARE R2