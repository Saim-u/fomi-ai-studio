# Fomi Canvas — The Iteration-First Creative Environment

A production-grade, highly responsive AI Content Generation Workspace built for **Fomi** using **Next.js 14 (App Router)**, **Tailwind CSS**, and **JavaScript**.

Inspired by the creative workflows of professional designers, art directors, and photographers, Fomi Canvas replaces linear throwaway feeds with a **spatial iteration tree** where every generation is a first-class creative asset with visible lineage.

---

## 🌟 Core Concepts Implemented

### 1. Spatial Canvas & Iteration Threads (The Signature Feature)
- **Pannable & Zoomable 2D Canvas:** AI generations live as interactive nodes on an infinite canvas with zoom (`+` / `-` / 100%) and pan controls.
- **Visual Generation Trees:** SVG bezier curves visually link parent generations to branch children.
- **One-Click Branching:** Clicking **"Branch"** on any node inherits its prompt, aspect ratio, and model settings to branch a new creative variation without copy-pasting.

### 2. Always-Visible Floating Command Bar
- **Keyboard-First Prompt Dock:** A minimal floating command dock at the bottom of the canvas keeps the canvas clear while offering instant prompt entry (`⌘+Enter`).
- **Branch Context Pill:** Displays the active parent node being branched (`✦ Branching from node #...`), allowing effortless A/B tweaking.

### 3. Command Palette (`⌘ + K`)
- Instant keyboard accelerator to switch models (`Fomi Flash`, `Fomi Pro`, `Fomi Ultra`), change aspect ratios, jump to nodes, trigger random prompt inspirations, or launch comparisons.

### 4. Canvas A/B Comparison Mode (Hotkey: `C`)
- Check any 2 nodes on the canvas and hit `C` (or use the command palette) to open the side-by-side comparative inspection modal.
- One-click **"Pick Winner & Branch"** advances the selected candidate as the new branch head.

### 5. Dual View Switcher (Top Navigation)
- **Spatial Canvas Mode:** The infinite tree-based creative canvas.
- **Studio Grid Mode:** The classic 3-column split view with the fixed 380px control panel and responsive masonry grid.

---

## 🛠️ Tech Stack & Architecture

- **Next.js 14 App Router:** Clean client/server boundaries with route handlers (`/api/generate` and `/api/history`).
- **JavaScript (ES6+):** Pure JavaScript without TypeScript overhead.
- **Tailwind CSS:** Premium black & orange editorial theme (`#0A0A0A` canvas, `#171717` surfaces, `#EA580C` accent), 1px borders, ambient shadows, and shimmer animations.
- **Custom UI Components:** Zero external UI libraries (`Button`, `Dropdown`, `Accordion`, `Skeleton`, `Toast`).
- **Performance:** Dynamic imports for heavy modals, `next/image` optimization with responsive `sizes`, memoized result cards.
- **Accessibility:** Skip-to-content anchor, semantic landmarks, full keyboard navigation (arrows, Enter, Esc), ARIA attributes.

---

## 📁 Project Structure

```text
app/
  layout.js                 # Global HTML root, skip-link, viewport/metadata
  page.js                   # Master view integrating Spatial Canvas & Studio Grid
  globals.css               # Tailwind directives, sleek scrollbars, shimmer keyframes
  api/
    generate/route.js       # Mock POST generation API with 1.5s latency & deterministic seeds
    history/route.js        # Mock GET route delivering filmstrip history
components/
  canvas/
    SpatialCanvas.jsx       # Infinite canvas, SVG branch lines, node placement & zooming
    CommandBar.jsx          # Bottom floating prompt bar with branching context & ⌘K
    CommandPalette.jsx      # ⌘K Command palette for power-user speed
    CompareModal.jsx        # A/B comparison modal with 'Pick Winner' workflow (Hotkey: C)
  layout/
    Navbar.jsx              # View switcher (Canvas vs Grid), ⌘K trigger, credits, user profile
    HistoryBar.jsx          # Filmstrip roll carousel of recent creations
    ControlPanel.jsx        # Fixed 380px studio sidebar for Grid mode
  workspace/
    WorkspaceGrid.jsx       # Active prompt banner, responsive masonry grid, empty/skeleton states
    ResultCard.jsx          # Memoized cards with hover overlay & micro-actions
    PreviewModal.jsx        # Keyboard-navigable full inspector modal with focus trap
  ui/
    Button.jsx              # Reusable button with variants & loading states
    Dropdown.jsx            # ARIA-compliant dropdown with arrow-key navigation
    Accordion.jsx           # Animated height accordion
    Skeleton.jsx            # Shimmer loading cards
    Toast.jsx               # Auto-dismissing slide-in notifications
lib/
  constants.js              # Aspect ratios, models, style presets, config
  mockData.js               # History dataset with parent-child tree lineage
  utils.js                  # Hashing, clipboard, download, cn helpers
hooks/
  useGeneration.js          # Unified generation & iteration tree state management
  useMediaQuery.js          # Responsive viewport listener
PRODUCT_THINKING.md         # Full Product Thinking submission document
```

---

## ⚙️ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
npm run start
```
Visit `http://localhost:3000` to interact with Fomi Canvas.
