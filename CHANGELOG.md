# Changelog

All notable changes to the webdesign-start skill. Versions follow semver: major = workflow-breaking restructure, minor = new rules/sections/capabilities, patch = fixes and wording.

## 2.3.0 — 2026-09-24

Discovery opens up, and sites are no longer all "worlds" themed on the time of day.

- **Registers** (`references/registers.md`): every site is settled early as **world** (a place, story or object), **product** (an Apple-style launch) or **interface** (a dashboard or app). Concept parts, craft rules, depth and motion adapt to the register, and all three concepts stay in the user's register.
- **New formats:** `product-film.md` (Apple-style launch: studio-lit product, one truth per pinned chapter, proof numbers, finishes, compare table) and `app-interface.md` (dashboards and product apps: a real design system, the one number first, designed states, command palette, honest demo data). Now 25 formats.
- **Exploration spread:** right after the fundamentals, discovery shows 8 very different ideas for the user's subject, each a different experience from the gallery. The gallery's pages are now grouped into 21 experiences (play, make, generate, flip, learn how it works, watch live data, a product launch and more), each with gallery examples. Picks steer the concepts, and every picked idea must appear in one.
- **Light and time are tools, not themes:** "when is it?" is no longer a default question. Time of day may theme at most one concept, and only when time is genuinely the subject. Unrequested time-of-day theming and a wrong register are new sameness tells. Examples throughout were rewritten without dawn, dusk or night themes, including new worked paragraphs for a product film and an app dashboard.
- **Discovery questions for each register:** product questions (the one thing it does best, what to see first, the product asset) and interface questions (who uses it, the one number, density, light or dark).

## 2.2.0 — 2026-09-24

The polish layer, from a critique of the second real build (a car-rental site that was strong but a notch below the gallery).

- **New Phase 6 — Polish** (`references/polish.md`); review moves to Phase 7. The pass covers:
  - chrome and layering, with clear zones and a lane for floating UI;
  - pause-anywhere frames: no half-rolled digits, overlapping sprites or layout shift;
  - typography finishing: balanced and pretty wrapping, no lone words or wrapping labels, real typographic characters, non-breaking unit spaces;
  - every control styled, and every state designed;
  - one scale per scene;
  - a rendering-detail pass for illustration: shading where surfaces meet, edge light, material variety, secondary detail, authored night states;
  - device fidelity;
  - section rhythm;
  - the last details.
- **New `scripts/page_audit.js`.** It scrolls the whole page and reports:
  - text passing under fixed chrome with no backing;
  - floating panels hiding content;
  - lone last words and cut-off text;
  - browser-default controls and placeholder filler;
  - four or more sections in a row built from the same block.

  Calibrated on gallery pages so their known-good choices (hidden native inputs with custom visuals, open scene zones) don't trip it.
- **Gates run through the whole page:**
  - screenshots every 50–75% of a viewport;
  - `palette_check.py` takes many screenshots;
  - `squint_check.py` runs on each set piece's opening frame;
  - gallery calibration scrolls the whole page side by side.
- **Loopholes closed:**
  - the squint check rejects focal areas over 40 of 160 cells;
  - check exceptions must be agreed with the user and recorded in the brief, never self-granted.
- **New rules:**
  - device fidelity: a named device must be that thing, not a card standing in for it; it has its own row in the slot audit;
  - section rhythm: vary every 2–3 sections, never four identical in a row, and a full-bleed set piece about every three screens.

## 2.1.0 — 2026-09-23

Lessons from the first real build (a bakery site that came out boxy, unfinished and partly generic), plus a shift to modern, component-rich sites.

- **Components are a core ingredient again.** `component-sourcing.md` now covers modern sources (shadcn/ui, Aceternity UI, Magic UI, React Bits, Motion Primitives, Origin UI, beUI, Uiverse, ThreeUI, GSAP, Motion). It covers choosing per surface, restyling every component to the site's tokens and concept, and a list of overused effects. The brief gets a component plan, and the paragraph names its key components. Quality Contract clause 1 is now "Crafted, not assembled".
- **Contemporary by default.** Sites use today's design language unless the user asks for a period, heritage or illustrated style. Discovery asks "period or modern?" when the user says vintage or classic. Style anchors, examples and world questions no longer lean vintage.
- **Build mode is asked each time:** a single file (online, or an offline variant with system fonts) or a full project. Web fonts and small CDN libraries are allowed in single-file mode.
- **Completeness gate:** a dead-link and empty-section check plus a build ledger of every promise in the paragraph, checked before any visual review. Nothing may be logged as done without being seen.
- **Cold critique:** each review loop includes an art-director critique made without reading the brief, by a separate reviewer where the environment allows.
- **New craft rules and review tests:**
  - scenes, not diagrams (the boxy trap), with silhouette and squint tests and no dead zones;
  - information lives inside the world, not in cards pasted over art;
  - the idea survives the scroll;
  - lettering traditions are more than a font with effects;
  - objects, not clip art;
  - say each fact once per screen.
- **The beauty floor** (`aesthetics.md`), measured on all 100 gallery pages and tested against the failed build:
  - **Colour:** one accent hue, families separated by value, tinted neutrals, ramps that lean yellow as they lighten, warm colours on dark grounds used as light, and 11 named clashes.
  - **Depth and light:** a depth family per surface, at least 5 depth cues in a hero, one key light declared as tokens, a five-level elevation scale, grounded objects, one projection and horizon, and no near-axis angles.
  - **Composition and geometry:** exact or clearly off-centre focal points, one gutter, no near-miss edges, a real type scale, 0–2 radii, declared rotation only, and curved text only on drawn circles.
  - **Calibration:** side by side with two same-format gallery pages.
