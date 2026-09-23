# Craft: art direction for singular sites

**Load at:** Phases 4 and 5.

These principles come from close teardowns of the benchmark gallery's strongest pages (a lighthouse long-read, a weather sky, a pendulum instrument, a paper diorama, an ocean descent and a holographic card), checked against 100 pages. Each rule states the craft move and why it matters. Code recipes live in `techniques.md`.

## 1. One idea in at least four systems

Name the governing idea in one word or phrase (light, paper, depth, ink, tide, signal, growth). Then make it visible in at least four of these systems:

| System | Example: "light leaving a lamp" | Example: "cut paper" |
|---|---|---|
| Hero art | A beam sweeping from the lighthouse | Nine layered paper planes |
| Progress or navigation | Reading progress as a light cone from a tiny lighthouse | A luggage-tag title that swings on a string |
| Controls | "Return to the light" button | Torn-edge paper buttons |
| Ornaments and dividers | A drop cap with faint rays | Deckle-edged frame and stitched seams |
| Transitions | Dusk to night as you scroll | Day and night change layer by layer, back to front |
| Figures and data | A Fresnel lens diagram whose rays are red | Seeded "recut" of the forest |

**Test:** remove the words. Could you still tell what the site is about? Reject any effect that could be pasted into an unrelated site.

## 2. The hero is a composed picture

- **One focal point**, placed on purpose. The brightest or highest-contrast thing on the screen is the subject (the sun, the product, the lamp), not a button.
- **Make the art and the headline touch.** The art affects the type (light crosses it, a waterline cuts it, a figure stands between two words), or the type is part of the art. That single move makes a hero feel authored.
- **Compose a scene with a camera, not a picture that scales.** Draw the scene larger than the frame (extra sky above, extra ground below). Choose crops for at least three aspect bands (wide, near-square, portrait) so the focal subject and the copy area land where you intend on every screen. On phones, recompose: pull back, move the subject, change the count of elements.
- **Object-first budget** for object and instrument concepts: the subject takes 60–80% of the first viewport, the brand sits small in a corner, and everything else lives in one band attached to the object.
- **Build depth from cheap layers**: 6–15 planes, each a few shapes with gradients. Distant layers are lighter, cooler and lower-contrast. Use one key light and one counter-light of different temperatures, a rim highlight on edges facing the light, and 5 or more tiny living details on their own loops (a bird, smoke, a blinking light, a twinkle).
- **Seed the randomness** so the first frame is identical on every load. Offer "regenerate" only when it is part of the concept.

## 3. Material: make everything from the world

- **Pick one material and make the interface from it too.** Paper concepts get torn-edge buttons and stitched labels. Brass concepts get engraved plaques and knurled knobs. Glass concepts get frosted panels only over a living background. Default rounded cards and gradient buttons break the spell.
- **Frame the world as an object** when it helps: a mat, a vitrine, a bezel, a book plate, a gilt frame. Let the frame move less than its contents.
- **Borrow the real artefact's apparatus.** A magazine has a masthead, issue number, plate captions, folios, endnotes and a colophon. A ledger has ruled columns and stamped dates. A blueprint has a title block, scale and revision table. Instruments have engraved legends and LED indicators. These details read as crafted.
- **Controls as hardware or objects:** small tracked labels, hairline boxes, an LED dot for "on", detents on sliders, a dial for navigation (an elevator dial in a hotel, for example).

## 4. Light

- **One accent, used as light rather than fill.** Rims, glows, hairlines, numerals, focus rings and the one primary action. It covers a small share of the pixels (often under 5%) and never fills large surfaces.
- **Tint every shadow** toward the palette (warm brown by day, indigo at night). Never use neutral grey-black.
- **Light carries information.** Glow strength follows speed or activity. A lamp brightens a room variable. A torch reveals nearby things.
- **Fake the world cheaply but completely:** a vignette, a soft bloom behind the subject, a light pool on an implied floor, a specular band that stays fixed while the surface moves.

## 5. Texture is the default

