NASA Moon & Mars Equipment Explorer
1. Product Experience
Create a cinematic, immersive space-exploration website where visitors discover missions, equipment left behind, and the stories connected to them on the Moon and Mars.

The interface should feel like a premium space documentary or planet-exploration experience—not a conventional admin dashboard.

Primary experience: users switch between Moon and Mars, explore missions and equipment, then read or listen to evidence-backed stories.
2. Design Principles
1. Cinematic first: use large planetary visuals and strong typography.
2. Minimal interface: show only the controls needed for the current task.
3. Consistent visual language: every page uses the same dark theme, typography, spacing, and interaction patterns.
4. Content-led exploration: prioritize the mission, equipment, story, and evidence.
5. Accessible by design: maintain readable contrast, keyboard support, captions or transcripts, and reduced-motion support.
3. Visual Identity
Colour palette
Token	Suggested value	Usage
Background	#050505	Main page background
Surface	#111111	Cards, panels, menus
Elevated surface	#1A1A1A	Dialogs and selected panels
Primary text	#F5F5F5	Headings and body text
Secondary text	#A1A1AA	Supporting information
Accent orange	#F28C55	Active planet, highlights, primary actions
Border	#292929	Dividers and subtle outlines
Success	#65B98A	Verified/available status
Warning	#E5B45B	Inferred or uncertain status


Use orange selectively. It should guide attention rather than colour every control.
Typography
- Use a modern sans-serif family such as Inter, Geist, or a similar highly readable font.
- Hero headline: large, light or regular weight.
- Page headings: clear and prominent, but smaller than the hero.
- Body text: comfortable reading size and line height.
- Metadata: compact and muted, while remaining legible.
- Use consistent heading levels and avoid excessive uppercase text.
Shape and surfaces
- Prefer clean geometry and generous negative space.
- Use rounded corners consistently for controls and cards.
- Use subtle borders and translucent dark surfaces over imagery.
- Avoid excessive shadows, gradients, glowing outlines, and decorative UI.
4. Global Layout
Navigation
Use a minimal navigation bar over the dark background.

Suggested items:
- Project logo/name.
- Explore.
- Missions.
- Stories.
- About / Sources.
Requirements:
- Keep the navigation visually quiet.
- Highlight the current section with a subtle active state.
- On smaller screens, collapse navigation into an accessible menu.
- Keep the planet selector available where destination context is relevant.
Page width and spacing
- Use a centered content container with a consistent maximum width.
- Allow hero and 3D scenes to use the full viewport width.
- Use a consistent spacing scale based on multiples of 4 or 8.
- Maintain generous vertical spacing between major sections.
- Avoid dense grids and dashboard-like layouts.
5. Homepage
Hero composition
The homepage should closely follow the supplied visual reference:
- Full-screen or near-full-screen dark hero.
- Large Moon or Mars visual as the central focus.
- Minimal navigation near the top.
- Large white headline with the selected planet highlighted in orange.
- Short supporting sentence or call to action.
- Bottom-centered Moon/Mars selector.
Planet selector
The selector has two options: Moon and Mars.

On selection:
1. Update the active selector state.
2. Transition the planetary visual.
3. Update the headline and supporting copy.
4. Update the destination route.
5. Load destination-specific missions and equipment.
6. Preserve the selected destination while the user navigates.
Use a clear selected state that works without colour alone (for example, a filled surface, indicator, or text weight).

Suggested routes:
- /explore/moon
- /explore/mars
Hero actions
Keep one primary action, such as Explore the Moon or Explore Mars. A secondary action may lead to the featured mission or story.

Do not overload the hero with multiple buttons, paragraphs, or statistics.
6. Page Specifications
Explore page
Goal: let visitors visually discover equipment and locations on the selected world.

Layout:
- Destination title and concise introduction.
- Large interactive 3D scene.
- Small, clear scene controls (rotate, zoom, reset).
- Selectable equipment markers.
- Optional list or compact panel of visible equipment.
Interactions:
- Selecting a marker opens a concise equipment preview.
- Preview links to the full equipment detail page.
- Provide a list-based alternative to selecting 3D markers.
- Clearly label schematic or approximate locations.
Missions page
Goal: help visitors discover missions relevant to the selected destination.

Layout:
- Destination heading.
- Featured mission with large image.
- Mission cards with image, name, date, and short description.
- Optional filters or search, kept visually simple.
Interactions:
- Mission cards open mission detail pages.
- Filters should be easy to clear.
- Show an informative empty state when no missions match.
Mission detail page
Goal: explain a mission and connect it to its equipment and stories.

Include:
- Mission title and hero image.
- Mission summary and key dates.
- Mission timeline.
- Equipment associated with the mission.
- Related stories.
- Sources and references.
Keep the most important mission information visible before secondary details.
Equipment detail page
Goal: explain what an object is, what it did, and what is known about its fate.

Include:
- Equipment name and type.
- Large 3D model or image.
- Mission and destination.
- Concise description and purpose.
- Operational status.
- Physical status.
- Fate confidence (confirmed, inferred, or unknown).
- Event timeline.
- Related story.
- Evidence and source links.
Do not combine operational status with physical status. For example, equipment may no longer operate but may still physically remain at its location.
Stories page
Goal: deliver a compelling, evidence-backed narrative.

