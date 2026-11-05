import type { TextStyle } from 'react-native';

/**
 * PROVISIONAL type scale using the platform system font.
 * Final font families and sizes will come from the Stitch designs.
 */
export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const satisfies Record<string, TextStyle['fontWeight']>;

export const typography = {
  title: { fontSize: 28, lineHeight: 34, fontWeight: fontWeights.semibold },
  body: { fontSize: 15, lineHeight: 22, fontWeight: fontWeights.regular },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: fontWeights.regular },
} as const satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;
