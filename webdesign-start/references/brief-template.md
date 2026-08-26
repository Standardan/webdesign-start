# The Design Brief — Template & Usage

This file defines `DESIGN-BRIEF.md`, the single source of truth produced in Phase 3 and consumed by every later phase (and by future sessions in any AI tool). A good brief means a session that starts six weeks from now — in a different assistant — can extend the site without re-interviewing the user.

**When to read this file:** entering Phase 3, after the Liked Trait Ledger, Reference Translation Matrix, and Reference Blend Contract are confirmed.

## Usage rules

1. **Location:** write to `DESIGN-BRIEF.md` at the project root. If you cannot write files, output the full brief in chat, fenced, and ask the user to save it at the project root under that exact name.
2. **Fill every section.** An empty section means an undecided decision that will be improvised inconsistently at build time. If something is genuinely open, write it in **Open questions** rather than leaving silence.
3. **Traceability without cherry-picking.** Every choice should trace to a discovery answer, an approved reference, or an industry-playbook rule. Preserve every item in the Liked Trait Ledger, then use the Reference Blend Contract to control the macro composition. Approved references govern how selected catalog components are placed and adapted; no catalog demo chooses the page silhouette by default.
4. **Present as a digest, not the file.** After writing, show the user: direction paragraph, palette as a labeled list, the two fonts, the page list, and anything you flagged. Ask for approval. Do not paste the whole brief into chat unless asked.
5. **The brief is law during build** — but living law. When the user requests changes mid-build, update the brief first, then the code, so the two never diverge.
6. **Page-level overrides.** If one page needs different rules (e.g., a dark landing page for a launch inside a light site), add a subsection under **Page map** rather than forking the token set.
7. **Live components.** Read `component-sourcing.md` and `threeui.md`, rebuild the Complete Resource Inventory with exact counts and all identifiers, and complete the Component Opportunity Map before approval. Give every catalog equal consideration and never fill the map from memory or a stale snapshot.
8. **Seven loops.** Read `strategic-loops.md`. A full site/redesign brief is incomplete without the Creative Direction Blueprint, Conversion-Critical Section Spec, Motion Contract, Scroll-Depth Copy Map, and Technical Build Plan. Missing evidence must be labeled; never fill the template with invented proof, customer language, metrics, or test outcomes.
9. **Asset readiness.** A brief cannot be approved while a P1 media or motion obligation has no representative asset path. Resolve the Asset Readiness Gate below through real assets, generated/licensed assets, a faithful product mock/artifact, or an explicit user-approved change of direction.

## Template

````markdown
# Design Brief — [Project name]
_Last updated: [date] · Status: [draft | approved | in-build | shipped]_
_Produced by the webdesign-start discovery process. Read fully before any visual work._

## 1. Project snapshot
- **What:** [product type + one-liner]
- **Audience:** [who arrives, what they know, what they fear]
- **Arrival context:** [where they were immediately before this page; known vs assumed]
- **#1 visitor action:** [the conversion this site optimizes for]
- **Positioning:** [premium/mid/budget · established/challenger · local/global]
- **Brand truth:** [what is actually sold/proved + what the brand refuses to be]
- **Competitors/category leaders:** [names/URLs + what “outperform” means]
- **First three seconds:** [visitor should feel X, conclude Y, and see signals Z]

## 2. Reference fidelity contract (user-approved)

### Liked Trait Ledger

| ID | Reference | User's exact liked trait | Importance | Observed location/evidence | Required target | Status |
|---|---|---|---|---|---|---|
| LT-01 | [URL/site] | [quote or faithful near-verbatim] | primary/supporting | [hero/media/motion/nav/etc.] | [section/component/system] | mapped / needs evidence / user-approved omission |

**Ledger rule:** Every positive trait the user named appears here. Compound statements are split into separate rows. No row disappears because another trait from the same site is easier to implement.

### Reference Translation Matrix

| Priority | Source + observed evidence | User's signal | Original translation for this project | Target in our site | Fidelity check |
|---|---|---|---|---|---|
| P1 | [URL + exact observed trait/location] | [what the user said they liked] | [how we preserve the trait without copying] | [token/component/section/page] | [observable pass condition] |
| P2 | […] | […] | […] | […] | […] |
| Avoid | [URL + rejected trait] | [what the user disliked] | [what replaces it] | [affected areas] | [observable absence/presence] |

**Coverage rule:** Every ledger item maps to a matrix row or a user-approved omission. Every primary visual reference shapes at least three macro dimensions and includes at least one of silhouette, focal media, or motion/scroll choreography. “Mood only” requires explicit user agreement and cannot conceal an unimplemented liked trait. Every above-fold P1 row appears in the style sample.

### Reference Blend Contract

