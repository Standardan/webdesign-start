# AGENTS.md

## Purpose and status

This repository maintains `webdesign-start`, a portable Markdown skill for guiding AI coding assistants from web-design discovery through implementation review.

This file is a living contributor guide. Update it whenever the repository structure, workflow, validation approach, or recurring maintenance lessons change. Do not preserve stale instructions for compatibility with old habits.

## Repository map

- `webdesign-start/SKILL.md`: canonical workflow and orchestration rules.
- `webdesign-start/references/`: progressively loaded guidance for each workflow phase.
- `webdesign-start/references/component-sourcing.md`: neutral, complete live resource inventory and cross-catalog component-selection contract.
- `webdesign-start/references/threeui.md`: live ThreeUI Community sourcing, runtime, licensing, and verification contract for 3D/WebGL/visual components.
- `webdesign-start/references/strategic-loops.md`: seven required strategic, conversion, motion, copy, technical, audit, and launch loops.
- `webdesign-start/VERSION`: release version and date in `<semver> <YYYY-MM-DD>` format.
- `adapters/`: thin entry points for specific assistants plus the universal prompt.
- `README.md`: public overview, installation instructions, and workflow summary.
- `CHANGELOG.md`: user-visible release history.

## Working principles

1. Read this file and the files directly relevant to the requested change before editing.
2. Preserve the core sequence: intake, discovery, research, brief approval, build checkpoint, and review. Any deliberate change to a gate must be documented in the README and changelog.
3. Keep the skill tool-agnostic. Tool-specific behavior belongs in environment-adaptation rules or an adapter, not in the canonical workflow unless every supported assistant can follow it.
4. Prefer precise, testable instructions over aspirational language. Do not add hype, filler, or unsupported claims.
5. Avoid duplicating detailed guidance across files. Keep orchestration in `SKILL.md`; keep phase-specific detail in the relevant reference file; link between them clearly.
6. Preserve progressive disclosure. A change should not force the assistant to load every reference file up front.
7. Treat user approval gates, accessibility requirements, reference inspection, and honest placeholder reporting as behavioral contracts.
8. Treat every component catalog as an equal live source. On every invocation, build and retain a complete inventory with exact per-source counts and every current identifier; at each designed surface, compare the strongest viable candidates from every catalog and use the best fit for that website. Never encode a default, primary, first-look, or fallback catalog.
9. Every designed surface must have observable catalog lineage through a direct component, faithful native-stack adaptation, or composition. Do not ship plain hand-built UI or use a source as a citation without materially incorporating its craft. Components execute the approved direction; they do not choose the page silhouette, focal point, media hierarchy, density, or scroll story. Stack compatibility, accessibility, performance, licensing, the approved brief, and real product evidence still constrain which catalog component wins.
10. Preserve every trait the user says they like about a reference, not merely the easiest trait to implement. Record those statements in a Liked Trait Ledger, assign each trait an implementation target and verification condition, and require primary references to influence the macro composition as well as details. Never silently downgrade a primary reference to “mood only.”
11. Treat reference-dependent media as a build dependency. If the approved direction depends on photography, product UI, game art, video, 3D, or large-format motion, resolve a representative asset before the style sample. Do not substitute gradients, generic icons, or invented metrics and claim reference fidelity.
12. Every full site/redesign must execute all seven loops in `strategic-loops.md`. Loops 1–5 live in `DESIGN-BRIEF.md`; Loop 6 produces `CONVERSION-AUDIT.md`; Loop 7 produces `LAUNCH-PLAN.md`. Treat missing artifacts, fabricated evidence/results, and unverified loop failures as incomplete work.

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

- `README.md` workflow diagram and feature description.
- `webdesign-start/SKILL.md` phase summary, detailed phase, and reference index.
- The affected file under `webdesign-start/references/`.
- `webdesign-start/references/component-sourcing.md`, `webdesign-start/references/threeui.md`, and the Component Opportunity Map when component-selection behavior changes.
- `webdesign-start/references/strategic-loops.md`, the strategic brief sections, conversion audit, and launch handoff when strategy/conversion behavior changes.
- Tool-specific adapters under `adapters/`.
- `CHANGELOG.md` and `webdesign-start/VERSION` when preparing a release.

When changing install paths or supported tools, update both the README and the corresponding adapter in the same change.

## Validation

There is currently no automated test suite. Validate documentation changes with focused checks:

1. Search for stale terminology, phase numbers, filenames, version strings, and install paths with `rg`.
2. Read the edited section in context and follow its links to confirm every referenced file exists.
3. Compare the README workflow with `webdesign-start/SKILL.md` and the relevant reference files.
4. For behavioral changes, mentally run at least these paths: a new site, an existing approved brief, a small UI edit, and an audit-only request.
5. Inspect `git diff --check` and `git diff` before handoff.

If repeatable validation becomes substantial, add a small deterministic checker and document its command here. Do not claim a check passed unless it was actually run.

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
