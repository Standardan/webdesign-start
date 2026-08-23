# Changelog

All notable changes to the webdesign-start skill. Versions follow semver: major = workflow-breaking restructure, minor = new rules/sections/capabilities, patch = fixes and wording.

## 1.11.0 — 2026-08-22

- Added `references/strategic-loops.md`, adapting the owner-supplied Farhan prompt framework into seven mandatory analyze→decide→record→verify loops: creative direction, conversion-critical section, motion system, conversion copy, technical build plan, conversion audit, and thirty-day launch plan.
- Expanded discovery and `DESIGN-BRIEF.md` to persist first-three-second intent, competitor advantage, arrival context, one promise/evidence/action, three honest copy-test variants with a selected baseline, scroll-depth objections/copy, a motion/static-baseline/mobile-budget contract, and an implementation-ready technical plan.
- Added hard rendered-site checks for three-second direction, five-second comprehension, ten-second action, objection/evidence coverage, motion purpose/fallbacks, technical-plan drift, and truthful measurement.
- Made `CONVERSION-AUDIT.md` and `LAUNCH-PLAN.md` required full-site/redesign handoff artifacts with prioritized fixes, ordered experiments, metrics/events, guardrails, owners, a thirty-day cadence, and stopping rules.
- Explicitly prohibited fabricated evidence, customer language, metrics, competitor claims, uplift estimates, and test results throughout the new loops.

## 1.10.0 — 2026-08-21

- Added ThreeUI Community as a live component source with complete Community parent/route/variant inventory, package/source integration paths, and explicit WebGL lifecycle, accessibility, performance, fallback, asset, and licensing gates.
- Replaced the beUI-centered protocol with the neutral `component-sourcing.md`: beUI, ThreeUI, Uiverse, and MDC-web now form one equal-weight candidate pool with no default, primary, first-look, or fallback provider.
- Made every-invocation inventory exhaustive and persistent: exact reconciled per-source counts, every current component identifier/capability, resource links, provenance, and freshness are retained in `.webdesign-start/component-inventory.json` when file writes are available.
- Made premium component lineage a hard build and review contract. Every designed surface must compare the strongest viable finalist from every catalog and visibly use the winner directly, through a faithful native-stack adaptation, or in a composition; plain or unattributed custom UI fails review.

## 1.9.0 — 2026-08-20

- Expanded the component protocol from beUI-only to a multi-catalog sourcing protocol: beUI (first look, animated React), Uiverse via the machine-readable `uiverse-io/galaxy` repo (micro-element treatments: buttons, cards, checkboxes, loaders, switches...), and Material Components Web (Material-direction builds and behavior/accessibility reference). All fetched fresh every run; the Component Inventory now spans all three (beUI item-by-item, Uiverse as a category census browsed live at selection time, MDC as a package list); the covered-pattern FAIL applies across every catalog; every shipped component names its catalog of origin or is marked custom-built.
- Added live companions fetched fresh each engagement: the taste-skill (MIT) as a second anti-generic pass composed with anti-slop.md (design read, variance/motion/density dials, aesthetic variants — brief and accessibility still win on conflict), and the design-resources-for-developers index as the first stop for fonts, illustrations, photography, and icon sourcing.

## 1.8.0 — 2026-08-20

- Added the measured **Reference Teardown** to Phase 2: every user-approved site gets hard values captured from the live page (grounds, borders, accent census, display size/weight/tracking, third voice, nav spec, container, radius/shadows, hero anatomy, section rhythm, motion) via computed styles when a browser exists, estimates flagged otherwise; teardowns are pasted into the brief under the matrix. Root cause: qualitative notes ("big serif hero") let the build silently substitute model defaults for every unspecified value, which is exactly how approved references were getting ignored.
- Phase 4 must now **design from the teardowns**: core tokens, type spec, nav, container, and section rhythm each derive from a named teardown value (own hue/face, preserved relationship), with derivations recorded in the Foundation Gate table; inventing from priors is allowed only where no teardown speaks. Sections with matrix obligations are built with the reference region reopened in view.
- The owner's-eyes pass now requires a side-by-side loop (rendered page next to each approved reference) checking that measured relationships survived; matrix evidence must cite teardown values; P1 fidelity checks must be measurable; the Phase 5 audit judges verdicts against teardown numbers, not memory of the site.

## 1.7.0 — 2026-08-20

- Made catalog knowledge mandatory: Phase 0 now reads the entire live beUI registry (~117 items) into a grouped Component Inventory, and the Component Opportunity Map is built by sweeping every page and section against that full inventory — selection by recognition instead of per-feature keyword guesses.
- Made covered patterns binding: shipping a plain hand-rolled version of a pattern the catalog covers is now a pre-delivery FAIL unless a concrete constraint is recorded; added a covered-pattern sweep to verification.
- Added "Custom components at catalog grade": where no live component fits, custom builds must match the catalog's craft bar (token-driven anatomy, full state life, one motion idea with reduced-motion path, complete keyboard/touch), studying the nearest catalog item's source first; signature moments (hero demos, domain visualizations) are explicitly custom-built to this standard.

