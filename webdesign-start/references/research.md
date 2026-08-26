# Research — Finding Real Websites the User Can Point At

This file defines Phase 2: turning the Discovery Summary into 2-3 **user-approved live websites** and a **Reference Translation Matrix**. Users who cannot describe what they want can instantly recognize it — this phase exists to put recognizable things in front of them, inspect what they chose, and convert it into implementation obligations. Do not skip it, and do not treat it as decoration: approved references become the strongest visual constraint on the build.

**When to read this file:** at the start of Phase 2, with a confirmed Discovery Summary in hand.

## Contents

- [Process overview](#process-overview)
- [Step 1 — Build search queries](#step-1--build-search-queries)
- [Step 2 — Where to look: gallery sources](#step-2--where-to-look-gallery-sources)
- [Step 3 — Vet before presenting](#step-3--vet-before-presenting)
- [Step 4 — Presentation format](#step-4--presentation-format)
- [Step 5 — Reaction loop](#step-5--reaction-loop)
- [Step 6 — Inspect approved references](#step-6--inspect-approved-references)
- [Step 7 — Build the Reference Translation Matrix and Blend Contract](#step-7--build-the-reference-translation-matrix-and-blend-contract)
- [The anchor library (no-search fallback)](#the-anchor-library-no-search-fallback)
- [Guardrails](#guardrails)

---

## Process overview

```
Discovery Summary
   → inspect user-supplied examples first
   → compose 3-5 search queries          (Step 1)
   → search web + galleries + anchors    (Step 2)
   → vet candidates, keep 4-6            (Step 3)
   → present with "why it matches you"   (Step 4)
   → collect per-site reactions          (Step 5)
   → converged? → inspect approved sites deeply (Step 6)
   → record every liked trait verbatim in the Liked Trait Ledger
   → map all liked traits + the cross-reference blend (Step 7)
   → confirm ledger, matrix, and blend; exit to Phase 3
   → not converged? → refine and rerun once or twice (3 rounds max)
```

**User-supplied examples come first.** Open every URL or screenshot the user provided before composing searches. Treat these as pre-qualified candidates, not as one more source to dilute among assistant choices. If they already cover the needed dimensions, skip broad discovery search; search only for a missing dimension or a more achievable sibling.

**Competitor intelligence is separate and mandatory when competitors/category leaders are known.** Open their actual current pages and record: first-three-second message, one promise, above-fold evidence, primary action, scroll argument, trust signals, motion restraint, and the clearest friction or unanswered question. End with one concrete way this project will outperform each competitor (clearer, more credible, faster, more premium, or more distinctive). A competitor does not become an aesthetic reference unless the user separately approves its traits. If a page cannot be reached, mark it unverified rather than describing it from reputation or a snippet. Feed this sweep into the Creative Direction Blueprint and Conversion-Critical Section Spec in `strategic-loops.md`.

When more candidates are needed, target one round; expect two; cap at three. Mix candidate *sources*: 1-2 famous anchors the user may already know and 2-3 search/gallery finds.

Aim for a spread, not six clones: if discovery says "calm premium serif," present four takes on that plus one deliberate outlier a notch bolder. The outlier calibrates the boundary — users often discover their real taste by rejecting (or unexpectedly loving) it.

## Step 1 — Build search queries

Compose queries from Discovery Summary slots. Recipes (substitute freely):

| Intent | Query shape |
|---|---|
| Category best-of | `best [product type] website designs [current year]` |
| Style × category | `[style keyword] [category] website examples` — e.g. `minimal dark developer tool landing page` |
| Gallery-scoped | `[category or style] site:awwwards.com` / `site:land-book.com` / `site:godly.website` |
| Competitor sweep | `[user's competitor] alternatives` then check their sites |
| Local/industry | `award winning [industry] website` — e.g. `award winning restaurant website design` |
| Component-level (later rounds) | `[pattern] examples` — e.g. `pricing page design examples SaaS` |

Translate discovery vocabulary into search vocabulary: "quiet gallery + luxury" → *minimal luxury brand website*; "street market energy" → *brutalist bold web design*; "startup buzz + dark + technical" → *dark saas landing page developer tools*.

Prefer results from the last ~2 years for trend-sensitive directions (gradient-tech, AI-native); timeless directions (editorial, swiss, luxury minimal) age fine.

## Step 2 — Where to look: gallery sources

Curation galleries beat raw search — every entry is already a strong design. Match the gallery to the need:

| Gallery | URL | Strongest for |
|---|---|---|
| Awwwards | awwwards.com | High-craft, animation-rich, agency/creative |
| Godly | godly.website | Modern startup/SaaS, current trends |
| Land-book | land-book.com | Broad landing pages, filterable by industry |
| Lapa Ninja | lapa.ninja | Landing pages by category, huge volume |
| SaaS Landing Page | saaslandingpage.com | SaaS specifically, by section type too |
| One Page Love | onepagelove.com | Single-page sites, launch/event pages |
| Minimal Gallery | minimal.gallery | Minimalism done well |
| Dark Design | dark.design | Dark-mode-first sites |
| Siteinspire | siteinspire.com | Editorial, architecture, studio, refined |
| Httpster | httpster.net | Typographic, brutalist, unconventional |
| Commerce Cream | commercecream.com | Shopify/e-commerce excellence |
| Curated Design | curated.design | Broad, well-tagged, current |
| Seesaw | seesaw.website | Contemporary studio/product mix |
| Mobbin | mobbin.com | App UI patterns (dashboards, mobile) |
| Refero | refero.design | Real product app/web screens by flow |
| Footer/Navbar galleries | footer.design, navbargallery.com | Component-level reference in later rounds |

Practical approach with web search: search `site:godly.website dark saas` or fetch a gallery's category page and pull featured site names, then verify the *featured sites themselves* (the gallery page is the index, the featured site is the reference).

## Step 3 — Vet before presenting

Every candidate must pass:

1. **Reachable.** Open the actual destination, not only a search result or gallery listing. A dead link torches trust in the whole exercise.
2. **Visually inspected.** Search snippets discover candidates; they do not support claims about layout, spacing, type, imagery, or motion. Inspect the live page or an attached screenshot before describing those traits. If you lack visual browsing, say so and keep observations limited to what you can verify.
3. **Actually matches ≥3 discovery signals.** Write the mapping down before presenting — if you can't name which answers a site matches, it's filler.
4. **Respects the anti-preferences.** A candidate that trips a "never" is only allowed as the calibration outlier, explicitly labeled.
5. **Not grossly out of budget-league** unless flagged: showing a $200k agency masterpiece to a solo café owner is fine *if* you say "we'd borrow the mood, not the production values."
6. **Diverse set.** No two near-identical candidates; each earns its slot by testing a different variable (color temperature, density, type voice…).

## Step 4 — Presentation format

Present as links with rich descriptions. The user should still open the links; your inspection tells them where to look. Include a screenshot only when it materially clarifies a transient state, a long page, or a user-provided reference they cannot reopen. Use exactly this shape:

```markdown
## Round [N]: React to these [5] sites

Open each for ~30 seconds. Gut reactions beat analysis.

### 1. [Site name] — [URL]
**What it is:** [one line]
**Why I picked it for you:** [tie to 2-3 SPECIFIC discovery answers — "you said calm +
premium: notice the amount of empty space around each product"]
**Look at:** [direct their attention to 1-2 specific things — "the spacing and the button
style; ignore their photography, yours will differ"]
**We'd borrow:** [the transferable elements — spacing, nav, color temperature, type scale]
**We'd change:** [what doesn't fit this project]

[... 4-6 total; label the outlier: "⚠ deliberately bolder than you said — checking the boundary"]

**For each site, reply with:**
- 😍 love it / 🙂 close, but… / 👎 not this
- AND the one thing that most drew you in or pushed you away
Shorthand is fine: "1😍 the spacing, 2👎 too corporate, 3🙂 colors yes layout no"
```

The "why I picked it for you" line is mandatory — it teaches the user that their answers steered the search, keeps you honest, and gives them something concrete to confirm or deny. The "look at" line matters just as much: agencies learned that unguided reference reviews fail because an incidental photo or a dated blog section poisons a reaction to typography that was actually perfect. Tell the user what each reference is *for* — a spacing reference, a color reference, a voice reference — and what to ignore.

**Two reactions per site when stakes are high.** For business sites, ask both "do YOU like it?" and "would it work on YOUR customers?" — the split between personal attraction and strategic fit is exactly where founder taste conflicts with the site's job, and it's far cheaper to surface that here than after the build.

## Step 5 — Reaction loop

**Interpreting reactions:**
- A reasoned 👎 is high-value data — it eliminates a whole region ("too corporate" kills corporate-refined even if other signals pointed there).
- 🙂 "close but" is the best signal to mine: ask (or infer) *which* half is right.
- Unexplained 😍 → one follow-up: "what's the first thing you liked?" Don't interrogate further.
- Contradictions (loves an airy site AND a dense one) → surface it: "these two pull opposite directions on density — which matters more on YOUR site?"

### Liked Trait Ledger: listen without cherry-picking

Create the ledger while reactions happen, using the user's words rather than a compressed design summary:

| Reference | User's exact liked trait | Importance | Inspection target | Status |
|---|---|---|---|---|
| [site] | [quote or faithful near-verbatim phrase] | primary / supporting | [hero media / large motion / nav / type / density / etc.] | pending inspection |

- Split compound reactions into separate traits. “I like the feel, the large animations, the picture taking over everything, and the small nav” is four obligations, not “luxury feel” plus whichever one is easiest to code.
- A broad “I like all of this” requires a quick confirmation of the 2–4 dominant things the user means, informed by what is actually visible. Do not make them name design jargon.
- Do not discard a dominant trait because it needs assets, custom composition, a premium component, or more work. Record the dependency; solve it at the Asset Readiness Gate.
- A later prioritization may resolve conflicts, but it cannot silently erase a liked trait. Any trait deliberately omitted needs the user's explicit approval and a recorded reason.

**Converged** = at least two strong positives with known reasons. From the 4-6 sites you presented, positive and "close-but" traits become implementation candidates; rejected traits become explicit avoidances. Do not jump directly from these reactions to generic mood words. Proceed to deep inspection and translation.

**Not converged after round 1** → build round 2 from the reaction reasons (new constraints in, dead regions out). **Still stuck after round 3** → stop searching; present 2-3 named *directions* (mini mood descriptions synthesized from every positive fragment) and have the user pick one. Do not loop forever; decision fatigue is real and Phase 3's brief digest is another checkpoint anyway.

## Step 6 — Inspect approved references

Reopen each positively rated site from the presented set after the user explains what they like. This second inspection is required even if you opened it while vetting candidates: now you know which traits the user meant. Inspect the homepage plus any page/state that contains the liked feature. When a visual browser or screenshots are available, use them and check desktop and mobile because responsive behavior is part of the design. Do not draft the matrix from memory, search snippets, or the candidate-presentation copy. Capture observations in these buckets:

1. **Page silhouette:** section order, hero proportion, density shifts, full-bleed vs contained areas.
2. **Layout rhythm:** container width, whitespace, alignment, grid behavior, text measure.
3. **Typography:** serif/sans/mono roles, scale contrast, weight, casing, line height.
4. **Color distribution:** background/surface relationship, accent frequency, contrast, warmth.
5. **Shape and depth:** radii, borders, shadows, dividers, card containment.
6. **Components:** nav, CTA, cards, forms, footer, repeated content patterns.
7. **Media:** photography/illustration/product UI role, crop, aspect ratio, placement.
8. **Motion and interaction:** entrance hierarchy, hover behavior, sticky/scroll treatment.

Record only observable details. Distinguish what the user explicitly liked from what you merely observed: approval of one trait is not approval of the whole site.

Reconcile the inspection with the Liked Trait Ledger before translation. For every ledger item, capture the page/state where it appears, its role in the experience, and the measurable or visually testable relationship that makes it work. Pay special attention to dominant traits: full-bleed imagery, the focal object, hero scale, major motion, unusual density, or scroll choreography. These define resemblance more strongly than a border, radius, or nav height.

### Measure, don't vibe: the Reference Teardown

A qualitative note ("big serif hero, warm palette") is not enough to build from — at build time the model will quietly substitute its own defaults for every value the note left unspecified, and the user will correctly say the reference was ignored. So for each approved reference, when any inspection capability exists, produce a **Reference Teardown** of hard values. With a browser tool, read computed styles directly (a small script over `getComputedStyle` on the hero heading, body text, a label, the nav, a primary button, and two section wrappers covers most of it). With only screenshots, estimate and mark every value `~est`. Capture at minimum:

```markdown
### Teardown — [site] ([page], [date])
- Ground: bg [value] · text [value] · temperature [warm/cool/neutral]
- Borders/hairlines: [value, weight]
- Accent: [value] · appears as [fill/glow/underline/text] on [elements] · roughly [N] solid instances per viewport
- Display type: [face or closest classification], [weight], hero ~[px], tracking [normal/tight/−n%], line-height ~[n]
- Body: [face class], [size]/[line-height], measure ~[n]ch
- Label/third voice: [treatment, size, casing, tracking] or "none"
- Nav: height ~[px], [solid/translucent+blur], [border?], [n] links + [CTA?]
- Container: ~[px] max · section vertical padding ~[px] desktop
- Radius: [values seen] · Shadows: [none / recipe]
- Hero anatomy: [what actually occupies it — text %, media %, what the media is]
- Section rhythm: [order + density shifts, e.g. "spacious statement → dense spec table → spacious"]
- Motion: [entrance style, hover style, sticky behavior, or "none observed"]
```

Attach each teardown beneath the Reference Translation Matrix in the brief. These numbers are *calibration*, not a clone kit: the build adapts them (different hue, different face, own content) while preserving the measured **relationships** — the scale contrast, the density, the temperature, the accent discipline. The line between the two: a stranger comparing the sites should say "same league, same taste," never "same site reskinned."

If no inspection capability exists at all, say so, write the teardown from the user's screenshots or skip to qualitative notes marked as such — and never present unverifiable numbers as measured.

If a reference cannot be reached:

- If it is a primary reference or owns a liked trait, obtain a screenshot, screen recording, user-provided capture, or another inspectable artifact before locking the brief. This is a blocking evidence gap: do not continue from reputation, a search snippet, or a textual description of the site's category.
- If it is genuinely optional, mark it uninspected and ask the user whether to remove it or keep it explicitly as non-binding context.
- Never quietly substitute your memory of a past version of the site.

## Step 7 — Build the Reference Translation Matrix and Blend Contract

Translate each approved trait into an original project decision. Use this format:

```markdown
## Reference Translation Matrix (locked after your 👍)

| Priority | Source + observed evidence | User's signal | Original translation for this project | Target in our site | Fidelity check |
|---|---|---|---|---|---|
| P1 | [Site A]: oversized left-aligned serif hero, narrow copy measure, product image enters below fold | "Love the breathing room and type" | Editorial hero with our headline in a 10-column grid; distinct typeface and proportions | Home hero | At 1440px the headline dominates; first supporting section only peeks below fold |
| P1 | [Site B]: warm off-white field with dark ink and rare orange CTA | "These colors feel right" | Accessible cream/ink palette with our brand accent reserved for actions | Global tokens, buttons | Accent appears on primary actions only; contrast passes |
| P2 | [Site A]: restrained text nav with one compact CTA | "Nav feels simple" | Six-item maximum nav with one bordered booking action | Global header | No mega-menu; CTA is visually secondary to hero |
| Avoid | [Site C]: dense three-column card wall | "Too busy" | Use alternating editorial sections; never more than two peer cards above fold | Home sections 2-4 | No generic three-card feature row |
```

Rules:

- Use all six columns shown above; do not collapse **Source + observed evidence** into a generic label such as "Site A: clean." Name the page/region and the concrete trait you inspected, citing teardown values where they exist ("hero ~96px/800 at −2.5% tracking", not "big bold type").
- Every P1 row's **Fidelity check** must be verifiable against the teardown: a pass condition someone could measure on the built site and compare to the measured reference relationship.
- Every Liked Trait Ledger item becomes a P1/P2 row. Compatible traits may share one row only when they have the same target and each remains individually verifiable.
- A **primary visual reference** must shape at least three macro dimensions and must include at least one of: page silhouette, focal media, or motion/scroll choreography. Chrome, color, radius, or nav height alone cannot represent a primary reference.
- “Mood only” is allowed only when the user explicitly agrees that the reference is non-binding. It cannot be used to hide an unreachable reference, an asset dependency, or a liked trait the assistant does not want to implement.
- Every positive row must name a concrete target: token, component, section, page, or interaction.
- Keep the matrix readable, but never cap away user-approved traits. Rank obligations P1/P2 and group only where verification stays unambiguous.
- Add explicit avoidances from negative reactions.
- Translation must preserve the trait without reproducing proprietary copy, assets, logos, or a distinctive composition wholesale.
- If references conflict, surface the conflict and ask which trait wins; do not average them into generic design.
- Confirm the matrix with the user. This confirmation locks what the references actually mean before the brief is written.

### Reference Blend Contract

After the matrix, assign each primary reference a visible job in the combined direction:

| Reference | Role in the blend | Macro dimensions owned | Dominant traits that must be recognizable | What we deliberately do not borrow |
|---|---|---|---|---|
| [Site A] | [hero art direction / page rhythm / product density / motion character] | [silhouette, media, type, density, motion, chrome, color] | [ledger item IDs or short trait names] | [brand-specific assets/copy/ornament] |

Rules:

- Across the blend, explicitly assign: page silhouette, first focal point, media ratio/crop, typography hierarchy, density rhythm, color distribution, chrome, and motion. Unassigned macro dimensions become model defaults.
- State the combined three-second read in one sentence: “This should feel like [reference role A] combined with [role B], expressed through this project's own content.”
- Do not average conflicting references into generic middle-ground design. Assign different roles or ask which wins.
- A reference may own small details in addition to macro roles, but a small detail cannot satisfy a missing dominant role.
- Confirm the Liked Trait Ledger, Reference Translation Matrix, and Reference Blend Contract together. The user should be able to point to every liked trait and see where it will appear.

## The anchor library (no-search fallback)

When no web search is available — or to seed candidates — use these widely-known, long-stable sites. Cite from knowledge, tell the user this came from a curated library rather than a live search, and note your knowledge may trail redesigns.

| Direction | Anchor sites | What they demonstrate |
|---|---|---|
| Dark developer-tool minimal | linear.app, vercel.com, planetscale.com | Dark restraint, type discipline, product-shot heroes |
| Gradient tech / AI-native | stripe.com, openai.com, raycast.com | Color-as-craft, gradient accents on clean structure |
| Friendly modern SaaS | notion.com, slack.com, figma.com | Approachable color, rounded shapes, illustration |
| Premium product minimal | apple.com, teenage.engineering | Whitespace + huge imagery, few words |
| Quiet luxury / craft | aesop.com, kinfolk.com, cos.com | Muted palette, serif restraint, unhurried pace |
| Editorial / magazine | nytimes.com, theverge.com, itsnicethat.com | Hierarchy at scale, type systems, article craft |
| Neo-brutalist / loud | gumroad.com, mschf.xyz, poolsuite.net (retro) | Rule-breaking, flat color, thick borders |
| E-commerce DTC | allbirds.com, glossier.com, rimowa.com (premium) | PDP anatomy, photography-led, trust placement |
| Restaurant/hospitality done right | noma.dk, sketch.london | Atmosphere-first, menu accessibility |
| Agency/studio | instrument.com, basicagency.com, pentagram.com | Work-first grids, confident type |
| Portfolio | brittanychiang.com (dev), many on siteinspire | Personal voice, case-study structure |
| Calm web app | linear.app (in-app views), height.app, todoist.com | App shells, density control |
| Playful/kids | duolingo.com, headspace.com | Friendly color, mascot energy, rounded everything |
| Nonprofit | charitywater.org | Story-first, impact numbers, donate UX |
| Big-type manifesto | basecamp.com (historically), stripe.com/atlas variants | Words as the design |

(Verify any anchor you present against current knowledge; drop ones you're unsure still match the description rather than risk a stale pick.)

## Guardrails

- **Inspiration, not duplication.** Borrow structure genres, spacing philosophy, color temperature, motion character. Never replicate a reference's distinctive layout wholesale, copy text, logos, illustrations, photography, or brand-identifiable elements. The finished site should look like a *sibling in taste*, not a twin.
- **No dead ends.** Never present a link you have reason to believe is broken, paywalled, or NSFW-adjacent.
- **Stay in the user's league without deleting the direction.** Flag when a reference's effect depends on assets the user lacks (world-class photography, product UI, game art, video, or 3D). Define the achievable representative asset and preserve the same visual role, or ask the user to approve a changed direction. A generic icon, gradient, or fabricated metric is not an achievable substitute for dominant media.
- **Don't editorialize the user's taste.** If they love the site you find mediocre, their taste wins — your job is coherence and execution quality, not aesthetic paternalism. Voice concerns once, through the lens of their own goals ("that density might slow the booking flow you said is #1"), then commit.