- **Checking scripts:**
  - `scripts/palette_check.py`: tokens, plus an optional screenshot.
  - `scripts/squint_check.py`: the subject must be the strongest thing on screen. Its thresholds were calibrated so all tested gallery pages pass.
  - `scripts/composition_audit.js`: a DOM audit.

  The palette is checked before the brief is approved and shown to the user as swatches. The first frame and the final review must pass the gate.
- **Quality Contract clause 11, "Beautiful by measure".** Prompt-only deliveries carry the floor too.
- **New sameness tells:** the section template (tracked label, headline with one italic accent word, right-hand paragraph), three equal columns, pasted-on UI, WordArt and clip art, component demo styling, and an accidental dated look.

## 2.0.0 — 2026-09-23

Rebuilt the skill around how the [Claude Opus 5.5 · 100 HTML Files](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/) gallery gets 100 distinct, showcase-grade pages: one dense creative-direction paragraph per page, a fixed quality block, visuals made rather than sourced, and review from screenshots. Workflow-breaking.

- New workflow: Intake → Discovery → **Concepts** → **Creative direction** (approval gate) → **First frame** (render checkpoint) → Build → Screenshot review.
- Discovery is now a narrowing game. The user describes the project in their own words and never names a format. The skill keeps a private hypothesis board of candidate formats (plus a wildcard) and asks whichever plain-language question best splits them. It also collects the business's particulars (place, era, craft, signature thing, customers' words) and its world (the object the site would be, time of day, feeling), and stops as soon as it's confident.
- Added `formats/`: 23 build recipes covering every kind of page in the benchmark gallery (editorial long-read, scroll journey, book/page-flip, interactive story, living scene, ambient experience, single-screen art, instrument, product showcase, signature reveal, heritage brand, collection/cabinet, poster/type-led, themed interface, live bento, command console, living data hero, data reference, explainer/simulation, maker tool, generative studio, playable, everyday tool). Each has architecture, original code sketches, variation levers, pitfalls and user signals. `formats/index.md` maps signals to formats and all 100 gallery pages to their format.
- Added `concept.md`: three divergent concepts per project across a diversity grid (archetype, ground, type voice, hero technique, motion, palette temperature), with a named "house look" trap to avoid.
- Added `creative-direction.md`: the Creative Direction Paragraph template, checklist and worked examples, plus a fixed 10-clause Quality Contract. Also a prompt-only delivery mode that hands over the paragraph as a copyable prompt.
- Added `craft.md` and `techniques.md`: art direction (one idea in four systems, composed heroes with a camera, material, light, texture, palette proportions, type treatments, section devices, motion roles) and original code recipes. The scroll storytelling engine, driven by one continuous variable, lives in `formats/scroll-journey.md`.
- Added `review.md`: a render loop at 1440×900 and 390×844, the first-frame test, a slot-by-slot audit against the paragraph, a sameness check, and failure patterns the benchmark pages still had.
- Rewrote `build-standards.md` around a Showcase mode (one self-contained HTML file, no external requests, system fonts) and a Project mode (existing stacks, web fonts, treated real photography).
- Component catalogs are now optional and limited to ordinary controls, restyled into the site's material. Removed the mandatory every-invocation catalog inventory, catalog lineage for every surface, and the ThreeUI contract.
- Replaced the seven mandatory strategic loops, `CONVERSION-AUDIT.md` and `LAUNCH-PLAN.md` with short strategy essentials for business sites (`strategic-loops.md`, filename kept for updater compatibility).
- Replaced reference measurement (the Liked Trait Ledger, Reference Translation Matrix and Blend Contract) with a lighter rule: record what the user loves in their own words and translate each trait into the concept.
- Removed the style, palette, font-pairing, layout and industry menus (`styles.md`, `color.md`, `typography.md`, `layouts.md`, `industries.md`), the ban list and finishing recipes (`anti-slop.md`, `finishing.md`), and `threeui.md` and `ux-rules.md`. The accessibility floor now lives in `build-standards.md`.
- The updater now also requires `discovery.md`, `concept.md`, `creative-direction.md`, `review.md` and `formats/index.md` in downloaded releases.

## 1.12.0 — 2026-08-25

- Added a Liked Trait Ledger that records every reference trait the user praises in their own words. Compound reactions are split into separate obligations, and no dominant trait may be replaced by an easier nav, color, radius, or token detail.
- Added a Reference Blend Contract that assigns each primary reference explicit roles across silhouette, focal media, typography, density, color, chrome, and motion. Primary references must affect at least three macro dimensions, including silhouette, focal media, or motion; “mood only” now requires explicit user agreement.
- Added a blocking Asset Readiness Gate for P1 photography, product UI, game art, illustration, video, 3D, and large-motion requirements. Generic icons, abstract gradients, empty frames, and fabricated telemetry cannot substitute for dominant reference media.
- Clarified the component contract: live-catalog components remain mandatory where applicable, but they execute the locked reference-led composition instead of importing catalog-demo page layouts. Components preserve meaningful craft while their surrounding geometry and placement adapt to the approved direction.
- Added equal-viewport side-by-side macro checks and a blind gestalt test to the style-sample and delivery gates. Reference fidelity and component coverage are independent hard gates; neither can compensate for failure of the other.
- Strengthened evidence honesty: demo data must be visibly labeled in the rendered surface, and invented values may not use live dots, “today/now,” rolling telemetry, or other real-time language.

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
