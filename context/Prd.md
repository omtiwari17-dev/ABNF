1. Product Summary
Afterlight is an interactive web platform that helps people discover human-made equipment left behind on the Moon and Mars. Users can explore destinations, browse missions, investigate equipment and its history, view equipment in interactive planetary environments, and experience curated stories through reading or cinematic listening.

The platform combines mission information, equipment records, historical timelines, evidence, 3D visualization, and audio storytelling.

Apollo 11 is an example mission for initial development and demonstration, not the limit of the product. The product must support multiple missions and equipment records across both the Moon and Mars.
2. Problem Statement
Information about equipment left on the Moon and Mars is distributed across mission archives, reports, technical documents, research publications, and other sources. It can be difficult for a general audience to find, understand, and connect this information.

Traditional text-heavy resources may not communicate the location, purpose, history, and significance of this equipment in an engaging way.

Afterlight addresses this by organizing mission and equipment information into an explorable experience combining interactive visualization, accessible explanations, storytelling, and traceable sources.
3. Product Vision
Make the history of human activity on the Moon and Mars explorable by connecting each discoverable object to its mission, purpose, timeline, story, and supporting evidence.
4. Goals and Success Criteria
4.1 Product goals
1. Help users discover equipment associated with multiple Moon and Mars missions.
2. Make mission and equipment histories understandable to non-specialists.
3. Provide an interactive way to explore planetary locations and equipment.
4. Offer both reading and listening experiences for selected stories.
5. Make historical claims traceable to sources.
6. Build a data model that supports adding missions and equipment without redesigning the product.
4.2 MVP success criteria
The MVP is functionally complete when:
- Users can navigate between Moon and Mars.
- Destination selection updates destination-specific content, not only the hero image.
- Users can browse missions and open mission detail pages.
- Users can browse equipment and open equipment detail pages.
- Equipment details show purpose, mission relationship, status information, and known history.
- Users can explore at least one working 3D planetary scene and select equipment markers.
- Users can read at least one complete story.
- Users can listen to that story using narration and available audio layers.
- Important historical claims have source references.
- The experience works on common desktop and mobile viewport sizes.
Numeric targets should be set after usability testing and baseline measurement.
5. Target Users
User type	Needs
Space enthusiasts	Discover missions, equipment, and lesser-known mission history
Students	Understand space exploration through accessible explanations and visuals
Educators	Find structured, source-backed material that can support learning
General visitors	Explore an engaging experience without specialist knowledge
Researchers and informed enthusiasts	Follow references and distinguish confirmed facts from uncertainty


6. Product Principles
- Evidence first: Important factual claims should link to supporting sources.
- Visible uncertainty: Unknown or inferred information must not be presented as confirmed.
- Destination-aware: Moon and Mars must have distinct content and context.
- Progressive disclosure: Reveal detailed information without overwhelming visitors.
- Accessible storytelling: Reading remains available when audio is offered.
- Reusable data model: New missions and equipment should be added through data, not one-off page implementations.
- Honest visualization: Approximate locations and illustrative 3D assets must be labelled appropriately.
7. Scope
7.1 MVP — In scope
1. Moon and Mars destination selection.
2. Destination landing/exploration pages.
3. Mission listing and mission detail pages.
4. Equipment listing and equipment detail pages.
5. Equipment event timelines.
6. Source and evidence references.
7. At least one interactive 3D planetary scene with selectable equipment markers.
8. Read Mode for stories.
9. Listen Mode for at least one story, with narration controls and optional ambience/effects.
10. Responsive layouts and basic accessibility.
11. Search or filtering across available mission and equipment records, if time permits after the core flow.
7.2 Later enhancements
- Broader coverage of lunar and Mars missions.
- More complete 3D surface reconstructions.
- More equipment models and geographically accurate placement.
- Advanced mission comparison.
- Additional languages and narration voices.
- Educational quizzes and guided learning paths.
- User accounts, bookmarks, and saved collections.
- Community contributions or editorial tools, subject to moderation and verification design.
7.3 Out of scope for the initial MVP
- Real-time spacecraft tracking.
- Live control of spacecraft or scientific instruments.
- Claims that the platform provides a complete inventory of every object left on the Moon or Mars.
- User-generated historical claims without an editorial verification process.
- Native mobile applications.
- Complex social features.
- Microservices or distributed event infrastructure.
8. Information Architecture
8.1 Primary navigation
- Explore
- Missions
- Equipment
- Stories
- Evidence / Sources
8.2 Suggested routes
Route	Purpose
/	Cinematic homepage and destination selection
/explore/moon	Moon exploration experience
/explore/mars	Mars exploration experience
/missions	Mission discovery
/missions/[slug]	Mission detail
/equipment	Equipment discovery
/equipment/[slug]	Equipment detail
/stories/[slug]	Story with Read and Listen modes
/sources/[id]	Source detail or external source destination


