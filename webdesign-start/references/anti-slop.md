# Anti-Slop — Keeping AI Tells Out of the Design and the Copy

AI-generated websites fail in a recognizable way: they regress to the mean of everything the model has seen. The result is "slop" — a site that is technically fine and instantly forgettable, and that readers increasingly *recognize as AI-made*, which destroys the client's credibility. This file is a catalog of the tells and the rules for avoiding them. Slop is not a style; it is the absence of decisions. Every rule here is ultimately the same rule: **replace the statistical default with a decision traceable to THIS client's discovery answers and references.**

**When to read this file:** at Phase 3 (before writing the brief — the brief must not encode slop) and again at Phase 4 (before writing copy or CSS). The self-review in Phase 5 audits against it.

## Contents

- [Visual slop](#visual-slop)
- [Writing slop](#writing-slop)
- [The specificity antidote](#the-specificity-antidote)
- [Slop audit protocol](#slop-audit-protocol)

---

## Visual slop

These are defaults, not choices. Each is allowed **only** if the discovery answers or approved references specifically call for it — and then it's a decision, not slop.

### The banned-by-default list

| Tell | Why it reads as AI | Do instead |
|---|---|---|
| Near-black/navy background + purple-indigo gradient + glowing orbs | The 2024–25 "AI startup landing page" template; the single most recognizable tell | Dark mode must come from the client's taste (discovery Q6) and use the brief's palette — warm, tinted, specific |
| Violet/purple (#8B5CF6, #7C3AED, #6366F1) as brand color when the client never chose it | It's the model default, not a brand | Derive color from industry palette + references; if the client picked purple, fine — record it in the brief |
| Neon cyan/magenta accents, glow effects, "cyber" borders | Sci-fi defaults applied to non-sci-fi businesses | Reserve for clients whose discovery actually landed on cyber/gaming styles |
| Gradient text on headlines | Decoration standing in for a type decision | Let scale, weight, and spacing do the work; gradient text only if a reference site earned it |
| Radial-gradient blobs floating in section corners; dot-grid or mesh backgrounds everywhere | Filler "visual interest" with no content role | Empty space IS the visual interest; if texture is needed, take it from the chosen style's recipe |
| Glassmorphism on every card regardless of context | Effect applied without the layered background it needs | Glass only over imagery/color it can blur; otherwise flat surfaces from tokens |
| Emoji as icons or bullet decorations (🚀 ✨ 💡 ✅) | Universal AI tell; also inconsistent rendering | One SVG icon family (already required by ux-rules P4) |
| Three identical icon-title-blurb feature cards, centered, for every content need | The default component reached for without asking what the content is | Vary section anatomy per layouts.md; alternate rows, tables, prose, imagery — match the shape to the content |
| Hero = centered gradient headline + two buttons + floating fake dashboard | The template every generator produces | Pick the hero pattern from layouts.md that fits THIS product and the approved references |
| Every section title centered, with one word in the accent color | Rhythm without reason | Title alignment and accent use follow the chosen style's recipe |
| Inter + white background + blue/purple CTA with zero further decisions | Not wrong — just nothing | If minimal is the direction, execute *refined* minimalism per styles.md: tuned spacing, real type scale, one deliberate accent |

### The deeper rule

Slop is recognizable because every choice is uncorrelated with the client. A cocktail bar's site and a CRM's site should not share a palette, a hero, and a feature grid. Before styling any section, ask: *would this choice survive if the client were sitting next to you pointing at their approved reference sites?* If you can't connect a visual choice to the brief, you're generating, not designing.

## Writing slop

Website copy is where AI authorship is most instantly detected. These rules apply to ALL user-facing text you produce: headlines, body copy, button labels, placeholder copy, meta descriptions.

### Banned outright in site copy

- **Em dashes.** None. Restructure the sentence, use a period, comma, or colon. (This document uses them; *site copy may not.* They are now a primary AI tell in short-form marketing text.)
- **The hype lexicon:** elevate, unlock, unleash, empower, supercharge, seamless, effortless, game-changing, cutting-edge, next-level, revolutionize, transform (as a verb for the product's effect), harness, delve, robust, streamline, "take your X to the next level," "look no further," "in today's fast-paced world," "whether you're a X or a Y," "we've got you covered," "your one-stop shop."
- **Emoji in copy.** Any.
- **Exclamation points** beyond at most one per page, and zero for premium/serious brands.

### Banned patterns (restructure, don't just reword)

| Pattern | Example | Why it's a tell |
|---|---|---|
| Triadic fragment headlines | "Fast. Simple. Secure." | The model's favorite rhythm; says nothing specific |
| "It's not just X. It's Y." | "Not just a gym. A community." | Formula posing as insight |
| Rhetorical-question section headers | "Why choose us?" "Ready to get started?" | Filler that delays information |
| Perfectly parallel three-bullet lists everywhere | Every section = exactly 3 benefits | Real content is lumpy; forced symmetry reads generated |
| Mirrored contrast sentences | "You bring the vision. We bring the tools." | Second-most-favorite rhythm |
| Capitalized Value Words | "our Commitment to Quality" | Nothing earns mid-sentence capitals |
| Vague benefit-speak | "Solutions tailored to your unique needs" | Zero information; any business could claim it |
| Overqualified hedging | "can help you potentially achieve" | Copy should commit or cut |

### What good copy does instead

- **States facts a competitor couldn't copy-paste.** "Three chairs on East Sixth, walk-ins when a chair is open" beats "a premium grooming experience tailored to you."
- **Sounds like the client.** Mine the discovery transcript for their actual phrases; "skilled, not stuck-up" came from the client and is worth more than anything you can synthesize. Put their words in the copy deck.
- **Front-loads the concrete:** price, place, time, outcome. Specific numbers ("ready in 45 minutes") over adjectives ("fast turnaround").
- **Buttons say the action:** "Book a chair," "See the menu," never "Get Started" or "Learn More" when something specific is available.
- **Sentence lengths vary.** Read it aloud; if every sentence has the same cadence, rewrite the middle one.

## The specificity antidote

One test covers both visual and written slop: **could this exact element appear, unchanged, on an unrelated business's site?** If yes, it carries no information about this client and needs either specificity or deletion. Run the test on the palette, the hero, each headline, each section, each image choice. A site passes when a stranger could read it and repeat back three concrete true things about the business.

## Slop audit protocol

Run this as part of Phase 5 self-review (build-standards.md), before the pre-delivery checklist:

1. **Copy grep.** Search all HTML/content files for: `—` (em dash), the hype-lexicon words above, `!`, emoji ranges, "Get Started", "Learn More", "Why choose". Every hit is fixed or consciously justified in the report.
2. **Palette check.** If the site's primary is in the violet range (#6D28D9–#8B5CF6 territory) or an accent is neon on dark, confirm the brief chose it from discovery/references. If the brief itself defaulted there without a traceable reason, flag it to the user rather than shipping it.
3. **Template scan.** Look at the page zoomed out (or read the section list): centered-hero + 3-cards + testimonial + CTA-band with no deviation is the template silhouette. At least the sections' *anatomy* should vary per the layouts.md formulas chosen in the brief.
4. **Voice check.** Read every headline in sequence, alone. If they could be shuffled between sections (or between clients) without anyone noticing, rewrite for specificity.
5. **Report.** The self-review report includes a "slop audit" line: what was caught, what was fixed, anything deliberately kept and why.
