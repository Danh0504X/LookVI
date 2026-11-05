import { colors } from './colors';
import { radii } from './radii';
import { spacing } from './spacing';
import { fontWeights, typography } from './typography';

export { colors, fontWeights, radii, spacing, typography };
export type { ColorToken } from './colors';
export type { RadiusToken } from './radii';
export type { SpacingToken } from './spacing';
export type { TypographyToken } from './typography';

export const theme = {
  colors,
  typography,
  fontWeights,
  spacing,
  radii,
} as const;

export type Theme = typeof theme;
