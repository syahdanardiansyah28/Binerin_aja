# Design System Inspired by Linear

## 1. Visual Theme & Atmosphere

Linear's design system embodies a minimalist, sophisticated approach to product development interfaces. The visual language prioritizes clarity and precision with a dark-mode-first aesthetic that reduces cognitive load during intense focus work. Deep blacks and near-blacks form the foundation, accented by cool grays and a subtle indigo accent that provides depth without distraction. The system is intentionally sparse and purposeful—every element serves function, creating an environment where AI-assisted workflows and human collaboration can coexist seamlessly. The typography is clean and modern, using variable-weight Inter for flexibility across scales, while monospace Berkeley Mono grounds technical content. Generous whitespace and restrained color usage reflect a workspace designed for sustained concentration and precision.

**Key Characteristics**
- Dark-mode dominant with carefully calibrated neutral scale
- Minimalist, distraction-free interface aesthetic
- Cool, professional color palette emphasizing clarity
- Precise typographic hierarchy supporting AI workflows
- Intentional use of micro-interactions and subtle elevation
- High contrast between interactive and passive elements
- Designed for teams and autonomous agents working in parallel

## 2. Color Palette & Roles

### Primary
- **Brand Primary** (`#5E6AD2`): Primary interactive accent, used sparingly for key CTAs and status indicators in AI-driven workflows
- **Brand Accent Light** (`#828FFF`): Secondary accent for hover states and supporting interactive elements

### Interactive
- **Button Default** (`#8A8F98`): Neutral button text for secondary actions
- **CTA Background** (`#E5E5E6`): Light neutral background for prominent call-to-action buttons
- **Link Active** (`#5E6AD2`): Primary link color and interactive focus state

### Neutral Scale
- **Surface Darkest** (`#08090A`): Deepest background layer for modals and overlays
- **Surface Dark** (`#0F1011`): Primary dark surface for content containers
- **Surface Base** (`#141516`): Secondary dark surface layer
- **Surface Gray Mid** (`#23252A`): Tertiary neutral for dividers and subtle backgrounds
- **Surface Gray** (`#383B3F`): Lighter gray for secondary text and borders
- **Surface Text Secondary** (`#62666D`): Secondary text color, used for supporting copy (most frequently used)
- **Surface Text Tertiary** (`#8A8F98`): Tertiary text for disabled or muted states
- **Surface Border Light** (`#B4BCD0`): Light border for subtle separation in dark mode

### Surface & Borders
- **Surface Light** (`#F7F8F8`): Primary light background for cards and containers (425 uses)
- **White** (`#FFFFFF`): Pure white for maximum contrast and primary text in light contexts (221 uses)
- **Border Default** (`#D0D6E0`): Primary border color for light surfaces (112 uses)
- **Border Subtle** (`#E2E4E7`): Subtle border for reduced visual weight
- **Border Lighter** (`#E5E5E6`): Lightest border for minimal separation

## 3. Typography Rules

### Font Family
**Primary:** Inter Variable (400, 510, 590 weights) with fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

**Secondary:** Berkeley Mono (400 weight) with fallback: `"SF Mono", Monaco, "Cascadia Code", monospace`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display 1 | Inter Variable | 64px | 510 | 64px | 0px | Hero headlines, main page titles |
| Display 2 | Inter Variable | 48px | 510 | 48px | 0px | Section headlines, major headings |
| Heading 3 | Inter Variable | 20px | 590 | 26.6px | 0px | Card titles, subsection heads |
| Heading 4 | Inter Variable | 16px | 590 | 24px | 0px | Form labels, emphasis text |
| Body | Inter Variable | 15px | 400 | 24px | 0px | Primary body copy, descriptions |
| Body Span | Inter Variable | 16px | 400 | 24px | 0px | Secondary body, content blocks |
| Link | Inter Variable | 14px | 510 | 21px | 0px | Navigation links, inline links |
| Button | Inter Variable | 13px | 400 | 19.5px | 0px | Button labels, small actions |
| Code Small | Berkeley Mono | 12.25px | 400 | 15.925px | 0px | Inline code, technical references |
| Code | Berkeley Mono | 14px | 400 | 24px | 0px | Code blocks, technical content |

