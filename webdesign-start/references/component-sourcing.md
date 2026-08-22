# Live Component and Resource Sourcing Protocol

This file defines one neutral toolkit assembled from every live component catalog and companion resource used by the skill. No catalog is the default, primary, fallback, or tie-breaker. Catalog identity never earns selection priority. For each designed surface, inspect the complete current collection and use the component whose function, visual character, approved references, stack, accessibility, performance, and license fit this website best.

Plain hand-built UI where this collection can supply or meaningfully shape the surface is a failure. Every meaningful section, interaction, visualization, control, state, and signature moment must have explicit catalog lineage. Structural HTML, prose, layout wrappers, and project-specific data glue are not component surfaces and do not need artificial catalog attribution.

**Read this file:** on every invocation during Phase 0; while writing the Component Opportunity Map in Phase 3; before implementing every new or changed designed surface; and during Phase 5 review.

## The equal-weight toolkit

All sources enter one candidate pool:

1. **beUI** — MIT, shadcn-compatible animated React/Next.js components, blocks, interactions, motion, data, and agent/AI surfaces.
2. **ThreeUI Community** — MIT React/Three.js/WebGL/Canvas components, scenes, landing experiences, backgrounds, text motion, and visual UI. Read `threeui.md` for runtime, fallback, and asset gates.
3. **Uiverse** — community-made CSS/Tailwind buttons, cards, checkboxes, forms, inputs, loaders, notifications, patterns, radio buttons, switches, and tooltips.
4. **Material Components Web (MDC-web)** — production component packages and behavior/accessibility implementations for controls, dialogs, menus, navigation, text fields, and related foundations.

Two live companions join the same engagement inventory:

5. **design-resources-for-developers** — maintained font, color, illustration, photography, icon, and inspiration sources.
6. **taste-skill** — current anti-generic frontend rules used beside `anti-slop.md`.

Capability descriptions help search; they are not routing rules. A ThreeUI control may beat beUI, a beUI visual may beat ThreeUI, Uiverse may supply the defining treatment, and MDC may be the strongest non-Material choice. Decide from the actual current item and approved website direction.

## Live sources

**beUI:**

1. Registry: `https://beui.dev/r/registry.json`
2. Agent catalog: `https://beui.dev/llms.txt`
3. Current upstream skill: `https://raw.githubusercontent.com/starc007/ui-components/main/skills/beui/SKILL.md`
4. Repository: `https://github.com/starc007/ui-components`
5. Item source: `https://beui.dev/r/{slug}.json` or `https://beui.dev/r/{slug}/raw`

**ThreeUI:** use the Community report, metadata, package, repository, and license sources in `threeui.md`. Do not fetch its very large complete source bundle during the general inventory pass.

**Uiverse:**

1. Repository: `https://github.com/uiverse-io/galaxy`
2. Recursive tree: `https://api.github.com/repos/uiverse-io/galaxy/git/trees/main?recursive=1`
3. Category contents fallback: `https://api.github.com/repos/uiverse-io/galaxy/contents/{Category}`
4. Element source: `https://raw.githubusercontent.com/uiverse-io/galaxy/main/{Category}/{element}/`
5. Browse: `https://uiverse.io/`

**MDC-web:**

1. Repository: `https://github.com/material-components/material-components-web`
2. Package catalog: `https://api.github.com/repos/material-components/material-components-web/contents/packages`
3. Package guidance: each package's current README in the repository.

**Companions:**

- Asset/resource index: `https://raw.githubusercontent.com/bradtraversy/design-resources-for-developers/master/readme.md`
- taste-skill: `https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/taste-skill/SKILL.md`
- taste-skill repository: `https://github.com/Leonxlnx/taste-skill`

Live indexes are the source of truth. Search snippets, remembered names, prior engagement files, and counts written in documentation are not catalogs.

## Mandatory complete inventory on every invocation

At Phase 0, fetch every source and create a fresh **Complete Resource Inventory**. Do this for new sites, brief continuations, small edits, and audits. Run independent fetches concurrently when the environment permits.

