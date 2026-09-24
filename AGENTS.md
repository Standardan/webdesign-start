# AGENTS.md

## Purpose and status

This repository maintains `webdesign-start`, a portable Markdown skill for guiding AI coding assistants from web-design discovery through implementation review.

This file is a living contributor guide. Update it whenever the repository structure, workflow, validation approach, or recurring maintenance lessons change. Do not preserve stale instructions for compatibility with old habits.

## Repository map

- `webdesign-start/SKILL.md`: canonical workflow and orchestration rules.
- `webdesign-start/references/`: progressively loaded guidance for each workflow phase.
- `webdesign-start/references/concept.md` and `creative-direction.md`: the core of the skill, which turns discovery answers into three divergent concepts and then into the Creative Direction Paragraph plus the fixed Quality Contract.
- `webdesign-start/references/craft.md`, `techniques.md`: art direction and code recipes shared by every format.
- `webdesign-start/references/discovery.md` and `formats/index.md`: the exploration spread, the narrowing game (hypothesis board and splitting questions), and the format map with signals, 21 experiences and all 100 gallery pages.
- `webdesign-start/references/registers.md`: world, product and interface registers, and the rule that light and time are tools, not themes.
- `webdesign-start/references/formats/*.md`: one build recipe per kind of site (25 formats). Each follows the same sections: Load when, Study, What makes it work, Architecture, Key mechanics, Variation levers, Business uses, Pitfalls, Signals.
- `webdesign-start/references/review.md`: screenshot loop, first-frame test, sameness check and slot audit.
- `webdesign-start/references/polish.md` and `webdesign-start/scripts/page_audit.js`: the Phase 6 polish pass and its whole-page audit (chrome collisions, lone words, cut-off text, native controls, filler, repeated sections).
- `webdesign-start/references/aesthetics.md` and `webdesign-start/scripts/palette_check.py`, `squint_check.py`, `composition_audit.js`: the beauty floor (colour, depth and light, composition and geometry) with deterministic checks. Thresholds were measured on the 100 gallery pages; don't tighten one without re-running it on the gallery thumbnails, or it will fail pages that are known to be beautiful.
- `webdesign-start/references/strategic-loops.md`, `research.md`, `brief-template.md`, `build-standards.md`: strategy essentials, reference handling, the brief template and the engineering floor. **These four filenames must not be renamed or removed**: the updater bundled with older installs refuses any download that lacks them (see `REQUIRED_PATHS` in `scripts/update_skill.py`).
- `webdesign-start/scripts/update_skill.py`: the self-updater. Its `REQUIRED_PATHS` lists files every future release must contain.
- `webdesign-start/VERSION`: release version and date in `<semver> <YYYY-MM-DD>` format.
- `adapters/`: thin entry points for specific assistants plus the universal prompt.
- `README.md`: public overview, installation instructions and workflow summary.
- `CHANGELOG.md`: user-visible release history.

## Working principles

1. Read this file and the files directly relevant to the requested change before editing.
2. Preserve the core sequence: intake, discovery, concepts, creative-direction approval, first-frame checkpoint, build, polish and screenshot review. Any deliberate change to a gate must be documented in the README and changelog.
3. Keep the skill tool-agnostic. Tool-specific behavior belongs in environment-adaptation rules or an adapter, not in the canonical workflow unless every supported assistant can follow it.
4. Prefer precise, testable instructions over aspirational language. Do not add hype, filler, or unsupported claims.
5. Avoid duplicating detailed guidance across files. Keep orchestration in `SKILL.md`; keep phase-specific detail in the relevant reference file; link between them clearly.
6. Preserve progressive disclosure. A change should not force the assistant to load every reference file up front. Keep the pre-build reading small so the model's effort goes into the concept and the craft, not the process.
7. Treat user approval gates, accessibility requirements, honest content and honest placeholder reporting as behavioral contracts.
8. **Singularity over safety.** The skill exists to produce sites unlike other sites. Do not add fixed menus (style, palette, font or layout lists) that the model picks from by default, section templates, or rules whose safe zone becomes a house look. Vocabulary lists are allowed only as inspiration, labelled as such, beside a rule that the concept decides.
9. **Crafted, not assembled; modern by default.** Premium modern components are a core ingredient, chosen per surface and always restyled to the site's tokens and concept (`component-sourcing.md`). A component left in its demo styling is a failure. Sites use a contemporary design language unless the user asks for a period, heritage or illustrated style. Never reintroduce mandatory catalog inventories or catalog lineage for every surface.
10. **The Creative Direction Paragraph is the contract** and the Quality Contract block is fixed text. Change the Quality Contract only deliberately, in one place (`creative-direction.md`), and note it in the changelog.
11. **Judge the render, completely.** Visual claims require screenshots at 1440×900 and 390×844 when rendering is available. If it isn't, the skill must say so and never claim a visual check it didn't do. Every promise in the brief is checked against the render (the build ledger) before any beauty review, and nothing is logged as done without being seen.
12. **References are ingredients.** Record what the user loves in their own words and translate each trait into the concept; never clone a reference's layout, copy or imagery. The benchmark gallery has no published licence: link to it and cite page numbers, but don't copy its code or prompts into the skill.

## Editing conventions

- Use Markdown with short sections, descriptive headings, and readable tables or lists where they improve scanning.
- Use plain language for user-facing prompts. Explain design terminology rather than assuming the user knows it.
- Keep examples concrete and label examples as examples rather than requirements.
- Maintain consistent phase names and numbering across `SKILL.md`, `README.md`, adapters, and references.
- Use relative repository links in documentation.
- Keep comments or rationale near non-obvious rules so future contributors understand the constraint, not just the wording.
- Do not introduce scripts, dependencies, generated files, or a build system unless the task clearly requires them.

