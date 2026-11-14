AFTERLIGHT: Space Archaeology – User Workflow Document
Version 1.0 · Companion to the PRD · Audience: Product, Design, Engineering, QA
This document describes how each type of user moves through the platform: what they see, what they do, what the system does in response, and what happens when things go wrong. Step IDs (e.g. W1-3) can be referenced in design reviews and test cases.
1. Users and Entry Points
User
Typical entry point
Goal
First-time student
Search engine, teacher link, social share
Find something cool about space and explore it
Teacher
Direct link to a specific story or equipment page
Assign or present accurate, citable content
Space enthusiast
Search or direct link to a spec page
Find technical details and sources
Returning member
Bookmark or home page
Continue a story, revisit favourites
2. Site Map and Navigation
Global header (every page): Logo (returns to Explore) · Explore · Missions · Equipment · Stories · Evidence · Search icon · Sign In / user menu.
Route
Purpose
/
Explore landing page (Moon/Mars toggle, featured content)
/missions and /missions/[slug]
Mission index and detail
/equipment and /equipment/[slug]
Equipment catalogue and specification page
/stories and /stories/[slug]
Story index and the story experience
/evidence
Evidence and sources gallery
/account
Profile, bookmarks, progress (signed-in users)
3. Workflow 1 – First Visit and Exploring the Landing Page
Actor: any visitor · Starting point: /
Step
User action
System response
W1-1
Opens the site
Loads the hero with a loading state; the 3D planet fades in. Default body: Mars (or the last used body).
W1-2
Reads the headline and intro
Displays “Discover the stories left behind on Mars” and the supporting copy.
W1-3
Moves the pointer or drags/touches the planet
The planet responds with subtle parallax or rotation.
W1-4
Taps the Moon toggle
Planet cross-fades to the Moon; glow shifts to silver; headline and copy update; stats, featured and spotlight cards update. Selection is saved.
W1-5
Taps the Mars toggle
The reverse of W1-4.
W1-6
Scrolls past the stats strip
Counters animate once (missions, equipment, stories, evidence).
W1-7
Selects Start Exploring
Page scrolls smoothly to the equipment section for the selected body.
W1-8
Selects Explore Mission on the Featured Mission card
Navigates to the mission detail page.
W1-9
Selects the Spotlight card
Navigates to the equipment or instrument page.
Alternative and error paths
• No WebGL / low-power device: a static planet image replaces the 3D scene; all other interactions work the same.
• Slow connection: text and cards load first; 3D loads progressively with a placeholder.
• API failure for stats or featured content: show cached or default values and a subtle retry option; never block the hero.
• Reduced-motion preference: transitions become simple fades, with no rotation or parallax.
4. Workflow 2 – Planet-Based Equipment Exploration
Actor: any visitor · Starting point: the equipment section on /
Step
User action
System response
W2-1
Reaches the equipment section
Shows cards for the selected body, with loading skeletons while fetching.
W2-2
Views the cards (Moon: Apollo Lunar Module, LRV; Mars: Sojourner, Spirit and Opportunity)
Each card shows an image or mini 3D preview, name, mission, year and status badge.
W2-3
Hovers or focuses on a card
Card highlights; the matching landing-site marker pulses on the planet (if enabled).
W2-4
Selects a landing-site marker on the planet
The related card scrolls into view and highlights.
W2-5
Switches planet while in this section
Cards animate out and in; scroll position is kept.
W2-6
Selects a card
Navigates to the equipment page, where the Story and Specification are offered (see Workflows 4 and 5).
Alternative paths: if a body has no equipment yet, show a “Coming soon” message with a link to the other body.
5. Workflow 3 – Sign In and Personalisation
Actor: visitor who chooses to sign in · Starting point: header Sign In button
Step
User action
System response
W3-1
Selects Sign In
Opens a dialog listing OAuth providers and a short privacy note.
W3-2
Chooses a provider (e.g. Google)
Redirects to the provider’s consent screen.
W3-3
Approves access
Provider returns to the callback; the system creates or finds the user and starts a session.
W3-4
Returns to the app
The user lands on the page they were viewing; the header shows their avatar and menu; a welcome toast appears.
W3-5
Continues browsing
Last body, story progress and bookmarks are saved and restored.
W3-6
Opens the user menu → Sign out
Session ends; the header returns to the signed-out state.
Alternative and error paths
• User cancels at the provider: return to the previous page with a neutral message and no error.
• Provider error or timeout: show a friendly error with a retry option and an alternate provider.
• Session expired: the next protected action triggers a re-sign-in; unsaved progress is retained locally and synced afterwards.
• Under-age or school-account restrictions: follow the policy decided in the legal review (see PRD risks).
6. Workflow 4 – Experiencing a Story (Core Journey)
Actor: any visitor (progress is saved only if signed in) · Starting point: equipment card or the Stories page
Step
User action
System response
W4-1
Opens a story
Shows a cinematic title screen: equipment name, mission, reading time and a Begin cue. Audio is muted by default, with a visible sound toggle.
W4-2
Scrolls down
Chapter 1 (Origin) reveals with animated text and imagery; the progress bar advances.
W4-3
Continues scrolling
Chapter 2 (Engineering): the 3D model appears and is pinned while text steps through; the model rotates or highlights parts to match the text.
W4-4
Selects a hotspot on the 3D model
A panel explains the part (for example wheels, antenna, instrument) and links it to what it enabled scientifically.
W4-5
Drags to rotate or pinches to zoom the model
The model responds; limits prevent the user getting lost.
W4-6
Hovers or taps a highlighted term
A glossary tooltip gives a simple definition.
W4-7
Continues: Journey, Operations, Key Events and Challenges
Animated timeline, diagrams and media appear as each chapter enters the viewport.
W4-8
Reaches Discoveries
The “Engineering to Discovery” component links features to findings.
W4-9
Reaches Legacy
A closing section explains why the mission still matters.
W4-10
Finishes the story
End screen with links to the specification page, related equipment, the next story and an optional quiz. Completion is recorded for signed-in users.
W4-11
Uses the chapter menu at any time
Jumps to any chapter; the progress bar updates.
W4-12
Adjusts audio
A global panel provides mute and volume for ambient sound and effects.
Alternative and error paths
• Leaves mid-story (signed in): progress is saved; next visit offers “Continue where you left off.”
• 3D model fails to load: a static image of the model with hotspots as a numbered list.
• Low-power or mobile: fewer pinned sequences, lighter models, simplified transitions.
• Keyboard or screen reader: chapters are navigable as sections; 3D has a text alternative describing the parts.
• Future TTS: a Listen control plays chapter narration, highlights the text and pauses ambient audio.
7. Workflow 5 – Viewing Equipment Specifications
Actor: any visitor · Starting point: equipment page, a story end screen, or a search result
Step
User action
System response
W5-1
Opens /equipment/[slug]
Shows the header: name, mission, status badge, hero image or 3D model, and a Read the story button.
W5-2
Scans the key facts
A structured grid shows launch date, duration, launch vehicle, manufacturer, agency/country, type, purpose.
W5-3
Reviews physical details
Dimensions, mass and power source are shown, with a metric/imperial toggle.
W5-4
Opens instruments and capabilities
Each instrument is listed with a short explanation; tapping expands more.
W5-5
Views the milestone timeline
Interactive timeline from launch to the end of the mission.
W5-6
Reads scientific contributions
Key discoveries, with links to the matching story chapters.
W5-7
Checks the landing or final known location
Location text, and a link to highlight it on the planet (if available).
W5-8
Selects a source link
Opens the NASA or other source in a new tab.
W5-9
Selects Bookmark (signed in)
The item is saved to the account; if signed out, a prompt offers sign-in.
8. Workflow 6 – Missions, Evidence and Search
Step
User action
System response
W6-1
Selects Missions
Mission list grouped or filtered by body; each shows status and the equipment it includes.
W6-2
Opens a mission
Mission summary, timeline, equipment, related stories and evidence.
W6-3
Selects Evidence
Gallery of images, documents and data with source and licence labels; filter by body, equipment or type.
W6-4
Opens an evidence item
Lightbox with caption, attribution, source link and related equipment.
W6-5
Selects the Search icon
Opens a search overlay; focus moves to the input.
W6-6
Types a query
Live results grouped into Missions, Equipment, Stories and Evidence.
W6-7
Chooses a result
Navigates to that page; overlay closes.
W6-8
No results
Shows suggestions (popular equipment) and a hint to check spelling.
9. Workflow 7 – Teacher Use
Step
User action
System response
W7-1
Opens a shared link to a story or spec page
The page loads directly without requiring sign-in.
W7-2
Presents on a classroom screen
Responsive layout; audio is off by default; reduced-motion respected.
W7-3
Looks for sources
Source links are visible on spec and evidence pages.
W7-4
Shares the page
Clean, stable URLs with rich social previews.
10. Cross-Cutting UX Rules
Area
Rule
Loading
Skeletons for content, a branded loader for 3D; never a blank screen.
Errors
Friendly language, a retry option, and no technical jargon for children.
State
The body selection persists across pages; the story position persists for signed-in users.
Audio
Never autoplay with sound; a persistent toggle is available.
Motion
Respects the system reduced-motion setting.
Accessibility
Full keyboard operation, visible focus, alt text, sufficient contrast.
Back button
Browser history works correctly; toggling the planet does not break back navigation.
Content safety
Appropriate for a school audience; no external links except to vetted sources.
11. Visual Flow Summary
The primary journey is: Land on Explore → choose Moon or Mars → pick equipment → experience the story → view specifications and evidence → continue to related equipment.
[Landing /]
    |
    +--> Toggle Moon / Mars --> updates scene, copy, stats, cards
    |
    +--> Start Exploring --> Equipment cards
    |                            |
    |                            +--> Equipment page --> Read the story --> Story chapters --> End screen
    |                            |                                                     |
    |                            +--> Specs, timeline, sources <-----------------------+
    |
    +--> Featured Mission / Spotlight --> Mission or Equipment page
    |
    +--> Sign In (any time) --> OAuth --> Returns to the same page
    |
    +--> Search / Missions / Stories / Evidence (header navigation)
12. Acceptance Checks for Workflows
1.  A new visitor can reach a story from the landing page in 3 clicks or fewer.
2.  Toggling Moon/Mars updates the scene, copy, stats and cards in under 1 second on a reference laptop.
3.  A signed-in user who leaves mid-story is offered to resume at the same chapter.
4.  Every spec page fact is accompanied by a source link or a global source section.
5.  All flows can be completed using a keyboard only.
6.  Every flow has a defined behaviour for loading, empty and error states.