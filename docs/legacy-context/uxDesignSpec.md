AFTERLIGHT: Space Archaeology – UI/UX Specification
Version 2.0 · Refined to match the PRD, the Development & Task Breakdown and the supplied landing-page reference · Audience: Design and Frontend
This specification defines how AFTERLIGHT looks and behaves. It replaces the earlier “NASA Moon & Mars Equipment Explorer” draft. Anything marked MVP ships in the first release; anything marked Post-MVP is designed for, but built later (see the phase map in Section 14).
1. What Changed From the Earlier Draft
Area
Earlier draft
Refined decision
Why
Product name
NASA Moon & Mars Equipment Explorer
AFTERLIGHT: Space Archaeology
Matches the PRD and the reference logo
Navigation
Explore, Missions, Stories, About/Sources
Explore, Missions, Equipment, Stories, Evidence, plus search icon and Sign In
Matches the reference image and PRD scope
Authentication
Not covered
OAuth Sign In button in the header; dialog; signed-in avatar menu
PRD requirement 3.1
Homepage content
One action, no statistics
Headline, intro, Moon/Mars toggle, “Start Exploring”, statistics strip, Featured Mission card and Spotlight card
Reference image and PRD 3.2
Equipment discovery
Large 3D scene with markers as the main interaction
Equipment cards as the MVP; planet markers are Post-MVP
Cards are faster to build and work on every device
Stories
Read and Listen modes, ambience controls
Read mode (MVP); Listen, audio player and ambience (Post-MVP)
TTS is a future enhancement in the PRD
Equipment page
Status, fate confidence, timeline
Keeps these and adds the full PRD specification fields (launch vehicle, manufacturer, dimensions, mass, power, instruments)
PRD 3.5
Audience
General visitors
School-age users first: plain language, short text, glossary hints
PRD product vision
Glow and gradients
“Avoid glowing outlines”
Atmospheric glow allowed only on the planet and the active toggle
The reference relies on the planet glow
Routes
/explore/moon, /explore/mars
Kept; / redirects to the last-used destination (default Mars)
Keeps the route in sync with the toggle
Typography
Inter, Geist or similar
Inter (primary), with a fallback stack
One decision for the build
2. Product Experience
AFTERLIGHT should feel like a premium space documentary, not an admin dashboard. Visitors switch between the Moon and Mars, discover the machines left behind, then read an evidence-backed story about each one and check its specifications.
Primary journey: Land on Explore → choose Moon or Mars → pick equipment → read its story → view specifications and evidence → move on to related equipment.
3. Design Principles
1.  Cinematic first. Large planetary imagery and strong, light typography.
2.  Minimal interface. Show only the controls the current task needs.
3.  One visual language. Every page uses the same dark theme, type scale, spacing and interaction patterns.
4.  Content-led. The mission, machine, story and evidence come before decoration.
5.  Trustworthy. Confirmed facts, inferences and unknowns are always visually distinct.
6.  Accessible and kind to young readers. Clear contrast, keyboard support, reduced motion, plain language.
4. Visual Identity
4.1 Colour Tokens
Token
Value
Usage
--bg
#050505
Page background
--surface
#111111
Cards, panels, menus
--surface-elevated
#1A1A1A
Dialogs, selected panels
--text
#F5F5F5
Headings and body text
--text-muted
#A1A1AA
Supporting information and metadata
--accent-mars
#F28C55
Mars selected state, highlights, primary actions on Mars
--accent-moon
#C9CED6
Moon selected state, highlights, primary actions on the Moon (silver)
--border
#292929
Dividers and outlines
--success
#65B98A
Documented / confirmed
--warning
#E5B45B
Inferred / uncertain
--unknown
#8A8A93
Unknown (always paired with an icon and label)
Planet theming: the active accent token (--accent) switches between --accent-mars and --accent-moon when the destination changes. Components read --accent and never hard-code orange. Use the accent sparingly: it guides attention, it does not colour every control.
Contrast: body text and muted text must meet WCAG 2.2 AA on --bg and --surface. Check --accent-moon and --unknown on every surface before use.
4.2 Typography
Style
Use
Guidance
Hero headline
Landing page
Very large, light or regular weight; planet name in --accent
Page heading
Page titles
Clear, smaller than the hero
Section heading
Sections
Medium weight
Body
Stories, descriptions
Comfortable size, generous line height, 60–75 characters per line
Metadata
Dates, units, labels
Compact, muted, still legible (never below 12 px)
• Primary family: Inter, with system-ui, sans-serif as the fallback.
• Use sentence case; avoid long uppercase text. Small tracked uppercase is allowed only for short labels such as “FEATURED MISSION” and “SPOTLIGHT”.
• Use consistent heading levels (h1 per page, then h2, h3).
4.3 Shape, Surfaces and Effects
• Clean geometry and generous negative space.
• One corner-radius scale: small (controls), medium (cards), full (pills such as the toggle and buttons).
• Subtle 1 px borders and translucent dark surfaces over imagery.
• Spacing in multiples of 4 or 8.
• Glow rule: a soft atmospheric glow is allowed on the planet and on the selected toggle state only. No glowing outlines on cards, buttons or text. Shadows stay minimal.
5. Global Layout
5.1 Header (every page)
Element
Behaviour
Logo “AFTERLIGHT – Space Archaeology”
Links to Explore
Navigation: Explore, Missions, Equipment, Stories, Evidence
Quiet by default; current section has a subtle active state (underline or weight, not colour alone)
Search icon
Opens a search overlay (Post-MVP; hidden in the MVP unless search is ready)
Sign In (pill button)
Opens the OAuth dialog; becomes an avatar menu with Sign out after sign-in
• On small screens, the navigation collapses into an accessible menu; Sign In stays visible.
• The Moon/Mars selector appears wherever the destination changes the content (landing page, Explore, Missions, Equipment).
5.2 Page Width and Spacing
• Centered container with one maximum width for text and cards.
• Hero and 3D scenes may use the full viewport width.
• Generous vertical spacing between major sections; avoid dense grids.
5.3 Routes
Route
Page
Release
/
Redirects to the last-used destination (default Mars)
MVP
/explore/moon, /explore/mars
Landing and equipment exploration for the destination
MVP
/equipment/[slug]
Equipment specification page
MVP
/stories/[slug]
Story experience
MVP
/missions, /missions/[slug]
Mission list and detail
MVP (basic), Post-MVP (full)
/equipment
Equipment catalogue
MVP (basic list), Post-MVP (filters)
/evidence
Evidence and sources
MVP (list), Post-MVP (gallery)
/stories
Stories index
Post-MVP
/account
Profile and saved items
MVP (basic), Post-MVP (bookmarks)
6. Homepage (Explore Landing)
The page must closely follow the supplied reference image (the afterlight landing screen, Mars state shown).
6.1 Composition, Top to Bottom
Order
Element
Notes
1
Header
As in Section 5.1
2
Headline
“Discover the stories left behind on Mars.” with the planet name in --accent. Moon version: “…left behind on the Moon.” (the reference shows “on the Mars”; correct it)
3
Supporting sentence
One or two lines, for example “Explore the missions, equipment, and human stories that still lie on the surface of Mars.”
4
Planet
Large horizon arc in the centre, with a soft atmospheric glow; slow, subtle motion
5
Moon/Mars toggle
Bottom-centre of the hero; two pill segments with icons
6
Primary action
“Start Exploring →”, one button only, below the toggle
7
Statistics strip
Four items separated by thin dividers: Missions, Equipment, Stories, Evidence & Sources
8
Featured Mission card
Wide card: label, mission name, one-line description, “Explore Mission”, rover image
9
Spotlight card
Smaller card: label, equipment or instrument name, one-line description, image
Restraint: one primary button only. The statistics strip and the two cards sit below the hero scene and must not crowd the headline or the planet.
6.2 Statistics Strip
• Shows counts from the API: missions, equipment, stories, evidence and sources.
• Counts animate once when first visible (skipped with reduced motion).
• Every item has a number and a label. The reference omits the number for Stories; always show one (for example “4 Stories”).
• Use real, current counts. Do not show “12+” or “40+” unless the content exists.
6.3 Featured Mission and Spotlight Cards
• Content is chosen per destination and managed in the database.
• The reference features Perseverance and MOXIE. The launch content is Sojourner, Spirit and Opportunity, Apollo Lunar Module and LRV. Until the content decision in the PRD is made, feature launch equipment (recommended) or add the Perseverance and MOXIE pages to the MVP content.
• Cards use a translucent dark surface, a subtle border and a hover lift only.
6.4 Moon/Mars Selector Behaviour
On selection:
1.  The selected segment changes state (filled surface, accent border and text weight; not colour alone).
2.  The planet crossfades (texture, lighting, glow, accent token).
3.  The headline and supporting copy update.
4.  The route updates to /explore/moon or /explore/mars without a full page reload.
5.  The statistics, Featured Mission, Spotlight and equipment cards update for the destination.
6.  The selection is remembered while the user navigates and after they return.
The toggle is a two-option control (radio-group semantics): arrow keys move between options, with a visible focus ring and accessible names.
7. Page Specifications
7.1 Equipment Exploration (below the hero, MVP)
Goal: let visitors discover the equipment on the selected world.
• Destination title and a one-sentence introduction.
• Equipment cards in a calm grid: image or 3D preview, name, mission, year, status badge.
• Moon: Apollo Lunar Module and Lunar Roving Vehicle. Mars: Sojourner and Spirit and Opportunity.
• Cards open the equipment page. Hover gives a subtle lift only.
• Post-MVP: an interactive 3D scene with landing-site markers and scene controls (rotate, zoom, reset). Selecting a marker highlights the matching card and opens a short preview. Markers are always labelled “schematic” or “approximate”. The card grid remains the accessible alternative.
7.2 Missions Pages
Missions list (MVP basic, full Post-MVP): destination heading, featured mission with a large image, and mission cards (image, name, date, short description). Filters and search are Post-MVP and must be easy to clear, with an informative empty state.
Mission detail: title and hero image; summary and key dates; timeline; associated equipment; related stories; sources. The most important information is visible before secondary details.
7.3 Equipment Specification Page (MVP)
Goal: explain what the machine is, what it did and what is known about its fate, in a clean, structured layout.
Block
Content
Header
Name, type, mission, destination, hero 3D model or image, “Read the story” button
Status
Three separate labels: Operational status (for example inactive), Physical status (for example remains at the landing site), Fate confidence (documented, inferred or unknown)
Key facts grid
Launch date, mission duration, launch vehicle, manufacturer, country/agency, primary purpose
Physical details
Dimensions, mass, power source
Instruments
Name and a one-line plain-language purpose each; expandable for detail
Location
Landing or final known location, marked as documented, inferred or unknown
Milestones
Event timeline from launch to the end of the mission
Contributions
Scientific discoveries, linked to the matching story chapters
Sources
Source link per fact, or a source row group at the end
• Never merge operational and physical status. Equipment may have stopped working yet still be at its location.
• Desktop: the model sits beside the key facts. Mobile: the model first, then the facts, stacked.
• Post-MVP: metric/imperial toggle, “explain simply” hints, bookmark button.
7.4 Story Page (MVP, the core feature)
Goal: a cinematic, scroll-based story that connects the machine’s engineering to what humanity learned.
Element
Behaviour
Title screen
Equipment name, mission, destination, reading time, a “Begin” cue
Chapters
Origin → Engineering → Journey → Operations → Key events and challenges → Discoveries → Legacy
Scroll behaviour
Chapter content reveals as it enters the viewport; the 3D model can pin while the text steps through
3D viewer
Rotate and zoom with limits; hotspots open short explanations
“Engineering to Discovery”
A component pairing a hardware feature with the scientific result it enabled
Navigation
Progress bar and chapter menu; progress is saved for signed-in users (Post-MVP)
Sources
Claims link to the Evidence rows that support them
End screen
Links to specifications, related equipment and the next story
• Text is short, plain and chunked for school-age readers; technical terms get a glossary tooltip (Post-MVP).
• Every 3D moment has a non-3D equivalent (image plus text).
• Post-MVP: Read/Listen switch, audio player (play/pause, seek, volume, speed), captions, ambience and sound-effect controls. The Read mode and full transcript are always available. Listening mode must not hide the text or the sources. Generated sound effects are labelled and never presented as real mission recordings.
7.5 Evidence and Sources
Goal: make the factual basis transparent and easy to scan.
Each row shows: the claim, the source title and publisher, the link, the date or publication details, and an evidence status chip (documented, inferred or unknown). Use a clean list or table, not decorative cards. MVP: list view. Post-MVP: gallery with lightbox, licence and attribution, and filters.
7.6 Sign In (MVP)
• A dialog from the header with OAuth provider buttons and a short privacy note.
• After success, the user returns to the page they were on, sees an avatar and a brief welcome message.
• Handle cancel, provider error and expired session with friendly messages and a retry option.
• Browsing is never blocked by sign-in.
8. Interaction and Motion
Interaction
Behaviour
Planet switch
Crossfade the planet; fade-swap the headline and copy; the accent colour transitions
Page navigation
Short fade or slide
Card hover
Subtle lift or image movement
Statistics
One-time count-up
Story chapters
Gentle reveal and transition between chapters
3D hotspot selection
Clear highlight and a preview panel
Audio (Post-MVP)
Clear state change and progress feedback
• Use opacity, scale and position changes. No complex effects.
• Transitions never delay navigation or hide information.
• With the reduced-motion preference, replace movement with simple fades and stop planet rotation and count-ups.
• Implementation: Framer Motion for UI transitions; GSAP only if a pinned story sequence needs it.
9. Responsive Behaviour
Breakpoint
Behaviour
Desktop
Full cinematic hero, horizontal navigation, side-by-side content (model beside facts)
Tablet
Smaller hero type and lighter scene; detail layouts stack when needed; comfortable touch spacing
Mobile (from 360 px)
Compact menu; Moon/Mars toggle easy to reach; smaller planet; stacked cards; touch-friendly controls; the 3D scene uses a lighter quality tier or a static image
The 3D scene chooses a quality tier from device capability. If WebGL is unavailable, it shows a static planet image and everything else still works.
10. Accessibility (WCAG 2.2 AA)
• Strong text and background contrast; visible keyboard focus everywhere.
• Every control has an accessible name; menus, tabs, the toggle and any audio controls work with the keyboard.
• Selection and status never rely on colour alone (use icon, label, weight or a border).
• Alt text for meaningful images; transcripts and captions for narration.
• Reduced-motion support.
• Every 3D interaction has an equivalent non-3D way to reach the same information.
• Audio never autoplays with sound.
11. UI States
State
Design
Loading
Skeletons for content; a branded loader for 3D; never a blank screen
Empty
Explains why nothing is shown and how to reset filters; “Coming soon” for a destination with no equipment
Error
Short, friendly message with a retry action; no technical jargon
Selected
Visible state for the planet, tabs, filters and markers
Disabled
Clearly dimmed with an explanation where useful
3D fallback
Static image or the equipment list when 3D fails or is unavailable
Audio (Post-MVP)
Loading or generation progress and failure message
Signed out / signed in
Header and personalised areas change accordingly
12. Content and Trust
• Plain language written for school-age readers; short sentences; no unexplained jargon.
• Separate confirmed facts, inferences and unknowns with consistent labels.
• Link claims to sources; show dates and units consistently.
• Never invent exact locations or operational status. Mark illustrative or schematic scenes clearly.
• Record the licence and attribution of every image, model and sound.
• Keep content classroom-safe; link outside the site only to vetted sources.
13. Design System Components
All components use shared tokens for colour, type, spacing, radii, borders and motion timing, built on Tailwind CSS and shadcn/ui.
Component
Release
Header with navigation, search icon and Sign In
MVP
Moon/Mars toggle
MVP
Hero section with planet scene
MVP
Primary and secondary buttons
MVP
Statistics strip
MVP
Featured Mission card and Spotlight card
MVP
Equipment card and status labels (operational, physical, fate confidence)
MVP
Specification grid, instrument list and milestone timeline
MVP
Story chapter shell, progress bar and chapter menu
MVP
3D model viewer and hotspot
MVP
“Engineering to Discovery” component
MVP
Source and evidence row
MVP
Sign In dialog and user menu
MVP
Loading, empty, error and 3D-fallback states
MVP
Mission card
MVP (basic)
Landing-site marker and preview panel; scene controls
Post-MVP
Search overlay
Post-MVP
Read/Listen switch, audio player, ambience controls
Post-MVP
Glossary tooltip, quiz
Post-MVP
14. Build Sequence and Phase Map
Dev phase
UX work
1. Foundation and Setup
Tokens (colour, type, spacing, radii, motion); header and footer; finalise the specification page reference design
2. Authentication
Sign In dialog, user menu, error states
3. Explore Landing Page
Hero, planet scene, toggle, statistics strip, Featured and Spotlight cards, mobile hero, fallback
4. Equipment Exploration
Equipment cards and the planet-switch list animation
5. Storytelling Engine and Specification Pages
Story shell, 3D viewer, hotspots, “Engineering to Discovery”, specification layout
6. MVP Content and 3D
Final copy, images, models, alt text, source rows
7. Hardening, QA and Launch
Accessibility audit, responsive testing, state coverage
8. Supporting Pages
Full Missions, Equipment, Stories and Evidence pages; planet markers
9. Personalisation, Search and Engagement
Search overlay, bookmarks, glossary, quizzes, ambient audio
10. Text-to-Speech Narration
Read/Listen switch, audio player, captions
15. UX Acceptance Criteria
The MVP design is ready for implementation when:
1.  The landing page matches the supplied reference in layout, colour and mood, with the corrected headline.
2.  Switching Moon/Mars updates the planet, copy, route, statistics, cards and equipment, not just the image.
3.  Every page uses the same tokens, type scale and components.
4.  A visitor can reach a story from the landing page in three clicks or fewer.
5.  Equipment pages show operational status, physical status and fate confidence as three separate labels.
6.  All 4 launch equipment items have a story page and a specification page in the same template.
7.  All mission and equipment information can be reached without 3D.
8.  Loading, empty, error and 3D-fallback states are designed.
9.  The experience works from a 360 px phone to a large desktop.
10.  Motion can be reduced or disabled, and all flows work with a keyboard.
11.  Sign In works and returns the user to the page they were on.
16. Open Decisions
#
Decision
Recommendation
1
Feature Perseverance and MOXIE, or launch equipment, in the reference cards
Feature launch equipment; add the others later
2
Is the Stories statistic a count or a label
A count, for example “4 Stories”
3
Default destination when no preference is saved
Mars, as in the reference
4
Does Moon use a silver accent or the same orange
Silver, so the planets feel distinct
5
The specification page reference image
Needed before Phase 5 design
6
Font licence and hosting
Inter, self-hosted