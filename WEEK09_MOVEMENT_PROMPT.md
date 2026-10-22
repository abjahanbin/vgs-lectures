# week09 update: add movement-mode material

`week09/index.html` is already built from WEEK09_PROMPT.md. Add the movement material below **into the existing deck**. Don't rebuild or restyle anything else. Reuse what's already in the deck: `.vgs-table`, the mini-map glyph system + legend, the chapter accents, FRAG conventions, and the `data-movement` per chapter. Find slides by their headings, not by number, since numbering has shifted. Run `npm run build` when done, click through the changed slides in the dev server, and commit as "week 9 movement".

## 1. Ch2 — "The Menu" brick grid
Update the **Movement** tile's one-line description to: "Pick ONE mode: walk / jump / hover / fly".

## 2. Ch4 — three new slides, inserted after "Verbs Are Character" and before the Ch4 takeaway
All three are `data-movement` = Ch4's number, in the orange accent.

**a. How Do You Move?**
Subline: "Movement is your first and biggest verb."
`.vgs-table`, headers Mode | Precedent | What the Level Needs. FRAG per row:
- Walk only | Untitled Goose Game, Night in the Woods | walls, doors, and people are the obstacles, not gaps
- Jump | Super Mario Bros., Celeste | gaps and ledges tuned to your jump height and distance
- Hover / Glide | Kirby, Yoshi's flutter, Breath of the Wild's paraglider | long drops, updrafts, landing targets
- Fly | Journey, Sky | ceilings, enclosed rooms, gates that block the whole opening

**b. Movement Builds the World**
DIAGRAM: the same level slice shown 3 times side by side as equal panels (SVG). The slice is ground on the left, a gap, a ledge on the right, and a gate on a raised platform beyond it. Each panel has a different character glyph (reuse the player triangle from the mini-map system, with a small label) and a dotted trajectory:
- **Walker:** the path stops at the gap edge with a magenta X → caption "needs a bridge or a door"
- **Jumper:** a parabolic arc clears the gap and lands on the ledge, then stops at the gate → caption "gap tuned to the jump"
- **Flyer:** a high arc passes over the gap AND over the top of the gate → caption "gate needs a ceiling"

FRAG per panel. Below the panels: "Pick the movement first. It decides your level." Smaller: "(This is what Project 2 was about.)"

**c. Pick a Precedent**
Main line: "Name one game whose movement yours feels like, and borrow its metrics."
Then a two-column contrast block (`.content-trio`-style but 2 columns, or a 2-col `.vgs-table`):
- **The Hero:** sprint, double-jump, dash
- **You:** walk, carry, short hop

Closing line as a single `.title-highlight` (orange): "The hero gets the double-jump. What do you get?"

**Ch4 takeaway:** change the text to "Pick the character before the mechanics, and the movement before the map."

## 3. Ch5 — archetype mini-maps
On each of the 5 archetype slides, add a small movement tag pill in the top corner of the map (Russo One, accent outline, dark fill) showing which mode the map assumes:
- Key & gate maze → WALK
- Fetch quest → JUMP
- Timed errand → WALK
- Escort → JUMP
- Patrol & avoid → WALK

Add the tag style to the shared legend so it reads as part of the glyph system.

## 4. Ch6 — "Reset" walkthrough
Insert one new section-template slide right after "9 · Camera & Perspective" (same template/badge style; use "9b" as the badge, so the 14-section numbering isn't broken):
- Heading: **Movement**
- Body: Walk + a short hop; slower while carrying. Precedent: *Untitled Goose Game* (grounded, carrying objects). The hero's double-jump happens in the background layer. You watch it, but you never have it. So gaps are blockers, and corridors and doors are the level.
- Small DIAGRAM: one panel in the same style as Ch4's "Movement Builds the World," showing the caretaker glyph with a tiny hop arc that falls short of a gap, plus a weight icon (small orange diamond = carried item) and the label "carrying: −speed".

## 5. Ch7 — Dev Ticket
- **"What's on the Ticket"** checklist: insert "Movement mode + precedent" as the second item, after "Character & verbs".
- **"Reset" ticket card:** add a field after Character: `MOVEMENT: walk + short hop, slowed while carrying · precedent: Untitled Goose Game`. Re-check that the card still fits the slide without overflow; tighten font size slightly if needed.
- **Recap slide:** change "Character first." to "Character first. Movement before the map."
