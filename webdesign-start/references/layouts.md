# Layout & Page Structure Reference

Use this file when planning the structure of any web page: which sections it needs, in what order, at what widths, and how the layout degrades on smaller screens. Layout is decided before color or type — a page with the right section sequence and generous spacing looks professional even with default styling, while a page with the wrong structure cannot be rescued by polish. Read the relevant product-type formula, pick a hero pattern, then build top to bottom.

**When to read this file:** at the design-brief stage when planning a page, and again when scaffolding the HTML/JSX structure of each section.

## Table of contents

1. [Foundation](#foundation)
2. [Hero patterns](#hero-patterns)
3. [Section formulas per product type](#section-formulas-per-product-type)
4. [Navigation patterns](#navigation-patterns)
5. [Grid galleries & bento](#grid-galleries--bento)
6. [Responsive strategy table](#responsive-strategy-table)
7. [Anti-patterns](#anti-patterns)
8. [Pre-build layout checklist](#pre-build-layout-checklist)

---

## Foundation

### Container widths

| Context | Max width | Notes |
|---|---|---|
| Marketing pages | 1200–1280px | Center with auto margins; 24–32px side padding so content never touches the viewport edge |
| Text-heavy pages (articles, docs, legal) | ~720px (or `65ch`) | Reading measure of 60–75 characters per line; wider kills comprehension |
| App / dashboard | Full-bleed shell | The shell fills the viewport, but constrain inner panels, forms, and settings pages (~640–960px) so line lengths stay readable |
| Full-bleed sections | 100vw background | Let the background span the viewport but keep inner content inside the standard container — bleed color and imagery, not text |

Never let body text span the full width of a 1440px viewport. Constrain the text column even inside a wide section. A common professional move: a full-bleed colored section whose inner content sits in the 1200px container, with the text itself further constrained to ~640px.

### Spacing scale

Work on a 4px base with an 8px rhythm: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160. Every margin, padding, and gap should come from this scale — arbitrary values (13px, 27px) are the fastest way to make a page feel hand-rolled and amateur, because nothing lines up with anything else.

| Use | Desktop | Mobile |
|---|---|---|
| Vertical padding per section | 96–160px | 64–96px |
| Gap between heading and body inside a section | 16–24px | 12–16px |
| Gap between cards in a grid | 24–32px | 16–24px |
| Gap between a section's header block and its content | 48–64px | 32–48px |
| Padding inside a card | 24–32px | 20–24px |

Why generous whitespace matters: cheap sites cram content because every pixel feels precious; premium sites breathe because confidence needs no clutter. Compare any luxury brand site to a discount retailer — the single biggest visual difference is empty space. Doubling section padding is the highest-leverage change to make a template feel expensive. When in doubt, add space; users never complain that a site feels too calm.

### The 12-column mental model

Think in 12 columns even when you implement with flexbox: 12 divides cleanly into halves, thirds, quarters, and sixths, so every common layout maps onto it.

| Layout | Column split |
|---|---|
| Split hero | 7/5 or 6/6 |
| Feature triad | 4/4/4 |
| Sidebar + content | 3/9 or 4/8 |
| Article + TOC | 2/8/2 (TOC in a margin column) |
| Four-up card row | 3/3/3/3 |

Implementation guidance:

- **CSS Grid** for two-dimensional layouts: bento grids, card grids, page shells (`grid-template-columns: repeat(12, 1fr)` or explicit tracks like `minmax(0, 7fr) minmax(0, 5fr)`).
- **Flexbox** for one-dimensional rows: navbars, button groups, meta rows, tag lists, footer link rows.
- Use `gap` for spacing between grid/flex children, never margins on the children themselves — margins leak, double up, and break when the layout reflows at a breakpoint.
- Asymmetric splits (7/5, 8/4) read as more designed than perfect 6/6 halves; prefer them for hero and feature rows unless the two sides are truly equal in importance.
- `minmax(0, 1fr)` instead of bare `1fr` prevents long unbreakable content (URLs, code) from blowing out a grid track.

### Breakpoints (mobile-first)

| Token | Min width | Typical change |
|---|---|---|
| base | <640px | Single column, everything stacked, larger touch targets |
| sm | 640px | Two-up cards, inline form rows, side-by-side buttons |
| md | 768px | Split heroes activate, sidebars appear, nav links replace hamburger |
| lg | 1024px | Full grid layouts, 3–4 column card rows, sticky sidenotes |
| xl | 1280px | Container caps out; only whitespace grows beyond this |

Write base styles for mobile and add complexity upward with `min-width` queries. Designing desktop-first then squeezing down produces cramped mobile layouts, because you end up subtracting space instead of adding it. Most real traffic on marketing and local-business sites is mobile; the phone layout is the primary layout, not the afterthought.

### Vertical rhythm

Keep a consistent beat down the page:

- Pick one section-padding value (e.g. 128px desktop / 80px mobile) and use it everywhere. Deviate only deliberately — a tight social-proof strip hugging the hero, or a hero that intentionally bleeds into the section below.
- Keep heading-to-content and card-gap values identical across sections. When one section uses 96px padding and the next uses 40px, the page feels stitched together from different sites.
- Alternate section background subtly (white → faint neutral → white) to delineate sections without borders; the rhythm of the backgrounds should follow the rhythm of the padding.

---

## Hero patterns

Universal hero rules, regardless of pattern:

- **Headline states an outcome, not a feature.** "Ship invoices in 30 seconds," not "A modern invoicing platform." The visitor should know what they get, in their own vocabulary, within one line. Formula: verb + concrete result + (optionally) timeframe or audience.
- **One primary CTA.** A single high-contrast button. If a secondary action is required, make it visually quiet (ghost or text link). Two equally weighted buttons split conversion.
- **Social proof adjacent to the CTA.** A logo strip, star rating, or "12,000 teams use X" line within one glance of the button de-risks the click at the exact moment of decision.
- Keep hero copy short: eyebrow (optional) → headline (≤10 words) → subhead (1–2 sentences) → CTA row → proof line.
- The hero should communicate even if every image fails to load — never put the core message only in an image.

### 1. Centered stack

```
|         eyebrow          |
|      BIG HEADLINE        |
|       subheadline        |
|   [ CTA ]  (ghost link)  |
|  logo logo logo logo     |
```

- **When:** the default for SaaS and product launches; works when you have no strong visual asset yet, or when the message alone carries the pitch.
- **Conversion notes:** the symmetry funnels all attention to the button; put the logo strip directly beneath the CTA row. Optionally follow with a large framed product screenshot below the fold line.

### 2. Split text / visual

```
| HEADLINE         |  ...........  |
| subheadline      |  .  visual  . |
| [ CTA ] (ghost)  |  ...........  |
| * proof line     |               |
```

- **When:** you have a strong product image, illustration, or photograph. Use a 7/5 or 6/6 split with text on the left — scan flow starts top-left in LTR languages, so the message lands before the decoration.
- **Conversion notes:** the visual must show the outcome (the product working, the happy result), not generic decoration. A screenshot beats an abstract illustration for products that can be shown.

### 3. Full-bleed image + overlay

```
|##########################|
|##                      ##|
|##  HEADLINE            ##|
|##  subhead   [ CTA ]   ##|
|##########################|
```

- **When:** hospitality, real estate, travel, photography, fitness — anywhere atmosphere and emotion sell before information does.
- **Conversion notes:** apply a gradient or scrim overlay (darken 30–50%, or a bottom-up gradient) so text passes contrast requirements; never set text on a raw photo. Keep the focal point of the photo away from the text block.

### 4. Product screenshot hero

```
|        HEADLINE           |
|     subhead   [ CTA ]     |
|  .----------------------. |
|  | o o o  browser bar   | |
|  |                      | |
|  |   app screenshot     | |
|  '-------(bleeds off)---' |
```

- **When:** SaaS with a good-looking UI. The screenshot is the proof.
- **Conversion notes:** wrap the screenshot in browser-frame chrome (rounded top bar, three dots, optional URL pill) — a bare screenshot floats ambiguously, a framed one reads as "real software." Let the frame bleed off the bottom of the hero into the next section for depth, or tilt/elevate it with a soft shadow.

### 5. Bento hero

```
| HEADLINE     | [ 2x2 demo ] |
| sub  [CTA]   | [   cell   ] |
| [1x1] [1x1]  | [ 2x1 cell ] |
```

- **When:** products with several distinct capabilities to tease at once — dev tools, AI products, platforms.
- **Conversion notes:** the anchor cell must contain the money shot (live demo, hero screenshot); small cells hold stats, micro-features, or a testimonial. Follow the [bento construction rules](#grid-galleries--bento) — no filler cells.

### 6. Video hero

```
|###### looping video #######|
|##  HEADLINE               #|
|##  subhead    [ CTA ]     #|
|############################|
```

- **When:** motion is the product — fitness, events, agencies with showreels, physical products in use.
- **Conversion notes:** autoplay muted, loop, no visible controls, provide a poster image, compress hard (a few MB max). Same overlay-contrast rule as the full-bleed image. The headline must work with the video absent — never rely on the footage to carry the message.

### 7. Big-type manifesto

```
| WE BELIEVE SOFTWARE       |
| SHOULD FEEL ————— AND     |
| NEVER —————.              |
|                [ CTA ]    |
```

- **When:** agencies, studios, brand-led companies where attitude is the differentiator. Type at 6–10vw, often no imagery at all.
- **Conversion notes:** weak for direct response — the manifesto creates intrigue, so the section immediately below must convert it (selected work, client logos). Keep the statement to one idea; a three-paragraph manifesto is a blog post.

### 8. Form-in-hero (lead gen)

```
| HEADLINE          | .----------. |
| benefit bullet    | | name     | |
| benefit bullet    | | phone    | |
| benefit bullet    | | [ Send ] | |
| * proof line      | '----------' |
```

- **When:** lead-gen businesses — insurance, quotes, B2B demo requests, newsletters — where the form submission IS the conversion.
- **Conversion notes:** 3–5 fields maximum above the fold; every extra field cuts completion measurably. Put concrete reasons to submit beside the form (bullets, not paragraphs) and a privacy reassurance line under the button ("No spam. Reply within 1 business day.").

### 9. Asymmetric editorial

```
| HEADLINE spanning         |.....|
| eight columns, breaking   |.img.|
| across lines              |.....|
|          caption —— [CTA]       |
```

- **When:** magazines, portfolios, fashion, culture — audiences that read design fluency as credibility.
- **Conversion notes:** offset the headline, overlap image and text slightly, use whitespace as a design element. Intentionally low-pressure; the CTA can be a text link. The asymmetry must sit on a real grid (see [anti-patterns](#anti-patterns)).

### 10. 3D / illustration hero

```
| HEADLINE        |   \o/     |
| subhead         |  3D or    |
| [ CTA ] (ghost) |  illo     |
```

- **When:** fintech, crypto, dev infrastructure, APIs — abstract products with nothing to screenshot.
- **Conversion notes:** the illustration should metaphorically depict the outcome (connection, growth, security), not just float as decoration. Use one consistent illustration style across the entire site — a 3D hero with flat-icon features below reads as stock-asset soup.

### Choosing a hero: quick decision table

| Situation | Pick |
|---|---|
| SaaS with a polished UI | Product screenshot hero (4) or split (2) |
| SaaS/platform with many capabilities | Bento hero (5) |
| No visual asset yet, message is strong | Centered stack (1) |
| Atmosphere sells (restaurant, hotel, travel) | Full-bleed image + overlay (3) |
| Motion is the product | Video hero (6) |
| Agency/studio selling taste | Big-type manifesto (7) or asymmetric editorial (9) |
| Lead-gen where the form is the conversion | Form-in-hero (8) |
| Abstract product, nothing to screenshot | 3D/illustration hero (10) |

---

## Section formulas per product type

These are ordered top-to-bottom sequences. Follow the order — it mirrors the visitor's questions in the order they ask them: *What is it? Is it for me? Can I trust it? How does it work? What does it cost? What now?* Skip a section only when the product genuinely has nothing for it; never reorder trust before clarity.

### SaaS landing (the classic 10-section formula)

| # | Section | Guidance |
|---|---|---|
| 1 | Nav | Logo left, 4–6 links, one CTA button right |
| 2 | Hero + social-proof strip | Outcome headline, single CTA, grayscale customer-logo strip directly beneath |
| 3 | Problem / agitation | Name the pain in the visitor's own words before selling the cure; 2–3 sentences or three pain-point cards |
| 4 | Feature triad | Three cards, icon + title + 2-line body: the three pillars of the product, not an exhaustive list |
| 5 | Deep-dive alternating rows | 2–4 rows of screenshot/text alternating sides; each row = one job-to-be-done with its own mini-headline and benefit copy |
| 6 | Integration / how-it-works | Logo grid of integrations, or a numbered 3-step "how it works" — pick whichever answers the visitor's bigger objection |
| 7 | Testimonials | One featured quote with face + name + title + company, or a 3-up grid; specificity converts ("cut onboarding from 3 weeks to 2 days"), generic praise doesn't |
| 8 | Pricing | 2–4 tiers, middle tier visually highlighted as "Most popular"; annual/monthly toggle if applicable; every tier gets its own CTA |
| 9 | FAQ | 5–8 questions in an accordion; answer real objections (security, data migration, cancellation), not softballs |
| 10 | Final CTA | Full-width band restating the outcome headline + the same primary CTA; the catch-net for visitors who scrolled everything |
| 11 | Footer | Fat footer: sitemap columns + legal + social |

### E-commerce home page

| # | Section | Guidance |
|---|---|---|
| 1 | Nav | Logo, category links, search field, cart icon with count badge |
| 2 | Hero | Full-bleed seasonal/campaign image, one offer, one CTA ("Shop the collection") |
| 3 | Category tiles | 4–6 image-led tiles; this is the real navigation for browsers |
| 4 | Featured products | One row of bestsellers or new arrivals with price + quick-add |
| 5 | Value-props strip | Free shipping / easy returns / guarantee — 3–4 icons in a slim band |
| 6 | Brand story or lookbook | One editorial moment that differentiates from marketplace sellers |
| 7 | Social proof / UGC | Review highlights or customer photos |
| 8 | Email capture | Discount incentive ("10% off your first order") |
| 9 | Footer | Fat footer with help links (shipping, returns, sizing) prominent |

### E-commerce product page (PDP anatomy)

```
| gallery              | buy-box                |
| [   main image   ]   | Title      ★★★★☆ (213) |
| [th][th][th][th]     | $price   (was $strike) |
|                      | size/color selectors   |
|                      | [   Add to cart    ]   |
|                      | ✓ free returns ✓ secure|
|--------------------------------------------- |
| description / specs / shipping (tabs)         |
| reviews: filterable, photo reviews first      |
| cross-sell: "Pairs well with" product row     |
```

- Gallery left (50–60% width), buy-box right; make the buy-box sticky on scroll so the add-to-cart button never leaves the viewport.
- Star rating + review count beside the title (it persuades up top); full review content lives further down the page.
- Trust badges (returns, secure checkout, warranty) directly under the add-to-cart button — that is the exact moment of doubt.
- Variant selectors must show availability state (disabled ≠ invisible) and update price/imagery immediately.
- Cross-sell comes after reviews, never before the add-to-cart decision is made — don't offer exits from the buy path.

### Portfolio / creative

Work first — the grid IS the hero:

| # | Section | Guidance |
|---|---|---|
| 1 | Nav | Minimal: name/logo, Work, About, Contact |
| 2 | Positioning line | One sentence: who you are, what you make, for whom |
| 3 | Work grid | Immediately — no "about" essay before the work; 4–8 best pieces, quality over quantity |
| 4 | About blurb | 2–3 sentences plus a face; personality, not a résumé |
| 5 | Contact | A real email link is fine; a form is optional |

**Case study anatomy:** hero image → project title + one-line summary + meta table (client, role, year, stack) → the problem (short) → the process (selective — 3 key decisions, not a diary) → the outcome with numbers where possible → large final imagery → next-project link at the bottom so the visitor never dead-ends.

### Agency

| # | Section | Guidance |
|---|---|---|
| 1 | Nav | Minimal, with a "Start a project" CTA |
| 2 | Positioning hero | Manifesto or big-type; say what kind of clients and what kind of work — "we do everything" positions you as nothing |
| 3 | Selected work | 3–6 case-study cards, strongest first; each card shows client, outcome, and a striking visual |
| 4 | Capabilities | Short list of service categories, not a 30-item menu |
| 5 | Process | 3–5 numbered steps; showing a process de-risks hiring you |
| 6 | Team | Real photos with a consistent crop and treatment; no stock people |
| 7 | Logos / testimonials | Client logos plus 1–2 quotes with names and titles |
| 8 | Contact CTA | Real email address and an expected response time |
| 9 | Footer | Minimal-to-medium |

### Restaurant / hospitality

Mobile-first is mandatory — most traffic is a phone in a parking lot deciding where to eat.

| # | Section | Guidance |
|---|---|---|
| 1 | Nav | Name, Menu, Reservations, Contact; keep it tiny |
| 2 | Hero | Full-bleed atmosphere shot (interior or signature dish) with scrim; name + one-line cuisine descriptor + **Reserve** and **View menu** buttons |
| 3 | Essentials strip | Hours, address, phone — visible within the first scroll; this is what most visitors came for |
| 4 | Menu | Reachable in ≤1 click from anywhere; rendered as HTML, never a PDF (PDFs are unreadable on phones and invisible to search) |
| 5 | Gallery | Atmosphere strip: food, room, people |
| 6 | About / chef | Short — one paragraph of story |
| 7 | Reservations | Embed or link to the booking system |
| 8 | Map + practical | Embedded map, parking notes, transit |
| 9 | Footer | Hours repeated, social, phone |

Add a sticky bottom bar on mobile: **Call / Directions / Reserve**.

### Local service business (plumber, electrician, dentist, lawyer)

Trust-first — the visitor is comparing three tabs and picking whoever feels least risky.

| # | Section | Guidance |
|---|---|---|
| 1 | Nav | Phone number visible in the header, always |
| 2 | Hero | Plain-language headline ("Emergency plumbing in [City], fixed today") + phone CTA + quote-form CTA |
| 3 | Review strip | Aggregate stars + review count + platform logos, immediately under the hero |
| 4 | Services grid | 6–9 cards, each a real job type the customer would search for |
| 5 | Service area | City/suburb list or a map — answers "do they even come to me?" |
| 6 | Why us / credentials | Licensed, insured, years in business, guarantees, badges |
| 7 | Testimonials | 2–3 full quotes with names and towns — local specificity builds trust |
| 8 | Quote form | Name, phone, brief description — nothing more; every extra field loses leads |
| 9 | FAQ | Pricing approach, response time, warranty |
| 10 | Footer | License numbers, hours, service-area list repeated (helps local search) |

**Sticky call button on mobile at all times** — the highest-value conversion is a phone tap.

### Blog / content / media

**Front page:** nav with search → featured story (large card: image, kicker, headline, dek) → latest grid (2–3 columns of consistent cards) → category rails if volume warrants → newsletter capture band mid-page → footer.

**Article page:**

| Element | Guidance |
|---|---|
| Measure | 65–72ch column, line-height 1.6–1.8 |
| Header | Kicker/category → headline → byline + date + read time |
| Hero image | Optional; skip when it would be generic stock |
| TOC | Sticky in a margin column when the article exceeds ~1,500 words |
| Newsletter capture | Inline, roughly mid-article, once — not a popup |
| After body | Author bio card → related posts (3-up) → footer |

Never interrupt the reading column with full-width promos; readers who hit one leave.

### Web app / dashboard

A shell, not a section sequence:

```
| topbar: logo | global search      | notif | avatar |
|--------+---------------------------------- --------|
| side   |  Page title              [ + New thing ]  |
| nav    |  [stat] [stat] [stat] [stat]               |
|        |  .------------------.  .---------------.   |
| item   |  |                  |  | activity      |   |
| item   |  |   main chart     |  | feed          |   |
| item   |  '------------------'  '---------------'   |
| ----   |  table of records                          |
| item   |                                            |
```

- Sidebar 240–280px, collapsible to an icon rail at md, drawer on mobile. Group items under labeled section headings; keep it under ~8 top-level items.
- Topbar holds global concerns (search, notifications, account); sidebar holds navigation. Don't duplicate between them.
- Content area pattern: page title + primary action top-right → stat-card row → main work surface (chart, table, kanban, list).
- Constrain forms and settings pages to ~640–720px even inside the full-bleed shell.
- **Design empty states deliberately:** icon or small illustration + one line explaining what will appear here + a CTA that creates the first item. A blank table with no guidance reads as broken software, and every new user sees the empty state first.

### Event / launch landing

Single page, single goal (register or buy):

| # | Section | Guidance |
|---|---|---|
| 1 | Nav | Anchor links + a persistent "Get tickets" button |
| 2 | Hero | Event name, date + city as the subhead, countdown timer, register CTA |
| 3 | What / why | One tight paragraph: what happens and why it matters |
| 4 | Speakers / highlights | Photo grid with names and titles; faces sell events |
| 5 | Schedule | Agenda list, tabbed by day if multi-day |
| 6 | Venue | Map, address, travel and hotel notes |
| 7 | Tickets | Tiered (early bird / standard / VIP); highlight the tier you want sold; honest scarcity ("40 left") works, fake countdowns destroy trust |
| 8 | Sponsors | Logo strip, tiered sizes if needed |
| 9 | FAQ | Refunds, recordings, accessibility, dress code |
| 10 | Final CTA | Countdown repeated + register button |
| 11 | Footer | Minimal: organizer contact, legal |

Add a sticky "Get tickets" button once the hero scrolls away.

### Personal / résumé site

One page unless there is a real portfolio:

| # | Section | Guidance |
|---|---|---|
| 1 | Hero | Name, one-line role positioning ("I build data pipelines for climate startups"), photo optional, icon links to email/GitHub/LinkedIn |
| 2 | Bio | 3–5 sentences, first person, human |
| 3 | Experience / projects | Timeline or 3–5 selected projects, each with a one-line impact statement |
| 4 | Skills | Grouped plain text, not progress bars — "80% JavaScript" is meaningless |
| 5 | Writing / talks | Only if real |
| 6 | Contact footer | A plain email address beats a form |

Keep it under five screens; recruiters spend seconds, not minutes.

### Nonprofit

| # | Section | Guidance |
|---|---|---|
| 1 | Nav | A visually distinct **Donate** button — the highest-contrast element on the page |
| 2 | Mission hero | Emotional image + plain statement of who you help and how + Donate CTA |
| 3 | Impact numbers | 3–4 big stats (meals served, acres protected, students taught) — numbers convert skeptics |
| 4 | The problem | Told through one person or place, not statistics; one story outperforms a data dump |
| 5 | Programs | What-we-do cards, one per program |
| 6 | Transparency | Financials link, ratings badges, "% goes to programs" |
| 7 | Stories | Testimonials from beneficiaries, not board members |
| 8 | Other ways to help | Volunteer, monthly giving, corporate matching |
| 9 | Donate section | Preset amounts + custom field + monthly toggle (monthly donors are worth far more) |
| 10 | Footer | EIN/registration number, financial reports, contact |

Donate must be reachable from every scroll position — the sticky nav button suffices.

---

## Navigation patterns

### Marketing navbar anatomy

```
| logo    Features  Pricing  Blog  About    Log in [ Sign up ] |
```

- Logo left, 4–6 text links, one filled CTA button on the far right. Log-in as a quiet text link beside the CTA if needed.
- More than 7 items? Don't cram — group into a mega-menu: dropdown panels with labeled columns, an icon + one-line description per link, and generous padding. A mega-menu without clear column headings reads as chaos.
- Height 64–80px; horizontal padding matches the page container so the logo aligns with content below.
- The nav CTA should repeat the hero's primary action ("Start free trial"), not introduce a competing one.

### Sticky behavior

- Make the navbar sticky on marketing pages — the CTA should always be one glance away.
- On scroll: shrink height slightly (80 → 64px), add a solid or blurred background, and a subtle bottom border or shadow so the bar separates from content.
- A transparent-over-hero navbar must transition to a solid background on scroll, or it will collide illegibly with page content.
- Optional refinement: hide on scroll-down, reveal on scroll-up — reclaims space while keeping the nav reachable.

### Mobile drawer rules

- Collapse to a hamburger below md (768px). Hamburger right, logo stays left; keep the CTA button visible outside the drawer if space allows — the highest-value action should not hide behind a tap.
- Drawer: full-screen or right-side panel; links at 18px+ with 48px tap targets; the CTA button pinned at the bottom of the drawer; an obvious close affordance.
- Lock body scroll while the drawer is open; animate open/close under 250ms; close the drawer on link tap (anchor links otherwise leave it hanging open).
- Nested groups (from a mega-menu) become accordions inside the drawer.

### Footer anatomy

**Fat footer (multi-page sites)** — acts as sitemap + trust anchor:

```
| logo + one-liner   | Product  | Company | Resources | Legal   |
| newsletter field   | Features | About   | Blog      | Privacy |
| social icons       | Pricing  | Careers | Docs      | Terms   |
|-----------------------------------------------------|---------|
| (c) 2026 Name                       Privacy · Terms · [locale] |
```

Fat footers catch bottom-of-page visitors who scrolled everything without converting — give them somewhere to go. Keep column headings short and links scannable; 4–6 links per column.

**Minimal footer (single-page sites, portfolios):** one row — copyright, 2–3 links, social icons. A fat footer on a one-page site advertises how little content exists.

### Breadcrumbs

- Add breadcrumbs when hierarchy depth ≥3 (Home → Category → Subcategory → Item): e-commerce category trees, documentation, large content sites.
- Place directly above the page title; plain text links with a lightweight separator (`/` or `›`); current page unlinked.
- Mark up with structured data (BreadcrumbList) for search results.
- Skip breadcrumbs on flat marketing sites — they add noise without orientation value.

---

## Grid galleries & bento

### Bento construction rules

Bento grids fail when treated as decoration. Rules:

1. **One anchor cell.** A 2x2 (or at least 2-wide) cell containing the hero content of the grid. Without an anchor, the eye has no entry point and the grid reads as a broken table.
2. **Mix cell sizes deliberately:** one 2x2 anchor + a few 2x1 + several 1x1. All-same-size is just a card grid; all-different-sizes is chaos. Two or three distinct cell sizes is the sweet spot.
3. **Consistent gap everywhere** (16–24px) and consistent corner radius on every cell — mismatched radii inside one grid look like a copy-paste accident.
4. **Every cell earns its place with real content** — a stat, a micro-demo, a screenshot crop, a testimonial, a mini-chart. No filler cells: an empty gradient tile or decorative blob tells the visitor you ran out of things to say.
5. Cap at 5–8 cells; beyond that, split into two sections.
6. Implement with CSS Grid: `grid-template-columns: repeat(4, 1fr)` and `grid-column: span 2; grid-row: span 2;` on the anchor. Give cells a consistent internal padding and let content, not the frame, differentiate them.

```
| [   2x2 anchor    ] [1x1] [1x1] |
| [   live demo     ] [ 2x1 stat] |
| [1x1] [1x1] [    2x1 quote    ] |
```

### Card grid consistency

In a uniform card grid, every card must share the same anatomy: same image aspect ratio, same padding, same title size, same meta position, same CTA placement. Enforce it:

- Fix image ratios with `aspect-ratio` and `object-fit: cover` — never let differently-sized source images change card heights.
- Clamp titles and excerpts to a fixed line count (`-webkit-line-clamp`) so one long title doesn't push its row.
- CSS Grid equalizes row heights automatically; with flexbox use `align-items: stretch` and push footers down with `margin-top: auto`.
- Inconsistent card internals are one of the most common tells of a rushed build; the grid is only as strong as its sloppiest card.

### Masonry

Use masonry (variable-height columns) only when content heights genuinely and unavoidably vary — photo galleries, mixed-media portfolios, testimonial walls. Do not force uniform content into masonry for visual interest: it breaks scan order because the eye can no longer track rows. Simple implementation is CSS `columns`; note that it orders content down each column, so if left-to-right priority order matters, use a JS layout or explicit column assignment.

---

## Responsive strategy table

Decide the mobile form of every pattern before building the desktop version. Defaults:

| Desktop pattern | Mobile strategy |
|---|---|
| Split hero (text/visual) | Stack: text first, visual below; crop or drop the visual if it adds nothing small |
| Full-bleed image hero | Keep full-bleed; increase overlay darkness; verify the headline wraps to ≤3 lines |
| Bento grid | Single column, cells ordered by priority (anchor first) — not by their desktop grid position |
| Alternating feature rows | All rows stack identically: image first, then text — do NOT alternate stacking order; image/text/text/image confuses scan flow |
| 3–4 column card grid | 1 column (2 at sm only if cards are compact) |
| Pricing table (3–4 tiers) | Stacked cards with the recommended tier first, or horizontal scroll with `scroll-snap` and a visible peek of the next card |
| Comparison/data table | Horizontal scroll inside its own `overflow-x` container, or reflow rows into label/value cards; never let a table force page-level horizontal scroll |
| Sidebar app shell | Sidebar becomes a hamburger drawer, or a bottom tab bar for ≤5 top destinations |
| Sticky article TOC | Collapses into a tap-to-expand disclosure above the article body |
| Mega-menu | Accordion groups inside the mobile drawer |
| Multi-column fat footer | Stack the columns; accordion them if >4 groups |
| Inline form row (input + button) | Stack full-width, button below the input |
| Stat/number strip (4-up) | 2x2 grid, not a 4-item column |
| Logo strip | Wrap to two rows or gentle auto-scroll; shrink logos, keep them legible |

Universal mobile rules:

- 44–48px minimum tap targets, with adequate spacing between adjacent targets.
- Body text stays ≥16px (also prevents mobile-browser zoom-on-focus for inputs at 16px+).
- Hero headlines drop roughly 40–50% from desktop size; use `clamp()` so sizes scale fluidly between breakpoints instead of jumping.
- Side padding 16–24px; no element may cause horizontal page scroll — test with wide images, tables, and long unbroken strings.

---

## Anti-patterns

Do not build these, even when they appear in reference sites the user admires:

- **Carousel/slider heroes.** Nobody sees slide 2 — interaction rates on rotating banners are near zero, auto-rotation yanks content away mid-read, and each additional slide dilutes the message. If stakeholders have three messages, pick the one that converts and give the others their own sections below.
- **Walls of same-size cards.** Twelve identical cards in a 4x3 grid read as a directory, not a designed page, and give the visitor no cue about what matters. Break the wall: feature one card larger, group into labeled subsections, or cut the list to the best six.
- **Centered body text blocks.** Center headlines and short standalone lines only. Center-aligning a paragraph destroys the consistent left reading edge, so every line starts in a new place and reading speed drops. Left-align anything longer than two lines.
- **Fake asymmetry that breaks scan flow.** Random offsets, rotated cards, and scattered elements without an underlying grid don't read as creative — they read as broken. Asymmetry works only when it is systematic: a consistent 7/5 split, a deliberate overlap repeated as a motif, one intentional grid violation per screen at most.
- **Section zebra-striping with strong colors.** Alternating white/brand-blue/white/brand-blue backgrounds chops the page into stripes and exhausts the eye. Vary section backgrounds subtly (white → faint neutral → white) and reserve a strong background for one or two moments — typically the final CTA band.
- **Infinite alternating rows.** The image-left/image-right pattern goes monotonous after 3–4 rows and the visitor stops registering which side is new. If there are more features to show, switch the rhythm: after three alternating rows, use a card grid, a tabbed showcase, or a bento for the remainder.
- **Content-free decoration.** Gradient blobs, empty "aesthetic" bento tiles, and stock photos of handshakes fill space while communicating nothing. Every block should answer a visitor question; if it doesn't, delete it and let whitespace do the work — whitespace is cheaper and looks better.
- **Popups before value.** A newsletter modal on page load, before the visitor has read a single paragraph, converts poorly and poisons trust. Use inline capture points and, at most, one exit-intent or scroll-depth trigger.
- **Burying the primary action.** On mobile service/restaurant sites, the phone number or reservation button hidden inside a hamburger menu costs real conversions — keep the single most valuable action visible or sticky at all times.

---

## Pre-build layout checklist

Run through this after drafting the page structure and before writing styles:

1. **Section sequence matches the product-type formula** — or every deviation has a stated reason in the brief.
2. **One primary CTA per page**, repeated in nav, hero, and final CTA band; no competing equally-weighted actions.
3. **Container widths assigned:** marketing content in the 1200–1280px container, any long-form text constrained to ~65–72ch.
4. **All spacing values come from the 4/8px scale**, and section padding is consistent page-wide (one desktop value, one mobile value).
5. **Every section has a mobile plan** from the responsive strategy table — decided now, not discovered during QA.
6. **Trust elements sit next to decision points:** logos/stars near the hero CTA, badges under add-to-cart, reviews before pricing.
7. **No anti-patterns present:** no carousel hero, no >4 consecutive alternating rows, no centered paragraphs, no strong-color zebra striping, no filler cells.
8. **The page works image-free:** headline, section headings, and CTAs alone still tell the full story if every asset fails to load.
9. **Scroll length is proportionate:** a landing page is typically 6–11 sections; if the draft has 15, merge or cut — every extra section costs finishers.
10. **Empty, loading, and error states are specified** for any app shell or dynamic list before build starts.
