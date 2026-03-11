# CLAUDE.md — AI Assistant Guide for a-material-design-demo

## Project Overview

This is a **static Material Design 3 showcase/demo** — a single-page UI trend reference built with plain HTML, CSS, and JavaScript. There is no build step, no package manager, and no framework. Files are served directly in the browser.

**Purpose:** Demonstrate Material Design 3 ("Material You") UI components, tokens, and patterns as an inspiration reference.

---

## Repository Structure

```
a-material-design-demo/
├── index.html              # Single-page app (437 lines) — all markup lives here
├── assets/
│   ├── global.css          # CSS entry point — imports all partials in order
│   ├── js/
│   │   └── scripts.js      # All JavaScript interactions (jQuery)
│   └── css/
│       ├── 1-reset.css                          # Margin/padding reset, box-sizing
│       ├── 2-variables.css                      # Design tokens (colors, spacing, radii, motion)
│       ├── 3-typography.css                     # Base heading/body/link styles
│       ├── 3-typography_htmleditor.css          # Extended typography (rich text context)
│       ├── 4-layout.css                         # Header, nav, frame/container, responsive
│       └── 5-content.css                        # All component styles (cards, buttons, chips, etc.)
└── README.md               # Minimal placeholder
```

**Ignore:** `_typopgraphy_htmleditor - Copia.scss` is an unused backup file. The oddly named `OBS - THIS IS UI TREND - MAYTERIAL DEISGN BOIPEPRLATE` file is a note placeholder.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic elements) |
| Styles | CSS3 (custom properties, Grid, Flexbox, animations) |
| Scripts | JavaScript + jQuery 3.7.1 (via CDN) |
| Icons | Material Icons (via Google Fonts CDN) |
| Fonts | Roboto 400/700, Ubuntu 400/700 (via Google Fonts CDN) |
| Build | None — static files served directly |

No `package.json`, no bundler, no TypeScript, no framework.

---

## CSS Architecture

### Load Order (via `global.css` imports)

The cascade is intentional — always maintain this order:

1. `1-reset.css` — Remove browser defaults
2. `2-variables.css` — Define all design tokens
3. `3-typography.css` + `3-typography_htmleditor.css` — Type styles
4. `4-layout.css` — Structural/positioning styles
5. `5-content.css` — Component-level styles

### Design Tokens (`2-variables.css`)

All values are defined as CSS custom properties on `:root`. **Never hardcode values that have a token.**

**Color tokens:**
```css
--color-primary: #8c67d9       /* purple */
--color-secondary: #f97316     /* orange */
--color-accent: #00b894        /* green */
--color-surface-*              /* 5 container levels */
```

**Spacing scale:**
```css
--spacing-0-5: 12px
--spacing-1:   18px
--spacing-1-5: 24px
--spacing-2:   32px
--spacing-3:   48px
--spacing-4:   72px
--spacing-5:   96px
```

**Motion:**
```css
--transition-base: 220ms cubic-bezier(0.2, 0, 0, 1)
```

**Component radii:**
```css
--radius-chip: 999px
--radius-card: 28px
--radius-avatar: 20px
```

### Naming Conventions

- Component prefix: `.md-` (Material Design), e.g. `.md-card`, `.md-button`
- BEM-style sub-elements: `.md-card__header`, `.md-card__body`, `.md-card__footer`
- State modifiers: `.is-selected`, `.is-open`, `.is-active`
- Variant modifiers: `.md-button--filled`, `.md-button--tonal`, `.md-button--outlined`, `.md-button--text`
- Avatar gradient variants: `.avatar--sunrise`, `.avatar--lagoon`, `.avatar--dusk`, `.avatar--citrus`
- Utility: `.visually-hidden` (screen-reader-only content)

### Responsive Breakpoints

| Breakpoint | Usage |
|---|---|
| 1024px | Hero switches from 2-col to single column |
| 960px | Navigation collapses to mobile hamburger |
| 768px | Section headers stack; guide grid goes single column |
| 640px | Chips become horizontally scrollable |
| 568px | Header search bar and form layout adjustments |

Always use `max-width` media queries (desktop-first within components, but tokens are set up mobile-first).

---

## JavaScript Conventions (`scripts.js`)

Uses jQuery for all DOM manipulation. No ES modules, no bundling.