Destination-specific URLs should be shareable and directly loadable.
9. Functional Requirements
Priority definitions: P0 = required for the MVP core experience; P1 = important if time permits; P2 = future enhancement.
FR-01: Destination selection — P0
Users must be able to select Moon or Mars.

Requirements
- Provide a visible destination selector.
- Selecting a destination updates the URL or route.
- Destination-specific missions, equipment, stories, and 3D content update together.
- Direct navigation to a destination URL loads the correct destination.
- Preserve the selected destination when navigating within that destination's experience where appropriate.
Acceptance criteria
- Selecting Moon opens the Moon experience.
- Selecting Mars opens the Mars experience.
- The active destination is visually clear.
- Refreshing a destination URL retains the correct destination.
- Destination-specific content is not mixed incorrectly.
FR-02: Mission discovery — P0
Users must be able to browse missions associated with a destination.

Requirements
- Show mission name, destination, summary, and relevant imagery when available.
- Allow users to open a mission detail page.
- Mission detail should show available dates, objectives, overview, and associated equipment.
- Missing information should be omitted or labelled unavailable rather than fabricated.
Acceptance criteria
- A user can reach a mission from its destination page or mission listing.
- A mission detail page displays its associated equipment.
- Mission content is loaded from the backend data source.
FR-03: Equipment discovery — P0
Users must be able to discover equipment associated with missions.

Requirements
- Show equipment name, type, associated mission, short description, and available image/model.
- Support filtering by destination and mission.
- Equipment detail must show purpose, mission relationship, history, and available location information.
- Distinguish operational status from physical status and fate confidence.
Acceptance criteria
- A user can open an equipment detail page from a list or 3D marker.
- The detail page identifies the associated mission.
- Unknown information is clearly represented as unknown.
- Status fields are not combined into one ambiguous status.
FR-04: Historical timeline — P0
Users must be able to understand important events in an equipment's history.

Requirements
- Display dated events where dates are known.
- Support event types such as deployment, activation, operation, shutdown, movement, and later discovery.
- Label approximate dates or uncertain event details.
- Link events to relevant evidence where available.
Acceptance criteria
- Events appear in chronological order when dates permit.
- Approximate or uncertain dates are identified.
- The timeline does not imply events unsupported by sources.
FR-05: Interactive 3D exploration — P0 for one scene; P1 for both destinations
Users must be able to explore a 3D planetary environment and select equipment markers.

Requirements
- Render a planetary scene using Three.js and React Three Fiber.
- Provide basic camera interaction such as orbit, zoom, and pan where suitable.
- Display selectable markers for equipment with supported location data.
- Selecting a marker opens a summary or equipment detail view.
- Identify approximate locations as approximate.
- Provide a useful fallback if 3D assets fail to load or the device cannot render the scene.
Acceptance criteria
- At least one destination scene loads successfully.
- A marker can be selected using mouse or touch.
- Selecting a marker shows the correct equipment record.
- Equipment information remains accessible without 3D.
FR-06: Story experience — Read Mode — P0
Users must be able to read curated stories related to missions and equipment.

