# Build week09: "Designing for Your Developer"

Build `week09/index.html` (currently the placeholder) as an async lecture deck supporting the Final Project pitch ("Not Your Story", Pitch Day Oct 30). Follow the repo's existing conventions (README "Slide conventions", `shared/theme.css`) and reuse patterns from week08 rather than inventing new ones. Per-deck CSS goes in the `<style>` block in `week09/index.html`, commented the way week08 is. Don't touch `shared/` unless a pattern genuinely needs to be shared. Add the week09 link to the root `index.html`. Run `npm run build` at the end to confirm it compiles.

## Conventions to follow
- Each chapter = one `data-movement` number (Opening = 1, Ch1 = 2 ... Ch7 = 8) with `data-movement-name` set to the chapter name.
- Chapter dividers: `.impact-slide` + `.title-highlight static-title`, with `data-bg` rotating voronoi → truchet → scanline across the 7 dividers. Each divider also shows a small "Chapter N" label so async viewers can scrub to it.
- Takeaway slides (one closes each chapter): `.impact-slide`, the quote as a single `.title-highlight` h2, using that chapter's accent color.
- Accent per chapter, used for its divider, highlights, and diagram fills: Ch1 cyan, Ch2 lime, Ch3 magenta, Ch4 orange, Ch5 violet, Ch6 cyan, Ch7 lime.
- Diagrams are HTML/CSS + inline SVG like week08's `.loop-diagram` / `.rings-diagram`. No new libraries. Use `--divider-color` fills with `#0a0a0f` text and Russo One labels, matching week08.
- Tables: theme.css has no table pattern. Add a `.vgs-table` in the week09 `<style>` block: dark rows, alternating subtle stripe, header row with an accent underline, Russo One headers, readable at ~0.4em body size. Max 6 rows visible per slide (split or shrink if needed).
- Image placeholders: anywhere marked IMAGE/CLIP, put a dashed-outline box with a label describing what goes there, sized as the final image would be. Asset paths follow `week09/assets/NN/` by slide number. I'll drop the real files in.
- Keep on-slide text short. I'm talking over it.
- Use fragments to reveal list items and diagram steps one at a time where noted (FRAG).

## Slide-by-slide

### Opening (movement 1)
1. **Title.** "Designing for Your Developer" / sub: "Final Project · Theme: Not Your Story · Pitch Day: Oct 30"
2. **Where We Are.** DIAGRAM: two rounded boxes, "Project 1 · Branching Narrative (Twine)" (magenta) and "Project 2 · Level & Mechanics (Unity)" (cyan), with SVG arrows converging on a third box, "Final Project" (lime). FRAG: left box, right box, arrows + center.
3. **In This Lecture.** A numbered list of the 7 chapters, styled as a vertical index with chapter accent color chips.

### Ch1 — Your Role (movement 2)
4. Divider: "I'm Your Developer"
5. **I'm Your Developer.** Three lines, FRAG: You are the designers and writers. / I build what you specify. / Your job: design something buildable, and describe it clearly.
6. **What You're Making.** One line up top: "A character-oriented experience." TABLE (2 cols), headers Mechanical Agency | Narrative Agency. Rows: Physical level design: where you go, what you open, what you carry | Branching dialogue: who you talk to, what you say, what changes; Your Project 2 skills | Your Project 1 skills; The system responds to what you do | The story responds to what you choose.
7. **What You're Not Making.** Three large struck-through words: Puzzle Games · Card Games · RPGs. Below: "Great genres. Too big for this build." Small line: "Lock-and-key puzzles are fine. A whole puzzle game is not."
8. Takeaway: "Design inside the menu. Describe it so I can build it."