**Implemented behaviors:**
1. **Search popover** — Dynamic positioning relative to trigger button; repositions on scroll/resize
2. **Ripple effect** — Creates `<span class="ripple">` on `.md-button` click, positioned from click coordinates
3. **Filter chips** — Toggle `.is-selected` class and `aria-pressed` attribute
4. **Mobile nav toggle** — Opens/closes primary nav; updates `aria-expanded` and icon labels; closes on nav link click
5. **Popover API** — Uses native `showPopover()`/`hidePopover()` with fallback for unsupported browsers

**Patterns to follow:**
- Wrap all code in `$(document).ready()`
- Use event delegation where elements may be dynamic
- Update ARIA attributes alongside visual state changes
- Prefer CSS classes for state (`.is-selected`) over inline styles

---

## HTML Conventions (`index.html`)

### Semantic Structure

```
<header>       — Brand, nav, search toggle, mobile hamburger
<main>
  <section>    — Hero, chip tray, teams, patterns, FAQs, resources
<footer>       — Copyright
```

### Accessibility Requirements

- All interactive elements must have visible focus styles (`focus-visible` is already defined globally)
- Icon-only buttons need `aria-label`
- Toggling elements need `aria-expanded` updated in JS
- Decorative Material Icons must have `aria-hidden="true"`
- Use `.visually-hidden` spans for screen-reader labels on icon buttons
- Maintain logical heading hierarchy: one `<h1>` per page, then `<h2>` for sections, `<h3>` for cards
- Use `<details>`/`<summary>` for accordion/FAQ patterns (already in use)

### Component Patterns

**Card:**
```html
<article class="md-card">
  <div class="md-card__header">...</div>
  <div class="md-card__body">...</div>
  <div class="md-card__footer">...</div>
</article>
```

**Button variants:**
```html
<button class="md-button md-button--filled">...</button>
<button class="md-button md-button--tonal">...</button>
<button class="md-button md-button--outlined">...</button>
<button class="md-button md-button--text">...</button>
<button class="md-button md-button--icon" aria-label="...">
  <span class="material-icons" aria-hidden="true">icon_name</span>
  <span class="visually-hidden">Label</span>
</button>
```

**Filter chip:**
```html
<button class="md-chip" role="checkbox" aria-checked="false">Label</button>
```

---

## Development Workflow

### Running Locally

No build step required. Open `index.html` directly in a browser or serve with any static file server:

```bash
# Python
python3 -m http.server 8080

# Node (if available)
npx serve .
```

### Making Changes

- **Styles:** Edit the appropriate CSS partial. Do not add styles to `global.css` directly — it is import-only.
- **New component styles** → `5-content.css`
- **Layout changes** → `4-layout.css`
- **New tokens** → `2-variables.css`
- **Markup** → `index.html`
- **Interactions** → `assets/js/scripts.js`

### No Linting/Testing Setup

There are no automated tests, linters, or CI pipelines configured. Validate manually in browser. Check:
- Responsive layout at 1024px, 768px, 640px, 568px
- Keyboard navigation (Tab through all interactive elements)
- Screen reader labels on icon buttons
- Ripple animation on buttons
- Filter chip toggle behavior
- Mobile nav toggle

---

## Git Conventions

**Branch naming:** `claude/<description>-<session-id>` for AI-assisted work.

**Commit style:** Descriptive present-tense or noun phrases (see history: `"Refactor: Improve layout, add hero spotlights and nav interactions"`).

**Remote:** `http://local_proxy@127.0.0.1:46405/git/carlwebdev/a-material-design-demo`

---

## Key Constraints for AI Assistants

1. **No build tooling** — do not add `package.json`, bundlers, or transpilers unless explicitly requested.
2. **No frameworks** — keep it plain HTML/CSS/JS + jQuery.
3. **Respect the CSS cascade** — always add styles to the correct numbered partial, never in `global.css`.
4. **Use existing tokens** — never hardcode colors, spacing, or radii that already have CSS variables.
5. **Maintain accessibility** — every interactive element needs proper ARIA attributes and keyboard support.
6. **jQuery only for JS** — do not introduce additional JS dependencies.
7. **No unused files** — the `.scss` backup file is already tech debt; do not add more.
8. **Container max-width is 1200px** — defined in `4-layout.css` on `.frame`.
