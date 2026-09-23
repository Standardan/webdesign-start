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

[Showcase single file | Project: framework, styling approach, where it deploys], per build-standards.md.

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
