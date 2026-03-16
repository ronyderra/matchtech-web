### MatchTech Design Tokens

#### Colors

- **`--color-bg-app`**: `#F3F2EF` – app background (LinkedIn-like neutral)
- **`--color-surface`**: `#FFFFFF` – cards, panels, surfaces
- **`--color-border`**: `#E0DFDC` – borders and dividers
- **`--color-primary`**: `#0A66C2` – primary brand actions (buttons, highlights)
- **`--color-primary-hover`**: `#004182` – hover state for primary actions
- **`--color-success`**: `#22C55E` – match / right swipe
- **`--color-danger`**: `#EF4444` – reject / left swipe
- **`--color-text-primary`**: `#000000E6` – primary text
- **`--color-text-secondary`**: `#666666` – secondary text
- **`--color-text-muted`**: `#8F8F8F` – meta / muted text

#### Typography

- **Font family**
  - **`--font-sans`**: `"Source Sans 3", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- **Font sizes**
  - **`--font-size-heading-xl`**: `32px` – main headings / hero titles
  - **`--font-size-heading-lg`**: `24px` – section titles
  - **`--font-size-title`**: `18px` – job titles, card titles
  - **`--font-size-body`**: `16px` – primary body text
  - **`--font-size-body-sm`**: `14px` – secondary body text
  - **`--font-size-caption`**: `12px` – captions, meta info
- **Font weights**
  - **`--font-weight-light`**: `300`
  - **`--font-weight-regular`**: `400`
  - **`--font-weight-medium`**: `500`
  - **`--font-weight-semibold`**: `600`
  - **`--font-weight-bold`**: `700`

#### Radii

- **`--radius-card`**: `16px` – job / profile cards
- **`--radius-button`**: `8px` – primary and secondary buttons
- **`--radius-input`**: `6px` – input fields, dropdowns, filters
- **`--radius-chip`**: `20px` – tags, chips (skills, job type, etc.)

#### Layout

- **`--layout-max-width`**: `1200px` – main content container width
- **`--layout-swipe-max-width-min`**: `420px` – minimum swipe column width
- **`--layout-swipe-max-width-max`**: `480px` – maximum swipe column width
- **`--layout-padding-mobile`**: `16px` – horizontal padding on mobile
- **`--layout-padding-desktop`**: `24px` – horizontal padding on tablet/desktop

These tokens are defined in `src/app/globals.css` and are used by layout primitives (like the app shell and `SwipeLayout`) and, later, by cards, buttons, and form elements across MatchTech.

