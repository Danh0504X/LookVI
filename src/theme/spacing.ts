/**
 * 4pt spacing scale. Use these tokens instead of raw numbers for padding, margin and gap.
 */
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export type SpacingToken = keyof typeof spacing;

/** Layout constants from the Stitch design system. */
export const layout = {
  /** Horizontal screen margin (Stitch `margin`, 1.25rem). */
  screenPadding: 20,
  /** Gap between grid columns (Stitch `gutter`, 1rem). */
  gutter: 16,
  /** Minimum touch target (iOS 44pt / Android 48dp → use the larger). */
  minTouchTarget: 48,
  /** Standard height for primary buttons and inputs. */
  controlHeight: 52,
} as const;
