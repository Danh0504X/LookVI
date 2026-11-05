/**
 * Corner radius scale. PROVISIONAL until the Stitch designs are mapped.
 */
export const radii = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radii;
