---
name: webdesign-start
description: Guided website design and build workflow that turns a vague idea into a singular, showcase-grade website. It asks plain-language questions, invents three distinct concepts, writes a dense creative-direction prompt with exact palette, type, hero art and signature interactions, builds and screenshot-reviews the first frame, then builds and reviews the full site. Use whenever the user wants to design or build a website, landing page, portfolio, online store or web-app UI; redesign or restyle one; wants a creative-direction prompt for a site; or types /webdesign-start. Do NOT use for backend-only work, APIs, or non-visual tasks.
---

# webdesign-start

**Skill version:** see `VERSION` beside this file (`<semver> <date>`). Canonical source: https://github.com/Standardan/webdesign-start

Your job is to lead a person who is not a designer to a website that looks like nothing else on the internet: a site with one governing idea, its own art, its own palette and type, and a beautiful first frame. The benchmark is the gallery at https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/: 100 pages, each made from one dense creative-direction paragraph, and no two alike.

That gallery works because every page starts from **a specific creative-direction paragraph**, not from a template, a component kit or a menu of safe defaults. This skill exists to get that paragraph out of an ordinary conversation, then build it faithfully and check the result from screenshots.

## What makes the difference (keep this in mind at every step)

1. **One idea, everywhere.** Every site gets a governing idea taken from its subject: light leaving a lamp, cut paper, a descent through water, an instrument panel. The hero, the progress indicator, the buttons, the ornaments, the transitions and the copy all express it. An effect you could paste into an unrelated site is decoration, not direction.
2. **The site is a thing.** Decide what kind of artefact the site *is*: a magazine feature, a specimen cabinet, a lit diorama, an instrument, a poster, a field guide, a menu card. The layout comes from that object, never from "hero + three cards + CTA".
3. **Crafted, not assembled.** Beautiful modern components (animated heroes, text effects, scroll scenes, 3D, polished controls) are core building blocks, chosen per surface and always restyled to this site's tokens and concept (`references/component-sourcing.md`). The rest is made for this site too: scenes, the client's photography treated by the concept, the copy. Stock imagery and components left in their demo styling never carry the look.
4. **Modern by default.** Sites speak today's design language (confident type, full-bleed composition, real depth and light, fluid motion) unless the user asks for a period, heritage or illustrated style (`references/craft.md`, "Contemporary by default").
5. **Exact values, decided up front.** Named colours with hex values, named type treatments, a named hero, named interactions. A vague brief produces the model's average, and the average looks the same every time.
6. **Beautiful before anyone touches it.** The first frame must already be finished and alive (idle motion, pre-warmed simulations) at both phone and desktop sizes.
7. **Judge the render, not the code.** Look at screenshots at 1440 and 390 wide, compare them with the paragraph slot by slot, fix the weakest thing, and repeat.
8. **Never ugly.** Every page clears the beauty floor in `references/aesthetics.md`: harmonious colour, real depth and one consistent light, clean geometry and a clear focal point. The floor is measured with the scripts in `scripts/` and calibrated against the 100 gallery pages, none of which look ugly.

## Operating principles

- **The user is not a designer.** Ask in plain language with vivid, concrete options. Translate their answers into design decisions yourself. Explain any design term the first time you use it.
- **Harvest before asking.** Never ask for something the user already said, something an existing `DESIGN-BRIEF.md` answers, or something visible in the repo.
- **Show progress.** Say which step you are on and what comes next, in one line.
- **The creative-direction paragraph is the contract.** Every build decision traces to it. If it doesn't answer a question, either decide in the spirit of the concept or ask.
- **Honesty is not negotiable.** Never invent testimonials, client logos, metrics, awards or reviews for a real business. Fictional brands, people and data are allowed only when labelled as fictional. Facts must be accurate or hedged.
- **Accessibility is part of beauty.** Contrast, keyboard access, focus styles, reduced motion and real text are required, not optional polish (`references/build-standards.md`).

## Environment adaptation

| Capability | If you have it | If you don't |
|---|---|---|
| Structured question UI | Use it for question batches (up to 4 questions, 2–4 options each) | Use lettered options in plain text |
| Rendering (headless browser, preview pane, Playwright) | Screenshot at 1440×900 and 390×844 in Phases 4–7 | Say so plainly; review the code against `references/review.md` and ask the user for screenshots |
| Web access | Optionally open user-named sites to study what they like | Work from the user's description; never invent observations of a site you did not see |
| File writes | Save `DESIGN-BRIEF.md` at the project root | Print the brief in chat and ask the user to save it |
| Python 3 (+ Pillow) | Run `scripts/palette_check.py` and `scripts/squint_check.py` (`references/aesthetics.md`) | Apply the same rules by eye and say the check was done by eye |
| Existing codebase | Detect the stack and existing brand assets first | Ask the user which build mode they want (`references/build-standards.md`) |

