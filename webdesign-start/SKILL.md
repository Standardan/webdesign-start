---
name: webdesign-start
description: Guided web design workflow that turns a vague idea into a polished website through discovery questions, real-website research, and a persistent design brief. Use this skill whenever the user wants to design or build a website, landing page, portfolio, web app UI, or online store — or wants to redesign/restyle an existing one — even if they only say things like "make me a site", "I need a landing page", "make this look better", "I don't know how I want it to look", or name a business that needs a web presence. Also use it when the user types /webdesign-start. Do NOT use for backend-only work, APIs, or non-visual tasks.
---

# Web Design Discovery & Build

You are running a guided web-design engagement. The user's biggest problem is almost never technical — it is that **they cannot articulate how they want their website to look**. Your job is to extract their taste through structured questions and *real example websites*, lock the direction into a written design brief, and only then build. A site built after this process should feel like it was "one-shotted" — right the first time — because the ambiguity was removed before any code was written.

Never skip ahead to code. The phases below exist because every skipped phase resurfaces later as "this isn't what I wanted."

## Operating principles

1. **The user is not a designer.** Never ask "do you want glassmorphism or neo-brutalism?" — ask in plain language, offer concrete options with vivid descriptions, and anchor to famous websites they may know. Translate their answers into design vocabulary yourself.
2. **Examples beat adjectives.** "Clean and modern" means fifty different things. A URL the user says "yes, like THAT" to means exactly one thing. The research phase is therefore mandatory, not decorative.
3. **One decision-maker: the brief.** Every visual decision made during build must trace to `DESIGN-BRIEF.md`. If the brief doesn't answer a question, either the answer is obvious from the approved references, or you ask.
4. **Progress is visible.** Tell the user which phase you're in and what's left. This is a multi-step engagement; don't let it feel like an interrogation without a destination.
5. **Respect answered questions.** If the user already told you something (in their first message, in an existing brief, in the repo), never ask again. Every phase starts by harvesting what is already known.

## Environment adaptation (read once, then proceed)

This skill runs in many AI tools. Adapt to what you have:

| Capability | If you have it | If you don't |
|---|---|---|
| Web search | Use it in Phase 2 to find live example sites | Use the curated anchor library in `references/research.md` — well-known sites you can cite from knowledge; tell the user results are from a curated list, not a live search |
| Structured question UI (option pickers) | Use it for discovery batches | Present options as lettered lists (A/B/C/D) in plain text; the user replies with letters or free text |
| File write access | Persist `DESIGN-BRIEF.md` to the project root | Output the full brief in chat and ask the user to save it |
| An existing repo/codebase | Detect stack + existing brand assets before asking about them | Assume greenfield; default stack per `references/build-standards.md` |

## The workflow

```
Phase 0: Intake        — harvest what's already known, frame the engagement
Phase 1: Discovery     — adaptive question batches           → Discovery Summary
Phase 2: Research      — find real websites, verify w/ user  → Reference DNA
Phase 3: Brief         — synthesize everything               → DESIGN-BRIEF.md
   [GATE: user approves brief]
Phase 4: Build         — implement against the brief
Phase 5: Review        — self-audit vs brief + checklist, report honestly
```

Announce phase transitions briefly ("Discovery is done — moving to research. I'll come back with real sites to react to.").

---

## Phase 0 — Intake

Before asking anything:

1. **Harvest the opening message.** Product type, industry, audience, style hints, stack, existing brand — mark each as known/unknown.
2. **Check for prior state.** If `DESIGN-BRIEF.md` exists in the project, read it and ask whether this is a continuation (build/extend against it) or a fresh direction (archive it, restart discovery). If a codebase exists, note the stack and any existing design tokens/CSS.
3. **Frame the engagement in 2-3 sentences.** Tell the user what's about to happen: a few short rounds of questions, then you'll bring them real websites to react to, then a written plan, then the build. Users cooperate with questionnaires when they know why and how long.

If the user says some version of "just build it, surprise me": still run Phase 1 Round 1 (the four fundamentals — you cannot build for an unknown audience), compress Rounds 2-3 into one batch of the three highest-leverage taste questions, and do a single lightweight research round. Never skip research entirely; one round of "which of these three directions?" costs a minute and prevents a full rebuild.

## Phase 1 — Discovery

Read `references/discovery.md` **now** — it contains the full question flows, branch logic, and the vague-answer decoder. Rules that must survive even if you read nothing else:

- Ask in **batches of 3-4 questions max**, multiple-choice with an "or describe it your way" escape hatch. One batch per message. Typically 3 rounds; never more than 4.
- **Round 1** is always the fundamentals: what is being built, for whom, the single most important visitor action, and what brand assets already exist.
- **Round 2** extracts taste through contrast pairs and famous-site anchors, not jargon.
- **Round 3** branches by product type (SaaS questions differ from restaurant questions).
- **Decode vagueness.** "Modern and clean," "professional," "with some pop" are the most common answers and mean nothing yet — the decoder table in `references/discovery.md` tells you the follow-up that disambiguates each.
- After the final round, **mirror back a Discovery Summary** (the template is in `references/discovery.md`) and get a "yes, that's me" before moving on. Read `references/industries.md` for the matching product-type playbook at this point — it adds category must-haves and anti-patterns the user won't think to mention. If a user preference conflicts with an industry norm (brutalism for a medical clinic), surface the tension with a recommendation; never silently override either side.

## Phase 2 — Research (the phase that makes this skill work)

Read `references/research.md` **now**. This phase turns the Discovery Summary into 2-3 user-approved real websites — the "Reference DNA" that anchors every later decision.

The shape of it:

1. **Search** for live sites matching the discovery profile (query recipes and curated gallery sources are in the reference file). Aim for candidates that are *actually reachable and reasonably current*.
2. **Present 4-6 candidates** as links with rich descriptions — for each: what the site is, *why it matches specific discovery answers* ("you said calm + premium; notice how much whitespace they leave around the product"), what you'd borrow, and what you'd do differently for this project. Do not present screenshots or attempt to browse — the user opens the links themselves.
3. **Collect reactions** per site: love / close-but / no, and *what specifically* drew or repelled them. The "what specifically" is the gold — a "no" with a reason is worth more than an unexplained "love."
4. **Iterate if needed.** Fewer than two strong positives → run one refined round using the reaction reasons as new search constraints. Cap at three rounds; if taste still won't converge, fall back to presenting 2-3 named *directions* built from the strongest partial signals and let the user pick.
5. **Synthesize Reference DNA**: "Layout generosity and nav from site A; color temperature and button personality from site B; avoid the density of site C." Confirm it with the user in one message.

Guardrail: references are for *direction* — structure, mood, spacing philosophy, color temperature. Never copy a reference's layout wholesale, its copy, logos, images, or distinctive brand elements. The user should get a site that belongs in the same room as their references, not a clone.

## Phase 3 — The Design Brief

Synthesize Discovery Summary + Reference DNA + industry playbook into `DESIGN-BRIEF.md` at the project root, using the template in `references/brief-template.md`. To fill it well, consult:

- `references/styles.md` — pick the dominant style (and at most one accent influence) that matches the Reference DNA; the entry gives you the visual recipe.
- `references/color.md` — build the full token set (light *and* dark if in scope) from the closest industry palette, adjusted toward the approved references.
- `references/typography.md` — pick a pairing whose personality matches; include weights and fallbacks.
- `references/layouts.md` — choose the page/section formulas for every page in scope.

Then present the brief to the user as a **short digest** (direction in one paragraph, palette swatch list, fonts, page list — not the whole file) and ask for approval or edits. **This is the gate.** Do not write site code before an explicit yes. Small edit requests → update the brief, restate only the changed part, proceed.

## Phase 4 — Build

Read `references/build-standards.md` and `references/ux-rules.md` before writing code. Non-negotiables:

- Express every brief token as CSS custom properties (or the detected styling system's theme). Components consume tokens, never raw hex/px.
- Build mobile-first; verify the widths in the build-standards protocol.
- The UX rulebook's Priority 1-2 tiers (accessibility, touch/interaction) are never traded away for aesthetics.
- Real content where the user provided it; honest, well-shaped placeholders where they didn't (flag every placeholder in the final report).
- Work page by page in brief order; after the first page, pause and show it — the first page catches token-level misreads cheaply before they multiply across the site.

## Phase 5 — Self-review

Follow the self-review protocol at the end of `references/build-standards.md`: re-read `DESIGN-BRIEF.md`, audit the built pages against it section by section, then walk the pre-delivery checklist. Fix what you find. Then report to the user:

- What was built (pages, components).
- Checklist results — **honestly**, including anything that failed or was skipped and why.
- Every placeholder awaiting real content.
- Suggested next steps (real copy, imagery, deployment) — as offers, not questions blocking completion.

## Reference file index

| File | Read when |
|---|---|
| `references/discovery.md` | Entering Phase 1 |
| `references/research.md` | Entering Phase 2 |
| `references/industries.md` | After discovery identifies the product type |
| `references/styles.md` | Phase 3, choosing the style direction |
| `references/color.md` | Phase 3, building tokens |
| `references/typography.md` | Phase 3, choosing type |
| `references/layouts.md` | Phase 3 (page map) and Phase 4 (building sections) |
| `references/brief-template.md` | Phase 3, writing the brief |
| `references/ux-rules.md` | Before and during Phase 4 |
| `references/build-standards.md` | Phase 4 and Phase 5 |

If a reference file is missing or unreadable, say so and proceed with best judgment rather than stalling — the workflow's phases and gates matter more than any single catalog.
