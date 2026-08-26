# webdesign-start — A Guided Web Design Skill for AI Coding Assistants

**The problem this solves:** visual taste alone does not define the audience, promise, evidence, conversion path, motion, copy, technical structure, or launch plan. This skill resolves those decisions in plain language, inspects real websites and competitors, persists an approved brief, proves the direction in a rendered sample, and only then completes the build and post-build audit.

Works with **Claude Code, Cursor, Codex, Windsurf, Grok, and any assistant that can read files**. The design workflow is markdown; automatic updates use one bundled Python 3 standard-library script with no third-party dependencies.

## The workflow

```
/webdesign-start
   ↓
Phase 0  Intake      — reads what you already said; never re-asks
                       rebuilds a complete, exact-count inventory of every live component/resource source
Phase 1  Discovery   — 3-ish rounds of 3-4 multiple-choice questions,
                       plain language, famous-site comparisons, strategic evidence
Phase 2  Research    — inspects your example sites first, then finds more only if needed;
                       every liked trait is captured, inspected, mapped, and assigned a role
Phase 3  Brief       — creative, conversion, motion, copy, technical strategy + references
                       + reference blend + asset gate + selected live components become DESIGN-BRIEF.md
                       you approve a short digest
   ── hard gate: no code before your approval ──
Phase 4  Build       — locks the reference-led macro composition, then compares every catalog
                       without priority and uses the best-fit premium components inside it
Phase 5  Review      — audits every liked trait, macro reference blend, components, and strategy,
                       then writes CONVERSION-AUDIT.md and a 30-day LAUNCH-PLAN.md
```

The brief persists the approved design system, while `.webdesign-start/component-inventory.json` retains the complete searchable catalog snapshot for the engagement. Every invocation refreshes that inventory before new selection work.

## What's inside

```
webdesign-start/
├── SKILL.md                     # the orchestrator — phases, gates, environment fallbacks
├── scripts/update_skill.py      # safe Phase 0 updater: validates, swaps, rolls back on failure
└── references/                  # loaded progressively, only when a phase needs them
    ├── discovery.md             # adaptive questionnaire, branches per product type,
    │                            #   + the "vague answer decoder" (what 'modern & clean' hides)
    ├── research.md              # user-reference inspection, Liked Trait Ledger,
    │                            #   Reference Translation Matrix + Blend Contract
    ├── strategic-loops.md       # seven hard loops: creative direction, critical-section
    │                            #   conversion, motion, copy, build, audit, 30-day launch
    ├── component-sourcing.md   # complete equal-weight catalog/resource inventory,
    │                            #   selection, adaptation, and verification protocol
    ├── threeui.md               # ThreeUI Community visual/GPU selection, runtime,
    │                            #   fallback, asset, and licensing contract
    ├── styles.md                # 46 UI styles in 10 families, each with CSS recipe + real examples
    ├── color.md                 # token architecture + ~28 industry palettes with hex
    ├── typography.md            # 32 font pairings by personality + scale/fluid-type systems
    ├── layouts.md               # hero patterns + section formulas per product type
    ├── industries.md            # ~28 product-type playbooks with anti-patterns
    ├── anti-slop.md             # AI-tell bans: violet-gradient dark mode, glow orbs, em dashes,
    │                            #   hype copy ("elevate", "seamless"), template heroes
    ├── finishing.md             # generative recipes: tinted neutrals, type conviction,
    │                            #   accent discipline, the Foundation Gate
    ├── ux-rules.md              # priority-tiered accessibility & UX rulebook
    ├── build-standards.md       # implementation standards + pre-delivery checklist + self-review
    └── brief-template.md        # the DESIGN-BRIEF.md template
adapters/                        # thin per-tool command shims (see install below)
```

## Install

### Claude Code
Copy the skill folder into your project (or globally):
```powershell
# per-project
Copy-Item -Recurse webdesign-start <your-project>\.claude\skills\webdesign-start
# or global (all projects)
Copy-Item -Recurse webdesign-start $HOME\.claude\skills\webdesign-start
```
Then run **`/webdesign-start`** (it also auto-triggers on requests like "build me a landing page").

### Cursor
```powershell
Copy-Item -Recurse webdesign-start <your-project>\webdesign-start
Copy-Item adapters\cursor\webdesign-start.md <your-project>\.cursor\commands\webdesign-start.md
```
Then run **`/webdesign-start`** in Cursor's chat.

