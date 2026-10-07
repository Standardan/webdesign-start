# Human copy and layout cadence (no AI tells)

**Load at:** Phase 3 (before writing the paragraph's copy voice), Phase 5 (while writing copy), Phase 6 and Phase 7 (run `scripts/copy_audit.js`).

A site can be beautiful and still read as machine-made in two seconds. Visitors don't name it, they just stop trusting it. The tells are small and repeat everywhere: em dashes in every other sentence, the same stock phrases, a tiny tracked label above every big headline, and every section opening the same way. This file lists the tells and what to do instead. The concept still decides the voice; these are floors, not a style.

## 1. Punctuation

- **No em dashes (—) in visible copy.** Rewrite the sentence: a period, a comma, a colon, or parentheses. "Fresh bread — baked at 4 a.m." becomes "Fresh bread, baked at 4 a.m." or "Fresh bread. Baked at 4 a.m."
- **No spaced hyphens or en dashes used as dashes** (" - ", " – "). Same fix.
- **Ranges in words:** "Tue to Sat, 9 to 5", "$40 to $60". A plain hyphen is fine in compact data (a timetable cell, "9-5" on a sign), never an en dash in prose.
- At most one colon and one semicolon per paragraph. No ellipses for drama.

## 2. Words and cadence

Write the way the business owner would say it to a customer at the counter: specific nouns, plain verbs, real numbers, contractions.

**Never use these stock patterns** (the audit flags them):
- "Not just X, it's Y" / "X isn't just Y. It's Z." / "more than just"
- "Whether you're X or Y, …"
- "Elevate", "seamless", "crafted with care", "curated", "bespoke" (unless it's literally a tailor), "nestled", "vibrant", "unparalleled", "cutting-edge", "game-changer", "unlock", "embark", "delve", "journey" (unless it is one), "tapestry", "testament"
- "Your trusted partner", "we've got you covered", "look no further", "say goodbye to", "from A to Z", "at the heart of", "experience the difference", "where X meets Y"
- Openers like "Imagine…", "Picture this…", "Here's the thing", "The best part?"
- Stacked one-word sentences as a slogan: "Fast. Friendly. Local." Once on a page at most, and only if the owner would say it.
- Every heading a pun, or every heading a question.
- "Ready to…?" as the closing headline.

**Do this instead:**
- Lead with a fact only this business has: the street, the year the oven went in, the three stylists' names (if real), the 24-hour line, the price.
- Vary sentence length. Two short, one long. Read it aloud; if you wouldn't say it, rewrite it.
- One idea per sentence. Cut adjectives that any competitor could use.
- Headlines say something a customer wants to know ("Leaks fixed today, most of Millbrook") rather than a mood ("Your comfort, our commitment").

## 3. Layout cadence

The other tell is structural: every section built from the same three parts.

- **The eyebrow stack:** a tiny uppercase tracked label, then a giant headline, then a small grey paragraph. Use it **once at most** (usually the hero), and only if the concept wants it. Never as the opening of every section.
- **Tracked uppercase labels:** at most 3–4 visible per page, used for real metadata (a time, a price unit, a status, a map legend), never as decoration above headings.
- **Vary how sections open.** Start one with the content itself (the menu, the photo wall, the map), one with a heading set inline with a paragraph, one with a big number or a real quote of the business's own words, one with no heading at all because the content explains itself.
- **Vary the grid.** Not every section is "headline left, paragraph right" or "centered heading over three cards".
- **Scale with purpose.** Big type is for the one thing that matters in that section. Mid-size type exists; not everything is huge-or-tiny.

## 4. The check

Run `scripts/copy_audit.js` in the rendered page (paste into the console or evaluate with your browser tool) at 1440×900 after the build and again in review. It reports:
- `DASH` every em dash or dash-like hyphen in visible text, `RANGE` en dashes in ranges;
- `PHRASE` stock AI phrases from §2;
- `LABELS` how many small tracked uppercase labels are visible (fail above 4);
- `STACK` sections that open with label → big heading → paragraph (fail when it happens in 2 or more sections);
- `SLOGAN` stacked one-word sentence slogans.

A clean audit is required before the review report. Fix by rewriting, not by hiding text from the audit.
