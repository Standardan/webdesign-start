# webdesign-start — A Guided Web Design Skill for AI Coding Assistants

**The problem this solves:** you know a good website when you see one, but you can't describe it — so your AI one-shots the *wrong* website. This skill makes the AI earn the build: it interviews you in plain language, goes and finds **real websites** that match your answers, lets you react to them ("yes, like THAT one"), locks the direction into a written design brief, and only then writes code.

Works with **Claude Code, Cursor, Codex, Windsurf, Grok, and any assistant that can read files** — the skill is pure markdown, zero scripts, zero dependencies.

## The workflow

```
/webdesign-start
   ↓
Phase 0  Intake      — reads what you already said; never re-asks
Phase 1  Discovery   — 3-ish rounds of 3-4 multiple-choice questions,
                       plain language, famous-site comparisons, no jargon
Phase 2  Research    — searches the web for 4-6 real sites matching your answers,
                       presents links + "why this matches you" — you react to each
Phase 3  Brief       — everything becomes DESIGN-BRIEF.md; you approve a short digest
   ── hard gate: no code before your approval ──
Phase 4  Build       — implements against the brief, mobile-first, token-driven
Phase 5  Review      — audits itself against the brief + a 40-item checklist,
                       reports honestly what passed, failed, and is placeholder
```

The brief persists in your project, so any future session — in any tool — picks up the same design system instead of improvising a new one.

## What's inside

```
webdesign-start/
├── SKILL.md                     # the orchestrator — phases, gates, environment fallbacks
└── references/                  # loaded progressively, only when a phase needs them
    ├── discovery.md             # adaptive questionnaire, branches per product type,
    │                            #   + the "vague answer decoder" (what 'modern & clean' hides)
    ├── research.md              # search recipes, 16 curated design galleries,
    │                            #   presentation format, reaction loop, no-search fallback
    ├── styles.md                # 46 UI styles in 10 families, each with CSS recipe + real examples
    ├── color.md                 # token architecture + ~28 industry palettes with hex
    ├── typography.md            # 32 font pairings by personality + scale/fluid-type systems
    ├── layouts.md               # hero patterns + section formulas per product type
    ├── industries.md            # ~28 product-type playbooks with anti-patterns
    ├── anti-slop.md             # AI-tell bans: violet-gradient dark mode, glow orbs, em dashes,
    │                            #   hype copy ("elevate", "seamless"), template heroes
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

The design-principles layer (style catalog, industry anti-patterns, priority-tiered UX rules, pre-delivery checklist) is inspired by and extends [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill). What this skill adds is the front half that data can't provide: **structured taste extraction** (the discovery interview + vague-answer decoder) and **verified visual references** (the internet research + reaction loop) — so the design system that gets generated is *yours*, not a statistically plausible one.

## Tips for best results

- **Give the opening message real information** ("a site for my two-chair barbershop in Austin, we're booked out weeks") — Phase 0 harvests it and skips those questions.
- **React honestly in the research phase.** A "no, too corporate" is worth more than three polite "loves."
- **Name sites you already admire**, even from unrelated industries — it short-circuits half the search.
- **Keep `DESIGN-BRIEF.md` in the repo.** It's the memory. Future "add a pricing page" requests will match the existing design because the brief says how.
