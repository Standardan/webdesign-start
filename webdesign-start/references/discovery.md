# Discovery — Adaptive Design Questionnaire

This file is the complete question system for extracting a design direction from a user who cannot describe one. It defines what to ask, in what order, how to branch, and how to translate plain-language answers into design vocabulary. The output is a **Discovery Summary** that feeds the research phase.

**When to read this file:** at the start of Phase 1, before asking the user anything.

## Contents

- [Rules of engagement](#rules-of-engagement)
- [Round 1 — Fundamentals (always)](#round-1--fundamentals-always)
- [Round 2 — Taste extraction (always)](#round-2--taste-extraction-always)
- [Round 3 — Product-type branches](#round-3--product-type-branches)
- [Round 4 — Scope & practicals](#round-4--scope--practicals)
- [The vague-answer decoder](#the-vague-answer-decoder)
- [Answer-to-style mapping](#answer-to-style-mapping)
- [Discovery Summary template](#discovery-summary-template)

---

## Rules of engagement

1. **Batches of 3-4 questions, one batch per message.** More feels like a form; fewer drags the process out. If your environment has a structured multiple-choice UI, use it; otherwise present lettered options (A/B/C…) in plain text.
2. **Every question gets concrete options plus an escape hatch** ("or describe it your way"). Options do the heavy lifting — a user who can't articulate taste *can* pick between two vivid descriptions.
3. **Anchor to famous sites and physical-world comparisons**, not design jargon. "Like an Apple product page" and "like a cozy neighborhood coffee shop" communicate; "neumorphic" does not. Only use a style term after the user's answers have earned it, and gloss it in parentheses.
4. **Skip anything already known.** Harvest the opening message, any existing brief, and the repo first. Asking a question the user already answered burns trust.
5. **Acknowledge before advancing.** Start each new batch with a one-line read-back of what the last batch established ("Got it — a booking-first site for a small climbing gym, friendly but not childish. Three more questions:").
6. **Never let an answer pass that you can't act on.** "Modern and clean" is not actionable — run it through the [decoder](#the-vague-answer-decoder) and ask the follow-up in the same or next batch.
7. **Silence on a question is a decision for the default.** If the user skips something, choose the industry-typical default, and record it in the summary as `(defaulted)` so they can veto it cheaply.
8. **Watch for expertise signals.** If the user starts speaking fluent design ("I want something like Swiss typography with a single accent"), drop the plain-language scaffolding and meet them at their level — but still confirm with examples in Phase 2.

---

## Round 1 — Fundamentals (always)

Ask these four, adapted to what's already known:

**Q1. What are we building?**
Offer the product-type list (this sets the Round 3 branch):
- A) Business/marketing site for a company or service
- B) SaaS or software product site
- C) Online store
- D) Portfolio or personal site
- E) Restaurant, café, or hospitality
- F) Blog, publication, or content site
- G) Web app / dashboard (the product itself, not its marketing)
- H) Landing page for a launch, event, or campaign
- I) Nonprofit / community
- J) Something else — describe it

Follow the answer with one clarifier if the category is broad (A → "what does the business do?"; C → "what do you sell, roughly how many products?").

**Q2. Who is the main visitor, and what do they already know?**
Free-text with prompts: "e.g., 'developers evaluating tools,' 'local homeowners who found us on Google,' 'brides comparing photographers.'" Audience drives formality, density, and how much explaining the site must do.

