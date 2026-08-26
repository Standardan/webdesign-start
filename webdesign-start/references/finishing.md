# Finishing — The Generative Recipes That Separate Finished From Generated

**When to read this file:** Phase 3 while writing the brief's tokens/type sections, and again at the very start of Phase 4, *before writing any CSS*. The anti-slop catalog tells you what to avoid after the fact; this file tells you what to write in the first place. Audits catch drift; they cannot inject taste. Taste is injected here, at generation time, as numbers.

**Why this file exists.** Sites that read as AI-made and sites that read as owner-finished are usually built from the same components. The difference is a handful of parameter choices the model's defaults get timidly wrong: type set too light and too loose, neutrals with no temperature, an accent sprayed everywhere at 100% fill, shadows in default black, a hero faking evidence instead of showing it. Each recipe below replaces one timid default with a committed range. The ranges are wide enough to fit any brief; the point is that a value must be *chosen from the range on purpose*, per the brief, and written down.

**Where the chosen values come from — in this order:** (1) the measured Reference Teardowns of the user's approved sites (adapt the measured value: own hue, own face, preserved relationship); (2) the brief's discovery answers; (3) only where neither speaks, a deliberate pick from the recipe range. The recipes exist to stop timid defaults, not to replace the references — when a teardown and a recipe range disagree, the approved reference wins unless accessibility fails.

**Components are not the problem.** Premium components should be used wherever they materially improve a designed surface. The failure is allowing a component demo's surrounding page layout to replace the user's approved direction. Lock the Reference Blend Contract's macro composition first, then use components to execute its interactions, visuals, and states at a higher craft level.

## Pre-foundation gates: composition and assets

Before the token file, sketch the page at macro scale from the Reference Blend Contract: section silhouette, first focal point, media share/crop, headline share, density changes, and major motion. This can be a small wireframe or written proportion map, but it must name the liked traits driving each dominant region. A generic split hero or card grid is not allowed unless the references/user chose it.

Then run the Asset Readiness Gate from `brief-template.md`. Every P1 obligation that depends on photography, product UI, game art, illustration, video, 3D, or large-format motion must have a representative real, generated, licensed, or purpose-built asset/runtime before the style sample. If it does not, resolve the dependency or obtain explicit approval to change the direction. Do not replace dominant media with generic icons, empty frames, abstract gradients, or fabricated metrics.

## The order of operations (non-negotiable)

The first file written in Phase 4 is the token/theme file, alone, before any component or page. It is checked against every recipe below (the Foundation Gate at the end of this file) and fixed *before* a single component consumes it. Foundation bugs metastasize: a slate ramp or a timid type scale, once consumed by twenty components, never gets fixed. A component built on a finished foundation is hard to make look generated.

## Recipe 1 — Tinted neutrals (no pure grays ever)

Framework neutral ramps (slate, zinc, gray, stone used as-shipped) are the single biggest "generated" signal, because they carry no brand temperature. Build the neutral ramp from the brand hue instead:

1. Take the brand's dominant hue H from the brief (or the hue opposite/adjacent to the accent if the brand is accent-led).
2. Every neutral keeps that hue with low saturation: backgrounds and surfaces S 4–20%, borders S 8–25%, text S 4–15%. Saturation may rise as lightness moves toward the middle.
3. Dark themes: the page background is a *tinted* near-black, L 5–12% — never `#000`, never `#0F172A`. Light themes: a tinted near-white, L 96–99% — never `#FFF` as the page ground.
4. Text on the ground shares the ground's temperature (warm bg → warm off-white/off-black text), contrast per WCAG.
5. Borders are 1px in the tinted neutral, roughly 12–20 L-points from the surface they sit on — visible but quiet.
6. Name the tokens from the brand's world (`--ink`, `--sand`, `--pine`, `--brass`...), not `--gray-100`. If the palette can't inspire names, it isn't a palette yet.

**Self-test:** open the token file; if any surface, border, or text value has S=0, or the ramp could be pasted into an unrelated project unchanged, the foundation fails.

## Recipe 2 — Display type with conviction

The slop headline is a semibold sans at default tracking: technically fine, personality zero. For any direction where headlines carry the design (most marketing sites):

- Hero display size: `clamp()` landing between 56–112px on desktop. Pick the value that fits the brand's volume; do not drift to 36px out of caution.
- Weight: commit. Either heavy (700–900) or genuinely light (200–300) if the brief is editorial/luxury. 500–600 display weight is the timidity band; leaving it is a decision the brief must make.
- Letter-spacing at display sizes: −1% to −3% for grotesques/geometrics (0 to +1% for serifs and light weights). Line-height 0.9–1.1 at hero scale.
- Body text never uses the display face's personality settings; body is 16–18px, line-height 1.5–1.7, normal tracking.
- **The third voice:** every site has labels — eyebrows, stats, table headers, badges, prices, timestamps. Give them their own voice: a mono face, or the body face in 11–13px all-caps with +5 to +12% tracking. Pick one treatment and use it for every label on the site. Two-voice sites read flat; the third voice is cheap and reads designed.

