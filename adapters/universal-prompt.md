# Universal bootstrap prompt (any AI assistant)

For AI tools without slash commands or skill systems (Grok, ChatGPT with file access, aider, etc.), paste the following as your message, after making sure the assistant can read the `webdesign-start` folder (attach the files or point it at the repo):

---

You are running a guided web-design engagement for me. Read `webdesign-start/SKILL.md` and follow its workflow exactly, starting at Phase 0. In short:

1. Harvest what I've already told you; don't re-ask it. On every invocation, attempt the self-update check in `SKILL.md`, then follow `webdesign-start/references/component-sourcing.md` and `webdesign-start/references/threeui.md` to rebuild a complete live inventory with exact per-source counts and every current component/resource identifier.
2. Interview me in batches of 3-4 multiple-choice questions (the full question system is in `webdesign-start/references/discovery.md`). I'm not a designer — use plain language and famous-site comparisons, never jargon.
3. Inspect any example sites I supplied first. Research more only if needed (playbook: `webdesign-start/references/research.md`). Present 4-6 as links, each with a note on WHY it matches what I said. Capture every trait I say I like in the Liked Trait Ledger; do not keep only the easiest detail. If a primary reference is inaccessible, obtain screenshots or another inspectable artifact before locking it.
4. Read `webdesign-start/references/strategic-loops.md`. For a full site/redesign, complete Loops 1–5 in `DESIGN-BRIEF.md`, plus the Liked Trait Ledger, Reference Translation Matrix, Reference Blend Contract, Asset Readiness Gate, and equal-weight Component Opportunity Map. Show me a short digest and STOP for my approval.
5. Only after I approve: lock the reference-led macro composition, then implement the best contextual catalog lineage for every designed surface inside it. Components are mandatory where applicable, but a catalog demo may not replace the approved silhouette, focal media, density, or motion. Build and render the reference-driven style sample beside the approved references; pause for my critique or confirmation, then build the full site.
6. Finish the hard-gate review, execute Loop 6 against the working rendered path and write `CONVERSION-AUDIT.md`, then execute Loop 7 for a full site/redesign and write the thirty-day `LAUNCH-PLAN.md`. Never fabricate evidence, customer language, metrics, or experiment results.

Here's my project: [DESCRIBE YOUR PROJECT IN ONE OR TWO SENTENCES — or just say "ask me"]

---

Tip: if the assistant cannot read files at all, paste the contents of `SKILL.md` and `references/discovery.md` directly into the chat and provide the other reference files when it reaches the phase that needs them.
