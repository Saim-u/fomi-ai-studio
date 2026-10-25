# Fomi Canvas — Product Thinking Document

**Author:** Frontend Engineer Candidate  
**Workspace Chosen:** Image Generation Workspace  
**Concept Name:** Fomi Canvas — The Iteration-First Creative Environment

---

## 1. Problem Statement & Target User

### Who Is This For?

**Sana, 28 — Freelance Fashion Photographer**  
Based in Lahore, Sana works with 3-4 brands monthly, delivering 40+ campaign images per project. She spends 6-8 hours daily inside AI creative tools, juggling Midjourney, Photoshop, and Figma. Her workflow is fragmented: generate in one tab, edit in another, organize in a third, and screenshot promising results to a moodboard that lives nowhere coherent.

### Her Daily Pain (Concrete, Not Generic)

1. **The "Lost Good One" Problem** — After 40 generations, Sana can't find the one output she loved at attempt #23. Linear feeds bury creative lineage. She re-prompts the same idea 5 times, wasting credits and time.
2. **Context Collapse** — When a client asks "can we go back to the version from Tuesday?", she has no way to reconstruct that iteration path. Screenshots and folder chaos are her only tools.
3. **Form-Fatigue** — Every AI tool is a form. Enter prompt → click generate → wait → scroll. It's transactional, not creative. It doesn't *feel* like a workspace; it feels like a slot machine.
4. **Copy-Paste Hell** — Prompts, seeds, model tags, and style settings must be re-entered every session. No persistent creative state exists between visits.

### Why This Problem Is Unsolved Today

Current AI tools optimize for **one-shot output quality**, not **long-term creative iteration**. Midjourney gives you a Discord feed. Krea gives you a clean form. Leonardo gives you a dashboard. **None of them treat the *journey* between generations as a first-class artifact.** They treat each generation as a throwaway transaction, when professional creators actually build on top of previous work for weeks.

The unsolved gap: **there is no spatial, visual, iterative layer that treats AI generation as a tree of creative decisions rather than a list of transactions.**

---

## 2. Top 3 UX Decisions (With Rationale)

### Decision 1 — Spatial Canvas Instead of Linear Feed

**What it is:** Results don't stack into an infinite scroll — they live as **nodes on an infinite pannable canvas**, spatially organized. Users drag, cluster, and connect generations visually, just like arranging polaroids on a desk.

**Why I chose it:**
- Matches how designers *actually* think — spatially, associatively. Pinterest already proved this.
- Users can drag the "good" outputs to a corner and keep experimenting elsewhere. Spatial memory is stronger than scroll memory.
- Encourages comparison: place two versions side-by-side with one drag.
- Reduces cognitive load for hours-long sessions — no "am I still on the right generation?" anxiety.

**What I rejected:** The vertical scroll feed (Midjourney / Leonardo). It's familiar but fundamentally **transactional**. Every scroll erases history. Bad for the professional who needs to revisit.

---

### Decision 2 — Iteration Threads (The Signature Feature)

**What it is:** Every generation is a **child of a parent generation** — forming a visual tree. Clicking any past result shows its branches. Users can **branch from any node** — not just the last one. Prompts inherit from the parent, so tweaking is effortless.

**Why I chose it:**
- Solves Sana's #1 pain: **"the lost good one"**. Every result is one click away, with full lineage.
- No more copy-pasting prompts. Just tweak a branch — everything else inherits.
- Enables **A/B testing on creative decisions**: "What if I change only the lighting?" becomes a one-click branch.
- Creates a product moat. No competitor today makes creative lineage a native artifact.

**What I rejected:** A traditional "history" sidebar (Figma-style layers, Lightroom-style catalog). It's a list, not a tree. It shows *what* happened, not *why*.

---

### Decision 3 — Always-Visible Command Bar (Keyboard-First, Distraction-Free)

**What it is:** A fixed, minimal prompt bar at the bottom of the canvas — always accessible, never in the way. `⌘ + K` opens the full command palette: switch models, jump to any generation, change ratios, run prompts — all without touching the mouse.

**Why I chose it:**
- Pros live on keyboards. Every mouse trip costs focus and time.
- Keeps the workspace **visually quiet** — no heavy sidebar, no form dominating the screen. Canvas is the hero (per design philosophy).
- Cursor, Linear, and Superhuman prove this pattern works for daily-driver professional tools.

**What I rejected:** A permanent left-panel form (the classic AI tool pattern). It eats 380px of horizontal real estate permanently and makes the workspace feel like a form, not a canvas.

---

## 3. Features Intentionally LEFT OUT (Trade-Offs)

### Out 1: Multi-User Real-Time Collaboration
**Why:** Solo creators dominate this persona. Adding CRDT-based collaboration doubles engineering complexity and blurs the product's identity in v1.  
**Built instead:** Shareable read-only canvas links — async collaboration without live-sync complexity.

### Out 2: Video Generation Tab
**Why:** The image workflow needs to be flawless before adding video. Video introduces timing, audio, keyframes, and duration controls — a completely different mental model.  
**Built instead:** Deep image focus with best-in-class iteration and comparison — a "vertical" bet beats a shallow "horizontal" one.

