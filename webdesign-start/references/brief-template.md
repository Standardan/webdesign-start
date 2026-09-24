# DESIGN-BRIEF.md template

**Load at:** Phase 3.

The brief is the project's memory. It is short on purpose: the Creative Direction Paragraph carries the design, and the rest records facts the build needs. Save it at the project root. Future requests ("add a pricing page") read it first and speak the same language.

```markdown
# Design Brief: [project name]

_Status: [draft | approved YYYY-MM-DD] · webdesign-start [version]_

## Creative Direction

[The Creative Direction Paragraph, or the site paragraph followed by one paragraph per page.]

## Quality Contract

[The Quality Contract block from creative-direction.md, unchanged.]

## Build mode

[Single file (online | offline) | Project: framework, styling, where it deploys], as the user chose, per build-standards.md. External requests: [fonts, CDNs, APIs].

## Tokens

The paragraph's values, defined once. Copy this into the build.

| Token | Value | Job |
|---|---|---|
| --ground | #… | [material] |
| --ink | #… | text |
| --accent | #… | [its one job] |
| … | | |
| Display type | [stack or font] · [treatment] | |
| Text type | [stack or font] · [size/measure] | |
| Label type | [stack] · [size, case, tracking] | |
| Easing | [named curves] | [what each is for] |
| Light | --light-x/--light-y [vector] · --key [rgb] · --fill [rgb] · --shade [rgb] | one key light; every shadow and highlight derives from it |

Palette check: `python3 scripts/palette_check.py .webdesign-start/tokens.json` → [PASS, or each finding and its fix].

## Beauty floor declarations

Per `aesthetics.md`. The review checks the render against these.

- **Depth family per surface:** hero [object-space | light-space | graphic-flat], [section] […]. A place or product is never graphic-flat.
- **Depth cues in the hero (at least 5):** […]
- **Drawn scenes:** projection [flat elevation | 1-point | 2-point | axonometric + angles], horizon at [fraction of the frame].
- **Focal area** (16×10 grid, for `squint_check.py`): desktop [C0,R0,C1,R1], phone [C0,R0,C1,R1]. **Balance:** [symmetric | asymmetric].
- **Radii:** [0 | one value | two values]. **Rotation:** [none | declared set and why]. **Phone recomposition:** [art first | type in the quiet zone | redrawn in portrait | type first].
- **Calibration pages:** [two gallery pages in the same format].

## Component plan

Surface by surface, per `component-sourcing.md`. Every component is restyled to the tokens above.

| Surface | Component | Source | Restyle (tokens, material, motion, content) |
|---|---|---|---|
| Hero | … | … | … |
| Headline treatment | … | … | … |
| [Section] device | … | … | … |
| Primary action | … | … | … |
| Navigation / menu | … | … | … |

## Build ledger

Every promise in the paragraph, copied out as a checklist. Phase 5 builds against it; the review's completeness gate ticks it from the render.

- [ ] Hero: [what it must show and do]
- [ ] Section: [name] with [device]
- [ ] Interaction: [verb] → [visible result]
- [ ] Delight: [detail]
- [ ] Mobile: [recomposition]
- [ ] Ending: footer with [facts], [sample/fiction note if any]

## Business essentials

- **Visitor:** … **Primary action:** … **Promise:** …
- **Proof we actually have:** … (none invented)
- **Must-have content:** hours, address, prices, … (per strategic-loops.md)

## Content inventory

| Section / page | Content status | Source |
|---|---|---|
| … | real / placeholder / needed | … |

## Assets

- Real photography: [what exists, quality, how the concept treats it]
- Logo / wordmark: [exists / to be drawn in SVG]
- Still needed from the client: …

## Decisions log

- [date] [decision and why, e.g. "Chose concept B over A: the ledger uses the starter's age and the queue"]
```

Keep the brief under about 150 lines. If it grows, the paragraph is probably missing a decision that the rest is trying to make up for.
