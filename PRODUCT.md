# Product

## Register

product

## Users

PapiCanvas is for PapiCure users who need a focused image-processing workspace for AI generation, editing, reference management, prompt reuse, and iterative visual production. They work inside task-heavy screens where speed, clarity, and predictable controls matter more than decorative marketing moments.

## Product Purpose

PapiCanvas turns the upstream infinite-canvas app into a private PapiCure product module. Its job is to help users build image workflows on an open canvas: collect references, compose prompts, configure models, generate or edit images, organize assets, and return to prior work without losing context.

Success means the app feels commercially owned by PapiCure, opens directly into useful work, supports simplified Chinese and English through the shared i18n layer, and keeps the canvas workflow stable during the redesign.

## Brand Personality

Calm, precise, capable.

The product should feel like a focused image workbench: Claude Code inspired in discipline and engineering atmosphere, PapiCure owned in naming and product intent, and tool-first rather than playful or generic AI-art themed.

## Anti-references

Do not copy Claude Code literally. Do not keep public-facing upstream demo identity, sponsor prompts, GitHub promotion, mojibake labels, or casual open-source showcase language in the running app.

Avoid generic AI landing-page tropes: oversized decorative hero cards, purple-blue gradients, vague "magic creativity" copy, dense nested-card layouts, emoji-as-icons, and UI text hard-coded outside the i18n system.

## Design Principles

1. Canvas first: the infinite canvas remains the core product surface, and surrounding UI should support it without stealing attention.
2. Command-center clarity: navigation, model state, generation actions, prompts, assets, and settings should read as a coherent operational console.
3. PapiCure ownership: public UI should use PapiCanvas naming, PapiCure-compatible tone, and a distinct image-tool visual language instead of copying the documentation site.
4. Stable professional controls: toolbars, panels, nodes, dialogs, and settings should use predictable product UI affordances with clear states.
5. Internationalized by default: runtime copy belongs in `web/src/i18n` and supports only `zh-CN` and `en`.

## Accessibility & Inclusion

Target accessible product UI: clear focus states, readable contrast in both themes, labeled icon-only controls, stable layout at common desktop and mobile widths, reduced-motion-safe transitions, and no text overflow in controls or panels.

## Current Visual Direction

The active redesign direction is Minimalism plus Developer Tool / IDE high contrast. The running product should be dark-first: deep black background, dark gray panels, thin borders, subtle border glow, restrained amber highlights, and Lucide icon accents. The product may reference Claude Code's modern terminal mood, but must not copy Claude Code literally and must not look like the PapiCure documentation site.

User-facing copy should be short, concrete, and action-oriented. Avoid internal labels, developer jargon, abstract status lines, open-source showcase language, and decorative terminal text that does not help the user complete image work.