**Q2b. Why now?** (fold into Q2's batch)
"What's making this website happen now, and what should be different for you three months after launch?" The answer converts an aesthetic request into an outcome the design can be judged against (more bookings, credibility for a funding round, escaping an embarrassing old site). If there's an existing brand, also ask the **gap question**: "How do people describe you today, and how do you WANT to be described after the redesign?" The distance between those two answers is the real assignment.

**Q3. When a visitor lands, what is the ONE action that matters most?**
- Buy / book / order
- Sign up or start a trial
- Contact / request a quote / call
- Browse and be impressed (portfolio credibility)
- Read / subscribe
- Donate / join
Everything on the site funnels toward this; extract one primary even if they name two.

**Q4. What already exists?**
- Logo? Brand colors? Fonts? Photography?
- An existing site (URL!) — and is this a redesign of it or a fresh start?
- Written copy, or should structure assume placeholder text?
If they give an existing URL, treat it as a discovery goldmine: what do they like/hate about the current site?

---

## Round 2 — Taste extraction (always)

This is where "I can't describe what I want" gets solved. Use contrast pairs — every question is a spectrum with vivid, non-jargon endpoints. Pick the 4 most relevant if the industry already constrains some answers (a law firm doesn't need the playfulness question).

**Q5. Overall energy** — "If your site were a place, which is closer?"
- A) A quiet gallery — calm, spacious, few things asking for attention *(→ minimal family)*
- B) A well-run office lobby — professional, warm, organized *(→ corporate-refined)*
- C) A buzzing startup workspace — bold type, confident color, some motion *(→ expressive/tech)*
- D) A street market — loud, dense, high-energy, unapologetic *(→ brutalist/maximal)*

**Q6. Light or dark?**
- A) Light — bright background, dark text (default for most audiences)
- B) Dark — like a code editor or a cinema (strong for dev tools, gaming, premium tech)
- C) Light with dark sections for drama
- D) Both, with a toggle (adds build scope — flag it)

**Q7. Color appetite**
- A) Almost none — black/white/gray + ONE accent color
- B) Restrained — a real brand color, used with discipline
- C) Colorful — multiple hues, gradients welcome
- D) "Make color the whole personality" — saturated, big fields of it

**Q8. Typography personality** — "Which voice should the text have?"
- A) Neutral and invisible — the words matter, not the letters (Inter-class sans)
- B) Technical and precise — slightly engineered feel (geometric/mono accents)
- C) Editorial — like a good magazine; serifs welcome
- D) Expressive — big, characterful headlines that ARE the design
- E) Friendly and rounded — approachable, human

**Q9. Density & pace**
- A) Airy — one idea per screen, lots of breathing room (reads premium, slower)
- B) Balanced — normal marketing-site rhythm
- C) Dense — lots of information visible at once (dashboards, catalogs, news)

**Q10. Shape & depth** — "Buttons and cards should feel…"
- A) Sharp and flat — crisp corners, no shadows (editorial/brutalist/swiss)
- B) Slightly rounded, subtle shadows — the safe modern default
- C) Very rounded / pill-shaped — soft and friendly
- D) Layered and dimensional — glass blur, glow, floating cards (techy/showy)

**Q11. Motion appetite**
- A) None to minimal — instant, no tricks
- B) Subtle — gentle fades/reveals on scroll, hover feedback (default)
- C) Rich — animated hero, parallax, scroll-driven moments (adds build scope — flag it)

**Q12. Anti-preferences (always ask, free-text):**
"Any websites or styles you *hate*? Anything your site must never look like (a competitor, a trend, 'corporate stock-photo' feel…)?" A strong negative constrains the space better than three positives.

**Q12b. Three traits, three anti-traits (strongest single exercise — use when Round 2 answers feel thin):**
"Pick exactly three words for what the site should feel like, and three for what it must NOT feel like." Then, for any ambiguous trait, have them complete: "For us, [trait] means ___, but not ___." ("Premium means considered and unhurried, but not unapproachable.") Forcing exactly three of each prevents the incoherent everything-list, and the "but not" clause disambiguates words like *bold* or *premium* that point in multiple directions.

**Question hygiene:** each scale measures ONE variable. Never bundle ("dark and dramatic or light and friendly?" conflates mode with energy — someone can want dark *and* friendly). If two Round 2 answers seem to conflict, that's signal, not error; ask which wins.

Where useful, add the **anchor question**: "Any sites you already admire — even from unrelated industries?" A named URL here can short-circuit half of Phase 2.

---

## Round 3 — Product-type branches

Ask 3-4 from the branch matching Q1. These surface content and conversion facts that change the page map.

### A) Business / service company
- Service area local or national? (Local → maps, phone-first, review widgets)
- What makes customers pick you over the competitor down the street? (becomes hero message)
- Do visitors need pricing on the site, or is everything quoted?
- Photos of real work/team available, or stock/illustration territory?

