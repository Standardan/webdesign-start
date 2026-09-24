# Discovery: the narrowing game

**Load at:** Phase 1, before asking anything. Also load `formats/index.md`.

The user doesn't know what they want, and they shouldn't have to. They will never say "I want a living-scene site with a paper material". They'll say "a website for my bakery" or "something for my music". Discovery works like a good game of twenty questions played by a creative director:

- **Listen first.** Let them describe it in their own words, then extract every signal.
- **Keep private hypotheses.** Hold 2–4 candidate formats and a few candidate worlds, each with a rough confidence.
- **Ask the question that splits your hypotheses best,** in plain language with vivid options, so every answer rules something out.
- **Say what you're homing in on,** in human terms, never in format names: "It sounds like the site should feel like stepping into the shop, not reading a brochure."
- **Open the range before narrowing.** Right after the fundamentals, show the **exploration spread** (below): 8 very different ideas for *their* subject, drawn from every kind of experience in the gallery. Most people have only ever seen brochure sites. They can't ask for a game, a generator or a flip-book they've never imagined.
- **Stop as soon as you're confident.** Usually that takes 5–10 questions in 2–3 batches. Never ask more than about 12.

The output is the raw material for three concepts: a leading format, the particulars that make this business unlike others, and a world (object, place, time, material, feeling).

## Rules of engagement

1. **Open, don't interrogate.** Start with one inviting prompt if the opening message is thin: "Tell me about it however it comes to you: what it is, who it's for, what you love about it, anything you've seen that you like." Then harvest.
2. **Batches of up to 4 questions,** one batch per message, each question with 2–4 vivid options plus "or describe it your way". With a structured question UI, use it; otherwise use lettered options.
3. **Every option is a real branch.** If two options would lead to the same site, merge them. Options exist to split hypotheses.
4. **Write options for this person.** For a bakery, the object question offers a flour-dusted recipe box, the oven door and a pastry box with string, not generic choices.
5. **No design jargon.** Ask about things people know: objects, places, times of day, films, shops, magazines, how long visitors stay, what they do.
6. **Read back before each batch** in one line, including your current lean: "Got it: a sourdough bakery in a Vermont mill town, busiest on Saturday mornings. I'm picturing something warm you step into rather than scroll past. A few more:".
7. **"Not sure" is useful.** When they hesitate, show instead of asking: describe two or three tiny pictures ("A) you open the site and it's the bakery at 5 a.m., lights on, steam rising; B) it opens like a hand-written recipe book; C) a giant bold poster with today's bread") and let them point. You can also offer 2–3 gallery page numbers as examples (`research.md`).
8. **Unanswered means you decide.** Choose what serves the direction and mark it `(assumed)` in the notes.
9. **Expert users get expert questions.** If they speak design, drop the scaffolding.

---

## The hypothesis board (keep it private, update after every answer)

```
Register:  world 0.6 · product 0.3 · interface 0.1
Formats:   scene 0.45 · product 0.30 · editorial 0.15 · wildcard: journey (starter → loaf → counter)
World:     wood-fired oven, flour dust, the queue on Saturdays
Particulars known: place ✓  craft ✓  signature ✓  era ✗  customer words ✗
Next best question: "one screen vs journey" splits scene from journey; the object question splits scene from editorial
```

Update the confidences from each answer using the signals in `formats/index.md` and the format files' "Signals" sections. Always keep one **wildcard**: a plausible format nobody in the category would expect. It feeds the third concept.

## Choosing the next question

Pick the question whose answers would **most change** the hypothesis board: the one that splits your top two or three formats, or fills the most important missing particular. Rough priorities:

1. **Nothing known yet:** ask what it is, who it's for, and what visitors should do (the fundamentals).
2. **Fundamentals known, nothing explored yet:** show the exploration spread. Its picks often settle the register and the leading formats in one step.
3. **Register unclear:** ask the register question (world, product or tool; `registers.md`). It removes whole families of formats at once, and it stops the skill offering an invented world to someone who wants a sleek product page or a dashboard.
4. **Formats still spread out:** ask a splitting question from the table below.
5. **Format leaning, particulars thin:** ask for particulars. They make the concept singular.
6. **Format and particulars known, feel unclear:** ask the questions for the register: world questions for world sites, product or interface questions otherwise.
7. **Confident:** stop and move to concepts.

### The exploration spread (always, right after the fundamentals)

Show the user **8 ideas for their project, each a different experience**, taken from the 21 experiences in `formats/index.md`. Write each one as a tiny picture of what they'd see and do, specific to their subject:

```text
Here are eight very different directions your site could take. Pick any that make you think "oh, I want that",
mix them, or tell me none of them fit:

A. Step inside: the site opens on your bakery's counter; click a loaf to see how it's made.       (like gallery #18)
B. A launch film: one perfect loaf, studio-lit, turning as you scroll, one bold claim per chapter.  (like #24)
C. Score your own loaf: drag across the dough and watch it bloom in the oven, then order it.        (like #23)
D. A recipe book you flip through, one bread per page, with your baker's notes in the margins.   (like #87)
E. Follow the dough: scroll from the 40-year-old starter to the oven, with a proof gauge.         (like #22)
F. No two alike: every visitor gets a unique generated "crumb portrait" of today's bake.          (like #86)
G. The oven, live: a calm board of what's baking, what's left today and when the next batch is out. (like #68)
H. One bold poster: a huge word that fills the screen, today's breads underneath.                  (like #3)
```

Rules for the spread:
- **Cover the range:** at least 6 different formats, all three registers, and **at least 3 ideas the user wouldn't expect** (play, make, generate, a ritual, learn how it works, live data).
- **Make every idea specific** to their particulars, never "a nice homepage". Each one should be buildable and could honestly serve their primary action.
- **Point to a gallery page** for each (`research.md`) so they can see the kind of thing. If your environment can show images, show the gallery thumbnails (on the gallery site, or its `thumbs/` folder).
- **Accept "more like this" and "show me wilder ones":** one more spread at most, built from what they reacted to.
- **Picks are strong signals.** A picked idea moves its format and register to the top of the board. An unexpected pick (a game, a generator) becomes the primary experience or a borrowed section, and the concepts must include it.
- **No time of day** in the spread unless time is genuinely their subject.

Also useful, as a multi-select: **"What would you love visitors to be able to do?"** Offer 6–8 of: look around a place · watch something calming · scroll through a journey · read a story · flip pages · turn an object · play a game · make music · draw or build something · get something unique · browse a collection · learn how it works · look things up · watch live numbers · use a handy tool · be hit by one bold statement · just buy easily.

### The fundamentals (almost always needed)

- **What is it?** A business or service, a shop, a portfolio, a restaurant or venue, a product or app, an event or launch, a publication, a personal project, something else.
- **Who is it for, and what should they do?** The main visitor in a phrase, and the one action that matters most: book, buy, call, sign up, read, visit, donate, play, or just be impressed.
- **What exists already?** Logo, colours, real photography (of what, how good), copy, an existing site (what they like or hate about it).
- **How should it be built?** Ask in plain words unless an existing codebase decides it: "A single file you can open or upload anywhere, or a full project a developer can keep growing?" Recommend one based on what you've heard (`build-standards.md`).

### Splitting questions (plain language, each answer moves the board)

| Ask | Options that split |
|---|---|
| "When someone visits, what will they mostly do?" | Read a story · Look around and feel something · Buy or book · Browse lots of things · Play or make something · Learn how something works · Come back to use it regularly |
| "How long do you imagine them staying?" | A quick, memorable glance · A few minutes of discovery · Coming back often |
| "Should it all fit on one screen like a poster, unfold as they scroll, or turn like the pages of a book?" | One screen · Unfolds with scroll · Turns like pages · Not sure (show three tiny pictures) |
| "Is there one thing that has to be the star?" | A product · A place · Your work or pieces · Numbers or reach · A story or idea · A feeling |
| "Calm and quiet, or loud and bold?" | Calm, like a quiet room · Warm and welcoming · Confident and bold · Loud, like a poster on a wall |
| "Should people be able to touch, play with or make something?" | Yes, make their own thing · Yes, play with it · Just a little delight · No, keep it simple |
| "Is there a natural path through it: time, depth, steps, a process?" | Yes: [name the likely one for them] · No, it's more a place to look around |

### Particulars (what is true of them and nobody else)

Ask for 2–4, with prompts that fit the business:
- **Place:** town, neighbourhood, landscape, climate, building.
- **History:** founding year, how it started, what has changed.
- **Craft and process:** method, tool, material, a number ("a 40-year-old starter", "we fish with lines only").
- **The signature thing:** what people come back for.
- **In their customers' words:** what people say, the nickname, the review line.
- **The person:** who founded it, why, their voice.

This is the most important input in the skill. Particulars are what keep two bakeries from getting the same site.

### Product questions (product register)

- **"What's the one thing it does better than anything else?"** That's the first chapter's truth.
- **"What should people see first: the product itself, the product working, or the result it gives?"**
- **"Which launches or brands feel closest?"** Offer contemporary names they'll know (Apple, Nothing, Dyson, Teenage Engineering, Rivian, Aesop), and ask what exactly they like.
- **"Do you have product photos, renders or a 3D file?"** The product asset decides what's possible.