## Cross-file change checklist

When changing the workflow, check all of the following for drift:

- `README.md` workflow diagram, "What's inside" tree, and feature description.
- `webdesign-start/SKILL.md` phase summary, detailed phase, and reference index.
- The affected file under `webdesign-start/references/`.
- `concept.md`, `creative-direction.md` and `review.md` together when changing what a concept or paragraph must contain. The slot list, checklist and slot audit must stay aligned.
- `formats/index.md` whenever a format is added, renamed or removed: its table, splitting-signal table and page mapping must match the files in `formats/`, and every gallery page must stay mapped. A new format file must include every standard section, including Signals.
- `scripts/update_skill.py` `REQUIRED_PATHS` when adding or removing core files. Never remove a path that older updaters require.
- Tool-specific adapters under `adapters/`.
- `CHANGELOG.md` and `webdesign-start/VERSION` when preparing a release.

When changing install paths or supported tools, update both the README and the corresponding adapter in the same change.

## Validation

There is currently no automated test suite. Validate documentation changes with focused checks:

1. Search for stale terminology, phase numbers, filenames, version strings, and install paths with `rg`.
2. Read the edited section in context and follow its links to confirm every referenced file exists.
3. Compare the README workflow with `webdesign-start/SKILL.md` and the relevant reference files.
4. For behavioral changes, mentally run at least these paths: a new site from a vague request ("a website for my bakery") where the user never names a format, an existing approved brief, a small UI edit, an audit-only request, and a prompt-only request.
5. When a change affects output quality, test it on a real request and compare the rendered first frame with the benchmark gallery at the same size.
6. Inspect `git diff --check` and `git diff` before handoff.

If repeatable validation becomes substantial, add a small deterministic checker and document its command here.

Beauty-floor and polish scripts: after changing `palette_check.py`, `squint_check.py` or `page_audit.js`, run them on a known failure and on gallery thumbnails. A known failure must still fail and the gallery must still pass. For example, `python3 webdesign-start/scripts/palette_check.py <tokens.json> <screenshot.png>` and `python3 webdesign-start/scripts/squint_check.py <screenshot.png> C0,R0,C1,R1`. Do not claim a check passed unless it was actually run.

## Lessons from real builds

- **Hermosa Baking (2026-09, v2.0.0):** the build shipped without two promised sections, with a dead nav link, a flat façade of rectangles, a web card pasted over the hero, a generic second section (kicker plus italic-accent headline), WordArt-style lettering and clip-art bread. The v2.0 skill also pushed toward vintage pastiche. Fixes: the completeness gate and build ledger, cold critique, the silhouette and squint tests, "information lives inside the world", "the idea survives the scroll", "contemporary by default", and components as a core ingredient. The colours also clashed (navy and brown at the same darkness, twin gold/orange accents) and the scene mixed three projections. That led to the beauty floor (`aesthetics.md`) with measured thresholds and checking scripts.

- **Dack car rental (2026-09, v2.1.0):** a strong concept that still felt a notch below the gallery. Causes:
  - checks ran only on the first frame, so mid-page chrome collisions, colour mud and repeated layouts were never tested;
  - the gates were loosened by a focal area covering most of the screen and self-granted exceptions;
  - brief devices ("painted on lots") became cards;
  - the illustration stopped at flat vector;
  - native form controls and lone words were left in.

  Fixes: the Phase 6 polish pass and `page_audit.js`; checks at every scroll depth; focal areas capped at 25% of the grid; exceptions need the user's agreement; device fidelity and section rhythm rules.

- **Time-of-day bias (2026-09, v2.2.0):** both test builds themed themselves on the hour (blue hour, golden hour to night). The skill's discovery asked "when is it?" by default, its examples leaned on dawn and night, and every site was treated as a world. Users wanting a dashboard or an Apple-style showcase had no path, and discovery never showed the range of the gallery. Fixes: registers (world, product, interface), product-film and app-interface formats, the exploration spread, and time of day as an opt-in idea capped at one concept.

## Skill evolution

Create a new reference file or companion skill when a reusable body of instructions has a distinct trigger, can be loaded independently, and would otherwise make the canonical skill harder to navigate. Extend an existing reference when the new guidance belongs to an established phase.

Any new or changed skill must include:

- A specific trigger and clear non-trigger cases.
- An explicit workflow with observable outputs or checkpoints.
- Environment fallbacks where required capabilities may be absent.
- Safety, accessibility, and honesty constraints appropriate to its scope.
- A progressive-loading plan for large reference material.
- Documentation and validation instructions that can improve as real usage exposes gaps.

Record recurring failures and successful fixes in the most relevant instruction file. Improve this guide when the lesson applies repository-wide.

## Versioning and releases

- Do not bump `webdesign-start/VERSION` for incidental local edits unless a release is requested.
- For a release, use semantic versioning, set the release date, and add a concise entry to `CHANGELOG.md` describing user-visible behavior changes.
- Verify the version and date mentioned by update instructions remain compatible with the format parsed by the skill.

## Git hygiene

- Preserve unrelated user changes in a dirty worktree.
- Keep commits focused and describe behavioral changes rather than merely listing files.
- Never rewrite history, discard changes, or delete material without explicit authorization.
- Before handoff, report what changed, what was validated, and any known uncertainty.