### Principles
- Use weight `510` for semi-bold emphasis and navigational elements
- Weight `590` reserved for small, scannable headings and form labels
- Regular weight `400` for all body content and accessibility
- Maintain 24px line height for body content to ensure readability in dark mode
- Monospace reserved exclusively for code, identifiers, and technical variables
- Leading scale maintains 1.0–1.6× multiplier from base size for visual rhythm
- Letter spacing remains neutral (0px) across all sizes for modern, clean appearance

## 4. Component Stylings

### Buttons

#### Primary Button
- **Background:** `#E5E5E6`
- **Text Color:** `#08090A`
- **Font Size:** `13px`
- **Font Weight:** `510`
- **Padding:** `0px 12px`
- **Height:** `32px`
- **Border Radius:** `9999px`
- **Border:** `1px solid #E5E5E6`
- **Box Shadow:** `rgba(0, 0, 0, 0) 0px 8px 2px 0px, rgba(0, 0, 0, 0.01) 0px 5px 2px 0px, rgba(0, 0, 0, 0.04) 0px 3px 2px 0px, rgba(0, 0, 0, 0.07) 0px 1px 1px 0px, rgba(0, 0, 0, 0.08) 0px 0px 1px 0px`
- **Line Height:** `19.5px`
- **Hover State:** Increase shadow intensity and darken background slightly

#### Secondary Button (Ghost)
- **Background:** `transparent`
- **Text Color:** `#8A8F98`
- **Font Size:** `13px`
- **Font Weight:** `400`
- **Padding:** `0px 12px`
- **Height:** `32px`
- **Border Radius:** `9999px`
- **Border:** `0px none`
- **Box Shadow:** `none`
- **Line Height:** `19.5px`
- **Hover State:** Text color shifts to `#B4BCD0`

#### Navigation Button
- **Background:** `transparent`
- **Text Color:** `#F7F8F8`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Padding:** `0px`
- **Height:** `72px`
- **Border Radius:** `0px`
- **Border:** `0px none`
- **Box Shadow:** `none`
- **Line Height:** `24px`
- **Hover State:** Text color transitions to `#B4BCD0`

### Cards & Containers

#### Dark Card
- **Background:** `#0F1011`
- **Text Color:** `#F7F8F8`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Padding:** `0px 24px 28px 24px`
- **Border Radius:** `8px`
- **Border:** `1px solid rgba(255, 255, 255, 0.05)`
- **Box Shadow:** `none`
- **Min Height:** `440px`
- **Max Width:** `328px`
- **Line Height:** `24px`

#### Navigation Container
- **Background:** `transparent`
- **Text Color:** `#F7F8F8`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Padding:** `0px`
- **Height:** `72px`
- **Width:** `100%`
- **Border Radius:** `0px`
- **Border:** `0px none`
- **Box Shadow:** `rgba(0, 0, 0, 0.4) 0px 1px 0px 0px`
- **Line Height:** `24px`

### Inputs & Forms

#### Text Input Dark
- **Background:** `rgba(255, 255, 255, 0.02)`
- **Text Color:** `#D0D6E0`
- **Font Size:** `13.3333px`
- **Font Weight:** `400`
- **Padding:** `12px 14px`
- **Border Radius:** `6px`
- **Border:** `1px solid rgba(255, 255, 255, 0.08)`
- **Box Shadow:** `rgba(0, 0, 0, 0.2) 0px 0px 0px 1px`
- **Height:** `32px` (minimum)
- **Line Height:** `normal`
- **Focus State:** Border color to `#5E6AD2`, increase shadow

