# The Design Brief — Template & Usage

This file defines `DESIGN-BRIEF.md`, the single source of truth produced in Phase 3 and consumed by every later phase (and by future sessions in any AI tool). A good brief means a session that starts six weeks from now — in a different assistant — can extend the site without re-interviewing the user.

**When to read this file:** entering Phase 3, after Reference DNA is confirmed.

## Usage rules

1. **Location:** write to `DESIGN-BRIEF.md` at the project root. If you cannot write files, output the full brief in chat, fenced, and ask the user to save it at the project root under that exact name.
2. **Fill every section.** An empty section means an undecided decision that will be improvised inconsistently at build time. If something is genuinely open, write it in **Open questions** rather than leaving silence.
3. **Traceability.** Every choice should trace to a discovery answer, an approved reference, or an industry-playbook rule — the *Why* column/notes exist so future sessions (and the user) can distinguish "decided for a reason" from "arbitrary, feel free to change."
4. **Present as a digest, not the file.** After writing, show the user: direction paragraph, palette as a labeled list, the two fonts, the page list, and anything you flagged. Ask for approval. Do not paste the whole brief into chat unless asked.
5. **The brief is law during build** — but living law. When the user requests changes mid-build, update the brief first, then the code, so the two never diverge.
6. **Page-level overrides.** If one page needs different rules (e.g., a dark landing page for a launch inside a light site), add a subsection under **Page map** rather than forking the token set.

## Template

````markdown
# Design Brief — [Project name]
_Last updated: [date] · Status: [draft | approved | in-build | shipped]_
_Produced by the webdesign-start discovery process. Read fully before any visual work._

## 1. Project snapshot
- **What:** [product type + one-liner]
- **Audience:** [who arrives, what they know, what they fear]
- **#1 visitor action:** [the conversion this site optimizes for]
- **Positioning:** [premium/mid/budget · established/challenger · local/global]

## 2. Reference DNA (user-approved)
| Source site | What we take | What we explicitly don't |
|---|---|---|
| [URL] | [spacing philosophy, nav treatment…] | [its density, its palette…] |
| [URL] | […] | […] |

**Never-list (from user + industry anti-patterns):**
- [e.g., no stock-photo corporate feel; no carousel hero; no red as primary (medical)]
- The anti-slop defaults (references/anti-slop.md) are always on this list implicitly; add any that this project is especially at risk of.

## 3. Style direction
**Dominant style:** [name from styles.md] — [one-sentence essence]
**Accent influence (max one):** [name or "none"]
**In practice:** [3-5 bullets of what this means concretely for THIS site]

## 4. Color system
Mode: [light-only | dark-only | light + dark toggle]

| Token | Light | Dark | Notes |
|---|---|---|---|
| --background | #… | #… | |
| --surface | #… | #… | cards, raised panels |
| --text-primary | #… | #… | ≥4.5:1 on background |
| --text-muted | #… | #… | ≥4.5:1 body / 3:1 large |
| --border | #… | #… | |
| --primary | #… | #… | brand / CTA |
| --primary-hover | #… | #… | |
| --accent | #… | #… | sparing use only |
| --success / --warning / --danger | #… | #… | |
| --focus-ring | #… | #… | visible on both modes |

**Gradients (if any):** [stops + where allowed]
**Distribution:** [e.g., 60% background neutrals / 30% surface+text / 10% primary+accent]

## 5. Typography
- **Display:** [font], weights [x, y] — [source: Google Fonts / self-host note]
- **Body:** [font], weights [x, y]
- **Mono (if used):** [font]
- **Scale:** [ratio + the actual px/rem ladder, incl. clamp() for hero/h1/h2]
- **Rules:** [line-heights, letter-spacing notes, max measure]

## 6. Space, shape & depth
- **Spacing scale:** [4/8-based ladder] · **Section padding:** [desktop / mobile]
- **Container:** [max-width + gutters]
- **Radius:** [none / sm / md / pill — the actual px values]
- **Depth:** [flat / subtle shadow recipe / glass recipe — the actual CSS values]
- **Borders:** [weight + when]

## 7. Motion
- **Appetite:** [none / subtle / rich]
- **Vocabulary:** [e.g., 16px fade-up reveals on scroll, 150ms hover transitions,
  stagger 60ms, easing cubic-bezier(0.22, 1, 0.36, 1)]
- **Always:** respect prefers-reduced-motion; transform/opacity only.

## 8. Components inventory
[Only components this site needs. For each: one line of treatment.]
- Buttons: [primary/secondary/ghost treatments]
- Nav: [pattern, sticky behavior, mobile pattern]
- Cards: […] · Forms: […] · Footer: […] · [etc.]

## 9. Page map
[One block per page, in build order.]

### [Page name] — `/route`
Purpose: […] · Formula: [from layouts.md, e.g., "SaaS landing 10-section"]
Sections: [ordered list, one line each with content status (real/placeholder)]
[Optional: **Overrides:** any page-specific deviations from global tokens]

## 10. Content status
- Copy: [real / AI-drafted placeholder (sounds real, flagged) / mixed — per page]
- Imagery: [available / placeholder strategy from build-standards.md]
- Logo: [exists / text-wordmark placeholder]

## 11. Build settings
- **Stack:** [detected or chosen + why] · **Styling:** [vanilla CSS custom props / Tailwind / …]
- **In scope:** [dark mode? blog? forms→where do submissions go? analytics?]
- **Out of scope (explicitly):** […]

## 12. Open questions
- [Anything unresolved, with the current working assumption]
````

## Digest format (what the user actually sees)

After writing the file, present approval like this — short enough to read in 30 seconds:

```markdown
The design brief is written. The short version:

**Direction:** [2-3 sentences weaving style + references: "A quiet, editorial site in the
spirit of [Site A]'s spacing and [Site B]'s warmth — cream background, ink text, one
persimmon accent, serif headlines, soft-rounded buttons, subtle scroll reveals."]

**Palette:** [name each core color plainly: "cream #FAF7F2 background · ink #1A1815 text ·
persimmon #E8552F for buttons/links"]
**Type:** [Display] for headlines, [Body] for text
**Pages:** [list] · **Motion:** [one line] · **Mode:** [light/dark]
**Flagged:** [anything defaulted or in tension, e.g., "you said X but the industry norm is Y — I went with…"]

Approve to start the build, or tell me what to adjust. (Full details: DESIGN-BRIEF.md)
```

Approval must be explicit before Phase 4. "Looks good," "approve," "go" all count; silence or a topic change does not — ask once more, plainly.