### B) SaaS / software product
- Is there a product to screenshot yet? (Screenshot hero vs abstract/illustration hero)
- Self-serve signup or sales-led demo? (CTA language and pricing-page shape)
- Pricing public? How many tiers?
- Technical audience or business audience? (density, proof style: benchmarks vs testimonials)
- Any social proof yet — logos, user counts, testimonials?

### C) E-commerce
- How many products at launch? (3 products = boutique showcase; 300 = catalog machinery)
- Platform constraint (Shopify/existing cart) or fully custom?
- Product photography quality — the honest answer decides how image-forward the design can be
- Price positioning: budget, mid, premium? (premium = whitespace + restraint; budget = density + urgency cues)

### D) Portfolio / personal
- What kind of work, and is it visual? (Photography ≠ copywriting portfolio)
- Goal: hired full-time, freelance clients, or showcase? (changes CTA and bio prominence)
- How many pieces, and are 3-6 *great* ones available for case studies?
- Should personality lead (memorable, risky) or work lead (neutral frame, safe)?

### E) Restaurant / hospitality
- Reservations, online ordering, or walk-in only? (the #1 CTA)
- Food photography available and good? (image-led vs typography-led menu design)
- The room's vibe in three words — the site should extend the physical space
- Menu: changes how often? (weekly → needs easy edit path, never a PDF scan)

### F) Blog / content
- Publishing cadence and article length? (daily-short vs monthly-longform layouts differ)
- Monetization/subscription in scope? (paywall UI, newsletter prominence)
- One author with a voice, or a masthead of many?

### G) Web app / dashboard
- What's the main screen the user lives in? Describe the data.
- Sidebar-nav app or top-nav app? Marketing pages needed too, or app only?
- Data density: mission-control dense or consumer-app calm?
- Existing component library/design system in the codebase?

### H) Launch / event landing page
- Single page or few pages? Date-driven (countdown)?
- What's collected — emails, ticket sales, registrations?
- Lifespan: disposable-after-event or evergreen?

### I) Nonprofit / community
- Primary: donations, volunteers, or awareness?
- Stories/photos of real impact available? (specificity converts; abstraction doesn't)
- Established-institution trust or grassroots energy?

---

## Round 4 — Scope & practicals

Usually 3 questions; fold into Round 3's message if short.

**Q13. Pages.** Propose a page list based on everything so far (use the industry playbook) and ask them to add/cut, rather than asking open-ended "what pages do you want?"

**Q14. Content readiness.** Real copy and images now, later, or "write placeholder copy that sounds real"? (Never lorem ipsum — placeholder copy should be plausible so the design reads true.)

**Q15. Stack** — only if not detectable from the repo. If greenfield and the user has no opinion, don't quiz them; state the default from `build-standards.md` and move on.

**Q16. Extras in scope?** Dark-mode toggle, blog/CMS, contact form handling, multilingual, analytics. Each is scope; confirm rather than assume.

**Q17. Who decides?** (only when the client isn't obviously solo)
"Is anyone else approving this — a partner, a boss, a board?" If yes, get their veto concerns NOW and note who breaks ties. The classic project-killer is a late-arriving stakeholder invalidating an approved direction; a one-line decision model in the summary prevents it.

---

## The vague-answer decoder

The most common answers are the least actionable. Never accept these at face value — each has a designed follow-up:

| User says | It usually hides | Ask this follow-up |
|---|---|---|
| "Modern and clean" | Any of: minimal, corporate-safe, or techy | "Clean like an Apple page (spare, product-first), clean like Stripe (organized, colorful accents), or clean like a fashion magazine (big images, elegant text)?" |
| "Professional" | Fear of looking amateur, not a style | "Professional-conservative (bank, law firm) or professional-current (modern agency)? Should it feel established or fresh?" |
| "With some pop" / "eye-catching" | Wants ONE bold element, rarely a loud site | "Pop from color (one vivid accent), from type (huge headlines), or from motion (things animate in)?" |
| "Simple" | Either minimal aesthetic OR easy to use — very different | "Simple as in *looks* spare and calm, or simple as in *nothing is confusing* (which any style can achieve)?" |
| "Like Apple" | Premium restraint, big product imagery | Confirm: whitespace + huge visuals + few words. Ask: "Do you have imagery strong enough to carry that?" (If not, steer toward type-led premium.) |
| "Fun / playful" | A spectrum from friendly-rounded to circus | "Fun like Duolingo/Notion (friendly, tidy) or fun like a skate brand (loud, rule-breaking)?" |
| "Luxurious / high-end" | Whitespace, serif, muted palette, slow pace | Confirm materials: "Quiet luxury (beige, serif, spare — Aesop) or glamorous luxury (black + gold, dramatic)?" |
| "Trustworthy" | Industry-dependent trust signals | Identify category norms from `industries.md` — trust is mostly content (reviews, credentials, clarity), then reinforce with a conservative palette |
| "Minimalist" | Often means "not cluttered," not true minimalism | "Truly spare (things removed until it almost hurts) or just uncluttered (everything has room)?" |
| "Like [competitor] but better" | A real spec! | Ask what specifically is better: nicer looking, clearer, faster, more premium? Open the competitor site as reference material |
| "I trust you / whatever you think" | Decision fatigue, not absence of taste | Compress: pick the 3 highest-leverage remaining questions, present as this-or-that pairs. Their taste will show up as vetoes in Phase 2 — plan for one extra research round |

---

## Answer-to-style mapping

Translate Round 2 vectors into 2-3 candidate styles from `references/styles.md` (read the full entries there before committing). Directional map:

| Signal combination | Candidate styles |
|---|---|
| Quiet-gallery + light + near-no color + neutral type | Refined Minimalism; Swiss International; Monochrome + Single Accent |
| Quiet-gallery + luxury cues (premium price, serif) | Quiet Luxury; High-Fashion Minimal |
| Office-lobby + light + restrained color | Refined Minimalism; Soft SaaS Gradient |
| Startup-buzz + light + colorful + subtle motion | Soft SaaS Gradient; AI Gradient Mesh; Friendly Approachable Minimal |
| Startup-buzz + dark + technical type | Dark Developer-Tool Minimal; Terminal/CLI accents |
| Dark + dimensional + rich motion | Glassmorphism (dark); Aurora Glow |
| Street-market + sharp/flat + expressive type | Neo-Brutalism; Big-Type Manifesto |
| Editorial voice + light + airy | Magazine Editorial; Editorial Humanist |
| Friendly-rounded + colorful + playful | Rounded Friendly; Candy Pop |
| Organic business (wellness, food, craft) + warm | Organic Warm Minimal; Botanical Natural; Warm Earth |
| Dense + web app | Utilitarian App Shell (see layouts.md app patterns) |

Present style candidates to the user **only** via Phase 2's example sites — never as a vocabulary quiz. The mapping's job is to target the research, not to be user-facing.

---

## Discovery Summary template

End Phase 1 by mirroring this back and getting explicit confirmation. Keep it under ~20 lines; every line traceable to an answer (mark defaults).

```markdown
## Discovery Summary — [Project name]

**Building:** [product type + one-line description]
**Why now / success looks like:** [the trigger + what's different 3 months post-launch]
**For:** [audience + what they already know/want]
**#1 visitor action:** [the conversion]
**Perception gap:** [described as X today → should read as Y]
**Exists already:** [brand assets / current site / content status]
**Decides:** [solo / +who else, and who breaks ties]

**Direction signals:**
- Energy: [e.g., calm-premium, leaning quiet-gallery]
- Mode: [light / dark / light-with-dark-sections]
- Color: [appetite + any known brand colors]
- Type voice: [e.g., editorial serif headlines]
- Density: [airy / balanced / dense]
- Shape & depth: [e.g., soft-rounded, subtle shadows]
- Motion: [none / subtle / rich]
- Never: [anti-preferences, verbatim where possible]
- Admired sites: [any user-named URLs]

**Category notes (from industry playbook):** [2-3 must-haves and anti-patterns]
**Pages:** [list] · **Content:** [real / placeholder] · **Stack:** [detected/chosen] (defaulted items marked)

Candidate style directions for research: [2-3 internal style names]
```

Mark each direction signal with its evidence grade where it matters: answers the user actually gave vs your inferences vs defaults. Inferences and defaults are the lines to watch in Phase 2 — the example sites will confirm or overturn them cheaply.

Once confirmed, proceed to Phase 2 with `references/research.md`.
