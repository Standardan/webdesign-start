# Polish: the last layer

**Load at:** Phase 6, after the build is complete and before the review. Also when a user says a site "feels unfinished" or "is missing something".

A site can be complete, on-concept and above the beauty floor, and still feel a notch below the benchmark gallery. The gap is almost always the same set of small things:
- chrome that collides with content;
- the same card repeated for a whole page;
- illustration that stops at "good vector";
- frames that look broken mid-motion;
- lone words, cut-off text and browser-default controls;
- devices from the brief that quietly turned into cards.

This phase exists to close that gap on purpose, not by luck. Treat it as a real pass, roughly a fifth of the build effort, not a final glance.

## How to run it

1. **Run the page audit** (`scripts/page_audit.js`) at 1440×900 and at 390×844. It scrolls the whole page and reports:
   - text passing under fixed chrome with no backing;
   - floating panels hiding content;
   - lone last words and cut-off text;
   - browser-default controls and placeholder filler;
   - four or more sections in a row built from the same block.
2. **Capture the whole page**, not just the first frame: a screenshot every 50–75% of a viewport height at both sizes, plus each interactive state and a few mid-animation frames.
3. **Work through sections 1–9 below** against those screenshots. Fix as you go, re-render, and repeat until the audit is clean and a full scroll finds nothing to fix.
4. **Record a polish log** for the review report: what was found and fixed, and any exception the user agreed to.

## 1. Chrome and layering

- **Fixed and sticky chrome** (headers, gauges, floating buttons) needs a clear zone. Either it has its own backing (a solid or blurred bar at ≥ 85% opacity, which a gradient fading to nothing is not), or content keeps out of its area with padding or `scroll-margin`.
- **Floating UI gets its own lane.** A floating widget (a dial, a cart, a chat bubble, a fixed call to action) never covers text, prices or controls at any scroll position or width. Reserve its lane in the layout, collapse it on phones, or move it when content arrives.
- **One z-order table** in the tokens: scene < content < art over type < chrome < overlays < modals. Nothing gets an ad-hoc `z-index: 999`.
- **Anchored navigation lands cleanly:** every in-page link scrolls to a heading that sits below the chrome, not under it.

## 2. Pause anywhere

Every frame must look finished, because every frame is a screenshot someone might take. Pause the page at random moments, or capture mid-animation frames, and check:

- **Rolling digits and counters** show whole digits at rest and at every scroll position. The window clips the drum exactly; motion is short and settles on whole values; no underscores, half-digits or doubled glyphs show in stills.
- **Simulations obey their world:** cars don't overlap or stop on crossings, particles don't pile at edges, characters don't clip through objects. Add spacing rules and collision checks to anything with more than one moving thing.
- **No layout shift:** fonts load with `font-display: swap` and a metric-matched fallback (`size-adjust`) so text doesn't jump. Media and canvases reserve their space, and nothing pops in late.
- **Transitions have no dead frames:** a cross-fade never passes through an empty or half-drawn screen, and loading states are designed, not blank.

## 3. Typography finishing

- `text-wrap: balance` on headings, and `text-wrap: pretty` on paragraphs and ledes. Then check: **no lone last word** on any line break at any width. Rewrite the line if the browser can't fix it.
- **Short labels never wrap** ("3.6 KM · COMPLAINT 03"): use `white-space: nowrap`, shorten them, or restack them deliberately on phones.
- **Real typographic characters:** curly quotes and apostrophes, en dashes for ranges (6–9), em dashes where the voice uses them, the multiplication sign (2 × €45), ellipsis (…). Put a non-breaking space between numbers and units (12.0 km, €39, 50 ml).
- **Numbers:** tabular numerals in anything that changes or lines up (prices in a list, times, counters); old-style numerals in running text if the typeface has them.
- **Large type alignment:** big display type is optically aligned. Pull round letters and quote marks slightly past the edge, so the stem, not the side bearing, lines up with the text below.
- **Consistent tracking** per role (display, text, labels). Never track lowercase text.

## 4. Every control, every state

