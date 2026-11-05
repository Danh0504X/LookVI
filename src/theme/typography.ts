import type { TextStyle } from 'react-native';

import { fontFamilies } from './fonts';

/**
 * Type scale from the Stitch design system (`warm_editorial_beauty/DESIGN.md`).
 * Letter spacing is converted from `em` to points (em × font size).
 */
export const typography = {
  /** Hero titles (welcome). Playfair 38/46. */
  displayLg: {
    fontFamily: fontFamilies.serif,
    fontSize: 38,
    lineHeight: 46,
    letterSpacing: -0.76,
  },
  /** Screen titles. Playfair 30/38. */
  displayMd: {
    fontFamily: fontFamilies.serif,
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.3,
  },
  /** Section titles. Playfair Medium 26/34. */
  headlineLg: {
    fontFamily: fontFamilies.serifMedium,
    fontSize: 26,
    lineHeight: 34,
    letterSpacing: -0.26,
  },
  /** Small editorial headings. Playfair SemiBold 20/28. */
  headlineSm: {
    fontFamily: fontFamilies.serifSemiBold,
    fontSize: 20,
    lineHeight: 28,
  },
  /** UI titles (cards, rows). Jakarta SemiBold 18/24. */
  titleMd: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.18,
  },
  bodyLg: {
    fontFamily: fontFamilies.sans,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMd: {
    fontFamily: fontFamilies.sans,
    fontSize: 14,
    lineHeight: 20,
  },
  /** Buttons and field labels. Jakarta SemiBold 14/18. */
  labelLg: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.14,
  },
  labelMd: {
    fontFamily: fontFamilies.sansMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.24,
  },
  /** Eyebrows / overlines; usually uppercase. */
  labelSm: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.44,
  },
  priceLg: {
    fontFamily: fontFamilies.sansBold,
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.36,
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;
