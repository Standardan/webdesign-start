# The Creative Direction Paragraph

**Load at:** Phase 3.

Every page in the benchmark gallery came from one dense paragraph of about 150 words, followed by a quality block that was identical for all 100 pages. The paragraph carries **all** the variation, and the fixed block carries the quality floor. This file teaches you to write both.

## Why a paragraph and not a form

A form of fields ("primary colour: ___") invites the model's defaults, one field at a time. A paragraph forces the decisions to fit together: the palette belongs to the material, the type belongs to the era, and the interactions belong to the craft. It is also exactly the kind of input that makes a strong model produce its best work. Write it as a creative director would brief a studio: specific, visual, confident.

## Slot order

Write one paragraph (not bullets) with these slots, roughly in this order. Palette and hero come early because they decide the first frame.

1. **Verb, name and tagline.** "Design 'Name — tagline', …". The tagline states the concept in a few words.
2. **Artefact type and subject.** What the site *is* ("a scroll journey through one night of baking", "a product page built around one living object"), not just its topic. Mark fictional subjects as fictional.
3. **Style anchor.** Exactly one design language, movement, tradition or material ("contemporary Californian editorial", "Swiss-precise product film", "soft-industrial Scandinavian"). Contemporary by default (`craft.md`).
4. **Ground and palette.** Describe the ground as a material or light, with its hex ("marine-layer grey #d9dde0 warming to sunrise sand #f3e6d3"). Then add 3–5 colours, each a *named thing* plus hex ("night ink #111418, crust #9a5a2b, oven orange #ff7a2f"). Give the one accent a stated job ("oven orange only as light and for the primary action").
5. **Hero.** One specific picture made for this site, and how it is made: a restyled component, a canvas or WebGL scene, CSS 3D, SVG, or the client's photography treated by the concept. Include what it does on its own before any interaction, and how it relates to the headline.
6. **Sections, each with its own device.** "The night as a pinned scroll scene with a running clock; the breads as large product moments with a crumb close-up on hover; hours set huge at sunrise with a live open-now line." Never just a list of section names.
7. **Interactions named with domain verbs.** 2–4 of them, each with its visible result: "Feed the starter (click the jar: bubbles rise and the level climbs)"; "Score the loaf (drag across the dough; the cut blooms open)". Style ordinary controls as in-world objects.
8. **Delight.** 1–2 small surprises: idle life, a hover detail, an easter egg.
9. **Key components.** The 2–4 components that carry the look, named by behaviour and source, and how each is restyled ("a spotlight card from Aceternity, relit as warm oven light"; "Magic UI number ticker for loaves left, in tabular Geist Mono"). The full surface-by-surface plan goes in the brief (`component-sourcing.md`).
10. **Typography treatment.** The character and the *treatment*: scale, case, tracking, numerals, drawn lettering. Name the fonts (contemporary web fonts by default; system stacks only for the offline single-file variant).
11. **Mobile recomposition.** What changes and what stays prominent on a phone ("the loaf stays centred above the headline; the night scene shortens to four beats").
12. **Restraint.** One sentence that sets a ceiling: "Quiet and precise; nothing gaudy; legibility of the menu first."

For multi-page sites, write a short **site paragraph** (name, artefact, anchor, ground and palette, type, the governing idea, navigation device, global motion) and one **page paragraph** per page (hero, sections with devices, interactions, delight, mobile).

## Checklist

- [ ] One paragraph, about 150–250 words, starting with an imperative verb.
- [ ] A quoted name with a tagline that states the concept.
- [ ] An artefact type, not just "a website for X".
- [ ] Exactly one style anchor.
- [ ] Ground described as a material, 3–6 hex colours each named after a real thing, one accent with one stated job.
- [ ] A single hero picture made for this site, with idle behaviour, so the first frame is beautiful before any interaction.
- [ ] How the hero is made (component, scene, 3D, SVG, treated photography).
- [ ] 2–4 key components named, each with its restyle.
- [ ] Contemporary register, unless the user asked for a period or illustrated style.
- [ ] Every section has its own device.
- [ ] 2–4 interactions named with the domain's verbs, each with a visible result.
- [ ] At least one delight detail.
- [ ] A typography *treatment*, not only a family name.
- [ ] A specific mobile recomposition sentence.
- [ ] A restraint sentence.
- [ ] Uses at least two of the business's particulars.
- [ ] Real facts, or fiction labelled as fiction; copy voice stated.
- [ ] Passes the house-look check in `concept.md`.
- [ ] The palette passes `scripts/palette_check.py` and the colour rules in `aesthetics.md` (one accent hue, value-separated families, ramps that lean yellow as they lighten).