The inventory must contain:

- fetch timestamp and exact source URL;
- upstream commit SHA and package/version where available;
- exact total count for each catalog, plus category/type counts that reconcile to that total;
- every component's current name, ID/slug/path/import, category, short capability description, stack/runtime, and variant count where exposed;
- every companion-resource category and link, plus the current taste-skill revision and capability summary;
- fetch failures, pagination/truncation warnings, and anything excluded from the public/community boundary.

Do not report one misleading grand total: a ThreeUI parent, route, variant, Uiverse element, and MDC support package are different units. Preserve each source's own units and reconcile each subtotal independently.

Inventory each source completely:

- **beUI:** retain every registry entry and its `name`, `title`, `description`, type/category, and source endpoint. The total equals the number of unique current registry items.
- **ThreeUI:** follow `threeui.md`; retain every Community parent plus its routes, variants, import name, category, runtime, interaction, controls, and asset needs. Report parent, route, singleton, and variant totals separately.
- **Uiverse:** enumerate every category and every immediate element directory, retaining each category/element path. A category-only census is incomplete. If GitHub's recursive tree says `truncated: true`, use category endpoints, pagination, a shallow temporary clone, or another complete repository view until every element is counted.
- **MDC-web:** retain every current package name and classify it as user-facing component, foundation/adapter, utility, or infrastructure. Report the full package total and the user-facing component subtotal.
- **design-resources-for-developers:** retain every current heading/category and every linked resource under it; report category and link totals.
- **taste-skill:** retain its current commit/revision when available and a compact capability/rule summary. It is guidance, so do not invent a component count.

### Engagement memory

If file writes are available, persist the complete machine-readable snapshot at `.webdesign-start/component-inventory.json` in the target project. Replace it atomically on each invocation only after all successful source data has been validated. Preserve the last successful data for a failed source and mark that portion stale; never silently present it as current. If file writes are unavailable, keep the same complete manifest in active working notes and retain at least the exact counts, provenance, categories, and identifiers for the whole engagement.

`DESIGN-BRIEF.md` records the snapshot timestamp, per-source totals, provenance, failures, and inventory path. The full identifier list stays in the inventory artifact so it can be searched without bloating the brief.

Before selection, verify:

1. every required source was attempted;
2. paginated or truncated sources were continued to completion;
3. IDs/paths are unique inside each source;
4. category and variant subtotals reconcile with reported totals;
5. the artifact can be searched by function, visual trait, category, runtime, and stack.

### Offline fallback

If a source is unreachable, try its raw repository, package metadata, or last locally persisted successful snapshot. Tell the user once which source is stale or unavailable. Continue, but do not invent current names or counts. A stale source remains in the candidate pool with a visible freshness warning; recheck it when access returns.

## Equal-weight selection for every designed surface

Run this sequence for every new or changed section, interaction, visualization, control, feedback state, and signature moment:

1. Define the job and the intended character in project terms.
2. Search the Complete Resource Inventory across **all four component catalogs**. Do not stop when the first plausible match appears and do not route to a favored catalog by component type.
3. For each catalog, retain its strongest plausible candidate or record `no viable candidate`. Inspect live previews and current source for every finalist; names and thumbnails are insufficient.
4. Compare finalists with one neutral rubric: functional fit, visible fit to the approved references, project-stack compatibility, accessibility, interaction quality, responsive behavior, performance, asset/license safety, and adaptation cost.
5. Select the strongest overall fit. Catalog name and prior usage carry zero weight. Record why the winner suits this website better than the other finalists.
6. Use the selected component directly when compatible. Otherwise make a faithful native-stack adaptation or compose it with the project's established accessible primitives. The finished surface must preserve observable design/behavior lineage from the selected catalog item.
7. Re-fetch the exact selected item immediately before implementation. Merge deliberately; never overwrite project-specific work merely because upstream changed.

**Component use is mandatory; mismatched package installation is not.** Never force a framework, inaccessible behavior, unlicensed asset, or disproportionate runtime merely to install an item unchanged. Select another component from the equal pool or adapt the strongest compatible pattern while preserving its meaningful craft.

