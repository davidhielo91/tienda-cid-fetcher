---
version: alpha
name: Atlassian
description: "An enterprise software suite built on the Atlassian Design System with a distinctive blue (#0052CC / #0065FF) family across a white and light-gray canvas. The system serves a complex multi-product ecosystem (Jira, Confluence, Trello, Bitbucket) with a unified token layer that provides consistency across radically different product contexts — from Kanban boards to wikis to code review. Typography uses Atlassian's Charlie Display for marketing and system UI fonts in product. The visual language is enterprise-serious but not corporate-cold: Jira's gradient product icon and Confluence's colorful page headers inject warmth into otherwise utilitarian surfaces."

colors:
  primary: "#0052CC"
  on-primary: "#ffffff"
  primary-hover: "#0747A6"
  secondary: "#0065FF"
  ink: "#172B4D"
  ink-muted: "#6B778C"
  canvas: "#ffffff"
  surface-1: "#F4F5F7"
  surface-2: "#EBECF0"
  border: "#DFE1E6"
  jira-blue: "#0052CC"
  confluence-teal: "#00B8D9"
  trello-blue: "#0079BF"
  bitbucket-blue: "#0747A6"
  success: "#00875A"
  warning: "#FF8B00"
  danger: "#DE350B"
  discovery: "#6554C0"

typography:
  display:
    fontFamily: "Charlie Display, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0

spacing:
  base: 8px
  scale: [2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80]

radius:
  sm: 3px
  md: 4px
  lg: 8px
  pill: 9999px

shadows:
  card: "0 1px 1px rgba(9,30,66,0.25), 0 0 0 1px rgba(9,30,66,0.08)"
  elevated: "0 4px 8px -2px rgba(9,30,66,0.25), 0 0 0 1px rgba(9,30,66,0.08)"
  overlay: "0 8px 16px -4px rgba(9,30,66,0.25), 0 0 0 1px rgba(9,30,66,0.06)"

motion:
  duration-fast: 100ms
  duration-base: 200ms
  easing: cubic-bezier(0.23, 1, 0.32, 1)
---

## 1. Visual Theme & Atmosphere
Atlassian built design systems before the term was mainstream. The current system (ADS) provides a single source of truth for four major products that look and feel like siblings. The Jira board is the canonical enterprise UI: white canvas, blue headers, color-coded status lozenge, dense information hierarchy. It's unapologetically utilitarian and beloved by the engineering teams who live in it all day.

## 2. Color System
ADS blue family is the anchor:
- **Primary**: #0052CC — Jira's main color, button primary, active states
- **Interactive**: #0065FF — hover/focus states, links
- **Navy ink**: #172B4D — the signature Atlassian text color, dark navy rather than true black
- **Muted**: #6B778C — secondary labels, subtask text, metadata
- **Surfaces**: #F4F5F7 / #EBECF0 — very light gray, low-contrast surface differentiation
- **Semantic**: Success #00875A, Warning #FF8B00, Danger #DE350B, Discovery #6554C0 (Jira-purple)
- **Product accents**: Each Atlassian product has its own accent; Confluence teal, Trello sky, Bitbucket navy

## 3. Typography
Charlie Display (Atlassian's custom typeface) on marketing. Product UIs use system fonts at 14px — the choice to go slightly below the conventional 16px reflects the data-density requirement of project management software. Labels, statuses, and metadata all need to coexist legibly.

## 4. Components & Patterns
- **Lozenge**: Pill-shaped status badge — the most recognizable Atlassian component; colored by status category
- **Jira board**: Swimlane or Kanban view, drag-and-drop cards, column headers with issue count
- **Confluence page**: Wiki editor with slash-command palette, breadcrumb navigation, page tree sidebar
- **Issue view**: Right-panel detail view with fields, comments timeline, assignee picker
- **Shadow system**: Distinctive "card + ring" shadow using two-layer rgba — recognizable across products
- **Inline editing**: Click-to-edit field pattern used throughout — no save buttons for individual fields

## 5. Spacing & Layout
Dense. Jira board cards: 8px padding, 4px gap. Issue list: compact table rows. Confluence pages: 960px content width, generous margins. The ADS spacing scale goes down to 2px for micro-adjustments.

## 6. Motion & Interaction
Atlassian motion spec: functional and quick. Card drag has ghost + drop zone highlight. Status transitions animate the lozenge color change. Modals slide up with ease-out. The goal is enterprise efficiency — no delight animation.

## Rationale

**Navy ink over pure black** — The #172B4D text color is dark navy rather than true black, a choice that reduces harshness during all-day use in Jira and Confluence while giving the entire palette a distinctive "Atlassian" quality. It creates coherence across four products without requiring shared component code.

**14px body size as a density decision** — Going below the conventional 16px body reflects that project management software serves experts who want more information per screen, not less. A Jira board with 16px body text would require constant scrolling; at 14px, team leads can scan backlogs and sprint boards at a single glance.

**Lozenge as the most recognizable component** — The pill-shaped status badge (Done/In Progress/Blocked) is Atlassian's highest-recognition design artifact because it solves a real workflow problem: status needs to be readable at speed, small enough to appear inline, and memorable enough that team members develop reflexive color associations over months of use.

**Per-product accent colors on a shared base** — Giving Jira, Confluence, Trello, and Bitbucket distinct accent colors while sharing ADS neutrals and blue family lets each product feel contextually appropriate (Confluence teal for documentation, Bitbucket navy for code review) while keeping the shared interaction vocabulary legible across Atlassian's sprawling account portal.

**Two-layer shadow for card elevation** — The distinctive `rgba(9,30,66,0.25) + rgba(9,30,66,0.08)` shadow recipe creates depth that reads as slightly more physical and less flat than single-layer shadows, which matters for drag-and-drop kanban cards where the "pick up and move" affordance needs to feel real.

## Accessibility

### Contrast Ratios
- **Primary on background** (#0052CC on #ffffff): 6.8:1 — passes AA, passes AAA
- **Text on surface** (#172B4D on #ffffff): 18.8:1 — passes AA
- **Muted on background** (#6B778C on #ffffff): 4.8:1 — passes AA (decorative)

### Minimum Requirements
- **Touch target**: 44×44px minimum for all interactive elements
- **Focus indicator**: #0052CC outline, 2px, 2px offset
- **Focus contrast**: 6.8:1 against #ffffff background

### Motion
- Respects `prefers-reduced-motion`: yes — lozenge color-change animations, card drag ghost, and modal slide-up should be suppressed; status changes should be instant under reduced-motion preference
- All transitions use `@media (prefers-reduced-motion: reduce)` guard

### Notes
- Atlassian's primary blue (#0052CC) passes AAA at 6.8:1 — one of the strongest brand primary colors for accessibility in enterprise software; safe for all text sizes and weights
- The ADS (Atlassian Design System) targets WCAG 2.1 AA compliance by default; component library accessibility is well-documented and actively maintained
- Lozenge status badges use color as their primary differentiator (e.g. green "Done", yellow "In Progress", red "Blocked") — always ensure the lozenge text label is present and readable; never rely on color alone for status communication
- At 14px body size (below the conventional 16px), contrast requirements are stricter — the 4.8:1 muted text (#6B778C) is sufficient for 14px regular text (AA requires 4.5:1) but has no headroom; avoid using muted text for anything smaller than 14px
- Product-specific accent colors (Confluence teal #00B8D9, Warning orange #FF8B00) must be verified on their specific background contexts; #FF8B00 on white yields approximately 3.0:1 — use only for icon or large-text contexts, never as small body text