Requirements
- Organize stories into chapters or sections.
- Provide readable typography and clear chapter navigation.
- Include relevant images or visual material where available.
- Link important claims to evidence or sources.
- Keep the transcript available regardless of audio support.
Acceptance criteria
- A user can open a story and read all available chapters.
- Chapter navigation works.
- Story text remains accessible when audio is unavailable.
FR-07: Story experience — Listen Mode — P0 for a working basic version
Users must be able to listen to a story rather than only hear a flat reading of the page.

Requirements
- Provide play, pause, resume, stop, and seek controls where supported.
- Generate narration using browser-side Kokoro TTS or use approved pre-generated narration assets.
- Support optional ambience and sound effects.
- Mix audio layers using the Web Audio API where appropriate.
- Synchronize chapter or paragraph progress with playback where feasible.
- Provide loading, unsupported-browser, and error states.
- Provide separate volume controls for narration and ambience/effects if included.
- Do not autoplay sound without user interaction.
Acceptance criteria
- A user can start and pause narration.
- Audio playback does not hide or remove the readable story.
- Audio failures do not prevent access to story text.
- Recreated sound effects are not represented as authentic NASA recordings unless provenance is verified.
FR-08: Evidence and sources — P0
Users must be able to inspect the basis for important historical claims.

Requirements
- Store source title, publisher/organization, URL, source type, and relevant publication details when known.
- Link evidence records to one or more sources.
- Allow claims to be marked confirmed, inferred, disputed, or unknown as appropriate to the editorial model.
- Make source links visible from relevant equipment, event, and story views.
Acceptance criteria
- Important claims have at least one supporting reference before publication.
- Users can open the referenced source.
- Unsupported claims are not presented as established facts.
- Uncertainty is visible in the interface.
FR-09: Search and filtering — P1
Users should be able to find missions and equipment.

Requirements
- Search by mission or equipment name.
- Filter by destination.
- Where data supports it, filter by equipment type, mission, or status.
- Show a useful empty state when there are no results.
Acceptance criteria
- Search results link to the correct detail pages.
- Combined filters do not return records from the wrong destination.
10. Data Requirements
10.1 Core entities
Entity	Purpose
Destination	Moon or Mars
Mission	A mission associated with a destination
Equipment	A human-made object or instrument associated with a mission
EquipmentEvent	A dated or approximate event in an equipment lifecycle
EquipmentAsset	Image, 3D model, or other media reference
Story	Curated narrative related to a mission or equipment
StoryChapter	Ordered sections of a story
Source	A document, report, publication, or trusted reference
Evidence	A claim or factual assertion linked to supporting sources


