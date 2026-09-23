# The Creative Direction Paragraph

**Load at:** Phase 3.

Every page in the benchmark gallery came from one dense paragraph of about 150 words, followed by a quality block that was identical for all 100 pages. The paragraph carries **all** the variation, and the fixed block carries the quality floor. This file teaches you to write both.

## Why a paragraph and not a form

A form of fields ("primary colour: ___") invites the model's defaults, one field at a time. A paragraph forces the decisions to fit together: the palette belongs to the material, the type belongs to the era, and the interactions belong to the craft. It is also exactly the kind of input that makes a strong model produce its best work. Write it as a creative director would brief a studio: specific, visual, confident.

## Slot order

Write one paragraph (not bullets) with these slots, roughly in this order. Palette and hero come early because they decide the first frame.

1. **Verb, name and tagline.** "Design 'Name — tagline', …". The tagline states the concept in a few words.
2. **Artefact type and subject.** What the site *is* ("a bound baker's ledger for a sourdough bakery"), not just its topic. Mark fictional subjects as fictional.
3. **Style anchor.** Exactly one movement, era, tradition or material ("in the spirit of 19th-century letterpress ledgers").
4. **Ground and palette.** Describe the ground as a material, with its hex ("cotton-paper cream #f4eee2 with a faint laid-paper texture"). Then add 3–5 colours, each a *named thing* plus hex ("iron-gall ink #2a2622, letterpress red #b3261e, rye crust #7a4a26"). Give the one accent a stated job ("red only for dates, stamps and the primary action").
5. **Hero.** One specific picture, drawn for this site, and the rendering method where it isn't obvious (SVG, canvas, CSS 3D, stroke-drawing, treated photograph). Include what it does on its own before any interaction, and how it relates to the headline.
6. **Sections, each with its own device.** "Breads as ledger plates with hydration and bake time in ruled columns; the story as a scroll-drawn timeline of the starter's 40 years; hours as a stamped card; ordering as a tear-off slip." Never just a list of section names.
7. **Interactions named with domain verbs.** 2–4 of them, each with its visible result: "Feed the starter (click the jar: bubbles rise and the level climbs)"; "Score the loaf (drag across the dough; the cut blooms open)". Style ordinary controls as in-world objects.
8. **Delight.** 1–2 small surprises: idle life, a hover detail, an easter egg.
9. **Typography treatment.** The character and the *treatment*: scale, case, tracking, small caps, numerals, drawn lettering. Name the stack (or web font when the build mode allows it).
10. **Mobile recomposition.** What changes and what stays prominent on a phone ("the jar stays centred above the headline; ledger plates become a swipeable stack").
11. **Restraint.** One sentence that sets a ceiling: "Quiet and precise; nothing gaudy; legibility of the menu first."

For multi-page sites, write a short **site paragraph** (name, artefact, anchor, ground and palette, type, the governing idea, navigation device, global motion) and one **page paragraph** per page (hero, sections with devices, interactions, delight, mobile).

## Checklist

- [ ] One paragraph, about 150–250 words, starting with an imperative verb.
- [ ] A quoted name with a tagline that states the concept.
- [ ] An artefact type, not just "a website for X".
- [ ] Exactly one style anchor.
- [ ] Ground described as a material, 3–6 hex colours each named after a real thing, one accent with one stated job.
- [ ] A single hero picture drawn for this site, with idle behaviour, so the first frame is beautiful before any interaction.
- [ ] The rendering technique named where it isn't obvious.
- [ ] Every section has its own device.
- [ ] 2–4 interactions named with the domain's verbs, each with a visible result.
- [ ] At least one delight detail.
- [ ] A typography *treatment*, not only a family name.
- [ ] A specific mobile recomposition sentence.
- [ ] A restraint sentence.
- [ ] Uses at least two of the business's particulars.
- [ ] Real facts, or fiction labelled as fiction; copy voice stated.
- [ ] Passes the house-look check in `concept.md`.

## Worked examples (original, illustrative)

**A sourdough bakery (print artefact):**

> Design "Starter No. 1983 — A Ledger of Slow Bread", a single-page site for a riverside sourdough bakery, made as a bound baker's ledger in the spirit of 19th-century letterpress account books. Ground: cotton-paper cream #f4eee2 with a faint laid-paper texture; palette: iron-gall ink #2a2622, rye crust #7a4a26, flour white #fbf8f1, and letterpress red #b3261e used only for dates, stamps and the order button. Hero: an engraved-style SVG drawing of the glass starter jar on a ruled ledger page, bubbles slowly rising through the dough, with the name set in tall letterpress capitals that sit on the ledger's red rule. Sections: each bread as a ledger plate (hydration, proof and bake time in ruled columns with old-style numerals); the starter's forty years as a timeline that inks itself in as you scroll; hours as a date-stamped card; ordering as a tear-off slip. Interaction: "Feed the starter" (click the jar and the level climbs as bubbles rise); hovering a bread lays a pencil tick in its margin. Delight: a faint flour dusting drifts off the jar when the cursor passes. Typography: a book serif (Iowan Old Style, Palatino, Georgia, serif) with small caps for labels and hanging numerals; the name in drawn SVG capitals. Mobile: the jar stays centred above the name; plates become a vertical stack of cards with the same ruled columns. Warm, patient and precise; nothing cute; the hours and address are always one glance away.

