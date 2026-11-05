import { colors } from './colors';
import { fontAssets, fontFamilies } from './fonts';
import { radii } from './radii';
import { layout, spacing } from './spacing';
import { typography } from './typography';

export { colors, fontAssets, fontFamilies, layout, radii, spacing, typography };
export type { ColorToken } from './colors';
export type { RadiusToken } from './radii';
export type { SpacingToken } from './spacing';
export type { TypographyToken } from './typography';

export const theme = {
  colors,
  typography,
  fontFamilies,
  spacing,
  layout,
  radii,
} as const;

export type Theme = typeof theme;
