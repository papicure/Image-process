# PapiCanvas Deep Redesign Roadmap

## 1. Purpose

PapiCanvas is the image processing and infinite-canvas workspace inside the PapiCure product family. The redesign should move the upstream infinite-canvas project away from its open-source demo identity and into a coherent PapiCure product experience.

The target is not a simple reskin. The long-term goal is a deeply reworked product UI: brand, layout, navigation, canvas interaction, generation workflow, asset management, prompt library, settings, dialogs, empty states, loading states, and deployment habits should all feel like one commercial-grade workspace.

This document is the development source of truth for future UI and product work. Each implementation phase should reference this file before changing screens or components.

## 2. Current Status

Repository:

- Local path: `D:\code\Image-process\infinite-canvas`
- Private origin: `https://github.com/papicure/Image-process.git`
- Upstream source: `https://github.com/basketikun/infinite-canvas.git`
- Active development branch: `dev`
- App stack: Next.js app in `web`, optional local canvas agent in `canvas-agent`
- Main UI code: `web/src`

Deployment pattern:

- Local development happens on `dev`.
- Changes are pushed to `origin/dev`.
- Server pulls from `origin/dev` and rebuilds Docker.

Current app identity still contains upstream naming and visual patterns in several places. The redesign should remove public-facing upstream branding from the running product while keeping legal/project files such as `LICENSE` intact unless a separate license arrangement explicitly allows otherwise.

## 3. Reference Direction

The user-provided screenshots and follow-up direction define the visual direction:

- PapiCure/PapiCode family styling
- Claude Code inspired modern terminal atmosphere
- Minimalism style
- Developer Tool / IDE high-contrast palette
- Deep black and dark gray as the primary surface colors
- Thin borders with subtle border glow
- Lucide icon accents
- Compact product controls and scannable workbench layouts
- Claude Code inspired engineering atmosphere
- Focused work surfaces for image generation, canvas editing, assets, and prompts

The product should reference Claude Code conceptually, not copy it literally. Use the feeling of a focused coding workspace, but translate it into an image-processing product. It must not look like the PapiCure documentation site.

## 4. Product Positioning

### Brand

Product name: `PapiCanvas`

Short positioning:

> PapiCanvas is a focused AI image workspace for generating, editing, organizing, and iterating visual assets on an infinite canvas.

Internal product relationship:

- PapiCure / PapiCode: main platform and AI API ecosystem
- PapiCanvas: image processing and canvas workspace module

The UI should feel like a product module inside the broader PapiCure system rather than a separate open-source project.

### Tone

Use concise, tool-like copy. Prefer operational language over marketing fluff.

Examples:

- `Start Canvas`
- `New Image Task`
- `Prompt Library`
- `Assets`
- `Model Settings`
- `Generation Queue`
- `Workspace Config`

Avoid playful or generic AI wording such as:

- `Unleash creativity`
- `Magic AI art`
- `Explore endless possibilities`

## 5. Design Principles

1. Tool-first, not landing-first.
   The app should open quickly into useful work. The homepage may explain the product, but the primary experience is the workspace.

2. Dark mode as first-class.
   Dark mode should feel native, not inverted. It should use deep black, dark gray surfaces, thin borders, subtle glow, restrained amber accents, and clear contrast.

3. Light mode as a companion.
   Light mode should remain usable, but the product identity is dark-first. Avoid making the running product feel like the documentation site.

4. Engineering density.
   Important controls should be visible and scannable. Avoid oversized decorative cards in repeated tool surfaces.

5. Command-center structure.
   Use side navigation, top status bars, breadcrumbs, active tool states, and compact panels to make the app feel like an operational console.

6. Canvas stays central.
   The infinite canvas is the main product value. Redesign should frame and support it, not bury it behind marketing pages.

7. No nested-card visual clutter.
   Use cards only for individual repeated items, modals, and framed tools. Avoid page sections that are just floating decorative cards.

8. Stable layout.
   Toolbars, panels, icon buttons, canvas controls, and nodes should have stable dimensions so interactions do not shift the layout.

9. Accessibility by default.
   Keep focus states visible, icon buttons labelled, contrast sufficient, and touch targets at least 44px where practical.

## 6. Visual System

### Internationalization

Runtime UI copy must use the project i18n layer in `web/src/i18n`.

Supported locales:

- `zh-CN`
- `en`

Rules:

- Do not add new hard-coded runtime UI strings in page or component files.
- Add product copy to `web/src/i18n/translations.ts`.
- Use `useI18n()` inside React components.
- Use the language toggle in the app chrome for manual switching.
- Keep storage keys and import/export compatibility identifiers stable unless a migration is explicitly planned.
- Do not add other languages without a separate product decision.

### Color Tokens

Recommended semantic palette:

```text
--papi-bg-dark:        #060708
--papi-surface-dark:   #0d0f10
--papi-panel-dark:     #131619
--papi-border-dark:    rgba(255,255,255,0.10)
--papi-text-dark:      #f4f4f5
--papi-muted-dark:     #a1a1aa

--papi-bg-light:       #f6f7f8
--papi-surface-light:  #ffffff
--papi-panel-light:    #eef0f3
--papi-border-light:   rgba(17,24,39,0.12)
--papi-text-light:     #111318
--papi-muted-light:    #5f6672

--papi-accent:         #f59e0b
--papi-accent-strong:  #fbbf24
--papi-accent-soft:    rgba(245,158,11,0.14)
--papi-glow:           rgba(245,158,11,0.18)
--papi-success:        #57b37b
--papi-warning:        #d99a3d
--papi-danger:         #df5b57
--papi-info:           #74a7c9
```

Implementation should map these into existing CSS variables in `web/src/app/globals.css`, then gradually replace ad hoc stone/gray classes with semantic tokens.

### Typography

Keep the app readable and product-like:

- UI/body: existing sans stack is acceptable initially.
- Code/terminal accents: use monospace only for command labels, model IDs, job IDs, logs, and status lines.
- Avoid oversized hero type inside dashboards and tool panels.
- Do not use negative letter spacing.

### Shape And Elevation

- Primary app surfaces: 8px radius or less for dense tools.
- Large display panels: up to 12px radius when needed.
- Avoid pill-shaped controls except for tags, status chips, or compact segmented controls.
- Use borders more than heavy shadows.
- Dark mode glow should be subtle and amber-tinted only on active/focused elements.

### Iconography

Use Lucide icons where possible. Avoid emoji as structural icons. Keep stroke style consistent. The title/header brand must be text-only: keep `PapiCanvas`, remove the logo/icon from the title.

### Copy Rules

- Use clear user actions: create canvas, generate image, add assets, browse prompts.
- Avoid decorative command labels such as fake terminal variables when they do not help the user.
- Avoid internal wording such as workspace status, queue internals, implementation labels, upstream identity, sponsor links, and open-source showcase language in runtime UI.

## 7. Information Architecture

Target navigation:

```text
PapiCanvas
├─ Overview
├─ Canvas
├─ Generate
├─ Assets
├─ Prompts
├─ Jobs
├─ Settings
└─ Help / Docs
```

Map to current routes:

```text
/              -> Overview or landing/dashboard entry
/canvas        -> Canvas project list
/canvas/[id]   -> Full canvas workspace
/image         -> Generate image workspace
/video         -> Video workspace, later optional or hidden if not central
/assets        -> Asset library
/prompts       -> Prompt library
```

The first phase may keep existing routes while changing labels and layout. Later phases can add `/jobs`, `/settings`, and a richer `/overview` if needed.

## 8. Page-Level Redesign Plan

### 8.1 App Shell

Files likely involved:

- `web/src/components/layout/app-top-nav.tsx`
- `web/src/components/layout/mobile-nav-drawer.tsx`
- `web/src/components/layout/user-status-actions.tsx`
- `web/src/app/(user)/layout.tsx`
- `web/src/constant/navigation-tools.ts`

Target:

- Replace upstream name with `PapiCanvas`.
- Replace logo with PapiCanvas/PapiCure-compatible mark.
- Remove public GitHub link and upstream project promotion.
- Introduce a command-center shell: left rail on desktop, compact top bar for workspace status, mobile drawer for small screens.
- Add status/utility area: theme toggle, config, model state, sync/account status.

Acceptance:

- No public-facing `infinite-canvas` or upstream author branding in the app chrome.
- Navigation labels are readable Chinese/English product copy, not mojibake.
- Desktop and mobile nav both work.
- Canvas detail route can still hide global nav when full-screen focus is needed.