#### Search Input
- **Background:** `transparent`
- **Text Color:** `#F7F8F8`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Padding:** `1px 32px`
- **Border Radius:** `0px`
- **Border:** `0px none`
- **Box Shadow:** `none`
- **Height:** `64px`
- **Line Height:** `normal`
- **Placeholder Color:** `#62666D`

#### Code Input
- **Background:** `transparent`
- **Text Color:** `#000000` (transparent rendering for code display)
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Font Family:** `Berkeley Mono`
- **Padding:** `0px 32px 0px 56px`
- **Border Radius:** `0px`
- **Border:** `0px none`
- **Box Shadow:** `none`
- **Min Height:** `432px`
- **Line Height:** `24px`

### Navigation

#### Header Navigation
- **Background:** `transparent`
- **Text Color:** `#F7F8F8`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Height:** `72px`
- **Display:** `flex`
- **Align Items:** `center`
- **Box Shadow:** `rgba(0, 0, 0, 0.4) 0px 1px 0px 0px`
- **Padding:** `0px 24px`

#### Navigation Link
- **Background:** `transparent`
- **Text Color:** `#F7F8F8`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `0px 8px`
- **Border Radius:** `6px`
- **Height:** `32px`
- **Line Height:** `24px`
- **Hover State:** Background `rgba(255, 255, 255, 0.05)`, text `#B4BCD0`

### Links

#### Primary Link / CTA Link
- **Background:** `#5E6AD2`
- **Text Color:** `#FFFFFF`
- **Font Size:** `14px`
- **Font Weight:** `510`
- **Padding:** `0px 16px`
- **Border Radius:** `0px`
- **Height:** `32px`
- **Line Height:** `21px`
- **Hover State:** Background to `#6B7BFF`

#### Secondary Link
- **Background:** `transparent`
- **Text Color:** `#8A8F98`
- **Font Size:** `13px`
- **Font Weight:** `400`
- **Padding:** `0px 12px`
- **Border Radius:** `9999px`
- **Height:** `32px`
- **Line Height:** `19.5px`
- **Hover State:** Text color to `#B4BCD0`

## 5. Layout Principles

### Spacing System

**Base Unit:** `4px`

**Scale:** All spacing values follow a 4px increment system:
- `4px` – Minimal gap, icon spacing
- `8px` – Compact spacing, small gaps between inline elements
- `12px` – Small spacing, input padding
- `16px` – Standard padding for interactive elements and containers
- `20px` – Small margin between sections
- `24px` – Standard margin and card padding
- `28px` – Medium-large spacing
- `32px` – Large padding for major containers
- `36px` – Extra-large margin for section separation
- `40px` – Large gap between column-level content
- `48px` – Extra-large padding for hero sections
- `52px` – Maximum spacing for page-level margins

**Usage Context:**
- Padding: Applied to buttons (`12px`), inputs (`12px–14px`), cards (`24px`), and large containers (`32px–48px`)
- Margins: Separate sections (`20px–52px`), stack vertical rhythm
- Gaps: Flex/grid gaps between items (`8px–12px` for compact layouts, `24px–40px` for content blocks)

### Grid & Container

**Max Width:** Content area maintains responsive breakpoints with maximum widths around `1440px` for full-width components

**Column Strategy:**
- Flexible grid supporting 1-column (mobile), 2-column (tablet), and multi-column (desktop) layouts
- Cards arrange in 3-column grids at desktop width with `328px` max-width per card

**Section Patterns:**
- Hero sections span full width with centered text and `72px` height navigation header
- Content cards use `8px` borders (`border-radius: 8px`) with `1px` subtle borders
- Sidebar navigation with collapsible sections for workspace and favorites organization

### Whitespace Philosophy

Linear employs aggressive whitespace to reduce visual noise and support focus during complex product work. Dark surfaces are reserved sparingly; negative space is treated as a design element. Large breathing room between major sections (52px+ margins) creates visual hierarchy and prevents cognitive overload. Generous internal padding (`24px–32px`) in containers prevents cramped content. Text is rarely tightly packed; line heights and letter spacing maintain comfortable reading rhythm even in dark mode.

