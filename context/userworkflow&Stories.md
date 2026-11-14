This document describes how visitors move through Afterlight, the actions they can take, and the user stories that guide product development.

Afterlight helps visitors explore human-made equipment left behind on the Moon and Mars. They can discover destinations and missions, investigate equipment, explore supported locations in 3D, follow historical events, read or listen to stories, and inspect evidence.

Apollo 11 may be used as an initial example dataset. The workflows and stories are designed to support multiple missions across both destinations.
2. User Roles
User role	Description	Main goal
Explorer	General visitor or space enthusiast	Discover equipment and stories
Learner	Student or curious visitor	Understand missions and scientific history
Educator	Teacher or science communicator	Find accessible, source-backed information
Evidence-focused visitor	Researcher or detail-oriented visitor	Inspect sources and uncertainty


The MVP is primarily a public, read-only experience. Content administration is not included in the visitor workflows unless added as a later feature.
3. Primary Navigation Model
Home
 |
 +--> Choose Moon
 |     |
 |     +--> Moon Explore
 |            +--> Browse Missions
 |            |      +--> Mission Details
 |            |              +--> Related Equipment
 |            |
 |            +--> Explore 3D Surface
 |            |      +--> Select Equipment Marker
 |            |              +--> Equipment Details
 |            |
 |            +--> Browse Stories
 |                   +--> Read Story
 |                   +--> Listen to Story
 |
 +--> Choose Mars
       |
       +--> Mars Explore
              +--> Browse Missions
              |      +--> Mission Details
              |              +--> Related Equipment
              |
              +--> Explore 3D Surface
              |      +--> Select Equipment Marker
              |              +--> Equipment Details
              |
              +--> Browse Stories
                     +--> Read Story
                     +--> Listen to Story

Shared paths:
Equipment Details --> Timeline --> Evidence / Sources
Search --> Mission Details or Equipment Details
4. End-to-End User Workflows
Workflow 1 — First-time visitor discovers a destination
Goal: Help a new visitor understand the product and begin exploring.

Entry point: Homepage

Flow
1. Visitor opens the Afterlight homepage.
2. Visitor sees the product introduction and Moon/Mars destination selector.
3. Visitor chooses Moon or Mars.
4. The application navigates to the selected destination.
5. The destination page displays its introduction, available missions, featured equipment, stories, and 3D exploration entry point.
6. Visitor chooses what to explore next.
Expected result: The visitor reaches a destination-specific experience and understands the available exploration paths.

Alternative and error paths
- If destination content is unavailable, show a clear empty or coming-soon state.
- If a destination route is opened directly, load that destination without requiring a homepage visit.
- If destination data fails to load, show an error state with a retry action.
Workflow 2 — Visitor explores missions
Goal: Help visitors discover missions associated with a destination.

Entry point: Destination page or Missions navigation.

Flow
1. Visitor opens the mission listing.
2. Visitor views available mission cards.
3. Visitor optionally filters by destination or searches by mission name.
4. Visitor selects a mission.
5. The mission detail page displays its overview, objectives, available dates, milestones, and related equipment.
6. Visitor selects an equipment item or returns to the mission listing.
Expected result: The visitor understands the mission and can continue into its equipment records.

Alternative and error paths
- If no missions match a filter, show an empty state and allow the visitor to clear filters.
- If mission details are incomplete, show only verified available fields.
- If a mission slug is invalid, show a not-found page.
Workflow 3 — Visitor investigates equipment
Goal: Explain what an object is, why it was deployed, and what is known about its history.

Entry point: Mission detail, equipment listing, search result, or 3D marker.

Flow
1. Visitor selects an equipment item.
2. The equipment detail page displays its name, type, description, and associated mission.
3. Visitor reviews its purpose and available location information.
4. Visitor checks operational status, physical status, and fate confidence.
5. Visitor explores the equipment timeline.
6. Visitor opens related stories or evidence sources.
Expected result: The visitor understands the equipment's purpose and known history without confusing operational status with physical fate.

Alternative and error paths
- If the object's location is approximate, label it as approximate.
- If its fate is unknown, state that it is unknown rather than guessing.
- If no timeline events are verified, explain that a timeline is not currently available.
- If no 3D model exists, show available images or a text-only detail view.
Workflow 4 — Visitor explores the 3D planetary environment
Goal: Let visitors discover equipment spatially.

Entry point: Destination page or Explore 3D action.

Flow
1. Visitor opens the 3D environment for the selected destination.
2. The scene loads the planetary surface and available equipment markers.
3. Visitor rotates, pans, or zooms the scene.
4. Visitor selects an equipment marker.
5. A summary panel displays the equipment name and a short description.
6. Visitor opens the full equipment detail page.
7. Visitor returns to the scene and selects another marker.
Expected result: The visitor connects equipment records with their planetary context.