## No plain custom-component escape hatch

When no item is an exact functional match, select the closest high-quality catalog pattern as the design and behavior basis, then build the project-specific logic around it. Record the result as **catalog-derived**, not unqualified `custom`.

A catalog-derived implementation must preserve:

- recognizable anatomy, interaction idea, motion character, or visual treatment from the named source;
- project tokens and the approved reference obligations rather than the demo palette;
- complete hover, focus-visible, active, disabled, loading, empty, and error states where applicable;
- keyboard, touch, pointer, responsive, and reduced-motion behavior;
- source provenance and required license notices.

Never cite a component without materially incorporating it. A source name in the brief is not lineage if the rendered result is still a plain default control, generic card grid, static number, or unstyled native widget.

## Component Opportunity Map

Add one row for every designed surface; sweep every page and section rather than listing only obvious interactions:

| Surface/job | Best candidate from each catalog | Selected lineage | Mode | Target | Reference fit and adaptation | Constraints/fallback |
|---|---|---|---|---|---|---|
| [job] | [beUI item/none · ThreeUI item/none · Uiverse item/none · MDC item/none] | [exact source ID/import/path] | [direct/adapted/composed] | [component/section/page] | [why this is the best fit for this website and what visibly carries through] | [stack/a11y/performance/license/fallback] |

Static prose and layout glue do not need manufactured rows. Cards, buttons, navigation, forms, menus, loaders, data displays, backgrounds, media treatments, feedback states, major content sections, and signature visuals do.

Do not present a catalog picker. The skill makes the neutral comparison, implements the winner in the reference-driven style sample, and uses the rendered result as the user's critique point.

## Installation and adaptation

Inspect before installing and use the project's package manager.

For beUI in a compatible shadcn setup:

```bash
npx shadcn@latest view @beui/<slug>
npx shadcn@latest add @beui/<slug>
```

beUI is copy-owned source, not a runtime `beui` package. Read every added file and remap its visual values to project tokens.

For ThreeUI, follow `threeui.md` and verify the current package/source, renderer lifecycle, assets, and fallback before integration.

For Uiverse, inspect the exact element's HTML/CSS and license provenance. Port the treatment into the project's semantic component; do not paste demo markup that weakens semantics.

For MDC-web, inspect the exact current package and README. Preserve its behavior/accessibility strengths without importing Material's visual identity when the approved brief calls for something else.

In Vue, Svelte, Astro, plain HTML, or an established design system, adapt the selected component's meaningful behavior and visual craft into the native stack. Do not introduce a parallel framework or primitive system unless the approved collection of selected components justifies the cost.

For greenfield work, let the complete set of selected components determine the stack. No single catalog decides it. Record the tradeoff in the brief.

## Style-sample checkpoint

The style sample must include the highest-impact selected premium component plus representative selected treatments for its button/card or other visible primitives. Show implemented winners, not alternatives. Identify the source item and the exact observable trait incorporated. If the user critiques the result, convert the feedback into a constraint, search the full equal-weight inventory again, and revise the selection or adaptation before expanding the build.

## Verification and reporting

Before delivery:

- confirm the Complete Resource Inventory has exact per-source counts, identifiers, provenance, and freshness status;
- confirm every Component Opportunity Map row names the strongest finalist from each catalog or an explicit `no viable candidate`;
- confirm every designed surface uses a direct, adapted, or composed catalog component with observable lineage;
- fail and fix any plain or generic implementation that lacks catalog lineage;
- verify selected code uses project tokens and satisfies keyboard, touch, focus, reduced-motion, responsive, performance, asset, and license requirements;
- record exact beUI slugs, ThreeUI Community IDs/imports/version or commit, Uiverse paths, MDC packages, and source URLs;
- report catalog-source failures, stale inventory sections, dependency additions, and local/upstream divergence honestly.

The review passes only when both conditions are true: the components fit this specific website, and the collection's craft is visibly present throughout the rendered experience.
