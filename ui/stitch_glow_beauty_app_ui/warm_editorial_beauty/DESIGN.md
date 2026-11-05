---
name: Warm Editorial Beauty
colors:
  surface: '#fbf9f7'
  surface-dim: '#dbdad8'
  surface-bright: '#fbf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f1'
  surface-container: '#efedec'
  surface-container-high: '#eae8e6'
  surface-container-highest: '#e4e2e0'
  on-surface: '#1b1c1b'
  on-surface-variant: '#4d4546'
  inverse-surface: '#30302f'
  inverse-on-surface: '#f2f0ee'
  outline: '#7f7576'
  outline-variant: '#d0c4c5'
  surface-tint: '#645c5d'
  primary: '#1b1617'
  on-primary: '#ffffff'
  primary-container: '#302a2b'
  on-primary-container: '#9a9192'
  inverse-primary: '#cfc4c5'
  secondary: '#8e4c43'
  on-secondary: '#ffffff'
  secondary-container: '#fda99c'
  on-secondary-container: '#783b33'
  tertiary: '#1d1512'
  on-tertiary: '#ffffff'
  tertiary-container: '#332925'
  on-tertiary-container: '#9e908a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ebe0e1'
  primary-fixed-dim: '#cfc4c5'
  on-primary-fixed: '#201a1b'
  on-primary-fixed-variant: '#4c4546'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4a9'
  on-secondary-fixed: '#390b06'
  on-secondary-fixed-variant: '#71352d'
  tertiary-fixed: '#f0dfd9'
  tertiary-fixed-dim: '#d3c3bd'
  on-tertiary-fixed: '#221a16'
  on-tertiary-fixed-variant: '#4f4440'
  background: '#fbf9f7'
  on-background: '#1b1c1b'
  surface-variant: '#e4e2e0'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 38px
    fontWeight: '400'
    lineHeight: 46px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Playfair Display
    fontSize: 30px
    fontWeight: '400'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  price-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 22px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies an editorial minimalist approach tailored for modern beauty discovery and appointment booking. The aesthetic draws inspiration from high-end print lookbooks, artisanal spa identities, and curated visual journals. 

### Core Ethos
- **Sensory Calm:** Interfaces must feel unhurried, airy, and tactile. Visual noise is stripped away to spotlight practitioner craft, textural treatment imagery, and clear service details.
- **Editorial Distinction:** High-contrast serif headlines evoke independent fashion publications, grounded by functional, legible sans-serif utility typography.
- **Quiet Luxury:** No artificial skeuomorphism, heavy drop shadows, or frosted glass blurs. Surfaces convey value through bespoke proportions, nuanced borders, generous negative space, and tonal warmth.

### Audience & Mood
Designed for discerning clients seeking curated personal care (skincare rituals, bespoke hair treatments, wellness sanctuaries) in boutique environments. The interface conveys discretion, refined hygiene, and effortless curation.

## Colors

The palette relies on soft, radiant undertones rather than stark clinical grays. All surfaces, borders, and text hierarchies are anchored to warm undertones.

### Palette Architecture
- **Primary Canvas (`#FAF8F6` - Warm Ivory):** The default root background for screen viewports and low-priority surfaces.
- **Surface Elevation (`#FFFFFF` - Pure White):** Used for interactive cards, sheets, and input fields to gently step forward from the Ivory canvas.
- **Key Accent / Interactive Primaries (`#302A2B` - Deep Charcoal):** The primary CTA container and highest-order typography. Delivers authority without the harshness of pure black.
- **Secondary Accent (`#C77B70` - Muted Rose):** Used sparingly for status accents, active states, indicators, curation tags, and secondary action highlights.
- **Subtle Tint (`#EEDDD7` - Soft Blush):** Applied to chip fills, selected container backgrounds, and highlight cards.
- **Structural Outlines (`#E8E3DE` - Warm Stone):** 1px structural hairline borders separating sections, list rows, and card perimeters.
- **Secondary Copy (`#6E6665` - Warm Gray):** Meta information, inactive tabs, service durations, and secondary specifications.

### Color Rules
- Never use pure black (`#000000`) for text or graphics.
- Maintain a minimum of 4.5:1 contrast ratio for all service pricing and booking steps using `#302A2B` over `#FAF8F6` and `#FFFFFF`.
- Use `#C77B70` intentionally; it must not overpower the neutral Ivory/Charcoal baseline.

## Typography

The pairing combines the classical grace of **Playfair Display** with the functional, friendly clarity of **Plus Jakarta Sans**.

### Roles & Discipline
- **Playfair Display:** Reserved strictly for primary editorial titles, screen headers, featured collection names, and promotional quotes. Never apply italic variations to UI controls, forms, or prices.
- **Plus Jakarta Sans:** Governs all interactive elements, body copy, booking calendars, treatment durations, and transactional pricing.
- **Numbers & Currencies:** Format Vietnamese đồng values with standard digit grouping and the currency unit in standard caps or suffix (e.g., `850.000 ₫`) using medium or bold weights of Plus Jakarta Sans to maintain absolute clarity.

