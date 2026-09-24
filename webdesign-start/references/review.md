# Review: judge the render, not the code

**Load at:** Phase 4 (first frame) and Phase 7 (full review). Also for audit-only requests.

Every benchmark gallery page was rendered at 1440×900 and 390×844 and accepted only after its screenshots were reviewed. Run the same gate. Code that looks right often renders wrong.

## The loop

1. **Render.**
   - Screenshot each page at **1440×900** and **390×844**, first frame before any interaction.
   - Add a screenshot every 50–75% of a viewport height through the **whole page**. Checks that only ran on the first frame have missed mid-page chrome collisions, colour mud and repeated layouts.
   - Add each state (modes, day/night, open dialogs, hover on the signature object).
   - Add a reduced-motion render.
   - Use whatever you have: a browser pane, a headless browser (Playwright or Puppeteer), or the project's own tooling. If nothing can render, say so and ask the user for screenshots. Never claim a visual check you didn't do.
2. **Completeness gate first** (below). A site missing promised sections is not reviewed for beauty until it's complete.
3. **Look like the owner would.** Before checking any list, write the one thing that most reads as generic or unfinished.
4. **Cold critique.** Review the screenshots as a demanding art director who has *not* read the paragraph, and list the five worst problems. If your environment can run a separate reviewer (a subagent or a fresh session), give it only the screenshots and ask for exactly that. The builder is the worst judge of their own work.
5. **Beauty floor gate** (`aesthetics.md` §5): run `palette_check.py` on the tokens and screenshot, `squint_check.py` on the first frame, and `composition_audit.js` in the page, at both sizes. Then compare side by side with two same-format gallery pages. Any failure is fixed before anything else.
6. **Audit** with the sections below.
7. **Fix the worst finding first**, then re-render.
8. **Repeat** until a loop finds nothing worth fixing. Run at least two full loops for Phase 7. Record how many loops ran and what each caught.

## Completeness gate

Before any visual judgement, check that everything promised exists. Run this in the page (browser console or your automation tool):

```js
const ids = new Set([...document.querySelectorAll('[id]')].map(e => e.id));
const deadLinks = [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href').slice(1)).filter(id => id && !ids.has(id));
const emptySections = [...document.querySelectorAll('section, footer')].filter(s => s.innerText.trim().length < 20).map(s => s.id || s.className);
({ deadLinks, emptySections, hasFooter: !!document.querySelector('footer'), height: document.documentElement.scrollHeight });
```

Then tick the **build ledger** (the list of promises copied from the paragraph into the brief, `brief-template.md`):
- [ ] Every section named in the paragraph exists, with its device.
- [ ] Every named interaction works (mouse, touch, keyboard).
- [ ] Every delight detail exists.
- [ ] Every navigation link resolves, and the page has a proper ending (footer with the business facts, and any fiction or sample-data note).
- [ ] Every claim in the brief's decisions log ("added a footer note", "tags flip on tap") is true in the current render. Never record work as done without seeing it.

Any unchecked box is a FAIL. Build it, then continue.

## First-frame test (Phase 4, and again in Phase 7)

At both sizes, with no interaction:
- [ ] Would someone screenshot this and send it to a friend? If it's only "fine", it fails.
- [ ] One clear focal point, and it's the subject, not a button or a gradient.
- [ ] The governing idea is readable without the words.
- [ ] The art and the headline relate (light, overlap, cut, scale), not just sit side by side.
- [ ] It is already alive: idle motion running, simulations pre-warmed, nothing blank while waiting for scroll.
- [ ] The phone frame is recomposed, not a squeezed desktop. Nothing important is hidden or crowded. The title doesn't cover the subject.
- [ ] Texture and light are present (unless emptiness is the concept).
- [ ] The type has a treatment: scale contrast, a chosen case and tracking, and it isn't default-looking.
- [ ] **Silhouette test:** filled black, the scene's shapes are not just nested rectangles (`craft.md` §3).
- [ ] **Squint test:** one clear brightest area at the focal point, a readable light-to-dark structure, and no dead zones of flat colour.
- [ ] **Information lives in the world:** no web card pasted over the art. On phones, info and controls take no more than about 35% of the first screen (`craft.md` §4).
- [ ] **Lettering is real:** any named lettering tradition shows its specific marks, not a system font with a gradient and bevel. Text inside the art uses the world's lettering.
- [ ] **Each fact appears once** in the viewport.

## Slot audit (against the Creative Direction Paragraph)

Give every slot a verdict with evidence from the screenshots:

| Slot | Verdict | Evidence |
|---|---|---|
| Artefact type (does it read as that object?) | PASS / PARTIAL / FAIL | |
| Style anchor | | |
| Ground and palette (hex values used, accent stays in its job) | | |
| Hero (as described, drawn, idle behaviour present) | | |
| Each section's device | | |
| Device fidelity (each named device really is that thing, not a card standing in for it; `polish.md` §7) | | |
| Each named interaction (works by mouse, touch and keyboard) | | |
| Delight | | |
| Typography treatment | | |
| Mobile recomposition | | |
| Restraint sentence (was it respected?) | | |