### Interface questions (interface register)

- **"Who opens it, and how often?"** Daily power users, occasional customers, executives at a glance.
- **"What's the one number or decision they come for?"** It becomes the largest thing on the screen.
- **"Calm and spacious, or dense and powerful?"**
- **"Which tools do you enjoy using?"** (Linear, Stripe, Notion, Arc, Things), and what exactly they like.
- **"Light, dark or both?"**

### World questions (world register only)

- **"If your website were a physical object, what would it be?"** Offer 3–4 objects native to their business. The answer is often the concept itself. The object supplies the idea and the interactions, not a vintage look: a pastry box becomes a crisp, softly lit 3D box that opens, not an old-fashioned illustration.
- **Time, season or light:** only when time genuinely belongs to the business (a sunrise tour, a nightlife venue, a 24-hour service, a seasonal product). Never ask it by default. It is one possible idea, not the frame for every site (`registers.md`, "Light and time are tools, not themes").
- **"What should someone feel in the first three seconds?"** Offer pairs that force a choice: calm or thrilled, awed or welcomed, trusting or curious, cosy or impressed.
- **Period or modern?** Sites are contemporary by default. If the user says "vintage", "classic", "old-school", "rustic" or "retro", ask once: "Do you want it to actually look like it's from another era, or modern with that warmth and character?" Only a clear "another era" unlocks a period style.
- **"What do you love outside of websites?"** Films, shops, packaging, a hotel, a record sleeve, a museum. And websites they admire, with *what exactly* they love (`research.md`).

## When to stop

Move to concepts when all of these hold:
- one format leads clearly, or two are close enough to become two of the three concepts;
- you know at least two particulars;
- you have a world: an object, place, time or feeling;
- the primary action is known (for business sites).

If the user is getting impatient, stop earlier. Assume what's missing, mark it, and let the concepts do the rest of the narrowing: reacting to three concrete concepts is the best question of all.

## Worked example (illustrative)

1. *User:* "I need a website for my plant shop." Board: register world 0.5 · product 0.3 · interface 0.2; formats collection 0.3 · scene 0.3 · product 0.2. Wildcard: explainer ("how to keep it alive").
2. *Ask the fundamentals:* who visits, what they should do (visit the shop, buy online, book a workshop), and the shop's particulars (place, what it's known for).
3. *User:* "People come in to browse for ages. We're in an old greenhouse by the canal, known for weird rare plants, and customers say it feels like a jungle. We also sell online."
4. *Show the exploration spread:*
   - step inside the greenhouse (#18);
   - a plant specimen cabinet to browse (#11);
   - "keep it alive": a care simulator where you water and move a plant into the light (#100);
   - grow your own: a generated plant unique to each visitor (#78);
   - a field guide to flip through (#87);
   - a product film for one extraordinary plant (#24);
   - the greenhouse, live: humidity, temperature and what's newly in (#12);
   - one bold poster (#3).
5. *User:* "The cabinet and the care simulator! And the generated plant is cute." Board: collection 0.55 (primary) · explainer 0.3 (borrowed section) · generative 0.15. Register: world.
6. *Read back:* "So a beautiful cabinet of rare plants you can browse and buy, with a little care simulator that teaches you how to keep one alive." *Ask:* browsing feel (a botanist's drawer, a glasshouse gallery, a modern shop grid); calm or lush; photos available?
7. *Concepts:*
   - A: a specimen cabinet with drawers that slide open, each plant a plate with care notes, and the care simulator as the plant detail view.
   - B: a lush glasshouse gallery you move through room by room, shopping as you go.
   - C (wildcard): a "grow your own" generator on the homepage that matches you to a real plant in stock.

## Discovery Notes template

Read this back and get a "yes, that's it" before Phase 2.

```markdown
## Discovery Notes: [project]

**What:** [type] for [business], [one-line description]
**For:** [main visitor]. **Primary action:** [one action]
**Particulars:** [place] · [time/era] · [craft/process] · [signature thing] · [customer words]
**World:** object [..] · time [..] · feeling [..]
**Loves:** [thing: trait in their words] …
**Leaning:** [plain-language description of the direction], candidates [format A, format B, wildcard C]
**Assets:** logo [y/n] · colours [..] · photography [what, quality] · copy [y/n]
**Practicals:** pages [..] · functions [..] · build mode [single file / project, stack] · deadline [..]
**Assumed:** [anything you decided for them]
```