**An architecture studio (poster/type-led plus object):**

> Design "MASS — Studio for Heavy Architecture", a portfolio for a small concrete-and-timber architecture practice, made as a large-format exhibition poster crossed with a site model, in the spirit of Brutalist monographs. Ground: board-formed concrete #b9b6af with a procedural shutter-plank texture and tie-holes; palette: raw timber #c89b6d, graphite #1d1d1f, drafting blue #2f4a7a, and oxidised copper #4f7f73 used only as light and line: section cuts, the active project, focus rings. Hero: the word MASS in a heavy, tightly tracked grotesk at a quarter of the viewport height, cut through by an axonometric SVG model of the studio's best-known house; a sun slider sweeps its shadow across the letters. Sections: projects as a horizontal track of drawings that scroll sideways; each project opens from its exact tile into a full-screen case study; process as a drafting sheet whose lines draw themselves; contact as a title block with scale, sheet number and revision. Interaction: "Move the sun" (drag to change the hour and shadow angle); hover a project to lift its roof off the model. Typography: heavy grotesk (Helvetica Neue, Arial Nova, Arial, sans-serif) at weight 800 with −0.05em tracking against 10.5px mono captions tracked at 0.18em. Mobile: MASS stacks into two lines with the model behind; the project track becomes a vertical list. Weighty and exact; slow, heavy easing; no playful bounce.

## The Quality Contract

Append this block **unchanged** to every paragraph, in the brief and in any prompt you hand over. Its wording is deliberately fixed. The paragraph varies and the contract does not.

```text
QUALITY CONTRACT (applies to every page of this site)
1. Made, not sourced. The signature visuals (hero art, scenes, ornaments, textures) are drawn for this
   site in SVG, canvas or CSS, or built from the client's own photography treated by the concept. No stock
   imagery, decorative icon packs or UI-kit demo layouts carry the look.
2. One governing idea. The idea in the paragraph is visible in at least four systems: the hero, navigation
   or progress, interactive controls, and transitions or ornaments.
3. A beautiful first frame. At 1440×900 and 390×844 the first viewport is finished and alive before any
   interaction: idle motion is running, simulations are pre-warmed, and nothing waits for scroll to look good.
4. Recomposed, not scaled. Phones get their own composition of the hero and sections, from 360px to large
   desktops, with no horizontal scroll.
5. Exact values. The palette, type treatments, spacing rhythm and easing come from the paragraph and are
   defined once as tokens; there are no ad-hoc colours or default fonts.
6. Motion with manners. Animation uses transform and opacity through requestAnimationFrame or CSS, pauses
   when the tab is hidden or the element is off-screen, caps canvas DPR at 2, and has a designed calmer
   variant under prefers-reduced-motion.
7. Accessible. Semantic HTML, WCAG AA text contrast, visible :focus-visible styles in the site's own
   language, keyboard access to every interaction, pointer events for mouse and touch, touch equivalents
   for anything hover-driven, labels on controls, alt text or role="img" descriptions on meaningful art.
8. Honest content. Original copy in the paragraph's voice, with no lorem ipsum. Facts are accurate or hedged.
   Fictional brands, people and data are labelled as fictional. No invented testimonials, logos, metrics
   or reviews for a real business; missing content uses clearly marked placeholders.
9. Robust. No console errors; storage access is wrapped in try/catch; sound, if any, is synthesised or
   supplied, starts only after a user gesture and has a visible mute toggle.
10. Showcase grade. Visually impressive, bookmark-worthy and full of small, specific, true-to-the-world
    details, and clearly distinct from generic templates and from this skill's other work in concept, layout,
    palette, typography and motion.
```

The build mode (`build-standards.md`) may add constraints. Showcase mode also requires one self-contained HTML file with no external requests and system font stacks only.

## Prompt-only delivery

When the user wants a prompt to take elsewhere (another model, a design tool, a freelancer), deliver:

1. the paragraph (or the site paragraph and page paragraphs);
2. the Quality Contract;
3. the build-mode line ("Deliver one self-contained HTML file…" or the project's stack);
4. one line on review: "Before finishing, render at 1440×900 and 390×844, compare with this brief item by item, and fix what doesn't match."

Put it in one fenced block so it can be copied cleanly.
