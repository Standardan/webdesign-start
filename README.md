# webdesign-start — A Guided Web Design Skill for AI Coding Assistants

**The problem this solves:** ask an AI for "a website for my bakery" and you get the average bakery website: a hero, three cards, a testimonial strip, safe fonts and a gradient. Ask it for *"Starter No. 1983 — A Ledger of Slow Bread", a bound baker's ledger with an engraved starter jar whose bubbles rise, cotton-paper cream #f4eee2, letterpress red only for dates and the order button…* and you get something nobody has seen before.

This skill closes that gap for people who aren't designers. You never have to know what kind of site you want. Describe it however it comes to you, and the skill narrows it down like a game of twenty questions. It asks plain-language questions about what makes the business unlike others and what world it lives in, invents three distinct concepts to react to, and writes a dense **creative-direction paragraph** with exact palette, type, hand-drawn hero art, a device for every section and named interactions. It then builds from that paragraph and checks the rendered result from screenshots.

The benchmark is the [Claude Opus 5.5 · 100 HTML Files](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/) gallery: 100 pages, each made from one such paragraph, none alike. The skill's workflow, craft rules and review gates come from close teardowns of that gallery.

Works with **Claude Code, Cursor, Codex, Windsurf, Grok, and any assistant that can read files**. The workflow is Markdown. Automatic updates use one bundled Python 3 standard-library script.

## The workflow

```
/webdesign-start
   ↓
Phase 0  Intake        reads what you already said; never re-asks
Phase 1  Discovery     a narrowing game: describe it your way; the skill keeps private hunches
                       about what kind of site it should be and asks the plain-language questions
                       that best tell them apart, plus your particulars and your world
Phase 2  Concepts      three genuinely different concepts, each with a palette, hero picture
                       and signature moment; pick one, mix two, or redirect
Phase 3  Direction     the Creative Direction Paragraph + fixed Quality Contract → DESIGN-BRIEF.md
   ── gate: you approve the direction ──
Phase 4  First frame   the hero screen built at full finish, rendered at desktop and phone size
   ── checkpoint: you react to the real render ──
Phase 5  Build         every section gets its own device; the governing idea runs through everything
Phase 6  Review        screenshot loops against the paragraph, slot by slot, until nothing is left to fix
```

Just want the prompt? Ask for it. The skill runs Phases 1–3 and hands you the paragraph plus Quality Contract as one copyable block, for any model or designer.

## What's inside

```
webdesign-start/
├── SKILL.md                     # the orchestrator: phases, gates, environment fallbacks
├── scripts/update_skill.py      # safe Phase 0 updater: validates, swaps, rolls back on failure
└── references/                  # loaded progressively, only when a phase needs them
    ├── discovery.md             # the narrowing game: hypothesis board, splitting questions, particulars
    ├── strategic-loops.md       # strategy essentials for business sites: promise, action, proof,
    │                            #   must-have content per site type
    ├── research.md              # learning from sites you love without cloning; the gallery as a study set
    ├── concept.md               # three concepts from the board, style anchors, the diversity grid
    ├── creative-direction.md    # the paragraph template, checklist, examples, Quality Contract
    ├── brief-template.md        # the short DESIGN-BRIEF.md template
    ├── craft.md                 # art direction: one idea in four systems, hero composition,
    │                            #   material, light, texture, palette, type, copy, motion
    ├── techniques.md            # code recipes: grain, glass, glow, drawn scenes, lit headlines,
    │                            #   springs, foil, reveal rituals, canvas performance
    ├── build-standards.md       # Showcase vs Project mode, performance, accessibility, honesty
    ├── component-sourcing.md    # optional libraries for ordinary controls only
    ├── review.md                # screenshot loop, first-frame test, sameness check, report
    └── formats/                 # 23 build recipes, one per kind of site, loaded only when chosen
        ├── index.md             #   the format map: signals, splitting questions, all 100 gallery pages
        ├── editorial-longread.md   scroll-journey.md    book-flip.md        interactive-story.md
        ├── living-scene.md         ambient-experience.md  single-screen-art.md  instrument.md
        ├── product-showcase.md     signature-reveal.md  heritage-brand.md   collection-cabinet.md
        ├── poster-type.md          themed-interface.md  live-bento.md       command-console.md
        ├── living-data-hero.md     data-reference.md    explainer-simulation.md  maker-tool.md
        └── generative-studio.md    playable.md          everyday-tool.md
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

Version 2 rebuilds the skill around the benchmark gallery [Claude Opus 5.5 · 100 HTML Files](https://github.com/MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files). Close teardowns of its strongest pages and an analysis of all 100 prompts showed where the variety and finish come from. Each page starts from a dense creative-direction paragraph plus an identical quality block. The signature visuals are made, not sourced, and every page was reviewed from screenshots before acceptance. The skill turns that method into a guided workflow. It links to the gallery as a study set and does not copy its code or prompts.

Earlier versions (1.x) centred on reference-site measurement, style and palette menus, mandatory component catalogs and a seven-loop strategy process. They produced dependable but similar-looking sites. The useful parts survive in lighter form: plain-language discovery, honesty rules, strategy essentials for business sites, the accessibility floor and the render-and-fix loop. The original design-principles layer was inspired by [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), and the strategy essentials descend from the seven-loop framework adapted from prompts attributed to Farhan (`@Farhan_Ai3`).

## Updating

The skill updates itself at the start of an engagement when Python 3, network access and write permission are available. A clean canonical checkout fast-forwards with Git. Copied installs download the canonical archive, validate it, replace the skill atomically, and restore the previous copy if installation fails. If automatic updating is unavailable, the engagement continues with the local version and says why.

`webdesign-start/VERSION` travels with every copy. See [CHANGELOG.md](CHANGELOG.md) for release history.

## Every kind of site in the gallery

The skill carries a build recipe for each kind of experience in the benchmark gallery. You don't pick one; discovery works out which fits:

editorial long-read · scroll journey · book / page-flip · interactive story · living scene · ambient experience · single-screen art piece · instrument · product showcase · signature object and reveal · heritage brand · collection or cabinet · poster or type-led · themed interface · live bento · command console · living data hero · data reference · explainer / simulation · maker tool · generative studio · playable · everyday tool

A site can combine them: a product showcase with one scroll-journey section, or a heritage brand with a small maker tool.

## Tips for best results

- **Just describe it.** You don't need design words or a clear idea. The skill asks what it needs.
- **Tell it what's true only of you.** "A two-chair barbershop in a 1920s bank vault in Austin, booked out for weeks" gives the concept far more to work with than "a barbershop website".
- **Answer the object question honestly.** "If your website were a physical object, what would it be?" often *is* the concept.
- **Name things you love, including things that aren't websites.** Say what exactly you love about each. The skill records the trait and translates it; it won't clone the source.
- **React to the concepts freely.** "A's palette with C's idea" is a great answer.
- **Judge the first-frame render, not the description.** That checkpoint exists so you can redirect before the full build.
- **Keep `DESIGN-BRIEF.md` in the repo.** Future requests like "add a pricing page" read it and stay in the same world.
