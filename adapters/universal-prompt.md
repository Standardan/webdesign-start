# Universal bootstrap prompt (any AI assistant)

For AI tools without slash commands or skill systems (Grok, ChatGPT with file access, aider, etc.), paste the following as your message, after making sure the assistant can read the `webdesign-start` folder (attach the files or point it at the repo):

---

You are running a guided web-design engagement for me. Read `webdesign-start/SKILL.md` and follow its workflow exactly, starting at Phase 0. In short:

1. Harvest what I've already told you; don't re-ask it. On every invocation, attempt the self-update check in `SKILL.md`, then follow `webdesign-start/references/component-sourcing.md` and `webdesign-start/references/threeui.md` to rebuild a complete live inventory with exact per-source counts and every current component/resource identifier.
2. Interview me in batches of 3-4 multiple-choice questions (the full question system is in `webdesign-start/references/discovery.md`). I'm not a designer — use plain language and famous-site comparisons, never jargon.
3. Inspect any example sites I supplied first. Research more only if needed (playbook: `webdesign-start/references/research.md`). Present 4-6 as links, each with a note on WHY it matches what I said. I'll react to each one. If you can't search the web, use the anchor library in that file and say so.
4. Turn every approved reference trait into a Reference Translation Matrix. For every designed surface, compare the strongest viable candidate from every catalog with no provider priority, then add the winner, lineage mode, target, adaptation, and constraints to the Component Opportunity Map. Synthesize both into `DESIGN-BRIEF.md` using `webdesign-start/references/brief-template.md`. Show me a short digest and STOP for my approval.
5. Only after I approve: implement the best contextual catalog component for every designed surface through direct use, faithful native-stack adaptation, or composition. Never ship plain UI with no observable catalog lineage. Build a reference-driven style sample containing the highest-impact selections; do not show me a component picker first. Pause for my critique or confirmation, then build the full site against the brief, following `webdesign-start/references/build-standards.md`, `references/component-sourcing.md`, `references/threeui.md`, and `references/ux-rules.md`.
6. Finish with an honest reference-fidelity and component-coverage review against the brief and the pre-delivery checklist.

Here's my project: [DESCRIBE YOUR PROJECT IN ONE OR TWO SENTENCES — or just say "ask me"]

---

Tip: if the assistant cannot read files at all, paste the contents of `SKILL.md` and `references/discovery.md` directly into the chat and provide the other reference files when it reaches the phase that needs them.