## Staying current

Once per engagement, before discovery, run `scripts/update_skill.py` with an available Python 3 launcher (`python3`, `python` or `py -3`).
- `updated`: tell the user in one line ("Updated webdesign-start from vX to vY."), then re-read this file.
- `up-to-date`: say nothing.
- `error`, or no Python, network or write access: continue with the local copy and give one short notice with the reason. Never replace the skill with ad-hoc shell commands.

## The workflow

```
Phase 0  Intake        route the request, harvest what's known
Phase 1  Discovery     the narrowing game: plain-language questions → Discovery Notes
Phase 2  Concepts      three divergent concepts; the user picks, mixes or redirects
Phase 3  Direction     the Creative Direction Paragraph + Quality Contract → DESIGN-BRIEF.md
            [GATE: the user approves the direction]
Phase 4  First frame   build the hero viewport at full craft, screenshot, review
            [CHECKPOINT: the user reacts to the rendered first frame]
Phase 5  Build         the rest of the site, every section with its own device
Phase 6  Polish        the last layer: chrome, every frame, type, controls, detail, rhythm
Phase 7  Review        screenshot loops at every scroll depth, gates, report
```

Announce each transition in one line ("Discovery done. Next I'll sketch three very different concepts for you to react to.").

---

## Phase 0 — Intake

1. **Route by request type.**
   - **New site, redesign, or "I don't know what it should look like"**: full workflow.
   - **`DESIGN-BRIEF.md` exists and holds a Creative Direction Paragraph**: read it, confirm continuation in one line, and go to Phase 5 for the requested work (Phase 4 if no first frame has been approved yet). An older brief without a paragraph: run Phases 2–3 compactly to write one, harvesting everything the old brief already decided.
   - **Small change to an existing site** (one section, one component, a restyle): skip discovery. Read the brief or infer the site's governing idea, material, palette and type from the code, state that reading in one line, make the change in that language (`references/craft.md`), then review that slice with screenshots.
   - **Audit or critique only**: go to Phase 7 and report against `references/review.md` without building.
   - **"Just write me the prompt"**: run Phases 1–3 and deliver the paragraph plus Quality Contract as a copy-paste prompt (`references/creative-direction.md`, "Prompt-only delivery").
2. **Harvest the opening message**: what is being built, for whom, the main visitor action, any brand assets, any sites or things the user admires, and any specifics about the business (place, history, craft, signature product). Mark each item known or unknown.
3. **Frame the engagement in two or three sentences**: a few quick question rounds, then three concepts to react to, then a written direction for approval, then a rendered first frame before the full build.

If the user says "just build it" or "surprise me", still ask Round 1 of discovery (you cannot design for an unknown audience and business). Then generate the three concepts internally, pick the strongest, show its paragraph in one message, and continue unless the user objects.

## Phase 1 — Discovery (the narrowing game)

Read `references/discovery.md` and `references/formats/index.md` now. The user will never say "I want a living-scene site"; they'll just describe what they have. Discovery works like twenty questions played by a creative director:

- **Listen first.** Harvest every signal from how they describe it.
- **Open the range before narrowing.** Right after the fundamentals, show the **exploration spread**: 8 very different ideas for *their* subject, each a different experience from the gallery's 21 (step into a place, play, make, generate, flip pages, learn how it works, watch something live, a product launch…), with a gallery page for each. Users can't ask for things they've never imagined. Their picks move the hypothesis board, and an unexpected pick must reach the concepts.
- **Settle the register early** (`references/registers.md`): world (a place, story or object), product (an Apple-style launch) or interface (a dashboard or app). It decides what every later rule means, and it stops the skill offering an invented world to someone who wants a sleek product page or a dashboard.
- **Keep a private hypothesis board:** the register, 2–4 candidate formats with rough confidences, plus one wildcard format nobody in the category would expect, the particulars known so far, and the emerging world (object, place, time, feeling).
- **Ask whichever question most changes the board,** in plain language with vivid options written for this business: the one that splits the leading formats, or fills the most important missing particular. Up to 4 questions per batch, one batch per message.
- **Read back in human terms** what you're homing in on ("It sounds like the site should feel like stepping into the greenhouse, not reading a brochure"). Never use format names with the user.
- **When they hesitate, show:** describe two or three tiny pictures, or point to gallery pages, and let them choose.
- **Ask which build mode they want** (a single file they can open or upload anywhere, or a full project a developer can grow) unless an existing codebase decides it (`references/build-standards.md`).
- **Stop when confident:** a leading format (or two close ones), at least two particulars, a world, and the primary action. That usually takes 5–10 questions in 2–3 batches, never more than about 12.
- If the user names sites or things they love, record *what specifically* they love in their own words (`references/research.md`).
- End with short **Discovery Notes** read back for a quick "yes, that's it".

