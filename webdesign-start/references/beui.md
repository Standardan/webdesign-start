# Live beUI Component Protocol

beUI is the required first-look component source for this skill. It is an MIT-licensed, shadcn-compatible library of animated React and Next.js components. The catalog changes frequently, so this file defines a live lookup protocol rather than freezing a component list.

**Read this file:** on every invocation during Phase 0, while writing the Component Opportunity Map in Phase 3, and immediately before implementing any new or changed feature.

## Contents

1. [Live sources](#live-sources)
2. [Mandatory refresh on every run](#mandatory-refresh-on-every-run)
3. [Know the whole catalog](#know-the-whole-catalog)
4. [Feature-first selection](#feature-first-selection)
5. [Custom components at catalog grade](#custom-components-at-catalog-grade)
6. [Component Opportunity Map](#component-opportunity-map)
7. [Installation and stack adaptation](#installation-and-stack-adaptation)
8. [Motion system, not motion clutter](#motion-system-not-motion-clutter)
9. [Style-sample checkpoint](#style-sample-checkpoint)
10. [Verification and reporting](#verification-and-reporting)

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

## Know the whole catalog

Keyword-searching the registry per feature is not enough: you miss every component you didn't think to search for, and the misses are exactly the premium patterns (a morphing modal, a dynamic island, a number ticker, a command palette) that separate a designed site from a plain one. The catalog is roughly 100–150 items — small enough to actually learn.

At Phase 0, after the refresh, **read the entire registry index** (every item's `name`, `title`, `description`) and write a one-screen **Component Inventory** grouped by function — inputs/forms, navigation, overlays, text/number animation, tables/data, scroll effects, blocks/patterns, agent/AI surfaces, loaders/feedback. Keep it for the whole engagement and rebuild it each run from the live fetch, never from memory. This inventory is what lets selection be *recognition* ("the pricing section wants Number Ticker; the nav wants Dock or Morphing Tabs") instead of guesswork.

Then, while planning in Phase 3, sweep **every page and section in the brief** — not only obviously interactive features — against the full inventory and record the matches in the Component Opportunity Map. A section with no match is fine; a match that was never noticed is the failure this section exists to prevent.

## Feature-first selection

Run this sequence for every new or changed feature, not only for obviously animated widgets:

1. State the user need in functional terms: submit with status, compare options, open mobile navigation, reveal details, upload files, browse media, switch views, or show progress.
2. Check the need against the full Component Inventory first, then search the live registry's `items[].name`, `title`, and `description` to confirm and find anything the inventory summary compressed away.
3. Inspect the closest item's detail JSON, files, dependencies, accessibility behavior, reduced-motion handling, and current usage example.
4. Select the strongest current match using functional fit, approved references, stack compatibility, accessibility, and performance. Inspect another candidate internally only when needed to resolve ambiguity; do not turn implementation into a component-selection questionnaire.
5. Use the compatible beUI component automatically instead of a basic hand-rolled motion widget. Adapt its styling to the approved tokens and reference obligations; do not paste its demo aesthetic unchanged.
6. **A covered pattern implemented plainly is a defect, not a style choice.** If the catalog has an item whose function matches the need and you ship a bare hand-rolled version anyway (a plain `<select>` where the catalog has a designed select, a static number where it has a ticker, a default dialog where it has a morphing modal), that is a FAIL in the pre-delivery component audit — unless a concrete recorded constraint (stack cost, accessibility regression, performance budget, or a brief rule) justifies it in the Opportunity Map row.
7. If no component fits, do not fall back to a plain implementation: build a custom component at catalog grade (next section) and record "no suitable live match — custom built" rather than stretching an unrelated component into the job.

## Custom components at catalog grade

The catalog is a *floor of craft*, not just a parts bin. Whenever a needed surface has no live match — or the stack is non-React and behavior is being reproduced natively — build a **custom component to the same standard the catalog holds its own items to**:

- **Designed, not default:** the component consumes project tokens, follows the brief's radius/border/shadow system, and has an intentional anatomy — never framework-default styling with content poured in.
- **Full state life:** hover, focus-visible, active, disabled, loading, empty, and error states all designed, not just the happy state.
- **Purposeful motion:** one clear motion idea per component (a morph, a spring, a stagger, a reveal), executed with transform/opacity and a `prefers-reduced-motion` path — the same motion character as the rest of the site, per `ux-rules.md`.
- **Complete input support:** keyboard, touch, and pointer all first-class; focus managed on open/close; drag gestures have non-drag alternatives.
- **Learn from the nearest neighbor:** before building, open the source of the closest catalog item and study *how* it achieves its quality — its state handling, its easing values, its accessibility wiring — then apply that craft to the custom need. Cite the studied item in the Opportunity Map row.

Signature moments deserve this most: the hero product demo, a domain-specific visualization, the one interaction a visitor will describe to someone else. Those are almost always custom — build them as first-class catalog-grade components, and give them the project's best engineering, because they carry more of the perceived quality than any installed widget.

Do not ask permission merely to use beUI. The approved brief supplies the direction; the rendered style sample supplies the critique point. If the user rejects the result, convert the critique into a concrete constraint, recheck the live catalog, and replace or restyle the selection.

## Component Opportunity Map

Add this table to `DESIGN-BRIEF.md` before build approval:

| Feature need | Live beUI candidates checked | Selected implementation | Target | Adaptation and reason | Constraint/fallback |
|---|---|---|---|---|---|
| [functional need] | [`@beui/slug-a`, `@beui/slug-b`] | [`@beui/slug-a`] | [component/section/page] | [how it serves the brief] | [stack, a11y, performance, or no-match note] |

Each meaningful interactive feature gets a row, and the map is built by sweeping every page and section in the brief against the full Component Inventory (see "Know the whole catalog") — not by listing only the features that already sounded interactive. Custom builds get a row too, with the studied neighbor item recorded in the adaptation column. Static text, ordinary layout containers, and purely editorial prose do not need manufactured component rows.

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
- **Covered-pattern sweep:** walk the rendered pages against the Component Inventory one last time. Any surface that shipped as a plain implementation of a pattern the catalog covers — without a recorded constraint — is a FAIL: replace it or record the justification before delivery.
- **Custom-grade check:** every custom-built component passes the catalog-grade bar (token-driven anatomy, full state life, one motion idea with a reduced-motion path, complete keyboard/touch support) — a custom component is not exempt from the standard just because it has no slug.
- Record the exact installed `@beui/<slug>` or source URL for adaptations.
- Test keyboard, touch, focus management, reduced motion, and responsive behavior for every imported interaction.
- Check that installed code consumes project tokens rather than carrying the demo's palette and spacing unchanged.
- List a live source as checked only after a successful fetch, and copy its URL exactly from this file or the returned response; never reconstruct or guess an endpoint in the report.
- Report registry-check failures, local/upstream divergence, and any dependency introduced.
