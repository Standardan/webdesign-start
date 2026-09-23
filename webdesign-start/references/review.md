# Review: judge the render, not the code

**Load at:** Phase 4 (first frame) and Phase 6 (full review). Also for audit-only requests.

Every benchmark gallery page was rendered at 1440×900 and 390×844 and accepted only after its screenshots were reviewed. Run the same gate. Code that looks right often renders wrong.

## The loop

1. **Render.**
   - Screenshot each page at **1440×900** and **390×844**, first frame before any interaction.
   - Add screenshots at key scroll depths (every set piece, and about every 25% of a long page).
   - Add each state (modes, day/night, open dialogs, hover on the signature object).
   - Add a reduced-motion render.
   - Use whatever you have: a browser pane, a headless browser (Playwright or Puppeteer), or the project's own tooling. If nothing can render, say so and ask the user for screenshots. Never claim a visual check you didn't do.
2. **Look like the owner would.** Before checking any list, write the one thing that most reads as generic or unfinished.
3. **Audit** with the sections below.
4. **Fix the worst finding first**, then re-render.
5. **Repeat** until a loop finds nothing worth fixing. Run at least two full loops for Phase 6. Record how many loops ran and what each caught.

## First-frame test (Phase 4, and again in Phase 6)

At both sizes, with no interaction:
- [ ] Would someone screenshot this and send it to a friend? If it's only "fine", it fails.
- [ ] One clear focal point, and it's the subject, not a button or a gradient.
- [ ] The governing idea is readable without the words.
- [ ] The art and the headline relate (light, overlap, cut, scale), not just sit side by side.
- [ ] It is already alive: idle motion running, simulations pre-warmed, nothing blank while waiting for scroll.
- [ ] The phone frame is recomposed, not a squeezed desktop. Nothing important is hidden or crowded. The title doesn't cover the subject.
- [ ] Texture and light are present (unless emptiness is the concept).
- [ ] The type has a treatment: scale contrast, a chosen case and tracking, and it isn't default-looking.

## Slot audit (against the Creative Direction Paragraph)

Give every slot a verdict with evidence from the screenshots:

| Slot | Verdict | Evidence |
|---|---|---|
| Artefact type (does it read as that object?) | PASS / PARTIAL / FAIL | |
| Style anchor | | |
| Ground and palette (hex values used, accent stays in its job) | | |
| Hero (as described, drawn, idle behaviour present) | | |
| Each section's device | | |
| Each named interaction (works by mouse, touch and keyboard) | | |
| Delight | | |
| Typography treatment | | |
| Mobile recomposition | | |
| Restraint sentence (was it respected?) | | |

A PARTIAL needs an explanation the user can accept. A FAIL is never "done".

## Sameness check

Fail the build if the render shows any of these, unless the paragraph calls for it by name:
- **The house look:** a cream ground, a heavy ink serif headline, one rationed accent, tracked-caps labels, fade-up reveals. Or a dark violet-blue glow with glass cards. Or hero, three cards, testimonials, CTA band.
- **Kit assembly:** a section that looks like a component-library demo, including equal-weight card grids, icon-in-circle features, stat tiles or a testimonial carousel.
- **Unmotivated effects:** an effect that could be pasted into an unrelated site (a generic gradient blob, a cursor trail, a random marquee).
- **Default type:** one neutral sans at medium weights everywhere, with no scale contrast.
- **Flatness:** untextured flat fills and neutral grey shadows, where the concept wants material.
- **Concept drift:** fewer than four systems carry the governing idea; ordinary controls ignore the material.
- **A generic first viewport:** remove the logo, and it could belong to a competitor.

## Quality Contract audit

Check each of the 10 clauses (`creative-direction.md`) with evidence:
- **Made, not sourced:** any stock imagery, icon-pack decoration or kit layouts?
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
**Loops run:** [n]. Caught and fixed: [list]
**Slot audit:** [table, or a summary with every PARTIAL explained]
**First frame:** [pass notes at 1440 and 390]
**Quality Contract:** [pass, or each exception]
**Placeholders and assets still needed:** [list]
**Deferred:** [anything intentionally left, and why]
```

For audit-only requests, report findings ranked by severity, each with a screenshot reference and a concrete fix. Don't build.
