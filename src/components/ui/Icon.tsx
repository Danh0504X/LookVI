import createIconSet from '@expo/vector-icons/createIconSet';
import type { StyleProp, TextStyle } from 'react-native';

import glyphMap from '@/assets/fonts/MaterialSymbolsOutlined.json';
import { colors } from '@/theme';

/**
 * Material Symbols Outlined (opsz 24, wght 400), the icon set used by the Stitch designs.
 * Two static instances are bundled: outlined (default) and filled (active states, which
 * Stitch renders with `FILL 1`). Browse names at https://fonts.google.com/icons.
 */
const OutlinedIcon = createIconSet(
  glyphMap,
  'MaterialSymbolsOutlined',
  require('@/assets/fonts/MaterialSymbolsOutlined.ttf'),
);
const FilledIcon = createIconSet(
  glyphMap,
  'MaterialSymbolsOutlinedFilled',
  require('@/assets/fonts/MaterialSymbolsOutlined-Filled.ttf'),
);

/** Icon fonts to preload with the app fonts, keyed by family name. */
export const iconFontAssets = { ...OutlinedIcon.font, ...FilledIcon.font };

export type IconName = keyof typeof glyphMap;

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  /** Filled variant, for selected / active states. */
  filled?: boolean;
  style?: StyleProp<TextStyle>;
};

/** Decorative by default: pair it with a labelled control for accessibility. */
export function Icon({ name, size = 24, color = colors.textPrimary, filled = false, style }: IconProps) {
  const Component = filled ? FilledIcon : OutlinedIcon;
  return (
    <Component
      name={name}
      size={size}
      color={color}
      style={style}
      accessible={false}
      importantForAccessibility="no"
    />
  );
}
