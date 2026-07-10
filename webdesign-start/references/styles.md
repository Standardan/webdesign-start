# UI Style Catalog

This is a catalog of concrete, named visual styles for web interfaces, organized into families. Use it during design discovery to translate a user's taste signals ("clean", "techy", "warm", "loud") into a specific style with a reproducible recipe. Every entry gives you the essence, fit criteria, a concrete recipe (colors, type, shape, depth, motion), signature CSS techniques, and real-world reference sites.

**When to read this file:** after you have gathered the user's taste answers and product context, and before you write any CSS or pick a palette — select one dominant style here first, then design from its recipe.

## Table of contents

1. [Quick-pick index](#quick-pick-index)
2. [Minimal & Refined](#minimal--refined)
3. [Bold & Expressive](#bold--expressive)
4. [Depth & Texture](#depth--texture)
5. [Dark & Technical](#dark--technical)
6. [Retro & Nostalgic](#retro--nostalgic)
7. [Editorial & Typographic](#editorial--typographic)
8. [Organic & Natural](#organic--natural)
9. [Luxury & Premium](#luxury--premium)
10. [Playful & Friendly](#playful--friendly)
11. [Contemporary & Emerging](#contemporary--emerging)
12. [Combining styles](#combining-styles)

## Quick-pick index

Map what the user says (plus their product type) to 2-3 candidate styles, then present those candidates rather than the whole catalog. Signals are additive: "dark" + "playful" narrows differently than "dark" + "serious".

| User signal + context | Candidate styles |
|---|---|
| "clean and modern" + SaaS/startup | Refined Minimalism, Soft SaaS Gradient, Monochrome + Single Accent |
| "dark and techy" + dev tool | Dark Developer-Tool Minimal, Terminal/CLI, Grid-Exposed Blueprint |
| "warm and human" + community/wellness | Organic Warm Minimal, Editorial Humanist, Warm Earth |
| "premium / expensive feel" + product or brand | Premium Product Minimal, Quiet Luxury, High-Fashion Minimal |
| "fun / playful" + consumer app | Rounded Friendly, Candy Pop, Cartoon & Mascot |
| "bold / loud / stands out" + creative brand | Neo-Brutalism, Color-Block Bold, Big-Type Manifesto |
| "futuristic / AI" + AI product | AI Gradient Mesh, Aurora Glow, Spatial 3D |
| "nostalgic / retro" + culture/music/indie | Y2K Chrome, Vaporwave, 90s Web Revival, Retro-Futurism |
| "editorial / like a magazine" + content site | Magazine Editorial, Swiss International, Editorial Humanist |
| "trustworthy / serious" + finance/health/legal | Refined Minimalism, Swiss International, Premium Product Minimal |
| "handmade / crafty" + artisan/indie maker | Hand-Drawn Sketch, Botanical Natural, Paper & Grain |
| "gamer / hacker energy" + gaming/security | Cyberpunk Neon, Terminal/CLI, Dark Dashboard Dense |
| "soft / calm / gentle" + wellness/productivity | Friendly Approachable Minimal, Claymorphism, Aurora Glow |
| "data-heavy / power tool" + analytics/internal | Dark Dashboard Dense, Swiss International, Bento Grid |
| "artistic / experimental" + portfolio/agency | Experimental Art-School, Scroll-Driven Immersive, Maximalism |

---

## Minimal & Refined

Restraint as the aesthetic. These styles win when content or product screenshots must carry the page and the brand must feel competent rather than loud.

### Refined Minimalism
- **Essence:** Generous whitespace, one quiet accent, and typography doing all the talking — the default "tasteful modern" look.
- **Use when / Avoid when:** Use for SaaS marketing, portfolios, and any trust-sensitive product (fintech, legal, health) because restraint reads as competence. Avoid when the user wants personality or memorability above all — this style is safe to the point of anonymous.
- **Recipe:** Near-white base `#FAFAF9` with ink text `#18181B` and one accent like `#2563EB`; a neutral grotesque (Inter, Söhne) at 400/600 only; spacing scale 8/16/24/48/96 with sections breathing at 120px+; radii 6-8px; depth from a single soft shadow `0 1px 3px rgb(0 0 0 / 0.08)`; motion limited to 150ms ease-out fades.
- **CSS keys:** `max-width: 72ch` prose containers; `letter-spacing: -0.02em` on headings; single-shadow elevation; `color-mix(in oklch, accent, white 90%)` for tints.
- **Seen on:** linear.app (light pages), vercel.com, stripe.com/docs.
- **Pairs with:** Inter or Geist; near-monochrome palette with one saturated accent.

### Premium Product Minimal
- **Essence:** The Apple playbook — enormous product imagery, few words set large, and silence around everything.
- **Use when / Avoid when:** Use when a physical or visual product is the hero (hardware, cars, high-end DTC) and photography budget exists. Avoid for text-heavy or feature-list products; this style starves dense content of structure.
- **Recipe:** Pure white `#FFFFFF` or true black `#000000` sections alternating; SF Pro / Helvetica Now at huge sizes (72-120px) with tight tracking; extreme vertical rhythm (200px+ between moments); radii 12-18px on cards; no borders, depth via photographic lighting; slow scroll-triggered reveals (400-600ms).
- **CSS keys:** `font-size: clamp(3rem, 8vw, 7rem)` hero type; full-bleed `object-fit: cover` imagery; sticky scroll product sequences; `background: #000` section inversion.
- **Seen on:** apple.com, nothing.tech, teenage.engineering (store pages).
- **Pairs with:** SF Pro, Helvetica Now, or Neue Haas Grotesk; black/white with product colors as the only chroma.

### Friendly Approachable Minimal
- **Essence:** Minimalism that smiles — soft grays, rounded corners, small illustrations, and copy that sounds like a person.
- **Use when / Avoid when:** Use for productivity tools, consumer SaaS, and onboarding-heavy products where reducing intimidation matters. Avoid for luxury or high-authority contexts — friendliness reads as junior there.
- **Recipe:** Warm white `#FFFFFF` with soft ink `#37352F` (Notion's off-black); Inter or a humanist sans with occasional handwritten accents; comfortable density with 12-16px radii; flat with faint borders `#E9E9E7`; spot illustrations in 2-3 muted colors; micro-bounce on interactions (spring easing).
- **CSS keys:** `border: 1px solid rgb(0 0 0 / 0.06)` instead of shadows; emoji/icon leading list items; `transition: transform 120ms` hover lifts of 1-2px.
- **Seen on:** notion.com, slack.com, todoist.com.
- **Pairs with:** Inter + one rounded display face (e.g., Recoleta) for headings; warm neutrals with 2 pastel accents.

### Soft SaaS Gradient
- **Essence:** Clean layout with luminous, out-of-focus gradients washing behind white cards — the 2020s default startup glow.
- **Use when / Avoid when:** Use for developer tools, AI products, and B2B SaaS wanting "modern" without risk. Avoid when differentiation is the goal — this is the most saturated (in market share) look in tech.
- **Recipe:** White base with gradient washes from `#818CF8` → `#C084FC` → `#F0ABFC` at low opacity; Inter/Manrope; medium density, 12px radii; cards with `box-shadow: 0 4px 24px rgb(99 102 241 / 0.12)`; gentle parallax on gradient blobs.
- **CSS keys:** `background: radial-gradient(60% 50% at 50% 0%, rgb(129 140 248 / 0.25), transparent)`; `filter: blur(80px)` on positioned blob divs; gradient text via `background-clip: text`.
- **Seen on:** stripe.com, raycast.com (light sections), clerk.com.
- **Pairs with:** Inter or Manrope; indigo-violet-pink analogous gradient family over neutral grays.

### Functional Grayscale
- **Essence:** No accent color at all — hierarchy built purely from type weight, size, and gray steps, like a beautifully set spec sheet.
- **Use when / Avoid when:** Use for tools, documentation, and portfolios of people whose work supplies the color. Avoid for marketing pages that must direct attention to a CTA — with no accent, nothing pops.
- **Recipe:** Grays only: `#FFFFFF`, `#F4F4F5`, `#A1A1AA`, `#52525B`, `#09090B`; a workhorse sans (Untitled Sans, Helvetica) plus mono for metadata; tight, list-like density; 0-4px radii; hairline `1px` dividers, zero shadows; instant state changes, no animation.
- **CSS keys:** `border-top: 1px solid #E4E4E7` row dividers; `font-variant-numeric: tabular-nums`; hover states via background `#F4F4F5` only.
- **Seen on:** savee.it, cargo.site, frankchimero.com.
- **Pairs with:** Helvetica/Untitled Sans + JetBrains Mono; strictly achromatic — let imagery provide chroma.

---

## Bold & Expressive

Volume turned up. These styles trade universal appeal for memorability; confirm the user genuinely wants to polarize before committing.

### Color-Block Bold
- **Essence:** Full-bleed panels of flat saturated color stacked like painted walls, with type punched out in white or black.
- **Use when / Avoid when:** Use for creative agencies, events, and consumer brands fighting for attention. Avoid for data-dense or long-reading products — saturated fields fatigue over sustained use.
- **Recipe:** 3-4 saturated flats like `#FF4D00`, `#0037FF`, `#FFD600`, `#111111`, each owning a full section; a heavy grotesque (Archivo Black, Druk) at display sizes; low density, big gestures; 0px radii; totally flat; snappy 200ms slide transitions between blocks.
- **CSS keys:** `min-height: 100vh` colored sections; `mix-blend-mode: difference` for text crossing color boundaries; solid `4px` borders as dividers.
- **Seen on:** pentagram.com, itsnicethat.com, spotify.design.
- **Pairs with:** Archivo/Druk-style compressed grotesque; 3 clashing saturated hues + black.

### Maximalism
- **Essence:** More is more — layered imagery, patterns, stickers, mixed type, and ornament filling every region with intentional density.
- **Use when / Avoid when:** Use for fashion, music, culture, and zine-energy brands with strong art direction to keep chaos coherent. Avoid for anything requiring quick task completion; maximalism taxes scanning.
- **Recipe:** Clashing palette anchored by one dominant hue (e.g., `#E63946` over `#F1FAEE` with `#FFB703` and `#8338EC` accents); 2-3 typefaces mixed (serif display + grotesque + script); zero whitespace guilt, overlapping layers; mixed radii; drop shadows, outlines, textures simultaneously; constant ambient motion (marquees, rotation).
- **CSS keys:** `position: absolute` collage layering with `transform: rotate()`; CSS `animation: marquee` tickers; layered `background-image` patterns.
- **Seen on:** gucci.com (campaign pages), studiofreight.com archives, halfhalf.jp.
- **Pairs with:** One display serif + one grotesque + one novelty face; 4-5 hue palette with a single anchor.

### Pop-Art Punch
- **Essence:** Comic-book energy — halftone dots, thick outlines, primary colors, and exclamatory type.
- **Use when / Avoid when:** Use for snack brands, entertainment, youth products, and campaign microsites. Avoid for anything needing subtlety or a long shelf life; the joke wears.
- **Recipe:** Primaries `#FF3B30`, `#FFCC00`, `#007AFF` on cream `#FFF8E7`; a bold slab or comic-adjacent display (Rubik Mono One, Bangers) with a clean sans for body; punchy medium density; 8px radii with `3px` black outlines; hard offset shadows; squash-and-stretch hover animations.
- **CSS keys:** `box-shadow: 6px 6px 0 #000`; halftone via `background: radial-gradient(circle, #000 1.5px, transparent 1.5px); background-size: 8px 8px`; `border: 3px solid #000`.
- **Seen on:** mailchimp.com (illustration era), liquid-death.com, wearefriday.com.
- **Pairs with:** One shouty display face + neutral sans body; primary triad + cream + black.

### Experimental Art-School
- **Essence:** Deliberately broken grids, cursor tricks, and typography treated as image — the site is itself the portfolio piece.
- **Use when / Avoid when:** Use for design studios, artists, and awards-bait campaign sites where confusion is acceptable friction. Avoid for any product with a conversion funnel or accessibility mandate.
- **Recipe:** Often stark — white/black plus one acid accent like `#CCFF00`; experimental or variable fonts pushed to extremes; asymmetric, collision-friendly layout; irregular shapes and clip-paths; WebGL or blend-mode distortion; heavy custom cursor and scroll-hijack motion.
- **CSS keys:** `clip-path: polygon(...)` on images; `font-variation-settings` animated on scroll; `cursor: none` with a custom cursor element; `mix-blend-mode: exclusion`.
- **Seen on:** lusion.co, davidwilliambaum.com, resn.co.nz.
- **Pairs with:** A variable font with wide axes (e.g., Whyte Inktrap, Monument Grotesk); monochrome + one acid hue.

---

## Depth & Texture

These styles simulate material and light. They demand discipline: depth effects multiply visual noise fast, so keep layouts simple underneath them.

### Glassmorphism
- **Essence:** Frosted-glass panels floating over colorful backgrounds — translucency, blur, and a light catching the pane's edge.
- **Use when / Avoid when:** Use for dashboards, music/media apps, and anything wanting an "OS-like" premium feel (it echoes macOS/visionOS). Avoid over plain white backgrounds — glass is invisible without something colorful behind it — and avoid for text-heavy panes where contrast suffers.
- **Recipe:** Vivid or dark backdrop (gradient or imagery) with glass panels; Inter/SF at normal scales; medium density; 16-24px radii; blur + translucency + 1px light border as the entire depth system; slow floating motion on background layers.
- **CSS keys:** `backdrop-filter: blur(16px) saturate(1.4); background: rgb(255 255 255 / 0.08); border: 1px solid rgb(255 255 255 / 0.15)`; inner highlight via `box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.2)`.
- **Seen on:** apple.com/macos, arc.net, dribbble's finance-app genre.
- **Pairs with:** SF Pro or Inter; deep gradient backdrop (e.g., `#0F172A` → `#312E81`) so the glass reads.

### Neumorphism
- **Essence:** Controls extruded from the same clay as the background — soft dual shadows making elements look pressed or puffed.
- **Use when / Avoid when:** Use sparingly for niche control-panel aesthetics (audio plugins, smart-home dashboards) where tactility sells. Avoid for anything mainstream or accessibility-critical: contrast is inherently poor and disabled/active states are ambiguous.
- **Recipe:** Single soft base like `#E0E5EC` (everything the same hue); rounded sans (Nunito, DM Sans); airy density, controls need space; 16-24px radii; signature dual shadow (dark below-right, light above-left); subtle press-in transitions.
- **CSS keys:** `box-shadow: 9px 9px 16px rgb(163 177 198 / 0.6), -9px -9px 16px rgb(255 255 255 / 0.9)`; pressed state swaps to `inset` variants; text at `#4A5568` minimum for contrast.
- **Seen on:** teenage.engineering product UIs (inspiration), smart-home concept dashboards, audio plugin interfaces like Arturia's.
- **Pairs with:** Nunito or DM Sans; one desaturated base hue with darker tone-on-tone text.

### Claymorphism
- **Essence:** Chunky, inflated 3D shapes in cheerful pastels — UI that looks squeezable, like modeling clay.
- **Use when / Avoid when:** Use for kids' products, education, Web3-friendly consumer apps, and playful onboarding. Avoid for professional or serious contexts; clay reads as toy.
- **Recipe:** Pastel field like `#F3F0FF` with clay objects in `#A78BFA`, `#FCA5A5`, `#86EFAC`; rounded geometric sans (Poppins, Baloo); low density with big touch targets; 24-40px radii; double shadow (outer drop + inner top highlight) creating inflation; springy bounce on every interaction.
- **CSS keys:** `border-radius: 32px; box-shadow: 0 16px 32px rgb(139 92 246 / 0.25), inset 0 -8px 16px rgb(0 0 0 / 0.1), inset 0 8px 16px rgb(255 255 255 / 0.6)`; 3D clay illustrations (Blender-style) as heroes.
- **Seen on:** headspace.com, duolingo.com (marketing), kids-edtech landing pages.
- **Pairs with:** Poppins or Baloo 2; 3-4 pastels over a near-white lavender/cream base.

### Skeuomorphic Revival
- **Essence:** Real-world materials rendered lovingly — leather, brushed metal, paper, dials — with modern restraint instead of 2010 excess.
- **Use when / Avoid when:** Use for music tools, journaling apps, and products trading on craft and nostalgia. Avoid for fast-moving SaaS; realistic chrome dates quickly and renders slowly.
- **Recipe:** Material-derived palette (leather `#8B5A2B`, paper `#F7F3E9`, steel `#C0C4C8`); serif or classic humanist type (Tiempos, Freight); density follows the metaphor (a desk, a device); radii match the material; layered gradients, grain, and realistic shadows; physical motion (dials rotate, pages flip).
- **CSS keys:** multi-stop metallic gradients `linear-gradient(180deg, #E8E8E8, #B8B8B8 50%, #D4D4D4)`; SVG grain overlays; `box-shadow` stacks (3+ layers) for realistic light.
- **Seen on:** teenage.engineering, panic.com (Playdate), fountain-pen and analog-brand microsites.
- **Pairs with:** A classic serif (Tiempos) + engraved-feel caps; palette sampled from the actual material.

### Paper & Grain
- **Essence:** Flat design warmed up with film grain, paper texture, and slightly imperfect edges — digital that feels printed.
- **Use when / Avoid when:** Use for editorial brands, coffee/food, indie studios, and anywhere "crafted, not generated" is the message. Avoid for crisp data UIs where texture reads as dirt.
- **Recipe:** Warm paper `#F5F1E8` with soft black `#1C1B1A` and muted brick `#B4532A`; serif-forward (GT Sectra, Lyon) with grotesque captions; editorial density; 2-6px radii; grain overlay at 3-6% opacity instead of shadows; slow, analog-feeling crossfades.
- **CSS keys:** SVG turbulence grain: `filter: url(#noise)` or a tiled noise PNG at `opacity: 0.05`; `mix-blend-mode: multiply` on imagery; duotone image treatment via `filter: grayscale(1) sepia(0.3)`.
- **Seen on:** gantri.com, drinkghia.com, cotogna-style restaurant sites.
- **Pairs with:** GT Sectra or Freight Text + a mono for labels; warm neutrals with one earthy accent.

---

## Dark & Technical

Dark-first styles signal engineering credibility. Test every color on the dark base — hues shift perceptually on black, and pure `#000` backgrounds cause smearing on OLED scroll.

### Dark Developer-Tool Minimal
- **Essence:** Near-black canvas, hairline borders, crisp small type, and one glowing accent — the Linear look that defined a generation of dev tools.
- **Use when / Avoid when:** Use for developer tools, infrastructure, and technical SaaS whose buyers live in dark IDEs. Avoid for broad consumer audiences and long-form reading (dark body text fatigues).
- **Recipe:** Base `#0A0A0B` with raised surfaces `#141416`, text `#EDEDEF` / secondary `#8A8F98`, accent `#5E6AD2`; Inter at 14-15px body with tight leading; compact density; 8px radii; hairline borders `rgb(255 255 255 / 0.08)` plus faint accent glows; fast 120ms transitions, subtle glow pulses.
- **CSS keys:** `border: 1px solid rgb(255 255 255 / 0.08)`; accent glow `box-shadow: 0 0 24px rgb(94 106 210 / 0.3)`; gradient hairline dividers `linear-gradient(90deg, transparent, rgb(255 255 255 / 0.1), transparent)`.
- **Seen on:** linear.app, resend.com, planetscale.com.
- **Pairs with:** Inter + JetBrains Mono for code; desaturated dark neutrals + one indigo/violet accent.

### Terminal / CLI
- **Essence:** The interface cosplays as a terminal — monospace everything, prompt glyphs, ASCII art, and phosphor green or amber on black.
- **Use when / Avoid when:** Use for CLI products, security tools, hacker-culture brands, and launch pages targeting engineers. Avoid as an entire product UI for non-technical users; the metaphor excludes them.
- **Recipe:** Black `#0C0C0C` with green `#33FF66` or amber `#FFB000` text; a true mono (JetBrains Mono, Berkeley Mono) for everything including headings; dense, line-based layout; 0-2px radii; flat with optional scanline/CRT overlay; typewriter reveals and blinking-caret motion.
- **CSS keys:** `font-family: 'Berkeley Mono', monospace` globally; caret via `@keyframes blink`; scanlines `repeating-linear-gradient(0deg, rgb(0 0 0 / 0.15) 0 1px, transparent 1px 3px)`; `$` / `>` prompt prefixes on headings.
- **Seen on:** warp.dev, charm.sh, hackthebox.com.
- **Pairs with:** One mono family only; single phosphor hue + black, at most one alert color.

### Cyberpunk Neon
- **Essence:** Rain-slick night city — neon magenta and cyan glows, glitch artifacts, and HUD-style chrome on deep dark.
- **Use when / Avoid when:** Use for gaming, esports, crypto-adjacent, and entertainment properties that want aggression. Avoid for trust-sensitive or accessibility-focused products; glow effects and glitch motion are hostile to readability.
- **Recipe:** Base `#0B0B14` with neon `#FF2A6D`, `#05D9E8`, `#D1F7FF`; a squarish techno display (Orbitron, Chakra Petch) + clean sans body; medium density with HUD framing; angular clipped corners instead of radii; layered glows and chromatic aberration; glitch and flicker animations used as punctuation.
- **CSS keys:** neon glow `text-shadow: 0 0 8px #05D9E8, 0 0 32px rgb(5 217 232 / 0.5)`; clipped corners `clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)`; glitch via layered `::before/::after` with `transform: translate` keyframes.
- **Seen on:** cyberpunk.net, razer.com, 100thieves.com.
- **Pairs with:** Chakra Petch or Orbitron display + Inter body; magenta/cyan duo on near-black.

### Dark Dashboard Dense
- **Essence:** Bloomberg-terminal energy — maximum data per pixel on dark, with color reserved strictly for meaning (up/down, alert, status).
- **Use when / Avoid when:** Use for analytics, trading, monitoring, and ops tools used hours per day by experts. Avoid for casual or first-time-user products; density without expertise is just intimidation.
- **Recipe:** Base `#111318` with panel `#1A1D24`, text `#D7DAE0`, semantic-only accents (`#22C55E` up, `#EF4444` down, `#F59E0B` warn); Inter at 12-13px plus tabular mono numerals; extreme density, 4px internal padding steps; 4px radii; flat panels with 1px `#2A2E37` borders; no decorative motion, instant data updates with brief highlight flashes.
- **CSS keys:** `font-variant-numeric: tabular-nums`; CSS grid with `gap: 1px; background: #2A2E37` for spreadsheet borders; value-change flash `animation: pulse-bg 600ms ease-out`.
- **Seen on:** tradingview.com, grafana dashboards, datadoghq.com product UI.
- **Pairs with:** Inter + IBM Plex Mono for numbers; gray scale + strictly semantic color.

---

## Retro & Nostalgic

Nostalgia is a targeting tool: each style here points at a specific decade and the generation that grew up in it. Match the era to the audience's childhood, not the founder's.

### Neo-Brutalism
- **Essence:** Raw and rule-breaking on purpose — thick black borders, hard offset shadows, unapologetic clashing flats, and system-default energy.
- **Use when / Avoid when:** Use for indie products, creator tools, and youth brands wanting anti-corporate credibility. Avoid for healthcare, finance, and enterprise trust contexts — deliberate crudeness reads as unreliability where stakes are high.
- **Recipe:** White or `#FFFDF5` base with flats like `#FF6B6B`, `#FFD93D`, `#4D96FF`, always with `#000` structure; a chunky grotesque (Archivo, Space Grotesk) bolded hard; boxy medium density; 0-4px radii; hard non-blurred shadows; abrupt hover jumps (shadow collapses, element shifts 4px).
- **CSS keys:** `border: 3px solid #000; box-shadow: 6px 6px 0 #000`; hover `transform: translate(6px, 6px); box-shadow: none`; visible default-looking form controls.
- **Seen on:** gumroad.com, figma.com (brand moments), mschf.com.
- **Pairs with:** Space Grotesk or Archivo; 2-3 loud flats + black + off-white.

### Memphis
- **Essence:** 1980s Milan — squiggles, confetti terrazzo, clashing pastels-plus-primaries, and geometric shapes scattered with studied randomness.
- **Use when / Avoid when:** Use for events, creative education, and brands courting playful sophistication. Avoid for minimal-taste users and dense UIs; Memphis ornament fights information hierarchy.
- **Recipe:** Cream `#FFF6E9` base with `#FF6392`, `#7FC8F8`, `#FFE45E`, `#06D6A0`; geometric sans (Futura, Poppins) with bold weights; airy, poster-like layout; mixed shapes — circles, zigzags, triangles as decoration; flat with occasional hard shadow; wiggle and float animations on shapes.
- **CSS keys:** SVG squiggle/zigzag background sprinkles; `border-radius: 50%` dots grid; `animation: float 4s ease-in-out infinite alternate` on decorative shapes.
- **Seen on:** design-conference sites (e.g., config.figma.com past years), wework.com early branding, sketch-app marketing eras.
- **Pairs with:** Futura/Poppins bold; 4-hue pastel-primary clash over cream.

### Y2K Chrome
- **Essence:** 1999-2003 optimism — liquid chrome type, lens flares, bubble shapes, iridescent gradients, and pixel-font accents.
- **Use when / Avoid when:** Use for music, fashion drops, and Gen-Z consumer brands mining millennium nostalgia. Avoid for anyone needing sustained readability; chrome type is display-only.
- **Recipe:** Silver `#C8CDD6` and white with iridescent `#B5A9FF` → `#9BF0E1` → `#FFC2E2` gradients and hits of `#0000EE` link blue; chrome-effect display type + a pixel font (Silkscreen) + clean sans body; scattered sticker-like density; blobby organic radii; metallic gradients and glossy highlights; slow rotation and shimmer motion.
- **CSS keys:** chrome text via layered `background: linear-gradient(180deg, #FFF, #999 45%, #EEE 50%, #666)` + `background-clip: text`; iridescent borders `border-image: linear-gradient(45deg, #B5A9FF, #9BF0E1, #FFC2E2) 1`; blob shapes with `border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%`.
- **Seen on:** heaven.marcjacobs.com, ssense.com campaign pages, nts.live event pages.
- **Pairs with:** A chrome display treatment + Silkscreen accents + Arial body (deliberately); silver base with iridescent pastels.

### Vaporwave
- **Essence:** Sunset-grid dreamscape — pink/cyan haze, Greek statues, Windows 95 chrome, and ironic corporate nostalgia.
- **Use when / Avoid when:** Use for music projects, meme-literate brands, and art experiences. Avoid for anything sincere or professional; vaporwave is inherently ironic and audiences read it that way.
- **Recipe:** Gradient sky `#FF71CE` → `#7873F5` → `#01CDFE` over dark `#1A0B2E`; a wide retro display (or all-caps with full-width spacing) plus mono; loose collage density; hard 90s window-chrome rectangles (0px radii, 2px ridge borders) amid soft gradients; perspective grid floors; VHS wobble and slow zoom motion.
- **CSS keys:** perspective grid `background: linear-gradient(transparent 95%, #FF71CE 95%) 0 0 / 100% 40px, linear-gradient(90deg, transparent 95%, #FF71CE 95%) 0 0 / 40px 100%` with `transform: perspective(300px) rotateX(60deg)`; `letter-spacing: 0.5em` aesthetic caps; win95 chrome `border: 2px outset #C0C0C0`.
- **Seen on:** poolside.fm (adjacent), vaporwave album microsites, cameronsworld.net (spiritually).
- **Pairs with:** A wide display face + VT323/mono; pink-cyan-violet triad on deep purple dark.

### Retro-Futurism
- **Essence:** The future as imagined from 1965 — atomic-age curves, space-race badges, warm oranges, and optimistic geometry.
- **Use when / Avoid when:** Use for space/science brands, breweries, and products selling optimism about technology. Avoid where cutting-edge modernity is the claim — this style is warm about the future, not literally futuristic.
- **Recipe:** Cream `#F2E8D5` with burnt orange `#E07A2F`, teal `#2A9D8F`, mustard `#E9C46A`, deep navy `#264653`; rounded retro display (Reross, Futura bold) with wide-tracked caps badges; poster-like layout; pill and capsule shapes; flat with subtle print-grain; orbital/rotational motion motifs.
- **CSS keys:** badge lockups with `border-radius: 999px` and `letter-spacing: 0.2em` caps; starburst SVGs; duotone image filters toward orange/navy.
- **Seen on:** spacex-fan and NASA-heritage merch sites, oddballs like starface.world, mid-century-modern furniture retailers (e.g., wearejoybird.com campaign pages).
- **Pairs with:** Futura-family geometric + a retro script accent; cream base with orange/teal/mustard.

### 90s Web Revival
- **Essence:** GeoCities homage — visible table borders, chunky bevel buttons, hit counters, marquees, and system blue links, deployed with irony and modern polish.
- **Use when / Avoid when:** Use for personal sites, dev humor, event pages, and internet-culture brands. Avoid for any conversion-critical or professional surface; the joke is the whole product here.
- **Recipe:** Gray `#C0C0C0` chrome with white content wells, link blue `#0000EE` / visited purple `#551A8B`; Times New Roman and Courier unapologetically; cramped table-like density; 0px radii with `outset`/`inset` bevel borders; tiled GIF-style backgrounds; marquee scrolls and blink effects (used sparingly for a11y).
- **CSS keys:** `border: 2px outset #C0C0C0` buttons; `font-family: 'Times New Roman', serif`; tiled `background-image` patterns; underlined default-blue links.
- **Seen on:** cameronsworld.net, poolside.fm, sadgrl-style personal sites and neocities.org culture.
- **Pairs with:** Times + Courier system stack; the Windows 95 gray/blue system palette.

---

## Editorial & Typographic

Type is the interface. These demand real typographic skill: get the font pairing and rhythm wrong and there is nothing else on the page to hide behind.

### Swiss International
- **Essence:** Grid worship — Helvetica-lineage type, mathematical columns, red-black-white restraint, and zero decoration.
- **Use when / Avoid when:** Use for architecture, design studios, cultural institutions, and data publications; the grid conveys rigor. Avoid for warm or playful brands — Swiss reads as cold authority by design.
- **Recipe:** White `#FFFFFF`, black `#111111`, one red `#E30613`; Helvetica Now/Neue Haas at two sizes only (huge and small); strict 12-column grid with visible alignment; 0px radii; flat, hairline rules only; motion limited to precise slide/reveal along grid lines.
- **CSS keys:** `display: grid; grid-template-columns: repeat(12, 1fr)` with content snapped to tracks; `font-feature-settings: 'ss01'`; oversized folio numbers and rules `border-top: 2px solid #111`.
- **Seen on:** helveticanow.monotype.com, freitag.ch, museum sites like kunsthaus.ch.
- **Pairs with:** Neue Haas Grotesk / Helvetica Now only; black + white + one signal red.

### Magazine Editorial
- **Essence:** A well-art-directed print spread online — serif headlines, drop caps, pull quotes, captions, and images breaking the column.
- **Use when / Avoid when:** Use for publications, long-form content brands, and storytelling-led marketing. Avoid for app UIs and dashboards; editorial conventions assume linear reading.
- **Recipe:** Paper white `#FDFCF8` with ink `#1A1A1A` and a restrained accent like `#9A3412`; display serif (Canela, Tiempos Headline) + text serif + grotesque captions; generous measure (65-75ch) with tight art-directed clusters; minimal radii; flat with photographic depth; scroll-linked image reveals, nothing bouncy.
- **CSS keys:** `p:first-of-type::first-letter` drop caps; pull quotes with `float` and oversized serif; `figure` spanning outside the text column via negative margins or grid; `hyphens: auto; text-align: justify` used judiciously.
- **Seen on:** nytimes.com features, theatlantic.com, pitchfork.com reviews.
- **Pairs with:** Canela/Tiempos + Graphik captions; ink-on-paper neutrals with one editorial accent.

### Big-Type Manifesto
- **Essence:** The headline IS the page — viewport-filling declarative sentences, everything else footnote-sized.
- **Use when / Avoid when:** Use for agency homepages, product launches, and brands with one sharp thing to say. Avoid when there is genuinely lots to communicate; this style punishes complexity.
- **Recipe:** Monochrome or near — `#0A0A0A` on `#F5F5F4` (or inverted); one hard-working grotesque (Neue Montreal, PP Editorial New) at 8-14vw; sparse, sentence-per-viewport; no radii to speak of; flat; scroll-driven line-by-line reveals and word-level color highlights.
- **CSS keys:** `font-size: clamp(3rem, 10vw, 12rem); line-height: 0.95; letter-spacing: -0.03em`; split-text reveal animations; inline highlighted words via `color` or `background` spans.
- **Seen on:** basement.studio, daybreak.studio, pentagram project pages.
- **Pairs with:** One grotesque with a tight display cut; strict monochrome, one highlight color max.

### Editorial Humanist
- **Essence:** Bookish warmth — humanist serifs, soft cream, comfortable line lengths, and the pace of a good essay.
- **Use when / Avoid when:** Use for newsletters, book-adjacent brands, coaching, and thoughtful B2C where trust comes from voice. Avoid for high-energy or highly visual products; this style is deliberately quiet.
- **Recipe:** Cream `#FBF7F0` with warm ink `#292524` and accent `#B45309`; a humanist serif for everything (Source Serif, Freight Text) with italic used expressively; relaxed density, 68ch measure, 1.7 line-height; 8px radii; flat with faint warm borders; fade-only motion.
- **CSS keys:** `line-height: 1.7; max-width: 68ch`; real italics for emphasis; `::selection { background: #FDE68A }` warm selection color; small caps via `font-variant: small-caps` for labels.
- **Seen on:** every.to, substack publications with custom design, readwise.io/reader marketing.
- **Pairs with:** Source Serif or Freight + a quiet grotesque for UI chrome; warm cream neutrals + amber accent.

---

## Organic & Natural

Warmth through imperfection and earth reference. The common thread is rejecting the machine-made look — so avoid crisp gradients and pure grays anywhere inside these styles.

### Organic Warm Minimal
- **Essence:** Minimalism with the thermostat turned up — beige instead of white, brown instead of black, and soft arches instead of rectangles.
- **Use when / Avoid when:** Use for wellness, interiors, skincare, and lifestyle brands where sterility would undercut the product. Avoid for technical products; warmth without precision reads as unserious to engineers.
- **Recipe:** Sand `#EFEAE3` with espresso text `#3E3832` and clay accent `#C4714B`; a low-contrast serif (Fraunces soft cuts) or warm sans (General Sans); airy density; arch shapes and 20px+ radii; flat with soft warm shadow `0 8px 24px rgb(62 56 50 / 0.08)`; slow, breathing motion.
- **CSS keys:** arch imagery `border-radius: 999px 999px 0 0`; warm shadow tinted with the text color, never gray; `background: #EFEAE3` never pure white.
- **Seen on:** aesop.com (adjacent), buffy.co, herbivorebotanicals.com.
- **Pairs with:** Fraunces or Canela Text + General Sans; sand/espresso/clay earth triad.

### Hand-Drawn Sketch
- **Essence:** Marker lines, wobbly borders, doodle arrows, and annotations — the interface as a sketchbook page.
- **Use when / Avoid when:** Use for whiteboard tools, indie games, zines, and education products celebrating process. Avoid for anything precision-critical; wobble erodes confidence in the numbers.
- **Recipe:** Paper `#FDFBF7` with graphite `#2D2A26` and marker accents `#4C6FFF`, `#FF5C5C`; a handwriting or humanist face for accents (Caveat, Shantell Sans) over a clean body font; loose density with annotations in margins; irregular hand-drawn borders; flat with scribble textures; draw-on (stroke-dashoffset) animations.
- **CSS keys:** wobbly borders via `border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px`; SVG `stroke-dasharray` draw-in animation; rough underlines as inline SVG.
- **Seen on:** excalidraw.com, tldraw.com, notion's illustration language.
- **Pairs with:** Shantell Sans or Caveat accents + Inter body; paper neutral + 2 marker colors.

### Botanical Natural
- **Essence:** Greenhouse air — deep greens, pressed-flower imagery, serif elegance, and unhurried space.
- **Use when / Avoid when:** Use for garden/food/sustainability brands, spas, and farm-to-table anything. Avoid for tech products unless sustainability is literally the product.
- **Recipe:** Fern `#2F4838` and sage `#A8B5A0` over linen `#F4F1EA`; an elegant serif (Cormorant, Ogg) with botanical line illustrations; spacious, gallery-like; soft 12px radii; flat with photographic depth and leaf-shadow overlays; gentle parallax on foliage layers.
- **CSS keys:** duotone plant photography via `filter` or blend modes; leaf-shadow overlay PNG at low opacity; thin serif display `font-weight: 300` at large sizes.
- **Seen on:** thesill.com, flamingoestate.com, monc.london.
- **Pairs with:** Cormorant or Ogg + a quiet sans; green-dominant palette grounded in linen.

### Warm Earth
- **Essence:** Terracotta, ochre, and sun-baked tones with rounded geometry — Mediterranean warmth as a design system.
- **Use when / Avoid when:** Use for food, travel, ceramics, and community brands wanting groundedness. Avoid when "cutting-edge" matters; earth tones deliberately anchor to the timeless.
- **Recipe:** Terracotta `#C65D3B`, ochre `#D9A441`, olive `#6B7245` over warm cream `#F7EFE4`, ink `#33261D`; a rounded serif (Recoleta) or warm grotesque; medium density with big color fields; 16px radii and organic blob accents; flat; slow reveals with soft ease.
- **CSS keys:** large tinted sections alternating earth hues; organic blob `border-radius` shapes behind imagery; grain overlay at 4% to unify photography.
- **Seen on:** graza.co, jeni's-style food DTC (jenis.com), airbnb.com (brand campaigns).
- **Pairs with:** Recoleta + Söhne; terracotta/ochre/olive triad on cream.

---

## Luxury & Premium

Luxury is subtraction plus perfect execution. Cheap luxury pastiche (thin gold script on black) fails; real luxury styles spend on typography, photography, and pacing.

### Quiet Luxury
- **Essence:** The Aesop register — muted stone tones, impeccable serif/sans pairing, product photography like still-life painting, and no urgency anywhere.
- **Use when / Avoid when:** Use for skincare, hospitality, architecture, and premium services selling taste itself. Avoid for discount positioning or high-urgency conversion flows; scarcity tactics shatter the register.
- **Recipe:** Stone `#E8E4DC` and greige `#CFC9BE` with charcoal `#26241F`; a refined serif (Canela, Sabon) + neutral grotesque at small sizes; vast whitespace, slow pacing; 0-2px radii; flat, photographic depth only; near-imperceptible fades, no bounce ever.
- **CSS keys:** muted image treatment (slightly lifted blacks via `filter: contrast(0.95) brightness(1.02)`); small tracked-out caps labels `letter-spacing: 0.15em; font-size: 11px`; buttons as understated text links with hairline underline.
- **Seen on:** aesop.com, cereal-mag adjacent (readcereal.com), lemaire.fr.
- **Pairs with:** Canela or Sabon + Suisse Int'l; stone/greige/charcoal, zero saturated color.

### Art Deco
- **Essence:** Gatsby geometry — gold linework, fan and sunburst motifs, symmetrical composition, and high-contrast display type.
- **Use when / Avoid when:** Use for hotels, bars, events, jewelry, and heritage brands invoking glamour. Avoid for modern-tech positioning and dense UIs; deco ornament needs ceremonial space.
- **Recipe:** Deep green `#0E2A25` or noir `#141414` with gold `#C6A15B` and cream `#F3EAD8`; a geometric deco display (Marcellus, Cinzel, or a true deco face) + refined sans body; symmetrical, centered layout; sharp corners with ornamental frames; flat with gold-foil gradient accents; slow, stately reveals.
- **CSS keys:** gold gradient `linear-gradient(135deg, #A8874B, #E2C784 50%, #A8874B)` on rules and icons; SVG fan/sunburst dividers; centered layouts with `border: 1px solid #C6A15B` double-frame insets.
- **Seen on:** thehoxton.com (select properties), death & co. (deathandcompany.com), high-end cocktail bar sites.
- **Pairs with:** Cinzel/Marcellus display + Futura-light body; noir or bottle-green base + gold + cream.

### High-Fashion Minimal
- **Essence:** Runway severity — stark white, tiny Helvetica in caps, enormous photography, and navigation reduced to a whisper.
- **Use when / Avoid when:** Use for fashion labels, photographers, and portfolio brands where the imagery is world-class (this style has nowhere to hide mediocre photos). Avoid for content-rich or utility products.
- **Recipe:** White `#FFFFFF`, black `#000000`, nothing else; Helvetica/Arial at 11-13px in tracked caps for all UI; imagery at full-bleed, text nearly marginal; 0px radii; totally flat; slow crossfade galleries and cursor-driven image trails.
- **CSS keys:** `font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase` global UI type; full-viewport `img` grids with `gap: 2px`; hover-to-reveal navigation.
- **Seen on:** jacquemus.com, therow.com, balenciaga.com.
- **Pairs with:** Helvetica or Arial only (the plainness is the point); strict black and white.

### Dark Luxury Noir
- **Essence:** After-hours opulence — near-black surfaces, champagne metallic accents, serif display type, and cinematic photography.
- **Use when / Avoid when:** Use for spirits, watches, automotive, and nightlife brands. Avoid for daytime-utility products and anything needing dense legible text on the dark ground.
- **Recipe:** Noir `#0F0E0C` with warm charcoal `#1C1A17`, champagne `#D5BB8C`, off-white text `#EDE8DF`; high-contrast serif display (Ogg, Canela Deck) + grotesque body; sparse, cinematic pacing; 2px radii; depth from photographic lighting and faint gold hairlines; slow parallax and light-sweep effects.
- **CSS keys:** hairline gold rules `border-bottom: 1px solid rgb(213 187 140 / 0.4)`; light-sweep hover via animated `linear-gradient` mask; serif numerals at display scale for prices/years.
- **Seen on:** macallan.com, aston-martin configurators (astonmartin.com), audemarspiguet.com.
- **Pairs with:** Ogg or Canela + Founders Grotesk; noir base + champagne, no second accent.

---

## Playful & Friendly

Optimized for delight and low intimidation. The risk is credibility: past a certain audience age or price point, playfulness must be paired with visible competence.

### Cartoon & Mascot
- **Essence:** A character carries the brand — expressive mascot illustration, speech-bubble UI moments, and story-driven pages.
- **Use when / Avoid when:** Use for education, kids' products, dev tools with personality (mascots humanize technical products), and brands built on a character. Avoid when no illustration budget exists — a bad mascot is worse than none.
- **Recipe:** Bright field like `#58CC02` green or `#1CB0F6` blue on white; a rounded bold display (Baloo, Fredoka) + legible sans; medium density with the mascot appearing at key moments; 16-24px radii; flat illustration with simple 2-tone shading; character animation (blinks, waves, reactions to user actions).
- **CSS keys:** Lottie/SVG character animations triggered on scroll and success states; speech-bubble cards with tail via `::after` triangle; oversized bouncy buttons `transform: scale(1.05)` on hover with spring easing.
- **Seen on:** duolingo.com, mailchimp.com, github.com (Octocat moments).
- **Pairs with:** Fredoka or Baloo 2 + Nunito; 1-2 brand brights + generous white.

### Candy Pop
- **Essence:** Sugar-rush color — bubblegum pinks, glossy highlights, bouncy type, and UI that looks edible.
- **Use when / Avoid when:** Use for beauty, snacks, Gen-Z social apps, and merch drops. Avoid for anything wanting gravitas; candy actively repels seriousness.
- **Recipe:** Bubblegum `#FF8FCF`, lilac `#C9A7FF`, sky `#8FD8FF` on white or vanilla `#FFF9F0`; a chubby rounded display (Baloo, Gooper-style) with tight bouncy layout; pill shapes everywhere, 999px radii; glossy depth via top-edge white highlights; jelly squash-and-stretch on every press.
- **CSS keys:** glossy pill `border-radius: 999px; box-shadow: inset 0 2px 4px rgb(255 255 255 / 0.8), 0 8px 16px rgb(255 143 207 / 0.35)`; gradient blobs behind sections; `animation: bounce cubic-bezier(0.68, -0.55, 0.265, 1.55)`.
- **Seen on:** starface.world, topicals.com, claires-adjacent Gen-Z beauty DTC.
- **Pairs with:** A chubby display face + Quicksand; 3 candy pastels + white, high brightness throughout.

### Rounded Friendly
- **Essence:** The grown-up playful default — soft corners, cheerful but controlled color, and generous touch targets; approachable without being childish.
- **Use when / Avoid when:** Use for consumer fintech, health apps, and B2C SaaS needing warmth plus trust — the safest playful choice. Avoid when the user asked for edgy or premium; rounded-friendly is deliberately middle-of-the-road.
- **Recipe:** White base with one warm brand hue (coral `#FF6B5E` or teal `#00B8A9`) and soft neutral `#F6F7F9` wells; a geometric rounded sans (Circular, DM Sans) throughout; comfortable density; 12-20px radii, pill buttons; soft single shadows; gentle 200ms ease transitions with slight overshoot.
- **CSS keys:** `border-radius: 16px` cards + `999px` buttons; brand-tinted soft shadow `0 8px 20px rgb(255 107 94 / 0.18)`; friendly empty-states with simple illustrations.
- **Seen on:** monzo.com, headspace.com, airbnb.com.
- **Pairs with:** Circular/DM Sans; one warm brand hue + calm neutrals.

---

## Contemporary & Emerging

The current-moment styles. These date fastest — flag to the user that choosing one buys relevance now at the cost of a redesign sooner.

### Bento Grid
- **Essence:** Features served as a Japanese lunchbox — a dense mosaic of differently-sized rounded cells, each holding one crisp idea.
- **Use when / Avoid when:** Use for feature overviews, portfolios, and product pages with many parallel points (the grid flattens hierarchy into browseable tiles). Avoid for narrative or single-message pages; bento kills sequence.
- **Recipe:** Neutral base `#F5F5F7` (light) or `#101012` (dark) with cells in subtle tints; Inter/SF with big stat numerals; dense but ordered — cells at 1x1, 2x1, 2x2 spans; 20-24px radii uniformly; faint borders or soft shadows per cell; per-cell hover lift and staggered entrance.
- **CSS keys:** `display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px` with `grid-column: span 2` feature cells; consistent `border-radius: 24px`; staggered reveal via `animation-delay` increments.
- **Seen on:** apple.com (event recaps), diagram.com legacy pages, rewind.ai.
- **Pairs with:** Inter or SF Pro with bold display numerals; neutral base + 2-3 cell tint hues.

### AI Gradient Mesh
- **Essence:** The look of machine intelligence circa now — smooth multi-hue mesh gradients, shimmering iridescence, and orb or particle motifs.
- **Use when / Avoid when:** Use for AI products and model launches where the category signal helps. Avoid if the user wants to stand out from AI products — this is the category uniform, instantly generic.
- **Recipe:** Deep base `#0B0D14` or white with mesh of `#6366F1`, `#EC4899`, `#14B8A6`, `#F59E0B` blurred together; Inter/Söhne with gradient-clipped display lines; clean layout under the atmosphere; 12-16px radii; glow depth; slow hue-shift and orb-drift ambient motion.
- **CSS keys:** mesh via stacked `radial-gradient`s at different positions or an SVG/canvas mesh; `background-clip: text` gradient headlines; `@keyframes hueshift { to { filter: hue-rotate(20deg) } }` slow ambient drift.
- **Seen on:** openai.com, anthropic.com (product moments), perplexity.ai.
- **Pairs with:** Söhne or Inter; 3-4 hue mesh over a disciplined neutral layout.

### Aurora Glow
- **Essence:** Northern-lights ribbons of soft color drifting across a dark canvas — atmospheric, calm, premium-tech.
- **Use when / Avoid when:** Use for sleep/wellness-tech, creative tools, and dark-mode-first products wanting softness without losing the technical register. Avoid on light backgrounds (auroras need darkness) and content-dense pages where the glow distracts.
- **Recipe:** Near-black `#08090D` with aurora ribbons `#22D3EE`, `#A78BFA`, `#34D399` at heavy blur; clean grotesque type in `#E5E7EB`; sparse hero-led layout; 16px radii; glow-based depth; very slow (20s+) ribbon drift loops.
- **CSS keys:** `background: conic-gradient(...)` or layered radial gradients + `filter: blur(100px)` on oversized absolutely-positioned shapes; `animation: drift 24s linear infinite alternate`; content on `rgb(255 255 255 / 0.04)` glass panels above.
- **Seen on:** raycast.com, reflect.app, cron/notion-calendar legacy pages.
- **Pairs with:** Inter or Geist; 2-3 cool luminous hues over near-black.

### Spatial 3D
- **Essence:** The page as a scene — real-time 3D objects, depth, lighting, and camera moves responding to scroll and cursor.
- **Use when / Avoid when:** Use for hardware launches, games, and flagship brand moments with engineering budget (WebGL is expensive to build and to load). Avoid for content sites, low-powered-device audiences, and accessibility-first products.
- **Recipe:** Scene-derived palette, often dark stage `#0C0C0F` with lit product; minimal type (a grotesque) staying out of the scene's way; one hero object, sparse everything else; radii irrelevant — geometry rules; true 3D lighting depth; camera-dolly scroll choreography with reduced-motion fallbacks.
- **CSS keys:** `<canvas>` WebGL (three.js/spline) hero with DOM text overlaid; `position: sticky` scroll stages; CSS 3D fallback `transform: perspective(1000px) rotateY()`; `@media (prefers-reduced-motion)` static poster fallback.
- **Seen on:** teenage.engineering, lusion.co, unseen.co.
- **Pairs with:** A neutral grotesque that defers to the scene; palette sampled from the 3D materials.

### Scroll-Driven Immersive
- **Essence:** The scrollbar is the play head — pinned scenes, morphing visuals, and copy revealed beat by beat like a film.
- **Use when / Avoid when:** Use for product launches and annual-report-style storytelling where users arrive curious. Avoid for reference content and repeat-visit tools; scroll-jacking infuriates users on their fifth visit.
- **Recipe:** Any palette, but high contrast between scenes; big display type revealed line-by-line; one idea per viewport; shapes vary per scene; depth via layered parallax planes; scrubbed animation tied 1:1 to scroll position (never on a timer).
- **CSS keys:** `animation-timeline: scroll()` / `view()` for native scroll-driven animation; `position: sticky` + tall scroll containers for pinned scenes; `scroll-snap-type: y mandatory` for chaptered beats.
- **Seen on:** apple.com/airpods-pro, stripe.com/sessions pages, everylastdrop.co.uk.
- **Pairs with:** One display face at large sizes; palette shifts per chapter to mark progress.

### Monochrome + Single Accent
- **Essence:** A disciplined grayscale world where exactly one saturated color does every job — links, CTAs, focus, brand.
- **Use when / Avoid when:** Use for portfolios, dev tools, and brands wanting instant recognizability on a small budget — one accent is the cheapest strong identity there is. Avoid when the UI needs multi-hue semantic states (charts, statuses) that would dilute the single-accent contract.
- **Recipe:** Grays `#FFFFFF` → `#111111` plus one committed accent — international orange `#FF4F00`, electric blue `#0F62FE`, or acid `#C8FF00`; one grotesque family in 2 weights; clean medium density; 4-8px radii; flat, hairline borders; accent-colored motion moments (underline sweeps, focus rings).
- **CSS keys:** define accent once as `--accent` and use it for links, buttons, selection, focus, charts — nothing else colored; `::selection { background: var(--accent) }`; accent underline `text-decoration-color: var(--accent); text-decoration-thickness: 2px`.
- **Seen on:** hugeinc.com, ableton.com, us.commit-mono style dev portfolios (commitmono.com).
- **Pairs with:** One grotesque (Suisse, Neue Montreal); grayscale + literally one hue.

### Grid-Exposed Blueprint
- **Essence:** The construction lines left visible — dotted grids, crosshair corner ticks, coordinate labels, and mono annotations, like an engineering drawing of the site itself.
- **Use when / Avoid when:** Use for dev tools, design tools, and technical brands that want to signal precision and "built by people who care". Avoid for non-technical audiences; the scaffolding metaphor means nothing to them and reads as unfinished.
- **Recipe:** White or `#0A0A0A` with blueprint blue `#2563EB` or graphite lines `#D4D4D8`; grotesque body + mono (JetBrains Mono) for labels, coordinates, and section numbers (`01`, `02`); structured density with visible column rules; 2-4px radii; flat, line-based depth; precise reveals along gridlines.
- **CSS keys:** dotted grid `background-image: radial-gradient(circle, #D4D4D8 1px, transparent 1px); background-size: 24px 24px`; corner crosshair ticks via positioned `::before/::after` with border tricks; mono metadata labels `font-family: mono; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase`.
- **Seen on:** vercel.com (ship pages), scale.com legacy design, fleet.co and rauno.me.
- **Pairs with:** Inter/Suisse + JetBrains Mono; grayscale + one technical blue.

---

## Combining styles

Hybrids are where most real projects land — pure catalog styles are reference points, not mandates. Follow these rules when blending:

1. **One dominant, one accent — never more.** Pick a dominant style that governs layout, spacing, color system, and components (roughly 80% of decisions). Borrow from at most one accent style, and only its surface treatments: a texture, a type voice, a motion idea. Three-way blends read as incoherence, not richness.
2. **Borrow from the accent's outer layers, not its skeleton.** Taking Paper & Grain's texture into Refined Minimalism works; taking Neo-Brutalism's layout logic into Quiet Luxury does not. If the accent influence changes your grid or component shapes, it has become a second dominant — stop.
3. **Never combine contradictory physics.** Styles carry implicit material rules that clash when mixed: neumorphism (soft, extruded, low-contrast) + neo-brutalism (hard, flat, high-contrast) cancel each other out; glassmorphism (translucent depth) + Swiss International (flat, anti-decoration) is a philosophical contradiction; candy pop + quiet luxury insults both. Test: if you can't describe the combined world in one sentence ("a printed Swiss poster that glows"), the mix is broken.
4. **Safe, proven pairings to suggest:** Dark Developer-Tool Minimal + Grid-Exposed Blueprint annotations; Refined Minimalism + Paper & Grain warmth; Big-Type Manifesto + Monochrome + Single Accent; Organic Warm Minimal + Editorial Humanist typography; Bento Grid + Soft SaaS Gradient cell washes; Terminal/CLI accents inside Dark Dashboard Dense.
5. **Resolve conflicts by product, not preference.** When the user's taste answers pull toward incompatible styles ("brutalist but luxurious"), return to product type and audience: pick the style that serves the audience as the dominant, and satisfy the other craving through the accent layer (e.g., luxury-dominant with brutalist type scale, not brutalist-dominant with gold trim).
6. **Keep the motion language singular.** Whatever you blend visually, use ONE easing personality across the whole product — springy, instant, or stately. Mixed motion registers are the fastest way to make a hybrid feel broken.
