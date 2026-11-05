import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radii } from '@/theme';

import { Icon, type IconName } from './Icon';

type IconButtonVariant = 'plain' | 'surface' | 'solid' | 'overlay' | 'overlayLight';

type IconButtonProps = {
  icon: IconName;
  accessibilityLabel: string;
  onPress: () => void;
  variant?: IconButtonVariant;
  /** Visual diameter. The touch area is never smaller than 44pt. */
  size?: number;
  iconSize?: number;
  filled?: boolean;
  /** Overrides the icon colour (e.g. accent for an active heart). */
  iconColor?: string;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};

const ICON_COLORS: Record<IconButtonVariant, string> = {
  plain: colors.textPrimary,
  surface: colors.textPrimary,
  solid: colors.onPrimary,
  overlay: colors.onPrimary,
  overlayLight: colors.textPrimary,
};

/** Circular icon-only button. Always pass an `accessibilityLabel`. */
export function IconButton({
  icon,
  accessibilityLabel,
  onPress,
  variant = 'plain',
  size = 44,
  iconSize = 22,
  filled = false,
  iconColor,
  selected,
  style,
}: IconButtonProps) {
  const hitSlop = Math.max(0, (44 - size) / 2);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={selected === undefined ? undefined : { selected }}
      hitSlop={hitSlop}
      style={({ pressed }) => [
        styles.base,
        { width: size, height: size },
        styles[variant],
        pressed && styles.pressed,
        style,
      ]}
    >
      <Icon name={icon} size={iconSize} filled={filled} color={iconColor ?? ICON_COLORS[variant]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: radii.full, alignItems: 'center', justifyContent: 'center' },
  plain: {},
  surface: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  solid: { backgroundColor: colors.primary },
  overlay: {
    backgroundColor: colors.overlayFill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.overlayBorder,
  },
  overlayLight: { backgroundColor: colors.overlayLight },
  pressed: { opacity: 0.7 },
});
