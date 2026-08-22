# ThreeUI Live Visual-Component Protocol

ThreeUI contributes authored visual experiences to the equal-weight component collection: immersive heroes, Three.js/WebGL scenes, shader and canvas backgrounds, generative typography, dimensional galleries, visual loaders, and expressive controls. It receives neither preference nor penalty because of its source; compare its current items with every other catalog using the neutral rubric in `component-sourcing.md`, including each candidate's actual runtime cost.

**Read this file:** during the Phase 0 catalog refresh; again in Phase 3 when a page could benefit from a signature visual; and immediately before installing, copying, or adapting a ThreeUI item.

## Trigger and non-trigger

Check ThreeUI when the approved direction or feature calls for:

- a hero scene, atmospheric world, shader background, or brand-defining visual system;
- Three.js, WebGL, Canvas 2D, particle, field, globe, landscape, or generative effects;
- expressive text animation, dimensional media browsing, a visual dock, or a crafted loading/status moment;
- a high-impact button or control whose visual behavior is itself part of the concept.

Do not force ThreeUI into:

- ordinary forms, navigation, disclosure, data entry, dialogs, or menus when a different current catalog item or established accessible primitive is the stronger fit;
- a content-first page whose approved direction is quiet/static;
- a product hero where an abstract scene would replace real product evidence, photography, or an actual artifact;
- a non-React project when adding React/Three.js would cost more than the visual contributes;
- any page that cannot meet the performance, fallback, reduced-motion, and device-support gates below.

## Live sources

Use current upstream data; this file is routing guidance, not a frozen catalog.

1. Browse and previews: `https://threeui.com/browse`
2. Community repository: `https://github.com/MengTo/threeui`
3. Publication boundary and current counts: `https://raw.githubusercontent.com/MengTo/threeui/main/public/community-sync-report.json`
4. Full Community metadata: `https://raw.githubusercontent.com/MengTo/threeui/main/src/data/shaders.tsx`
5. Package metadata: `https://registry.npmjs.org/%40designcodeio%2Fthreeui/latest`
6. Installation: `https://threeui.com/installation`
7. License and notices: repository `LICENSE`, `ASSET-LICENSES.md`, `FONT-LICENSES.md`, and `THIRD_PARTY_NOTICES.md`
8. Complete source bundle index, **selection time only**: `https://raw.githubusercontent.com/MengTo/threeui/main/public/source-code.json`

The complete source index is tens of megabytes. Do not fetch it during the general Phase 0 refresh. After selecting an item, prefer the package or fetch only the exact paths named by that item's `sourceFiles`. Use `source-code.json` only when the item requires its complete verified file/asset bundle and targeted raw files are insufficient.

The public repository contains Community source only. Do not claim that Pro or Beta items are open source, scrape them, or call the authenticated Pro MCP automatically. Use Pro material only when the user explicitly supplies authorized access and asks for that workflow.

## Phase 0 refresh and inventory

On every skill invocation:

1. Fetch `community-sync-report.json`, `shaders.tsx`, the latest npm package metadata, and the repository `main` SHA.
2. Confirm the publication boundary from the report: Community parent IDs, routes, variants, and excluded Pro/Beta counts. Counts are observations for this run, not constants to copy into the skill.
3. Read every Community parent record in `READY_SHADERS`. Build a compact inventory grouped by `category`, then note each item's `id`, `label`, `description`, `runtime`, `tags`, `importName`, `interaction`, `asset`, and whether it has variants/controls.
4. Record the upstream commit and package version examined. Do not treat package version and repository commit as interchangeable provenance.
5. Merge the complete ThreeUI identifiers and reconciled counts into the engagement's Complete Resource Inventory from `component-sourcing.md`.

If these sources are unavailable, do not select a remembered ThreeUI component for a new installation. Continue with verified local components or other live catalogs, state once that ThreeUI freshness could not be checked, and record the gap in final review.

## Selection workflow

For each possible signature visual:

1. Define the job before the effect: communicate product behavior, establish place, visualize data, create atmosphere, navigate media, or provide state feedback.
2. Search the live ThreeUI inventory by job, category, runtime, description, and tags. Inspect the closest live preview; never select from a thumbnail alone.
3. Inspect the item's metadata contract: source files, runtime, passes, interaction, assets, import name, controls, and variants.
4. Compare it with the approved Reference Translation Matrix. Select only when the component reinforces a named reference obligation or governing idea; spectacle alone is not fit.
5. Check stack cost, bundle/runtime cost, WebGL support, mobile behavior, reduced motion, fallback strategy, licensing, and asset availability before placing it in the Component Opportunity Map.
6. Record the exact Community ID and variant, package version or source commit, selected target, adaptation, fallback, and performance budget.

Cross-catalog comparison:

- Include ThreeUI whenever its current metadata indicates plausible functional or visual fit.
- Retain the strongest viable finalist from beUI, ThreeUI, Uiverse, and MDC for the surface, even when one appears obvious at first.
- Compare all finalists on approved-reference fit, function, stack, accessibility, interaction quality, performance, assets/license, and adaptation cost.
- Select another catalog when it fits better; select ThreeUI when it fits better. Never use catalog identity as the reason.

Do not present a catalog picker. Make the strongest compatible selection and let the rendered style sample be the user's critique point.

## Integration paths

### React or Next.js

Verify the current package metadata before installation, then use the project's package manager:

```bash
npm install @designcodeio/threeui
```

Import the selected `importName` and shared stylesheet exactly as current docs specify:

```tsx
import { PredictiveArcCanvas } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
```

Inspect package peer dependencies first. Make WebGL components client-only in SSR frameworks, dynamically import heavy scenes, and give every renderer an explicitly sized host. Import only the selected component; do not mount the catalog application.

### Source-owned Community integration

Use this when package use is incompatible or the selected item is supplied as a complete authored document/source bundle:

1. Read the selected metadata record and its exact `sourceFiles`.
2. Fetch those paths from the same recorded commit. Copy required binary assets byte-for-byte and preserve relative paths/hashes where upstream provides them.
3. Read the item's current implementation guide/source contract; do not reconstruct GLSL, geometry, render passes, or authored lifecycle from screenshots.
4. Adapt the host boundary and design tokens without silently simplifying the renderer.
5. Keep provenance and required notices in the project.

### Vue, Svelte, Astro, or plain HTML

Do not add React merely to gain a decorative effect. Prefer a framework-native Canvas/WebGL adaptation only when the source contract makes that feasible and the result remains faithful, or use an authored standalone HTML scene when the source explicitly supports it. Otherwise select a lighter native/catalog alternative and record why ThreeUI was rejected.

### Existing component systems

ThreeUI supplies a visual renderer, not permission to create a parallel primitive or token system. Keep existing buttons, focus behavior, layout primitives, and semantic controls; place the renderer behind or within them. Retoken the host and exposed controls, but do not break the source's render lifecycle.

## Runtime and accessibility gates

A ThreeUI selection is incomplete until all applicable gates pass:

- **Meaningful fallback:** ship a local poster/static state or simpler DOM/CSS equivalent. Essential content and actions remain outside the canvas.
- **Reduced motion:** honor `prefers-reduced-motion`; freeze to an intentional frame or switch to the fallback, rather than merely slowing an endless effect.
- **Lifecycle:** pause when offscreen or the document is hidden; cancel animation frames, observers, and listeners; dispose geometries, materials, textures, framebuffers, and renderer/context work on unmount.
- **Device adaptation:** cap pixel ratio, resize backing resolution correctly, handle coarse pointer and lost context, and test low-power mobile rather than assuming desktop GPU behavior.
- **Loading:** reserve dimensions to prevent CLS, lazy-load below-fold scenes, avoid blocking the LCP path, and never depend on remote ThreeUI preview media at runtime.
- **Interaction:** provide keyboard/touch equivalents for pointer-only behavior; do not place focusable controls inside an inaccessible visual sandbox without an equivalent outer control.
- **Readability:** preserve text contrast over animated backgrounds with stable scrims/surfaces; movement must not impair reading or conversion.
- **Motion hierarchy:** one leading GPU/motion event per viewport. A ThreeUI centerpiece spends most of the page's motion budget.

Measure the result in the real project. If it breaks the brief's Core Web Vitals gates or remains unreliable after reasonable optimization, use the documented fallback or reject it.

## License and asset boundary

- ThreeUI application code, Community component code, and ThreeUI-authored Community imagery are MIT licensed; retain the MIT notice when copying substantial source.
- Bundled fonts have SIL OFL 1.1 obligations; preserve their copyright/license files and reserved-name constraints.
- Bundled Three.js runtimes are MIT and retain their upstream headers/notices.
- Remote thumbnails/previews and remote catalog media loaded from `threeui.com` are not redistributed by the Community repository. Never scrape or ship them as project assets.
- Copy only assets present in the Community repository/source bundle and verify the selected item's manifest.

## Opportunity Map and reporting

For a ThreeUI row, record candidates in this form:

```markdown
| Hero atmosphere | beUI finalist/none · ThreeUI `predictive-arc` · Uiverse finalist/none · MDC finalist/none | ThreeUI `PredictiveArcCanvas` | Home hero | Retokened to the approved palette; selected because it best reinforces the reference's data-field motion | React client island; static poster on reduced motion/no WebGL; package vX.Y.Z; upstream SHA |
```

Before delivery, report:

- exact Community ID/variant and `importName`;
- package version or source commit and source path(s);
- runtime/dependencies introduced;
- fallback and reduced-motion behavior;
- mobile, resize, visibility, teardown, and context-loss checks actually run;
- asset/license notices retained;
- any live-source failure or divergence from the selected upstream.
