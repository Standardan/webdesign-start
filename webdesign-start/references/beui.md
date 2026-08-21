# Live Component Sourcing Protocol (beUI + partner catalogs)

This file defines the live component-sourcing protocol for the skill. Building a UI surface from scratch when a live catalog already covers it is a failure mode, not a neutral choice: the catalogs below hold designed, animated, accessibility-worked components, and the plain hand-rolled version the model produces instead is precisely what reads as generated. Every catalog changes frequently, so this file defines live lookup protocols rather than freezing component lists. **Never assume a catalog's contents — always fetch and check before building.**

The catalogs, in first-look order:

1. **beUI** — MIT, shadcn-compatible animated React/Next.js components (~117 items). The primary source for interactions, motion components, blocks, and agent/AI surfaces.
2. **Uiverse** — the largest open-source UI element library (community-made CSS/Tailwind micro-elements: buttons, cards, checkboxes, forms, inputs, loaders, notifications, patterns, radio buttons, switches, tooltips). The source for distinctive micro-element treatments a design-system library won't have.
3. **Material Components Web (MDC-web)** — Google's production web components. The source when the brief's direction is Material or Material-adjacent, and otherwise a behavior/accessibility reference for hard widgets (dialogs, menus, ripple states, focus management).

Plus two non-component companions fetched fresh alongside them:

4. **design-resources-for-developers** (bradtraversy) — a maintained index of asset and tool sources: fonts, color tools, illustrations, stock photography, icons, inspiration galleries. The first stop when the brief needs an asset (a typeface source, an illustration style, photography) rather than a component.
5. **taste-skill** (Leonxlnx) — an MIT portable anti-generic frontend skill (design-read + variance/motion/density dials + contextual rules). Read alongside `anti-slop.md`; see that file for how the two compose.

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

**beUI** (in order):

1. Registry index: `https://beui.dev/r/registry.json`
2. Agent-oriented catalog: `https://beui.dev/llms.txt`
3. Current upstream skill: `https://raw.githubusercontent.com/starc007/ui-components/main/skills/beui/SKILL.md`
4. Repository: `https://github.com/starc007/ui-components`
5. Component detail/source: `https://beui.dev/r/{slug}.json` or `https://beui.dev/r/{slug}/raw`

**Uiverse** — the machine-readable catalog is the GitHub repo `uiverse-io/galaxy` (the website may block automated fetches; the repo does not):

1. Category listing: `https://api.github.com/repos/uiverse-io/galaxy/contents/` (folders: Buttons, Cards, Checkboxes, Forms, Inputs, Loaders, Notifications, Patterns, Radio-buttons, Toggle-switches, Tooltips)
2. Elements in a category: `https://api.github.com/repos/uiverse-io/galaxy/contents/{Category}`
3. Element source: raw files under `https://raw.githubusercontent.com/uiverse-io/galaxy/main/{Category}/{element}/`
4. Browsable site (when reachable): `https://uiverse.io/`

**MDC-web:**

1. Repository + package list: `https://github.com/material-components/material-components-web` (`packages/` directory is the component catalog: `mdc-dialog`, `mdc-menu`, `mdc-textfield`, ...)
2. Docs per component live beside each package's README.

**Companions:**

- Asset/tool index: `https://raw.githubusercontent.com/bradtraversy/design-resources-for-developers/master/readme.md`
- taste-skill: `https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/taste-skill/SKILL.md` (repo `https://github.com/Leonxlnx/taste-skill` also carries aesthetic variants — brutalist, minimalist, soft, redesign — usable when the brief matches one)

The live indexes are the component source of truth. Search snippets, memory, and this file are not catalogs. All three component sources are MIT (or equivalently permissive) — keep any required license notice when substantial source is copied, per each repo's LICENSE.

## Mandatory refresh on every run

Attempt all of the following in the background during Phase 0, even for a small edit or audit:

1. Fetch the live beUI registry and `llms.txt`, the Uiverse `galaxy` category listing, and the MDC-web package list. A shell-capable environment may use `curl -fsSL`; a browsing-capable environment should open the URLs directly. Fetch fresh every run — never carry a previous engagement's catalog forward.
2. Fetch the current upstream beUI skill and the current taste-skill so their latest rules inform this run.
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

Keyword-searching a registry per feature is not enough: you miss every component you didn't think to search for, and the misses are exactly the premium patterns (a morphing modal, a dynamic island, a number ticker, a command palette) that separate a designed site from a plain one.

At Phase 0, after the refresh, write a one-screen **Component Inventory** covering all three catalogs, and rebuild it each run from the live fetches, never from memory:

- **beUI:** read the entire registry index (every item's `name`, `title`, `description`) — roughly 100–150 items, small enough to learn item by item. Group by function: inputs/forms, navigation, overlays, text/number animation, tables/data, scroll effects, blocks/patterns, agent/AI surfaces, loaders/feedback.
- **Uiverse:** it holds thousands of elements, so the inventory records the *category census* (each category folder and what lives there) rather than every item; when a need maps to a category, browse that category live at selection time.
- **MDC-web:** read the `packages/` list once into a line of available widgets.

This inventory is what lets selection be *recognition* ("the pricing section wants Number Ticker; the toggle wants a Uiverse switch treatment; the menu's focus behavior should follow mdc-menu") instead of guesswork.

Then, while planning in Phase 3, sweep **every page and section in the brief** — not only obviously interactive features — against the full inventory and record the matches in the Component Opportunity Map. A section with no match is fine; a match that was never noticed is the failure this section exists to prevent.

## Feature-first selection

Run this sequence for every new or changed feature, not only for obviously animated widgets:

1. State the user need in functional terms: submit with status, compare options, open mobile navigation, reveal details, upload files, browse media, switch views, or show progress.
2. Check the need against the full Component Inventory first, then confirm against the live catalogs in first-look order: search beUI's registry (`items[].name`, `title`, `description`); if beUI has no strong match, browse the matching Uiverse category; consult MDC-web when the direction is Material or the widget's behavior/accessibility is the hard part.
3. Inspect the closest item's detail/source files, dependencies, accessibility behavior, reduced-motion handling, and current usage example.
4. Select the strongest current match using functional fit, approved references, stack compatibility, accessibility, and performance. Inspect another candidate internally only when needed to resolve ambiguity; do not turn implementation into a component-selection questionnaire.
5. Use the selected catalog component automatically instead of a basic hand-rolled widget. Adapt its styling to the approved tokens and reference obligations; do not paste its demo aesthetic unchanged — Uiverse elements especially arrive with strong opinions that must be re-tokened to the brief, and MDC components must not drag Material's visual identity into a non-Material brief (take the behavior, restyle the skin).
6. **A covered pattern implemented plainly is a defect, not a style choice.** If *any* of the three catalogs has an item whose function matches the need and you ship a bare hand-rolled version anyway (a plain `<select>` where a designed select exists, a static number where a ticker exists, a default checkbox where Uiverse has a hundred designed ones), that is a FAIL in the pre-delivery component audit — unless a concrete recorded constraint (stack cost, accessibility regression, performance budget, or a brief rule) justifies it in the Opportunity Map row.
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
- Record the exact installed `@beui/<slug>`, Uiverse element path, MDC package, or source URL for adaptations — every shipped component names its catalog of origin or is marked custom-built.
- Test keyboard, touch, focus management, reduced motion, and responsive behavior for every imported interaction.
- Check that installed code consumes project tokens rather than carrying the demo's palette and spacing unchanged.
- List a live source as checked only after a successful fetch, and copy its URL exactly from this file or the returned response; never reconstruct or guess an endpoint in the report.
- Report registry-check failures, local/upstream divergence, and any dependency introduced.