## Layout & Spacing

The spatial engine is built on a base **8px unit**, strictly optimized for standard iOS viewport parameters (390pt × 844pt).

### Viewport & Boundaries
- **Mobile Margins:** Standard horizontal screen margin is set to `20px` (`1.25rem`) to frame content generously while preserving space for multi-column treatment listings.
- **Grid Structure:** 4-column fluid layout on mobile screens with `16px` (`1rem`) gutters.
- **Vertical Hierarchy:** Major screen chapters are separated by `32px` (`2rem`). Related interactive clusters (e.g., time picker chips, specialist selectors) are separated by `8px` (`0.5rem`) to `16px` (`1rem`).
- **Touch Ergonomics:** All primary interactive controls strictly respect a minimum touch footprint of `48px` to `52px` vertically, ensuring effortless thumb reach in mobile contexts.

## Elevation & Depth

This system avoids dark drop shadows, heavy blurs, and skeuomorphic gradients in favor of **Tonal Layering and Hairline Definition**.

### Hierarchy Techniques
1. **Base Foundation:** Primary screens rest on Warm Ivory (`#FAF8F6`).
2. **Elevated Surfaces:** Surface cards, selection trays, and modal sheets are rendered in Pure White (`#FFFFFF`) with a continuous `1px solid #E8E3DE` border.
3. **Subtle Separation (Floating Anchors):** For persistent bottom action bars (e.g., "Confirm Booking - 650.000 ₫"), use an ultra-diffused atmospheric shadow:
   - Offset: `0px -4px`
   - Blur: `24px`
   - Color: `rgba(48, 42, 43, 0.04)`
   - Border-top: `1px solid #E8E3DE`
4. **Active Depths:** Pressed buttons or selected cards do not depress via 3D bevels; they shift their fill to Soft Blush (`#EEDDD7`) or adjust borders to Deep Charcoal (`#302A2B`).

## Shapes

The form language is disciplined, clean, and organic, emphasizing gentle curves without descending into bubble-like extremes.

### Geometric Rules
- **Standard Cards & Modules:** Radius set to `16px` (`rounded-lg`) to soften imagery and structured reviews.
- **Buttons, Form Inputs, & Modals:** Radius set to `12px` to preserve structural balance and architectural alignment.
- **Chips, Category Pills, & Status Badges:** Fully rounded pill format (`9999px`) to immediately distinguish contextual filters from primary selection cards.
- **Image Displays:** Treatment and practitioner portraits must feature either uniform `12px` or `16px` corners, avoiding harsh, unrounded framing.

## Components

### Buttons
- **Primary CTA:** Background `#302A2B`, text `#FAF8F6`, height `52px`, radius `12px`, typography `label-lg`. Pressed state transitions fill to `#453D3E`.
- **Secondary Action:** Background `#FAF8F6`, border `1px solid #E8E3DE`, text `#302A2B`, height `48px`, radius `12px`.
- **Tertiary / Ghost:** Transparent background, text `#C77B70`, height `48px`, underline on focus.

### Chips & Filter Pills
- **Unselected:** Fill `#FFFFFF`, border `1px solid #E8E3DE`, text `#6E6665`, padding `8px 16px`, height `36px`, pill radius.
- **Selected:** Fill `#EEDDD7`, border `1px solid #C77B70`, text `#302A2B`, font weight `600`.

### Cards & Service Items
- **Structure:** Background `#FFFFFF`, border `1px solid #E8E3DE`, corner radius `16px`, padding `16px`.
- **Treatment Listing:** Comprises service name in `title-md`, duration and location in `body-md` (`#6E6665`), and price in `price-lg` (`#302A2B`), coupled with a clean thumbnail image on the leading edge.

### Input Fields
- **Container:** Height `50px`, background `#FFFFFF`, border `1px solid #E8E3DE`, radius `12px`, padding `0 16px`.
- **States:** Focus shifts border to `#302A2B`. Error states utilize `#C77B70` for helper copy and field borders.

### Checkboxes & Radio Controls
- **Geometry:** Radios are circular (`20px`), checkboxes use `6px` radius.
- **Selected:** Border and fill `#302A2B` with pure white check or inner dot; unselected utilizes `#E8E3DE` border with `#FFFFFF` fill.

### Booking-Specific Patterns
- **Date & Time Picker:** Horizontal calendar strip with `48px × 64px` rounded day cards. Selected day receives `#302A2B` fill with `#FAF8F6` typography.
- **Stylist / Practitioner Avatar:** Circular display (`56px × 56px`) with a `2px` offset ring in `#EEDDD7` when actively selected.