# Travel Content Health Score Calculator - Design Guidelines

## Design Approach
**System-Based Approach**: Using Material Design principles adapted for B2B SaaS, emphasizing clarity, professional credibility, and data presentation. The calculator should feel like a diagnostic tool - authoritative, precise, and trustworthy.

## Layout Architecture

**Single-Page Application Structure**:
- Fixed max-width container: `max-w-5xl mx-auto`
- Primary spacing units: 4, 6, 8, 12, 16 (Tailwind units)
- Vertical rhythm: `py-12` sections on mobile, `py-16` on desktop
- No hero section needed - lead directly with purpose

**Content Flow**:
1. Header/Branding (sticky)
2. Calculator Title & Value Proposition (concise intro)
3. Input Form (card-based, 2-column on desktop)
4. Score Display (prominent card with visual meter)
5. Detailed Breakdown (expandable accordion or tabbed cards)
6. CTA Section (consultation/demo booking)

## Typography System

**Font Selection**: Inter (Google Fonts) for entire application
- Headings: font-semibold to font-bold
- Body: font-normal, font-medium for emphasis
- Data/Numbers: font-mono for precise values

**Type Scale**:
- Page Title: `text-3xl md:text-4xl font-bold`
- Section Headers: `text-2xl font-semibold`
- Input Labels: `text-sm font-medium`
- Score Display: `text-6xl md:text-7xl font-bold` (the PCC number)
- Body Text: `text-base`
- Small Labels/Captions: `text-sm text-gray-600`
- Financial Figures: `text-xl md:text-2xl font-semibold font-mono`

## Component Specifications

**Input Form Card**:
- Elevated card with shadow: `shadow-lg rounded-xl`
- Padding: `p-8`
- Grid layout: `grid md:grid-cols-2 gap-6`
- Each input field: full-width with clear labels above, help text below
- Input styling: `border-2 rounded-lg p-3 text-lg focus:ring-2`
- Calculate button: large, prominent, full-width on mobile, aligned right on desktop

**Score Display Card**:
- Hero positioning: largest visual element on page
- Centered content with generous padding: `p-12 text-center`
- Circular progress indicator (0-100 scale) OR horizontal bar with threshold markers
- Score number prominently displayed with `/100` suffix
- Status badge below score (Poor 0-40 / Fair 41-60 / Good 61-80 / Excellent 81-100)
- Visual weight hierarchy: Score > Status > Explanation

**Breakdown Section**:
- Three metric cards in grid: `grid md:grid-cols-3 gap-6`
- Each card displays: Icon/Label, Large Number (currency formatted), Descriptive text
- Alternative: Single card with tabbed interface for Productivity/Discovery/Consistency scores
- Additional expandable details panel for full interpretation text

**Data Presentation**:
- Currency values: Always formatted with commas, 2 decimal places optional
- Percentages: Bold, followed by context
- Use data tables for complex breakdowns with zebra striping
- ROI figure: Standout treatment with large percentage and supporting calculation

## Spacing & Layout Rhythm

**Container Hierarchy**:
- Page wrapper: `px-4 md:px-6 lg:px-8`
- Card spacing: `space-y-8` between major sections
- Form field spacing: `space-y-4` within groups, `gap-6` in grid
- Section padding: `py-12 md:py-16`

**Component Padding**:
- Small cards: `p-6`
- Medium cards (form, breakdown): `p-8`
- Large cards (score display): `p-10 md:p-12`
- Buttons: `px-6 py-3` for primary, `px-4 py-2` for secondary

## Interactive Elements

**Input Fields**:
- Number inputs with step controls visible
- Inline validation: Real-time feedback for invalid ranges
- Currency symbol prefix (£) for financial inputs
- Hour input with weekly context helper text

**Calculate Button**:
- State management: Default, Loading (with spinner), Success
- Smooth transition to results: scroll + fade animation
- Disable during calculation, re-enable when done

**Score Reveal Animation**:
- Count-up animation for the PCC score (0 to calculated value)
- Progress bar fill animation synchronized with count
- Stagger appearance of breakdown metrics (0.1s delay between each)

## Accessibility & Usability

**Form Accessibility**:
- Clear label associations with `for` attributes
- Required field indicators
- Error states with descriptive messages
- Keyboard navigation support with visible focus states
- ARIA labels for screen readers on all interactive elements

**Visual Hierarchy**:
- Clear distinction between input phase and results phase
- Progressive disclosure: Show summary first, details on expand
- Scannable layout with clear visual anchors for numbers

## Images

**No large hero image required** - this is a utility tool. However:

**Optional Brand Asset**: Small PIXIgroup.ai logo/wordmark in header (120px wide max)

**Iconography**: Use Heroicons (outline style) throughout
- Input sections: ChartBarIcon, CurrencyPoundIcon, ClockIcon, DocumentTextIcon
- Score status: ExclamationTriangleIcon (Poor), InformationCircleIcon (Fair), CheckCircleIcon (Good/Excellent)
- Breakdown metrics: appropriate icons for each metric type

**No decorative imagery needed** - focus is on clarity and data presentation. Trust markers (if any) should be text/badge based.