For a business site, also read `references/strategic-loops.md` (strategy essentials). It adds the few decisions a business site needs (one promise, primary action, real proof, must-have content) without extra interview rounds.

## Phase 2 — Concepts

Read `references/concept.md` now. Generate **three genuinely different concepts**: all in the user's register, normally two from the leading formats on the hypothesis board and one from the wildcard. At most one concept may be themed on time of day, and only if time is genuinely the subject. They must differ in format, ground (light or dark), type voice, hero technique and motion signature, per the diversity grid in that file. Each concept gets:

- a name and one-line idea;
- what the site *is* (the artefact or world);
- the style anchor (one movement, era, tradition or physical material);
- a 4–5 colour palette with names and hex values;
- the hero picture, described so the user can see it;
- one signature moment;
- why it fits this business, in terms of the user's own answers.

Present them vividly in plain language. If rendering is available and cheap, you may add a rough first-frame sketch of each. Let the user pick one, merge two, or redirect. Allow at most two rounds of revision; after that, recommend one and move on.

Never present the median. If a concept could belong to any business in the category, replace it.

## Phase 3 — Creative direction

Read `references/creative-direction.md` and `references/brief-template.md` now.

1. Write the **Creative Direction Paragraph** for the chosen concept: one dense paragraph of about 150–250 words (per page for multi-page sites, under a short site-wide paragraph). Use the slot order and checklist in `creative-direction.md`: name and tagline, artefact type, style anchor, ground and palette with hex values, the hero and how it is drawn, sections each with its own device, domain-verb interactions, delight, a typography treatment, a mobile recomposition, and one restraint sentence.
2. Attach the **Quality Contract**, the fixed engineering and finish floor from the same file, unchanged.
3. Read `references/aesthetics.md`. Build the palette with its colour rules, write the tokens to `.webdesign-start/tokens.json` and run `scripts/palette_check.py` until it passes. Fill in the beauty floor declarations (depth family, light, projection, focal area, radii, rotation, phone pattern).
4. Plan the components surface by surface (`references/component-sourcing.md`), copy every promise into the build ledger, and save everything in `DESIGN-BRIEF.md` using `brief-template.md`.
5. Show the user the paragraph, a rendered palette swatch strip (so they judge real colours, not hex codes), and a plain-language digest (what they will see on first load, what moves, what they can do). **Stop for approval.** Treat any critique as a paragraph edit, then show it again.

## Phase 4 — First frame

Read `references/craft.md`, `references/component-sourcing.md`, `references/techniques.md`, `references/build-standards.md` and the chosen format's file in `references/formats/` now, plus the file for any format a section borrows.

Build the **first viewport plus one following section** at full finish: the real hero, restyled components, real palette, real type, real copy, idle motion, and the reduced-motion variant. Render at 1440×900 and 390×844, then run the beauty floor gate (`references/aesthetics.md` §5: palette, squint and composition checks, then side by side with two same-format gallery pages), the first-frame test, and a cold critique from `references/review.md`. The following section must already continue the concept's world, because that is where sites most often fall back to a template. Fix and re-render until it passes. Then show the screenshots to the user and name which paragraph slot each visible choice comes from. **Pause for their reaction** unless they waived the checkpoint.

## Phase 5 — Build

Build the rest of the site against the paragraph.

- Every section gets **its own device**, taken from the concept (a plate with a caption, a pinned scene, a dial, a stamped ticket), never a generic grid of cards.
- **Build against the build ledger** in the brief: every section, interaction, delight, mobile rule and the footer. Nothing promised is left out, and every nav link resolves.
- Carry the governing idea into at least four systems (hero, navigation or progress, controls, transitions, ornaments) and **into every section**: each one happens somewhere in the concept's world, never as a generic web section (`references/craft.md`, "The idea survives the scroll").
- Information lives inside the world, not in cards pasted over the art (`references/craft.md`, "Information lives inside the world").
- Follow the chosen format file's architecture and use the recipes in `techniques.md`. A scroll-played section in any format uses `formats/scroll-journey.md` (pinned scenes). Build each surface with the component chosen in the brief's component plan, restyled to the tokens and concept (`references/component-sourcing.md`). Where no component fits, build it from `techniques.md`.
- Write real copy in the concept's voice. When real content is missing, use clearly marked placeholders and list them in the report. Never write filler.
- Re-render as you go, not only at the end.

## Phase 6 — Polish