- **Style every control in the site's material:** selects, date and time inputs, checkboxes, radios, ranges and file inputs. No browser-default arrows, calendar icons or grey widgets. Hide the native control visually (keeping it accessible) behind a custom one, or style it fully (including `::-webkit-calendar-picker-indicator`).
- **Design every state:** default, hover, focus-visible, pressed, disabled, loading, success, error, and empty. A button that submits shows progress, then a result.
- **Forms:**
  - real labels, and placeholders that show format rather than "you@example.com" filler;
  - error messages in the site's voice, next to the field;
  - `autocomplete` and `inputmode` set;
  - inputs at least 16px on phones, so iOS doesn't zoom;
  - selected values that fit their field at every width.
- **Touch:** targets at least 44×44px, and nothing that only works on hover.

## 5. Consistency and scale

- **One scale per scene.** Objects of the same kind share a size across layers and states. A zoomed-in hero car and a thumbnail car must agree on proportions and detail level. If the camera zooms, everything in that layer zooms with it.
- **Repeated elements match exactly** where they should (tags, cards, icons), and differ on purpose where they shouldn't.
- **Icons and line work** share one stroke width and corner style. Radii, shadows and spacing come only from the tokens.

## 6. Illustration and rendering detail

Drawn and procedural art needs a second pass after it works, or it stays at "good vector":
- **Soft shading where surfaces meet:** darken where a wall meets the ground, where objects touch, in corners and under overhangs.
- **Edge light:** a thin highlight on edges facing the light (roof lips, car bodies, window frames), and a slightly darker line on edges facing away.
- **Material variety:** at least three distinct material treatments in a scene (asphalt, brick, glass, metal, foliage), each with its own texture structure. Uniform noise over everything is not texture; it reads as dirt or low resolution.
- **Secondary detail:** every large surface carries 2–3 small, true-to-the-world details (vents, seams, signs, wear, drains, plants, reflections). Empty flat rectangles are unfinished.
- **Authored states:** night, weather and time-of-day variants each get their own palette and details (lit windows with variation, light spill, reflections), not a darkening filter over day.
- **Depth of detail:** the subject and near planes carry the most detail; far planes simplify. Detail is never evenly spread.

## 7. Device fidelity

For every device the Creative Direction Paragraph names, screenshot it and ask: **is it that thing, or a card standing in for it?**

| The paragraph says | It must look like | Not |
|---|---|---|
| "complaints painted on car-park lots" | paint on asphalt: in the scene's perspective and light, worn, under the shadows | a dark UI card with a border |
| "a paper key tag" | paper: grain, eyelet, string, slight curl, a shadow on what's behind it | a rounded rectangle with a hole |
| "lane words at a junction" | road paint in the lane, stretched as real road text is, visible, not under the car | a heading over the scene |

A device that became a card is a FAIL in the review's slot audit, even if everything else passes.

## 8. Section rhythm

Long pages need rhythm, or they become one repeated block:
- **Vary scale, density or layout at least every 2–3 sections.** Never build four sections in a row from the same block (the page audit flags this).
- **At least one full-bleed set piece** roughly every three screens on long pages: a moment where the art takes over and the text steps back.
- **Alternate text-led and art-led sections,** and leave at least one quiet pause: a single line, a big number, or a breath of scene.
- **Open and close with intent:** the first section after the hero continues the hero's world, and the ending resolves it (a finale, not a footer that just stops).

## 9. The last details

- `<title>`, meta description, favicon (drawn from the site's mark), `theme-color`, and an Open Graph image when the site will be shared.
- `::selection` in the palette, and focus rings in the site's language.
- A print stylesheet where people print (recipes, menus, itineraries, receipts).
- The final line of the page reads like an ending, with honest notes (fiction, sources, sample data) set with care, not as an afterthought.

## Whole-page calibration

Finish with the whole-page version of the gallery comparison (`aesthetics.md` §4). Scroll your page and two same-format gallery pages side by side, section by section, not just the first frame. At each point, ask which feels more finished, and why. Fix every "theirs", then compare again.