### Codex (OpenAI)
```powershell
Copy-Item -Recurse webdesign-start <your-project>\webdesign-start
Copy-Item adapters\codex\webdesign-start.md $HOME\.codex\prompts\webdesign-start.md
```
Then run **`/webdesign-start`**.

### Windsurf
```powershell
Copy-Item -Recurse webdesign-start <your-project>\webdesign-start
Copy-Item adapters\windsurf\webdesign-start.md <your-project>\.windsurf\workflows\webdesign-start.md
```
Then run **`/webdesign-start`**.

### Anything else (Grok, ChatGPT, aider, …)
Put the `webdesign-start` folder where the assistant can read it, then paste the bootstrap prompt from [`adapters/universal-prompt.md`](adapters/universal-prompt.md).

## Design lineage

The design-principles layer (style catalog, industry anti-patterns, priority-tiered UX rules, pre-delivery checklist) is inspired by and extends [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill). The seven-loop strategic framework was adapted from prompts supplied by the project owner and attributed to Farhan (`@Farhan_Ai3`); it turns creative direction, conversion, motion, copy, frontend planning, CRO review, and the first thirty launch days into required artifacts and verification gates. Reference fidelity is enforced at two levels: every liked trait is recorded and verified, while a Reference Blend Contract controls silhouette, focal media, typography, density, color, chrome, and motion. The live component layer then treats four update-aware catalogs as one equal-weight execution toolkit: the MIT-licensed [beUI repository](https://github.com/starc007/ui-components), [ThreeUI Community](https://github.com/MengTo/threeui), the community element library [Uiverse](https://github.com/uiverse-io/galaxy), and [Material Components Web](https://github.com/material-components/material-components-web). On every invocation, the skill rebuilds exact per-source counts and a searchable inventory of every current component identifier, then compares the strongest viable candidate from every catalog for each designed surface. Components remain mandatory where applicable, but they operate inside the approved macro composition rather than supplying a generic demo layout. Two live companions ride along: the [taste-skill](https://github.com/Leonxlnx/taste-skill) as a second anti-generic pass beside the built-in anti-slop rules, and [design-resources-for-developers](https://github.com/bradtraversy/design-resources-for-developers) for sourcing fonts, illustrations, photography, and icons.

## Updating

The skill updates itself at the start of an engagement when Python 3, network access, and write permission are available. A clean canonical checkout fast-forwards with Git; copied installs download the canonical archive, validate it, replace the skill atomically, and restore the previous copy if installation fails. If automatic updating is unavailable, the engagement continues with the local version and says why. The skill also rebuilds the Complete Resource Inventory from beUI, ThreeUI Community, Uiverse, MDC-web, taste-skill, and the asset index on every invocation. It records exact per-source counts, all current identifiers, provenance, and freshness so newly published components can enter selection immediately; if web access is unavailable, it marks the affected inventory stale and continues with an explicit offline fallback.

`webdesign-start/VERSION` travels with every copy. The skill also treats trend-sensitive content as suspect once the version date is over a year old, verifying trends by search instead of asserting stale ones. See [CHANGELOG.md](CHANGELOG.md) for release history.

## Tips for best results

- **Give the opening message real information** ("a site for my two-chair barbershop in Austin, we're booked out weeks") — Phase 0 harvests it and skips those questions.
- **React honestly in the research phase.** A "no, too corporate" is worth more than three polite "loves."
- **Name sites you already admire**, even from unrelated industries. The skill records every part you say you like, including dominant imagery, animation, scale, density, and small chrome details; it cannot quietly keep only the easiest one.
- **Critique the composition and components separately.** If the silhouette, imagery, density, or motion feels wrong, the skill revises the reference blend. If a component treatment feels wrong, it searches the full collection again and reselects or restyles it.
- **Keep `DESIGN-BRIEF.md` in the repo.** It's the memory. Future "add a pricing page" requests will match the existing design because the brief says how.
- **Use the post-build artifacts.** `CONVERSION-AUDIT.md` separates immediate fixes from traffic-dependent experiments; `LAUNCH-PLAN.md` sets the first thirty days, owners, metrics, and stopping rules.
