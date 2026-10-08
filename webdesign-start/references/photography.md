# Photography art direction

**Load at:** Phase 2 (choosing the hero), Phase 3 (the paragraph's imagery), Phases 4 and 5 (building), Phase 6 and 7 (review). Use whenever a site carries photographs, whether the client's own or stock.

A photograph dropped into a rectangle is content. A photograph that the layout was drawn around is design. Small-business sites live or die on this: the photos are usually all they have, and a generic square image of bread next to a headline looks like every other bakery site. This file turns photographs into part of the interface.

**The rule:** every photograph is placed, cropped and graded because of the concept, and at least one moment per page lets the photograph break the grid. Photos that sit in uniform rectangles in a uniform grid fail.

## 1. Choose photos as a set, not one at a time

A page of individually good photos looks like a stock folder. A set looks like a photographer shot it.

- **One light.** Same quality and direction (soft window light from the left; hard midday sun; warm tungsten). Reject the odd one out, even if it is the best on its own.
- **One angle family.** Mostly overhead, or mostly eye-level three-quarter, or mostly macro. A page that jumps from drone to macro to flat-lay reads as unrelated.
- **One palette.** Pull the 3 to 5 dominant colours from the set and make them the site's palette (`aesthetics.md` §1). Reject a photo that fights it, or grade it into line (§4).
- **One depth of field and one texture of surface** (shallow and creamy, or sharp and graphic).
- **Same subject distance for like things.** All the pies at the same scale and angle if they will swap in one frame (§7).
- **Count:** a small business needs five to nine photos used well, not thirty used timidly.

### Finding matching sets

1. **Prefer the client's own photos**, even imperfect, treated with the concept (§4). Real photos of the real place and food beat stock every time, and stock must never be passed off as the client's work.
2. **Stock collections and photographers, not single searches.** On Unsplash and Pexels, find one photographer or one collection whose work matches the subject, then pull the whole set from that one person or collection. Their light, lens and edit are already consistent. A collection page ("pies", "florals, studio light") is a faster start than a keyword search.
3. **Search by the look, not only the subject:** "overhead flat lay warm window light", "studio backdrop single stem", "macro texture", "hands working".
4. **Check licences** and keep a credits list (photographer, source, licence) for the project; attribute where the licence asks.
5. **Download large** (the crop needs headroom), keep the originals, and record which photos are stock in the brief's assets list. In the report, mark every stock image as a placeholder to be replaced by the client's own.
6. **For selection swaps** (a menu of pies, a list of services) all the photos must come from the same shoot or collection and share the framing (§7).

When no photo set exists, say so, and choose a different hero (a drawn or rendered object, a type poster) rather than patching with mismatched images.

## 2. Crop and shape from the concept

The crop is a design decision, not a fit.

- **Crop with intent.** Cut into the subject where the concept says so: the crust, the petal, the weld, the face. Hold the focal point at a deliberate position (a third, an edge, dead centre only when symmetry is the idea).
- **Masks from the world.** Shape the photograph with the concept's own form: an arch for a doorway, a circle for a plate, a tall slot for a window, a torn edge, a wave, a notch, a single diagonal cut. Use `clip-path` or an SVG mask (`techniques.md` §9). Rectangles are allowed; a page made entirely of them is not.
- **Cut-outs.** Isolate the product from its background (a loaf, a bouquet, a mug) and let it overlap type, sections or other images. Use a transparent PNG/WebP or an SVG/CSS mask. A cut-out with a believable contact shadow lifts a page above stock.
- **Scale contrast.** One photograph huge and several small, never six equal ones. A tiny detail beside a full-bleed image says "craft".
- **Full-bleed moments.** At least one edge-to-edge photograph per page where text steps back to a single line or nothing.
- **Overlap with type.** Headline over the photograph's quiet area, or type behind a cut-out subject and in front of its background, so letters pass in front of and behind the object (`craft.md` §2).
- **Frames that are not boxes.** Overlapping prints with real shadows, a photo cropped by the section edge, a strip film, a window cut in a colour block.
- **No uniform grid.** Three or four equal tiles with equal gaps is the stock gallery. Vary size, aspect, and rhythm, or compose the set into one picture (a collage with overlap).
- **Aspect families.** Pick two or three ratios for the site (for instance tall 4:5, wide 16:9, a square used rarely) and use them with intent. Avoid the default square.

## 3. Sequences and composition

- **A sequence tells a story:** wide establishing, medium working, close detail, then the finished thing. Run it down the page as a cadence, not a pile.
- **Alternate scale and direction.** Subjects look into the page, not off it; a left-facing subject sits on the right.
- **Rhythm of density:** a dense collage section, then a single huge photo, then a quiet text moment.
- **Captions are content:** the dish name and price, the arrangement name, the job location. Never "Image 3".

## 4. One grade for the whole set

Photos from different sources need a single treatment so the page feels shot together.

- **Match white balance and contrast** (warm, neutral or cool) across the set. If the palette is warm, push the set slightly warm.
- **Choose one finish:** natural, a soft matte fade, a gentle duotone, a film grain. Apply the same to all (CSS `filter`, an SVG filter, or bake it into the files).
- **Never over-process.** The photograph of food looks like food; the grade is felt, not seen.
- **Duotone and multiply** are valid for headers and backgrounds (a photograph tinted into the palette behind type), never for product photos where accurate colour sells.
- **Shadow tint:** shadows and blacks lean toward the palette's darkest colour, not neutral black.

## 5. Respond to the interface

Photographs on a page where nothing changes are posters. Where it matters, they respond:

- **Selection swaps the photograph** (§7 and `techniques.md` §9): choose a pie, a service, a bouquet, a colour, and the main picture crossfades or slides to that item. This is the most important rule on a menu, a shop or a service list.
- **Hover and focus reveal:** hover a menu line to bring up its photo beside the cursor; focus shows it as well (keyboard), and on touch a tap does.
- **Scroll changes the crop:** a photograph that pans, scales or wipes with scroll progress, with transform only.
- **Parallax with discipline:** small depth shifts between a cut-out and its background, never travel that loses the subject.
- **Pointer gives depth:** a gentle tilt or shift on a cut-out, driven by a spring (`techniques.md` §7). Off on touch and reduced motion.
- **State changes the photo:** open or closed, day or evening, empty or full tray, if you have honest photographs for each.

## 6. Technical floor

- Real `<img>` (or `<picture>`) with `alt` describing the subject, width and height set, `srcset`/`sizes`, `loading="lazy"` below the fold and `fetchpriority="high"` for the hero. Backgrounds hold decoration only.
- Modern formats (AVIF/WebP) with a JPEG fallback; hero under about 200 KB at its display size where possible; keep the first frame under the performance budget (`build-standards.md`).
- Reserve space to avoid layout shift. Preload the images a selection will swap in (§7), so a click never shows a blank frame.
- Text over photographs keeps AA contrast, using a tinted gradient scrim or a quiet crop. Check at every width, since the crop changes.
- `object-position` set per breakpoint so the subject survives the phone crop.

## 7. Photo sets for selections

When the interface picks one thing from many (pies, services, bouquets, rooms, finishes):

- Shoot or source **every item the same way**: same angle, distance, light and background, so they swap without the frame jumping.
- The swap changes the **photo, the name, the price and the description together**, from one data object (`techniques.md` §9).
- Pre-load them all; crossfade in 200 to 350 ms, with the old image fading as the new one rises (a small scale or shift), never a blank flash.
- Reduced motion: an instant swap, nothing else.

## 8. Failures to check for

- Square stock photos in a three-up grid.
- A photo that has nothing to do with the section beside it (generic bread beside the menu of pies).
- A hero photograph under a headline-subline-button cluster (the formula, see `hero.md`).
- Mixed sets: warm flat-lay beside a cool wide shot beside a black-and-white one.
- A cut-out with no shadow floating on the page.
- Decorative photos where a diagram or the real thing would sell better.
- Text unreadable on a bright part of the picture on mobile.
- A selection list whose picture does not change.