### Out 3: Community Feed / Public Gallery Browsing
**Why:** Every distraction from *your own work* reduces session quality. Pinterest-style browsing is a passive activity; creators are here to *make*, not consume.  
**Built instead:** A private "Inspiration Board" — pin references from the web or your own past work, then feed them into prompts as visual references.

### Out 4: Fine-Tuning / LoRA Training UI
**Why:** This is an advanced feature for <5% of professional users, and it breaks the current prompt-based mental model. It deserves its own dedicated workspace, not a tab hidden in a panel.  
**Built instead:** A "Save Style as Preset" feature — capture the exact prompt + settings combination as a reusable one-click style. Functional power, minimal complexity.

### Out 5: Credits / Pricing UI Prominence
**Why:** Nothing kills creative flow like a metered counter blinking red. The current industry norms (credits, pricing tiers) are *necessary* but shouldn't dominate the workspace.  
**Built instead:** A subtle, single-line credit indicator in the top bar, plus a soft warning toast at 20% remaining. Users see it when it matters.

---

## 4. Inspirations & Improvements

| Product | What I Liked | What I Improved |
|---|---|---|
| **Figma** | Infinite canvas, spatial organization, non-destructive layer model | Figma is too *technical* for non-designers. Fomi Canvas makes the canvas **AI-native** — nodes are prompts, branches are iterations. No bezier curves, no layers panel. |
| **Midjourney** | Unmatched output quality, strong community, prompt-based simplicity | Linear Discord feed is the *worst* UX for iteration. Replaced with a **visual generation tree** — history becomes an explorable object, not a scroll. |
| **Krea** | Clean UI, great AI flow, real-time preview | Krea is still **form-based**. The workspace is the panel. Fomi Canvas flips it: workspace is the canvas, panel is the command bar. |
| **Pinterest** | Visual browsing, associative thinking, aesthetic-first | Pinterest is *passive consumption*. Fomi Canvas uses the same spatial instinct for *active creation* — pin, branch, compare, iterate. |
| **Cursor** | Keyboard-first, `⌘K` command palette, professional speed | Cursor is code-shaped. Fomi Canvas ports the *speed philosophy* to visuals — `⌘K` palette for creatives, not programmers. |
| **Magnific** | Deep upscaling power, focused feature | Magnific is one-purpose. Fomi Canvas integrates upscale as a **branch node** — "Upscale this result" is part of the tree, not a separate tool. |
| **Leonardo.ai** | Rich dashboards, model variety | Dashboards overwhelm beginners. Fomi Canvas shows **one panel at a time** — power users unlock more via `⌘K`, not via visible clutter. |

---

## 5. If I Had One More Month

### Week 1 — Semantic Prompt Library
- Vector-search over all past prompts using a local embedding model.
- Type "the warm lighting one from Tuesday" → get 5 candidate generations.
- Solves Sana's "I can't remember what I typed" pain permanently.

### Week 2 — Canvas A/B Comparison Mode
- Select 2-4 nodes on the canvas → hit `C` → see them side-by-side at full resolution with zoom-sync.
- One-click "pick winner" → that node becomes the new branch head.

### Week 3 — Multi-Model A/B Testing
- Run a single prompt against 3 models simultaneously (Fomi Flash / Pro / Ultra).
- Canvas renders them as sibling nodes with a "compare" affordance.
- Solves decision paralysis — real data, not vibes.

### Week 4 — Figma & Notion Export
- One-click export of canvas as a Figma-ready moodboard or Notion doc.
- Turns Fomi Canvas from an isolated tool into the **center of the creative pipeline**.
- Massive pro retention win.

### Stretch (Post-Launch): Mobile Companion
- Read-only canvas viewer + quick prompt bar for on-the-go ideation.
- Not full editing — mobile is for *capturing ideas*, desktop is for *making them*.

---

## 6. The Single Standout Differentiator

### **Iteration Threads — The Visual Generation Tree**

Every AI creative platform today treats generations as **replaceable transactions**. You generate, you scroll, you forget. Fomi Canvas treats them as **creative assets with lineage** — each one a node in a visual tree that captures the *journey* of a creative decision.

This is not a feature. It's a **philosophical inversion** of how AI creative tools work.

**What it enables that no competitor can:**

- **Zero-loss creative exploration.** Every "failed" attempt is a branch that might become the seed of the winning idea.
- **Effortless creative A/B testing.** "What if the lighting were warmer?" becomes a one-click branch — not a copy-pasted prompt.
- **Client-ready provenance.** Show your client the *entire creative evolution*, not just the final pick. Builds trust, justifies spend.
- **A product moat.** Lineage data is proprietary, sticky, and grows with the user. The more they use Fomi Canvas, the more valuable their tree becomes. Switching costs compound.

Anyone can copy a prompt. Nobody can copy a **six-month creative tree**. That's the moat.

---

## Why This Wins (3-Sentence Pitch)

**Fomi Canvas isn't another AI generator — it's a spatial creative environment where every generation is a first-class creative asset, not a throwaway transaction.**  
By making iteration a visual, explorable tree instead of a linear scroll, it solves the most under-addressed pain in professional AI workflows: the loss of creative lineage.  
It takes the best instincts of Figma (spatial), Cursor (speed), and Pinterest (visual thinking) and fuses them into the first workspace built for *how creators actually think*, not for how AI tools currently work.
