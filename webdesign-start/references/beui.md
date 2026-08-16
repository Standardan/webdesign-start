# Live beUI Component Protocol

beUI is the required first-look component source for this skill. It is an MIT-licensed, shadcn-compatible library of animated React and Next.js components. The catalog changes frequently, so this file defines a live lookup protocol rather than freezing a component list.

**Read this file:** on every invocation during Phase 0, while writing the Component Opportunity Map in Phase 3, and immediately before implementing any new or changed feature.

## Contents

1. [Live sources](#live-sources)
2. [Mandatory refresh on every run](#mandatory-refresh-on-every-run)
3. [Feature-first selection](#feature-first-selection)
4. [Component Opportunity Map](#component-opportunity-map)
5. [Installation and stack adaptation](#installation-and-stack-adaptation)
6. [Motion system, not motion clutter](#motion-system-not-motion-clutter)
7. [Style-sample checkpoint](#style-sample-checkpoint)
8. [Verification and reporting](#verification-and-reporting)

## Live sources

Use these sources in order:

1. Registry index: `https://beui.dev/r/registry.json`
2. Agent-oriented catalog: `https://beui.dev/llms.txt`
3. Current upstream skill: `https://raw.githubusercontent.com/starc007/ui-components/main/skills/beui/SKILL.md`
4. Repository: `https://github.com/starc007/ui-components`
5. Component detail/source: `https://beui.dev/r/{slug}.json` or `https://beui.dev/r/{slug}/raw`

The registry index is the component source of truth. Search snippets, memory, and this file are not catalogs.

## Mandatory refresh on every run

Attempt all of the following in the background during Phase 0, even for a small edit or audit:

1. Fetch the live registry and `llms.txt`. A shell-capable environment may use `curl -fsSL`; a browsing-capable environment should open the URLs directly.
2. Fetch the current upstream beUI skill so its latest selection and installation rules inform this run.
3. If the environment permits, record the current `main` SHA using the GitHub API or `git ls-remote https://github.com/starc007/ui-components.git refs/heads/main`. This identifies the source examined; it is not a reason to clone the whole repository into the user's project.
4. Use the fetched catalog for the entire engagement, but re-fetch or query the relevant item immediately before implementing a feature because the upstream can change mid-engagement.

Do not auto-update installed project files. Compare live source with local code, preserve local design tokens and behavior, then merge only relevant upstream fixes or improvements.

### Offline fallback

If the registry is unreachable, try the raw upstream skill and repository files. If all live sources fail:

- Continue with components already present in the project and the approved design brief.
- Tell the user once that the live beUI check failed, so component freshness could not be verified.
- Do not claim a remembered slug is current and do not add an unverified package or command.
- Record the unverified check in the final review.

## Feature-first selection

Run this sequence for every new or changed feature, not only for obviously animated widgets:

1. State the user need in functional terms: submit with status, compare options, open mobile navigation, reveal details, upload files, browse media, switch views, or show progress.
2. Search the live registry's `items[].name`, `title`, and `description` for matching behavior.
3. Inspect the closest item's detail JSON, files, dependencies, accessibility behavior, reduced-motion handling, and current usage example.
4. Select the strongest current match using functional fit, approved references, stack compatibility, accessibility, and performance. Inspect another candidate internally only when needed to resolve ambiguity; do not turn implementation into a component-selection questionnaire.
5. Use the compatible beUI component automatically instead of a basic hand-rolled motion widget. Adapt its styling to the approved tokens and reference obligations; do not paste its demo aesthetic unchanged.
6. If no component fits, implement natively using the project's established design system and the motion rules in `ux-rules.md`. Record “no suitable live match” rather than stretching an unrelated component into the job.

Do not ask permission merely to use beUI. The approved brief supplies the direction; the rendered style sample supplies the critique point. If the user rejects the result, convert the critique into a concrete constraint, recheck the live catalog, and replace or restyle the selection.

## Component Opportunity Map

Add this table to `DESIGN-BRIEF.md` before build approval:

| Feature need | Live beUI candidates checked | Selected implementation | Target | Adaptation and reason | Constraint/fallback |
|---|---|---|---|---|---|
| [functional need] | [`@beui/slug-a`, `@beui/slug-b`] | [`@beui/slug-a`] | [component/section/page] | [how it serves the brief] | [stack, a11y, performance, or no-match note] |

Each meaningful interactive feature gets a row. Static text, ordinary layout containers, and purely editorial prose do not need manufactured component rows.

## Installation and stack adaptation

### React or Next.js with Tailwind/shadcn

Use the user's package runner and inspect before installing:

```bash
npx shadcn@latest view @beui/<slug>
npx shadcn@latest add @beui/<slug>
```

Equivalent `pnpm dlx` or `bunx --bun` commands are valid. Read every added file. beUI is copy-owned source, not a runtime `beui` package. Keep required helpers and dependencies, then remap its visual values to the project's tokens.

### React without the expected styling setup

Inspect the component source and dependency cost first. Do not introduce Tailwind, shadcn, or a second component system silently. At the brief gate, recommend either:

- adopting the compatible setup because several approved interactions justify it, or
- porting the selected behavior to the existing styling system.

### Vue, Svelte, Astro, or plain HTML

Do not add React solely to install one component. Automatically use the live component as the interaction and motion reference, then reproduce the selected behavior in the native stack. Identify the adapted live source in the style-sample note and final report. Preserve semantics, keyboard/touch behavior, responsive states, and reduced motion. If substantial upstream source is translated, retain the MIT license notice required by the upstream license.

### Existing design systems

Do not create a parallel button, dialog, form, or token system. Keep the project's primitive and styling conventions while adapting the beUI interaction layer. An upstream component loses to an established accessible primitive when combining them would regress semantics or create duplicate systems.

### Greenfield projects

When the Component Opportunity Map identifies several high-value beUI matches, prefer a React/Next.js + Tailwind/shadcn-compatible foundation unless project constraints or the user favor a lighter native stack. Record the stack decision and its cost in the brief. Do not choose a framework merely to animate static prose.

## Motion system, not motion clutter

The finished site should visibly benefit from this integration:

- Give interactive controls immediate, restrained state feedback.
- Use beUI-driven transitions where spatial continuity explains what changed.
- Include 1-3 memorable signature interactions per page when appropriate to the content and approved direction.
- Keep one leading motion event per viewport; subordinate effects must be quieter.
- Remove or simplify effects that compete with reading, conversion, or task completion.
- Gate movement with `prefers-reduced-motion`; gate hover-only decoration by hover capability; provide non-drag alternatives for drag gestures.
- Verify low-power mobile behavior and prevent animation from harming Core Web Vitals.

“Use beUI universally” means every feature receives a live beUI check and the site receives a coherent interaction layer. It does not mean every element moves, every candidate is installed, or accessibility and performance are optional.

## Style-sample checkpoint

The style sample must include the automatically selected live beUI component or native-stack adaptation. Show the implemented direction, not a gallery of alternatives. State which component informed it and why it fits the brief. If the user critiques the look or behavior, revise the selection or adaptation and update the Component Opportunity Map before expanding the build.

## Verification and reporting

Before delivery:

- Confirm each Component Opportunity Map row was implemented, intentionally deferred, or rejected with a reason.
- Record the exact installed `@beui/<slug>` or source URL for adaptations.
- Test keyboard, touch, focus management, reduced motion, and responsive behavior for every imported interaction.
- Check that installed code consumes project tokens rather than carrying the demo's palette and spacing unchanged.
- List a live source as checked only after a successful fetch, and copy its URL exactly from this file or the returned response; never reconstruct or guess an endpoint in the report.
- Report registry-check failures, local/upstream divergence, and any dependency introduced.