### Border Radius Scale

- `4px` – Minimum radius for subtle, technical components (buttons in dense layouts)
- `6px` – Standard radius for inputs, form controls, and small interactive elements
- `8px` – Primary radius for cards, containers, and major UI blocks
- `9999px` – Pill-shaped buttons and fully rounded affordances for navigation and secondary actions
- `50%` – Circle for avatars, profile images, and icon-only containers

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Base (L0) | No shadow, flat surface | Default UI, card backgrounds, primary containers |
| Raised (L1) | `rgba(0, 0, 0, 0.4) 0px 1px 0px 0px` | Navigation headers, subtle elevation for focused containers |
| Elevated (L2) | `rgba(0, 0, 0, 0) 0px 8px 2px 0px, rgba(0, 0, 0, 0.01) 0px 5px 2px 0px, rgba(0, 0, 0, 0.04) 0px 3px 2px 0px, rgba(0, 0, 0, 0.07) 0px 1px 1px 0px, rgba(0, 0, 0, 0.08) 0px 0px 1px 0px` | Primary buttons, modals, floating panels |
| Deep (L3) | Enhanced multi-layer shadow stack with increased blur | Dropdowns, tooltips, overlays |

**Shadow Philosophy:** Linear uses a restrained, multi-layered shadow approach inspired by material design principles. Shadows are built in layers with varying opacity to create smooth, natural depth without harsh contrast. The L2 shadow is primarily reserved for primary interactive elements (buttons) and modals that demand visual prominence. Dark-mode backgrounds (`#0F1011`, `#08090A`) require softer shadows since pure black-on-black creates readability challenges; thus, most UI layers use subtle `1px` top borders or very light shadow layers. The philosophy prioritizes clarity over depth—elevation is used functionally to indicate interactivity and state, not as mere decoration.

## 7. Do's and Don'ts

### Do
- Use the `#5E6AD2` accent sparingly for primary CTAs and high-priority interactive states
- Apply `#F7F8F8` as the standard light background for cards and content containers; it provides better contrast than pure white
- Maintain consistent `24px` line height in body text to ensure dark-mode readability
- Use weight `510` for semi-bold emphasis in navigation and subheadings for visual hierarchy
- Apply `8px` border radius to all card and input components for consistency
- Implement pill-shaped buttons (`border-radius: 9999px`) for navigation and secondary actions
- Pair dark surfaces (`#0F1011`) with light text (`#F7F8F8`) for maximum contrast compliance
- Reserve `#8A8F98` and `#62666D` for secondary text, disabled states, and supporting copy
- Use multi-layer shadows (L2) exclusively for primary buttons and modal overlays
- Maintain generous padding (`24px–32px`) inside containers to avoid visual cramping

### Don't
- Avoid using pure black (`#000000`) for text; use `#08090A` or `#F7F8F8` instead depending on context
- Don't use `#E5E5E6` (button background) for general text—it's reserved for prominent CTAs
- Avoid applying shadows to every interactive element; reserve elevation for primary CTAs and modals only
- Don't mix serif fonts with the Inter/Berkeley Mono combination
- Avoid rounded corners exceeding `8px` on standard components; use `9999px` only for pill-shaped buttons
- Don't apply multiple accent colors simultaneously; limit color intensity to one primary action per screen
- Avoid using border radius `0px` except for navigation headers, search inputs, and full-width components
- Don't exceed `32px` padding in typical card layouts; use `24px` as standard
- Avoid text color `#62666D` or `#8A8F98` on dark surfaces when higher contrast is needed
- Don't apply backgrounds to inline text links; text-only links maintain visual lightness

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | Width | Key Changes |
|-----------|-------|-------------|
| Mobile | < 640px | Single-column layout, full-width cards, navigation collapses to hamburger menu, hero text scales to 48px (h2 size) |
| Tablet | 640px – 1024px | 2-column grid for cards, sidebar navigation condenses or converts to tab navigation, button sizing remains consistent |
| Desktop | 1024px – 1440px | 3-column card grids, full navigation visible, hero at full 64px display size, flexible spacing increases to 40px+ |
| Large Desktop | > 1440px | Max-width container at 1440px, centered layout with margin auto, extended whitespace around margins |

