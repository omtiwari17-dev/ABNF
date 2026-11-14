# Project Overview — AFTERLIGHT: Space Archaeology

## 1. Project Background

Since the 1960s, NASA has left behind various types of space exploration hardware across the solar system — on the Moon, on Mars, and throughout deep space. This hardware includes rovers, landers, scientific instruments, and spacecraft that have either completed their missions, become inactive, or continue travelling beyond Earth.

Each piece of equipment has a unique purpose, engineering design, and mission history. More importantly, each has contributed to our understanding of space and the universe.

Our challenge is to create an interactive digital storytelling platform that introduces school-age space enthusiasts to these forgotten robotic explorers and the scientific discoveries they made possible.

The platform will combine interactive storytelling, 3D visualizations, historical mission data, and educational experiences to help users understand not only what these machines were, but also how they worked, what they discovered, and why their contributions still matter.

## 2. Technology Stack

| Layer | Technology | Responsibility |
|---|---|---|
| Frontend | Next.js App Router + TypeScript | Website, routing, pages, and application UI |
| Styling | Tailwind CSS | Responsive styling and layouts |
| UI Components | shadcn/ui | Reusable controls, dialogs, tabs, and sliders |
| 3D Rendering | Three.js + React Three Fiber + Drei | Planetary environments, equipment models, and interactive markers |
| 3D Asset Creation | Blender; GLB/GLTF formats | Creating and optimizing 3D models |
| UI Animation | Framer Motion | Page transitions, component animations, and content transitions |
| Cinematic Animation | GSAP (optional) | Advanced hero animations and scroll-based sequences |
| Backend | Node.js + Express.js + TypeScript | REST APIs and application logic |
| Validation | Zod | Runtime validation of API inputs |
| Database | PostgreSQL | Storing missions, equipment, events, stories, and evidence |
| ORM | Prisma | Database schema, migrations, and type-safe queries |
| API Documentation | Swagger / OpenAPI | API documentation and testing |
| Narration | Kokoro TTS in the browser, or another TTS provider | Generating spoken story narration |
| Audio Playback | HTML Audio + Web Audio API | Narration, ambient sounds, sound effects, and volume control |
| File Storage | Cloudflare R2 or equivalent | Storing audio, images, and 3D assets |
| Frontend Hosting | Vercel | Deploying the Next.js application |
| Backend Hosting | Render, Railway, or equivalent | Deploying the Express API |

## 3. Planned Features and Functional Requirements

### 3.1 Authentication

- Implement an interactive login and authentication experience using OAuth.
- Allow users to sign in through supported authentication providers.
- Provide a personalized experience for authenticated users.

### 3.2 Home Page / Explore Landing Page

- Create an immersive, visually engaging landing page featuring interactive 3D representations of the Moon and Mars.
- The design should follow the provided reference image.
- Allow users to switch between the Moon and Mars using an interactive toggle.
- Provide an engaging introduction to the platform and its purpose.
- Display relevant exploration statistics, such as the number of missions, equipment, stories, and available evidence.

### 3.3 Planet-Based Equipment Exploration

The equipment displayed on the Explore page should dynamically change based on the selected celestial body.

**When the Moon is selected:**

Display relevant lunar exploration hardware, including:

- Apollo Lunar Modules: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C
- Lunar Roving Vehicles (LRVs): https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C

**When Mars is selected:**

Display robotic explorers and scientific equipment associated with Mars exploration, including:

- Sojourner Rover: https://science.nasa.gov/mission/mars-pathfinder/
- Spirit and Opportunity Rovers: https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/

The equipment should be presented through visually engaging cards or interactive elements that allow users to explore individual missions and their associated hardware.

### 3.4 Interactive Storytelling (Core Feature)

Storytelling is the central component of this platform.

Each piece of equipment or robotic explorer should have its own dedicated, informative, and interactive story experience.

The storytelling experience should:

- Present the equipment's history, mission objectives, and purpose.
- Explain how the equipment was engineered and operated.
- Highlight important mission events, challenges, and scientific discoveries.
- Use scroll-based storytelling with interactive animations and visual transitions.
- Incorporate relevant images, diagrams, and 3D visualizations to make complex scientific concepts easier to understand.
- Establish a connection between the engineering of the hardware and the scientific knowledge humanity gained from its mission.

**Future Enhancement:**

Integrate a Text-to-Speech (TTS) module that allows users to listen to the stories through AI-generated narration.

### 3.5 Equipment Specification / Metadata Page

Each rover, spacecraft, or scientific instrument should have a dedicated specification page inspired by the second UI reference image.

This page should present structured technical and historical information about the selected equipment, including:

- Equipment name and mission name.
- Launch date and mission duration.
- Launch vehicle.
- Manufacturer and country/agency.
- Equipment type and primary purpose.
- Dimensions and weight.
- Power source.
- Scientific instruments and capabilities.
- Operational status.
- Landing location or final known location.
- Important mission milestones.
- Scientific contributions and discoveries.

The page should present technical information in a clean, organized, and visually engaging format, making it understandable to both beginners and space enthusiasts.

## 4. Overall Product Vision

AFTERLIGHT: Space Archaeology aims to transform the history of forgotten space exploration hardware into an interactive educational experience.

Rather than simply presenting historical facts and technical specifications, the platform will allow users to explore the machines, understand their engineering, experience their journeys, and discover the scientific knowledge they left behind.

The ultimate goal is to help school-age space enthusiasts develop a deeper appreciation for space exploration and the robotic explorers that made it possible.