### Ch2 — The Developer's Menu (movement 3)
9. Divider: "The Developer's Menu"
10. **The Menu.** DIAGRAM as a grid of 11 "brick" tiles (rounded rects, icon-free, label + one-line description), split into two labeled groups. Physical (cyan): Movement, Rooms, Gates, Keys, Switches/Buttons, Pickups, Timers, Goals. Narrative (magenta): NPCs, Dialogue, Flags. Flags tile gets a subtle glowing outline (it's the bridge, and pays off in Ch3).
11. **The Menu in Action (1/2).** `.media-pair` CLIP placeholders: "key opens gate", "pickup carried and delivered".
12. **The Menu in Action (2/2).** `.media-pair` CLIP placeholders: "timer running", "walk up to NPC → dialogue opens". Caption: "It all exists already. You're arranging it, not inventing it."
13. **Off the Menu.** TABLE, headers Off the Menu | Try This Instead. Rows: Combat / health bars → Avoiding, sneaking, timing; Inventory systems → Carry one or two things; Stats & leveling → Relationships via dialogue flags; Crafting → Deliver items to whoever needs them; Logic puzzles → Lock-and-key routing. Left column styled dim/struck, right column bright. FRAG per row.
14. Takeaway: "If it's not on the menu, rework it until it is."

### Ch3 — The Hinge (movement 4)
15. Divider: "The Hinge"
16. **Two Games or One?** DIAGRAM: two separate boxes, "Dialogue" and "Level", with a visible gap and a broken/dashed line between them. Text: "If talking never changes the level, and the level never changes the talking, you've glued two games together."
17. **The Hinge.** Definition as a `.quote-block`: "A hinge is a moment where talking changes the level, or the level changes the talking." DIAGRAM: 4-node loop reusing week08's `.loop-diagram` geometry: Dialogue Choice → Flag Set → Level Changes → New Dialogue → (back). FRAG node by node.
18. **Talk → Level.** DIAGRAM: a dialogue node box ("Guard: 'Who sent you?'") branching via SVG to two choice pills ("Tell the truth" / "Lie"), each arrow ending at a gate icon (simple CSS rect): open (lime) vs locked (magenta with lock glyph). Bullets underneath: convince the guard → gate opens; lie to the gardener → shortcut stays locked.
19. **Level → Talk.** DIAGRAM, the mirror image: a level path that forks (short route / long route), both converging on the same NPC, with two different speech bubbles ("Right on time." / "You're late."). Bullets: deliver the letter → new lines; took the long way → someone notices.
20. **Reading a Flag.** Format line in monospace: `flag → consequence`. TABLE, headers Flag | Set By | Changes. Rows: `goblin_trusts_you` | telling the goblin the truth | east shortcut opens; `letter_delivered` | reaching the baker before the timer | baker's ending changes; `trap_left_unset` | skipping one room | the hero's fate / final scene. Flag names in monospace.
21. Takeaway: "Every game needs at least one hinge. Your Playable Choice should be one."

### Ch4 — Character First (movement 5)
22. Divider: "Character First"
23. **Not Your Story.** IMAGE placeholder: a frame/composition where the hero is out of focus or cropped and a background character is sharp. Text: "You are never the hero. You're at the edge of the frame."
24. **Three Questions.** `.content-trio` style: Who are you? / What do you want that the hero's story ignores? / What can't you do? Examples under the first: the minion, the shopkeeper, the hero's horse. FRAG per column.
25. **Verbs Are Character.** TABLE, headers Character | Can | Can't. Rows: Janitor | carry, sweep, lock, talk | attack; Messenger | run, deliver, talk | open sealed doors; Guard | patrol, look away, talk | leave their post. Can't column in magenta. Footer line: "What you can't do is part of the argument."
26. Takeaway: "Pick the character before the mechanics."

### Ch5 — Archetypes That Work (movement 6)
27. Divider: "Familiar Shapes, Flipped"
28. **Overview.** TABLE, headers Archetype | The Flip. Rows: Key & gate maze | the keymaster the hero barged past; Fetch quest | the quest-giver goes to get it themselves; Timed errand | the messenger who sets off the hero's plot; Escort | the "rescued" villager secretly helping; Patrol & avoid | the guard trying not to see the hero; Reset | the caretaker cleaning up after the hero.
29–33. **One slide per archetype** (Key & gate maze, Fetch quest, Timed errand, Escort, Patrol & avoid). Build ONE reusable layout: left half = mini map DIAGRAM, right half = three labeled lines (Plain version / The flip / Possible hinge). Mini map = 3–5 room rectangles connected by corridors on a grid, with small consistent glyphs: key (lime), gate (bar across a corridor, magenta), NPC (circle, cyan), item (diamond, orange), player start (triangle), goal (star). Add a tiny legend reused on every map. Make each map structurally match its archetype:
   - Maze: branching rooms, 2 gates, 2 keys, one dead end. Flip: you're the keymaster the hero barged past and you have to relock everything. Hinge: talking the guard into lending a key.
   - Fetch: a hub room with an NPC, the item at the far end, a single gate on the way. Flip: you're the quest-giver; the hero never came back. Hinge: what you tell the NPC who's guarding the item.
   - Errand: a linear route with a timer glyph and one optional shortcut gate. Flip: you're the messenger whose letter starts the hero's plot. Hinge: chatting costs time but opens the shortcut.
   - Escort: two paths, with the "hero" icon on the main one and you on a parallel side path opening gates. Flip: you're the villager being "rescued." Hinge: whether you let the hero see you helping.
   - Patrol: a loop path with a sight-cone (semi-transparent wedge). Flip: you're the guard trying not to see. Hinge: lying to your captain changes the patrol route.
34. Takeaway: "Use a familiar shape. Make the character unfamiliar."

### Ch6 — One Concept, Start to Finish (movement 7)
35. Divider: "Reset"
36. **"Reset."** Logline large: "The hero cleared the dungeon last night. You're the caretaker, and you have until dawn to put it all back." IMAGE placeholder: key art (mop + key ring in lantern light).
37–50. **The 14 pitch sections.** Use one consistent template: a section number badge + section name as a `.title-highlight` heading (cyan), the "Reset" example below, and a diagram where listed.
   - 37. 1 · Title & Logline: "Reset". Whose story? The hero's. You mop up after it.
   - 38. 2 · Theme & Rhetoric: Progress, subverted. Every bit of the hero's progress undoes your work. They meet at one mechanic: relocking the gate you watched the hero open.
   - 39. 3 · Play Type & Magic Circle: ludus (goals, timer); agon vs. the clock, with some mimicry. The magic circle is the night shift. DIAGRAM: a horizontal paidia ↔ ludus slider with the marker near ludus.
   - 40. 4 · Core & Meta Loop: DIAGRAM: an inner core loop (reuse the `.loop-diagram` 4-node geometry: Find → Carry → Relock → Chat) inside a larger dashed outer ring labeled with the meta loop: "Each night: hero goes deeper · more mess · closer bonds".
   - 41. 5 · MDA Chains: DIAGRAM: two horizontal chains of 3 pills with arrows, colored M magenta / D cyan / A lime (match week08's MDA colors). Chain 1: Carry one item at a time, slowed → route planning & backtracking → Challenge. Chain 2: Befriend the goblin → shortcuts open → Fellowship.
   - 42. 6 · Narrative Map: DIAGRAM: a Twine-style node graph, Start → 3 NPC conversations (Goblin, Ghost, Cook), each with 2 choice edges. Mark false choices (edges that reconverge) with dashed lines and true choices with solid lines. Highlight the Playable Choice ("Tell the goblin the hero returns tomorrow?") with a glow, branching to "Goblin helps → shortcut" vs "Goblin leaves → wing closed".
   - 43. 7 · Agency Moments: TABLE, 2 cols, Mechanical | Narrative. Row: choosing which wing to fix first changes your route | leaving one trap unset changes the ending.
   - 44. 8 · Rhetoric Toolkit: TABLE, rows Verbs | carry, lock, sweep, talk (no attack); Rewards | the morning bell, never the hero's thanks; Identity | you have a name, the hero doesn't; Paratext | see section 12.
   - 45. 9 · Camera & Perspective: 2.5D side-on; the hero's fight plays out of focus in a background layer. DIAGRAM/mockup in CSS: three stacked parallax layers (background: blurred hero silhouette with CSS `filter: blur`; midground: dungeon floor; foreground: caretaker silhouette), with labels.
   - 46. 10 · Level Sketch: DIAGRAM: a top-down map using the Ch5 mini-map glyph system at full size: 3 rooms, 2 gates, 1 key, player start, and a dotted warm "lamplight" path showing guidance without text. Callout: one likely guidance problem ("players miss the side room → add a light").
   - 47. 11 · Look & Assets: IMAGE placeholder (mood board) + a row of 5 palette swatches as CSS divs (warm lantern ambers against cold dungeon blues).
   - 48. 12 · Paratext: IMAGE-style mock store card built in HTML: title "Reset", a key-art placeholder, tagline "Every legend leaves a mess."
   - 49. 13 · References: TABLE, headers Work | What We're Taking. Rows: Viscera Cleanup Detail | cleaning up after someone else's action game; Rosencrantz and Guildenstern Are Dead | minor characters at the edge of a bigger story; Untitled Goose Game | small verbs, clear goals; Night in the Woods | dialogue tone.
   - 50. 14 · Credits: who did what (show a simple 3-row example: Design / Narrative / Art).
51. Takeaway: "Every section should point back to the same idea."

### Ch7 — The Dev Ticket (movement 8)
52. Divider: "The Dev Ticket"
53. **Pitch vs. Ticket.** TABLE, headers Pitch | Dev Ticket. Rows: Sells the idea | Specifies the build; For an audience | For your developer; Slides | One page.
54. **What's on the Ticket.** Two-column checklist with checkbox glyphs: Character & verbs, Rooms & map, Gates & keys, Items, Timers & goals, NPCs & dialogue nodes, Flags, The Hinge, Off-menu checklist. FRAG per item.
55. **The "Reset" Ticket.** Build the filled-in ticket as an HTML "document card" (light paper-colored panel, monospace field labels, fills the slide, scaled to fit). Fields: Character: Caretaker (carry, lock, sweep, talk / can't attack). Rooms: 3 (Hall, Armory, Kitchen) + a tiny embedded mini map. Gates & keys: Armory gate ← iron key; Kitchen gate ← goblin shortcut. Items: 4 displaced objects → their original spots. Timer/goal: dawn bell / everything back in place. NPCs: Goblin, Ghost, Cook, 2–3 nodes each. Flags: (see next slide). Hinge: telling the goblin the truth opens the shortcut. Off-menu: all boxes checked.
56. **Flags, Up Close.** TABLE, headers Flag | Set By | Changes. Rows: `goblin_trusts_you` | telling the goblin the truth | kitchen shortcut opens; `ghost_helped` | returning the ghost's locket | an extra 2 min on the timer; `trap_left_unset` | skipping the trap room | the final scene changes. Highlight the hinge row with a glow + a "HINGE" tag.
57. **Your Assignment.** Fill out the Dev Ticket for your team's concept. Submit it with your pitch on Oct 30, as an attachment or the last slide of your deck. Bottom line in magenta: "If it's off the menu, rework it now, not in week 14."
58. **Recap.** Six lines, FRAG, each in its chapter's accent: I'm your developer. / Design inside the menu. / Build at least one hinge. / Character first. / Familiar shape, unfamiliar character. / Spec it on the ticket.

## Build notes
- Build the shared pieces first, then reuse them: `.vgs-table`, the mini-map glyph system + legend (used on 29–33 and 46), the loop diagram (17 and 40), the section-template layout (37–50).
- All diagrams must stay inside the slide area above the bottom bar (use the absolute `.diagram-slide` / `.content-slide` containers from week08) and must not overflow at 1920×1080 or at the default Reveal size.
- When done, open it in the dev server and click through every slide to check for overflow, readable contrast on highlights (dark text on bright fills), and that the movement colors in the status bar change at each chapter. Then commit as "week 9".
