/**
 * PROVISIONAL neutral palette.
 *
 * These values exist only so the bootstrap screen does not hard-code colors.
 * They are NOT Lookvi's brand colors. Replace them with tokens derived from the
 * Google Stitch designs before implementing any product screen.
 */
export const colors = {
  background: '#FFFFFF',
  surface: '#F7F7F7',
  textPrimary: '#111111',
  textSecondary: '#6B6B6B',
  border: '#E6E6E6',
} as const;

export type ColorToken = keyof typeof colors;
