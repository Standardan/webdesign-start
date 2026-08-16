# AGENTS.md

## Purpose and status

This repository maintains `webdesign-start`, a portable Markdown skill for guiding AI coding assistants from web-design discovery through implementation review.

This file is a living contributor guide. Update it whenever the repository structure, workflow, validation approach, or recurring maintenance lessons change. Do not preserve stale instructions for compatibility with old habits.

## Repository map

- `webdesign-start/SKILL.md`: canonical workflow and orchestration rules.
- `webdesign-start/references/`: progressively loaded guidance for each workflow phase.
- `webdesign-start/references/beui.md`: live upstream component refresh and integration contract.
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
8. Treat beUI as a live upstream and the default component source: query its current registry on every skill invocation and before feature implementation, then automatically use the strongest compatible match. Do not vendor a static catalog or ask users to pre-select components unless they explicitly request that workflow.

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
- `webdesign-start/references/beui.md` and the Component Opportunity Map when component-selection behavior changes.
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
