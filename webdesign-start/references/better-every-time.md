# Better every time: the portfolio ledger, the side-by-side and the retro

**Load at:** Phase 2 (read the ledger before concepts), Phase 7 (the final step), and whenever a site is finished.

A skill that produces fine sites produces similar sites. The way out is a memory and a bar. Every site this skill builds is recorded; every new concept is checked against what was built recently; every new site has to beat the best earlier ones before it ships; and every site ends by writing one improvement back into the skill. The next site should look better than the last one. This is not optional polish. It is the last step of Phase 7 and part of the report.

## 1. The portfolio ledger

A plain text file listing every site built with this skill, newest last. Keep it where the next build will find it:

1. `.webdesign-start/ledger.md` in the project, if the project keeps its sites in one workspace (a multi-site repo: put it at the workspace root);
2. otherwise a user-level file: `~/.webdesign-start/ledger.md` (create the folder if needed). Say which you used in the report.

Never put client or customer data in the ledger if the ledger lives in a public repository. Use the project's own private workspace. The ledger records *design* facts, not business facts.

**Entry format** (one block per site, appended at the end of Phase 7):

```markdown
## 2026-10-12 · Fictional example: Orchard Row Pies
- **Format / artefact:** product showcase · a pie counter
- **Hero type:** product you can touch (`hero.md`) · first thing the eye lands on: the lattice pie, 70% of frame
- **Primary action:** pre-order tomorrow's pies by 6 pm (`primary-action.md`)
- **Signature devices:** pie selector that swaps photo, price and description; torn-paper section edges
- **Interaction that changes content:** selection → photo, price, description
- **Palette family:** warm neutral, one cherry accent (ground #f4ead8, accent #b5301f)
- **Type pairing:** a high-contrast serif display with a plain grotesque text face
- **Photography:** client photos, cut-outs with contact shadows, one consistent warm grade
- **Beat in side-by-side:** first frame vs Fern Street Barbers; signature moment vs Corner Hardware
- **Retro:** added §9 recipe "selection swaps the photograph" to techniques.md (v2.6.0)
```

Use short, consistent values so entries compare. If the file does not exist, create it with a one-line header.

**Ledger hygiene when more than one agent or session builds in the same workspace.** Read the file before you write; add your block at the end and never replace the file or paste a fresh draft over it; do not run `git checkout -- .webdesign-start/ledger.md` or any other restore on a shared ledger (it throws away other sessions' uncommitted entries). If you must reconcile two versions, merge their blocks, keep every block, and say so in the report. One block per site and one per rebuild; a rebuilt site gets a new block, the old one stays as history.

## 2. No repeats across the last N sites

Before Phase 2 concepts (read the ledger) and again at the creative-direction gate (check):

- **Hero type:** must not equal any of the last **4** sites' hero types. (At 25 entries or fewer, 4 is the floor; with a bigger portfolio use 6.)
- **Signature device:** none of a new site's named devices (a paper ticket, a map as decoration, a swinging tag, a receipt, a stamp, a spec-sheet label, a wavy divider, a dark slab top and bottom) may appear in more than **2 of the last 10** sites, counting this one.
- **Palette family** and **type pairing:** must differ from the last 3 sites.
- **Primary action framing:** a phone-first first frame twice in a row is a repeat.

If the ledger says a choice is a repeat, pick another before writing the paragraph. The first concept to be rejected for this reason is a good sign, not a loss.

If no ledger exists yet, create it from the sites already built in the workspace (look at their briefs or code and fill what is known) before concepts.

## 3. The side-by-side critique (before shipping)

The new site must beat the best earlier sites. This is a visual check on rendered screenshots, not a feeling.

1. **Pick the comparison set:** the 2 to 3 best earlier sites in the ledger (the owner's favourites if named; otherwise the ones with the strongest first frames), preferring ones of a different format so the comparison is about quality, not type.
2. **Screenshot all of them** at 1440×900 and 390×844: the first frame, and the signature moment of each.
3. **Place the new site next to each one** (a contact sheet or two images side by side). Judge in this order:
   - **First frame:** which would you screenshot and send? Which has the clearer focal point, the better picture, the more distinct composition?
   - **One signature moment:** which has the memorable thing, and does the new site's moment do something theirs cannot?
   - **Sameness:** does the new site look like a sibling of any of them? (Same hero type, same device, same layout skeleton, same palette family.)
   For a blind check, make the sheet with `python3 scripts/contact_sheet.py --blind -o sheet.png frame1.png frame2.png ...` (one sheet for 1440 frames, one for 390 frames; the script prints the key, keep it from the reviewer) and give it to a separate reviewer with only this question: rank these by "the first frame I would screenshot and send to a friend", then list each one's three worst problems. A new site that ranks below an earlier one has lost, however good it looks to you: change the first frame and run it again. (A studio's own site whose hero displays other sites ranked fourth of five in nine rounds, always behind the bespoke originals it displayed: a hero made of someone else's screenshots cannot beat them on a static first frame. Give such a site its own art direction, a physical object and a voice, not only a frame around the work.)
4. **The new site must win** on at least the first frame **and** one signature moment against every site in the comparison set. If it loses or ties, **fix it before shipping**: change the hero, sharpen the moment, push the photography, and compare again. Record the loop count.
5. If there are fewer than two earlier sites, compare against two gallery pages in the same format (`aesthetics.md` §4) instead, and say so.
6. A separate reviewer helps (a subagent or fresh session with only the screenshots, asked "which of these is best, and why?"). The builder is a poor judge of their own work.

Write the verdict in the report in one line per comparison: what the new site does that the older one does not.

## 4. The retro (one concrete improvement, written back)

At the end of every site, before the report, write down what made this build harder than it should have been, or what you did that worked and the next build should do every time. Then **write at least one concrete improvement into the skill**:

- a technique or recipe in `techniques.md`,
- a rule or check in a reference file,
- a new audit code or threshold in a script,
- a worked example, or a failure added to `review.md`'s list,
- a correction to a doc that cost time.

Do this through the skill's own repository (`AGENTS.md`: edit the repo, add a `CHANGELOG.md` line, bump the patch or minor version when releasing), never by editing an installed copy that self-updates. If the skill repository is not available in this environment, write the proposed change in the project's backlog (`.webdesign-start/skill-backlog.md`) with the file, the wording and the reason, and say so in the report.

Rules for the retro:
- **Concrete means a change you could diff:** "add `clip-path` arch mask recipe to `techniques.md` §9" counts; "be more careful with photos" does not.
- **No client or lead data** goes into the public skill. Use fictional examples.
- **One is the minimum.** If the build exposed more, write more.
- **Record it in the ledger's Retro line** and in the report.

## 5. In the report

Add to the review report (`review.md`):

```markdown
**Portfolio:** ledger at [path]; hero type [x] (last four: …); devices [x, y] not repeated; palette family [x]; type pairing [x].
**Side-by-side:** [site A] first frame: [what wins]; [site B] signature moment: [what wins]. Loops: [n].
**Retro:** [the improvement written back, with the file and the CHANGELOG line].
```
