# Typography

Typography decisions for design briefs and site builds: how to structure a type system, which font pairings to pick for a given personality, and how to implement them without layout shift or readability failures. Every font named here is freely available on Google Fonts unless explicitly flagged otherwise.

**When to read this file:** while constructing the design brief (to choose the pairing and scale) and again when writing the `<head>` and CSS (to implement loading and the scale correctly).

## Table of contents

1. [System rules](#1-system-rules)
   - [Typeface count](#typeface-count)
   - [Type scale ratios](#type-scale-ratios)
   - [Fluid type with clamp()](#fluid-type-with-clamp)
   - [Line height](#line-height)
   - [Measure (line length)](#measure-line-length)
   - [Letter-spacing and optical adjustments](#letter-spacing-and-optical-adjustments)
   - [Minimum sizes](#minimum-sizes)
   - [Font-loading strategy](#font-loading-strategy)
2. [Curated pairings by personality](#2-curated-pairings-by-personality)
   - [Neutral / Modern](#neutral--modern)
   - [Geometric / Tech](#geometric--tech)
   - [Editorial Serif](#editorial-serif)
   - [Humanist Warm](#humanist-warm)
   - [Display / Expressive](#display--expressive)
   - [Rounded Friendly](#rounded-friendly)
   - [Mono / Technical](#mono--technical)
   - [Luxury](#luxury)
   - [Retro](#retro)
3. [Pairing construction rules (going off-catalog)](#3-pairing-construction-rules-going-off-catalog)
4. [Implementation snippets](#4-implementation-snippets)
5. [Type crimes table](#5-type-crimes-table)

---

## 1. System rules

### Typeface count

Use **exactly two typefaces maximum**: one display face for headings and one body face for everything else. Or use **one typeface with a strong weight gap** (e.g. 400 body, 700–800 headings) — this is the safer default for product UI. Every additional family multiplies load time, increases CLS risk, and dilutes the design's voice.

Add a **third, monospace face only when the content demands it**: code samples, terminal output, technical specs, data tables where digit alignment matters, or a deliberate "engineering" aesthetic. Never add a third face for decoration.

Load only the weights you use. Each weight is a separate file. A typical budget: display 1–2 weights, body 2–3 weights (400, 500 or 600, and 700 if you need bold inline emphasis). Skip weights you cannot point to a specific use for.

### Type scale ratios

Pick one ratio and derive every size from it. Ad-hoc font sizes are the most common giveaway of an unsystematic design.

| Ratio | Name | Use for | Character |
|---|---|---|---|
| 1.2 | Minor third | Apps, dashboards, dense UI, docs | Calm, compact, many sizes fit on screen |
| 1.25 | Major third | **Default** — marketing + product mix | Clear hierarchy without shouting |
| 1.333 | Perfect fourth | Marketing sites, landing pages, editorial | Dramatic jumps, big confident heroes |

Worked example — 1.25 (major third) scale from a 16px base, rounded to sensible values:

| Token | Calculation | Size | Typical use |
|---|---|---|---|
| `--text-xs` | 16 ÷ 1.25² | 10.24 → **11px** | Fine print, badges (use sparingly) |
| `--text-sm` | 16 ÷ 1.25 | 12.8 → **13px** | Labels, captions, table meta |
| `--text-base` | base | **16px** | Body copy, UI default |
| `--text-lg` | 16 × 1.25 | **20px** | Lead paragraphs, card titles |
| `--text-xl` | 16 × 1.25² | **25px** | h3 |
| `--text-2xl` | 16 × 1.25³ | 31.25 → **31px** | h2 |
| `--text-3xl` | 16 × 1.25⁴ | 39 → **39px** | h1 |
| `--text-4xl` | 16 × 1.25⁵ | 48.8 → **49px** | Hero (desktop mid) |
| `--text-5xl` | 16 × 1.25⁶ | 61 → **61px** | Hero (desktop large) |

With 1.2 the top of the scale lands around 40–48px (right for apps). With 1.333 it lands around 72–90px (right for a marketing hero). Do not use marketing-scale heroes inside a dashboard.

### Fluid type with clamp()

Use `clamp(min, preferred, max)` for headings so they scale smoothly between mobile and desktop with no breakpoint jumps. Body text stays fixed or nearly fixed — fluid body text harms readability more than it helps.

```css
:root {
  /* Hero display */
  --text-hero: clamp(2.5rem, 1.5rem + 5vw, 5rem);      /* 40px → 80px */
  /* h1 */
  --text-h1:   clamp(2rem, 1.4rem + 3vw, 3.5rem);      /* 32px → 56px */
  /* h2 */
  --text-h2:   clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem); /* 24px → 36px */
  /* h3 */
  --text-h3:   clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);/* 20px → 24px */
  /* Body: fixed, or a whisper of fluidity at most */
  --text-body: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);/* 16px → 18px */
}
```

Rules for writing your own clamp: the `rem` term in the preferred value keeps text scalable when users change browser font size (never use bare `vw` alone — it breaks zoom); the min must never drop body-adjacent text below 16px; test the midpoint at ~768px, which is where naive clamps look wrong.

### Line height

Line height moves **inversely with font size**. Big display type needs tight leading or it falls apart into disconnected lines; small body type needs room to breathe.

| Text role | Size range | line-height |
|---|---|---|
| Hero / display | 48px+ | 1.0–1.1 |
| h1–h2 | 30–48px | 1.1–1.2 |
| h3–h4 | 20–30px | 1.25–1.35 |
| Body copy | 16–18px | 1.5–1.7 |
| UI text (buttons, labels) | 13–16px | 1.2–1.4 (often single-line) |
| Captions / fine print | 11–13px | 1.4–1.5 |

Always write line-height unitless (`line-height: 1.5`, not `24px`) so it scales with the font size it inherits into.

### Measure (line length)

Keep body text between **45 and 75 characters per line**; 60–70ch is the sweet spot. Enforce it structurally:

```css
.prose { max-width: 65ch; }
```

Lines longer than 75ch make the eye lose its place on the return sweep — this is the single most common readability failure on AI-generated sites, because full-width containers get text poured straight into them. A hero subline can run shorter (30–45ch); never let any paragraph run wider than ~75ch regardless of layout.

### Letter-spacing and optical adjustments

Tracking also moves inversely with size:

- **Large geometric/grotesque sans display (40px+):** negative tracking, `-0.02em` to `-0.04em`. Inter, Space Grotesk, Manrope, and friends are spaced for body sizes; at display sizes they look loose and amateur without tightening.
- **Serifs at display size:** little to no negative tracking (`0` to `-0.01em`) — their forms already interlock.
- **All-caps labels, eyebrows, small caps:** positive tracking, `+0.05em` to `+0.12em`, plus `text-transform: uppercase` at 11–13px. Caps set tight are unreadable.
- **Body copy:** leave tracking at 0. Never track body text.

Other optical adjustments worth making:

- `text-wrap: balance` on headings prevents one-word orphan lines; `text-wrap: pretty` on paragraphs (progressive enhancement, safe to include).
- `font-feature-settings: "tnum"` (or `font-variant-numeric: tabular-nums`) on tables, timers, and stat counters so digits align.
- `-webkit-font-smoothing: antialiased` only for light text on dark backgrounds, where default rendering looks heavy.
- Hang punctuation and tighten `“` `‘` at the start of display lines if the font supports `opsz`/optical sizes — Fraunces, Newsreader, and Source Serif 4 have optical size axes; let them do the work.

### Minimum sizes

- **Body text: minimum 16px on mobile, no exceptions.** Below 16px, iOS Safari zooms the page when a form input is focused; also, 14px body on a phone at arm's length is genuinely hard to read.
- Form inputs specifically must compute to ≥16px on mobile for the same iOS zoom reason.
- Absolute floor for any text anywhere: 11px, and only for non-essential meta (badges, legal). If information matters, it gets 13px+.
- Interactive text (links, buttons) at 14px+ with adequate hit area (44px min touch target).

### Font-loading strategy

Web fonts are the top cause of layout shift on otherwise-fine sites. The recipe:

1. **`font-display: swap`** on every `@font-face` (Google Fonts does this via `&display=swap`). Text renders immediately in the fallback, then swaps.
2. **Preconnect** to the font hosts before the stylesheet request:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   ```
3. **Preload only if self-hosting** the one or two critical WOFF2 files (hero display weight, body 400): `<link rel="preload" as="font" type="font/woff2" crossorigin href="...">`. Do not preload five weights — it delays everything else.
4. **Metric-matched fallback stacks** so the swap does not reflow the page. Define a fallback whose metrics approximate the web font:
   ```css
   @font-face {
     font-family: "Inter-fallback";
     src: local("Arial");
     size-adjust: 107%;
     ascent-override: 90%;
     descent-override: 22.5%;
     line-gap-override: 0%;
   }
   :root { --font-body: "Inter", "Inter-fallback", system-ui, sans-serif; }
   ```
   Tune `size-adjust` until fallback and web font occupy the same line count (serif display fonts need a `Georgia`/`Times New Roman` local base instead of Arial). This is what actually prevents CLS — `swap` alone just makes the shift happen fast.
5. Prefer **variable fonts** when a family offers one (Inter, Fraunces, Sora, Manrope, Bricolage Grotesque, Newsreader, Source Serif 4, Baloo 2, Fredoka all do) — one file, all weights.

---

## 2. Curated pairings by personality

Rules for using this catalog: pick **one** pairing that matches the brief's personality; do not mix entries. "Display" weights are what you load for headings; "Body" weights cover copy, UI, and inline bold. Cross-references like "dark SaaS minimal" or "editorial" refer to overall site styles named in the styles reference.

### Neutral / Modern

Safe, contemporary, disappears behind the content. Default territory for product UI.

### Quiet Authority
- **Display:** Inter — 600, 700 (tracking -0.02em to -0.03em at display sizes)
- **Body:** Inter — 400, 500
- **Personality:** Invisible competence; the text just works.
- **Fits:** Dark SaaS minimal, dashboards, dev tools, docs, anything data-dense.
- **Watch out:** Inter below 20px in the Display cut loses its character entirely, and Inter everywhere reads as "template" — earn distinctiveness through color and layout instead.

### Vercel School
- **Display:** Geist — 500, 700 (by Vercel; now available on Google Fonts)
- **Body:** Geist — 400, 500 (add Geist Mono for code)
- **Personality:** Crisp, engineered, slightly cold modernism.
- **Fits:** Dev-tool landing pages, dark SaaS minimal, AI products, technical docs.
- **Watch out:** Very close to Inter in feel; the pairing only reads "Geist" when combined with generous whitespace and restrained color.

### Instrument Panel
- **Display:** Instrument Sans — 600, 700 (variable; supports width axis)
- **Body:** Instrument Sans — 400, 500
- **Personality:** Neutral with a hint of warmth in the curves — friendlier than Inter without being cute.
- **Fits:** Startup marketing, product UI, portfolios that want modern-but-human.
- **Watch out:** Only four weights in the static range; do not fake extra weights with `font-weight: 550`-style synthesis.

### Nordic Editorial
- **Display:** Schibsted Grotesk — 500, 700
- **Body:** Source Serif 4 — 400, 400 italic, 600
- **Personality:** Scandinavian newsroom — clean grotesque headlines over bookish serif copy.
- **Fits:** Editorial sites, newsletters, longform blogs, journalism, research publications.
- **Watch out:** Schibsted's quirky `g` and tight apertures look best at 32px+; below that it flattens into a generic grotesque.

### Geometric / Tech

Circles and precision. Reads as "product", "engineering", "future".

### Confident Tech
- **Display:** Space Grotesk — 500, 700 (tracking -0.02em at 40px+)
- **Body:** Inter — 400, 500, 600
- **Personality:** Assertive, technical, a little quirky in the terminals.
- **Fits:** Dark SaaS minimal, developer tools, AI/ML products, crypto-adjacent tech.
- **Watch out:** Space Grotesk as body text tires the eye fast — its idiosyncratic letterforms are display-only; keep it above 20px.

### Deep Space
- **Display:** Sora — 600, 700
- **Body:** Figtree — 400, 500, 600
- **Personality:** Sleek, rounded-geometric, quietly futuristic.
- **Fits:** Fintech, AI products, hardware/IoT marketing, dark gradient-accent styles.
- **Watch out:** Sora's wide forms eat horizontal space — hero headlines wrap sooner than expected; draft copy short.

### Friendly Geometry
- **Display:** Outfit — 600, 700
- **Body:** Outfit — 400, 500
- **Personality:** Geometric but approachable; rounder and lighter-hearted than Space Grotesk.
- **Fits:** Consumer SaaS, mobile-app landing pages, startups that want tech-but-warm.
- **Watch out:** Outfit's perfect circles make long body paragraphs feel monotonous; keep copy blocks short or swap body to Figtree.

### Product Grade
- **Display:** Manrope — 700, 800
- **Body:** Manrope — 400, 500 (add JetBrains Mono 400 for code)
- **Personality:** Balanced semi-geometric workhorse; serious without coldness.
- **Fits:** B2B SaaS, dashboards, pricing-page-heavy product sites, light-mode minimal.
- **Watch out:** Manrope's default tracking is loose at display sizes — apply -0.03em above 36px or headlines look airy and weak.

### Web3 Billboard
- **Display:** Unbounded — 500, 700 (headlines and hero only)
- **Body:** Manrope — 400, 500
- **Personality:** Expanded, loud, unmistakably crypto/futurist.
- **Fits:** Web3, gaming, bold dark styles with neon accents, event sites.
- **Watch out:** Unbounded is extremely wide — 3–5 words per hero line maximum, and never use it for anything below 24px.

### Cyber Interface
- **Display:** Chakra Petch — 600, 700
- **Body:** IBM Plex Sans — 400, 500
- **Personality:** Angular, HUD-like, sci-fi military.
- **Fits:** Gaming, esports, cybersecurity, sci-fi product themes, dashboards that want a tactical feel.
- **Watch out:** The squared corners read as costume outside gaming/security contexts — do not use for general SaaS.

### Editorial Serif

Words-first credibility. For content that wants to be read, not scanned.

### High-Contrast Classic
- **Display:** Playfair Display — 600, 700, 700 italic
- **Body:** Figtree — 400, 500
- **Personality:** Didone drama; fashion-magazine authority.
- **Fits:** Editorial, luxury-adjacent content, wedding/event sites, restaurant sites with classical ambition.
- **Watch out:** Playfair's hairline strokes disappear below 28px and on low-DPI screens — display sizes only, and test on a cheap monitor.

### Warm Wonk
- **Display:** Fraunces — 500, 600 (variable; set `"SOFT" 50, "WONK" 1` for character, or 0 for restraint)
- **Body:** Work Sans — 400, 500
- **Personality:** Old-style serif with a mischievous streak; warm, crafted, current.
- **Fits:** Food and beverage brands, indie products, editorial with personality, playful-but-grown-up styles.
- **Watch out:** Full-wonk Fraunces at large sizes can tip into novelty; use the optical size axis (`opsz`) and keep wonk for one or two hero moments.

### Longform Reader
- **Display:** Newsreader — 500, 600 (use the `opsz` axis for display cuts)
- **Body:** Newsreader — 400, 400 italic; Inter 400/500 for UI chrome
- **Personality:** Contemporary news serif, made for screens, effortless over thousands of words.
- **Fits:** Blogs, newsletters, documentation-as-essay, publications, personal writing sites.
- **Watch out:** Newsreader body wants 17–19px and 1.6+ line-height; at 15px it gets spindly.

### Old-Style Authority
- **Display:** Libre Caslon Text — 700, 400 italic
- **Body:** Albert Sans — 400, 500
- **Personality:** Centuries-old bookishness; trustworthy, institutional, literary.
- **Fits:** Law, academia, heritage brands, museums, serious nonprofits.
- **Watch out:** Libre Caslon Text has only 400/700 — no in-between weights, so hierarchy must come from size and italics.

### Trend Serif
- **Display:** Instrument Serif — 400, 400 italic (single weight)
- **Body:** Geist — 400, 500
- **Personality:** Skinny, elegant, extremely current — the serif of modern startup brands.
- **Fits:** AI startups, portfolios, design-studio sites, light minimal styles with one accent color.
- **Watch out:** One weight only, and it is delicate — needs 40px+ and generous surrounding whitespace; it cannot carry bold emphasis or small headings.

### Humanist Warm

Open apertures, hand-influenced curves. Reads as approachable and human.

### Approachable SaaS
- **Display:** Plus Jakarta Sans — 700, 800
- **Body:** Plus Jakarta Sans — 400, 500
- **Personality:** Friendly professionalism; rounded enough to be warm, structured enough to sell software.
- **Fits:** HR/health/edu SaaS, consumer fintech, onboarding-heavy products, light playful styles.
- **Watch out:** Its distinctive rounded terminals blur at 12px — keep captions in the 13px+ range.

### Everyday Warm
- **Display:** Work Sans — 600, 700
- **Body:** Lora — 400, 400 italic, 600
- **Personality:** Grounded and sincere; sans structure with bookish body warmth.
- **Fits:** Nonprofits, community organizations, coaching/wellness, local business sites.
- **Watch out:** Lora is calligraphic — at line-heights under 1.5 the brushy forms collide and look messy.

### Friendly Editorial
- **Display:** Albert Sans — 700, 800
- **Body:** Newsreader — 400, 400 italic
- **Personality:** Modern geometric-humanist headlines over a literary reading voice.
- **Fits:** Substack-style publications, agency blogs, content marketing with substance.
- **Watch out:** Both faces are quiet — this pairing needs strong color or layout to avoid blandness.

### Display / Expressive

Big personality up top. Body face must be a straight man.

### Clash Statement
- **Display:** Clash Display — 500, 600 (**Fontshare, not Google Fonts** — free license via Indian Type Foundry; self-host the WOFF2)
- **Body:** Inter — 400, 500
- **Personality:** Fashion-tech swagger; tight, punchy, premium.
- **Fits:** Agency portfolios, brutalist-adjacent modern styles, streetwear/e-commerce, bold startups.
- **Watch out:** Because it is not on Google Fonts, the loading strategy changes — self-host with `@font-face` + preload, and provide a metric-matched fallback or the hero will shift.

### Bricolage Energy
- **Display:** Bricolage Grotesque — 600, 800 (variable, with optical size axis)
- **Body:** Figtree — 400, 500
- **Personality:** Exuberant French grotesque; loud, warm, slightly off-kilter.
- **Fits:** Creative tools, events, playful brands, editorial with attitude.
- **Watch out:** At 800 weight the counters nearly close — keep negative tracking gentle (-0.01em max) or it clots.

### Poster Impact
- **Display:** Anton — 400 (single heavy weight; uppercase-leaning)
- **Body:** Work Sans — 400, 500
- **Personality:** Compressed shout; sports-poster urgency. (Bebas Neue is the taller, looser alternative with the same job.)
- **Fits:** Gyms, events, food trucks, campaign sites, brutalist and retro styles.
- **Watch out:** Anton needs positive tracking (+0.01–0.02em) at very large sizes despite being display type — set solid it becomes a black bar; and never set more than two lines of it.

### Brutalist Block
- **Display:** Archivo Black — 400
- **Body:** Archivo — 400, 500 (same superfamily)
- **Personality:** Blunt, unpolished-on-purpose, anti-decoration.
- **Fits:** Brutalist style, zines, portfolios, statement one-pagers.
- **Watch out:** Brutalism succeeds through disciplined grids underneath the rawness — Archivo Black with sloppy spacing is just ugly, not brutalist.

### Art Direction
- **Display:** Syne — 700, 800
- **Body:** Manrope — 400, 500
- **Personality:** Gallery-poster weirdness; wide, artsy, fashion-forward.
- **Fits:** Design studios, galleries, music/culture sites, experimental portfolios.
- **Watch out:** Syne's extreme width and quirky `y`/`a` glyphs read as illegible decoration below 28px.

### Rounded Friendly

Soft terminals, zero threat. For kids, pets, snacks, and delight-first brands.

### Bubble Brand
- **Display:** Fredoka — 500, 600 (variable)
- **Body:** Nunito Sans — 400, 600
- **Personality:** Soft, bouncy, instantly cheerful.
- **Fits:** Kids' products, pet brands, casual games, food delivery, playful light styles.
- **Watch out:** Fredoka at heavy weights plus bright colors tips into clip-art; anchor it with a near-black text color and real whitespace.

### Storybook
- **Display:** Baloo 2 — 600, 700
- **Body:** Quicksand — 400, 500
- **Personality:** Plump headline warmth over airy rounded body; picture-book energy.
- **Fits:** Education, children's apps, family services, community events.
- **Watch out:** Two rounded faces is the ceiling of sweetness — keep every other element (color count, shadows, icons) restrained or the design becomes candy floss.

### Mono / Technical

Fixed-width as a design statement, not just for code blocks.

### Terminal Chic
- **Display:** Space Mono — 700, 400 italic
- **Body:** Work Sans — 400, 500
- **Personality:** Retro-computing wit; typewriter meets NASA.
- **Fits:** Dev portfolios, hackathons, indie tools, brutalist and retro-tech styles.
- **Watch out:** Mono display headlines consume ~40% more width than proportional type — headlines must be short, and never set body paragraphs in mono.

### Engineering Plex
- **Display:** IBM Plex Mono — 500, 600
- **Body:** IBM Plex Sans — 400, 500 (superfamily — designed together)
- **Personality:** Serious industrial engineering; spec-sheet credibility.
- **Fits:** Infrastructure/API products, security tools, technical documentation, data-heavy dashboards. (JetBrains Mono or Geist Mono slot in as the code face for any other pairing in this file.)
- **Watch out:** All-mono headings work best in small doses — eyebrow labels, stat callouts, section numbers — with Plex Sans carrying the actual h1/h2 on marketing pages.

### Luxury

Thin strokes, wide tracking, classical proportions. Whisper, never shout.

### Runway
- **Display:** Cormorant Garamond — 300, 400, 500 italic
- **Body:** Figtree — 300, 400
- **Personality:** Haute-couture elegance; ethereal and expensive.
- **Fits:** Fashion, jewelry, high-end weddings, boutique hotels, luxury editorial.
- **Watch out:** Cormorant is famously light — it needs 48px+ display sizes and high-contrast backgrounds; at 300 weight on an image it simply vanishes.

### Gallery Placard
- **Display:** Italiana — 400 (single weight), uppercase with +0.08em tracking for section labels
- **Body:** Lora — 400, 400 italic
- **Personality:** Engraved-invitation refinement; minimal and precise. (Marcellus is the sturdier Roman-capital alternative if Italiana feels too thin.)
- **Fits:** Architecture firms, galleries, interior design, premium restaurants, luxury minimal styles.
- **Watch out:** Italiana has no bold and no lowercase-optimized body use — it is strictly a display face; all hierarchy below h2 falls to Lora.

### Roman Monument
- **Display:** Cinzel — 400, 600 (inherently uppercase, +0.05em tracking)
- **Body:** Lora — 400, 500
- **Personality:** Chiseled-in-stone gravitas; imperial, cinematic.
- **Fits:** Wineries, law with grandeur, film/fantasy projects, heritage luxury.
- **Watch out:** Cinzel reads as costume drama very quickly — one hero line and section labels only; sentence-length Cinzel is unreadable and kitsch.

### Retro

Borrowed nostalgia. Commit fully or not at all.

### Deco Revival
- **Display:** DM Serif Display — 400, 400 italic
- **Body:** DM Sans — 400, 500 (same superfamily)
- **Personality:** 1920s–meets–2020s; high-contrast glamour with modern hygiene.
- **Fits:** Cafés, cocktail bars, boutique brands, editorial with vintage warmth.
- **Watch out:** DM Serif Display has one weight — hierarchy comes from size and the italic, so plan the scale before building.

### Neon Nights
- **Display:** Righteous — 400
- **Body:** Nunito Sans — 400, 600
- **Personality:** 70s–80s signage glow; groovy and confident. (Monoton is the pure neon-tube novelty face — use it for a single word as decoration, never more; it is unreadable beyond that.)
- **Fits:** Music venues, arcades, diners, event promos, retro-playful styles.
- **Watch out:** Righteous plus saturated neon colors plus dark background is a lot — cap the palette at one glow accent and keep body areas calm.

---

## 3. Pairing construction rules (going off-catalog)

When the brief demands a pairing not listed above, construct one with these rules:

1. **Contrast the categories, not the details.** The reliable formulas: serif display + sans body; sans display + serif body; mono display + sans body; or one family with a large weight gap (400 body vs 700–900 display). Contrast between categories creates hierarchy for free.
2. **Never pair two similar sanses** (e.g. Inter + Figtree, Manrope + Outfit). They are different enough to look accidental and similar enough to look like a mistake. If both faces are sans, one must be dramatically different in width, weight, or construction (Unbounded + Manrope works; Inter + Instrument Sans does not).
3. **Match x-heights and overall color.** Set the same paragraph in both faces at 16px side by side: if one looks visibly larger or darker, adjust sizes per-face or pick again. Tall-x-height display faces (Inter, Manrope) pair badly with small-x-height serifs (Cormorant) at similar sizes — the serif looks shrunken.
4. **Use the superfamily shortcut.** Families designed together are pre-matched: IBM Plex Sans/Serif/Mono, DM Sans + DM Serif Display, Archivo + Archivo Black, Geist + Geist Mono, Instrument Sans + Instrument Serif. When in doubt, a superfamily beats a clever custom pairing.
5. **Give each face exactly one job.** Display face: h1–h3, hero, big numbers. Body face: everything else. The moment a face's role needs explaining, the system is broken.
6. **Audition at real sizes.** A pairing chosen from font-picker specimens at 64px will surprise you at 14px. Test the body face at 14–16px and the display face at its actual hero size before committing.

---

## 4. Implementation snippets

### Google Fonts loading (weights-only, swap enabled)

Request only the exact weights the pairing specifies. Example for "Confident Tech" (Space Grotesk 500/700 + Inter 400/500/600):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

For italic + weight combos use the tuple syntax: `family=Newsreader:ital,wght@0,400;0,600;1,400`. Do not request `100..900` full variable ranges unless you genuinely use many weights — it downloads more than needed.

### CSS custom properties for the type system

```css
:root {
  /* Families */
  --font-display: "Space Grotesk", "Inter-fallback", system-ui, sans-serif;
  --font-body: "Inter", "Inter-fallback", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "Cascadia Code", monospace;

  /* Scale (1.25 major third + fluid display) */
  --text-xs: 0.6875rem;   /* 11px */
  --text-sm: 0.8125rem;   /* 13px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.25rem;     /* 20px */
  --text-xl: 1.5625rem;   /* 25px */
  --text-2xl: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
  --text-3xl: clamp(2rem, 1.4rem + 3vw, 3.5rem);
  --text-hero: clamp(2.5rem, 1.5rem + 5vw, 5rem);

  /* Leading + tracking */
  --leading-display: 1.1;
  --leading-body: 1.6;
  --tracking-display: -0.02em;
  --tracking-caps: 0.08em;
}

h1, h2, h3 {
  font-family: var(--font-display);
  line-height: var(--leading-display);
  letter-spacing: var(--tracking-display);
  text-wrap: balance;
}
body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-body);
}
.eyebrow {
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: var(--tracking-caps);
  font-weight: 600;
}
.prose p { max-width: 65ch; }
```

### Tailwind config (v3 `tailwind.config` shown; in v4 declare the same tokens under `@theme`)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        xs: ['0.6875rem', { lineHeight: '1.45' }],
        sm: ['0.8125rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.25rem', { lineHeight: '1.5' }],
        xl: ['1.5625rem', { lineHeight: '1.35' }],
        '2xl': ['clamp(1.5rem,1.2rem+1.5vw,2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        '3xl': ['clamp(2rem,1.4rem+3vw,3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        hero: ['clamp(2.5rem,1.5rem+5vw,5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
    },
  },
};
```

Then use `font-display text-hero` on the h1 and `font-body text-base` on copy — never raw `text-[42px]` values that bypass the scale.

---

## 5. Type crimes table

Common typography mistakes on generated sites, and the fix. Audit the finished build against every row.

| # | Crime | Why it fails | Fix |
|---|---|---|---|
| 1 | `text-align: justify` on web copy | Browsers have no hyphenation-aware justification; produces rivers of whitespace | Left-align body text, always |
| 2 | Centered paragraphs longer than 2 lines | Ragged both sides; every line starts in a different place | Center only heroes/short blurbs; left-align everything longer |
| 3 | Three or more font families | Visual noise, slow loads, no clear voice | Max 2 families (+ mono only when content needs it) |
| 4 | Faux bold / faux italic (styling a weight that was not loaded) | Browser synthesizes distorted letterforms | Load every weight/style you reference; check the Google Fonts URL covers them |
| 5 | All-caps body paragraphs | Word shapes vanish; reading speed drops sharply | Caps for short labels only (≤3 words), with +0.05em tracking |
| 6 | Gradient or clipped-image text on body copy | Kills contrast and legibility; often breaks selection/screenshots | Gradient text for the hero h1 only, with a solid-color fallback |
| 7 | No fallback metrics → CLS on font swap | Page reflows when the web font lands; hurts UX and Core Web Vitals | Metric-matched `@font-face` fallback with `size-adjust`/overrides |
| 8 | 12–14px gray-on-gray labels (`#999` on `#f5f5f5`) | Fails WCAG contrast exactly where users squint | 13px minimum + a color that passes 4.5:1 |
| 9 | Body text below 16px on mobile | iOS zooms focused inputs; genuinely hard to read | 16px floor for body and all form inputs |
| 10 | Full-width paragraphs (90–120ch lines) | Eye loses the return sweep; text feels like a wall | `max-width: 65ch` on every prose block |
| 11 | Same line-height everywhere (e.g. 1.5 on the hero) | Multi-line display type drifts apart into separate strips | 1.05–1.2 on display, 1.5–1.7 on body |
| 12 | Display font used for body / body font used for hero | Display faces exhaust at paragraph length; body faces look generic huge | One job per face: display ≥20px, body for copy — as specified per pairing above |

---

## Modern type engineering (2026 addendum)

- **Fluid type must survive zoom.** A `clamp()` whose preferred value is dominated by `vw` fights browser zoom and can fail WCAG 1.4.4 (resize text — see technique F94). Keep a meaningful rem term: `clamp(2rem, 1.2rem + 2.6vw, 3.5rem)`, never `clamp(2rem, 5vw, 3.5rem)`. Test at 200% zoom.
- **Use variable-font axes deliberately.** ~40% of sites now load a variable font but most touch only weight. Worth using: `opsz` (optical sizing — auto with `font-optical-sizing: auto` — makes display cuts genuinely different from text cuts), `GRAD` (emphasis without reflow, great for dark-mode weight compensation), `wdth` (headline fitting without scale transforms). One well-used variable font can replace both families in tight-budget builds.
- **Role-based pairing framing.** Modern pairings are one *voice* (distinctive display face carrying brand recognition) + one *face* (quiet, capable text/UI family). The failure mode is two near-identical grotesques; the fix is structural contrast, not more fonts.
- **Fresh alternatives to the default stack** (all verified open/free): Google Sans Flex (wide-axis variable flagship), Mozilla Headline + Mozilla Text (characterful open pairing), Atkinson Hyperlegible Next (accessibility-first with real personality), Nata Sans, Asta Sans, Savate (display), Google Sans Code (mono). Reach for these when a brief risks producing "another Inter/Space Grotesk site" — but the catalog pairings remain safe defaults.
