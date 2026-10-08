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
8. **Written by a person.** Copy sounds like the business owner talking: specific, plain, no em dashes, no stock AI phrases. Layout varies how sections open instead of stamping a tiny tracked label over a giant headline over a grey paragraph everywhere (`references/human-copy.md`, checked by `scripts/copy_audit.js`). Structure comes from the concept's objects too, not from a section template (`references/layout-cadence.md`, checked by `scripts/layout_audit.js`).
9. **Never ugly.** Every page clears the beauty floor in `references/aesthetics.md`: harmonious colour, real depth and one consistent light, clean geometry and a clear focal point. The floor is measured with the scripts in `scripts/` and calibrated against the 100 gallery pages, none of which look ugly.
10. **The first frame is an experience, never the formula.** A big headline, a one-paragraph subline and one or two buttons beside an image is the default hero, and it is banned as the dominant composition. The hero is something you look at or use, chosen from the concept (a product you can touch, an art-directed photograph with one line set into it, a working tool, a menu that is the hero, a poster) (`references/hero.md`, checked by `HERO` in `scripts/layout_audit.js`). No two-tone highlighted word in the headline.
11. **The primary action comes from how this business's customers buy.** A florist's customers order bouquets, a salon's book a slot, an estimator's request a quote. The phone is not the default; it is correct and tappable wherever it appears, and primary only when calling really is how the business is bought (`references/primary-action.md`).
12. **Photographs are designed, not dropped in.** Chosen as a set, cropped and masked by the concept, graded together, broken out of uniform rectangles, and responsive to the interface (`references/photography.md`).
13. **Interactions change the content.** Select a pie and you see that pie (its photo, price and description). A selection that leaves the picture unchanged is broken (`references/techniques.md` §9).
14. **Every site is better than the last.** A portfolio ledger prevents repeated hero types and devices, a side-by-side against the best earlier sites must be won before shipping, and a retro writes at least one concrete improvement back into the skill (`references/better-every-time.md`).

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
| A place to keep the portfolio ledger | `.webdesign-start/ledger.md` in the project or workspace, else `~/.webdesign-start/ledger.md` (`references/better-every-time.md`) | Print the ledger entry in the report and ask the user to save it |
| The skill's own repository | Write the retro improvement into it (edit, CHANGELOG line, release per its `AGENTS.md`) | Write the proposed change to `.webdesign-start/skill-backlog.md` and say so in the report |
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
Phase 7  Review        screenshot loops at every scroll depth, gates, side-by-side, ledger, retro, report
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
2. **Read the portfolio ledger** if one exists (`references/better-every-time.md`): the hero types, devices, palettes and type pairings of the sites built recently, so this one does not repeat them. If there are earlier sites but no ledger, create it from them before Phase 2.
3. **Harvest the opening message**: what is being built, for whom, the main visitor action, any brand assets, any sites or things the user admires, and any specifics about the business (place, history, craft, signature product). Mark each item known or unknown.
4. **Frame the engagement in two or three sentences**: a few quick question rounds, then three concepts to react to, then a written direction for approval, then a rendered first frame before the full build.

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