### Touch Targets

- **Minimum Touch Size:** `44px × 44px` for all interactive elements (buttons, links, form inputs)
- **Recommended Touch Size:** `48px–56px` height for mobile buttons to prevent mis-taps
- **Spacing Between Targets:** Minimum `8px` gap to prevent accidental activation
- **Navigation Items:** `32px` height minimum at desktop, `48px` at mobile for comfortable tapping
- **Form Inputs:** `32px` minimum height on desktop, `48px` on mobile for accessible input focus

### Collapsing Strategy

- **Navigation:** Desktop header nav (72px height) converts to hamburger menu drawer on tablets and collapses to vertical stack on mobile
- **Cards:** 3-column grid (328px each) → 2-column grid on tablet (50% width per card) → single column on mobile (full width minus `16px` margin)
- **Hero Section:** Display 1 size (64px) scales to Display 2 (48px) on tablet, reducing further to Heading 3 (20px) on mobile
- **Padding:** Standard `24px` padding reduces to `16px` on tablet, then `12px` on mobile to accommodate smaller screens
- **Margins:** Vertical spacing decreases from `52px` (desktop) → `32px` (tablet) → `20px` (mobile) to maintain proportion
- **Typography:** Font sizes remain fixed per hierarchy; line heights stay consistent across breakpoints for rhythm preservation

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Brand Primary (`#5E6AD2`)
- **Primary CTA Button Background:** CTA Background (`#E5E5E6`)
- **Background (Dark):** Surface Dark (`#0F1011`)
- **Background (Light):** Surface Light (`#F7F8F8`)
- **Heading Text:** White (`#FFFFFF`)
- **Body Text:** Surface Light (`#F7F8F8`)
- **Secondary Text:** Surface Text Secondary (`#62666D`)
- **Tertiary Text:** Surface Text Tertiary (`#8A8F98`)
- **Border (Dark):** Surface Border Light (`#B4BCD0`)
- **Border (Light):** Border Default (`#D0D6E0`)
- **Input Field:** `rgba(255, 255, 255, 0.02)` background with `rgba(255, 255, 255, 0.08)` border

### Iteration Guide

1. **All text on dark surfaces must use `#F7F8F8` or `#FFFFFF`** to maintain WCAG AA contrast ratio; secondary text uses `#62666D` only for non-critical information
2. **Button styles are strictly three types:** Primary (`#E5E5E6` background with L2 shadow), Secondary ghost (transparent, `#8A8F98` text), and Navigation (transparent, `#F7F8F8` text, no radius)
3. **Card and container base is always `#0F1011`** with `1px solid rgba(255, 255, 255, 0.05)` border; padding standard is `0px 24px 28px 24px`
4. **Font stack is Inter Variable only** (weights 400, 510, 590) for UI; Berkeley Mono exclusively for code and identifiers at 12.25px or 14px
5. **Spacing grid is 4px increments**; every margin and padding must be 4px-aligned (4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 52px)
6. **Border radius is limited to 4px, 6px, 8px, or 9999px**; no arbitrary radius values
7. **Shadows are applied only to L1 (subtle top border: `0px 1px 0px`) or L2 (multi-layer elevation shadow)**; never apply both
8. **Forms and inputs use `6px` border radius** with subtle `rgba(255, 255, 255, 0.08)` border and `rgba(255, 255, 255, 0.02)` background
9. **Navigation header height is always `72px`**, top bar uses L1 shadow (`0px 1px 0px` at `rgba(0, 0, 0, 0.4)`), text is `16px` Inter Variable with no border radius
10. **Mobile breakpoint max-width is `640px`**, tablet is `640px–1024px`, desktop is `1024px–1440px`; all margins and padding scale down by 33–50% at mobile