Alternative and error paths
- If the scene is loading, show progress or a loading state.
- If a model fails to load, preserve access to the equipment list and detail pages.
- If a device cannot support the 3D experience, offer a list or map-style fallback where available.
- If a marker represents an approximate location, make that uncertainty visible.
- Do not place equipment at exact coordinates unless the data supports that precision.
Workflow 5 — Visitor reads a story
Goal: Present mission and equipment history as an understandable narrative.

Entry point: Stories listing, mission page, or equipment detail page.

Flow
1. Visitor opens a story.
2. The story introduction explains the subject and context.
3. Visitor reads the story chapters or sections.
4. Visitor moves between chapters.
5. Visitor follows supporting source links where available.
6. Visitor can switch to Listen Mode or return to the related mission/equipment page.
Expected result: The visitor understands the story and can inspect supporting references.

Alternative and error paths
- If a chapter has no supporting image, retain a readable text layout.
- If a source link is unavailable, indicate that the reference cannot currently be opened.
- If a story is incomplete, do not present it as a completed experience.
Workflow 6 — Visitor listens to a story
Goal: Provide a cinematic listening experience while keeping the story accessible as text.

Entry point: Story page, Listen Mode control.

Flow
1. Visitor opens a story and selects Listen.
2. The player prepares narration using browser-side TTS or an approved audio asset.
3. The visitor presses Play.
4. Narration begins.
5. Optional ambience and contextual sound effects are mixed at appropriate points.
6. The visitor can pause, resume, seek, adjust supported volume controls, or move between chapters.
7. The visitor stops playback or reaches the end of the story.
8. The readable transcript remains available throughout.
Expected result: The visitor experiences the story through narration and optional sound design rather than being forced to read a long paragraph.

Alternative and error paths
- If TTS is unsupported or fails, offer the text transcript and any available pre-generated narration.
- If audio assets fail to load, continue narration without those layers where possible.
- Do not autoplay audio before user interaction.
- Provide clear loading feedback when a TTS model must be initialized or downloaded.
- Clearly distinguish designed or recreated effects from authentic historical recordings.
Workflow 7 — Visitor verifies a historical claim
Goal: Let visitors understand where information comes from and how certain it is.

Entry point: Evidence link on equipment, event, mission, or story page.

Flow
1. Visitor sees a factual claim or timeline event.
2. Visitor selects its source or evidence reference.
3. The interface displays source metadata where available.
4. Visitor opens the original document or publication.
5. Visitor returns to the relevant claim.
Expected result: The visitor can trace important information to its supporting reference and understand uncertainty.

Alternative and error paths
- If a source is unavailable, show its title and available bibliographic details.
- If evidence is incomplete, label the claim accordingly.
- Do not present an inferred conclusion as a confirmed fact.
Workflow 8 — Visitor searches for an object or mission
Goal: Help visitors reach relevant content quickly.

Entry point: Search control.

Flow
1. Visitor enters a mission or equipment name.
2. The application searches available records.
3. Results are grouped or labelled as missions and equipment.
4. Visitor selects a result.
5. The corresponding detail page opens.
Expected result: The visitor reaches the relevant record without manually browsing every destination.

Alternative and error paths
- If no results match, show a helpful empty state.
- If the query is empty, do not run an unnecessary search.
- Where possible, retain the selected destination as a search filter.
5. User Stories
Priority:
- P0: Required for the MVP.
- P1: Important if time permits.
- P2: Future enhancement.
Epic A — Destination discovery
ID	User story	Priority
US-01	As a visitor, I want to choose the Moon or Mars so that I can explore the destination I am interested in.	P0
US-02	As a visitor, I want the selected destination to update missions, equipment, stories, and 3D content so that the experience remains consistent.	P0
US-03	As a visitor, I want to open a destination directly using its URL so that I can share or revisit it.	P0
US-04	As a visitor, I want to understand what I can explore on a destination page so that I can choose my next action.	P0


Epic B — Mission discovery
ID	User story	Priority
US-05	As a visitor, I want to browse missions for a destination so that I can discover exploration history.	P0
US-06	As a visitor, I want to view mission details so that I can understand its objectives and milestones.	P0
US-07	As a visitor, I want to see equipment associated with a mission so that I can investigate what it left behind.	P0
US-08	As a visitor, I want to search or filter missions so that I can find a specific mission more quickly.	P1


Epic C — Equipment discovery
ID	User story	Priority
US-09	As a visitor, I want to browse equipment records so that I can discover objects left on the Moon and Mars.	P0
US-10	As a visitor, I want to see an equipment item's purpose and associated mission so that I understand why it was sent.	P0
US-11	As a visitor, I want to see its historical timeline so that I can understand what happened over time.	P0
US-12	As a visitor, I want operational status and physical status shown separately so that I do not mistake a shutdown for physical disappearance.	P0
US-13	As a visitor, I want uncertain or unknown information labelled clearly so that I can distinguish evidence from assumptions.	P0
US-14	As a visitor, I want to filter equipment by destination or mission so that I can narrow my exploration.	P1