| Reference | Role in the blend | Macro dimensions owned | Dominant traits that must be recognizable | Deliberate exclusions |
|---|---|---|---|---|
| [site] | [hero art direction / page rhythm / density / motion / etc.] | [silhouette/media/type/density/color/chrome/motion] | [LT IDs] | [brand-specific assets/copy/layout details not borrowed] |

**Combined three-second read:** [“The site should feel like A's media-led confidence plus B's product density and C's motion restraint, expressed through our own content.”]

**Macro assignment check:** silhouette […] · first focal point […] · media ratio/crop […] · type hierarchy […] · density rhythm […] · color distribution […] · chrome […] · motion […]. No blank dimension may fall back to a generic layout formula.

**Reference Teardowns:** paste the measured teardown block for each approved reference here (format in `references/research.md`, Step 6). These are the values Phase 4 derives its tokens and type spec from; a matrix without teardowns forces the build back onto model defaults, which is the failure this brief exists to prevent.

**Never-list (from user + industry anti-patterns):**
- [e.g., no stock-photo corporate feel; no carousel hero; no red as primary (medical)]
- The anti-slop defaults (references/anti-slop.md) are always on this list implicitly; add any that this project is especially at risk of.

## 3. Style direction
### Creative Direction Blueprint

**Governing idea:** [ONE sentence every section must serve — e.g., "the shop at night:
noir ground, photos carry the light." Memorable sites are authored by a single idea;
if a section doesn't express it, the section is wrong or the idea is.]
**Signature element:** [the one distinctive, ownable move this site ships with —
a motif, a hover behavior, a type treatment. Exactly one; named so the build can't skip it.]
**Dominant style:** [name from styles.md] — [one-sentence essence]
**Accent influence (max one):** [name or "none"]
**In practice:** [3-5 bullets of what this means concretely for THIS site]
**Competitive advantage:** [what this site makes clearer/more credible/faster/more distinctive]
**Visual identity:** [type character · color temperature · imagery/art direction · shape · depth · density]
**Page architecture:** [pages and their strategic jobs]
**Scroll story:** [stage-by-stage: what the visitor learns, feels, and can do]
**Technology direction:** [stack/runtime direction + why it serves the experience]
**Build order:** [foundation → riskiest proof/conversion sample → shared system → pages → integration/review]

### Asset Readiness Gate

| P1 obligation / LT ID | Required asset or runtime | Current source/status | Representative enough for style sample? | Resolution/owner |
|---|---|---|---|---|
| [full-bleed hero imagery] | [photo/video/product UI/3D/etc.] | [real/generated/licensed/missing] | PASS / FAIL | [path, generation task, user request, or approved direction change] |

**Gate rule:** All P1 rows that depend on photography, illustration, product UI, game art, video, 3D, or large motion must PASS before Phase 4's style sample. Generic icons, abstract gradients, empty frames, and fabricated “live” metrics do not count. Placeholder/demo data must be visibly labeled in the rendered surface.

## 4. Color system
Mode: [light-only | dark-only | light + dark toggle]

| Token | Light | Dark | Notes |
|---|---|---|---|
| --background | #… | #… | |
| --surface | #… | #… | cards, raised panels |
| --text-primary | #… | #… | ≥4.5:1 on background |
| --text-muted | #… | #… | ≥4.5:1 body / 3:1 large |
| --border | #… | #… | |
| --primary | #… | #… | brand / CTA |
| --primary-hover | #… | #… | |
| --accent | #… | #… | sparing use only |
| --success / --warning / --danger | #… | #… | |
| --focus-ring | #… | #… | visible on both modes |

**Gradients (if any):** [stops + where allowed]
**Distribution:** [e.g., 60% background neutrals / 30% surface+text / 10% primary+accent]
**Neutral temperature:** [the hue and saturation band the neutrals are tinted with, per
finishing.md Recipe 1 — e.g., "all neutrals carry H 30 (warm brown) at S 6–18%; no S=0 values"]
**Accent discipline (the sentence, per finishing.md Recipe 3):** ["The accent appears as
[form] on [named elements], at most [N] solid-fill instance(s) per viewport, and never as
[named exclusions]." This sentence is a rule-row for the fidelity audit.]

## 5. Typography
- **Display:** [font], weights [x, y] — [source: Google Fonts / self-host note]
- **Display conviction (per finishing.md Recipe 2):** [hero size target + committed weight +
  letter-spacing at display sizes + hero line-height — actual values, not "large and bold"]
- **Body:** [font], weights [x, y]
- **Third voice (labels/stats/eyebrows):** [the one treatment used site-wide — a mono face,
  or body face at 11–13px caps with widened tracking; name the font and values]
- **Scale:** [ratio + the actual px/rem ladder, incl. clamp() for hero/h1/h2]
- **Rules:** [line-heights, letter-spacing notes, max measure]

## 6. Space, shape & depth
- **Spacing scale:** [4/8-based ladder] · **Section padding:** [desktop / mobile]
- **Container:** [max-width + gutters]
- **Radius:** [none / sm / md / pill — the actual px values]
- **Depth:** [flat / subtle shadow recipe / glass recipe — the actual CSS values]
- **Borders:** [weight + when]

## 7. Motion
### Motion Contract

- **Appetite:** [none / subtle / rich]
- **Personality:** [precise / restrained / elastic / physical / cinematic / playful / immediate]
- **Principles:** [what motion communicates for this brand]
- **Vocabulary:** [e.g., 16px fade-up reveals on scroll, 150ms hover transitions,
  stagger 60ms, easing cubic-bezier(0.22, 1, 0.36, 1)]
- **Meaning map:** [trigger → purpose → target → role token/duration/easing → reduced-motion behavior]
- **Entry / scroll / hover-focus / press / state / overlay / page transition:** [rule for each]
- **Never moves:** [content/controls/static baseline + no-JS/no-WebGL behavior]
- **Mobile performance budget:** [runtime/dependency ceiling, leading-motion count, compositor rule, low-power fallback, checks]
- **Always:** respect prefers-reduced-motion; transform/opacity only unless a measured component-specific exception is documented.

## 8. Components inventory
[Only components this site needs. For each: one line of treatment.]
- Buttons: [primary/secondary/ghost treatments]
- Nav: [pattern, sticky behavior, mobile pattern]
- Cards: […] · Forms: […] · Footer: […] · [etc.]

**Reference obligations by component:**
- [Component]: [matrix row/source → exact trait to preserve]

### Complete Resource Inventory snapshot
_Refreshed: [timestamp] · Full searchable manifest: [.webdesign-start/component-inventory.json or in-memory fallback]_

| Source | Exact current counts | Provenance/version | Freshness/failure note |
|---|---|---|---|
| beUI | [unique registry items + category subtotals] | [SHA/source] | [current/stale + reason] |
| ThreeUI Community | [parents/routes/singletons/variants] | [SHA/package] | [current/stale + reason] |
| Uiverse | [elements + category subtotals] | [SHA/source] | [current/stale + truncation check] |
| MDC-web | [all packages + user-facing subtotal] | [SHA/source] | [current/stale + reason] |
| design resources | [categories + links] | [SHA/source] | [current/stale + reason] |
| taste-skill | [guidance capabilities; no invented component count] | [SHA/source] | [current/stale + reason] |

### Component Opportunity Map (equal-weight live comparison)

| Surface/job | Locked macro constraints | Best candidate from each catalog | Selected lineage | Mode | Target | Reference fit and adaptation | Constraints/fallback |
|---|---|---|---|---|---|---|---|
| [job] | [blend roles + LT IDs governing silhouette/media/density/motion] | [beUI item/none · ThreeUI item/none · Uiverse item/none · MDC item/none] | [exact slug/Community ID/import/path/package] | [direct/adapted/composed] | [component/section/page] | [why it best fits and what craft carries through without changing macro direction] | [stack/a11y/performance/license/fallback] |

**Selection rule:** Every catalog receives equal consideration for every designed surface. Recheck all finalists and the winning live item before implementation, then automatically use the strongest contextual fit through direct integration, faithful adaptation, or composition. Plain UI or an unqualified custom component with no observable catalog lineage is prohibited. Components execute the locked Reference Blend Contract; they do not replace its silhouette, focal media, density, or scroll story with a catalog-demo layout. Never overwrite local customizations, introduce an incompatible stack silently, or sacrifice accessibility, performance, or license safety to force a package.

**ThreeUI provenance (when selected):** [Community ID + variant · `importName` · package version or source commit · runtime/dependencies · fallback/reduced-motion plan · asset/license notes]

## 9. Conversion system

### Conversion-Critical Section Spec

- **Named section:** [hero/pricing/booking/configurator/etc.]
- **Entry context:** [what the visitor was doing immediately before arrival]
- **One promise:** [the only promise that must land first]
- **Above-fold evidence:** [real proof/artifact/fact + real/placeholder status]
- **Ten-second action:** [action + destination/behavior + instrumented success event]
- **Supporting visual:** [real product/artifact/photo/demo + why it proves the promise]
- **Primary action:** [specific label + destination/behavior]
- **Secondary action:** [distinct lower-commitment need, or omitted with reason]

**Copy variants worth testing (hypotheses, not results):**

| Variant | Angle | Headline | Subheadline | Hypothesis | Primary metric / guardrail |
|---|---|---|---|---|---|
| A | Direct/clarity | […] | […] | […] | […] |
| B | Outcome | […] | […] | […] | […] |
| C | Proof/differentiation | […] | […] | […] | […] |

**Selected baseline:** [A/B/C + evidence-based reason]

### Scroll-Depth Copy Map

| Stage/section | Visitor question or objection | Evidence available | Message job | Actual heading/body | CTA/form/error/reassurance microcopy |
|---|---|---|---|---|---|
| [entry/hero] | […] | […] | […] | […] | […] |
| [next stage] | […] | […] | […] | […] | […] |
| [final CTA] | […] | […] | […] | […] | […] |

**Awareness level:** [unaware/problem-aware/solution-aware/product-aware/ready]
**Verified customer language:** [phrases + source, or missing-research task]

## 10. Page map
[One block per page, in build order.]

### [Page name] — `/route`
Purpose: […] · Formula: [from layouts.md, e.g., "SaaS landing 10-section"]
Sections: [ordered list, one line each with content status (real/placeholder)]
[For each section that carries a reference obligation, append: `Reference: [matrix row/source + trait]`.]
[Optional: **Overrides:** any page-specific deviations from global tokens]

## 11. Content status
- Copy: [real / AI-drafted placeholder (sounds real, flagged) / mixed — per page]
- Imagery: [available / placeholder strategy from build-standards.md]
- P1 asset gate: [all PASS / unresolved rows and owner]
- Logo: [exists / text-wordmark placeholder]

## 12. Build settings
- **Stack:** [detected or chosen + why] · **Styling:** [vanilla CSS custom props / Tailwind / …]
- **In scope:** [dark mode? blog? forms→where do submissions go? analytics?]
- **Out of scope (explicitly):** […]

## 13. Technical Build Plan

- **Routes/pages:** [route list + purpose]
- **Repeated components:** [component → responsibility → variants/states]
- **Folder structure:** [tree matching the detected stack]
- **Content/data ownership:** [what changes often · owner · code/data/CMS/external source]
- **System boundaries:** [tokens/theme · content/data · state · forms · media · animation · analytics]
- **Live-component dependencies:** [direct/adapted/composed lineage + runtime/dependency notes]
- **Build order/dependencies:** [ordered tasks; foundation and critical sample first]
- **Performance budgets:** [LCP/INP/CLS + JS/GPU/media/font constraints]
- **Accessibility acceptance:** [keyboard/touch/zoom/reduced motion/semantics/form/fallback requirements]
- **Measurement plan:** [events for primary action, funnel steps, errors, experiment exposure, consent boundary]
- **Verification plan:** [widths/themes/devices/states/content edges/tests]

## 14. Launch and measurement assumptions

- **Controlled traffic sources:** [email/outreach/social/community/partners/search/ads/in-product]
- **Priority pages/actions:** [first attention after launch]
- **Low-cost feedback:** [method + owner]
- **Low-volume useful metrics:** [qualified actions/completion/errors/replies/objection patterns/time-to-value]
- **Known baseline:** [value/source/date, or unknown]
- **Experiment constraints:** [minimum observation window/sample condition + guardrails]

## 15. Open questions
- [Anything unresolved, with the current working assumption]
````

## Digest format (what the user actually sees)

After writing the file, present approval like this — short enough to read in 30 seconds:

```markdown
The design brief is written. The short version:

**Direction + first 3 seconds:** [2-3 sentences weaving style + references: "A quiet, editorial site in the
spirit of [Site A]'s spacing and [Site B]'s warmth — cream background, ink text, one
persimmon accent, serif headlines, soft-rounded buttons, subtle scroll reveals. Visitors should feel X and immediately conclude Y."]

**Critical section:** [one promise] · **Evidence:** [proof] · **Action:** [primary CTA/event]
**Baseline copy:** [selected A/B/C headline; note that all three hypotheses are recorded in the brief]

**Palette:** [name each core color plainly: "cream #FAF7F2 background · ink #1A1815 text ·
persimmon #E8552F for buttons/links"]
**Type:** [Display] for headlines, [Body] for text
**Pages:** [list] · **Motion + mobile budget:** [one line] · **Mode:** [light/dark]
**Build order:** [one compact line]
**Live collection:** [exact per-source counts/freshness in one compact line] · **Selected components:** [1-3 high-impact direct/adapted/composed implementations the user should notice]
**Reference carry-through:** [confirm every liked trait is owned; summarize each primary reference's macro role and the 3-5 most visible mappings]
**Asset gate:** [all P1 assets PASS, or the unresolved dependency blocking build]
**Flagged:** [anything defaulted or in tension, e.g., "you said X but the industry norm is Y — I went with…"]

Approve to start the build, or tell me what to adjust. (Full details: DESIGN-BRIEF.md)
```

Approval must be explicit before Phase 4. "Looks good," "approve," "go" all count; silence or a topic change does not — ask once more, plainly.