A PARTIAL needs an explanation the user can accept. A FAIL is never "done".

## Sameness check

Fail the build if the render shows any of these, unless the paragraph calls for it by name:
- **The house look:** a cream ground, a heavy ink serif headline, one rationed accent, tracked-caps labels, fade-up reveals. Or a dark violet-blue glow with glass cards. Or hero, three cards, testimonials, CTA band.
- **Kit assembly:** a section that looks like a component-library demo: a component left in its demo styling, an overused effect with no reason (`component-sourcing.md`), equal-weight card grids, icon-in-circle features, stat tiles or a testimonial carousel.
- **Dated by accident:** a period, rustic or illustrated look the user never asked for, or modern-by-default parts rendered with bevels, glossy clip-art shading or faux-vintage texture.
- **Unmotivated effects:** an effect that could be pasted into an unrelated site (a generic gradient blob, a cursor trail, a random marquee).
- **Default type:** one neutral sans at medium weights everywhere, with no scale contrast.
- **Flatness:** untextured flat fills and neutral grey shadows, where the concept wants material.
- **Concept drift:** fewer than four systems carry the governing idea; ordinary controls ignore the material.
- **A generic first viewport:** remove the logo, and it could belong to a competitor.
- **The section template:** a small tracked-caps label, a big serif headline with one italic word in the accent colour, and a paragraph in the right-hand column. It creeps into sections after the hero even when the hero is strong.
- **Three equal columns:** three products, features or steps in identical boxes, evenly spaced. Vary scale, staging and rhythm, or turn them into one composed picture.
- **The boxy scene:** a drawn place made of square-on rectangles with no perspective, overlap or light falloff.
- **Pasted-on UI:** a bordered panel or card laid over the hero art.
- **WordArt and clip art:** display type faked with gradient, bevel and drop shadow; objects shaded with one glossy radial gradient.
- **The concept stops at the hero:** a section whose screenshot, header hidden, could belong to a different site (`craft.md` §11).

## Quality Contract audit

Check each of the 11 clauses (`creative-direction.md`) with evidence:
- **Crafted, not assembled:** any stock imagery, icon-pack decoration, or a component still in its library demo styling (default colours, radius, copy, effect intensity)?
- **Four systems** carrying the idea.
- **First frame** at both sizes.
- **Recomposed:** check 360, 390, 768, 1440 and 1920 widths, with no horizontal scroll.
- **Exact values:** no stray colours or fonts.
- **Motion:** loops pause when hidden and off-screen, DPR capped at 2, reduced-motion variant designed.
- **Accessibility:** contrast (including text over art and muted labels), focus visible, full keyboard path, touch equivalents for hover, labels, dialog focus.
- **Honesty:** no invented proof, fiction labelled, placeholders marked.
- **Robust:** no console errors, storage guarded, sound gated with a visible toggle.
- **Showcase grade:** 5–10 specific true-to-the-world details per page.

## Failures the benchmark pages still had (check for these)

These slipped past even strong pages. Look for them specifically:
- **Label collisions** in alternate views or at in-between widths (1200–1440px), and fixed gauges or HUDs crowding the subjects they sit next to.
- **Pointer-only reveals:** content revealed by a cursor, torch or hover that stays invisible on touch screens.
- **Colour that changes meaning:** gradients mapped to pixel position instead of data, meters that turn warning-coloured in a theme, "completed" states that become heavy filled shapes.
- **Long empty stretches** in scroll stories, with no beat for most of a screen.
- **Phone crowding:** the title block eating a third of the screen, or a hint bar overlapping the art.
- **Unstable labels:** a toggle whose accessible name doesn't change with its state, and hints that promise interactions that behave differently.
- **Wasted work:** animation loops that never stop, full repaints every frame, filters repainting large areas.
- **Low-contrast muted text** (for example 2.9:1 captions).
- **Fonts that exist on one OS only,** leaving the display type to a weak fallback elsewhere.

## Report format

```markdown
## Review: [project]

**Built:** [pages/sections, build mode, stack]
**Completeness:** [build ledger: every promise ✓, or what was added after the gate caught it]
**Beauty floor:** [palette_check at every scroll depth, squint_check per set piece, composition_audit and page_audit at 1440 and 390; the two gallery pages compared (first frame and whole page) and the verdict on colour, depth, composition and finish]
**Polish log:** [what the polish phase found and fixed; exceptions the user agreed to]
**Loops run:** [n]. Caught and fixed: [list]
**Slot audit:** [table, or a summary with every PARTIAL explained]
**First frame:** [pass notes at 1440 and 390]
**Quality Contract:** [pass, or each exception]
**Placeholders and assets still needed:** [list]
**Deferred:** [anything intentionally left, and why]
```

For audit-only requests, report findings ranked by severity, each with a screenshot reference and a concrete fix. Don't build.
