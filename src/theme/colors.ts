/**
 * Lookvi colour tokens.
 *
 * Source: the Tailwind config rendered in the Stitch exports
 * (`ui/stitch_glow_beauty_app_ui/*\/code.html`), reduced to the roles the app actually
 * uses. Lean rule: the UI stays neutral (ivory / white / charcoal); `accent` is reserved
 * for small state cues (ratings, active indicators, eyebrows), never large fills.
 */
export const colors = {
  /** Screen canvas (Stitch `background` / `surface`). */
  background: '#FBF9F7',
  /** Inputs, sheets and anything that steps forward from the canvas. */
  surface: '#FFFFFF',
  /** Quiet fills: unselected chips, placeholders (Stitch `surface-container-low`). */
  surfaceMuted: '#F5F3F1',
  /** Slightly stronger quiet fill (Stitch `surface-container`). */
  surfaceSubtle: '#EFEDEC',

  textPrimary: '#1B1C1B',
  textSecondary: '#4D4546',
  textMuted: '#7F7576',

  /** Hairlines and input borders (Stitch `surface-variant`). */
  border: '#E4E2E0',
  /** Stronger outline, e.g. focused-adjacent states (Stitch `outline-variant`). */
  borderStrong: '#D0C4C5',

  /** Primary actions and selected states (Stitch `primary`). */
  primary: '#1B1617',
  /** Pressed primary (Stitch `primary-container`). */
  primaryPressed: '#302A2B',
  onPrimary: '#FFFFFF',

  /** Muted terracotta accent (Stitch `secondary`). Use sparingly. */
  accent: '#8E4C43',
  /** Soft blush tint for subtle highlights (Stitch `secondary-fixed`). */
  accentSoft: '#FFDAD5',

  error: '#BA1A1A',

  /** Modal backdrop. */
  scrim: 'rgba(27, 22, 23, 0.4)',
} as const;

export type ColorToken = keyof typeof colors;