For a business site, also read `references/strategic-loops.md` (strategy essentials) and `references/primary-action.md`. They add the few decisions a business site needs (one promise, the primary action taken from how this business's customers actually buy, real proof, must-have content) without extra interview rounds. Never default the primary action to the phone.

## Phase 2 — Concepts

Read `references/concept.md` and `references/hero.md` now (and `references/photography.md` when the business has photography to show). Generate **three genuinely different concepts**: all in the user's register, normally two from the leading formats on the hypothesis board and one from the wildcard. At most one concept may be themed on time of day, and only if time is genuinely the subject. They must differ in format, ground (light or dark), type voice, hero technique and motion signature, per the diversity grid in that file. Each concept gets:

- a name and one-line idea;
- what the site *is* (the artefact or world);
- the style anchor (one movement, era, tradition or physical material);
- a 4–5 colour palette with names and hex values;
- the hero picture, described so the user can see it, and its **hero type** from `hero.md` (never the formula; each concept uses a different hero type, none repeating the ledger's last four);
- the primary action for this business and what the visitor can do in the first frame (`primary-action.md`);
- for a real business: **where is the product** in the first frame, and at least one concept is photography-led or product-led;
- one signature moment;
- why it fits this business, in terms of the user's own answers.

Check each concept against the ledger (`better-every-time.md` §2) before showing it: a concept that repeats a recent hero type or signature device is replaced. Present them vividly in plain language. If rendering is available and cheap, you may add a rough first-frame sketch of each. Let the user pick one, merge two, or redirect. Allow at most two rounds of revision; after that, recommend one and move on.

Never present the median. If a concept could belong to any business in the category, replace it.

## Phase 3 — Creative direction

Read `references/creative-direction.md` and `references/brief-template.md` now.

1. Write the **Creative Direction Paragraph** for the chosen concept: one dense paragraph of about 150–250 words (per page for multi-page sites, under a short site-wide paragraph). Use the slot order and checklist in `creative-direction.md`: name and tagline, artefact type, style anchor, ground and palette with hex values, the hero and how it is drawn, sections each with its own device, domain-verb interactions, delight, a typography treatment, a mobile recomposition, and one restraint sentence.
2. Attach the **Quality Contract**, the fixed engineering and finish floor from the same file, unchanged.
3. Read `references/aesthetics.md`. Build the palette with its colour rules, write the tokens to `.webdesign-start/tokens.json` and run `scripts/palette_check.py` until it passes. Fill in the beauty floor declarations (depth family, light, projection, focal area, radii, rotation, phone pattern).
4. Plan the components surface by surface (`references/component-sourcing.md`), copy every promise into the build ledger, and save everything in `DESIGN-BRIEF.md` using `brief-template.md`.
5. Name the hero type, the primary action and the signature devices in the brief, and check them against the ledger (`references/better-every-time.md`). A repeat is changed before approval.
6. Show the user the paragraph, a rendered palette swatch strip (so they judge real colours, not hex codes), and a plain-language digest (what they will see on first load, what moves, what they can do). **Stop for approval.** Treat any critique as a paragraph edit, then show it again.

## Phase 4 — First frame

Read `references/craft.md`, `references/hero.md`, `references/component-sourcing.md`, `references/techniques.md`, `references/build-standards.md` and the chosen format's file in `references/formats/` now, plus the file for any format a section borrows.

Build the **first viewport plus one following section** at full finish: the real hero, restyled components, real palette, real type, real copy, idle motion, and the reduced-motion variant. Render at 1440×900 and 390×844, name the hero type, the first thing the eye lands on and the first thing the hand can do (`hero.md`), run `scripts/layout_audit.js` (no `HERO` finding), then run the beauty floor gate (`references/aesthetics.md` §5: palette, squint and composition checks, then side by side with two same-format gallery pages), the first-frame test, and a cold critique from `references/review.md`. The following section must already continue the concept's world, because that is where sites most often fall back to a template. Fix and re-render until it passes. Then show the screenshots to the user and name which paragraph slot each visible choice comes from. **Pause for their reaction** unless they waived the checkpoint.

## Phase 5 — Build

Build the rest of the site against the paragraph. Read `references/human-copy.md` before writing copy.

- Every section gets **its own device**, taken from the concept (a plate with a caption, a pinned scene, a dial, a stamped ticket), never a generic grid of cards.
- **Build against the build ledger** in the brief: every section, interaction, delight, mobile rule and the footer. Nothing promised is left out, and every nav link resolves.
- Carry the governing idea into at least four systems (hero, navigation or progress, controls, transitions, ornaments) and **into every section**: each one happens somewhere in the concept's world, never as a generic web section (`references/craft.md`, "The idea survives the scroll").
- Information lives inside the world, not in cards pasted over the art (`references/craft.md`, "Information lives inside the world").
- Follow the chosen format file's architecture and use the recipes in `techniques.md`. A scroll-played section in any format uses `formats/scroll-journey.md` (pinned scenes). Build each surface with the component chosen in the brief's component plan, restyled to the tokens and concept (`references/component-sourcing.md`). Where no component fits, build it from `techniques.md`.
- Write real copy in the concept's voice, the way the owner would say it: no em dashes, no stock AI phrases, varied sentence length (`references/human-copy.md`). Vary how sections open and what form each takes: the label → big heading → paragraph stack appears once at most, and no stock structure (three equal cards, numbered step row, twin pricing, accordion FAQ, dark CTA band) unless the concept puts it there (`references/layout-cadence.md`). When real content is missing, use clearly marked placeholders and list them in the report. Never write filler.
- Photography is designed into the layout (`references/photography.md`): chosen as a set, cropped and masked by the concept, graded together, with full-bleed moments and no uniform grid of rectangles.
- Every selection or state changes what you see: choose a pie, and its photo, price and description change (`references/techniques.md` §9). Preload, crossfade, keyboard and touch included.
- Re-render as you go, not only at the end.

## Phase 6 — Polish

Read `references/polish.md` now. The build is complete; this pass makes it feel finished. It is a real pass, roughly a fifth of the build effort.

1. Run `scripts/copy_audit.js` (em dashes, stock phrases, tracked-label overuse, repeated section stacks) and fix every finding by rewriting (`references/human-copy.md`). Then run `scripts/layout_audit.js` at 1440×900 with default motion (eyebrows, same-shaped section openings, numbered rows, equal card groups, twin pricing, accordion FAQs, dark CTA bands, uniform reveals, stock section order) and fix every finding by restructuring (`references/layout-cadence.md`). The audit also flags a hero-sized link or button (`BIGHIT`), an extended display face at headline or numeral size (`WIDEFACE`), the formula hero (`HERO`), a two-tone headline (`HEADLINE2`) and paper ticket, receipt, stamp or tag devices (`PAPERDEV`).
2. Run `scripts/page_audit.js` at 1440×900 and 390×844. It scrolls the whole page and reports:
   - chrome collisions and floating panels over content;
   - lone words and cut-off text;
   - browser-default controls and placeholder filler;
   - repeated section blocks.
3. Capture the whole page (a screenshot every 50–75% of a viewport at both sizes, plus states and mid-animation frames). Work through the polish list:
   - chrome and layering;
   - pause-anywhere frames;
   - typography finishing;
   - every control and state;
   - consistent scale;
   - a rendering-detail pass on all illustration;
   - device fidelity (each device the paragraph names really is that thing);
   - section rhythm;
   - the last details.
4. Fix, re-render and repeat until both audits are clean and a full scroll finds nothing to fix. Keep a polish log for the report.
5. Any exception to a check (an audit finding you want to keep, a larger focal area) is **named to the user and agreed**, never granted silently in the brief.

## Phase 7 — Review

Read `references/review.md` now and run the full loop:

1. Screenshot every page at 1440 and 390 wide **at every 50–75% of a viewport through the whole page**, plus states and mid-animation frames.
2. **Completeness gate:** run the dead-link and empty-section check and tick every item of the build ledger. Anything missing gets built before any visual review.
3. **Cold critique:** judge the screenshots as a demanding art director who hasn't read the paragraph, and list the five worst problems. Use a separate reviewer (a subagent or fresh session) if your environment has one.
4. **Beauty floor gate** (`references/aesthetics.md` §5) at both sizes and every scroll depth, plus a clean `page_audit.js`, `copy_audit.js` and `layout_audit.js` (a remaining layout finding needs a named reason in the report). Any failure is fixed before anything else.
5. Compare the render with the Creative Direction Paragraph **slot by slot**: PASS, PARTIAL or FAIL, with the evidence.
6. Run the first-frame test (including the silhouette and squint tests), the sameness check, the Quality Contract audit and the accessibility checks.
7. Fix the worst finding and re-render. Repeat until a loop finds nothing worth fixing, and do at least two loops.
8. **Better every time** (`references/better-every-time.md`), mandatory before the report:
   - **Ledger:** append this site's entry (format, hero type, primary action, signature devices, interactions that change content, palette family, type pairing) to the portfolio ledger, and confirm none of the hero type or devices repeat the recent sites.
   - **Side-by-side:** screenshot the first frame and signature moment next to the 2 or 3 best earlier sites at 1440 and 390. The new site must win on the first frame **and** on at least one signature moment. If it loses or ties, fix it and compare again. Use `scripts/contact_sheet.py --blind` and a separate reviewer for the first-frame ranking (`references/better-every-time.md` §3).
   - **Retro:** write at least one concrete improvement back into the skill's repository (a recipe, rule, check, example or doc fix), with a `CHANGELOG.md` line. If the repository is not available, write it to `.webdesign-start/skill-backlog.md`. No client or lead data goes into a public skill.
9. Report to the user:
   - what was built;
   - the slot-by-slot verdict;
   - what the loops caught and fixed;
   - the portfolio line, the side-by-side verdict and the retro;
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
| `references/techniques.md` | Phases 4–5 | Code recipes: texture, light, drawn illustration, type, motion, signature objects, canvas, photographs in the interface and selections that change the content |
| `references/polish.md` | Phase 6 | The last layer: chrome and layering, pause-anywhere frames, typography finishing, controls and states, scale, rendering detail, device fidelity, section rhythm; uses `scripts/page_audit.js` |
| `references/aesthetics.md` | Phases 3, 4, 6 and 7 | The beauty floor: colour harmony, depth and light, composition and geometry, gallery calibration, the gate; uses `scripts/palette_check.py`, `scripts/squint_check.py`, `scripts/composition_audit.js` |
| `references/build-standards.md` | Phase 4 | Build modes, stack adaptation, performance, accessibility, reduced motion, honesty |
| `references/component-sourcing.md` | Phases 3–5 | Modern component sources, choosing per surface, restyling, overused effects, build-mode notes |
| `references/human-copy.md` | Phases 3, 5, 6 and 7 | Human copy and layout cadence: no em dashes, no stock AI phrases, tracked labels as metadata only, varied section openings; uses `scripts/copy_audit.js` |
| `references/layout-cadence.md` | Phases 3, 5, 6 and 7 | Each section takes its form from the concept; varied openings, scale and rhythm; the structural AI tells and their fixes (including `HERO`, `HEADLINE2`, `PAPERDEV`); uses `scripts/layout_audit.js` |
| `references/hero.md` | Phases 2, 3, 4 and 7 | The formula hero, named and banned; a catalogue of real hero types tied to concept and format; the questions that find one; uses `HERO` and `HEADLINE2` in `scripts/layout_audit.js` |
| `references/primary-action.md` | Phases 1, 3, 4 and 7 | Business type to primary action to where the phone belongs (florist, bakery, restaurant, trades, emergency trades, salon, gym, retail and more); never phone by default |
| `references/photography.md` | Phases 2 to 7 | Photographs as design: choosing a set, finding matching sets, crops and masks, cut-outs, scale, grade, sequences, responding to the interface, technical floor |
| `references/better-every-time.md` | Phases 0, 2, 3 and 7 | The portfolio ledger, the no-repeat rule, the side-by-side critique against the best earlier sites, the retro that writes an improvement back into the skill |
| `references/review.md` | Phases 4 and 7 | The screenshot loop, first-frame test, sameness tells, slot audit, report format |