### 8.2 Overview / Landing

Files likely involved:

- `web/src/app/(user)/page.tsx`

Target:

- Convert current homepage into PapiCanvas overview.
- Use PapiCure-inspired hero layout: warm accent, restrained dark/light variants, terminal/canvas preview panel.
- Make primary CTA open canvas or create image task.
- Add compact feature blocks: Canvas, Generate, Assets, Prompts.
- Avoid decorative stock visuals. Use product-like mock panels or live app previews.

Acceptance:

- First viewport clearly says `PapiCanvas`.
- User can immediately enter Canvas or Generate.
- The page visually belongs to PapiCure screenshots.
- No upstream sponsor/GitHub/star-history content appears.

### 8.3 Canvas Project List

Files likely involved:

- `web/src/app/(user)/canvas/page.tsx`
- `web/src/app/(user)/canvas/components/canvas-project-card.tsx`
- `web/src/app/(user)/canvas/components/canvas-delete-projects-dialog.tsx`

Target:

- Reframe as project dashboard.
- Use compact project cards/table hybrid.
- Add clear actions: New Canvas, Import, Export, Delete.
- Show metadata: last edited, node count, asset count, generation count if available.

Acceptance:

- Project list looks like a professional workspace, not a gallery-only page.
- Bulk actions remain discoverable.
- Empty state guides the user to create the first canvas.

### 8.4 Full Canvas Workspace

Files likely involved:

- `web/src/app/(user)/canvas/[id]/canvas-client-page.tsx`
- `web/src/app/(user)/canvas/components/infinite-canvas.tsx`
- `web/src/app/(user)/canvas/components/canvas-toolbar.tsx`
- `web/src/app/(user)/canvas/components/canvas-zoom-controls.tsx`
- `web/src/app/(user)/canvas/components/canvas-mini-map.tsx`
- `web/src/app/(user)/canvas/components/canvas-context-menu.tsx`
- `web/src/app/(user)/canvas/components/canvas-assistant-panel.tsx`
- `web/src/app/(user)/canvas/components/canvas-local-agent-panel.tsx`

Target:

- Preserve core canvas interactions.
- Restyle canvas background to match PapiCanvas tokens.
- Add command-style top or bottom tool dock.
- Make node creation, generation mode, model settings, and reference attachments feel like a structured workflow.
- Use terminal/status language for agent operations and generation state.
- Keep performance stable; canvas interactions must stay responsive.

Acceptance:

- Panning, zooming, node selection, dragging, and context menu still work.
- Tool dock does not cover essential canvas content.
- All icon-only controls have labels/tooltips.
- Mobile remains usable, even if advanced canvas editing is desktop-first.

### 8.5 Canvas Nodes

Files likely involved:

- `web/src/app/(user)/canvas/components/canvas-node.tsx`
- `web/src/app/(user)/canvas/components/canvas-node-hover-toolbar.tsx`
- `web/src/app/(user)/canvas/components/canvas-node-prompt-panel.tsx`
- `web/src/app/(user)/canvas/components/canvas-node-generation.ts`
- `web/src/app/(user)/canvas/components/canvas-config-node-panel.tsx`

Target:

- Nodes should look like editable artifacts in a professional creative IDE.
- Text nodes: note/code-like panels with clear editing affordance.
- Image nodes: clean image frame, compact metadata bar, action toolbar.
- Config nodes: model/config capsule or terminal block.
- Generation nodes: clear pending/error/success states.

Acceptance:

- Node states are visually distinct.
- Hover toolbar does not cause layout shift.
- Batch image children remain understandable.
- Error states include clear retry/recovery actions.

### 8.6 Image Generation Workspace

Files likely involved:

- `web/src/app/(user)/image/page.tsx`
- `web/src/components/image-settings-panel.tsx`
- `web/src/components/model-picker.tsx`
- `web/src/components/image-generation-pending.tsx`
- `web/src/services/api/image.ts`

Target:

- Convert into a focused task console.
- Left/input panel: prompt, references, model, size, quality.
- Main area: generation results and history.
- Right/secondary area: settings, prompt helpers, recent assets.
- Use clear pending/progress/error states.

Acceptance:

- User understands where to type, where to configure, and where results appear.
- Generated images can be saved/reused in Assets/Canvas if existing logic supports it.
- Settings are not overwhelming on first load.

