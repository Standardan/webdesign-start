# Research — Finding Real Websites the User Can Point At

This file defines Phase 2: turning the Discovery Summary into 2-3 **user-approved live websites** ("Reference DNA"). Users who cannot describe what they want can instantly recognize it — this phase exists to put recognizable things in front of them. Do not skip it, and do not treat it as decoration: the approved references become the strongest constraint on the build.

**When to read this file:** at the start of Phase 2, with a confirmed Discovery Summary in hand.

## Contents

- [Process overview](#process-overview)
- [Step 1 — Build search queries](#step-1--build-search-queries)
- [Step 2 — Where to look: gallery sources](#step-2--where-to-look-gallery-sources)
- [Step 3 — Vet before presenting](#step-3--vet-before-presenting)
- [Step 4 — Presentation format](#step-4--presentation-format)
- [Step 5 — Reaction loop & Reference DNA](#step-5--reaction-loop--reference-dna)
- [The anchor library (no-search fallback)](#the-anchor-library-no-search-fallback)
- [Guardrails](#guardrails)

---

## Process overview

```
Discovery Summary
   → compose 3-5 search queries          (Step 1)
   → search web + galleries + anchors    (Step 2)
   → vet candidates, keep 4-6            (Step 3)
   → present with "why it matches you"   (Step 4)
   → collect per-site reactions          (Step 5)
   → converged? → write Reference DNA, confirm, exit to Phase 3
   → not converged? → refine and rerun once or twice (3 rounds max)
```

Target one round; expect two; cap at three. Mix candidate *sources*: 1-2 famous anchors the user may already know, 2-3 search/gallery finds, and — if the user named an admired site or competitor in discovery — always include it or its best-in-class sibling.

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

1. **Reachable.** Prefer sites you've confirmed are live (search snippets from the current year, or a successful fetch). A dead link torches trust in the whole exercise. If you can't verify liveness, present only well-known sites likely to be stable.
2. **Actually matches ≥3 discovery signals.** Write the mapping down before presenting — if you can't name which answers a site matches, it's filler.
3. **Respects the anti-preferences.** A candidate that trips a "never" is only allowed as the calibration outlier, explicitly labeled.
4. **Not grossly out of budget-league** unless flagged: showing a $200k agency masterpiece to a solo café owner is fine *if* you say "we'd borrow the mood, not the production values."
5. **Diverse set.** No two near-identical candidates; each earns its slot by testing a different variable (color temperature, density, type voice…).

## Step 4 — Presentation format

Present as links with rich descriptions (do not attempt screenshots — the user opens links in their own browser). Use exactly this shape:

```markdown
## Round [N]: React to these [5] sites

Open each for ~30 seconds. Gut reactions beat analysis.

### 1. [Site name] — [URL]
**What it is:** [one line]
**Why I picked it for you:** [tie to 2-3 SPECIFIC discovery answers — "you said calm +
premium: notice the amount of empty space around each product"]
**We'd borrow:** [the transferable elements — spacing, nav, color temperature, type scale]
**We'd change:** [what doesn't fit this project]

[... 4-6 total; label the outlier: "⚠ deliberately bolder than you said — checking the boundary"]

**For each site, reply with:**
- 😍 love it / 🙂 close, but… / 👎 not this
- AND the one thing that most drew you in or pushed you away
Shorthand is fine: "1😍 the spacing, 2👎 too corporate, 3🙂 colors yes layout no"
```

The "why I picked it for you" line is mandatory — it teaches the user that their answers steered the search, keeps you honest, and gives them something concrete to confirm or deny.

## Step 5 — Reaction loop & Reference DNA

**Interpreting reactions:**
- A reasoned 👎 is high-value data — it eliminates a whole region ("too corporate" kills corporate-refined even if other signals pointed there).
- 🙂 "close but" is the best signal to mine: ask (or infer) *which* half is right.
- Unexplained 😍 → one follow-up: "what's the first thing you liked?" Don't interrogate further.
- Contradictions (loves an airy site AND a dense one) → surface it: "these two pull opposite directions on density — which matters more on YOUR site?"

**Converged** = at least two strong positives with known reasons. Then write the Reference DNA and confirm it in one message:

```markdown
## Reference DNA (locked after your 👍)

- **Overall mood from [Site A]:** [e.g., generous spacing, one idea per screen]
- **Color & warmth from [Site B]:** [e.g., cream background, ink text, one persimmon accent]
- **[Component] treatment from [Site A]:** [e.g., understated nav, pill CTA]
- **Explicitly avoiding:** [from the 👎s — e.g., stock-photo corporate feel of Site C]
```

**Not converged after round 1** → build round 2 from the reaction reasons (new constraints in, dead regions out). **Still stuck after round 3** → stop searching; present 2-3 named *directions* (mini mood descriptions synthesized from every positive fragment) and have the user pick one. Do not loop forever; decision fatigue is real and Phase 3's brief digest is another checkpoint anyway.

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
- **Stay in the user's league.** Flag when a reference's effect depends on assets the user lacks (world-class photography, 3D team) and name the achievable version.
- **Don't editorialize the user's taste.** If they love the site you find mediocre, their taste wins — your job is coherence and execution quality, not aesthetic paternalism. Voice concerns once, through the lens of their own goals ("that density might slow the booking flow you said is #1"), then commit.
