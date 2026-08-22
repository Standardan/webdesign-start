# The Design Brief — Template & Usage

This file defines `DESIGN-BRIEF.md`, the single source of truth produced in Phase 3 and consumed by every later phase (and by future sessions in any AI tool). A good brief means a session that starts six weeks from now — in a different assistant — can extend the site without re-interviewing the user.

**When to read this file:** entering Phase 3, after the Reference Translation Matrix is confirmed.

## Usage rules

1. **Location:** write to `DESIGN-BRIEF.md` at the project root. If you cannot write files, output the full brief in chat, fenced, and ask the user to save it at the project root under that exact name.
2. **Fill every section.** An empty section means an undecided decision that will be improvised inconsistently at build time. If something is genuinely open, write it in **Open questions** rather than leaving silence.
3. **Traceability.** Every choice should trace to a discovery answer, an approved reference, or an industry-playbook rule — the *Why* column/notes exist so future sessions (and the user) can distinguish "decided for a reason" from "arbitrary, feel free to change." Approved references govern how selected catalog components are adapted; no catalog's demo aesthetic becomes a default.
4. **Present as a digest, not the file.** After writing, show the user: direction paragraph, palette as a labeled list, the two fonts, the page list, and anything you flagged. Ask for approval. Do not paste the whole brief into chat unless asked.
5. **The brief is law during build** — but living law. When the user requests changes mid-build, update the brief first, then the code, so the two never diverge.
6. **Page-level overrides.** If one page needs different rules (e.g., a dark landing page for a launch inside a light site), add a subsection under **Page map** rather than forking the token set.
7. **Live components.** Read `component-sourcing.md` and `threeui.md`, rebuild the Complete Resource Inventory with exact counts and all identifiers, and complete the Component Opportunity Map before approval. Give every catalog equal consideration and never fill the map from memory or a stale snapshot.

## Template

````markdown
# Design Brief — [Project name]
_Last updated: [date] · Status: [draft | approved | in-build | shipped]_
_Produced by the webdesign-start discovery process. Read fully before any visual work._

## 1. Project snapshot
- **What:** [product type + one-liner]
- **Audience:** [who arrives, what they know, what they fear]
- **#1 visitor action:** [the conversion this site optimizes for]
- **Positioning:** [premium/mid/budget · established/challenger · local/global]

## 2. Reference Translation Matrix (user-approved)
| Priority | Source + observed evidence | User's signal | Original translation for this project | Target in our site | Fidelity check |
|---|---|---|---|---|---|
| P1 | [URL + exact observed trait/location] | [what the user said they liked] | [how we preserve the trait without copying] | [token/component/section/page] | [observable pass condition] |
| P2 | […] | […] | […] | […] | […] |
| Avoid | [URL + rejected trait] | [what the user disliked] | [what replaces it] | [affected areas] | [observable absence/presence] |

**Coverage rule:** Every approved reference contributes at least one implementation row or is explicitly labeled **mood only** with a reason. P1 rows must appear in the style sample.

**Reference Teardowns:** paste the measured teardown block for each approved reference here (format in `references/research.md`, Step 6). These are the values Phase 4 derives its tokens and type spec from; a matrix without teardowns forces the build back onto model defaults, which is the failure this brief exists to prevent.

**Never-list (from user + industry anti-patterns):**
- [e.g., no stock-photo corporate feel; no carousel hero; no red as primary (medical)]
- The anti-slop defaults (references/anti-slop.md) are always on this list implicitly; add any that this project is especially at risk of.

## 3. Style direction
**Governing idea:** [ONE sentence every section must serve — e.g., "the shop at night:
noir ground, photos carry the light." Memorable sites are authored by a single idea;
if a section doesn't express it, the section is wrong or the idea is.]
**Signature element:** [the one distinctive, ownable move this site ships with —
a motif, a hover behavior, a type treatment. Exactly one; named so the build can't skip it.]
**Dominant style:** [name from styles.md] — [one-sentence essence]
**Accent influence (max one):** [name or "none"]
**In practice:** [3-5 bullets of what this means concretely for THIS site]

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
- **Appetite:** [none / subtle / rich]
- **Vocabulary:** [e.g., 16px fade-up reveals on scroll, 150ms hover transitions,
  stagger 60ms, easing cubic-bezier(0.22, 1, 0.36, 1)]
- **Always:** respect prefers-reduced-motion; transform/opacity only.

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

| Surface/job | Best candidate from each catalog | Selected lineage | Mode | Target | Reference fit and adaptation | Constraints/fallback |
|---|---|---|---|---|---|---|
| [job] | [beUI item/none · ThreeUI item/none · Uiverse item/none · MDC item/none] | [exact slug/Community ID/import/path/package] | [direct/adapted/composed] | [component/section/page] | [why it best fits this website and what visibly carries through] | [stack/a11y/performance/license/fallback] |

**Selection rule:** Every catalog receives equal consideration for every designed surface. Recheck all finalists and the winning live item before implementation, then automatically use the strongest contextual fit through direct integration, faithful adaptation, or composition. Plain UI or an unqualified custom component with no observable catalog lineage is prohibited. Never overwrite local customizations, introduce an incompatible stack silently, or sacrifice accessibility, performance, or license safety to force a package.

**ThreeUI provenance (when selected):** [Community ID + variant · `importName` · package version or source commit · runtime/dependencies · fallback/reduced-motion plan · asset/license notes]

## 9. Page map
[One block per page, in build order.]

### [Page name] — `/route`
Purpose: […] · Formula: [from layouts.md, e.g., "SaaS landing 10-section"]
Sections: [ordered list, one line each with content status (real/placeholder)]
[For each section that carries a reference obligation, append: `Reference: [matrix row/source + trait]`.]
[Optional: **Overrides:** any page-specific deviations from global tokens]

## 10. Content status
- Copy: [real / AI-drafted placeholder (sounds real, flagged) / mixed — per page]
- Imagery: [available / placeholder strategy from build-standards.md]
- Logo: [exists / text-wordmark placeholder]

## 11. Build settings
- **Stack:** [detected or chosen + why] · **Styling:** [vanilla CSS custom props / Tailwind / …]
- **In scope:** [dark mode? blog? forms→where do submissions go? analytics?]
- **Out of scope (explicitly):** […]

## 12. Open questions
- [Anything unresolved, with the current working assumption]
````

## Digest format (what the user actually sees)

After writing the file, present approval like this — short enough to read in 30 seconds:

```markdown
The design brief is written. The short version:

**Direction:** [2-3 sentences weaving style + references: "A quiet, editorial site in the
spirit of [Site A]'s spacing and [Site B]'s warmth — cream background, ink text, one
persimmon accent, serif headlines, soft-rounded buttons, subtle scroll reveals."]

**Palette:** [name each core color plainly: "cream #FAF7F2 background · ink #1A1815 text ·
persimmon #E8552F for buttons/links"]
**Type:** [Display] for headlines, [Body] for text
**Pages:** [list] · **Motion:** [one line] · **Mode:** [light/dark]
**Live collection:** [exact per-source counts/freshness in one compact line] · **Selected components:** [1-3 high-impact direct/adapted/composed implementations the user should notice]
**Reference carry-through:** [3-5 P1/P2 mappings in plain language: "Site A's editorial hero → home hero; Site B's restrained color use → global tokens"]
**Flagged:** [anything defaulted or in tension, e.g., "you said X but the industry norm is Y — I went with…"]

Approve to start the build, or tell me what to adjust. (Full details: DESIGN-BRIEF.md)
```

Approval must be explicit before Phase 4. "Looks good," "approve," "go" all count; silence or a topic change does not — ask once more, plainly.
