# Seven Strategic Website Loops

These seven loops are hard requirements for every full website or redesign engagement. They turn visual design into a sequence of business, conversion, interaction, content, engineering, review, and launch decisions. They were adapted from a prompt framework supplied by the project owner and attributed to Farhan (`@Farhan_Ai3`); the wording here is rewritten as an implementation contract.

**Read this file:** during Phase 1 to gather missing inputs, Phase 3 to write the brief and technical plan, Phase 4 before building the conversion-critical section, and Phase 5 to run the conversion audit and write the launch plan.

## Contents

1. [Execution contract](#execution-contract)
2. [Loop 1 — Creative direction](#loop-1--creative-direction)
3. [Loop 2 — Conversion-critical section](#loop-2--conversion-critical-section)
4. [Loop 3 — Motion system](#loop-3--motion-system)
5. [Loop 4 — Conversion copy](#loop-4--conversion-copy)
6. [Loop 5 — Technical build plan](#loop-5--technical-build-plan)
7. [Loop 6 — Conversion audit](#loop-6--conversion-audit)
8. [Loop 7 — Thirty-day launch plan](#loop-7--thirty-day-launch-plan)
9. [Scope routing](#scope-routing)

## Execution contract

Run each loop as **analyze → decide → record → verify**:

1. **Analyze:** use the opening request, discovery answers, real brand materials, approved references, competitor pages, the codebase, and actual evidence. Separate known facts from inference and defaults.
2. **Decide:** make a concrete recommendation. Do not hide behind a menu of equally weighted options unless the workflow explicitly requires user selection.
3. **Record:** persist the required output in `DESIGN-BRIEF.md`, `CONVERSION-AUDIT.md`, or `LAUNCH-PLAN.md`. If file writes are unavailable, output the artifact in chat.
4. **Verify:** test the implemented site or plan against an observable condition. A completed paragraph is not proof that the loop succeeded.

Hard rules:

- Never fabricate customer language, competitor facts, testimonials, metrics, credentials, traffic, analytics, or test results. Mark missing evidence as a gap and specify how to collect it.
- Do not expand discovery into an interrogation. Harvest existing context first, batch related unknowns into the normal 3–4-question rounds, and make labeled working assumptions when the answer is low-risk.
- Treat tests as hypotheses until real traffic produces results. Name the baseline, event, success metric, minimum observation window or sample condition, and stopping rule.
- Preserve the approved design direction, accessibility, performance, privacy, and truthful evidence. Conversion does not authorize dark patterns.
- For a full site or redesign, all seven loops must be present. A missing required artifact or unresolved FAIL is incomplete work.

## Loop 1 — Creative direction

### Analyze

- Brand truth: what the organization actually is, sells, proves, and refuses to be.
- Target audience: situation, awareness, anxieties, desired identity, and decision criteria.
- Competitors or category leaders the site must outperform, using reachable pages rather than reputation alone.
- The feeling and conclusion the visitor should reach in the first three seconds.
- The complete Liked Trait Ledger from approved references: every visual, media, motion, layout, density, typography, and chrome trait the user praised in their own words.
- Which dominant reference effects depend on photography, product UI, game art, illustration, video, 3D, or large-format motion, and whether representative assets are available.

### Decide and record

Add a **Creative Direction Blueprint** to `DESIGN-BRIEF.md` containing:

- Brand position and perception shift.
- First-three-second experience: intended feeling, immediate conclusion, and visible signals that create both.
- Competitive advantage: what this site will make clearer, more credible, faster, or more distinctive than the named alternatives.
- Visual identity: governing idea, signature element, type character, color temperature, imagery/art direction, shape, depth, and density.
- Reference Blend Contract: the job each primary reference owns across silhouette, focal media, typography, density, color, chrome, and motion. A primary reference must influence at least three macro dimensions and include silhouette, focal media, or motion.
- Asset Readiness Gate: a source/status/resolution for every P1 media or motion dependency. Missing dominant assets cannot be replaced with generic icons, gradients, or fabricated metrics.
- Page architecture and scroll story: what the visitor learns, feels, and can do at each stage.
- Motion character and technology direction.
- Build order, with dependencies and the riskiest proof addressed early.

### Verify

At the style-sample checkpoint, show the page for three seconds, then answer from the render alone: What is this? Who is it for? What should I do? What should it feel like? Next compare equal-viewport screenshots with the approved reference regions and audit every Liked Trait Ledger item plus silhouette, focal media, type hierarchy, density, color distribution, chrome, and motion. Any answer that depends on explanation outside the page—or any result recognizable only by a small nav/color/detail while dominant liked traits are missing—is a failure to fix.

## Loop 2 — Conversion-critical section

The “section that decides everything” is usually the hero, but it may be a pricing selector, booking panel, product configurator, donation ask, or application step. Name it explicitly.

### Analyze

- What the visitor was doing immediately before arrival: search query, referral, ad, social post, sales conversation, product use, or direct navigation.
- The one promise that matters most in that context.
- Real evidence available above the fold: product UI, artifact, result, credential, customer quote, inventory, location, price, or concrete fact.
- The one action the visitor should understand and be able to start within ten seconds.
- Friction introduced by a secondary action; omit it when it only competes with the primary action.

### Decide and record

Add a **Conversion-Critical Section Spec** to the brief containing:

- Entry context, promise, evidence, ten-second action, and success event.
- Chosen headline and subheadline.
- Supporting visual or proof, including real/placeholder status.
- Primary action label and destination/behavior.
- Secondary action only when it serves a distinct lower-commitment need.
- Three honest copy variants worth testing: A (direct/clarity), B (outcome), C (proof or differentiation). Select one baseline and state the hypothesis behind each. Do not ship a rotating hero or call untested variants “winning.”

### Verify

At 375px and 1440px, test whether the promise, evidence, and primary action are visible or immediately reachable without hunting. Run a five-second comprehension check and confirm the primary action produces the named event.

## Loop 3 — Motion system

### Analyze

- Brand personality expressed as motion qualities: restrained, precise, elastic, physical, cinematic, playful, or immediate.
- Moments where motion explains cause/effect, continuity, hierarchy, feedback, or progress.
- Places where motion delays reading, task completion, or low-power mobile rendering.
- Device/runtime constraints and the mobile performance budget.

### Decide and record

Add a **Motion Contract** to the brief containing:

- Motion principles and named role tokens.
- Entry behavior, scroll behavior, hover/focus states, press states, state changes, overlays, and page transitions.
- A meaning map: trigger → purpose → target → duration/easing → reduced-motion behavior.
- Explicit static baseline: content and controls that never move, plus what remains functional if animation, WebGL, or JavaScript is unavailable.
- Mobile budget: permitted runtime/dependencies, leading motion count, compositor-only rules, reduced-motion path, low-power fallback, and performance checks.

Use the role/duration and accessibility requirements in `ux-rules.md`; do not invent a second conflicting motion standard.

### Verify

Test normal motion, `prefers-reduced-motion`, keyboard-only use, touch, no-WebGL/static fallback where applicable, and low-power mobile. Remove any motion whose purpose cannot be stated in one sentence.

## Loop 4 — Conversion copy

### Analyze

- Visitor awareness level on arrival: unaware, problem-aware, solution-aware, product-aware, or ready to act.
- The objection or unanswered question that emerges at each scroll depth.
- Evidence actually available to answer it.
- Exact words customers or clients use for the problem, desired outcome, risk, and decision.

### Decide and record

Add a **Scroll-Depth Copy Map** to the brief:

| Stage/section | Visitor question or objection | Evidence available | Message job | Heading/body | CTA or microcopy |
|---|---|---|---|---|---|
| [entry/hero] | […] | […] | […] | […] | […] |

Write the actual section headings, supporting text, labels, button copy, form instructions, validation/error text, reassurance, and final call to action. Use customer language when verified. When it is not available, label the copy as a draft and add a collection task; do not pretend invented phrases are voice-of-customer research.

### Verify

Read only the headings in sequence: they must form a coherent argument. Then inspect every CTA in context: the nearby copy must answer the next likely objection before asking for commitment.

## Loop 5 — Technical build plan

### Analyze

- Repeated components and shared behaviors.
- Content that changes frequently, who owns it, and where it should live.
- Stack constraints, integration boundaries, live component dependencies, and runtime cost.
- Mobile performance goals and accessibility requirements.
- Analytics events required by the conversion and launch loops.

### Decide and record

Add a **Technical Build Plan** to the brief containing:

- Route/page list and component inventory.
- Folder structure matching the detected stack.
- Token/theme, content/data, state, form, media, animation, and analytics boundaries.
- Direct/adapted/composed live-component lineage and dependency/runtime notes.
- Build order with dependencies: foundation → conversion-critical sample → shared shell/primitives → pages → states/integrations → verification.
- Performance budgets and accessibility acceptance criteria.
- Test/verification plan, including exact widths, themes, keyboard/touch, reduced motion, content edge cases, and conversion-event instrumentation.

### Verify

Before coding, every page, repeated component, content source, integration, and measurement event must have an owner/location. During review, compare the delivered tree and dependencies with the plan and explain intentional deviations.

## Loop 6 — Conversion audit

Run this against the rendered, working site after functional and accessibility checks, not against a wireframe or intent document.

### Analyze

- Path from entry source to primary action and confirmation.
- Friction at each step: uncertainty, delay, competing action, missing context, excess fields, weak feedback, or technical failure.
- Questions left unanswered before each action.
- Trust signals the visitor expects and the truthful signals actually present.

### Decide and record

Write `CONVERSION-AUDIT.md` containing:

- Funnel/path diagram in plain text.
- Prioritized findings with severity, evidence, affected audience/stage, and proposed fix.
- The three changes with greatest expected impact, with rationale rather than invented uplift percentages.
- Ordered experiment backlog: hypothesis, variants, primary metric, guardrail metric, required event, observation condition, and stop rule.
- The metric and instrumented event that would prove each change helped.

Fix clear defects and low-risk friction before delivery. Preserve experiments for questions where the correct answer genuinely requires traffic.

### Verify

Walk the complete path at mobile and desktop widths. Confirm analytics events fire only where consent and project scope allow. Every top-three recommendation must trace to observed friction or missing evidence.

## Loop 7 — Thirty-day launch plan

### Analyze

- Traffic sources the owner controls now: email, direct outreach, social, communities, partners, search, ads, or in-product links.
- Pages and actions that deserve attention first.
- Low-cost feedback channels: support conversations, short interviews, session notes, form drop-off, search terms, sales objections, or a one-question prompt.
- Metrics that remain useful at low volume: qualified actions, completion rate, error rate, message replies, repeated objections, and time-to-first-value.

### Decide and record

Write `LAUNCH-PLAN.md` containing:

- Pre-launch and launch-day checklist, including analytics/consent, forms, redirects, metadata/unfurls, error monitoring, accessibility, performance, backups/rollback, and ownership.
- A weekly review schedule for days 1–7, week 2, week 3, and week 4.
- Three prioritized experiments, each tied to a real traffic source or observed friction.
- Metric definitions, event names, current baseline when known, and data-quality checks.
- Feedback collection method and owner.
- A stop/change rule: minimum observation window or sample condition, guardrail breach, and the point at which to keep, revise, stop, or roll back an experiment.

Do not overreact to tiny samples. Early qualitative patterns can justify investigation; they do not prove a conversion lift.

### Verify

Every checklist item has an owner and status. Every experiment has one primary metric, at least one guardrail, and a stopping rule. The plan must still be usable if traffic is low.

## Scope routing

- **Full site or redesign:** run all seven loops. Loops 1–5 live in `DESIGN-BRIEF.md`; Loop 6 produces `CONVERSION-AUDIT.md`; Loop 7 produces `LAUNCH-PLAN.md`.
- **Approved-brief continuation:** verify Loops 1–5 exist. Run the affected loops for the requested work, then refresh Loops 6–7 if the change affects the conversion path, measurement, or launch plan.
- **Small visual/component change:** treat approved loop outputs as read-only constraints unless the request changes them. Execute only the affected loop decisions plus the relevant Loop 6 path audit. Example: a CTA hover/press change with copy and layout frozen runs the Motion Contract slice (Loop 3), the implementation/verification slice of Loop 5, and the affected-path audit in Loop 6; it does not rewrite creative direction, copy, or the launch plan. Name the affected loops before work so scope cannot expand silently.
- **Audit-only request:** run Loop 6. Add Loop 7 when the user requests launch planning or the site is about to go live.
- **Non-conversion site:** define the primary success action appropriately (read, understand, find, apply, donate, contact, complete a task). The loops still apply; “conversion” does not mean forcing a sale.