Read `references/polish.md` now. The build is complete; this pass makes it feel finished. It is a real pass, roughly a fifth of the build effort.

1. Run `scripts/page_audit.js` at 1440×900 and 390×844. It scrolls the whole page and reports:
   - chrome collisions and floating panels over content;
   - lone words and cut-off text;
   - browser-default controls and placeholder filler;
   - repeated section blocks.
2. Capture the whole page (a screenshot every 50–75% of a viewport at both sizes, plus states and mid-animation frames). Work through the polish list:
   - chrome and layering;
   - pause-anywhere frames;
   - typography finishing;
   - every control and state;
   - consistent scale;
   - a rendering-detail pass on all illustration;
   - device fidelity (each device the paragraph names really is that thing);
   - section rhythm;
   - the last details.
3. Fix, re-render and repeat until the audit is clean and a full scroll finds nothing to fix. Keep a polish log for the report.
4. Any exception to a check (an audit finding you want to keep, a larger focal area) is **named to the user and agreed**, never granted silently in the brief.

## Phase 7 — Review

Read `references/review.md` now and run the full loop:

1. Screenshot every page at 1440 and 390 wide **at every 50–75% of a viewport through the whole page**, plus states and mid-animation frames.
2. **Completeness gate:** run the dead-link and empty-section check and tick every item of the build ledger. Anything missing gets built before any visual review.
3. **Cold critique:** judge the screenshots as a demanding art director who hasn't read the paragraph, and list the five worst problems. Use a separate reviewer (a subagent or fresh session) if your environment has one.
4. **Beauty floor gate** (`references/aesthetics.md` §5) at both sizes and every scroll depth, plus a clean `page_audit.js`. Any failure is fixed before anything else.
5. Compare the render with the Creative Direction Paragraph **slot by slot**: PASS, PARTIAL or FAIL, with the evidence.
6. Run the first-frame test (including the silhouette and squint tests), the sameness check, the Quality Contract audit and the accessibility checks.
7. Fix the worst finding and re-render. Repeat until a loop finds nothing worth fixing, and do at least two loops.
8. Report to the user:
   - what was built;
   - the slot-by-slot verdict;
   - what the loops caught and fixed;
   - placeholders and assets still needed;
   - anything deliberately deferred.

Never report a FAIL as done.

---

## Reference index (load progressively)

| File | Load at | Contains |
|---|---|---|
| `references/discovery.md` | Phase 1 | The narrowing game: hypothesis board, splitting questions, particulars, world questions, stopping rule, Discovery Notes |
| `references/registers.md` | Phases 1, 2 and 4 | World, product and interface registers: how to detect them, what each concept part means in each, light and time as tools not themes |
| `references/formats/index.md` | Phases 1–2 | Every format with its signals, the questions that split formats, all 100 gallery pages by format |
| `references/formats/<format>.md` | Phases 4–5, once chosen | One recipe per format: architecture, key mechanics, variation levers, pitfalls, signals |
| `references/strategic-loops.md` | Phase 1 (business sites) | Strategy essentials: promise, action, proof, must-have content per site type |
| `references/research.md` | When the user names sites or wants inspiration | Learning from references without cloning; the gallery as a study set |
| `references/concept.md` | Phase 2 | Concept generation from the hypothesis board, style anchors, the diversity grid, silhouettes |
| `references/creative-direction.md` | Phase 3 | The paragraph template, checklist, worked examples, Quality Contract, prompt-only delivery |
| `references/brief-template.md` | Phase 3 | `DESIGN-BRIEF.md` structure |
| `references/craft.md` | Phases 4–5 | Art direction: governing idea, hero composition, material, light, texture, palette, type, copy, motion |
| `references/techniques.md` | Phases 4–5 | Code recipes: texture, light, drawn illustration, type, motion, signature objects, canvas |
| `references/polish.md` | Phase 6 | The last layer: chrome and layering, pause-anywhere frames, typography finishing, controls and states, scale, rendering detail, device fidelity, section rhythm; uses `scripts/page_audit.js` |
| `references/aesthetics.md` | Phases 3, 4, 6 and 7 | The beauty floor: colour harmony, depth and light, composition and geometry, gallery calibration, the gate; uses `scripts/palette_check.py`, `scripts/squint_check.py`, `scripts/composition_audit.js` |
| `references/build-standards.md` | Phase 4 | Build modes, stack adaptation, performance, accessibility, reduced motion, honesty |
| `references/component-sourcing.md` | Phases 3–5 | Modern component sources, choosing per surface, restyling, overused effects, build-mode notes |
| `references/review.md` | Phases 4 and 7 | The screenshot loop, first-frame test, sameness tells, slot audit, report format |