10.2 Important equipment fields
Suggested fields include:
- name
- slug
- description
- equipmentType
- missionId
- operationalStatus
- physicalStatus
- fateConfidence
- latitude and longitude, when supported
- locationAccuracy
- lastVerifiedAt
The exact schema should be finalized during database design.
10.3 Status definitions
- Operational status: Whether the equipment is functioning or was functioning during a stated period.
- Physical status: Whether its physical presence or location is known.
- Fate confidence: Whether its eventual fate is confirmed, inferred, or unknown.
These fields must remain separate. A device ceasing transmission does not establish that the physical object disappeared.
11. UX and Visual Requirements
- Use a dark, cinematic visual language.
- Use large, clear typography and restrained warm-orange accents.
- Keep navigation minimal and destination selection easy to find.
- Use strong planetary imagery without sacrificing text readability.
- Make the active Moon/Mars destination unmistakable.
- Use transitions to support orientation, not delay navigation.
- Provide loading, empty, and error states.
- Ensure controls have clear labels and visible focus states.
- Respect reduced-motion preferences.
- Keep core information usable on smaller screens.
12. Non-Functional Requirements
Performance
- Lazy-load 3D scenes and large media.
- Optimize GLB models, textures, and audio assets.
- Avoid loading both planetary scenes when only one is needed.
- Show loading feedback for large assets.
- Keep essential mission and equipment information available if 3D loading is slow.
Accessibility
- Support keyboard navigation for primary controls.
- Provide text alternatives for meaningful images.
- Ensure sufficient text and control contrast.
- Provide captions or readable transcripts for narrated content.
- Respect reduced-motion settings.
- Do not rely on color alone to communicate status.
Reliability
- Provide API error handling and frontend fallbacks.
- Handle missing or unavailable media assets.
- Validate incoming data and query parameters.
- Keep source URLs and factual records maintainable.
Security
- Keep database credentials and private keys on the server.
- Validate and sanitize user-controlled input.
- Apply appropriate CORS and security headers.
- Rate-limit public API endpoints where appropriate.
- Do not expose storage credentials in browser code.
Compatibility
- Support current mainstream desktop and mobile browsers, subject to testing.
- Provide a non-3D fallback for devices that cannot run the interactive scene.
- Test browser-side TTS capability and provide a fallback reading experience.
13. Analytics and Product Measurement
For the MVP, measure a small set of privacy-conscious product events:
- Destination selected.
- Mission detail opened.
- Equipment detail opened.
- 3D marker selected.
- Story opened.
- Read Mode used.
- Listen Mode started, paused, or completed.
- Source link opened.
Potential success measures:
- Percentage of visitors who reach a mission or equipment detail page.
- Percentage of equipment detail visits that open a source.
- Story starts and completion rates.
- Listen Mode usage and playback completion.
- Task success in short usability tests.
Set numeric targets after collecting baseline data. Avoid collecting unnecessary personal information.
14. Dependencies and Risks
Risk / dependency	Impact	Mitigation
Historical data is fragmented	Incomplete or inconsistent records	Curate a small verified dataset first
Equipment fate is uncertain	Risk of misleading users	Separate status and confidence fields
Exact surface coordinates are unavailable	Inaccurate 3D placement	Label approximate positions
3D assets are large	Slow loading and poor mobile performance	Optimize models and lazy-load scenes
Browser TTS performance varies	Inconsistent listening experience	Test target devices and retain Read Mode
Audio assets have licensing restrictions	Publication or competition risk	Verify licenses and attribution requirements
Scope expands too quickly	Incomplete MVP	Prioritize one end-to-end workflow, then expand


15. MVP Release Plan
Release 1 — Foundation
- Repository and application setup.
- Database and API foundation.
- Homepage and destination switching.
- Initial design system.
Release 2 — Discovery
- Mission listing and detail.
- Equipment listing and detail.
- Historical events and evidence links.
Release 3 — Immersive experience
- One working 3D planetary scene.
- Selectable equipment markers.
- One complete story in Read and Listen modes.
Release 4 — Expansion and polish
- Add the second destination's initial curated experience.
- Add more verified mission and equipment records.
- Responsive and accessibility improvements.
- Performance testing and deployment.
The order can be adjusted to the hackathon schedule, but complete the core end-to-end user journey before expanding the dataset.
16. Key User Stories
1. As a visitor, I want to choose the Moon or Mars so that I can explore the destination I am interested in.
2. As a visitor, I want to browse missions so that I can understand which missions explored that destination.
3. As a visitor, I want to select equipment so that I can learn what it was designed to do.
4. As a visitor, I want to see an equipment timeline so that I can understand what happened over time.
5. As a visitor, I want to explore a 3D surface and select markers so that I can connect equipment records with planetary locations.
6. As a visitor, I want to read a story or listen to it so that I can choose how I experience the history.
7. As a curious learner, I want to open sources so that I can verify important claims.
8. As a visitor using a mobile device, I want a usable alternative when 3D or browser narration is unavailable.
17. Open Questions
- Which missions will be included in the first public dataset for each destination?
- Which 3D planetary assets and equipment models can be used with suitable licensing?
- Will Listen Mode generate narration on-device for all stories, use pre-generated audio, or support both?
- Which sources will be preferred for mission and equipment records?
- How much geographic precision is available for each equipment marker?
- Is a content-management interface needed for the hackathon, or will the initial dataset be maintained directly in the database?
Product Definition
Afterlight is a Moon and Mars equipment discovery and storytelling platform. Its core experience connects:

Destination → Mission → Equipment → Events → Story → Evidence

The platform is not limited to Apollo 11 or any single mission. Its data model, APIs, and user experience must support the addition of further verified missions and equipment across both destinations.