# Color System Reference

This file defines how to construct, structure, and validate a complete color system for a website: token architecture, palette construction rules, dark mode derivation, ready-to-use industry palettes, gradient recipes, and accessibility checks. Every rule exists to produce interfaces that look deliberate, stay consistent across pages, and remain readable for all users. Use the industry palettes as starting points, not mandates — adjust hue and temperature to the specific brand, but keep the structural relationships (contrast ratios, saturation distribution) intact.

**When to read this file:** while writing the color section of a design brief, when choosing or deriving a palette for a new site, when adding dark mode, or when a page "looks off" and you suspect color is the cause.

## Table of Contents

1. [Token Architecture](#1-token-architecture)
2. [Palette Construction Rules](#2-palette-construction-rules)
3. [Dark Mode Derivation](#3-dark-mode-derivation)
4. [Industry and Mood Palettes](#4-industry-and-mood-palettes)
5. [Gradient Recipes](#5-gradient-recipes)
6. [Accessibility Quick-Check Table](#6-accessibility-quick-check-table)

---

## 1. Token Architecture

Structure every color system in three tiers. Never scatter raw hex values through component styles — route everything through tokens.

### The three tiers

| Tier | Examples | Rule |
|---|---|---|
| **1. Primitives** | `--blue-50` … `--blue-950`, `--gray-50` … `--gray-950` | Raw scales. Named by hue + step. Never referenced directly in components. |
| **2. Semantic** | `--background`, `--surface`, `--text-primary`, `--primary`, `--danger` | Named by *role*. Point at primitives. This is the tier components consume. |
| **3. Component** | `--button-bg`, `--card-border` | Only create when a component genuinely needs to diverge from semantic defaults. Most sites need zero of these. |

### Why semantic tokens beat raw hex

- **Theme switching**: dark mode becomes a re-mapping of ~14 semantic tokens instead of hunting hundreds of hex values through the codebase.
- **Consistency**: when every card reads `var(--surface)`, no card can drift to a slightly different white. Drift is the number one cause of "amateurish" pages.
- **Editability**: when a change request arrives ("make it feel warmer"), you edit one `:root` block instead of performing a risky find-and-replace across files. A single source of truth is also far easier to reason about when revisiting the project later.

### Required semantic token set

Define at minimum: `background`, `surface`, `surface-raised`, `text-primary`, `text-muted`, `border`, `primary`, `primary-hover`, `accent`, `success`, `warning`, `danger`, `focus-ring`.

### Complete example — sample brand ("indigo SaaS"), light and dark

```css
:root {
  /* ---- Tier 1: primitives ---- */
  --indigo-50:  #EEF2FF;
  --indigo-100: #E0E7FF;
  --indigo-200: #C7D2FE;
  --indigo-300: #A5B4FC;
  --indigo-400: #818CF8;
  --indigo-500: #6366F1;
  --indigo-600: #4F46E5;
  --indigo-700: #4338CA;
  --indigo-800: #3730A3;
  --indigo-900: #312E81;
  --indigo-950: #1E1B4B;

  /* Neutrals tinted toward the brand hue (see §2) */
  --gray-50:  #F8F9FC;
  --gray-100: #F1F2F8;
  --gray-200: #E4E6EF;
  --gray-300: #CDD0DE;
  --gray-400: #9CA0B5;
  --gray-500: #6E7288;
  --gray-600: #545975;
  --gray-700: #3D4059;
  --gray-800: #282A3D;
  --gray-900: #191B29;
  --gray-950: #101120;

  --cyan-500:  #06B6D4;
  --green-600: #16A34A;
  --amber-500: #F59E0B;
  --red-600:   #DC2626;

  /* ---- Tier 2: semantic (light) ---- */
  --background:     var(--gray-50);
  --surface:        #FFFFFF;
  --surface-raised: #FFFFFF;      /* differentiate with shadow in light mode */
  --text-primary:   var(--gray-900);
  --text-muted:     var(--gray-500);
  --border:         var(--gray-200);
  --primary:        var(--indigo-600);
  --primary-hover:  var(--indigo-700);
  --primary-fg:     #FFFFFF;      /* text on primary */
  --accent:         var(--cyan-500);
  --success:        var(--green-600);
  --warning:        var(--amber-500);
  --danger:         var(--red-600);
  --focus-ring:     var(--indigo-500);
}

[data-theme="dark"] {
  /* ---- Tier 2: semantic (dark) — re-map, never invert ---- */
  --background:     #0E0F16;
  --surface:        #16181F;
  --surface-raised: #1E2029;      /* elevation = lighter, not shadow */
  --text-primary:   #EDEEF3;
  --text-muted:     #9CA0B5;
  --border:         #2A2D3A;
  --primary:        var(--indigo-400);  /* lightened 2 steps */
  --primary-hover:  var(--indigo-300);
  --primary-fg:     #101120;            /* dark text on light primary */
  --accent:         #22D3EE;
  --success:        #4ADE80;
  --warning:        #FBBF24;
  --danger:         #F87171;
  --focus-ring:     var(--indigo-400);
}
```

Note the details that are easy to miss: `--primary-fg` flips from white to near-black in dark mode because the lightened primary no longer carries white text at 4.5:1 (white on `#818CF8` is 2.98:1 — a fail — while `#101120` on it is 6.3:1); state colors (`success`, `warning`, `danger`) are also lightened for dark backgrounds; and `surface-raised` gets its own lighter value because shadows are nearly invisible on dark backgrounds.

### Naming and usage rules

- **Primitives are named by hue + step, never by role.** `--blue-600` may serve as `--primary` today and be demoted tomorrow; the name must not lie when the mapping changes.
- **Semantic names describe the role, never the value.** `--text-muted`, not `--gray-500-text`. If a semantic token's name would become wrong when the theme changes, the name is bad.
- **Components consume semantic tokens only.** If a component style contains a raw hex or a primitive name, that is a defect — it will not respond to theme changes.
- **Derive interaction states, don't invent them.** Hover = one step darker on light themes, one step *lighter* on dark themes. Active/pressed = one further step. This keeps every interactive element consistent without per-component decisions.
- **Add alpha variants as tokens too** for overlays and tints, so transparency stays consistent: 

```css
:root {
  --primary-tint:   rgba(79, 70, 229, 0.08);   /* selected row, subtle bg */
  --primary-ring:   rgba(99, 102, 241, 0.35);  /* focus ring halo */
  --scrim:          rgba(16, 17, 32, 0.55);    /* modal backdrop */
}
```

- **Tier 3 exists for exceptions only.** A marketing hero that needs a one-off gradient, a syntax theme inside code blocks — wrap these as component tokens (`--hero-glow-1`) so even the exceptions are discoverable and editable in one place.

---

## 2. Palette Construction Rules

### 2.0 Choosing the brand hue

If the brief does not dictate a hue, choose by association, then verify against the industry palettes in §4:

| Hue | Reads as | Anchor hex | Typical fit | Caution |
|---|---|---|---|---|
| Blue | trust, competence, calm | `#2563EB` | finance, SaaS, healthcare | the default of defaults — pairs of blue sites blur together |
| Navy | authority, tradition | `#1E3A5F` | legal, enterprise, education | can feel cold without a warm accent |
| Green | growth, health, nature | `#16A34A` | wellness, sustainability, money | neon greens read synthetic |
| Teal | clean, modern, clinical | `#0F766E` | health-tech, dev tools | overused in "friendly corporate" |
| Purple/violet | imagination, premium tech | `#7C3AED` | AI, creative tools, beauty | now the cliché AI color — earn it or avoid it |
| Red | urgency, appetite, passion | `#DC2626` | food, sports, entertainment | conflicts with error semantics; plan the danger color first |
| Orange | energy, affordability, warmth | `#EA580C` | food, consumer, nonprofits | rarely works as the *only* dark-text-safe color |
| Amber/gold | optimism, luxury (dark bg) | `#B45309` | nonprofits, luxury accents | fails with white text at lighter steps |
| Pink/rose | playful, beauty, bold | `#BE185D` | beauty, lifestyle, events | drifts juvenile if oversaturated on large areas |
| Near-black | confidence, editorial | `#1C1917` | fashion, agencies, portfolios | demands strong typography to carry hierarchy |

### 2.1 The 60-30-10 distribution

Allocate color by area, not by enthusiasm:

- **~60%** — background/neutral (page background, large surfaces).
- **~30%** — secondary neutral (cards, section bands, text).
- **~10%** — brand + accent (CTAs, links, highlights, icons).

Why: saturated color derives its power from scarcity. When a saturated hue covers 40% of the viewport, the CTA that uses the same hue stops standing out, and the page reads as loud rather than confident. If a design feels garish, the fix is almost always to move color from the 60/30 zones back into the 10 zone — not to change the hue.

### 2.2 Tint the neutrals toward the brand hue

Never use pure gray (`#808080`-family) neutrals next to a strong brand color. Shift every neutral 2–6 degrees toward the brand hue:

| Brand | Pure gray (avoid) | Tinted neutral (use) |
|---|---|---|
| Blue `#2563EB` | `#F5F5F5` / `#6B6B6B` | `#F5F7FA` / `#64748B` |
| Green `#16A34A` | `#F5F5F5` / `#6B6B6B` | `#F6F9F5` / `#65756A` |
| Warm orange `#EA580C` | `#F5F5F5` / `#6B6B6B` | `#FAF7F2` / `#78716C` |

Why: pure gray next to a saturated hue reads as slightly *green-brown* due to simultaneous contrast — the eye tints neutrals with the complement of nearby color. Hue-tinted neutrals make the whole page feel like one material instead of a brand color pasted onto stock gray.

### 2.3 Exactly one saturated accent for CTAs

Pick one saturated hue and reserve it for actions (buttons, links, active states). Everything else on the page must be either neutral or clearly less saturated. When the user scans the page, the most saturated thing should always be the thing you want clicked. Secondary accents are allowed but must be visibly subordinate — smaller areas, lower saturation, or reserved for data/illustration.

### 2.4 Contrast minimums

| Element | Minimum ratio | Standard |
|---|---|---|
| Body text (< ~24px regular / < ~19px bold) | **4.5:1** | WCAG AA |
| Large text (≥ ~24px regular / ≥ ~19px bold) | **3:1** | WCAG AA |
| UI component boundaries (input borders, icons, focus rings) | **3:1** | WCAG AA (non-text) |
| Decorative dividers, disabled states | none required | — |

**How to eyeball, then verify:** while designing, use the rough heuristic that text must "hold" when you imagine the screen at 50% brightness in sunlight — if you hesitate, it fails. Then verify numerically before shipping: compute relative luminance contrast (any WCAG contrast formula implementation) for every text/background pair in the token set, including dark mode. Eyeballing catches gross errors; only computation catches the 4.2:1 near-misses, and near-misses are the common failure. The quick-check table in §6 covers frequent pairs.

### 2.5 State colors (success / warning / danger)

Construct state colors independently of the brand hue, then check for collisions:

| State | Light-mode fill/text | Dark-mode fill/text | Tint bg (light) | Rule |
|---|---|---|---|---|
| Success | `#16A34A` / white | `#4ADE80` / `#052E16` | `#F0FDF4` | never the only signal — pair with icon/text |
| Warning | `#F59E0B` / `#1F2937` | `#FBBF24` / `#1F2937` | `#FFFBEB` | amber almost always needs *dark* text |
| Danger | `#DC2626` / white | `#F87171` / `#450A0A` | `#FEF2F2` | reserve exclusively for errors and destruction |

Collision check: if the brand primary is red or orange, shift `danger` toward a distinct darker crimson (`#B91C1C`) and lean harder on iconography; if the brand is green, shift `success` toward teal (`#0D9488`) so "brand" and "it worked" stay distinguishable.

### 2.6 The squint test

Squint at the rendered page (or blur a screenshot ~8px). What survives the blur is the visual hierarchy. Verify:

1. The primary CTA is still the most visible colored element.
2. Sections still separate (background shifts survive the blur).
3. Nothing unimportant (a border, an icon, a decorative blob) dominates.

If a decorative element wins the squint test, desaturate or shrink it.

### 2.7 Common failure modes

| Failure | Symptom | Fix |
|---|---|---|
| Two competing saturated hues | Eye ping-pongs; CTAs don't stand out | Demote one hue to a desaturated or small-area role |
| Pure `#000000` on pure `#FFFFFF` | Harsh, vibrating text edges; fatigue on long reads (21:1 is *more* than needed) | Use near-black on near-white, e.g. `#18181B` on `#FAFAFA` (~16:1) |
| Oversaturated large backgrounds | Section band in full-strength brand color overwhelms content | Use a 50–100-step tint (e.g. `#EEF2FF` instead of `#4F46E5`) for large areas |
| Muted text below 4.5:1 | `#9CA3AF` body copy on white (2.5:1) | Darken to at least `#6B7280` on white |
| Same hue for links and errors | Users misread red links as failures | Keep `danger` reds exclusively for errors/destructive actions |
| Gray text on colored backgrounds | Muted gray on a tinted band looks dirty | Derive muted text by darkening the *band's own hue*, not by using gray |

---

## 3. Dark Mode Derivation

Dark mode is a re-design of the semantic layer, never a mechanical inversion. Inverting produces glowing borders, black cards on black pages, and unreadable brand colors.

Rules, in order:

1. **Background is dark gray, never `#000000`.** Target the `#0A0A0B`–`#16181D` range, tinted toward the brand hue. Pure black makes every surface and shadow disappear and maximizes smearing on OLED scrolling; near-black leaves headroom for elevation.
2. **Elevation = lighter surface, not shadow.** Shadows are nearly invisible on dark backgrounds. Encode raised-ness by lightening: background `#101116` → card `#181A21` → popover/modal `#20232C`. Keep steps small (4–6 points of lightness).
3. **Desaturate and lighten brand colors 1–2 scale steps.** A `-600` primary from light mode (e.g. `#4F46E5`) vibrates against dark backgrounds and fails contrast; move to the `-400` step (`#818CF8`). Same for success/warning/danger.
4. **Flip text-on-primary.** Lightened primaries usually need dark text (`#101120`), not white. Check it — this is the most commonly shipped dark-mode contrast bug.
5. **Reduce large-area saturation.** Tinted section bands that read as "subtle" in light mode read as radioactive in dark mode. Cut the chroma of any large dark surface roughly in half.
6. **Borders lighten slightly, text-muted lightens a lot.** Light-mode muted gray (`#6E7288`) often fails on dark surfaces; move up to `#9CA0B5` or lighter.
7. **Test contrast independently.** Dark mode has its own full set of pairs; passing light mode implies nothing about dark mode. Run the §6-style check against the dark token values separately.

Example transformation:

| Token | Light | Dark | What changed |
|---|---|---|---|
| `background` | `#F8F9FC` | `#0E0F16` | near-black, brand-tinted |
| `surface` | `#FFFFFF` | `#16181F` | lighter than background |
| `surface-raised` | `#FFFFFF` + shadow | `#1E2029` | lightness replaces shadow |
| `text-primary` | `#191B29` | `#EDEEF3` | near-white, not `#FFF` |
| `primary` | `#4F46E5` | `#818CF8` | +2 steps lighter |
| `primary-fg` | `#FFFFFF` | `#101120` | flipped |
| `border` | `#E4E6EF` | `#2A2D3A` | low-contrast, still visible |

### Media and imagery in dark mode

- **Dim images slightly** (`filter: brightness(0.9)`) so bright photos don't glow against dark surfaces.
- **Logos and illustrations** with dark strokes need dark-mode variants or a light plate behind them; never invert photographs.
- **Shadows still exist** but only as grounding under floating elements (modals, menus) — use higher opacity, tighter spread, and pair them with the lighter-surface rule; the shadow alone is not enough.
- **Charts and data viz** need their own dark series colors — light-mode series colors on dark backgrounds routinely fail the 3:1 non-text minimum.

### Dark mode shipping checklist

1. Background inside `#0A0A0B`–`#16181D`, brand-tinted, not `#000000`.
2. Three distinguishable elevation levels (background / surface / raised) with no shadows required to tell them apart.
3. Brand + state colors lightened 1–2 steps; nothing vibrates.
4. `primary-fg` re-verified — dark text on lightened primaries where needed.
5. Muted text ≥ 4.5:1 against every surface it appears on.
6. Focus ring visible on both the darkest and lightest surface.
7. Large tinted areas re-checked for saturation glow.
8. Full contrast pass run against dark tokens, independent of light mode.

---

## 4. Industry and Mood Palettes

Each palette lists nine values in a fixed order plus a usage note. Columns: **Bg** (page background), **Surface** (cards), **Text** (text-primary), **Muted** (text-muted), **Border**, **Primary** (CTA), **P-hover**, **Accent**. Treat these as calibrated starting points; verify contrast after any modification.

Selecting by brief adjective, when the industry isn't an exact match:

| Brief says | Reach for |
|---|---|
| "trustworthy", "secure", "established" | 4.1 Fintech, 4.3 Legal Navy, 4.19 SaaS Indigo |
| "premium", "exclusive", "elevated" | 4.7 Black & Gold, 4.25 Quiet Luxury, 4.15 Real Estate |
| "warm", "human", "approachable" | 4.18 Nonprofit, 4.9 Food, 4.21 Retro Cream |
| "cutting-edge", "futuristic" | 4.5 AI Gradient, 4.14 Crypto Neon, 4.4 Dev Dark |
| "calm", "clean", "clinical" | 4.2 Healthcare, 4.10 Wellness, 4.25 Quiet Luxury |
| "bold", "loud", "energetic" | 4.26 Sports, 4.12 Agency, 4.22 Brutalist |
| "minimal", "timeless" | 4.20 Monochrome, 4.13 Editorial, 4.6 Fashion |
| "fun", "playful" | 4.11 Kids, 4.16 Travel, 4.23 Vaporwave |

### 4.1 Fintech Trust Blue — banks, payments, investing

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#F8FAFC` | `#FFFFFF` | `#0F172A` | `#475569` | `#E2E8F0` | `#1D4ED8` | `#1E40AF` | `#0EA5E9` |

Note: reserve `#16A34A`/`#DC2626` strictly for positive/negative deltas so financial semantics stay unambiguous.

### 4.2 Healthcare Calm — clinics, telehealth, medical devices

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#F7FAFA` | `#FFFFFF` | `#17313B` | `#54707C` | `#DCE8EA` | `#0E7490` | `#155E75` | `#34D399` |

Note: avoid alarm-red anywhere except true errors; anxiety-sensitive audience.

### 4.3 Legal / Professional Navy — law firms, consulting, finance-adjacent

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#F9F9F7` | `#FFFFFF` | `#1B2A41` | `#5A6577` | `#E3E5E8` | `#1E3A5F` | `#16304F` | `#9A7B2D` |

Note: gold accent as hairlines, icons, and small caps labels only — never large fills.

### 4.4 Developer Tool Dark — IDEs, APIs, infrastructure

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#0D1117` | `#161B22` | `#E6EDF3` | `#8B949E` | `#30363D` | `#58A6FF` | `#79B8FF` | `#3FB950` |

Note: syntax-highlighted code blocks are the decoration; keep the surrounding chrome strictly neutral.

### 4.5 AI / Startup Gradient — ML products, launch pages

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#FAFAFC` | `#FFFFFF` | `#18181B` | `#52525B` | `#E4E4E7` | `#7C3AED` | `#6D28D9` | `#EC4899` |

Note: gradients belong on the hero and primary CTA only. Stop sets: aurora `#7C3AED → #EC4899 → #F97316`; violet drift `#6366F1 → #8B5CF6 → #D946EF`; cool dawn `#0EA5E9 → #6366F1 → #8B5CF6`.

### 4.6 E-commerce Fashion Neutral — apparel, marketplaces

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#FAF9F7` | `#FFFFFF` | `#1C1917` | `#78716C` | `#E7E5E4` | `#1C1917` | `#44403C` | `#C2410C` |

Note: product photography supplies the color; the UI must recede. Black CTA, accent only for sale/badge moments.

### 4.7 Luxury Black & Gold — jewelry, watches, high-end hospitality

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#0C0C0C` | `#161616` | `#F5F2EA` | `#A8A29E` | `#2A2A2A` | `#C6A45C` | `#D4B978` | `#8C7347` |

Note: gold buttons need dark text (`#1A1A1A`) — white on gold fails contrast. Gold works best as line-work and type, not fills.

### 4.8 Beauty Soft Pastel — skincare, cosmetics

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#FDF7F9` | `#FFFFFF` | `#3F2A33` | `#7C5A69` | `#F2DEE7` | `#BE185D` | `#9D174D` | `#C084FC` |

Note: pastels for surfaces, a genuinely dark rose for text — pastel-on-pastel text is the classic beauty-site accessibility failure.

### 4.9 Food / Restaurant Warm Appetite — restaurants, delivery, CPG food

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#FFF9F2` | `#FFFFFF` | `#2B1B12` | `#745546` | `#F2E3D5` | `#C2410C` | `#9A3412` | `#B91C1C` |

Note: warm reds/oranges measurably stimulate appetite; blue suppresses it (almost no naturally blue foods, so the brain reads blue as non-food). Keep blue entirely out of food-adjacent UI.

### 4.10 Organic / Wellness Green — supplements, yoga, sustainable brands

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#F8FAF6` | `#FFFFFF` | `#1E2B22` | `#5A6E5E` | `#E2E8DE` | `#4D7C0F` | `#3F6212` | `#A16207` |

Note: pair with cream/unbleached-paper tones and honey accents; avoid neon greens, which read synthetic — the opposite of the brand promise.

### 4.11 Kids Playful Primary — toys, learning apps, family services

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#FFFDF5` | `#FFFFFF` | `#27272A` | `#57534E` | `#F1E8D6` | `#2563EB` | `#1D4ED8` | `#F59E0B` |

Note: saturate the accents, not the backgrounds. Multiple accent hues (`#EF4444`, `#10B981`) are allowed here at small sizes — the one exception to §2.3.

### 4.12 Creative Agency High-Contrast — studios, portfolios

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#FFFFFF` | `#F5F5F5` | `#0A0A0A` | `#525252` | `#171717` | `#0A0A0A` | `#262626` | `#FF3E00` |

Note: borders are part of the design language (2px solid near-black). One electric accent plus oversized type does the branding.

### 4.13 Editorial Paper & Ink — magazines, blogs, longform

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#FBF9F4` | `#FFFFFF` | `#1A1A1A` | `#595959` | `#E5E0D5` | `#1A1A1A` | `#404040` | `#9E2B25` |

Note: underline links in the accent red; the warm paper background reduces glare for long reading sessions.

### 4.14 Crypto / Web3 Neon Dark — exchanges, protocols, NFT platforms

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#0A0A0F` | `#13131A` | `#ECECF1` | `#9494A6` | `#26263A` | `#8B5CF6` | `#A78BFA` | `#22D3EE` |

Note: create "neon glow" with a blurred box-shadow of the primary at ~40% alpha — never by brightening fills, which destroys text contrast.

### 4.15 Real Estate Premium — brokerages, developments, architecture

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#F8F8F6` | `#FFFFFF` | `#21303A` | `#5C6B75` | `#E4E4DE` | `#1F4B43` | `#163832` | `#C29B5C` |

Note: large photography carries the emotion; the UI palette stays quiet so listings, not chrome, sell the property.

### 4.16 Travel Vibrant — booking, tours, airlines

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#FEFDFB` | `#FFFFFF` | `#1E293B` | `#64748B` | `#E8E4DC` | `#0F766E` | `#115E59` | `#F97316` |

Note: coral accent for prices, deals, and badges only — used everywhere it stops signaling urgency.

### 4.17 Education Friendly — courses, schools, edtech

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#F7F9FC` | `#FFFFFF` | `#1E2A3A` | `#556275` | `#DFE5EC` | `#2563EB` | `#1D4ED8` | `#F59E0B` |

Note: keep reading/lesson surfaces near-neutral; save the warm accent for progress, streaks, and celebration moments.

### 4.18 Nonprofit Warm Trust — charities, foundations, community

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#FBF8F3` | `#FFFFFF` | `#2D2416` | `#6B5F4E` | `#EDE6D9` | `#B45309` | `#92400E` | `#0F766E` |

Note: warm primary reads human and urgent for donation CTAs; the teal secondary keeps stats and links from competing with "Donate".

### 4.19 SaaS Soft Indigo — B2B products, dashboards

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#F8F9FC` | `#FFFFFF` | `#111827` | `#6B7280` | `#E5E7EB` | `#4F46E5` | `#4338CA` | `#06B6D4` |

Note: this is the "default safe" SaaS look — expect sameness; differentiate through typography and spacing, not by adding more color.

### 4.20 Minimal Monochrome + Single Accent — portfolios, docs, tools

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#FAFAFA` | `#FFFFFF` | `#111111` | `#555555` | `#E5E5E5` | *(variant)* | *(variant)* | = primary |

Accent variants (primary / hover): **Blue** `#2563EB` / `#1D4ED8` · **Orange** `#EA580C` / `#C2410C` · **Emerald** `#059669` / `#047857` · **Crimson** `#DC2626` / `#B91C1C` · **Violet** `#7C3AED` / `#6D28D9`.

Note: with only one hue on the page, its every use is a signal — audit that the accent appears *only* on interactive or emphasized elements.

### 4.21 Retro Cream & Orange — 70s revival, indie brands, coffee

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#FBF3E4` | `#FFF9EC` | `#402E1F` | `#75634C` | `#EAD9BD` | `#C05621` | `#9C4318` | `#2A6F6B` |

Note: chunky 2px `#402E1F` borders and hard offset shadows (no blur) sell the retro feel more than the hues do.

### 4.22 Brutalist Primaries — statement sites, event pages, zines

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#FFFFFF` | `#F4F4F4` | `#000000` | `#333333` | `#000000` | `#0000FF` | `#0000CC` | `#FF0000` |

Note: pure hues and pure black are *deliberate* here — the harshness is the aesthetic. No border-radius, no soft shadows; add `#FFFF00` highlight blocks sparingly.

### 4.23 Vaporwave — music, streetwear, experimental

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#150E24` | `#1E1633` | `#F3E9FF` | `#A491C4` | `#35284F` | `#FF71CE` | `#FF8FD8` | `#01CDFE` |

Note: neon buttons take dark text `#150E24`. Signature sunset gradient: `#FF71CE → #B967FF → #01CDFE`.

### 4.24 Terminal Green-on-Black — hacker aesthetic, CLI products

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#0A0E0A` | `#111811` | `#4ADE80` | `#4D9968` | `#1F3D2B` | `#22C55E` | `#4ADE80` | `#FDE047` |

Note: monospace everywhere; single-hue text causes eye fatigue on long reads, so keep body copy short or offer a neutral-text reading mode.

### 4.25 Quiet Luxury Stone & Taupe — interiors, fashion houses, wellness spas

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#F6F4F0` | `#FCFBF9` | `#33302B` | `#6E675C` | `#E3DFD7` | `#4A453E` | `#33302B` | `#8C8071` |

Note: near-zero saturation is the point — hierarchy must come from type scale and whitespace, because color refuses to shout.

### 4.26 Sports / Energy Bold — athletics, fitness, esports

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#0E0E11` | `#17171C` | `#FAFAFA` | `#A1A1AA` | `#2A2A31` | `#E11D48` | `#F43F5E` | `#FACC15` |

Note: italic display type, diagonal section cuts, and the yellow accent reserved for stats/numbers create motion without animation.

### 4.27 Music / Entertainment Dark Vibrant — labels, venues, streaming

| Bg | Surface | Text | Muted | Border | Primary | P-hover | Accent |
|---|---|---|---|---|---|---|---|
| `#120D18` | `#1B1424` | `#F4EFFA` | `#A695BB` | `#2E2440` | `#A855F7` | `#C084FC` | `#F472B6` |

Note: album/artist art carries the color story; apply a duotone overlay derived from the primary to unify wildly varied artwork.

---

## 5. Gradient Recipes

### 5.1 Where gradients belong — and where they never do

**Belong:** hero backgrounds, decorative orbs/blobs behind content, primary CTA fills (subtle, two close stops), text-fill on a single display headline, section dividers.

**Never:** body-text backgrounds (contrast becomes unverifiable across the gradient), small UI controls (muddy at small sizes), more than ~2 gradient moments per viewport, borders around content cards (dated), anything the user must read *through*.

### 5.2 Safe pairs — stay analogous

Build gradients from hues within ~60° of each other on the color wheel. Crossing farther drags the midpoint through gray or brown mud.

| Pair | Stops | Mood |
|---|---|---|
| Blue → violet | `#2563EB → #7C3AED` | tech, trustworthy |
| Violet → pink | `#7C3AED → #DB2777` | AI, creative |
| Teal → blue | `#0D9488 → #2563EB` | health-tech, clean |
| Orange → pink | `#F97316 → #EC4899` | consumer, energetic |
| Amber → orange | `#F59E0B → #EA580C` | food, warm |
| Deep navy → indigo | `#1E1B4B → #4338CA` | premium dark hero |

To cross a large hue distance (e.g. cyan → magenta), insert an intermediate stop that keeps the path out of gray: `#06B6D4 → #6366F1 → #D946EF`.

### 5.3 Mesh / aurora construction

CSS has no native mesh gradient; fake one by stacking radial gradients on a base color. Each radial is one "light source":

```css
.hero {
  background-color: #0E0F16;                       /* base */
  background-image:
    radial-gradient(40% 50% at 15% 20%, rgba(124, 58, 237, 0.45) 0%, transparent 70%),
    radial-gradient(35% 45% at 85% 15%, rgba(6, 182, 212, 0.35) 0%, transparent 70%),
    radial-gradient(50% 60% at 60% 90%, rgba(236, 72, 153, 0.30) 0%, transparent 70%);
}
```

Rules: 2–4 blobs maximum; keep alphas ≤ 0.5 so text laid over the mesh still passes contrast against the *lightest* point; place blobs toward edges/corners so the center stays calm for content; all blob hues from one analogous family plus at most one contrast hue.

### 5.4 Banding avoidance

Long, subtle gradients band visibly on 8-bit displays (stripes instead of smooth transition). Mitigations, in order of preference:

1. **Add noise**: overlay a tiling transparent-noise texture (SVG `feTurbulence` as a data URI, ~3–5% opacity). Noise dithers the transition and reads as "film grain" texture.
2. **Shorten the gradient**: a 200px transition bands less than an 1200px one at the same color distance.
3. **Increase color distance**: near-identical stops (`#0E0F16 → #12131A`) band worst; either widen the difference or drop the gradient.

Self-contained noise overlay (no external asset):

```css
.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.04;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

### 5.5 Subtle CTA gradient

For a button that reads "premium" without shouting, keep both stops within the same hue, ~1 scale step apart, angled top-to-bottom:

```css
.btn-primary {
  background-image: linear-gradient(180deg, #6366F1 0%, #4F46E5 100%);
  border: 1px solid #4338CA;   /* darkest step as the edge — fakes depth */
}
.btn-primary:hover {
  background-image: linear-gradient(180deg, #4F46E5 0%, #4338CA 100%);
}
```

Verify button-text contrast against the *lighter* stop.

### 5.6 Gradient text

Use `background-clip: text` on display headlines only, with a solid-color fallback, and confirm the *lightest stop* still passes 3:1 against the background — the gradient's weakest point sets its accessibility.

---

## 6. Accessibility Quick-Check Table

Verified WCAG contrast ratios for pairs this reference recommends. **Body** = 4.5:1 minimum; **Large** = 3:1 minimum (≥ ~24px regular / ~19px bold, and non-text UI).

| Foreground | Background | Ratio | Body | Large | Typical use |
|---|---|---|---|---|---|
| `#111827` | `#FFFFFF` | 17.7:1 | Pass | Pass | Headings, body text |
| `#374151` | `#FFFFFF` | 10.3:1 | Pass | Pass | Body text, softer |
| `#6B7280` | `#FFFFFF` | 4.8:1 | Pass | Pass | Muted text — the floor for gray on white |
| `#6B7280` | `#F9FAFB` | 4.6:1 | Pass | Pass | Muted text on off-white bg |
| `#9CA3AF` | `#FFFFFF` | 2.5:1 | **Fail** | **Fail** | Decorative/disabled only — never information |
| `#FFFFFF` | `#2563EB` | 5.1:1 | Pass | Pass | White text on blue-600 button |
| `#FFFFFF` | `#4F46E5` | 6.3:1 | Pass | Pass | White text on indigo-600 button |
| `#FFFFFF` | `#3B82F6` | 3.7:1 | **Fail** | Pass | Blue-500 too light for white body text |
| `#FFFFFF` | `#818CF8` | 3.0:1 | **Fail** | Borderline | Lightened dark-mode primary — flip to dark text |
| `#101120` | `#818CF8` | 6.3:1 | Pass | Pass | Dark text on lightened dark-mode primary |
| `#FFFFFF` | `#B45309` | 5.0:1 | Pass | Pass | White on warm amber-700 CTA |
| `#FFFFFF` | `#22C55E` | 2.3:1 | **Fail** | **Fail** | Green-500 needs dark text instead |
| `#111827` | `#22C55E` | 7.8:1 | Pass | Pass | Dark text on green-500 badge |
| `#1F2937` | `#F59E0B` | 6.8:1 | Pass | Pass | Dark text on amber warning fill |
| `#EF4444` | `#FFFFFF` | 3.8:1 | **Fail** | Pass | Red-500 error text too light for body size |
| `#DC2626` | `#FFFFFF` | 4.8:1 | Pass | Pass | Red-600 — the floor for error body text |
| `#E5E7EB` | `#0F172A` | 14.4:1 | Pass | Pass | Light text on dark navy surface |
| `#94A3B8` | `#0F172A` | 7.0:1 | Pass | Pass | Muted text on dark navy |
| `#64748B` | `#0F172A` | 3.8:1 | **Fail** | Pass | Slate-500 too dark for dark-mode body text |
| `#E5E7EB` | `#FFFFFF` | 1.2:1 | n/a | n/a | Border on white — fine decorative, fails 3:1 for functional input borders |

### Writing the color section of a design brief

When constructing a design brief, output the color decision in this shape so the build phase never has to re-derive it:

```
COLOR SYSTEM
Base palette: Fintech Trust Blue (§4.1), warmed slightly toward teal per client request.
Distribution: 60% #F8FAFC background / 30% white surfaces + #0F172A text / 10% #1D4ED8 CTAs.
Neutrals: slate family (blue-tinted) — no pure grays.
Accent policy: #1D4ED8 for all interactive elements; #0EA5E9 for data highlights only.
State colors: success #16A34A, warning #F59E0B (dark text), danger #DC2626.
Dark mode: yes — background #0E1220, primary lightened to #60A5FA with #0E1220 text.
Gradients: single hero mesh (blue → teal, §5.3), noise overlay, none elsewhere.
Verified pairs: all body text ≥ 4.5:1, both themes (see §6 method).
```

Every line answers a question the build phase would otherwise guess at. If any line is missing from the brief, resolve it before writing CSS — retrofitting a color decision costs far more than deciding it up front.

Working rules distilled from the table:

- On white, gray text must be `#6B7280` or darker to carry information.
- Mid-value saturated hues (`#3B82F6`, `#22C55E`, `#F59E0B`, `#EF4444`) are the danger zone: too light for white text, too dark for black text to be comfortable — shift one step darker for white text or pair with near-black text.
- In dark mode, muted text must be *lighter* than intuition suggests; slate-500 fails where slate-400 passes.
- Input borders and icons that convey state need 3:1 like large text; purely decorative dividers do not.
- After finalizing any palette — including every palette in §4 after modification — recheck each text/background pair numerically. Eyeballing is a filter, not a verification.
