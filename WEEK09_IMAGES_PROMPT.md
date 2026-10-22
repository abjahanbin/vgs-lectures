# week09 update: replace image placeholders with real images

`week09/index.html` is built and has `.img-placeholder` boxes. Replace the IMAGE placeholders below with real public-domain images. Leave the 4 CLIP placeholders (Ch2 "Menu in Action") alone; those will be my own Unity captures. Don't restyle anything else. When done, run `npm run build`, click through the changed slides in the dev server, and commit as "week 9 images".

## 1. Download the images
Save each into `week09/assets/<folder>/` with the filename given. For the Met objects, first GET `https://collectionapi.metmuseum.org/public/collection/v1/objects/<ID>` and confirm `isPublicDomain` is `true` before downloading `primaryImage`. If any URL fails, use that object's `primaryImageSmall`. If the Rijksmuseum file fails at `max`, use `full/1024,/0/default.jpg`. After downloading, resize anything over 2400px on its long edge down to 2400px (keep JPG, quality ~85) so the build stays light.

| Folder / file | Source | Object |
|---|---|---|
| `not-your-story/bruegel-fall-of-icarus.jpg` | **already in place** (copied from week01) | Bruegel, *Landscape with the Fall of Icarus* |
| `reset/piranesi-pier-with-chains.jpg` | Met 362799 → `https://images.metmuseum.org/CRDImages/dp/original/DP828197.jpg` | Piranesi, *The Pier with Chains*, Carceri, ca. 1749–50 |
| `reset/piranesi-sawhorse.jpg` | Met 362796 → `https://images.metmuseum.org/CRDImages/dp/original/DP828186.jpg` | Piranesi, *The Sawhorse*, Carceri, ca. 1749–50 |
| `reset/lantern-1770.jpg` | Met 4739 → `https://images.metmuseum.org/CRDImages/ad/original/97378.jpg` | Lantern, ca. 1770 |
| `reset/lantern.jpg` | Met 4733 → `https://images.metmuseum.org/CRDImages/ad/original/13350.jpg` | Lantern, 1700–1900 |
| `reset/key-17c.jpg` | Met 187023 → `https://images.metmuseum.org/CRDImages/es/original/36237.jpg` | Key, 17th century |
| `reset/key-double-ended.jpg` | Met 186962 → `https://images.metmuseum.org/CRDImages/es/original/36261.jpg` | Double-ended key, mid-17th c. |
| `reset/maid-sweeping.jpg` | Rijksmuseum RP-T-1921-260 → `https://iiif.micr.io/yveeG/full/max/0/default.jpg` | Louis Henri de Fontenay, *Maid Sweeping the Hallway of a House*, 1837 |

## 2. Wire them in

**Ch4 — "Not Your Story"** (placeholder: "a frame where the hero is out of focus / cropped…")
Replace it with the Bruegel as a `.photo-caption` figure, at the same footprint or slightly larger if it fits. Caption: "Bruegel, *Landscape with the Fall of Icarus*. The hero's story is the splash in the corner." Add a subtle pulsing ring (CSS, lime/orange outline, low opacity) over Icarus's legs in the lower right, as a fragment, so I can reveal "there's the hero" while talking. Position the ring with percentage coords and check it lands on the legs.

**Ch6 — "Reset" title slide** (placeholder: "key art — mop + key ring in lantern light")
Build the key art from `piranesi-pier-with-chains.jpg` as a wide `object-fit: cover` crop. Grade it in CSS toward cold blue-grey (e.g. `filter: grayscale(.4) contrast(1.1) brightness(.7)` plus a blue multiply overlay), then add a warm radial-gradient "lantern glow" overlay (amber, ~35% opacity) off-center lower-left. Overlay the title "RESET" in Russo One. Keep it at the placeholder's footprint or wider if the slide allows.

**Ch6 — "11 · Look & Assets"** (placeholder: "mood board")
Replace it with a 3×2 CSS grid mood board (small gaps, rounded corners, `object-fit: cover`): piranesi-sawhorse, lantern-1770, key-17c, maid-sweeping, lantern, key-double-ended. Apply the same cool grade to the Piranesi tile and leave the objects natural so the warm/cold contrast reads. Keep the existing palette swatch row under it.

**Ch6 — "12 · Paratext" store card** (placeholder: "key art")
Reuse the exact key-art treatment from the Reset title slide (pull it into one shared class in week09's `<style>` rather than duplicating CSS).

## 3. Credits
Add one small image-credits line at the bottom of each slide that uses these images (like week01's captions, ~0.25em, muted), e.g. "Piranesi, Carceri (ca. 1749–50); objects: The Met, public domain; de Fontenay (1837): Rijksmuseum, public domain." For the Bruegel the caption is enough.