**Self-test:** screenshot the hero headline alone. If it could be any startup's headline, the face/weight/tracking combination wasn't chosen hard enough.

## Recipe 3 — Accent discipline (write the sentence)

The slop pattern is the accent as an everywhere-color: buttons, links, icons, borders, section backgrounds. Finished sites ration it. The brief must contain one written sentence of the form:

> "The accent appears as [solid fill | glow | underline | text | thin rule] on [named elements], at most [N] solid-fill instance(s) per viewport, and never as [named exclusions — e.g. a full-section background, body-link color, icon tint]."

Then obey the sentence everywhere, including sections built late (CTA bands and footers are where discipline historically dies — see the rule-row re-scan in the self-review). Glow form, when chosen: `box-shadow: 0 0 20–32px accent at 25–40% alpha` on the element, not a blurred copy of the element behind itself.

## Recipe 4 — Shadows, depth, and light

- Never default black shadows on a tinted design. Tint every shadow with the background hue (dark themes) or a deepened surface hue (light themes).
- One implied light source; elevation steps use the same shadow family at increasing spread, not a different shadow per component.
- Flat is fine; fake depth is not. If the direction is flat, remove shadows entirely rather than leaving the framework's `shadow-sm` residue.

## Recipe 5 — Chrome that is designed but quiet

- Nav: 52–64px tall, sticky where the content benefits, background at 75–90% opacity with `backdrop-filter: blur(8–16px)` over content, one 1px bottom hairline in the tinted border token. Logo as a well-set text wordmark unless a real logo exists. Links + at most one CTA.
- Footer: an actual designed section (columns sized to real content, the third-voice labels, the tinted hairlines), not a gray afterthought.
- Radius: pick one scale (e.g. 4/8/16 or 2/6/10) from the brief's character — sharp, soft, or pill — and delete the framework default. Mixed radii from mixed sources is a generated tell.

## Recipe 6 — The hero shows evidence

For products and services, the strongest hero visual is the real thing doing its most impressive trick: a working interactive demo with plausible domain data, a real photograph, a real artifact. Build the demo as a first-class component (this is where the premium live-component budget belongs — the hero demo, not decorative cards). ThreeUI can carry the hero when the approved concept genuinely calls for place, atmosphere, generative visualization, or a 3D artifact; it cannot replace evidence for a product that already has a face. Absolute bans regardless of direction: fabricated browser chrome, invented dashboards with impossible numbers, abstract 3D blobs standing in for real product proof.

An invented number is not made truthful by calling it a placeholder in the delivery report. If demo data is necessary, label it “demo,” “illustrative,” or equivalent in the rendered surface and never pair it with a live-status dot, “today,” “now,” or other telemetry language.

Copy carries the same rule: the hero subhead states countable facts ("27 tools", "three chairs on East Sixth", "read-only by default") — see anti-slop's writing rules.

## Recipe 7 — Density is a choice

Generated pages have one density: sparse sections of centered text drifting past. Finished pages modulate: a dense, information-rich block (a table, a demo, a spec list in the third voice) adjacent to a spacious statement section. When every section has the same padding and the same amount of content, choose one section to compress and one to open up. Section vertical padding varies on purpose (e.g. 96px statement / 48px dense), not by accident.

## The Foundation Gate (run before the first component)

Print this table with a verdict per row after writing the token file and type spec, fix every FAIL, and only then start components:

| Check | Pass condition |
|---|---|
| Neutral temperature | No S=0 neutrals; bg/text/borders share a stated temperature |
| Ground values | Dark bg L 5–12% tinted, or light bg L 96–99% tinted |
| Token names | At least the core surfaces/inks named from the brand's world; no framework ramp names survive |
| Display conviction | Face + weight + tracking + hero size all chosen from Recipe 2's ranges, recorded in the brief |
| Third voice | A named treatment exists for labels/stats/eyebrows |
| Accent sentence | Written in the brief, with named exclusions |
| Shadow tint | No default-black shadows in the token file |
| Radius scale | One deliberate scale; framework default deleted |

This gate plus the owner's-eyes pass (SKILL.md Phase 4) bracket the build: the gate makes the first render start from a finished foundation; the pass catches what still slipped through, on the rendered page, before the user sees it.