Epic D — 3D exploration
ID	User story	Priority
US-15	As a visitor, I want to explore a 3D planetary environment so that I can experience the destination spatially.	P0
US-16	As a visitor, I want to select equipment markers so that I can discover objects directly from the scene.	P0
US-17	As a visitor, I want a marker to open the correct equipment information so that I can move from exploration to learning.	P0
US-18	As a visitor, I want approximate locations identified so that I do not mistake illustrative placement for surveyed coordinates.	P0
US-19	As a mobile visitor, I want an alternative to the 3D scene if my device cannot render it smoothly so that I can still access the information.	P1


Epic E — Storytelling
ID	User story	Priority
US-20	As a visitor, I want to read a curated story so that I can understand the human and scientific context.	P0
US-21	As a visitor, I want stories divided into chapters so that I can follow them more easily.	P0
US-22	As a visitor, I want to switch between Read and Listen modes so that I can choose how to experience a story.	P0
US-23	As a listener, I want to play, pause, resume, stop, and seek narration so that I can control playback.	P0
US-24	As a listener, I want optional ambience and sound effects so that the story feels more immersive.	P1
US-25	As a listener, I want narration progress to follow the story chapters so that I know where I am.	P1
US-26	As a visitor, I want the transcript to remain available if audio fails so that I can still access the story.	P0


Epic F — Evidence and trust
ID	User story	Priority
US-27	As a visitor, I want important claims linked to sources so that I can verify the information.	P0
US-28	As a visitor, I want to see whether information is confirmed, inferred, or unknown so that I can judge its reliability.	P0
US-29	As a visitor, I want to open the original source so that I can read more detail.	P0


Epic G — Search and usability
ID	User story	Priority
US-30	As a visitor, I want to search for missions and equipment so that I can find a specific subject.	P1
US-31	As a visitor, I want clear loading, empty, and error states so that I understand what is happening.	P0
US-32	As a keyboard user, I want to navigate the main experience without a mouse so that I can use the platform accessibly.	P1
US-33	As a visitor, I want the website to work on mobile and desktop so that I can explore on my preferred device.	P0


6. Acceptance Criteria for the Core User Journey
The MVP's main journey is:

Choose destination → Browse mission → Select equipment → Explore history and evidence → Read or listen to a story.

This journey is accepted when:
1. The visitor can choose Moon or Mars.
2. The selected destination displays the correct mission catalogue.
3. The visitor can open a mission and see its associated equipment.
4. The visitor can open an equipment record and see its purpose and known status.
5. The visitor can review historical events and supporting references.
6. The visitor can open a related story.
7. The visitor can read the story or start Listen Mode.
8. Audio controls work, or a clear fallback is provided.
9. The visitor can navigate back to the mission or destination without losing context.
10. Unknown or approximate information is labelled honestly.
7. Suggested MVP Test Scenarios
Test ID	Scenario	Expected result
TC-01	Select Moon from homepage	Moon route and content load
TC-02	Select Mars from homepage	Mars route and content load
TC-03	Refresh /explore/mars	Mars remains selected
TC-04	Open a mission from destination page	Correct mission detail appears
TC-05	Open equipment from mission page	Correct equipment detail appears
TC-06	Select equipment marker in 3D	Correct equipment summary appears
TC-07	Open equipment timeline	Events appear in supported chronological order
TC-08	Open an evidence reference	Source destination or source details appear
TC-09	Start and pause Listen Mode	Narration responds to controls
TC-10	Disable or fail audio	Readable story remains available
TC-11	Open an unknown or approximate record	Uncertainty is clearly communicated
TC-12	Use the experience on a narrow viewport	Main discovery journey remains usable


8. Recommended Build Order
1. Implement destination selection and destination routes.
2. Implement mission and equipment browsing using API-backed data.
3. Implement equipment details, events, and evidence.
4. Build the core story page with Read Mode.
5. Add one 3D scene and connect its markers to equipment records.
6. Add Listen Mode and audio controls.
7. Test the complete user journey.
8. Expand the dataset and second destination experience.
Build one complete journey before adding many records or complex effects.
9. Assumptions and Open Decisions
- The initial product is public and primarily read-only.
- Moon and Mars are the two initial destinations.
- Apollo 11 is a sample mission, not the product boundary.
- The first release may have one fully interactive 3D scene while the second destination's scene is still being developed.
- The exact first set of missions and equipment must be selected through research and source verification.
- The team must decide whether narration is generated on-device, served as pre-generated audio, or uses both approaches.
- 3D asset availability, accuracy, and licensing must be checked before publication.
- A content-management interface is not required for the visitor-facing MVP unless the team decides otherwise.
10. Product Experience Summary
Afterlight's primary visitor experience is:

Discover a destination. Explore its missions. Find the equipment. Understand its history. Experience its story. Verify the evidence.

The workflows and user stories must remain mission-agnostic so that new verified Moon and Mars missions can be added without changing the core experience.