### 8.7 Assets Library

Files likely involved:

- `web/src/app/(user)/assets/page.tsx`
- `web/src/app/(user)/assets/asset-transfer.ts`
- `web/src/stores/use-asset-store.ts`

Target:

- Make this feel like a media library.
- Add visual filters, storage state, import/export, and batch selection polish.
- Use stable thumbnails with reserved aspect ratios.

Acceptance:

- No layout jumping while assets load.
- Empty, loading, and error states are branded and useful.
- Batch selection is clear.

### 8.8 Prompt Library

Files likely involved:

- `web/src/app/(user)/prompts/page.tsx`
- `web/src/components/prompts/*`
- `web/src/app/api/prompts/route.ts`

Target:

- Reframe as `Prompt Lab` or `Prompt Library` inside PapiCanvas.
- Keep third-party prompt data if useful, but avoid showing GitHub links as primary product branding.
- Add product-style cards, compact filters, and copy/use actions.

Acceptance:

- Prompt browsing is fast and readable.
- Prompt source attribution remains compliant where needed, but not visually dominant.
- Prompt cards match PapiCanvas visual system.

### 8.9 Settings And Configuration

Files likely involved:

- `web/src/components/layout/app-config-modal.tsx`
- `web/src/stores/use-config-store.ts`
- `web/src/components/model-picker.tsx`

Target:

- Turn generic config modal into a PapiCanvas settings surface.
- Separate provider/API settings, model defaults, storage/sync, theme, and advanced options.
- Use clear warnings for destructive or sensitive actions.

Acceptance:

- Provider setup is understandable.
- API keys are never exposed casually.
- Settings are grouped and labelled clearly.

## 9. Branding And Copyright Cleanup

### Remove Or Replace Public-Facing Upstream Identity

Search targets:

```text
Infinite Canvas
infinite-canvas
无限画布
basketikun
GitHub
Sponsor
Donate
爱发电
Star History
```

Likely files:

- `README.md`
- `web/src/components/layout/app-top-nav.tsx`
- `web/src/components/layout/github-link.tsx`
- `web/src/hooks/use-version-check.ts`
- `web/src/app/layout.tsx`
- `web/public/logo.svg`
- `docs/src/lib/shared.ts`
- `docs/src/lib/layout.shared.tsx`
- `docs/content/**`

Runtime app changes should come first. Repository docs can be handled separately.

### Keep Legal Safety

Do not delete `LICENSE` as part of UI cleanup. If the project remains based on AGPL code, keep license obligations clear. If the author has granted separate permission, store that permission outside public runtime UI and document the allowed scope internally.

## 10. Development Phases

### Phase 0: Baseline And Safety

Tasks:

- Confirm app builds locally.
- Capture screenshots of current key routes.
- Add this roadmap document.
- Add `.superpowers/` to `.gitignore` if visual brainstorming artifacts are used later.

Validation:

- `cd web && bun install` if needed.
- `cd web && bun run build`.
- Verify current deployed route still works before changes.

### Phase 1: Brand Foundation

Tasks:

- Replace app name with `PapiCanvas`.
- Replace public logo asset.
- Define theme tokens in `globals.css`.
- Fix mojibake labels in navigation and homepage copy.
- Remove GitHub/upstream links from runtime chrome.
- Disable or redirect upstream version check if it surfaces upstream changelogs.

Validation:

- App shell shows PapiCanvas.
- No upstream branding visible in nav/home/settings.
- Light and dark mode both readable.

### Phase 2: App Shell Redesign

Tasks:

- Build console-like desktop shell.
- Redesign mobile drawer.
- Add compact status/action area.
- Align nav labels and route hierarchy.

Validation:

- Desktop widths: 1440, 1920.
- Mobile widths: 375, 430.
- No nav overlap or clipped text.

### Phase 3: Overview Redesign

Tasks:

- Redesign `/` into PapiCanvas overview.
- Add terminal/canvas preview module.
- Add direct CTAs to Canvas and Generate.
- Add feature sections using real product concepts.

Validation:

- First viewport communicates PapiCanvas clearly.
- CTA paths work.
- No oversized marketing-only layout inside the product workspace.

### Phase 4: Canvas Project List

Tasks:

- Restyle canvas project list.
- Improve empty state and project cards.
- Align import/export/delete dialogs.