Include:
- Story title, mission, and destination.
- Chapter navigation or progress indicator.
- Read / Listen mode switch.
- Readable chapter text.
- Audio player with play/pause, seek, and volume controls.
- Optional ambience and sound-effect controls.
- Sources connected to relevant story claims.
Listening mode should feel cinematic but must not obscure the story text or remove access to sources. Provide a transcript/read mode at all times.
Evidence and sources
Goal: make the historical basis of the experience transparent.

Include:
- Claim or fact being supported.
- Source title and publisher.
- Source link.
- Relevant date or publication details when available.
- Evidence status, such as documented, inferred, or unknown.
Use a clean, readable layout rather than decorative cards that make sources harder to scan.
7. Interaction and Motion
Motion principles
- Use smooth, restrained transitions.
- Prefer opacity, scale, and position changes over complex effects.
- Keep transitions consistent across pages.
- Avoid motion that delays navigation or hides information.
- Respect the user's reduced-motion preference.
Suggested motion
Interaction	Behaviour
Planet switch	Crossfade or smoothly transition the planet visual and headline
Page navigation	Short fade/slide transition
Equipment card hover	Subtle lift or image movement
3D marker selection	Clear highlight and preview panel
Story chapter change	Gentle content transition
Audio playback	Clear state change and progress feedback


Motion durations should feel responsive; do not make users wait for decorative animations to finish.
8. Responsive Behaviour
Desktop
- Full cinematic hero and large 3D scenes.
- Horizontal navigation.
- Side-by-side content where useful.
- Equipment detail can place the 3D model beside its information.
Tablet
- Reduce hero typography and scene complexity.
- Keep controls comfortably spaced.
- Allow detail layouts to stack when needed.
Mobile
- Use a compact navigation menu.
- Keep Moon/Mars selector easy to reach.
- Stack content vertically.
- Use touch-friendly controls and markers.
- Provide a list alternative for 3D exploration.
- Optimize or simplify 3D scenes for device performance.
- Keep audio controls usable without horizontal scrolling.
9. Accessibility Requirements
- Maintain strong text/background contrast.
- Provide visible keyboard focus states.
- Ensure all controls have accessible names.
- Support keyboard navigation for menus, tabs, selectors, and audio controls.
- Do not rely on colour alone to communicate selection or status.
- Provide alt text for meaningful images.
- Provide transcripts for narrated stories.
- Respect reduced-motion settings.
- Ensure 3D interactions have an equivalent non-3D way to access information.
10. UI States
Design and implement the following states consistently:
- Loading: skeletons or unobtrusive progress indicators.
- Empty: explain why no results are available and how to reset filters.
- Error: concise message with a retry action where appropriate.
- Selected: visible state for active planet, filters, tabs, and equipment markers.
- Disabled: clearly indicate unavailable actions.
- Audio loading: show narration generation/loading progress.
- 3D fallback: show a static image or equipment list if 3D cannot load.
11. Content and Trust
- Use concise, plain-language descriptions.
- Separate confirmed facts from inferences and unknowns.
- Link historical claims to their sources.
- Show dates and units consistently.
- Do not invent exact equipment locations or operational status.
- Label illustrative or schematic 3D scenes clearly.
- Do not imply generated sound effects are authentic mission recordings.
12. Design System Components
Build reusable components for:
- Main navigation.
- Moon/Mars selector.
- Hero section.
- Primary and secondary buttons.
- Mission card.
- Equipment card.
- Status and evidence labels.
- Timeline.
- 3D scene controls.
- Equipment marker and preview panel.
- Story chapter navigation.
- Read/listen switch.
- Audio player.
- Source/evidence row.
- Loading, empty, and error states.
Use shared design tokens for colours, typography, spacing, radii, borders, and animation timing.
13. UX Acceptance Criteria
The design is ready for implementation when:
- The homepage matches the supplied dark, cinematic reference direction.
- Users can switch between Moon and Mars.
- The selected destination updates the route and relevant content, not just the hero image.
- All pages share a consistent visual system.
- Users can reach mission and equipment information without relying exclusively on 3D.
- Equipment status and uncertainty are clearly distinguished.
- Stories support both reading and listening.
- Audio controls are understandable and accessible.
- The experience works on desktop, tablet, and mobile.
- Loading, empty, error, and fallback states are designed.
- Motion can be reduced or disabled.
14. Recommended Design and Build Sequence
1. Create colour, typography, spacing, and component tokens.
2. Design the desktop homepage and Moon/Mars selector.
3. Define the mobile homepage behaviour.
4. Design the Explore and Missions pages.
5. Design mission and equipment detail pages.
6. Design the Story and Evidence experiences.
7. Prototype planet switching and page transitions.
8. Test usability, accessibility, and responsive layouts.
9. Implement the approved designs in Next.js.
Core UX principle: make users feel they are exploring another world, while keeping the information clear, trustworthy, and easy to access.

reference img = "./afterlight.img"