## Worked examples (original, illustrative)

**A sourdough bakery (contemporary, scroll journey):**

> Design "Hermosa — Open at Six", a single-page site for a sourdough bakery two blocks from the Hermosa Beach pier, told as a scroll journey through one night of baking, from the 4 p.m. mix to the 6 a.m. doors, in a contemporary Californian editorial language. Ground: marine-layer grey #d9dde0 warming to sunrise sand #f3e6d3 as you scroll; palette: night ink #111418, crust #9a5a2b, flour #fbf8f3, and oven orange #ff7a2f used only as light and for the primary action. Hero: a full-bleed, softly lit 3D-rendered boule turning slowly on a steel bench, steam rising, with "Open at six" in a tight, oversized grotesk that the loaf's shadow falls across. Sections: the night as a pinned scroll scene whose light shifts from dusk to dawn while a mono clock counts 16:00 → 06:00; the three breads as large product moments with a crumb close-up on hover; hours and address set huge at the sunrise, with a live "open now / opens in 3h 12m" line in Pacific time. Key components: a GSAP-pinned scroll scene; a Magic UI number ticker for the clock, restyled in tabular mono; an Aceternity-style spotlight on the bread cards, relit as warm oven light; shadcn sheet for the menu on phones. Interaction: "Score the loaf" (drag across the dough and the cut blooms open). Delight: at sunrise the page's light warms and the ground turns sand. Typography: a sharp neo-grotesk display at 12vw with −0.04em tracking, a contemporary serif for text, and mono for times. Mobile: the loaf stays centred above the headline; the night scene shortens to four beats. Warm, clean and confident; nothing rustic or vintage; hours and address always one tap away.

**An architecture studio (poster/type-led plus object):**

> Design "MASS — Studio for Heavy Architecture", a portfolio for a small concrete-and-timber architecture practice, made as a large-format exhibition poster crossed with a site model, in the spirit of Brutalist monographs. Ground: board-formed concrete #b9b6af with a procedural shutter-plank texture and tie-holes; palette: raw timber #c89b6d, graphite #1d1d1f, drafting blue #2f4a7a, and oxidised copper #4f7f73 used only as light and line: section cuts, the active project, focus rings. Hero: the word MASS in a heavy, tightly tracked grotesk at a quarter of the viewport height, cut through by an axonometric SVG model of the studio's best-known house; a sun slider sweeps its shadow across the letters. Sections: projects as a horizontal track of drawings that scroll sideways; each project opens from its exact tile into a full-screen case study; process as a drafting sheet whose lines draw themselves; contact as a title block with scale, sheet number and revision. Interaction: "Move the sun" (drag to change the hour and shadow angle); hover a project to lift its roof off the model. Typography: heavy grotesk (Helvetica Neue, Arial Nova, Arial, sans-serif) at weight 800 with −0.05em tracking against 10.5px mono captions tracked at 0.18em. Mobile: MASS stacks into two lines with the model behind; the project track becomes a vertical list. Weighty and exact; slow, heavy easing; no playful bounce.

## The Quality Contract

Append this block **unchanged** to every paragraph, in the brief and in any prompt you hand over. Its wording is deliberately fixed. The paragraph varies and the contract does not.

```text
QUALITY CONTRACT (applies to every page of this site)
1. Crafted, not assembled. The signature visuals are made for this site: premium components restyled
   to its tokens and concept, drawn or rendered scenes, or the client's own photography treated by the
   concept. No stock imagery, no decorative icon packs, and no component left in its library demo styling.
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
11. Beautiful by measure. One accent hue; no two opposite hues covering large areas at the same darkness;
    tinted neutrals; warm colours on dark grounds used as light, not dull surfaces. One key light, with every
    shadow and highlight consistent with it; grounded objects with contact shadows; one projection and one
    horizon in drawn scenes, with no near-straight "almost" angles. The subject is the strongest thing on the
    screen when squinting. Edges exactly aligned or clearly apart; a real type scale; no stray rotations or
    stretched lettering. Never weaker in colour, depth or composition than the benchmark gallery's pages.
```

The build mode (`build-standards.md`) adds its own constraints: single-file or project, and the offline variant's no-external-requests rule.

## Prompt-only delivery

When the user wants a prompt to take elsewhere (another model, a design tool, a freelancer), deliver:

1. the paragraph (or the site paragraph and page paragraphs);
2. the Quality Contract;
3. the build-mode line ("Deliver one self-contained HTML file…" or the project's stack);
4. one line on review: "Before finishing, render at 1440×900 and 390×844, compare with this brief item by item, and fix what doesn't match."

Put it in one fenced block so it can be copied cleanly.