Validation:

- Existing project actions still work.
- Empty and multi-project states are polished.

### Phase 5: Full Canvas Workspace

Tasks:

- Restyle canvas grid and surface.
- Restyle toolbar, zoom controls, minimap, context menu.
- Redesign assistant/local-agent panels in PapiCanvas language.

Validation:

- Canvas performance remains smooth.
- Pan/zoom/drag/select/context menu verified.
- Toolbars do not occlude content on common viewport sizes.

### Phase 6: Nodes And Generation Flow

Tasks:

- Redesign text/image/video/audio/config nodes.
- Redesign hover toolbar.
- Redesign prompt panel and generation states.
- Improve error and retry states.

Validation:

- All node types render cleanly.
- Pending/success/error states are distinct.
- Batch generation UI remains understandable.

### Phase 7: Generate, Assets, Prompts

Tasks:

- Redesign `/image` as task console.
- Redesign `/assets` as media library.
- Redesign `/prompts` as prompt lab.
- Keep current data/storage behavior unless explicitly changed.

Validation:

- Route-level workflows still complete.
- Loading and empty states are branded.
- Mobile layouts do not horizontally scroll.

### Phase 8: Settings And Polish

Tasks:

- Redesign config modal/settings.
- Audit all dialogs and popovers.
- Standardize buttons, chips, inputs, segmented controls, popovers.
- Add final accessibility and responsive pass.

Validation:

- Keyboard navigation and focus states are visible.
- Icon-only buttons have labels/tooltips.
- Reduced-motion does not break core flows.

### Phase 9: Deployment And Release Rhythm

Tasks:

- Commit changes to `dev`.
- Push to `origin/dev`.
- Server pulls `origin/dev`.
- Rebuild Docker.
- Smoke-test production route.

Server update pattern:

```bash
cd /root/data/docker_data/image-process/infinite-canvas
git pull origin dev
docker compose -f docker-compose.prod.yml up -d --build
```

## 11. Implementation Rules

Before each phase:

1. Read this document.
2. Inspect the current files for that phase.
3. Keep changes scoped to the phase.
4. Preserve existing functionality unless the phase explicitly changes behavior.
5. Run build or relevant checks.
6. Capture desktop and mobile screenshots for UI phases when possible.

Commit style:

```text
feat(ui): rebrand app shell for PapiCanvas
feat(ui): redesign overview landing
feat(canvas): restyle canvas toolbar and controls
fix(ui): repair mobile drawer layout
```

Branching:

- Long-lived branch: `dev`
- Larger phase branches optional: `feature/papi-shell`, `feature/papi-canvas-workspace`

## 12. Quality Checklist

Use this checklist before considering a phase complete:

- Brand: `PapiCanvas` appears consistently.
- Runtime UI: no upstream author/project branding visible unless intentionally retained in legal/about areas.
- Layout: no overlapping text or clipped controls at 375px, 430px, 1440px, and 1920px.
- Theme: light and dark variants both readable.
- Interaction: buttons, links, menus, dialogs, and canvas controls still work.
- Accessibility: focus state visible; icon-only buttons labelled.
- Performance: canvas drag/zoom remains responsive.
- Data: local storage and existing user data formats are not broken without migration.
- Build: production build succeeds.
- Deployment: server can pull and rebuild from `origin/dev`.

## 13. Open Questions For Later

These are intentionally deferred:

- Whether to add paid credits, subscriptions, or API-key marketplace features.
- Whether to hide video/audio modules or keep them as advanced tools.
- Whether PapiCanvas should have a public marketing page separate from the app.
- Whether docs should be rewritten as PapiCanvas docs or removed from deployment.
- Whether to add backend accounts, cloud sync, or team workspaces.

## 14. First Recommended Work Item

Start with Phase 1: Brand Foundation.

It has the best value-to-risk ratio because it makes the deployed product feel owned by PapiCure without touching the complex canvas internals yet.

Initial file targets:

- `web/src/components/layout/app-top-nav.tsx`
- `web/src/constant/navigation-tools.ts`
- `web/src/app/(user)/page.tsx`
- `web/src/app/globals.css`
- `web/public/logo.svg`
- `web/src/components/layout/github-link.tsx`
- `web/src/hooks/use-version-check.ts`

After Phase 1, move to App Shell Redesign before deeper canvas work.