A flat, perfect fill reads as generated. Almost every strong page has a surface: paper grain, film grain, laid lines, concrete, felt, wood, enamel speckle, a dot grid, scanlines.
- Put texture **on objects** (each paper layer, each panel) where possible, so it moves with them, not only on the screen.
- Keep it subtle: grain at about 4–16% opacity, with multiply on light grounds and overlay or screen on dark ones.
- Tint the grain toward the palette's darkest colour, never pure grey.
- Leave a surface flat only when the emptiness is the point (a black void for scale).

## 6. Palette

- **4–6 colours, each named after a real thing in the subject**, with exact hex values. The names keep the palette honest: "crema #c8a27a" belongs to a coffee roaster; "primary-500" belongs to no one.
- **Tinted grounds:** warm off-whites (#f4eee2, #f6f1e7) or tinted blacks (#070b1f, #0c0612) instead of pure white or black, unless the concept is stark by design.
- **Proportions:** roughly 60% ground, 30–35% secondary surfaces or dark scenes, and the rest for ink and accent. State the accent's job in one sentence and hold to it.
- **Alternate grounds on long pages** (light scene, dark scene) and join them with shaped edges (waves, torn paper, steps) rather than straight cuts.
- **Theme by state** when the concept has states (weather, day and night, zones): redefine the full set of colour tokens per state and fade between them. Keep meaning-bearing colours (scales, status, brand) fixed across states, and check each state's screenshot for colour that changed meaning.

## 7. Typography

Type carries much of a site's character. Choose a **treatment**, not just a family.
- **Extreme scale contrast.** Display type at 10–25% of the viewport height (sometimes more) against 10–12px labels tracked at 0.14–0.34em. Generic pages cluster between 16 and 64px. Use both extremes and skip the middle when you can.
- **Two or three voices at most:** a display voice, a text voice and often a mono or small-caps label voice for metadata and readings.
- **Book-level details in text:** a 60–66 character measure, line-height 1.5–1.7, old-style numerals in prose, tabular numerals in data, small caps for labels, indented paragraphs or generous paragraph spacing, `text-wrap: balance` on headings, hanging punctuation for pull quotes, a drop cap when the genre has one.
- **Draw the display type** as SVG when the look depends on a weight or shape system fonts can't guarantee (hairline numerals, stencil, Nouveau lettering, a wordmark). Keep the real text in the DOM for accessibility.
- **System stacks with character** (Showcase mode, or to avoid font loading):
  - Book serif: `"Iowan Old Style", "Palatino Linotype", Palatino, "P052", "URW Palladio L", Georgia, serif`
  - Didone display: `Didot, "Bodoni 72", "Bodoni MT", "Big Caslon", "C059", "Century Schoolbook L", serif`
  - Heavy grotesk: `"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif` at 800–900 with negative tracking
  - Geometric: `Futura, "Century Gothic", "URW Gothic", "Avenir Next", sans-serif`
  - Humanist: `"Avenir Next", "Segoe UI", Seravek, Candara, "Gill Sans", sans-serif`
  - Condensed poster: `"Bahnschrift Condensed", "Arial Narrow", "Roboto Condensed", Impact, sans-serif`
  - Inscriptional: `Optima, Candara, "Trajan Pro", "URW Classico", serif`
  - Soft display: `"Cooper Black", "Cooper Std", "Recoleta", Georgia, serif`
  - Instrument mono: `ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace`
  - Rounded: `ui-rounded, "SF Pro Rounded", "Nunito", "Varela Round", system-ui, sans-serif`
  Check how the stack falls back on Windows and Linux. If the fallback loses the character, draw the display type in SVG or load a web font in Project mode.
- **Web fonts in Project mode** are welcome when the concept needs them. Choose them for the anchor (era, trade, material), not for popularity.

## 8. Sections: every one has its own device

A section is a small idea, not a container. For each section, name its device:
- **Print devices:** a plate with a caption and number, a pull quote that breaks the column, a marginal note, a footnote that pops up, a colophon.
- **Object devices:** a ticket stub, a stamped card, a tear-off slip, a specimen label, a tag on a string, a polaroid with tape.
- **Instrument devices:** a dial, a gauge, a timeline with named phases, a readout with units, an exploded view.
- **Scene devices:** a pinned scene scrubbed by scroll, a day/night change, a camera move.
- **Data as editorial:** a value paired with a sentence, hairline meters instead of progress bars, shared scales across repeated items, charts that label only the extremes and "now".

Avoid equal-weight card grids, icon-in-circle features, stat tiles and testimonial carousels unless the concept turns them into something (a bento where every tile *does* something live is the exception that earns it).

## 9. Copy and world detail

- **Write copy as part of the conceit.** Use a kicker from the genre ("Plate XVIII · Paper diorama"), a headline with a line break chosen on purpose, and sentences in the voice the paragraph states.
- **Density of true detail:** add 5–10 small, specific, true-to-the-world details per page: an edition number, coordinates, a revision table, "complimentary engraving", "sheet 3 of 7", a footnote on what is approximate. Generic sites lack exactly this.
- **Real formulas and facts** where the subject has them (dew point, bake temperature, orbital period), accurate or hedged.
- **Honesty:** label fiction as fiction, hedge approximations, and never invent social proof.

## 10. Motion

Motion has four jobs. Give each one a style that fits the concept:

| Job | What it is | Guidance |
|---|---|---|
| **Idle life** | The world breathing before input | Slow, incommensurate loops (periods that don't line up), low amplitude, pre-rolled so the first frame is already in motion |
| **State change** | Mode, filter, day/night, selection | Parallel timelines: world cross-fade, token fade, content fade with slight blur, data morph, a physical indicator on a spring. Make it reversible mid-transition |
| **Scroll** | The story moving | Derived from one variable (`formats/scroll-journey.md`). Reveals with a reason (light, age, assembly) rather than a blanket fade-up |
| **Feedback** | Hover, press, focus | Fast (100–200ms), physical (press depth, LED glow, spring), in the material's language |

- **Easing vocabulary:** name 2–4 curves in the tokens, such as a long soft ease-out for reveals (`cubic-bezier(.18,.7,.16,1)` at 1.1–1.3s), a springy overshoot for playful feedback (`cubic-bezier(.3,1.6,.5,1)`), anticipation-and-overshoot for props (`cubic-bezier(.5,-.28,.25,1.22)`), and heavy slow ease-outs for weighty concepts. Match them to the material: paper flutters, brass settles, concrete is heavy.
- **Springs** for anything the user pushes: a title tag, a card tilt, a needle. Drive visual effects from the spring's output, not the raw pointer, so keyboard, idle and touch motion look right for free.
- **Rituals** for the main action: gather, hold, release. A reveal has anticipation, a break, emergence, one payoff and a settle.
- **One leading motion per viewport.** Everything else supports it. Equal-intensity animation everywhere becomes noise.
- **Reduced motion is a designed variant.** Freeze loops on a chosen beautiful frame, show assemblies in their finished state, swap movement for short fades, thin particles, and keep every interaction working.

## 11. Signature interactions and delight

- **Name interactions with the domain's verbs** ("Feed the starter", "Move the sun", "Release the pendulums", "Still the water"), and give each a visible, satisfying result.
- **At least one interaction should teach something true** about the craft (first crack in a roast, lamination layers, a shadow at a given hour).
- **For business sites, give one signature object per page** the full tactile treatment (a membership card, a product, a pricing plan, a menu) and keep the rest calm. Removing the effect must leave a working, conventional page.
- **Delight is small and specific:** a flour puff on the order button, a fox that blinks, a shooting star after a minute, a light that flickers when a sign is "broken".
- **Characters**, when a concept has one, follow the classic principles: anticipation, squash and stretch, arcs and idle life (blink, ear flick). They are focusable buttons with keyboard feedback.
- **Sound is seasoning:** off by default on business sites, with a visible toggle and a gesture to start. The page must feel complete when muted.