## 1.6.0 — 2026-08-20

- Added `references/finishing.md`: generative recipes with committed numeric ranges — tinted neutrals (no S=0 grays, tinted grounds, brand-named tokens), display type conviction (size/weight/tracking bands), a mandatory written accent-discipline sentence, the third type voice for labels/stats, tinted shadows, quiet designed chrome, evidence-based heroes, and deliberate density modulation. Prohibition catalogs audit slop after the fact; these recipes replace the timid defaults at generation time.
- Added the Foundation Gate to Phase 4: the token/theme file and type spec are written first, alone, and verified against a printed pass/fail table before any component consumes a token — foundation timidity propagated into components was the main way builds still ended up looking generated despite passing later audits.
- Added the "owner's-eyes pass" to Phase 4: at least two internal render-critique-fix loops at 375px/1440px before the user sees the style sample or delivery, replicating the manual tweaking loop that separates first generations from finished sites; loop count and findings go in the report.
- Brief now must carry a chosen value for every finishing-recipe parameter; added a token-ownership check to the slop audit (framework grayscale ramps with generic names = no color decision made); fixed duplicate step numbering in the audit protocol.

## 1.5.0 — 2026-08-20

- Replaced the update-only notice with automatic Phase 0 self-updating.
- Added `scripts/update_skill.py`: standard-library Python, canonical-version check, clean git fast-forward support, validated archive installation for copied skills, atomic replacement, and rollback on failure.
- Updated the workflow to re-read `SKILL.md` after an update and continue non-blockingly on unavailable network, runtime, or permissions.

## 1.4.0 — 2026-08-19

- Made the Step 2 reference-fidelity self-review a hard gate instead of a checklist: every Reference Translation Matrix row (P1/P2/Avoid) must be reprinted with a PASS/FAIL/PARTIAL verdict and page-level evidence, and shown to the user in the delivery report — not just reasoned about silently.
- Added an explicit re-check for rule-shaped matrix rows ("never," "only ever," "no X"): these must be re-scanned against every section built after the style-sample checkpoint, not just the component they were first implemented for. Root cause: an agent can correctly implement a constraint once (e.g. "accent color only as glow, never a flat fill") and then violate it in a later section (a CTA band) built without re-checking the rule, and nothing in the prior self-review flow caught that until the user did.
- Step 8 delivery report now opens with the pasted verdict table and Component Opportunity Map coverage as receipts, rather than a prose summary of them.

## 1.3.0 — 2026-08-16

- Added an every-invocation live refresh for the beUI registry, upstream agent skill, and repository state alongside the existing webdesign-start version check.
- Added `references/beui.md`: live component discovery, per-feature selection, stack adaptation, offline fallback, safe upstream merging, and accessibility/performance rules.
- Added a Component Opportunity Map to `DESIGN-BRIEF.md` so every meaningful feature is checked against current beUI components and receives an automatic selection before implementation.
- Made beUI the automatic default wherever a compatible live component fits; the style sample shows the implemented selection, and user critique triggers reselection or restyling instead of an up-front component picker.
- Added component provenance and coverage to pre-delivery verification while preserving motion hierarchy, reduced-motion support, and existing design systems.

## 1.2.0 — 2026-07-29

- Made the assistant reopen positively rated sites from its 4-6 Phase 2 examples and inspect them beyond the initial candidate search.
- Replaced loose "Reference DNA" summaries with a user-approved Reference Translation Matrix: observed evidence, user signal, original project adaptation, exact target, and fidelity check; rejected examples become explicit avoidances.
- Made user-provided example sites first-class inputs that are inspected before any broader reference search.
- Added an explicit reference-driven style-sample checkpoint before the full build.
- Added reference priority rules so approved examples outrank generic style/layout catalogs unless accessibility or project goals require a deviation.
- Added a rendered reference-fidelity audit and reference-coverage report to pre-delivery review.

## 1.1.0 — 2026-07-16

- Version + update-check system: `webdesign-start/VERSION`, Phase 0 freshness check, staleness rule for trend-sensitive content.
- Anti-slop: absorbed pols.dev Anti-Slop Design Law ideas (attributed, restated) — component micro-tells, execution-bug catalog + audit step, "clean is the floor," font-rotation tell.
- Integrated 8-agent research findings: structural AI tells (containerization, fabricated evidence, mobile stacking, shadcn silhouette), signature-element requirement, task-mode router, style-sample-first build, discovery upgrades (why-now, perception gap, 3-traits exercise, decision model), guided reference reading, modern CSS baseline, Core Web Vitals gates, role-based motion tokens, OKLCH/color-mix, variable fonts, zoom-safe clamp(), GOV.UK form patterns, empty-state taxonomy, EAA legal precision, conversion evidence, elite-site craft notes.

## 1.0.0 — 2026-07-10

- Initial release: six-phase workflow (Intake → Discovery → Research → Brief → Build → Review), ten reference catalogs, brief-approval gate, anti-slop rules, per-tool adapters (Claude Code, Cursor, Codex, Windsurf, universal prompt).
